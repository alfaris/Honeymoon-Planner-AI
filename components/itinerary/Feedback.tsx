import React, { useState } from 'react';
import { Frown, Meh, Smile } from 'lucide-react';

interface FeedbackProps {
    t: (key: string) => string;
}

type Rating = 'unhappy' | 'neutral' | 'happy';

const Feedback: React.FC<FeedbackProps> = ({ t }) => {
    const [selectedRating, setSelectedRating] = useState<Rating | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleRating = (rating: Rating) => {
        setSelectedRating(rating);
        setSubmitted(true);
        // In a real app, you would send this feedback to a server.
        console.log(`Feedback submitted: ${rating}`);
    };

    const ratings: { id: Rating; icon: React.ElementType; label: string; color: string; activeColor: string }[] = [
        { id: 'unhappy', icon: Frown, label: t('feedbackUnhappy'), color: 'text-slate-400 bg-slate-50 border-slate-100', activeColor: 'bg-red-50 text-red-600 border-red-200' },
        { id: 'neutral', icon: Meh, label: t('feedbackNeutral'), color: 'text-slate-400 bg-slate-50 border-slate-100', activeColor: 'bg-amber-50 text-amber-600 border-amber-200' },
        { id: 'happy', icon: Smile, label: t('feedbackHappy'), color: 'text-slate-400 bg-slate-50 border-slate-100', activeColor: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    ];

    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-card border border-black/5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-rose-50 rounded-full -mr-16 -mt-16 opacity-30 blur-2xl -z-10"></div>
            <h3 className="text-2xl font-serif font-black text-brand-text-heading mb-8 tracking-tight">
                {submitted ? t('feedbackThanks') : t('feedbackTitle')}
            </h3>
            <div className="flex justify-center items-center gap-4">
                {ratings.map(({ id, icon: Icon, label, color, activeColor }) => {
                    const isSelected = selectedRating === id;
                    const isOtherSelected = submitted && !isSelected;
                    
                    if (!submitted) {
                        return (
                            <button
                                key={id}
                                onClick={() => handleRating(id)}
                                title={label}
                                aria-label={label}
                                className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl transition-all duration-300 border hover:scale-105 group ${color} hover:shadow-lg`}
                            >
                                <Icon className="w-10 h-10 transition-transform group-hover:scale-110" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
                            </button>
                        );
                    }

                    return (
                        <div
                            key={id}
                            className={`flex flex-col items-center justify-center gap-3 p-5 rounded-2xl transition-all duration-500 border ${isSelected ? activeColor + ' scale-110 shadow-xl' : 'opacity-20 grayscale scale-90'}`}
                        >
                            <Icon className="w-10 h-10" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Feedback;
