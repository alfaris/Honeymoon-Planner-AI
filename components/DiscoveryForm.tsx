import React, { useState, useMemo, useCallback, useEffect } from 'react';
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
    const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const isFormValid = prefs.budget.trim() !== '' && prefs.duration.trim() !== '' && prefs.userCountry.trim() !== '';

    useEffect(() => {
        if (navigator.geolocation) {
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
        } else {
            setGeoStatus('error'); // Geolocation not supported
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
        if (isFormValid) {
            onStartPlanning(prefs);
        }
    };

    const progress = useMemo(() => {
        const steps = [
            !!prefs.userCountry,
            !!(prefs.budget && prefs.duration),
            prefs.travelStyles.length > 0,
            prefs.activities.length > 0,
        ];
        const completedCount = steps.filter(Boolean).length;
        return (completedCount / steps.length) * 100;
    }, [prefs]);
    
    const flightPrefOptions = [
        { value: t('flightPrefShort'), label: t('flightPrefLabelShort') },
        { value: t('flightPrefNo'), label: t('flightPrefLabelAny') },
        { value: t('flightPrefLong'), label: t('flightPrefLabelLong') },
    ];

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                 <h2 className="text-5xl md:text-6xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-rose-800)] to-[var(--brand-rose-500)] py-2">{t('discoveryTitle')}</h2>
                <p className="mt-4 text-lg text-[var(--brand-text-subtle)] max-w-2xl mx-auto">{t('discoverySubtitle')}</p>
            </div>
            
            <ProgressBar progress={progress} />

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

            <div className="text-center mt-12">
                <button 
                    type="submit" 
                    disabled={!isFormValid || isLoading}
                    className="bg-gradient-to-br from-[var(--brand-rose-500)] to-[var(--brand-rose-600)] text-white font-bold py-4 px-14 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-[var(--brand-rose-200)] disabled:from-slate-400 disabled:to-slate-500 disabled:shadow-none disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-[var(--brand-rose-300)] flex justify-center items-center min-w-[240px] mx-auto text-lg"
                >
                    {isLoading ? (
                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : t('findMyHoneymoon')}
                </button>
            </div>
        </form>
    );
};

export default DiscoveryForm;