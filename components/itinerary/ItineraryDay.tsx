import React from 'react';
import { DayPlan, Activity, DinnerRecommendation } from '../../types';
import LocationIcon from '../icons/LocationIcon';
import ClockIcon from '../icons/ClockIcon';
import ExternalLinkIcon from '../icons/ExternalLinkIcon';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';
import UsersIcon from '../icons/UsersIcon';

const ActivityCard: React.FC<{ title: string; activity: Activity; t: (key: string) => string; icon: React.ReactNode }> = ({ title, activity, t, icon }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--brand-rose-100)] flex items-center justify-center text-[var(--brand-rose-600)]">{icon}</div>
        <div>
            <h5 className="font-semibold text-rose-800 text-sm">{title}</h5>
            <p className="font-bold text-slate-800">{activity.activityName}</p>
            <div className="flex flex-wrap items-center text-xs text-slate-500 mb-2 gap-x-3 gap-y-1">
                <span className="flex items-center"><LocationIcon /> {activity.location}</span>
                <span className="flex items-center"><ClockIcon /> {activity.duration}</span>
            </div>
            <p className="text-sm text-slate-600 mb-2">{activity.whatToExpect}</p>
            <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-700">{t('cost')}: {activity.costPerCouple}</span>
                {activity.bookingLink && <a href={activity.bookingLink} target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline font-semibold flex items-center">{t('bookNow')}<ExternalLinkIcon/></a>}
            </div>
        </div>
    </div>
);

const DinnerCard: React.FC<{ dinner: DinnerRecommendation; t: (key: string) => string }> = ({ dinner, t }) => (
     <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--brand-rose-100)] flex items-center justify-center text-[var(--brand-rose-600)]"><MoonIcon /></div>
        <div>
            <h5 className="font-semibold text-rose-800 text-sm">{t('evening')}</h5>
            <p className="font-bold text-slate-800">{dinner.restaurantName}</p>
            <p className="text-xs text-slate-500 mb-2">{dinner.cuisine}</p>
            <p className="text-sm text-slate-600 mb-2">{dinner.whyRecommended}</p>
            <p className="text-sm text-slate-600 mb-2"><strong className="text-slate-700">{t('mustTry')}:</strong> {dinner.whatToTry.join(', ')}</p>
            <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-700">{t('cost')}: {dinner.pricePerCouple}</span>
                {dinner.reservation && <a href={dinner.reservation} target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline font-semibold flex items-center">{t('reserve')}<ExternalLinkIcon/></a>}
            </div>
        </div>
    </div>
);


const ItineraryDay: React.FC<{ dayPlan: DayPlan; t: (key: string, replacements?: { [key: string]: string }) => string }> = ({ dayPlan, t }) => {
    return (
        <div className="ps-14 relative">
             <div className="absolute start-0 top-0 w-10 h-10 bg-[var(--brand-rose-500)] rounded-full text-white flex flex-col items-center justify-center font-bold text-xs shadow-md border-4 border-[var(--brand-rose-100)]">
                <span className="block leading-none">{t('day', {day: ''}).trim()}</span>
                <span className="block text-lg leading-none -mt-0.5">{dayPlan.day}</span>
             </div>
            <div className="card-style p-6">
                <div className="flex justify-between items-baseline mb-4 ms-2">
                    <h4 className="text-xl font-serif font-bold text-slate-900">{dayPlan.title}</h4>
                    <span className="font-semibold text-slate-700">{dayPlan.dayTotalCost}</span>
                </div>
                <div className="space-y-4 divide-y divide-slate-100">
                    {dayPlan.morning && <div className="pt-4 first:pt-0"><ActivityCard title={t('morning')} activity={dayPlan.morning} t={t} icon={<SunIcon />} /></div>}
                    {dayPlan.afternoon && <div className="pt-4 first:pt-0"><ActivityCard title={t('afternoon')} activity={dayPlan.afternoon} t={t} icon={<UsersIcon />} /></div>}
                    <div className="pt-4 first:pt-0"><DinnerCard dinner={dayPlan.evening} t={t} /></div>
                </div>
            </div>
        </div>
    );
};

export default ItineraryDay;