import React, { useState, useCallback, useEffect } from 'react';
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

const App: React.FC = () => {
    const [language, setLanguage] = useState<'en' | 'ar'>('en');
    const [phase, setPhase] = useState<AppPhase>(AppPhase.DISCOVERY);
    const [preferences, setPreferences] = useState<HoneymoonPreferences | null>(null);
    const [recommendations, setRecommendations] = useState<Phase1Response | null>(null);
    const [recommendationImages, setRecommendationImages] = useState<Record<string, string>>({});
    const [itinerary, setItinerary] = useState<DetailedItinerary | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedDestination, setSelectedDestination] = useState<string>('');

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

    const handleStartPlanning = useCallback(async (prefs: HoneymoonPreferences) => {
        setPreferences(prefs);
        setPhase(AppPhase.RECOMMENDING);
        setError(null);
        setRecommendationImages({});
        try {
            const result = await getRecommendations(prefs, language);
            setRecommendations(result);
            setPhase(AppPhase.RECOMMENDATIONS_READY);
        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
            setPhase(AppPhase.ERROR);
        }
    }, [language]);

    const handleSelectDestination = useCallback(async (destination: DestinationRecommendation) => {
        if (!preferences) return;
        setSelectedDestination(destination.destinationName);
        setPhase(AppPhase.PLANNING);
        setError(null);
        try {
            const result = await getItinerary(destination.destinationName, preferences, language);
            setItinerary(result);
            setPhase(AppPhase.ITINERARY_READY);
        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
            setPhase(AppPhase.ERROR);
        }
    }, [preferences, language]);

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

    const renderContent = () => {
        const props = { t, language };
        switch (phase) {
            case AppPhase.DISCOVERY:
                return <DiscoveryForm onStartPlanning={handleStartPlanning} isLoading={isLoading} {...props} />;
            case AppPhase.RECOMMENDING:
                return <LoadingIndicator text={t('loadingDestinations')} />;
            case AppPhase.RECOMMENDATIONS_READY:
                return recommendations && <Recommendations response={recommendations} images={recommendationImages} onSelect={handleSelectDestination} onRestart={handleRestart} isLoading={isLoading} {...props} />;
            case AppPhase.PLANNING:
                return <LoadingIndicator text={t('loadingItinerary', {destination: selectedDestination})} />;
            case AppPhase.ITINERARY_READY:
                return itinerary && preferences && <Itinerary itinerary={itinerary} preferences={preferences} onBack={handleBackToRecommendations} onRestart={handleRestart} {...props} />;
            case AppPhase.ERROR:
                return error && <ErrorDisplay message={error} onRetry={handleRestart} t={t} />;
            default:
                return <DiscoveryForm onStartPlanning={handleStartPlanning} isLoading={isLoading} {...props} />;
        }
    };

    return (
        <div className="min-h-screen text-slate-700">
            <Header t={t} language={language} setLanguage={setLanguage} />
            <main>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    {renderContent()}
                </div>
            </main>
             <footer className="text-center py-6 text-sm text-slate-500">
                <p>{t('poweredBy')}</p>
            </footer>
        </div>
    );
};

export default App;