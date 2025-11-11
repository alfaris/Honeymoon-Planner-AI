import React from 'react';
import { DetailedCostBreakdown, VisualTimelineEntry } from '../../types';
import CalendarIcon from '../icons/CalendarIcon';
import MoneyIcon from '../icons/MoneyIcon';
import HeartIcon from '../icons/HeartIcon';
import SparkleIcon from '../icons/SparkleIcon';


const CostAndTimeline: React.FC<{ breakdown: DetailedCostBreakdown; timeline: VisualTimelineEntry[]; t: (key: string, replacements?: { [key: string]: string }) => string }> = ({ breakdown, timeline, t }) => {
    return (
        <div className="card-style p-6">
            {/* Timeline */}
            <h3 className="text-xl font-serif font-bold text-[var(--brand-text-heading)] mb-4 flex items-center">
                <CalendarIcon className="h-6 w-6 inline-block me-2" />
                {t('visualTimeline')}
            </h3>
            <div className="mb-6 space-y-2 text-sm">
                {timeline.map(tItem => (
                    <div key={tItem.day} className="flex items-center justify-between">
                        <span className="text-[var(--brand-text-subtle)] flex items-center gap-1.5">
                            {t('day', {day: tItem.day.toString()})} &mdash; {tItem.title} 
                            {tItem.isRomantic && <HeartIcon className="h-4 w-4 inline-block text-[var(--brand-rose-500)]" />} 
                            {tItem.isSpecial && <SparkleIcon />}
                        </span>
                        <span className="font-semibold text-[var(--brand-text-main)]">{tItem.cost}</span>
                    </div>
                ))}
            </div>
            
            {/* Cost Breakdown */}
            <h3 className="text-xl font-serif font-bold text-[var(--brand-text-heading)] mb-4 border-t border-[var(--brand-border-soft)] pt-6 flex items-center">
                 <MoneyIcon className="h-6 w-6 inline-block me-2" />
                 {t('detailedCost')}
            </h3>
            <dl className="space-y-2 text-sm">
                <div className="flex justify-between even:bg-slate-50 -mx-2 px-2 py-1.5 rounded-md"><dt className="text-[var(--brand-text-subtle)]">{t('flights')}</dt> <dd className="font-semibold">{breakdown.flights}</dd></div>
                <div className="flex justify-between even:bg-slate-50 -mx-2 px-2 py-1.5 rounded-md"><dt className="text-[var(--brand-text-subtle)]">{t('accommodation')}</dt> <dd className="font-semibold">{breakdown.accommodation}</dd></div>
                <div className="flex justify-between even:bg-slate-50 -mx-2 px-2 py-1.5 rounded-md"><dt className="text-[var(--brand-text-subtle)]">{t('activitiesSubtotal')}</dt> <dd className="font-semibold">{breakdown.activitiesSubtotal}</dd></div>
                <div className="flex justify-between even:bg-slate-50 -mx-2 px-2 py-1.5 rounded-md"><dt className="text-[var(--brand-text-subtle)]">{t('dining')}</dt> <dd className="font-semibold">{breakdown.dining}</dd></div>
                <div className="flex justify-between even:bg-slate-50 -mx-2 px-2 py-1.5 rounded-md"><dt className="text-[var(--brand-text-subtle)]">{t('localTransport')}</dt> <dd className="font-semibold">{breakdown.localTransport}</dd></div>
                <div className="flex justify-between border-t border-[var(--brand-border-soft)] mt-2 pt-2"><dt className="text-[var(--brand-text-subtle)]">{t('contingency')}</dt> <dd className="font-semibold">{breakdown.contingency}</dd></div>
                <div className="flex justify-between text-base font-bold text-[var(--brand-text-heading)] border-t-2 border-slate-300 mt-2 pt-2">
                    <dt>{t('totalEstCost')}</dt> 
                    <dd>{breakdown.totalCost}</dd>
                </div>
            </dl>
        </div>
    );
};

export default CostAndTimeline;