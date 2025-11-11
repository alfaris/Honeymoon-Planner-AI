import React from 'react';
import { Restaurant } from '../../types';
import RestaurantGuideIcon from '../icons/RestaurantGuideIcon';
import ExternalLinkIcon from '../icons/ExternalLinkIcon';

const RestaurantGuide: React.FC<{ restaurants: Restaurant[], t: (key: string) => string }> = ({ restaurants, t }) => {
    return (
        <section id="restaurants" className="card-style p-6">
            <h3 className="text-3xl font-serif font-bold text-[var(--brand-text-heading)] mb-4 border-b-2 border-[var(--brand-rose-200)] pb-2 flex items-center">
                <RestaurantGuideIcon />
                {t('restaurantGuide')}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
                {restaurants.map((r, index) => (
                    <div key={index} className="card-style p-5 border-l-4 border-[var(--brand-rose-400)] flex flex-col">
                        <div className="flex-grow">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-[var(--brand-text-heading)] text-lg pr-2">{r.restaurantName}</h4>
                                <span className="text-xs font-bold text-[var(--brand-rose-800)] bg-[var(--brand-rose-100)] px-2.5 py-1 rounded-full whitespace-nowrap">{r.pricePerCouple}</span>
                            </div>
                            <p className="text-sm text-[var(--brand-text-subtle)] mb-3">{r.cuisine} &bull; {r.ambiance}</p>
                            <p className="text-sm text-[var(--brand-text-main)] mb-4">{r.whyRecommended}</p>
                            <div className="bg-slate-100 p-3 rounded-lg">
                                <p className="text-sm"><strong className="text-slate-700 font-semibold">{t('mustTry')}:</strong> <span className="text-slate-600">{r.mustTryDishes.join(', ')}</span></p>
                            </div>
                        </div>
                        <a href={r.reservation} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[var(--brand-rose-600)] hover:underline flex items-center mt-4 pt-3 border-t border-[var(--brand-border-soft)] self-start">{t('reservations')} <ExternalLinkIcon/></a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RestaurantGuide;