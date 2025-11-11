import React from 'react';
import { DetailedCostBreakdown, VisualTimelineEntry } from '../../types';
import CalendarIcon from '../icons/CalendarIcon';
import MoneyIcon from '../icons/MoneyIcon';
import HeartIcon from '../icons/HeartIcon';
import SparkleIcon from '../icons/SparkleIcon';


const CostAndTimeline: React.FC<{ breakdown: DetailedCostBreakdown; timeline: VisualTimelineEntry[]; t: (key: string, replacements?: { [key: string]: string }) => string }> = ({ breakdown, timeline, t }) => {
    return (
        <div className="p-6 bg-white rounded-xl shadow-xl border border-slate-200/80">
            {/* Timeline */}
            <h3 className="text-xl font-serif font-bold text-slate-800 mb-4 flex items-center">
                <CalendarIcon className="h-6 w-6 inline-block me-2" />
                {t('visualTimeline')}
            </h3>
            <div className="mb-6 space-y-2 text-sm">
                {timeline.map(tItem => (
                    <div key={tItem.day} className="flex items-center justify-between">
                        <span className="text-slate-600 flex items-center gap-1.5">
                            {t('day', {day: tItem.day.toString()})} &mdash; {tItem.title} 
                            {tItem.isRomantic && <HeartIcon className="h-4 w-4 inline-block text-rose-500" />} 
                            {tItem.isSpecial && <SparkleIcon />}
                        </span>
                        <span className="font-semibold text-slate-800">{tItem.cost}</span>
                    </div>
                ))}
            </div>
            
            {/* Cost Breakdown */}
            <h3 className="text-xl font-serif font-bold text-slate-800 mb-4 border-t border-slate-200 pt-4 flex items-center">
                 <MoneyIcon className="h-6 w-6 inline-block me-2" />
                 {t('detailedCost')}
            </h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">{t('flights')}</span> <span className="font-semibold">{breakdown.flights}</span></div>
                <div className="flex justify-between"><span className="text-slate-600">{t('accommodation')}</span> <span className="font-semibold">{breakdown.accommodation}</span></div>
                <div className="flex justify-between"><span className="text-slate-600">{t('activitiesSubtotal')}</span> <span className="font-semibold">{breakdown.activitiesSubtotal}</span></div>
                <div className="flex justify-between"><span className="text-slate-600">{t('dining')}</span> <span className="font-semibold">{breakdown.dining}</span></div>
                <div className="flex justify-between"><span className="text-slate-600">{t('localTransport')}</span> <span className="font-semibold">{breakdown.localTransport}</span></div>
                <div className="flex justify-between border-t border-slate-200 mt-2 pt-2"><span className="text-slate-600">{t('contingency')}</span> <span className="font-semibold">{breakdown.contingency}</span></div>
                <div className="flex justify-between text-base font-bold text-slate-900 border-t-2 border-slate-300 mt-2 pt-2">
                    <span>{t('totalEstCost')}</span> 
                    <span>{breakdown.totalCost}</span>
                </div>
            </div>
        </div>
    );
};

export default CostAndTimeline;