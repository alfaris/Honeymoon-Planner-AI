import React, { useState, useEffect } from 'react';

interface LoadingIndicatorProps {
    text: string | string[];
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ text }) => {
    const [currentText, setCurrentText] = useState(Array.isArray(text) ? text[0] : text);

    useEffect(() => {
        if (Array.isArray(text) && text.length > 1) {
            let index = 0;
            const intervalId = setInterval(() => {
                index = (index + 1) % text.length;
                setCurrentText(text[index]);
            }, 2500); // Change text every 2.5 seconds

            return () => clearInterval(intervalId);
        } else {
            setCurrentText(Array.isArray(text) ? text[0] : text);
        }
    }, [text]);

    return (
        <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="mb-6">
                 <svg className="w-24 h-24 text-[var(--brand-rose-500)] animate-pulse" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.001 4.52853C14.35 -0.161474 21.4 -0.881474 22.973 4.88853C24.546 10.6585 18.35 15.6185 12.001 21.7285C5.65104 15.6185 -0.546956 10.6585 1.02604 4.88853C2.60004 -0.881474 9.65104 -0.161474 12.001 4.52853Z"/></svg>
            </div>
            <p className="text-xl font-semibold text-[var(--brand-text-main)] transition-opacity duration-500 min-h-[56px] flex items-center">{currentText}</p>
        </div>
    );
};

export default LoadingIndicator;