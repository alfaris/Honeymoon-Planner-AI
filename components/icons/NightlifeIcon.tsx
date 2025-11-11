import React from 'react';

const NightlifeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M8 2h8"/>
        <path d="M12 14V2"/>
        <path d="m19 14-7-7-7 7"/>
    </svg>
);

export default NightlifeIcon;