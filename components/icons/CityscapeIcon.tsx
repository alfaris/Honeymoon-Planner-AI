import React from 'react';

const CityscapeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 21h20"/>
        <path d="M5 21V7l-3 3"/>
        <path d="M9 21V7l-2 2"/>
        <path d="M14 21V3l2 2"/>
        <path d="M19 21V11l-2 2"/>
    </svg>
);

export default CityscapeIcon;