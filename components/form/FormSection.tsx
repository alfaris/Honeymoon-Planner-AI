import React, { memo } from 'react';

interface FormSectionProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, description, children }) => (
    <div className="bg-[var(--brand-surface)]/80 p-6 rounded-2xl shadow-lg border border-black/5 mb-8 backdrop-blur-sm">
        <h3 className="text-3xl font-serif font-bold text-[var(--brand-text-heading)] mb-1">{title}</h3>
        <p className="text-[var(--brand-text-subtle)] mb-6">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {children}
        </div>
    </div>
);

export default memo(FormSection);