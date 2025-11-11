import React, { memo } from 'react';

interface MultiSelectGridProps {
    label: string;
    options: { id: string, name: string, icon?: React.ElementType }[];
    selected: string[];
    onToggle: (value: string) => void;
}

const CheckCircleIcon: React.FC = () => (
    <div className="absolute top-2 right-2 h-6 w-6 bg-[var(--brand-rose-500)] rounded-full flex items-center justify-center shadow-md border-2 border-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    </div>
);


const MultiSelectGrid: React.FC<MultiSelectGridProps> = ({ label, options, selected, onToggle }) => (
    <div className="md:col-span-2">
        <label className="block text-sm font-medium text-[var(--brand-text-main)] mb-2">{label}</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {options.map(option => {
                const value = option.name;
                const isSelected = selected.includes(value);
                const Icon = option.icon;
                
                const baseClasses = "relative text-center rounded-xl border text-sm transition-all duration-300 flex items-center justify-center group focus:outline-none";
                const layoutClasses = Icon ? " flex-col p-4 gap-2 h-28" : " py-3 px-4";
                const stateClasses = isSelected 
                    ? "border-[var(--brand-rose-500)] bg-[var(--brand-rose-50)] ring-2 ring-[var(--brand-rose-500)] shadow-inner"
                    : "bg-white border-[var(--brand-border-soft)] hover:border-[var(--brand-rose-300)] hover:shadow-lg hover:-translate-y-1 shadow-sm";

                return (
                    <button 
                        key={option.id} 
                        type="button" 
                        onClick={() => onToggle(value)}
                        className={`${baseClasses} ${layoutClasses} ${stateClasses}`}
                    >
                        {Icon && <Icon className={`h-8 w-8 transition-colors ${isSelected ? 'text-[var(--brand-rose-500)]' : 'text-[var(--brand-text-subtle)] group-hover:text-[var(--brand-rose-500)]'}`} />}
                        <span className={`font-medium ${isSelected ? 'text-[var(--brand-rose-600)]' : 'text-[var(--brand-text-main)]'}`}>{value}</span>
                        {isSelected && <CheckCircleIcon />}
                    </button>
                );
            })}
        </div>
    </div>
);

export default memo(MultiSelectGrid);