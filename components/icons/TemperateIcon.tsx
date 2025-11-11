import React from 'react';

const TemperateIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 4 5.5V17a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3v-2.5c2.5-1 4-3 4-5.5a7 7 0 0 0-7-7z"/>
    </svg>
);

export default TemperateIcon;