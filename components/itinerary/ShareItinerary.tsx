import React, { useState, useMemo, useCallback } from 'react';
import { DetailedItinerary, HoneymoonPreferences } from '../../types';
import LZString from '../../utils/lz-string';

import ShareIcon from '../icons/ShareIcon';
import CopyIcon from '../icons/CopyIcon';
import TwitterIcon from '../icons/TwitterIcon';
import FacebookIcon from '../icons/FacebookIcon';
import WhatsappIcon from '../icons/WhatsappIcon';
import EmailIcon from '../icons/EmailIcon';
import XIcon from '../icons/XIcon';

interface ShareItineraryProps {
    itinerary: DetailedItinerary;
    preferences: HoneymoonPreferences;
    t: (key: string) => string;
}

const ShareItinerary: React.FC<ShareItineraryProps> = ({ itinerary, preferences, t }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const shareLink = useMemo(() => {
        if (!itinerary || !preferences) return '';
        const dataToCompress = { itinerary, preferences };
        const jsonString = JSON.stringify(dataToCompress);
        const compressed = LZString.compressToEncodedURIComponent(jsonString);
        return `${window.location.origin}${window.location.pathname}?itinerary=${compressed}`;
    }, [itinerary, preferences]);

    const handleCopy = useCallback(() => {
        if (!shareLink) return;
        navigator.clipboard.writeText(shareLink).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    }, [shareLink]);
    
    const shareText = `Check out our dream honeymoon itinerary to ${itinerary.destination}! Planned with Honeymoon Planner AI.`;

    const socialPlatforms = [
        { name: 'Twitter', icon: TwitterIcon, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(shareText)}` },
        { name: 'Facebook', icon: FacebookIcon, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}` },
        { name: 'WhatsApp', icon: WhatsappIcon, href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareLink)}` },
        { name: 'Email', icon: EmailIcon, href: `mailto:?subject=${encodeURIComponent(`Our Honeymoon Plan: ${itinerary.destination}`)}&body=${encodeURIComponent(shareText + '\n\n' + shareLink)}` },
    ];

    return (
        <>
            <button
                id="share-button"
                onClick={() => setIsModalOpen(true)}
                title={t('shareItinerary')}
                aria-label={t('shareItinerary')}
                className="fixed bottom-6 end-6 bg-gradient-to-br from-[var(--brand-rose-500)] to-[var(--brand-rose-600)] text-white w-16 h-16 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[var(--brand-rose-300)] flex items-center justify-center transition-all transform z-20"
            >
                <ShareIcon className="w-8 h-8"/>
            </button>

            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={() => setIsModalOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="share-modal-title"
                >
                    <div 
                        className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md m-4 relative card-style"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setIsModalOpen(false)} 
                            className="absolute top-4 end-4 text-slate-400 hover:text-slate-600 transition-colors"
                            aria-label="Close"
                        >
                            <XIcon className="w-6 h-6"/>
                        </button>

                        <h3 id="share-modal-title" className="text-2xl font-serif font-bold text-[var(--brand-text-heading)] text-center">{t('shareTitle')}</h3>
                        <p className="text-[var(--brand-text-subtle)] text-center mt-2 mb-6">{t('shareDescription')}</p>

                        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
                            <input type="text" readOnly value={shareLink} className="w-full px-3 py-2 border border-[var(--brand-border-soft)] rounded-lg bg-slate-50 text-sm focus:ring-2 focus:ring-[var(--brand-rose-300)]" />
                            <button onClick={handleCopy} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors w-28 ${isCopied ? 'bg-green-500 text-white' : 'bg-[var(--brand-rose-500)] text-white hover:bg-[var(--brand-rose-600)]'}`}>
                                {isCopied ? t('copied') : t('copyLink')}
                            </button>
                        </div>
                        
                        <div className="text-center text-sm font-semibold text-[var(--brand-text-subtle)] mb-4">{t('shareOn')}</div>
                        <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse">
                            {socialPlatforms.map(p => (
                                <a 
                                    key={p.name} 
                                    href={p.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    title={`Share on ${p.name}`}
                                    className="w-14 h-14 bg-[var(--brand-surface-subtle)] rounded-full flex items-center justify-center text-[var(--brand-text-subtle)] hover:bg-[var(--brand-rose-100)] hover:text-[var(--brand-rose-600)] transition-all transform hover:scale-110"
                                >
                                    <p.icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShareItinerary;