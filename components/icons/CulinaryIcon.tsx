import React from 'react';

const CulinaryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 12v3h-.5a2.5 2.5 0 0 1-2-2.5V12a2.5 2.5 0 0 1 2.5-2h0A2.5 2.5 0 0 1 2 12Z"/>
        <path d="M22 12v3h.5a2.5 2.5 0 0 0 2-2.5V12a2.5 2.5 0 0 0-2.5-2h0A2.5 2.5 0 0 0 22 12Z"/>
        <path d="M15 2v17a3 3 0 0 1-3 3H3"/>
        <path d="M15 7v10a3 3 0 0 1-3 3"/>
    </svg>
);

export default CulinaryIcon;