import React from 'react';
import { Accommodation, AccommodationOption } from '../../types';
import AccommodationIcon from '../icons/AccommodationIcon';
import ExternalLinkIcon from '../icons/ExternalLinkIcon';

const AccommodationCard: React.FC<{ level: string; option: AccommodationOption, t: (key: string) => string }> = ({ level, option, t }) => (
    <div className="flex-1 min-w-[280px] bg-slate-50/70 p-4 rounded-lg border border-slate-200/80">
        <h5 className="font-bold text-slate-800 capitalize">{level}</h5>
        <p className="font-semibold text-rose-600">{option.hotelName}</p>
        <p className="text-sm font-bold text-slate-900 my-1">{option.pricePerNight}</p>
        <p className="text-xs text-slate-500 mb-2">{option.distanceToActivities}</p>
        <p className="text-sm text-slate-600 mb-3">{option.whyGoodForHoneymoon}</p>
        <p className="text-xs text-slate-500 mb-3"><strong>{t('amenities')}:</strong> {option.amenities.join(', ')}</p>
        <a href={option.bookingLink} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-rose-600 hover:underline flex items-center">{t('viewAndBook')} <ExternalLinkIcon/></a>
    </div>
);

const AccommodationSection: React.FC<{ accommodationOptions: Accommodation[], t: (key: string, replacements?: { [key: string]: string }) => string }> = ({ accommodationOptions, t }) => {
    return (
        <section id="accommodation" className="p-6 bg-white rounded-xl shadow-xl border border-slate-200/80">
            <h3 className="text-3xl font-serif font-bold text-slate-800 mb-4 border-b-2 border-rose-200 pb-2 flex items-center">
                <AccommodationIcon />
                {t('accommodationOptions')}
            </h3>
            <div className="space-y-6">
                {accommodationOptions.map((acc, index) => (
                     <div key={index}>
                        <h4 className="text-lg font-semibold text-slate-700 mb-3">{t('inCity', {city: acc.city})}:</h4>
                         <div className="flex flex-col md:flex-row gap-6">
                            <AccommodationCard level={t('budget')} option={acc.budget} t={t} />
                            <AccommodationCard level={t('midRange')} option={acc.midRange} t={t} />
                            <AccommodationCard level={t('luxury')} option={acc.luxury} t={t} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AccommodationSection;