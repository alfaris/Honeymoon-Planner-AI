import React from 'react';
import { motion } from 'framer-motion';
import { Accommodation, AccommodationOption } from '../../types';
import AccommodationIcon from '../icons/AccommodationIcon';
import ExternalLinkIcon from '../icons/ExternalLinkIcon';

interface AccommodationCardProps {
    levelKey: 'budget' | 'midRange' | 'luxury';
    level: string;
    option: AccommodationOption;
    t: (key: string) => string;
    index: number;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ levelKey, level, option, t, index }) => {
    const levelColors = {
        budget: 'bg-brand-rose-100 text-brand-rose-700 border-brand-rose-200',
        midRange: 'bg-brand-rose-200 text-brand-rose-800 border-brand-rose-300',
        luxury: 'bg-brand-rose-700 text-brand-rose-50 border-brand-rose-800',
    };
    const colorClasses = levelColors[levelKey];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white p-10 rounded-sm shadow-card border border-brand-rose-100 flex flex-col group hover:border-brand-rose-300 transition-all duration-500 h-full"
        >
            <div className="flex-grow">
                <div className={`inline-block px-3 py-1 rounded-sm text-[9px] font-black uppercase tracking-[0.2em] mb-6 border ${colorClasses}`}>
                    {level}
                </div>
                <p className="font-serif font-black text-3xl text-brand-text-heading mb-3 tracking-tighter italic leading-none">{option.hotelName}</p>
                <div className="flex items-center gap-2 mb-6 text-sm">
                    <span className="font-bold text-brand-rose-700">{option.pricePerNight}</span>
                    <span className="text-brand-rose-300">/</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-text-subtle">{option.distanceToActivities}</span>
                </div>
                <p className="text-lg text-brand-text-main/80 font-light leading-relaxed mb-8 italic serif h-32 overflow-hidden line-clamp-4">"{option.whyGoodForHoneymoon}"</p>
                
                <div className="space-y-3 mb-10 border-t border-brand-rose-50 pt-6">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-rose-400">{t('amenities')}</p>
                    <div className="flex flex-wrap gap-2">
                        {option.amenities.map((amenity, i) => (
                            <span key={i} className="text-[9px] font-bold text-brand-rose-800 bg-brand-rose-50 px-3 py-1.5 rounded-sm border border-brand-rose-100 italic">
                                {amenity}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <a href={option.bookingLink} target="_blank" rel="noopener noreferrer" className="w-full bg-brand-rose-700 text-brand-rose-50 font-black uppercase tracking-[0.3em] text-[10px] py-6 rounded-sm hover:bg-brand-rose-800 transition-all duration-300 flex items-center justify-center gap-3">
                {t('viewAndBook')} 
                <ExternalLinkIcon className="w-4 h-4" />
            </a>
        </motion.div>
    );
};

const AccommodationSection: React.FC<{ accommodationOptions: Accommodation[], t: (key: string, replacements?: { [key: string]: string }) => string }> = ({ accommodationOptions, t }) => {
    return (
        <section id="accommodation" className="mt-24">
            <div className="flex items-end gap-6 mb-12">
                <h3 className="text-5xl font-serif font-bold text-brand-text-heading tracking-tight italic">{t('accommodationOptions')}</h3>
                <div className="h-[1px] flex-grow bg-brand-rose-400/30 mb-3"></div>
            </div>
            <div className="space-y-24">
                {accommodationOptions.map((acc, index) => (
                    <div key={index}>
                        <div className="flex items-center gap-6 mb-10 border-b border-brand-rose-50 pb-6">
                            <div className="w-[2px] h-10 bg-brand-rose-400"></div>
                            <h4 className="text-4xl font-serif font-black text-brand-text-heading tracking-tighter italic">{t('inCity', {city: acc.city})}</h4>
                        </div>
                         <div className="grid md:grid-cols-3 gap-10">
                            <AccommodationCard levelKey="budget" level={t('budget')} option={acc.budget} t={t} index={0} />
                            <AccommodationCard levelKey="midRange" level={t('midRange')} option={acc.midRange} t={t} index={1} />
                            <AccommodationCard levelKey="luxury" level={t('luxury')} option={acc.luxury} t={t} index={2} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AccommodationSection;
