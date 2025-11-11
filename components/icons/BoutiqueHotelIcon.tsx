import React from 'react';

const BoutiqueHotelIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 21h20"/>
        <path d="M3 11v9h5v-5h6v5h5v-9L12 3 3 11z"/>
        <path d="M12 9a2 2 0 0 1 2 2v2a2 2 0 0 1-4 0v-2a2 2 0 0 1 2-2z"/>
    </svg>
);

export default BoutiqueHotelIcon;