import React from 'react';

interface RadioCardGroupProps {
    label: string;
    options: { id: string; name: string; icon: React.ElementType }[];
    selectedValue: string;
    onChange: (value: string) => void;
}

const RadioCardGroup: React.FC<RadioCardGroupProps> = ({ label, options, selectedValue, onChange }) => {
    return (
        <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[var(--brand-text-main)] mb-2">{label}</label>
            <div className="grid grid-cols-2 gap-4">
                {options.map((option) => {
                    const isSelected = selectedValue === option.id;
                    const Icon = option.icon;
                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => onChange(option.id)}
                            className={`relative text-center rounded-xl border p-5 transition-all duration-300 flex flex-col items-center justify-center gap-3 group focus:outline-none h-32
                                ${isSelected
                                    ? 'border-[var(--brand-rose-500)] bg-[var(--brand-rose-50)] ring-2 ring-[var(--brand-rose-500)] shadow-inner'
                                    : 'bg-white border-[var(--brand-border-soft)] hover:border-[var(--brand-rose-300)] hover:shadow-lg hover:-translate-y-1 shadow-sm'
                                }`}
                        >
                            <Icon className={`h-10 w-10 transition-colors ${isSelected ? 'text-[var(--brand-rose-500)]' : 'text-[var(--brand-text-subtle)] group-hover:text-[var(--brand-rose-500)]'}`} />
                            <span className={`font-semibold text-lg ${isSelected ? 'text-[var(--brand-rose-600)]' : 'text-[var(--brand-text-main)]'}`}>{option.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default RadioCardGroup;
