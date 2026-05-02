import React from 'react';
import { motion } from 'motion/react';

interface RadioCardGroupProps {
    label: string;
    options: { id: string; name: string; icon: React.ElementType }[];
    selectedValue: string;
    onChange: (value: string) => void;
}

const RadioCardGroup: React.FC<RadioCardGroupProps> = ({ label, options, selectedValue, onChange }) => {
    return (
        <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-8">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-rose-400 whitespace-nowrap">{label}</label>
                <div className="h-px flex-grow bg-brand-rose-100"></div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                {options.map((option) => {
                    const isSelected = selectedValue === option.id;
                    const Icon = option.icon;
                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => onChange(option.id)}
                            className={`relative text-center rounded-sm border transition-all duration-700 flex flex-col items-center justify-center gap-6 group focus:outline-none h-56 overflow-hidden
                                ${isSelected
                                    ? 'border-brand-rose-400 bg-brand-rose-100/30'
                                    : 'bg-brand-rose-50/20 border-brand-rose-200/40 hover:border-brand-rose-300 hover:bg-white'
                                }`}
                        >
                            <motion.div 
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className={`p-6 transition-all duration-700 rounded-full ${isSelected ? 'bg-brand-rose-700 text-brand-rose-50 shadow-2xl' : 'bg-white text-brand-rose-300 group-hover:text-brand-rose-500 shadow-sm border border-brand-rose-100'}`}
                            >
                                <Icon className="h-12 w-12" strokeWidth={1} />
                            </motion.div>
                            <div className="flex flex-col gap-1">
                                <span className={`font-serif font-black text-3xl tracking-tight italic leading-none transition-colors duration-500 ${isSelected ? 'text-brand-text-heading' : 'text-brand-text-subtle group-hover:text-brand-text-heading'}`}>{option.name}</span>
                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-opacity duration-500 ${isSelected ? 'opacity-40' : 'opacity-0'}`}>Selected Selection</span>
                            </div>
                            
                            {isSelected && (
                                <motion.div 
                                    layoutId="selected-indicator"
                                    className="absolute bottom-0 left-0 right-0 h-1.5 bg-brand-rose-400"
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default RadioCardGroup;
