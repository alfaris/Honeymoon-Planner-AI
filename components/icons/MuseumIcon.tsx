import React from 'react';

const MuseumIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 22h16"/>
        <path d="M2 17h20"/>
        <path d="M3 12v5"/>
        <path d="M7 12v5"/>
        <path d="M12 12v5"/>
        <path d="M17 12v5"/>
        <path d="M21 12v5"/>
        <path d="M5 12 12 3l7 9"/>
    </svg>
);

export default MuseumIcon;
