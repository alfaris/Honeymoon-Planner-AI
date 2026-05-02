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
    const commonClasses = "w-full px-5 py-4 bg-brand-rose-50/50 border border-brand-rose-200 rounded-sm focus:ring-1 focus:ring-brand-rose-400 focus:border-brand-rose-400 outline-none transition-all duration-300 text-brand-text-heading placeholder-brand-text-subtle/40 font-medium";

    return (
    <div className={fullWidth ? "md:col-span-2" : isTextArea ? "md:col-span-1" : ""}>
        <label htmlFor={name} className="block text-[10px] font-bold uppercase tracking-widest text-brand-text-subtle/80 mb-3 ms-1">
            {label}
            {required && <span className="text-brand-rose-500">*</span>}
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