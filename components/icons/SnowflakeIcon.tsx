import React from 'react';

const SnowflakeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2v20"/>
        <path d="M22 12H2"/>
        <path d="m20 18-8-8-8 8"/>
        <path d="m4 18 8-8 8 8"/>
        <path d="m20 6-8 8-8-8"/>
        <path d="m4 6 8 8 8-8"/>
    </svg>
);

export default SnowflakeIcon;