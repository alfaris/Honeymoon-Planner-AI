import React, { memo } from 'react';

interface MultiSelectGridProps {
    label: string;
    options: { id: string, name: string, icon?: React.ElementType }[];
    selected: string[];
    onToggle: (value: string) => void;
}

const MultiSelectGrid: React.FC<MultiSelectGridProps> = ({ label, options, selected, onToggle }) => (
    <div className="md:col-span-2">
        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-subtle/80 mb-6 border-l-2 border-brand-rose-400 pl-3">{label}</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {options.map(option => {
                const value = option.name;
                const isSelected = selected.includes(value);
                const Icon = option.icon;
                
                const baseClasses = "relative text-center rounded-sm border text-sm transition-all duration-300 flex items-center justify-center group focus:outline-none overflow-hidden";
                const layoutClasses = Icon ? " flex-col p-5 gap-3 h-36" : " py-4 px-6";
                const stateClasses = isSelected 
                    ? "border-brand-rose-400 bg-brand-rose-100/50 shadow-md"
                    : "bg-white border-brand-rose-200/50 hover:border-brand-rose-300 hover:shadow-lg";

                return (
                    <button 
                        key={option.id} 
                        type="button" 
                        onClick={() => onToggle(value)}
                        className={`${baseClasses} ${layoutClasses} ${stateClasses}`}
                    >
                        {Icon && <Icon className={`h-8 w-8 transition-all duration-500 ${isSelected ? 'text-brand-rose-600 scale-110' : 'text-brand-rose-400 group-hover:text-brand-rose-600'}`} />}
                        <span className={`font-bold tracking-tight uppercase text-[10px] ${isSelected ? 'text-brand-rose-800' : 'text-brand-text-heading'}`}>{value}</span>
                        {isSelected && (
                            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-rose-400 rounded-full"></div>
                        )}
                    </button>
                );
            })}
        </div>
    </div>
);

export default memo(MultiSelectGrid);