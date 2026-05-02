import React, { memo } from 'react';

interface FormSectionProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, description, children }) => (
    <div className="bg-white p-8 md:p-14 rounded-[0.5rem] shadow-card border border-brand-rose-200/50 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-rose-100 rounded-full -mr-40 -mt-40 opacity-30 blur-3xl -z-10"></div>
        <div className="mb-12 border-b border-brand-rose-100 pb-8">
            <h3 className="text-4xl font-serif font-bold text-brand-text-heading mb-4 tracking-tight italic">{title}</h3>
            <p className="text-xl text-brand-text-subtle font-light italic opacity-70 serif">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {children}
        </div>
    </div>
);

export default memo(FormSection);