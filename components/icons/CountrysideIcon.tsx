import React from 'react';

const CountrysideIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 5h8v2H8zM12 3v2"/>
        <path d="M12 11h.01"/>
        <path d="M11 17h2"/>
        <path d="M5 21h14"/>
        <path d="M4 14.2 12 6l8 8.2"/>
        <path d="M17 21v-4a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v4"/>
    </svg>
);

export default CountrysideIcon;