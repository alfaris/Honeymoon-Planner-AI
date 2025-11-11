import React, { memo } from 'react';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-[var(--brand-rose-100)] rounded-full h-2 mb-8 sticky top-[84px] z-10 backdrop-blur-sm">
        <div 
            className="bg-gradient-to-r from-[var(--brand-rose-400)] to-[var(--brand-rose-600)] h-2 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
        ></div>
    </div>
);

export default memo(ProgressBar);