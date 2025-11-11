import React from 'react';
import { Restaurant } from '../../types';
import RestaurantGuideIcon from '../icons/RestaurantGuideIcon';
import ExternalLinkIcon from '../icons/ExternalLinkIcon';

const RestaurantGuide: React.FC<{ restaurants: Restaurant[], t: (key: string) => string }> = ({ restaurants, t }) => {
    return (
        <section id="restaurants" className="p-6 bg-white rounded-xl shadow-xl border border-slate-200/80">
            <h3 className="text-3xl font-serif font-bold text-slate-800 mb-4 border-b-2 border-rose-200 pb-2 flex items-center">
                <RestaurantGuideIcon />
                {t('restaurantGuide')}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
                {restaurants.map((r, index) => (
                    <div key={index} className="bg-slate-50/70 p-4 rounded-lg border border-slate-200/80">
                        <div className="flex justify-between items-start">
                             <h4 className="font-bold text-slate-800">{r.restaurantName}</h4>
                             <span className="text-sm font-semibold text-rose-600">{r.pricePerCouple}</span>
                        </div>
                        <p className="text-xs text-slate-500 mb-2">{r.cuisine} &bull; {r.ambiance}</p>
                        <p className="text-sm text-slate-600 mb-2">{r.whyRecommended}</p>
                        <p className="text-sm mb-3"><strong className="text-slate-700">{t('mustTry')}:</strong> <span>{r.mustTryDishes.join(', ')}</span></p>
                        <a href={r.reservation} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-rose-600 hover:underline flex items-center">{t('reservations')} <ExternalLinkIcon/></a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RestaurantGuide;