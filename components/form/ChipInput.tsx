import React from 'react';

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
                className="appearance-none w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500"
            />
            <div className="flex flex-wrap gap-2 mt-2">
                {suggestions.map((suggestion, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => handleChipClick(suggestion)}
                        className="px-2.5 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                    >
                        + {suggestion}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChipInput;