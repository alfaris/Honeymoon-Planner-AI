import React from 'react';

const LoadingIndicator: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-8 h-8 text-rose-500 text-4xl animate-pulse" style={{ animationDelay: '0s' }}>
                    ❤️
                </div>
                <div className="w-8 h-8 text-rose-500 text-4xl animate-pulse" style={{ animationDelay: '0.2s' }}>
                    ❤️
                </div>
                <div className="w-8 h-8 text-rose-500 text-4xl animate-pulse" style={{ animationDelay: '0.4s' }}>
                    ❤️
                </div>
            </div>
            <p className="text-xl font-semibold text-slate-700">{text}</p>
        </div>
    );
};

export default LoadingIndicator;