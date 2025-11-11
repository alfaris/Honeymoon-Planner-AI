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
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200/80 flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        <div className="aspect-[4/3] w-full bg-slate-200 animate-pulse">
            {imageUrl && <img src={imageUrl} alt={`AI-generated image of ${rec.destinationName}`} className="w-full h-full object-cover" />}
        </div>
        <div className="p-6 flex-grow">
            <h3 className="text-2xl font-serif font-bold text-slate-800 mb-3">{rec.destinationName}</h3>
            <p className="text-slate-600 mb-4 text-sm">{rec.whyItMatches}</p>
            <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <CalendarIcon />
                    <div><strong>{t('bestTime')}:</strong> {rec.bestTimeToVisit}</div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <MoneyIcon />
                    <div><strong>{t('dailyCost')}:</strong> {rec.estimatedDailyCost}</div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <MapIcon />
                    <div><strong>{t('tripStructure')}:</strong> {rec.tripStructure}</div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <HeartIcon />
                    <div>
                        <strong>{t('romanticHighlights')}:</strong>
                        <ul className="list-disc list-inside ms-1 mt-1 text-slate-500">
                            {rec.romanticHighlights.map((h, i) => <li key={i}>{h}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="p-6 bg-slate-50/70 mt-auto">
            <button
                onClick={onSelect}
                disabled={isLoading}
                className="w-full bg-gradient-to-br from-rose-500 to-rose-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-rose-200 disabled:from-slate-400 disabled:to-slate-500 disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed"
            >
                {isLoading ? t('planning') : t('planThisTrip')}
            </button>
        </div>
    </div>
);

const BudgetCard: React.FC<{ breakdown: Phase1Response['budgetBreakdown'], t: (key: string) => string }> = ({ breakdown, t }) => (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-xl border border-slate-200/80">
        <h3 className="text-xl font-serif font-bold text-slate-800 mb-4">{t('estimatedBudget')}</h3>
        <div className="space-y-3">
            {Object.entries(breakdown).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center text-sm border-b border-slate-200/80 pb-2">
                    <span className="capitalize text-slate-600">{t(key)}</span>
                    <span className="font-semibold text-slate-800">{value}</span>
                </div>
            ))}
        </div>
    </div>
);

const NoResults: React.FC<{ onRestart: () => void, t: (key: string) => string }> = ({ onRestart, t }) => (
     <div className="text-center col-span-full bg-white p-10 rounded-xl shadow-xl border border-slate-200/80">
        <h3 className="text-2xl font-serif font-bold text-slate-800 mb-3">{t('noResultsTitle')}</h3>
        <p className="text-slate-600 mb-6">{t('noResultsDesc')}</p>
        <button onClick={onRestart} className="text-rose-600 hover:text-rose-800 font-bold transition-colors">
            {t('startOver')}
        </button>
    </div>
);

const Recommendations: React.FC<RecommendationsProps> = ({ response, images, onSelect, onRestart, isLoading, t }) => {
    const hasRecommendations = response.recommendations && response.recommendations.length > 0;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-5xl font-serif font-extrabold text-slate-900">{t('recommendationsTitle')}</h2>
                <p className="mt-4 text-lg text-slate-600">{t('recommendationsSubtitle')}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <div className="lg:col-span-2 xl:col-span-3">
                     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="lg:col-span-1">
                         <div className="sticky top-28">
                            <BudgetCard breakdown={response.budgetBreakdown} t={t} />
                        </div>
                    </div>
                )}
            </div>
            
            {hasRecommendations && (
                <div className="text-center mt-12">
                    <button
                        onClick={onRestart}
                        className="text-slate-600 hover:text-rose-600 font-medium transition-colors"
                    >
                        {t('orStartOver')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Recommendations;