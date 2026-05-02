import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HoneymoonPreferences } from '../types';
import { translations } from '../constants';
import { getCountryFromCoords } from '../services/geminiService';
import ProgressBar from './form/ProgressBar';
import FormSection from './form/FormSection';
import FormInput from './form/FormInput';
import FormSelect from './form/FormSelect';
import MultiSelectGrid from './form/MultiSelectGrid';
import ChipInput from './form/ChipInput';
import FormToggle from './form/FormToggle';
import CurrencyInput from './form/CurrencyInput';
import RadioCardGroup from './form/RadioCardGroup';
import SingleSelectGrid from './form/SingleSelectGrid';
import SegmentedControl from './form/SegmentedControl';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface DiscoveryFormProps {
    onStartPlanning: (preferences: HoneymoonPreferences) => void;
    isLoading: boolean;
    t: (key: string, replacements?: { [key: string]: string }) => string;
    language: 'en' | 'ar';
}

const initialPrefs: HoneymoonPreferences = {
    budget: '', currency: 'USD', duration: '', travelDates: '', travelStyles: [], climate: '',
    activities: [], accommodationStyle: '', diningPreference: '', partnerBalance: 'A good mix of both our tastes',
    mustVisit: '', noGo: '', dietaryNeeds: '', userCountry: '', honeymoonType: 'abroad', destinationRegion: 'Anywhere', flightPreference: 'No preference',
    surpriseMe: false,
};

const DiscoveryForm: React.FC<DiscoveryFormProps> = ({ onStartPlanning, isLoading, t, language }) => {
    const [prefs, setPrefs] = useState<HoneymoonPreferences>(initialPrefs);
    const [step, setStep] = useState(1);
    const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const totalSteps = 4;

    useEffect(() => {
        if (navigator.geolocation && prefs.userCountry === '') {
            setGeoStatus('loading');
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const country = await getCountryFromCoords(position.coords.latitude, position.coords.longitude);
                        if (country) {
                            setPrefs(prev => ({ ...prev, userCountry: country }));
                            setGeoStatus('success');
                        } else {
                            setGeoStatus('error');
                        }
                    } catch (e) {
                        console.error(e);
                        setGeoStatus('error');
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    setGeoStatus('error');
                },
                { timeout: 10000 }
            );
        }
    }, []);

    const { travelStyles, activitiesList, climates, accommodationStyles, diningPreferences, partnerBalanceOptions, mustVisitSuggestions, noGoSuggestions, dietaryNeedsSuggestions, honeymoonTypes, destinationRegions } = translations[language];

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setPrefs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    const handleToggleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPrefs(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    }, []);

    const handleMultiSelectToggle = useCallback((field: keyof HoneymoonPreferences, value: string) => {
        setPrefs(prev => {
            const currentValues = prev[field] as string[];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [field]: newValues };
        });
    }, []);
    
    const handleSingleSelect = useCallback((field: keyof HoneymoonPreferences, value: string) => {
        setPrefs(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step < totalSteps) {
            setStep(s => s + 1);
        } else {
            onStartPlanning(prefs);
        }
    };

    const handleBack = () => {
        setStep(s => Math.max(1, s - 1));
    };

    const progress = (step / totalSteps) * 100;
    
    const flightPrefOptions = [
        { value: t('flightPrefShort'), label: t('flightPrefLabelShort') },
        { value: t('flightPrefNo'), label: t('flightPrefLabelAny') },
        { value: t('flightPrefLong'), label: t('flightPrefLabelLong') },
    ];

    const isStepValid = useMemo(() => {
        switch (step) {
            case 1: return prefs.userCountry.trim() !== '';
            case 2: return prefs.budget.trim() !== '' && prefs.duration.trim() !== '';
            case 3: return prefs.travelStyles.length > 0 && prefs.activities.length > 0;
            case 4: return true;
            default: return false;
        }
    }, [step, prefs]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const [direction, setDirection] = useState(0);

    const nextStep = () => {
        if (isStepValid) {
            setDirection(1);
            setStep(s => s + 1);
        }
    };

    const prevStep = () => {
        setDirection(-1);
        setStep(s => s - 1);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <header className="text-center mb-10 relative">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute -top-16 left-1/2 -translate-x-1/2 text-[12rem] font-serif font-black text-brand-rose-200/5 select-none -z-10 tracking-[0.5em] italic pointer-events-none"
                >
                    JOURNEY
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-6xl font-serif font-black text-brand-text-heading tracking-tighter leading-tight mb-6 italic"
                >
                    {t('discoveryTitle')}
                </motion.h2>
                <div className="flex items-center justify-center gap-6 mb-8">
                    <div className="h-px w-8 bg-brand-rose-300"></div>
                    <p className="text-xl text-brand-text-subtle font-light italic font-serif max-w-xl">
                        {t('discoverySubtitle')}
                    </p>
                    <div className="h-px w-8 bg-brand-rose-300"></div>
                </div>
            </header>

            <div className="mb-12 sticky top-[84px] z-30 bg-white/80 backdrop-blur-md pt-4">
                <div className="flex items-center justify-between px-2 mb-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-rose-400">{t('step')} {step} / 4</span>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-rose-400">{Math.round((step / 4) * 100)}%</span>
                </div>
                <ProgressBar progress={progress} />
                <div className="grid grid-cols-4 gap-4 mt-2 px-1">
                    {['practicalNeeds', 'budgetTimeline', 'travelStyle', 'personalTouches'].map((key, i) => (
                        <div key={key} className={`text-[8px] font-black uppercase tracking-[0.2em] transition-colors duration-500 text-center ${step >= i + 1 ? 'text-brand-rose-600' : 'text-brand-text-subtle/30'}`}>
                            {t(key)}
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative min-h-[600px]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="w-full"
                    >
                        {step === 1 && (
                            <FormSection title={t('practicalNeeds')} description={t('practicalNeedsDesc')}>
                                <RadioCardGroup
                                    label={t('honeymoonLocation')}
                                    options={honeymoonTypes}
                                    selectedValue={prefs.honeymoonType}
                                    onChange={(value) => handleSingleSelect('honeymoonType', value)}
                                />

                                {prefs.honeymoonType === 'abroad' && (
                                     <SingleSelectGrid
                                        label={t('preferredRegion')}
                                        options={destinationRegions}
                                        selectedValue={prefs.destinationRegion}
                                        onSelect={(value) => handleSingleSelect('destinationRegion', value)}
                                    />
                                )}
                                
                                <FormInput 
                                    label={t('userCountryLabel')} 
                                    name="userCountry" 
                                    value={prefs.userCountry} 
                                    onChange={handleChange} 
                                    placeholder={geoStatus === 'loading' ? t('gettingLocation') : t('userCountryPlaceholder')} 
                                    required 
                                />
                                <SegmentedControl
                                    label={t('longFlights')}
                                    name="flightPreference"
                                    options={flightPrefOptions}
                                    value={prefs.flightPreference}
                                    onChange={handleChange}
                                />
                            </FormSection>
                        )}

                        {step === 2 && (
                            <FormSection title={t('budgetTimeline')} description={t('budgetTimelineDesc')}>
                                <div className="md:col-span-2">
                                    <CurrencyInput
                                        label={t('totalBudget')}
                                        budgetName="budget"
                                        currencyName="currency"
                                        budgetValue={prefs.budget}
                                        currencyValue={prefs.currency}
                                        onBudgetChange={handleChange}
                                        onCurrencyChange={handleChange}
                                        placeholder={t('totalBudgetPlaceholder')}
                                        required
                                    />
                                </div>
                                <FormInput label={t('duration')} name="duration" value={prefs.duration} onChange={handleChange} type="number" min="1" placeholder={t('durationPlaceholder')} required />
                                <FormInput label={t('travelDates')} name="travelDates" value={prefs.travelDates} onChange={handleChange} placeholder={t('travelDatesPlaceholder')} />
                            </FormSection>
                        )}

                        {step === 3 && (
                            <FormSection title={t('travelStyle')} description={t('travelStyleDesc')}>
                                <MultiSelectGrid label={t('selectTravelStyles')} options={travelStyles} selected={prefs.travelStyles} onToggle={(val) => handleMultiSelectToggle('travelStyles', val)} />
                                <SingleSelectGrid 
                                    label={t('preferredClimate')}
                                    options={climates}
                                    selectedValue={prefs.climate}
                                    onSelect={(value) => handleSingleSelect('climate', value)}
                                />
                                <SingleSelectGrid 
                                    label={t('accommodationStyle')}
                                    options={accommodationStyles}
                                    selectedValue={prefs.accommodationStyle}
                                    onSelect={(value) => handleSingleSelect('accommodationStyle', value)}
                                />
                                <MultiSelectGrid label={t('whatActivities')} options={activitiesList} selected={prefs.activities} onToggle={(val) => handleMultiSelectToggle('activities', val)} />
                                <SingleSelectGrid 
                                    label={t('diningPreference')}
                                    options={diningPreferences}
                                    selectedValue={prefs.diningPreference}
                                    onSelect={(value) => handleSingleSelect('diningPreference', value)}
                                />
                            </FormSection>
                        )}

                        {step === 4 && (
                            <FormSection title={t('personalTouches')} description={t('personalTouchesDesc')}>
                                <ChipInput 
                                    label={t('mustVisit')} 
                                    name="mustVisit" 
                                    value={prefs.mustVisit} 
                                    onChange={handleChange} 
                                    placeholder={t('mustVisitPlaceholder')}
                                    suggestions={mustVisitSuggestions}
                                />
                                <ChipInput 
                                    label={t('noGo')} 
                                    name="noGo" 
                                    value={prefs.noGo} 
                                    onChange={handleChange} 
                                    placeholder={t('noGoPlaceholder')}
                                    suggestions={noGoSuggestions}
                                />
                                <div className="md:col-span-2">
                                     <FormSelect label={t('partnerBalance')} name="partnerBalance" value={prefs.partnerBalance} onChange={handleChange}>
                                        {partnerBalanceOptions.map((opt: {id: string, name: string}) => <option key={opt.id} value={opt.name}>{opt.name}</option>)}
                                    </FormSelect>
                                </div>
                                 <ChipInput 
                                    label={t('dietaryNeeds')} 
                                    name="dietaryNeeds" 
                                    value={prefs.dietaryNeeds} 
                                    onChange={handleChange} 
                                    placeholder={t('dietaryNeedsPlaceholder')}
                                    suggestions={dietaryNeedsSuggestions}
                                    fullWidth
                                />
                                <FormToggle 
                                    label={t('surpriseMeLabel')}
                                    description={t('surpriseMeDesc')}
                                    name="surpriseMe"
                                    checked={prefs.surpriseMe}
                                    onChange={handleToggleChange}
                                />
                            </FormSection>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-between items-center mt-10 pt-6 border-t border-[var(--brand-border-soft)]">
                <motion.button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1 || isLoading}
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all ${
                        step === 1 
                        ? 'opacity-0 pointer-events-none' 
                        : 'text-brand-text-subtle hover:text-brand-rose-800 hover:bg-brand-rose-100'
                    }`}
                >
                    {language === 'ar' ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    {language === 'ar' ? 'السابق' : 'Previous'}
                </motion.button>

                {step < totalSteps ? (
                    <motion.button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepValid || isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 bg-brand-rose-700 text-brand-rose-50 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl shadow-brand-rose-700/20 hover:bg-brand-rose-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {language === 'ar' ? 'التالي' : 'Continue'}
                        <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            {language === 'ar' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                        </motion.div>
                    </motion.button>
                ) : (
                    <motion.button 
                        type="button" 
                        onClick={() => onStartPlanning(prefs)}
                        disabled={!isStepValid || isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 bg-brand-rose-700 text-brand-rose-50 px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm shadow-2xl shadow-brand-rose-800/20 hover:bg-brand-rose-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                            animate={{ x: ['100%', '-100%'] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        />
                        {isLoading ? (
                            <div className="flex items-center gap-3">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                >
                                    <Sparkles size={20} />
                                </motion.div>
                                <span>{t('planning')}</span>
                            </div>
                        ) : (
                            <>
                                <Sparkles size={20} className="text-brand-rose-300" />
                                <span>{t('findMyHoneymoon')}</span>
                            </>
                        )}
                    </motion.button>
                )}
            </div>
        </div>
    );
};

export default DiscoveryForm;
