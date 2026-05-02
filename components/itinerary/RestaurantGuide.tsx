import React from 'react';
import { motion } from 'motion/react';
import { Restaurant } from '../../types';
import { ExternalLink } from 'lucide-react';

const RestaurantGuide: React.FC<{ restaurants: Restaurant[], t: (key: string) => string }> = ({ restaurants, t }) => {
    return (
        <section id="restaurants" className="mt-16">
            <div className="flex items-end gap-5 mb-8">
                <h3 className="text-4xl font-serif font-bold text-brand-text-heading tracking-tight italic">{t('restaurantGuide')}</h3>
                <div className="h-[1px] flex-grow bg-brand-rose-400/30 mb-3"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {restaurants.map((r, index) => (
                    <motion.div 
                        key={index} 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="bg-white p-8 rounded-sm shadow-card border border-brand-rose-100 flex flex-col group hover:border-brand-rose-300 transition-all duration-500 relative overflow-hidden h-full"
                    >
                        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-rose-100 rounded-full -mr-24 -mt-24 opacity-20 blur-3xl -z-10"></div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-baseline mb-2">
                                <h4 className="font-serif font-black text-2xl text-brand-text-heading tracking-tighter italic leading-none">{r.restaurantName}</h4>
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-rose-700 bg-brand-rose-100 px-3 py-1.5 rounded-sm border border-brand-rose-200">{r.pricePerCouple}</span>
                            </div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-rose-400 mb-4">{r.cuisine} &bull; {r.ambiance}</p>
                            <p className="text-base text-brand-text-main/80 font-light leading-relaxed mb-6 italic serif h-24 overflow-hidden line-clamp-3">"{r.whyRecommended}"</p>
                            <div className="bg-brand-rose-50/70 p-6 rounded-sm mb-8 border border-brand-rose-100">
                                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-rose-400 mb-2">{t('mustTry')}</p>
                                <p className="text-sm text-brand-text-main font-serif italic">{r.mustTryDishes.join(', ')}</p>
                            </div>
                        </div>
                        <a href={r.reservation} target="_blank" rel="noopener noreferrer" className="w-full bg-brand-rose-700 text-brand-rose-50 font-black uppercase tracking-[0.3em] text-[10px] py-6 rounded-sm hover:bg-brand-rose-800 transition-all duration-300 flex items-center justify-center gap-3">
                            {t('reservations')} 
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default RestaurantGuide;
