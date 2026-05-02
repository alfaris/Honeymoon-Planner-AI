import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

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
            }, 3000);

            return () => clearInterval(intervalId);
        } else {
            setCurrentText(Array.isArray(text) ? text[0] : text);
        }
    }, [text]);

    return (
        <div className="flex flex-col items-center justify-center text-center py-32">
            <div className="relative mb-12">
                <motion.div
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-[var(--brand-rose-200)] rounded-full blur-2xl"
                />
                <motion.div
                    animate={{ 
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative z-10"
                >
                    <Heart size={80} className="text-[var(--brand-rose-500)] fill-current" />
                </motion.div>
            </div>
            
            <div className="h-20 flex items-center justify-center max-w-lg">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentText}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl font-serif font-bold text-[var(--brand-text-heading)] italic"
                    >
                        {currentText}
                    </motion.p>
                </AnimatePresence>
            </div>
            
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-8 h-1 bg-gradient-to-r from-transparent via-[var(--brand-rose-400)] to-transparent rounded-full"
            />
        </div>
    );
};

export default LoadingIndicator;
