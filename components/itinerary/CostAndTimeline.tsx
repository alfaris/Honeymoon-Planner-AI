import React from 'react';
import { DetailedCostBreakdown, VisualTimelineEntry } from '../../types';
import { 
    Calendar, 
    Wallet, 
    Heart, 
    Sparkles 
} from 'lucide-react';


const CostAndTimeline: React.FC<{ breakdown: DetailedCostBreakdown; timeline: VisualTimelineEntry[]; t: (key: string, replacements?: { [key: string]: string }) => string }> = ({ breakdown, timeline, t }) => {
    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-card border border-black/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-rose-50 rounded-full -mr-16 -mt-16 opacity-50 blur-2xl -z-10"></div>
            
            {/* Timeline */}
            <h3 className="text-2xl font-serif font-black text-brand-text-heading mb-8 tracking-tight flex items-center gap-3">
                <div className="p-2 bg-brand-rose-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-brand-rose-500" />
                </div>
                {t('visualTimeline')}
            </h3>
            <div className="mb-10 space-y-4">
                {timeline.map(tItem => (
                    <div key={tItem.day} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-rose-50 flex items-center justify-center text-[10px] font-black text-brand-rose-600 group-hover:bg-brand-rose-500 group-hover:text-white transition-colors duration-300">
                                {tItem.day}
                            </div>
                            <span className="text-sm font-bold text-brand-text-heading group-hover:text-brand-rose-600 transition-colors duration-300 flex items-center gap-2">
                                {tItem.title} 
                                {tItem.isRomantic && <Heart className="h-3 w-3 text-brand-rose-500 fill-current" />} 
                                {tItem.isSpecial && <Sparkles className="h-3 w-3 text-amber-400 fill-current" />}
                            </span>
                        </div>
                        <span className="text-xs font-black text-brand-text-subtle/60">{tItem.cost}</span>
                    </div>
                ))}
            </div>
            
            {/* Cost Breakdown */}
            <h3 className="text-2xl font-serif font-black text-brand-text-heading mb-8 pt-10 border-t border-black/5 tracking-tight flex items-center gap-3">
                 <div className="p-2 bg-brand-rose-50 rounded-lg">
                    <Wallet className="h-5 w-5 text-brand-rose-500" />
                 </div>
                 {t('detailedCost')}
            </h3>
            <dl className="space-y-4">
                {[
                    { key: 'flights', value: breakdown.flights },
                    { key: 'accommodation', value: breakdown.accommodation },
                    { key: 'activitiesSubtotal', value: breakdown.activitiesSubtotal },
                    { key: 'dining', value: breakdown.dining },
                    { key: 'localTransport', value: breakdown.localTransport },
                    { key: 'contingency', value: breakdown.contingency }
                ].map((item, i) => (
                    <div key={item.key} className="flex justify-between items-end border-b border-black/5 pb-3 last:border-b-0">
                        <dt className="text-[10px] font-black uppercase tracking-widest text-brand-text-subtle/60">{t(item.key)}</dt>
                        <dd className="font-bold text-brand-text-heading text-sm">{item.value}</dd>
                    </div>
                ))}
                <div className="flex justify-between items-center bg-brand-text-heading -mx-8 px-8 py-6 mt-6">
                    <dt className="text-xs font-black uppercase tracking-[0.2em] text-white/60">{t('totalEstCost')}</dt> 
                    <dd className="font-serif font-black text-2xl text-white">{breakdown.totalCost}</dd>
                </div>
            </dl>
        </div>
    );
};

export default CostAndTimeline;