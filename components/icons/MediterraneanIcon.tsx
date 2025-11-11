import React from 'react';

const MediterraneanIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z"/>
        <path d="M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
        <path d="M12 14v8"/>
    </svg>
);

export default MediterraneanIcon;