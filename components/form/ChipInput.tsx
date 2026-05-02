import React from 'react';
import { Plus } from 'lucide-react';

interface ChipInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    suggestions: string[];
    required?: boolean;
    fullWidth?: boolean;
}

const ChipInput: React.FC<ChipInputProps> = ({
    label, name, value, onChange, placeholder, suggestions, required, fullWidth
}) => {
    const handleChipClick = (suggestion: string) => {
        const newValue = value ? `${value}, ${suggestion}` : suggestion;
        const syntheticEvent = {
            target: {
                name,
                value: newValue,
            },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
    };

    return (
        <div className={fullWidth ? "md:col-span-2" : "md:col-span-1"}>
            <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type="text"
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="appearance-none w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 transition-all text-sm"
            />
            <div className="flex flex-wrap gap-2 mt-2">
                {suggestions.map((suggestion, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => handleChipClick(suggestion)}
                        className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-brand-rose-600 bg-brand-rose-100 rounded-full hover:bg-brand-rose-200 transition-all transform hover:scale-105"
                    >
                        <Plus size={10} strokeWidth={3} />
                        {suggestion}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChipInput;