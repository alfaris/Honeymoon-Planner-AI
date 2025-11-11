import React from 'react';
import { Accommodation, AccommodationOption } from '../../types';
import AccommodationIcon from '../icons/AccommodationIcon';
import ExternalLinkIcon from '../icons/ExternalLinkIcon';

interface AccommodationCardProps {
    levelKey: 'budget' | 'midRange' | 'luxury';
    level: string;
    option: AccommodationOption;
    t: (key: string) => string;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ levelKey, level, option, t }) => {
    const levelColors = {
        budget: 'border-t-emerald-500',
        midRange: 'border-t-sky-500',
        luxury: 'border-t-violet-500',
    };
    const borderColorClass = levelColors[levelKey];

    return (
        <div className={`card-style p-5 ${borderColorClass} border-t-4 flex flex-col`}>
            <div className="flex-grow">
                <h5 className="font-bold text-[var(--brand-text-subtle)] tracking-wider uppercase text-xs mb-2">{level}</h5>
                <p className="font-semibold text-[var(--brand-rose-600)] text-lg">{option.hotelName}</p>
                <p className="text-sm font-bold text-[var(--brand-text-heading)] my-1">{option.pricePerNight}</p>
                <p className="text-xs text-[var(--brand-text-subtle)] mb-2">{option.distanceToActivities}</p>
                <p className="text-sm text-[var(--brand-text-main)] mb-3">{option.whyGoodForHoneymoon}</p>
                <p className="text-xs text-[var(--brand-text-subtle)] mb-3"><strong>{t('amenities')}:</strong> {option.amenities.join(', ')}</p>
            </div>
            <a href={option.bookingLink} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[var(--brand-rose-600)] hover:underline flex items-center mt-auto pt-2">{t('viewAndBook')} <ExternalLinkIcon/></a>
        </div>
    );
};

const AccommodationSection: React.FC<{ accommodationOptions: Accommodation[], t: (key: string, replacements?: { [key: string]: string }) => string }> = ({ accommodationOptions, t }) => {
    return (
        <section id="accommodation" className="card-style p-6">
            <h3 className="text-3xl font-serif font-bold text-[var(--brand-text-heading)] mb-4 border-b-2 border-[var(--brand-rose-200)] pb-2 flex items-center">
                <AccommodationIcon />
                {t('accommodationOptions')}
            </h3>
            <div className="space-y-6">
                {accommodationOptions.map((acc, index) => (
                     <div key={index}>
                        <h4 className="text-lg font-semibold text-[var(--brand-text-main)] mb-3">{t('inCity', {city: acc.city})}:</h4>
                         <div className="grid md:grid-cols-3 gap-6">
                            <AccommodationCard levelKey="budget" level={t('budget')} option={acc.budget} t={t} />
                            <AccommodationCard levelKey="midRange" level={t('midRange')} option={acc.midRange} t={t} />
                            <AccommodationCard levelKey="luxury" level={t('luxury')} option={acc.luxury} t={t} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AccommodationSection;