import React from 'react';
import { motion } from 'motion/react';
import { Phase1Response, DestinationRecommendation, HoneymoonPreferences } from '../types';
import { 
    User, 
    MapPin, 
    Clock, 
    Wallet,
    Heart,
    Sparkles,
    ChevronRight,
    ArrowRight
} from 'lucide-react';

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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="card-style flex flex-col overflow-hidden group h-full relative"
    >
        <div className="absolute top-4 right-4 z-20">
            <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-brand-rose-500 hover:text-white transition-all duration-300 shadow-xl border border-white/20 group/heart">
                <Heart size={16} className="group-hover/heart:fill-current" />
            </button>
        </div>
         <div className="aspect-[3/4] w-full shimmer-bg relative overflow-hidden">
            {imageUrl && (
                <motion.img 
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    src={imageUrl} 
                    alt={`AI-generated image of ${rec.destinationName}`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-rose-900 via-brand-rose-900/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700"></div>
            <div className="absolute bottom-6 left-6 right-6">
                <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    className="flex items-center gap-2 mb-3"
                >
                    <span className="px-3 py-1 bg-brand-rose-400 t-brand-rose-900 text-[8px] font-black uppercase tracking-[0.2em] rounded-sm">
                        {rec.tripStructure}
                    </span>
                    {index === 0 && (
                        <span className="px-3 py-1 bg-white text-brand-rose-700 text-[8px] font-black uppercase tracking-[0.2em] rounded-sm shadow-xl flex items-center gap-1.5">
                            <Sparkles size={8} />
                            {t('perfectMatch')}
                        </span>
                    )}
                </motion.div>
                <h3 className="text-4xl md:text-5xl font-serif font-black text-white tracking-tighter leading-none italic">{rec.destinationName}</h3>
            </div>
        </div>
        <div className="p-8 md:p-10 flex-grow flex flex-col bg-white">
            <div className="mb-6">
                <div className="h-[1px] w-8 bg-brand-rose-300 mb-6 group-hover:w-16 transition-all duration-700"></div>
                <p className="text-brand-text-main text-lg leading-relaxed font-light italic serif h-24 overflow-hidden line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">"{rec.whyItMatches}"</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8 border-y border-brand-rose-50 py-6">
                <div className="space-y-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-rose-300 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {t('bestTime')}
                    </span>
                    <p className="font-serif font-black text-brand-text-heading text-base italic">{rec.bestTimeToVisit}</p>
                </div>
                <div className="space-y-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-rose-300 flex items-center gap-2">
                        <Wallet className="w-3 h-3" />
                        {t('dailyCost')}
                    </span>
                    <p className="font-serif font-black text-brand-text-heading text-base italic">{rec.estimatedDailyCost}</p>
                </div>
            </div>

            <div className="mb-8">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-rose-200 block mb-4 italic leading-none">{t('romanticHighlights')}</span>
                <div className="flex flex-wrap gap-2">
                    {rec.romanticHighlights.slice(0, 3).map((highlight, i) => (
                        <span key={i} className="text-[9px] font-bold text-brand-text-subtle bg-brand-rose-50/50 px-2.5 py-1 rounded-full border border-brand-rose-100 italic opacity-60 group-hover:opacity-100 transition-all group-hover:bg-brand-rose-100/50">
                            {highlight}
                        </span>
                    ))}
                </div>
            </div>

            <motion.button
                onClick={onSelect}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-brand-rose-700 text-brand-rose-50 font-black uppercase tracking-[0.3em] text-[9px] py-5 px-8 rounded-sm transition-all duration-500 hover:bg-black disabled:bg-slate-300 disabled:cursor-not-allowed flex justify-center items-center gap-3 overflow-hidden relative group/btn"
            >
                {isLoading ? (
                     <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                     >
                        <Sparkles size={14} />
                     </motion.div>
                ) : (
                    <>
                        <span className="relative z-10">{t('planThisTrip')}</span>
                        <ArrowRight size={12} className="relative z-10 group-hover/btn:translate-x-2 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-brand-rose-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                    </>
                )}
            </motion.button>
        </div>
    </motion.div>
);

const BudgetCard: React.FC<{ breakdown: Phase1Response['budgetBreakdown'], t: (key: string) => string }> = ({ breakdown, t }) => (
    <div className="bg-white p-8 md:p-10 rounded-sm shadow-card border border-brand-rose-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-rose-100 rounded-full -mr-16 -mt-16 opacity-30 blur-3xl -z-10 transition-transform group-hover:scale-150 duration-1000"></div>
        <h3 className="text-xl md:text-2xl font-serif font-black text-brand-text-heading mb-10 tracking-tight italic border-b border-brand-rose-50 pb-6">{t('estimatedBudget')}</h3>
        <dl className="space-y-8">
            {Object.entries(breakdown).map(([key, value]) => (
                <div key={key} className="flex justify-between items-baseline group/item">
                    <dt className="capitalize text-[9px] font-black uppercase tracking-[0.2em] text-brand-text-subtle group-hover/item:text-brand-rose-400 transition-colors">{t(key)}</dt>
                    <dd className="font-serif font-bold text-xl md:text-2xl text-brand-text-heading italic">{value}</dd>
                </div>
            ))}
        </dl>
    </div>
);

const PreferenceRecap: React.FC<{ preferences: HoneymoonPreferences, t: (key: string) => string }> = ({ preferences, t }) => (
    <div className="mb-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { icon: User, label: t('travelStyle'), value: preferences.travelStyles.slice(0, 2).join(', ') },
            { icon: MapPin, label: t('region'), value: preferences.destinationRegion || t('anywhere') },
            { icon: Clock, label: t('duration'), value: `${preferences.duration} ${t('days')}` },
            { icon: Wallet, label: t('budget'), value: preferences.budget }
        ].map((item, idx) => (
            <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 bg-white border border-brand-rose-100/50 rounded-sm flex flex-col gap-2 hover:border-brand-rose-200 transition-colors group shadow-sm"
            >
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-rose-300 flex items-center gap-2 group-hover:text-brand-rose-500 transition-colors">
                    <item.icon className="w-3 h-3" strokeWidth={2.5} />
                    {item.label}
                </span>
                <span className="font-serif font-black italic text-brand-text-heading text-base truncate">{item.value}</span>
            </motion.div>
        ))}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <header className="text-center mb-12 relative">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute -top-16 left-1/2 -translate-x-1/2 text-[12rem] font-serif font-black text-brand-rose-200/10 select-none -z-10 tracking-[0.4em] italic leading-none pointer-events-none uppercase"
                >
                    ESCAPE
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-brand-rose-400 mb-4 block">Curated Just For You</span>
                    <h2 className="text-7xl md:text-8xl font-serif font-black text-brand-text-heading tracking-tighter leading-[0.8] mb-8 italic">
                        {t('recommendationsTitle')}
                    </h2>
                </motion.div>
                
                <div className="flex items-center justify-center gap-6">
                    <div className="h-px w-12 bg-brand-rose-200"></div>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-xl text-brand-text-main/70 max-w-xl font-light leading-relaxed italic font-serif"
                    >
                        {t('recommendationsSubtitle')}
                    </motion.p>
                    <div className="h-px w-12 bg-brand-rose-200"></div>
                </div>
            </header>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <PreferenceRecap preferences={preferences} t={t} />
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 xl:col-span-9">
                     <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
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
                            className="sticky top-28 space-y-8"
                        >
                            <BudgetCard breakdown={response.budgetBreakdown} t={t} />
                            
                            <div className="p-8 bg-brand-rose-700 rounded-sm border border-brand-rose-800 text-brand-rose-50 relative overflow-hidden group hover:bg-brand-rose-800 transition-all duration-500 shadow-xl shadow-brand-rose-900/20">
                                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all"></div>
                                <h4 className="text-xl font-serif font-black italic mb-4 border-b border-brand-rose-600 pb-2 flex items-center gap-2">
                                    <Sparkles size={16} className="text-brand-rose-300" />
                                    {t('expertTip')}
                                </h4>
                                <p className="text-sm font-light italic leading-relaxed opacity-90 relative z-10">
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
