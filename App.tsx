import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppPhase, HoneymoonPreferences, Phase1Response, DetailedItinerary, DestinationRecommendation } from './types';
import { getRecommendations, getItinerary, generateImage } from './services/geminiService';
import { translations } from './constants';
import LZString from './utils/lz-string';

import DiscoveryForm from './components/DiscoveryForm';
import Recommendations from './components/Recommendations';
import Itinerary from './components/Itinerary';
import LoadingIndicator from './components/LoadingIndicator';
import Header from './components/layout/Header';
import ErrorDisplay from './components/common/ErrorDisplay';
import SavedTrips from './components/SavedTrips';
import AdminDashboard from './components/AdminDashboard';
import { useUser } from './context/UserContext';
import CreditShop from './components/itinerary/CreditShop';

const safeJSONParse = (val: string | null, fallback: any) => {
    if (!val || val === "undefined" || val === "null") return fallback;
    try {
        return JSON.parse(val);
    } catch (e) {
        console.error("Failed to parse localStorage value:", val, e);
        return fallback;
    }
};

const safeLocalStorageSet = (key: string, value: string) => {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        if (e instanceof Error && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
            console.warn("LocalStorage quota exceeded. Some data was not saved.", key);
            // If it's a large piece of data like the itinerary, we might want to alert the user or just ignore
        } else {
            console.error("Failed to set localStorage value:", key, e);
        }
    }
};

const App: React.FC = () => {
    const [language, setLanguage] = useState<'en' | 'ar'>(() => {
        const saved = localStorage.getItem('hp_language');
        return (saved === 'en' || saved === 'ar') ? saved : 'en';
    });
    const [phase, setPhase] = useState<AppPhase>(AppPhase.DISCOVERY);
    const [preferences, setPreferences] = useState<HoneymoonPreferences | null>(() => {
        return safeJSONParse(localStorage.getItem('hp_preferences'), null);
    });
    const [recommendations, setRecommendations] = useState<Phase1Response | null>(() => {
        return safeJSONParse(localStorage.getItem('hp_recommendations'), null);
    });
    const [recommendationImages, setRecommendationImages] = useState<Record<string, string>>({});
    const [itinerary, setItinerary] = useState<DetailedItinerary | null>(() => {
        return safeJSONParse(localStorage.getItem('hp_itinerary'), null);
    });
    const [error, setError] = useState<string | null>(null);
    const [isCreditShopOpen, setIsCreditShopOpen] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState<string>(() => {
        return localStorage.getItem('hp_selected_destination') || '';
    });

    useEffect(() => {
        const savedPhase = localStorage.getItem('hp_phase');
        if (savedPhase && savedPhase !== AppPhase.ERROR.toString()) {
            setPhase(Number(savedPhase) as AppPhase);
        }
    }, []);

    useEffect(() => {
        safeLocalStorageSet('hp_language', language);
        safeLocalStorageSet('hp_preferences', JSON.stringify(preferences));
        safeLocalStorageSet('hp_recommendations', JSON.stringify(recommendations));
        // We avoid saving recommendationImages to localStorage because base64 images consume too much space (QuotaExceededError)
        safeLocalStorageSet('hp_itinerary', JSON.stringify(itinerary));
        safeLocalStorageSet('hp_phase', phase.toString());
        safeLocalStorageSet('hp_selected_destination', selectedDestination);
    }, [language, preferences, recommendations, itinerary, phase, selectedDestination]);

    const t = useCallback((key: string, replacements?: { [key: string]: string }): string => {
        const langDict = translations[language];
        const enDict = translations.en;
        let text = langDict[key] || enDict[key] || key;
        if (replacements) {
            Object.keys(replacements).forEach(rKey => {
                text = text.replace(`{${rKey}}`, replacements[rKey]);
            });
        }
        return text;
    }, [language]);

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    const updateMetaTag = (property: string, content: string) => {
        let element = document.querySelector(`meta[property='${property}']`) as HTMLMetaElement;
        if (!element) {
            element = document.querySelector(`meta[name='${property}']`) as HTMLMetaElement;
        }

        if (element) {
            element.content = content;
        } else {
            const newMeta = document.createElement('meta');
            newMeta.setAttribute('property', property);
            newMeta.content = content;
            document.head.appendChild(newMeta);
        }
    };

    useEffect(() => {
        // Handle loading from a shared URL on initial load
        const urlParams = new URLSearchParams(window.location.search);
        const sharedItineraryData = urlParams.get('itinerary');
        if (sharedItineraryData && phase === AppPhase.DISCOVERY) {
            try {
                const decompressed = LZString.decompressFromEncodedURIComponent(sharedItineraryData);
                if (decompressed) {
                    const data = JSON.parse(decompressed) as { itinerary: DetailedItinerary, preferences: HoneymoonPreferences };
                    if (data.itinerary && data.preferences) {
                        setItinerary(data.itinerary);
                        setPreferences(data.preferences);
                        setPhase(AppPhase.ITINERARY_READY);
                        window.history.replaceState({}, document.title, window.location.pathname);

                        // Update meta tags for social sharing
                        const updateSocials = async () => {
                            try {
                                const title = `Our Honeymoon to ${data.itinerary.destination}!`;
                                const description = `An unforgettable ${data.preferences.duration}-day romantic adventure in ${data.itinerary.destination}. Check out our AI-generated plan!`;
                                
                                updateMetaTag('og:title', title);
                                updateMetaTag('twitter:title', title);
                                updateMetaTag('og:description', description);
                                updateMetaTag('twitter:description', description);

                                const imageUrl = await generateImage(`A stunning, romantic, photorealistic travel poster of ${data.itinerary.destination}.`);
                                if(imageUrl) {
                                    updateMetaTag('og:image', imageUrl);
                                    updateMetaTag('twitter:image', imageUrl);
                                }
                            } catch (error) {
                                console.error("Error updating social meta tags:", error);
                            }
                        };
                        updateSocials();
                    }
                }
            } catch (e) {
                console.error("Failed to parse shared itinerary:", e);
                setError("The shared itinerary link is invalid or corrupted.");
                setPhase(AppPhase.ERROR);
            }
        }
    }, [phase]);

    useEffect(() => {
        // Fetch images once recommendations are ready
        if (phase === AppPhase.RECOMMENDATIONS_READY && recommendations && recommendations.recommendations.length > 0 && Object.keys(recommendationImages).length === 0) {
            const fetchImages = async () => {
                const imagePromises = recommendations.recommendations.map(rec =>
                    generateImage(rec.photorealisticImagePrompt).then(url => ({ name: rec.destinationName, url }))
                );
                const results = await Promise.allSettled(imagePromises);
                const newImages: Record<string, string> = {};
                results.forEach(res => {
                    if (res.status === 'fulfilled' && res.value.url) {
                        newImages[res.value.name] = res.value.url;
                    }
                });
                setRecommendationImages(newImages);
            };
            fetchImages();
        }
    }, [phase, recommendations, recommendationImages]);

    const isLoading = phase === AppPhase.RECOMMENDING || phase === AppPhase.PLANNING;

    const { credits, consumeCredit, user, login } = useUser();

    const handleStartPlanning = useCallback(async (prefs: HoneymoonPreferences) => {
        if (!user) {
            try {
                await login();
                return; // Let user click again after login
            } catch (err) {
                return;
            }
        }

        if (credits <= 0) {
            setIsCreditShopOpen(true);
            return;
        }

        setPreferences(prefs);
        setPhase(AppPhase.RECOMMENDING);
        setError(null);
        setRecommendationImages({});
        try {
            const consumed = await consumeCredit();
            if (!consumed) {
                throw new Error("Failed to consume credit. Please try again.");
            }
            const result = await getRecommendations(prefs, language);
            setRecommendations(result);
            setPhase(AppPhase.RECOMMENDATIONS_READY);
        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
            setPhase(AppPhase.ERROR);
        }
    }, [language, user, credits, login, consumeCredit]);

    const handleSelectDestination = useCallback(async (destination: DestinationRecommendation) => {
        if (!preferences || !user) return;

        if (credits <= 0) {
            setIsCreditShopOpen(true);
            return;
        }

        setSelectedDestination(destination.destinationName);
        setPhase(AppPhase.PLANNING);
        setError(null);
        try {
            const consumed = await consumeCredit();
            if (!consumed) {
                throw new Error("Failed to consume credit. Please try again.");
            }
            const result = await getItinerary(destination.destinationName, preferences, language);
            setItinerary(result);
            setPhase(AppPhase.ITINERARY_READY);
        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
            setPhase(AppPhase.ERROR);
        }
    }, [preferences, language, user, credits, consumeCredit]);

    const handleRestart = useCallback(() => {
        setPhase(AppPhase.DISCOVERY);
        setPreferences(null);
        setRecommendations(null);
        setItinerary(null);
        setError(null);
        setSelectedDestination('');
        setRecommendationImages({});
        window.history.replaceState({}, document.title, window.location.pathname);
    }, []);
    
    const handleBackToRecommendations = useCallback(() => {
        setPhase(AppPhase.RECOMMENDATIONS_READY);
        setItinerary(null);
    }, []);

    const handleSelectSavedTrip = useCallback((savedItinerary: DetailedItinerary, savedPreferences: HoneymoonPreferences) => {
        setItinerary(savedItinerary);
        setPreferences(savedPreferences);
        setPhase(AppPhase.ITINERARY_READY);
    }, []);

    const renderContent = () => {
        const props = { t, language };
        switch (phase) {
            case AppPhase.DISCOVERY:
                return <DiscoveryForm key="discovery" onStartPlanning={handleStartPlanning} isLoading={isLoading} {...props} />;
            case AppPhase.RECOMMENDING:
                return <LoadingIndicator key="loading-recs" text={t('loadingDestinations')} />;
            case AppPhase.RECOMMENDATIONS_READY:
                return recommendations && preferences && <Recommendations key="recommendations" response={recommendations} preferences={preferences} images={recommendationImages} onSelect={handleSelectDestination} onRestart={handleRestart} isLoading={isLoading} {...props} />;
            case AppPhase.PLANNING:
                const loadingSteps: string[] = translations[language].loadingItinerarySteps || translations.en.loadingItinerarySteps;
                const processedSteps = loadingSteps.map(step => step.replace('{destination}', selectedDestination));
                return <LoadingIndicator key="loading-itinerary" text={processedSteps} />;
            case AppPhase.ITINERARY_READY:
                return itinerary && preferences && <Itinerary key="itinerary" itinerary={itinerary} preferences={preferences} onBack={handleBackToRecommendations} onRestart={handleRestart} {...props} />;
            case AppPhase.SAVED_TRIPS:
                return <SavedTrips onSelectTrip={handleSelectSavedTrip} onBack={() => setPhase(AppPhase.DISCOVERY)} {...props} />;
            case AppPhase.ADMIN_DASHBOARD:
                return <AdminDashboard t={t} onClose={() => setPhase(AppPhase.DISCOVERY)} />;
            case AppPhase.ERROR:
                return error && <ErrorDisplay key="error" message={error} onRetry={handleRestart} t={t} />;
            default:
                return <DiscoveryForm key="default" onStartPlanning={handleStartPlanning} isLoading={isLoading} {...props} />;
        }
    };

    return (
        <div className="min-h-screen" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <Header t={t} language={language} setLanguage={setLanguage} onNavigate={setPhase} onOpenCreditShop={() => setIsCreditShopOpen(true)} />
            <CreditShop isOpen={isCreditShopOpen} onClose={() => setIsCreditShopOpen(false)} t={t} />
            <main>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={phase}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
             <footer className="text-center py-8 text-sm text-[var(--brand-text-subtle)]">
                <p>{t('poweredBy')}</p>
            </footer>
        </div>
    );
};

export default App;