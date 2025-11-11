import React, { memo } from 'react';

interface FormInputProps { 
    label: string; 
    name: string; 
    value: string; 
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; 
    type?: string; 
    placeholder?: string; 
    fullWidth?: boolean; 
    required?: boolean;
    isTextArea?: boolean;
    rows?: number;
    min?: string;
}

const FormInput: React.FC<FormInputProps> = ({ 
    label, name, value, onChange, type = "text", placeholder, fullWidth, required, isTextArea, rows, min
}) => {
    const commonClasses = "appearance-none w-full px-3 py-2.5 border border-[var(--brand-border-soft)] rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--brand-rose-300)] focus:border-[var(--brand-rose-500)] transition";

    return (
    <div className={fullWidth ? "md:col-span-2" : isTextArea ? "md:col-span-1" : ""}>
        <label htmlFor={name} className="block text-sm font-medium text-[var(--brand-text-main)] mb-1.5">
            {label}
            {required && <span className="text-red-500">*</span>}
        </label>
        {isTextArea ? (
             <textarea 
                id={name} 
                name={name} 
                value={value} 
                onChange={onChange} 
                placeholder={placeholder}
                rows={rows || 3} 
                className={commonClasses}
            ></textarea>
        ) : (
            <input 
                type={type} 
                name={name} 
                id={name} 
                value={value} 
                onChange={onChange} 
                placeholder={placeholder} 
                required={required} 
                min={min}
                className={commonClasses}
            />
        )}
    </div>
)};

export default memo(FormInput);