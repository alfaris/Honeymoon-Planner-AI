import React from 'react';

const BeachIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 12.5a4.5 4.5 0 1 1 9 0"/>
        <path d="M12 3v.01"/>
        <path d="m6.6 6.6.01.01"/>
        <path d="M21 12h-.01"/>
        <path d="m17.4 17.4.01.01"/>
        <path d="M3 12h.01"/>
        <path d="m6.6 17.4-.01.01"/>
        <path d="m17.4 6.6-.01.01"/>
        <path d="M3 16.5a8.9 8.9 0 0 0 18 0"/>
    </svg>
);

export default BeachIcon;
