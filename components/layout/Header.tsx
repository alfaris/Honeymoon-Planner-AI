import React from 'react';

interface HeaderProps {
    t: (key: string) => string;
    language: 'en' | 'ar';
    setLanguage: React.Dispatch<React.SetStateAction<'en' | 'ar'>>;
}

const Header: React.FC<HeaderProps> = ({ t, language, setLanguage }) => (
    <header className="bg-white/70 backdrop-blur-xl border-b border-black/5 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-rose-600 to-brand-rose-800 rounded-xl flex items-center justify-center shadow-lg shadow-black/10 group-hover:scale-110 transition-transform duration-300">
                         <svg className="w-6 h-6 text-brand-rose-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-serif font-black text-brand-text-heading tracking-tight italic">
                        {t('headerTitle')}
                    </h1>
                </div>
                 <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setLanguage(lang => lang === 'en' ? 'ar' : 'en')}
                        className="text-xs font-bold uppercase tracking-widest text-brand-text-subtle hover:text-brand-rose-800 transition-all px-4 py-2 rounded-full border border-black/10 hover:border-brand-rose-400 hover:bg-brand-rose-100"
                    >
                        {language === 'en' ? 'العربية' : 'English'}
                    </button>
                 </div>
            </div>
        </div>
    </header>
);

export default Header;