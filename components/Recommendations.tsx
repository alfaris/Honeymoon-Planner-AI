import React from 'react';
import { motion } from 'framer-motion';
import { Phase1Response, DestinationRecommendation, HoneymoonPreferences } from '../types';
import CalendarIcon from './icons/CalendarIcon';
import MoneyIcon from './icons/MoneyIcon';
import MapIcon from './icons/MapIcon';
import HeartIcon from './icons/HeartIcon';
import { UserIcon, MapPinIcon, ClockIcon, WalletIcon } from 'lucide-react';

interface RecommendationsProps {
    response: Phase1Response;
    preferences: HoneymoonPreferences;
    images: Record<string, string>;
    onSelect: (destination: DestinationRecommendation) => void;
    onRestart: () => void;
    isLoading: boolean;
    t: (key: string) => string;
}

const RecommendationCard: React.FC<{ 
    rec: DestinationRecommendation, 
    imageUrl?: string, 
    onSelect: () => void, 
    isLoading: boolean, 
    t: (key: string) => string,
    index: number 
}> = ({ rec, imageUrl, onSelect, isLoading, t, index }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className="card-style flex flex-col overflow-hidden group h-full"
    >
         <div className="aspect-[3/4] w-full shimmer-bg relative overflow-hidden">
            {imageUrl && (
                <img 
                    src={imageUrl} 
                    alt={`AI-generated image of ${rec.destinationName}`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-rose-800/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-brand-rose-400 text-brand-rose-800 text-[9px] font-black uppercase tracking-[0.2em] rounded-sm">
                        {rec.tripStructure}
                    </span>
                    {index === 0 && (
                        <span className="px-3 py-1 bg-brand-rose-50 text-brand-rose-700 text-[9px] font-black uppercase tracking-[0.2em] rounded-sm shadow-sm">
                            {t('perfectMatch')}
                        </span>
                    )}
                </div>
                <h3 className="text-4xl font-serif font-black text-brand-rose-50 tracking-tighter leading-none italic">{rec.destinationName}</h3>
            </div>
        </div>
        <div className="p-10 flex-grow flex flex-col bg-white border-x border-b border-brand-rose-100">
            <p className="text-brand-text-main/80 mb-10 text-xl leading-relaxed font-light italic serif h-24 overflow-hidden line-clamp-3">"{rec.whyItMatches}"</p>
            
            <div className="grid grid-cols-2 gap-8 mb-10 border-y border-brand-rose-50 py-6">
                <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-rose-400 flex items-center gap-2">
                        <ClockIcon className="w-3 h-3" />
                        {t('bestTime')}
                    </span>
                    <p className="font-bold text-brand-text-heading text-sm">{rec.bestTimeToVisit}</p>
                </div>
                <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-rose-400 flex items-center gap-2">
                        <WalletIcon className="w-3 h-3" />
                        {t('dailyCost')}
                    </span>
                    <p className="font-bold text-brand-text-heading text-sm">{rec.estimatedDailyCost}</p>
                </div>
            </div>

            <button
                onClick={onSelect}
                disabled={isLoading}
                className="w-full bg-brand-rose-700 text-brand-rose-50 font-black uppercase tracking-[0.3em] text-[10px] py-6 px-8 rounded-sm transition-all duration-300 hover:bg-brand-rose-800 hover:shadow-2xl disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed flex justify-center items-center gap-4 group"
            >
                {isLoading ? (
                     <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <>
                        <span>{t('planThisTrip')}</span>
                        <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </motion.div>
                    </>
                )}
            </button>
        </div>
    </motion.div>
);

const BudgetCard: React.FC<{ breakdown: Phase1Response['budgetBreakdown'], t: (key: string) => string }> = ({ breakdown, t }) => (
    <div className="bg-white p-10 rounded-sm shadow-card border border-brand-rose-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-rose-100 rounded-full -mr-20 -mt-20 opacity-30 blur-3xl -z-10"></div>
        <h3 className="text-2xl font-serif font-black text-brand-text-heading mb-10 tracking-tight italic border-b border-brand-rose-100 pb-6">{t('estimatedBudget')}</h3>
        <dl className="space-y-8">
            {Object.entries(breakdown).map(([key, value]) => (
                <div key={key} className="flex justify-between items-baseline group">
                    <dt className="capitalize text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-subtle group-hover:text-brand-rose-400 transition-colors">{t(key)}</dt>
                    <dd className="font-serif font-bold text-2xl text-brand-text-heading italic">{value}</dd>
                </div>
            ))}
        </dl>
    </div>
);

const PreferenceRecap: React.FC<{ preferences: HoneymoonPreferences, t: (key: string) => string }> = ({ preferences, t }) => (
    <div className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 bg-white border border-brand-rose-100 rounded-sm flex flex-col gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-rose-400 flex items-center gap-2">
                <UserIcon className="w-3 h-3" />
                {t('travelStyle')}
            </span>
            <span className="font-serif font-bold italic text-brand-text-heading capitalize">{preferences.travelStyles.slice(0, 2).join(', ')}</span>
        </div>
        <div className="p-6 bg-white border border-brand-rose-100 rounded-sm flex flex-col gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-rose-400 flex items-center gap-2">
                <MapPinIcon className="w-3 h-3" />
                {t('region')}
            </span>
            <span className="font-serif font-bold italic text-brand-text-heading capitalize">{preferences.destinationRegion || t('anywhere')}</span>
        </div>
        <div className="p-6 bg-white border border-brand-rose-100 rounded-sm flex flex-col gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-rose-400 flex items-center gap-2">
                <ClockIcon className="w-3 h-3" />
                {t('duration')}
            </span>
            <span className="font-serif font-bold italic text-brand-text-heading">{preferences.duration} {t('days')}</span>
        </div>
        <div className="p-6 bg-white border border-brand-rose-100 rounded-sm flex flex-col gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-rose-400 flex items-center gap-2">
                <WalletIcon className="w-3 h-3" />
                {t('budget')}
            </span>
            <span className="font-serif font-bold italic text-brand-text-heading capitalize">{preferences.budget}</span>
        </div>
    </div>
);

const NoResults: React.FC<{ onRestart: () => void, t: (key: string) => string }> = ({ onRestart, t }) => (
     <div className="text-center col-span-full card-style p-10">
        <h3 className="text-2xl font-serif font-bold text-[var(--brand-text-heading)] mb-3">{t('noResultsTitle')}</h3>
        <p className="text-[var(--brand-text-subtle)] mb-6">{t('noResultsDesc')}</p>
        <button onClick={onRestart} className="font-bold text-[var(--brand-rose-600)] hover:text-[var(--brand-rose-800)] transition-colors">
            {t('startOver')}
        </button>
    </div>
);

const Recommendations: React.FC<RecommendationsProps> = ({ response, preferences, images, onSelect, onRestart, isLoading, t }) => {
    const hasRecommendations = response.recommendations && response.recommendations.length > 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <header className="text-center mb-16 relative">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute -top-24 left-1/2 -translate-x-1/2 text-[16rem] font-serif font-black text-brand-rose-200/10 select-none -z-10 tracking-[0.2em] italic leading-none pointer-events-none"
                >
                    MATCHES
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-8xl md:text-9xl font-serif font-black text-brand-text-heading tracking-tighter leading-[0.8] mb-8 italic"
                >
                    {t('recommendationsTitle')}
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-2xl text-brand-text-main/70 max-w-2xl mx-auto font-light leading-relaxed italic font-serif"
                >
                    {t('recommendationsSubtitle')}
                </motion.p>
            </header>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <PreferenceRecap preferences={preferences} t={t} />
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-16 items-start">
                <div className="lg:col-span-8 xl:col-span-9">
                     <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-12">
                        {hasRecommendations ? (
                            response.recommendations.map((rec, index) => (
                                <RecommendationCard 
                                    key={index} 
                                    index={index}
                                    rec={rec} 
                                    imageUrl={images[rec.destinationName]} 
                                    onSelect={() => onSelect(rec)} 
                                    isLoading={isLoading} 
                                    t={t} 
                                />
                            ))
                        ) : (
                            <NoResults onRestart={onRestart} t={t} />
                        )}
                    </div>
                </div>
                {hasRecommendations && (
                    <div className="lg:col-span-4 xl:col-span-3">
                         <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="sticky top-28 space-y-12"
                        >
                            <BudgetCard breakdown={response.budgetBreakdown} t={t} />
                            
                            <div className="p-8 bg-brand-rose-700 rounded-sm border border-brand-rose-800 text-brand-rose-50">
                                <h4 className="text-xl font-serif font-black italic mb-4 border-b border-brand-rose-600 pb-2">{t('expertTip')}</h4>
                                <p className="text-sm font-light italic leading-relaxed opacity-80">
                                    {t('expertTipText')}
                                </p>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={onRestart}
                                    className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-text-subtle hover:text-brand-rose-400 transition-colors"
                                >
                                    {t('orStartOver')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recommendations;
