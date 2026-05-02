import React, { memo } from 'react';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-brand-rose-100 h-[2px] relative overflow-visible">
        <div 
            className="bg-brand-rose-400 h-full transition-all duration-700 ease-in-out relative" 
            style={{ width: `${progress}%` }}
        >
            <div className="absolute ltr:right-0 rtl:left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-brand-rose-400 rounded-full shadow-[0_0_10px_rgba(161,130,74,0.8)]"></div>
        </div>
    </div>
);

export default memo(ProgressBar);
