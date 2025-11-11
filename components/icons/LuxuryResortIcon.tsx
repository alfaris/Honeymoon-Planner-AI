import React from 'react';

const LuxuryResortIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m2 22 1-1 1 1 1-1 1 1 1-1 1 1 1-1 1 1 1-1 1 1 1-1 1 1 1-1 1 1"/>
        <path d="M16 18a2 2 0 1 1 4 0v2H2v-2a2 2 0 1 0 4 0"/>
        <path d="M10 18v-4"/>
        <path d="M10 10a2 2 0 1 1 4 0v4"/>
        <path d="M4 14a2 2 0 1 1 4 0v4"/>
    </svg>
);

export default LuxuryResortIcon;