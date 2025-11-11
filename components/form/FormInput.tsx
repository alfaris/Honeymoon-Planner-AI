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
}) => (
    <div className={fullWidth ? "md:col-span-2" : isTextArea ? "md:col-span-1" : ""}>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">
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
                className="appearance-none w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500"
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
                className="appearance-none w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500" 
            />
        )}
    </div>
);

export default memo(FormInput);