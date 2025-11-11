import React, { memo } from 'react';

interface FormSelectProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
}

const FormSelect: React.FC<FormSelectProps> = ({ label, name, value, onChange, children }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <div className="relative">
            <select 
                name={name} 
                id={name} 
                value={value} 
                onChange={onChange} 
                className="appearance-none w-full px-3 py-2 pe-8 border border-slate-300 rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500 bg-white"
            >
                {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center px-2 text-slate-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
    </div>
);

export default memo(FormSelect);