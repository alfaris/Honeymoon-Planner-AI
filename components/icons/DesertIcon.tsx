import React from 'react';

const DesertIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M13 10c0-4-3-4-3-4s-3 0-3 4c0 2.2 1.3 4 3 4s3-1.8 3-4Z"/>
        <path d="M10 14c-4 0-4 3-4 3s0 3 4 3c2.2 0 4-1.3 4-3s-1.8-3-4-3Z"/>
        <path d="M15.5 10a2.5 2.5 0 0 0 5 0c0-2-1.2-3-2.5-3s-2.5 1-2.5 3Z"/>
        <path d="m18 14-1.5 5"/>
        <path d="M15 17h6"/>
    </svg>
);

export default DesertIcon;