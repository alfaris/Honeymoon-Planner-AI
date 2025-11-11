import React from 'react';

const WellnessSpaIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8 16s-2-3-2-5a4 4 0 0 1 8 0c0 2-2 5-2 5"/>
        <path d="M12 21a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Z"/>
        <path d="M12.25 11.25a2.5 2.5 0 0 1-4.5 0"/>
        <path d="M16.75 11.25a2.5 2.5 0 0 0 4.5 0"/>
        <path d="M14.5 6.5a2.5 2.5 0 0 0-5 0"/>
    </svg>
);

export default WellnessSpaIcon;