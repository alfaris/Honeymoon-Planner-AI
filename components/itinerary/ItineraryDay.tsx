import React from 'react';
import { DayPlan, Activity, DinnerRecommendation } from '../../types';
import LocationIcon from '../icons/LocationIcon';
import ClockIcon from '../icons/ClockIcon';
import ExternalLinkIcon from '../icons/ExternalLinkIcon';

const ActivityCard: React.FC<{ title: string; activity: Activity; t: (key: string) => string }> = ({ title, activity, t }) => (
    <div>
        <h5 className="font-semibold text-rose-800">{title}</h5>
        <p className="font-bold text-slate-800">{activity.activityName}</p>
        <div className="flex flex-wrap items-center text-sm text-slate-500 mb-2">
            <span className="flex items-center me-3"><LocationIcon /> {activity.location}</span>
            <span className="flex items-center"><ClockIcon /> {activity.duration}</span>
        </div>
        <p className="text-sm text-slate-600 mb-2">{activity.whatToExpect}</p>
        <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-slate-700">{t('cost')}: {activity.costPerCouple}</span>
            {activity.bookingLink && <a href={activity.bookingLink} target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline font-semibold flex items-center">{t('bookNow')}<ExternalLinkIcon/></a>}
        </div>
    </div>
);

const DinnerCard: React.FC<{ dinner: DinnerRecommendation; t: (key: string) => string }> = ({ dinner, t }) => (
     <div>
        <h5 className="font-semibold text-rose-800">{t('evening')}</h5>
        <p className="font-bold text-slate-800">{dinner.restaurantName}</p>
        <p className="text-sm text-slate-500 mb-2">{dinner.cuisine}</p>
        <p className="text-sm text-slate-600 mb-2">{dinner.whyRecommended}</p>
        <p className="text-sm text-slate-600 mb-2"><strong className="text-slate-700">{t('mustTry')}:</strong> {dinner.whatToTry.join(', ')}</p>
        <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-slate-700">{t('cost')}: {dinner.pricePerCouple}</span>
            {dinner.reservation && <a href={dinner.reservation} target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline font-semibold flex items-center">{t('reserve')}<ExternalLinkIcon/></a>}
        </div>
    </div>
);


const ItineraryDay: React.FC<{ dayPlan: DayPlan; t: (key: string, replacements?: { [key: string]: string }) => string }> = ({ dayPlan, t }) => {
    return (
        <div className="ps-12 relative">
             <div className="absolute start-6 top-5 transform -translate-x-1/2 w-4 h-4 bg-rose-500 rounded-full border-4 border-rose-100"></div>
            <div className="bg-white p-6 rounded-xl shadow-xl border border-slate-200/80">
                <div className="flex justify-between items-baseline mb-4">
                    <h4 className="text-xl font-serif font-bold text-slate-900">{t('day', {day: dayPlan.day.toString()})}: <span className="text-rose-600">{dayPlan.title}</span></h4>
                    <span className="font-semibold text-slate-700">{dayPlan.dayTotalCost}</span>
                </div>
                <div className="space-y-4 divide-y divide-slate-100">
                    {dayPlan.morning && <div className="pt-4 first:pt-0"><ActivityCard title={t('morning')} activity={dayPlan.morning} t={t} /></div>}
                    {dayPlan.afternoon && <div className="pt-4 first:pt-0"><ActivityCard title={t('afternoon')} activity={dayPlan.afternoon} t={t} /></div>}
                    <div className="pt-4 first:pt-0"><DinnerCard dinner={dayPlan.evening} t={t} /></div>
                </div>
            </div>
        </div>
    );
};

export default ItineraryDay;