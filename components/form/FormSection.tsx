import React, { memo } from 'react';

interface FormSectionProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, description, children }) => (
    <div className="bg-white/80 p-6 rounded-lg shadow-lg border border-slate-200 mb-8 backdrop-blur-sm">
        <h3 className="text-3xl font-serif font-bold text-slate-800 mb-1">{title}</h3>
        <p className="text-slate-500 mb-6">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {children}
        </div>
    </div>
);

export default memo(FormSection);