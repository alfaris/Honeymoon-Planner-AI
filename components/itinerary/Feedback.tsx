import React, { useState } from 'react';
import FrownIcon from '../icons/FrownIcon';
import MehIcon from '../icons/MehIcon';
import SmileIcon from '../icons/SmileIcon';

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

    const ratings: { id: Rating; icon: React.ElementType; label: string; color: string }[] = [
        { id: 'unhappy', icon: FrownIcon, label: t('feedbackUnhappy'), color: 'text-red-500 hover:bg-red-100' },
        { id: 'neutral', icon: MehIcon, label: t('feedbackNeutral'), color: 'text-amber-500 hover:bg-amber-100' },
        { id: 'happy', icon: SmileIcon, label: t('feedbackHappy'), color: 'text-green-500 hover:bg-green-100' },
    ];

    return (
        <div className="card-style p-6 text-center">
            <h3 className="text-xl font-serif font-bold text-[var(--brand-text-heading)] mb-4">
                {submitted ? t('feedbackThanks') : t('feedbackTitle')}
            </h3>
            {!submitted ? (
                <div className="flex justify-center items-center gap-4">
                    {ratings.map(({ id, icon: Icon, label, color }) => (
                        <button
                            key={id}
                            onClick={() => handleRating(id)}
                            title={label}
                            aria-label={label}
                            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--brand-rose-400)] ${color}`}
                        >
                            <Icon className="w-10 h-10" />
                            <span className="text-xs font-semibold text-current">{label}</span>
                        </button>
                    ))}
                </div>
            ) : (
                 <div className="flex justify-center items-center gap-4">
                    {ratings.map(({ id, icon: Icon, label, color }) => {
                        const isSelected = selectedRating === id;
                        return (
                            <div
                                key={id}
                                className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg transition-opacity ${color} ${isSelected ? 'opacity-100 scale-110' : 'opacity-30'}`}
                            >
                                <Icon className="w-10 h-10" />
                                <span className="text-xs font-semibold text-current">{label}</span>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default Feedback;
