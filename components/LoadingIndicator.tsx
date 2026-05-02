import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
        <div className="flex flex-col items-center justify-center text-center py-40">
            <div className="relative mb-16">
                <motion.div
                    animate={{ 
                        scale: [1, 1.4, 1],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-x-0 bottom-0 top-0 bg-brand-rose-300 rounded-full blur-[100px] -z-10"
                />
                <motion.div
                    animate={{ 
                        y: [0, -10, 0],
                    }}
                    transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative z-10"
                >
                    <Heart size={64} strokeWidth={1} className="text-brand-rose-500 fill-brand-rose-100/30" />
                </motion.div>
            </div>
            
            <div className="h-24 flex flex-col items-center justify-center max-w-xl">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentText}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-3xl md:text-4xl font-serif font-black text-brand-text-heading italic tracking-tight"
                    >
                        {currentText}
                    </motion.p>
                </AnimatePresence>
            </div>
            
            <div className="mt-12 w-48 h-[1px] bg-brand-rose-200 overflow-hidden relative">
                 <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-brand-rose-500 to-transparent"
                />
            </div>
            <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 text-[9px] font-black uppercase tracking-[0.4em] text-brand-rose-400 opacity-50"
            >
                Curating your escape
            </motion.span>
        </div>
    );
};

export default LoadingIndicator;
