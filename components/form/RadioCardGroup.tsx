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
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-subtle/80 mb-6 border-l-2 border-brand-rose-400 pl-3">{label}</label>
            <div className="grid grid-cols-2 gap-4">
                {options.map((option) => {
                    const isSelected = selectedValue === option.id;
                    const Icon = option.icon;
                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => onChange(option.id)}
                            className={`relative text-center rounded-sm border transition-all duration-300 flex flex-col items-center justify-center gap-6 group focus:outline-none h-56
                                ${isSelected
                                    ? 'border-brand-rose-400 bg-brand-rose-100/50 shadow-xl shadow-brand-rose-400/5'
                                    : 'bg-white border-brand-rose-200/50 hover:border-brand-rose-300 hover:shadow-lg'
                                }`}
                        >
                            <div className={`p-5 transition-all duration-500 rounded-full ${isSelected ? 'bg-brand-rose-600 text-brand-rose-100 scale-110 shadow-lg' : 'bg-brand-rose-50 text-brand-rose-400 group-hover:bg-brand-rose-100'}`}>
                                <Icon className="h-10 w-10" strokeWidth={1.5} />
                            </div>
                            <span className={`font-serif font-bold text-2xl tracking-tight italic ${isSelected ? 'text-brand-rose-700' : 'text-brand-text-heading'}`}>{option.name}</span>
                            {isSelected && (
                                <div className="absolute top-6 right-6 w-2 h-2 bg-brand-rose-400 rounded-full shadow-[0_0_8px_var(--color-brand-rose-400)]"></div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default RadioCardGroup;
