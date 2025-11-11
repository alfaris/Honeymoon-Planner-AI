import React from 'react';
import { Phase1Response, DestinationRecommendation } from '../types';
import CalendarIcon from './icons/CalendarIcon';
import MoneyIcon from './icons/MoneyIcon';
import MapIcon from './icons/MapIcon';
import HeartIcon from './icons/HeartIcon';

interface RecommendationsProps {
    response: Phase1Response;
    images: Record<string, string>;
    onSelect: (destination: DestinationRecommendation) => void;
    onRestart: () => void;
    isLoading: boolean;
    t: (key: string) => string;
}

const RecommendationCard: React.FC<{ rec: DestinationRecommendation, imageUrl?: string, onSelect: () => void, isLoading: boolean, t: (key: string) => string }> = ({ rec, imageUrl, onSelect, isLoading, t }) => (
    <div className="card-style flex flex-col overflow-hidden">
        <div className="aspect-[4/3] w-full shimmer-bg">
            {imageUrl && <img src={imageUrl} alt={`AI-generated image of ${rec.destinationName}`} className="w-full h-full object-cover" />}
        </div>
        <div className="p-5 flex-grow flex flex-col">
            <h3 className="text-2xl font-serif font-bold text-[var(--brand-text-heading)] mb-2">{rec.destinationName}</h3>
            <p className="text-[var(--brand-text-subtle)] mb-4 text-sm leading-relaxed">{rec.whyItMatches}</p>
            
            <div className="space-y-3 text-sm mt-auto pt-4 border-t border-[var(--brand-border-soft)]">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <CalendarIcon className="h-5 w-5 text-[var(--brand-rose-500)] mt-0.5 shrink-0" />
                    <div><strong className="text-[var(--brand-text-main)]">{t('bestTime')}:</strong> <span className="text-[var(--brand-text-subtle)]">{rec.bestTimeToVisit}</span></div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <MoneyIcon className="h-5 w-5 text-[var(--brand-rose-500)] mt-0.5 shrink-0" />
                    <div><strong className="text-[var(--brand-text-main)]">{t('dailyCost')}:</strong> <span className="text-[var(--brand-text-subtle)]">{rec.estimatedDailyCost}</span></div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <MapIcon className="h-5 w-5 text-[var(--brand-rose-500)] mt-0.5 shrink-0" />
                    <div><strong className="text-[var(--brand-text-main)]">{t('tripStructure')}:</strong> <span className="text-[var(--brand-text-subtle)]">{rec.tripStructure}</span></div>
                </div>
            </div>
        </div>
        <div className="p-5 bg-[var(--brand-surface-subtle)]/70">
            <button
                onClick={onSelect}
                disabled={isLoading}
                className="w-full bg-gradient-to-br from-[var(--brand-rose-500)] to-[var(--brand-rose-600)] text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-[var(--brand-rose-200)] disabled:from-slate-400 disabled:to-slate-500 disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed flex justify-center items-center"
            >
                {isLoading ? (
                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : t('planThisTrip')}
            </button>
        </div>
    </div>
);

const BudgetCard: React.FC<{ breakdown: Phase1Response['budgetBreakdown'], t: (key: string) => string }> = ({ breakdown, t }) => (
    <div className="card-style p-6">
        <h3 className="text-xl font-serif font-bold text-[var(--brand-text-heading)] mb-4">{t('estimatedBudget')}</h3>
        <dl className="space-y-3">
            {Object.entries(breakdown).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center text-sm border-b border-[var(--brand-border-soft)]/80 pb-3 last:border-b-0">
                    <dt className="capitalize text-[var(--brand-text-subtle)]">{t(key)}</dt>
                    <dd className="font-semibold text-[var(--brand-text-main)]">{value}</dd>
                </div>
            ))}
        </dl>
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

const Recommendations: React.FC<RecommendationsProps> = ({ response, images, onSelect, onRestart, isLoading, t }) => {
    const hasRecommendations = response.recommendations && response.recommendations.length > 0;

    return (
        <div>
            <div className="text-center mb-12">
                <h2 className="text-5xl font-serif font-extrabold text-[var(--brand-text-heading)]">{t('recommendationsTitle')}</h2>
                <p className="mt-4 text-lg text-[var(--brand-text-subtle)]">{t('recommendationsSubtitle')}</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 xl:col-span-9">
                     <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {hasRecommendations ? (
                            response.recommendations.map((rec, index) => (
                                <RecommendationCard key={index} rec={rec} imageUrl={images[rec.destinationName]} onSelect={() => onSelect(rec)} isLoading={isLoading} t={t} />
                            ))
                        ) : (
                            <NoResults onRestart={onRestart} t={t} />
                        )}
                    </div>
                </div>
                {hasRecommendations && (
                    <div className="lg:col-span-4 xl:col-span-3">
                         <div className="sticky top-28 space-y-6">
                            <BudgetCard breakdown={response.budgetBreakdown} t={t} />
                            <div className="text-center">
                                <button
                                    onClick={onRestart}
                                    className="text-sm text-[var(--brand-text-subtle)] hover:text-[var(--brand-rose-600)] font-medium transition-colors"
                                >
                                    {t('orStartOver')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recommendations;