import React, { memo } from 'react';

interface FormSectionProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, description, children }) => (
    <div className="bg-white p-6 md:p-10 rounded-sm shadow-card border border-brand-rose-200/30 mb-8 relative overflow-hidden group">
        <div className="absolute top-0 end-0 w-96 h-96 bg-brand-rose-100 rounded-full -me-48 -mt-48 opacity-20 blur-3xl -z-10 group-hover:scale-110 transition-transform duration-1000"></div>
        <header className="mb-10 border-b border-brand-rose-100/50 pb-6 relative">
            <div className="absolute top-0 start-0 w-8 h-1 bg-brand-rose-700"></div>
            <h3 className="text-4xl font-serif font-black text-brand-text-heading mb-4 tracking-tight italic leading-none">{title}</h3>
            <p className="text-xl text-brand-text-subtle font-light italic serif leading-relaxed opacity-70">{description}</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {children}
        </div>
    </div>
);

export default memo(FormSection);