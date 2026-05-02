import React, { memo } from 'react';
import { motion } from 'motion/react';

interface MultiSelectGridProps {
    label: string;
    options: { id: string, name: string, icon?: React.ElementType }[];
    selected: string[];
    onToggle: (value: string) => void;
}

const MultiSelectGrid: React.FC<MultiSelectGridProps> = ({ label, options, selected, onToggle }) => (
    <div className="md:col-span-2">
        <div className="flex items-center gap-4 mb-8">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-rose-400 whitespace-nowrap">{label}</label>
            <div className="h-px flex-grow bg-brand-rose-100"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {options.map(option => {
                const value = option.name;
                const isSelected = selected.includes(value);
                const Icon = option.icon;
                
                const baseClasses = "relative text-center rounded-sm border transition-all duration-500 flex items-center justify-center group focus:outline-none overflow-hidden h-44";
                const stateClasses = isSelected 
                    ? "border-brand-rose-400 bg-brand-rose-700 text-brand-rose-50 shadow-xl"
                    : "bg-brand-rose-50/30 border-brand-rose-200/50 hover:border-brand-rose-300 hover:bg-white";

                return (
                    <button 
                        key={option.id} 
                        type="button" 
                        onClick={() => onToggle(value)}
                        className={`${baseClasses} p-6 flex-col gap-4 ${stateClasses}`}
                    >
                        {Icon && <Icon className={`h-8 w-8 transition-all duration-500 ${isSelected ? 'text-brand-rose-300 scale-110' : 'text-brand-rose-400 group-hover:text-brand-rose-700'}`} strokeWidth={1} />}
                        <span className={`font-serif font-black italic text-lg tracking-tight leading-none transition-colors duration-500 ${isSelected ? 'text-white' : 'text-brand-text-heading'}`}>{value}</span>
                        
                        {isSelected && (
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2 end-2 w-1.5 h-1.5 bg-brand-rose-300 rounded-full"
                            />
                        )}
                    </button>
                );
            })}
        </div>
    </div>
);

export default memo(MultiSelectGrid);