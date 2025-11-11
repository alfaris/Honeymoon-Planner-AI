import React, { memo } from 'react';

interface SingleSelectGridProps {
    label: string;
    options: { id: string, name: string, icon?: React.ElementType }[];
    selectedValue: string;
    onSelect: (value: string) => void;
}

const SingleSelectGrid: React.FC<SingleSelectGridProps> = ({ label, options, selectedValue, onSelect }) => (
    <div className="md:col-span-2">
        <label className="block text-sm font-medium text-[var(--brand-text-main)] mb-2">{label}</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {options.map(option => {
                const isSelected = selectedValue === option.name;
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
                        onClick={() => onSelect(isSelected ? '' : option.name)}
                        className={`${baseClasses} ${layoutClasses} ${stateClasses}`}
                    >
                        {Icon && <Icon className={`h-8 w-8 transition-colors ${isSelected ? 'text-[var(--brand-rose-500)]' : 'text-[var(--brand-text-subtle)] group-hover:text-[var(--brand-rose-500)]'}`} />}
                        <span className={`font-medium ${isSelected ? 'text-[var(--brand-rose-600)]' : 'text-[var(--brand-text-main)]'}`}>{option.name}</span>
                    </button>
                );
            })}
        </div>
    </div>
);

export default memo(SingleSelectGrid);