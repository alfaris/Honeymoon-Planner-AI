import React from 'react';
import { motion } from 'motion/react';
import { DayPlan, Activity, DinnerRecommendation } from '../../types';
import { MapPin, Clock, ExternalLink, Sun, Moon, Users } from 'lucide-react';

const ActivityCard: React.FC<{ title: string; activity: Activity; t: (key: string) => string; icon: React.ReactNode }> = ({ title, activity, t, icon }) => (
    <div className="flex items-start gap-8">
        <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-brand-rose-100 flex items-center justify-center text-brand-rose-600 shadow-sm border border-brand-rose-200">{icon}</div>
        <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
                <h5 className="font-black uppercase tracking-[0.2em] text-[9px] text-brand-rose-400 border-l border-brand-rose-400 pl-3 leading-none self-center">{title}</h5>
                <span className="font-bold text-xs text-brand-rose-800 bg-brand-rose-100 px-3 py-1 rounded-sm border border-brand-rose-200">{activity.costPerCouple}</span>
            </div>
            <p className="font-serif font-black text-2xl text-brand-text-heading mb-2 tracking-tight italic">{activity.activityName}</p>
            <div className="flex flex-wrap items-center text-[10px] font-bold uppercase tracking-widest text-brand-text-subtle mb-4 gap-x-6 gap-y-1 opacity-70">
                <span className="flex items-center gap-2 font-black"><MapPin size={12} /> {activity.location}</span>
                <span className="flex items-center gap-2 font-black"><Clock size={12} /> {activity.duration}</span>
            </div>
            <p className="text-base text-brand-text-main/80 font-light italic serif leading-relaxed mb-5">{activity.whatToExpect}</p>
            {activity.bookingLink && (
                <a href={activity.bookingLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-rose-700 hover:text-brand-rose-900 transition-colors group">
                    {t('bookNow')}
                    <div className="group-hover:translate-x-1 transition-transform duration-300">
                        <ExternalLink size={12} />
                    </div>
                </a>
            )}
        </div>
    </div>
);

const DinnerCard: React.FC<{ dinner: DinnerRecommendation; t: (key: string) => string }> = ({ dinner, t }) => (
     <div className="flex items-start gap-8">
        <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-brand-rose-100 flex items-center justify-center text-brand-rose-600 shadow-sm border border-brand-rose-200"><Moon size={20} /></div>
        <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
                <h5 className="font-black uppercase tracking-[0.2em] text-[9px] text-brand-rose-400 border-l border-brand-rose-400 pl-3 leading-none self-center">{t('evening')}</h5>
                <span className="font-bold text-xs text-brand-rose-800 bg-brand-rose-100 px-3 py-1 rounded-sm border border-brand-rose-200">{dinner.pricePerCouple}</span>
            </div>
            <p className="font-serif font-black text-2xl text-brand-text-heading mb-2 tracking-tight italic">{dinner.restaurantName}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-rose-400 mb-4">{dinner.cuisine}</p>
            <p className="text-base text-brand-text-main/80 font-light italic serif leading-relaxed mb-4">{dinner.whyRecommended}</p>
            <div className="bg-brand-rose-50/70 p-6 rounded-sm mb-6 border border-brand-rose-100">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-rose-400 mb-2">{t('mustTry')}</p>
                <p className="text-base text-brand-text-main font-serif italic">{dinner.whatToTry.join(', ')}</p>
            </div>
            {dinner.reservation && (
                <a href={dinner.reservation} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-rose-700 hover:text-brand-rose-900 transition-colors group">
                    {t('reserve')}
                    <div className="group-hover:translate-x-1 transition-transform duration-300">
                        <ExternalLink size={12} />
                    </div>
                </a>
            )}
        </div>
    </div>
);


const ItineraryDay: React.FC<{ dayPlan: DayPlan; t: (key: string, replacements?: { [key: string]: string }) => string }> = ({ dayPlan, t }) => {
    return (
        <motion.div 
            id={`day-${dayPlan.day}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="ps-24 relative group mb-12"
        >
             <div className="absolute start-0 top-0 w-16 h-16 bg-brand-rose-700 rounded-sm text-brand-rose-50 flex flex-col items-center justify-center font-black shadow-xl border-[1px] border-brand-rose-600 z-10 transition-transform group-hover:scale-105">
                <span className="block text-[7px] uppercase tracking-[0.3em] leading-none mb-1 opacity-70">{t('day', {day: ''}).trim()}</span>
                <span className="block text-3xl leading-none font-serif italic">{dayPlan.day}</span>
             </div>
            <div className="bg-white p-10 md:p-14 rounded-sm shadow-card border border-brand-rose-100 relative overflow-hidden transition-all group-hover:border-brand-rose-200">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rose-100 rounded-full -mr-32 -mt-32 opacity-20 blur-3xl -z-10"></div>
                <div className="flex justify-between items-baseline mb-10 border-b border-brand-rose-50 pb-6">
                    <h4 className="text-4xl font-serif font-black text-brand-text-heading tracking-tight leading-none italic">{dayPlan.title}</h4>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-rose-700 bg-brand-rose-100 px-4 py-2 rounded-sm border border-brand-rose-200">
                        {dayPlan.dayTotalCost}
                    </div>
                </div>
                <div className="space-y-10">
                    {dayPlan.morning && <ActivityCard title={t('morning')} activity={dayPlan.morning} t={t} icon={<Sun size={20} />} />}
                    {dayPlan.afternoon && <ActivityCard title={t('afternoon')} activity={dayPlan.afternoon} t={t} icon={<Users size={20} />} />}
                    <DinnerCard dinner={dayPlan.evening} t={t} />
                </div>
            </div>
        </motion.div>
    );
};

export default ItineraryDay;
