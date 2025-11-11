import React, { memo } from 'react';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-slate-200/80 rounded-full h-2.5 mb-4 sticky top-[68px] z-10 backdrop-blur-sm">
        <div 
            className="bg-gradient-to-r from-rose-400 to-rose-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
        ></div>
    </div>
);

export default memo(ProgressBar);