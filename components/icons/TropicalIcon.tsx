import React from 'react';

const TropicalIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22v-8"/>
        <path d="M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>
        <path d="m15 14-3-3-3 3"/>
    </svg>
);

export default TropicalIcon;