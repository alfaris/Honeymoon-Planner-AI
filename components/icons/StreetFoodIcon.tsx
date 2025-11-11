import React from 'react';

const StreetFoodIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9H4Z"/>
        <path d="M10 9V5"/>
        <path d="M14 9V5"/>
        <path d="M2 9h20"/>
        <path d="M17 14h.01"/>
        <path d="M7 14h.01"/>
    </svg>
);

export default StreetFoodIcon;