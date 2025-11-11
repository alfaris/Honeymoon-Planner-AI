import React from 'react';

interface SegmentedControlProps {
    label: string;
    name: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ label, name, options, value, onChange }) => {
    const handleChange = (newValue: string) => {
        const syntheticEvent = {
            target: { name, value: newValue },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-[var(--brand-text-main)] mb-1.5">{label}</label>
            <div className="flex w-full bg-slate-100 p-1 rounded-lg border border-slate-200">
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => handleChange(option.value)}
                        className={`w-full text-center text-sm font-semibold rounded-md py-2 transition-all duration-300
                            ${value === option.value
                                ? 'bg-white text-[var(--brand-rose-600)] shadow'
                                : 'text-[var(--brand-text-subtle)] hover:bg-slate-200/70'
                            }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SegmentedControl;
