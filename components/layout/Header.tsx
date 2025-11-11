import React from 'react';

interface HeaderProps {
    t: (key: string) => string;
    language: 'en' | 'ar';
    setLanguage: React.Dispatch<React.SetStateAction<'en' | 'ar'>>;
}

const Header: React.FC<HeaderProps> = ({ t, language, setLanguage }) => (
    <header className="bg-white/80 backdrop-blur-lg border-b border-[var(--brand-border-soft)]/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                     <svg className="w-8 h-8 text-[var(--brand-rose-500)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <h1 className="text-2xl font-serif font-bold text-[var(--brand-text-heading)] tracking-tight">{t('headerTitle')}</h1>
                </div>
                 <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button 
                        onClick={() => setLanguage(lang => lang === 'en' ? 'ar' : 'en')}
                        className="text-sm font-semibold text-[var(--brand-text-subtle)] hover:text-[var(--brand-rose-600)] transition-colors px-3 py-2 rounded-lg hover:bg-[var(--brand-rose-100)]"
                    >
                        {language === 'en' ? 'العربية' : 'English'}
                    </button>
                 </div>
            </div>
        </div>
    </header>
);

export default Header;