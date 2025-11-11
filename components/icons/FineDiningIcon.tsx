import React from 'react';

const FineDiningIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M7 21h10"/>
        <path d="M12 3v18"/>
        <path d="M3 3v7c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V3"/>
    </svg>
);

export default FineDiningIcon;