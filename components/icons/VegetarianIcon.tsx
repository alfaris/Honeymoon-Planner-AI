import React from 'react';

const VegetarianIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 2c-2 0-3.3 1.3-3.3 3s1.3 3 3.3 3"/>
        <path d="M18.7 5H1"/>
        <path d="M15.5 5c0 2.2-1.8 4-4 4s-4-1.8-4-4"/>
        <path d="M4 14a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-2z"/>
    </svg>
);

export default VegetarianIcon;