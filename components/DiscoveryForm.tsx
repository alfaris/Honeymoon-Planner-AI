import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
            <div className="text-center mb-20 relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-[14rem] font-serif font-black text-brand-rose-200/20 select-none -z-10 tracking-widest italic">
                    01
                </div>
                 <h2 className="text-7xl md:text-8xl font-serif font-black text-brand-text-heading tracking-tighter leading-[0.85] mb-8">
                    {t('discoveryTitle')}
                </h2>
                <p className="text-2xl text-brand-text-subtle max-w-2xl mx-auto font-light leading-relaxed italic opacity-80 font-serif">
                    {t('discoverySubtitle')}
                </p>
            </div>
            
            <div className="mb-16">
                <ProgressBar progress={progress} />
                <div className="grid grid-cols-4 gap-4 mt-4">
                    {['practicalNeeds', 'budgetTimeline', 'travelStyle', 'personalTouches'].map((key, i) => (
                        <div key={key} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${step > i ? 'text-brand-rose-600' : 'text-brand-text-subtle/60'}`}>
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

            <div className="flex justify-between items-center mt-12 pt-8 border-t border-[var(--brand-border-soft)]">
                <button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 1 || isLoading}
                    className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all ${
                        step === 1 
                        ? 'opacity-0 pointer-events-none' 
                        : 'text-brand-text-subtle hover:text-brand-rose-800 hover:bg-brand-rose-100'
                    }`}
                >
                    {language === 'ar' ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    {language === 'ar' ? 'السابق' : 'Previous'}
                </button>

                {step < totalSteps ? (
                    <button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepValid || isLoading}
                        className="flex items-center gap-3 bg-brand-rose-700 text-brand-rose-50 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl shadow-brand-rose-700/10 hover:shadow-brand-rose-700/20 hover:bg-brand-rose-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                    >
                        {language === 'ar' ? 'التالي' : 'Continue'}
                        {language === 'ar' ? <ChevronLeft size={20} /> : <ChevronRight size={18} />}
                    </button>
                ) : (
                    <button 
                        type="button" 
                        onClick={() => onStartPlanning(prefs)}
                        disabled={!isStepValid || isLoading}
                        className="flex items-center gap-3 bg-gradient-to-r from-brand-rose-700 to-brand-rose-800 text-brand-rose-50 px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm shadow-2xl shadow-brand-rose-800/20 hover:shadow-brand-rose-800/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-3">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>{t('planning')}</span>
                            </div>
                        ) : (
                            <>
                                <Sparkles size={20} />
                                <span>{t('findMyHoneymoon')}</span>
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default DiscoveryForm;
