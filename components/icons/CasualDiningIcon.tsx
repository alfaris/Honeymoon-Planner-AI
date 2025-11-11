import React from 'react';

const CasualDiningIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 12c0-2.3-1.4-4-4-4.5V4h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v3.5c-2.6.5-4 2.2-4 4.5v8h14v-8Z"/>
        <path d="M6 14h12"/>
    </svg>
);

export default CasualDiningIcon;