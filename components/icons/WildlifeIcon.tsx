import React from 'react';

const WildlifeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17.5 5.5a2.5 2.5 0 0 1 0 5h-10a2.5 2.5 0 0 1 0-5Z"/>
        <path d="M20 20a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v2h2a2 2 0 0 0 2-2Z"/>
        <path d="M4 20a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v2H6a2 2 0 0 1-2-2Z"/>
        <path d="M10 18v-5"/>
        <path d="M14 18v-5"/>
    </svg>
);

export default WildlifeIcon;