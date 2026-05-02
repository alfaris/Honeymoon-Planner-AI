import React from 'react';

interface FormToggleProps {
    label: string;
    description: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormToggle: React.FC<FormToggleProps> = ({ label, description, name, checked, onChange }) => (
    <div className="md:col-span-2 bg-rose-50/50 p-4 rounded-lg border border-rose-200">
        <div className="flex items-center justify-between">
            <div>
                <label htmlFor={name} className="font-bold text-rose-800 text-lg">
                    {label}
                </label>
                <p className="text-sm text-slate-600 mt-1">{description}</p>
            </div>
            <label htmlFor={name} className="relative inline-flex items-center cursor-pointer">
                <input 
                    type="checkbox" 
                    id={name} 
                    name={name}
                    checked={checked} 
                    onChange={onChange}
                    className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-rose-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
            </label>
        </div>
    </div>
);

export default FormToggle;
