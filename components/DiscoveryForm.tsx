

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

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-5xl md:text-6xl font-serif font-extrabold text-slate-900">{t('discoveryTitle')}</h2>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">{t('discoverySubtitle')}</p>
            </div>
            
            <ProgressBar progress={progress} />

            <FormSection title={t('practicalNeeds')} description={t('practicalNeedsDesc')}>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('honeymoonLocation')}</label>
                    <div className="grid grid-cols-2 gap-3">
                        {honeymoonTypes.map((type: { id: string; name: string }) => {
                            const isSelected = prefs.honeymoonType === type.id;
                            return (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => setPrefs(p => ({ ...p, honeymoonType: type.id }))}
                                    className={`relative text-center rounded-lg border text-sm font-medium transition-all duration-200 py-3 px-4 ${isSelected ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-300' : 'bg-white hover:bg-rose-50 border-slate-300'}`}
                                >
                                    {type.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {prefs.honeymoonType === 'abroad' && (
                     <FormSelect label={t('preferredRegion')} name="destinationRegion" value={prefs.destinationRegion} onChange={handleChange}>
                        {destinationRegions.map((r: {id: string, name: string}) => <option key={r.id} value={r.name}>{r.name}</option>)}
                    </FormSelect>
                )}
                
                <FormInput 
                    label={t('userCountryLabel')} 
                    name="userCountry" 
                    value={prefs.userCountry} 
                    onChange={handleChange} 
                    placeholder={geoStatus === 'loading' ? t('gettingLocation') : t('userCountryPlaceholder')} 
                    required 
                />
                <FormSelect label={t('longFlights')} name="flightPreference" value={prefs.flightPreference} onChange={handleChange}>
                    <option>{t('flightPrefNo')}</option><option>{t('flightPrefShort')}</option><option>{t('flightPrefLong')}</option>
                </FormSelect>
            </FormSection>

            <FormSection title={t('budgetTimeline')} description={t('budgetTimelineDesc')}>
                <FormInput label={t('totalBudget')} name="budget" value={prefs.budget} onChange={handleChange} type="number" min="0" placeholder={t('totalBudgetPlaceholder')} required />
                <FormSelect label={t('currency')} name="currency" value={prefs.currency} onChange={handleChange}>
                    <option>USD</option><option>EUR</option><option>GBP</option><option>CAD</option><option>AUD</option><option>EGP</option>
                </FormSelect>
                <FormInput label={t('duration')} name="duration" value={prefs.duration} onChange={handleChange} type="number" min="1" placeholder={t('durationPlaceholder')} required />
                <FormInput label={t('travelDates')} name="travelDates" value={prefs.travelDates} onChange={handleChange} placeholder={t('travelDatesPlaceholder')} />
            </FormSection>

            <FormSection title={t('travelStyle')} description={t('travelStyleDesc')}>
                <MultiSelectGrid label={t('selectTravelStyles')} options={travelStyles} selected={prefs.travelStyles} onToggle={(val) => handleMultiSelectToggle('travelStyles', val)} />
                <FormSelect label={t('preferredClimate')} name="climate" value={prefs.climate} onChange={handleChange}>
                    <option value="">{t('any')}</option>
                    {climates.map((c: {id: string, name: string}) => <option key={c.id} value={c.name}>{c.name}</option>)}
                </FormSelect>
                <FormSelect label={t('accommodationStyle')} name="accommodationStyle" value={prefs.accommodationStyle} onChange={handleChange}>
                     <option value="">{t('any')}</option>
                    {accommodationStyles.map((s: {id: string, name: string}) => <option key={s.id} value={s.name}>{s.name}</option>)}
                </FormSelect>
                <MultiSelectGrid label={t('whatActivities')} options={activitiesList} selected={prefs.activities} onToggle={(val) => handleMultiSelectToggle('activities', val)} />
                <FormSelect label={t('diningPreference')} name="diningPreference" value={prefs.diningPreference} onChange={handleChange}>
                    <option value="">{t('any')}</option>
                    {diningPreferences.map((d: {id: string, name: string}) => <option key={d.id} value={d.name}>{d.name}</option>)}
                </FormSelect>
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

            <div className="text-center mt-10">
                <button 
                    type="submit" 
                    disabled={!isFormValid || isLoading}
                    className={`bg-gradient-to-br from-rose-500 to-rose-600 text-white font-bold py-4 px-12 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-rose-300 disabled:from-slate-400 disabled:to-slate-500 disabled:shadow-none disabled:cursor-not-allowed disabled:scale-100 focus:outline-none focus:ring-4 focus:ring-rose-300 ${isFormValid && !isLoading ? 'form-valid-pulse' : ''}`}
                >
                    {isLoading ? t('planning') : t('findMyHoneymoon')}
                </button>
            </div>
        </form>
    );
};

export default DiscoveryForm;