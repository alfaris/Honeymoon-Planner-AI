import React, { memo } from 'react';

interface MultiSelectGridProps {
    label: string;
    options: { id: string, name: string, icon?: React.ElementType }[];
    selected: string[];
    onToggle: (value: string) => void;
}

const CheckCircleIcon: React.FC = () => (
    <div className="absolute top-2 right-2 h-5 w-5 bg-white rounded-full flex items-center justify-center shadow">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
    </div>
);


const MultiSelectGrid: React.FC<MultiSelectGridProps> = ({ label, options, selected, onToggle }) => (
    <div className="md:col-span-2">
        <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {options.map(option => {
                const value = option.name;
                const isSelected = selected.includes(value);
                const Icon = option.icon;
                
                let buttonClasses = "relative text-center rounded-lg border text-sm transition-all duration-200 flex items-center justify-center group";

                if (Icon) {
                    buttonClasses += " flex-col p-4 gap-2";
                } else {
                    buttonClasses += " py-3 px-4";
                }

                if (isSelected) {
                    buttonClasses += " bg-rose-500 text-white border-rose-600 ring-2 ring-rose-300";
                } else {
                    buttonClasses += " bg-white hover:bg-rose-50 border-slate-300";
                }

                return (
                    <button 
                        key={option.id} 
                        type="button" 
                        onClick={() => onToggle(value)}
                        className={buttonClasses}
                    >
                        {Icon && <Icon className={`h-8 w-8 transition-colors ${isSelected ? 'text-white' : 'text-slate-500 group-hover:text-rose-500'}`} />}
                        <span className="font-medium">{value}</span>
                        {isSelected && <CheckCircleIcon />}
                    </button>
                );
            })}
        </div>
    </div>
);

export default memo(MultiSelectGrid);