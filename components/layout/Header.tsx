import React from 'react';
import { useUser } from '../../context/UserContext';
import { User, LogOut, LogIn, Plane, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppPhase } from '../../types';

interface HeaderProps {
    t: (key: string) => string;
    language: 'en' | 'ar';
    setLanguage: React.Dispatch<React.SetStateAction<'en' | 'ar'>>;
    onNavigate: (phase: any) => void;
    onOpenCreditShop: () => void;
}

const Header: React.FC<HeaderProps> = ({ t, language, setLanguage, onNavigate, onOpenCreditShop }) => {
    const { user, login, logout, loading, isLoggingIn, credits, isAdmin } = useUser();
    const [showDropdown, setShowDropdown] = React.useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-brand-rose-50/80 backdrop-blur-md border-b border-brand-rose-200/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onNavigate(0)}>
                        <div className="relative">
                            <div className="w-8 h-8 bg-brand-rose-700 rounded-sm flex items-center justify-center shadow-lg shadow-black/10 group-hover:rotate-12 transition-all duration-500">
                                <svg className="w-5 h-5 text-brand-rose-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </div>
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-rose-400 rounded-full border-2 border-brand-rose-50"></div>
                        </div>
                        <div className="flex flex-col -space-y-1">
                            <h1 className="text-lg font-serif font-black text-brand-text-heading tracking-tight italic">
                                {t('headerTitle')}
                            </h1>
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-rose-400 opacity-60">AI Concierge</span>
                        </div>
                    </div>
                     <div className="flex items-center gap-6">
                        {user && (
                            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white border border-brand-rose-100 rounded-full">
                                <div className="w-2 h-2 bg-brand-rose-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(161,130,74,0.5)]"></div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-brand-rose-700">{credits} {t('credits')}</span>
                            </div>
                        )}

                        <button 
                            onClick={() => setLanguage(lang => lang === 'en' ? 'ar' : 'en')}
                            className="group flex items-center gap-2"
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-text-subtle group-hover:text-brand-rose-700 transition-colors">
                                {language === 'en' ? 'العربية' : 'English'}
                            </span>
                        </button>

                        <div className="h-4 w-px bg-brand-rose-200"></div>

                        {!loading && (
                            <div className="relative">
                                {user ? (
                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => setShowDropdown(!showDropdown)}
                                            className="flex items-center gap-2 p-1 pl-3 rounded-full bg-white border border-brand-rose-100 hover:border-brand-rose-300 transition-all"
                                        >
                                            <span className="text-[9px] font-black uppercase tracking-widest text-brand-text-heading hidden md:block">
                                                {user.displayName?.split(' ')[0] || 'User'}
                                            </span>
                                            {user.photoURL ? (
                                                <img src={user.photoURL} alt="profile" className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                                            ) : (
                                                <div className="w-6 h-6 rounded-full bg-brand-rose-100 flex items-center justify-center text-brand-rose-700">
                                                    <User size={12} />
                                                </div>
                                            )}
                                        </button>

                                        <AnimatePresence>
                                            {showDropdown && (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute top-full right-0 mt-3 w-48 bg-white border border-brand-rose-100 rounded-sm shadow-xl p-2 z-50"
                                                >
                                                    <button 
                                                        className="w-full flex items-center gap-3 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-brand-rose-700 hover:bg-brand-rose-50 transition-colors rounded-sm"
                                                        onClick={() => { setShowDropdown(false); onOpenCreditShop(); }}
                                                    >
                                                        <Sparkles size={14} />
                                                        {t('buyCredits')}
                                                    </button>
                                                    <div className="h-px bg-brand-rose-50 my-1" />
                                                    <button 
                                                        className="w-full flex items-center gap-3 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-brand-text-subtle hover:text-brand-rose-700 hover:bg-brand-rose-50 transition-colors rounded-sm"
                                                        onClick={() => { setShowDropdown(false); onNavigate(AppPhase.SAVED_TRIPS); }}
                                                    >
                                                        <Plane size={14} />
                                                        {t('myTrips')}
                                                    </button>
                                                    {isAdmin && (
                                                        <>
                                                            <div className="h-px bg-brand-rose-50 my-1" />
                                                            <button 
                                                                className="w-full flex items-center gap-3 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-brand-rose-700 hover:bg-brand-rose-50 transition-colors rounded-sm"
                                                                onClick={() => { setShowDropdown(false); onNavigate(AppPhase.ADMIN_DASHBOARD); }}
                                                            >
                                                                <ShieldCheck size={14} />
                                                                Admin Dashboard
                                                            </button>
                                                        </>
                                                    )}
                                                    <div className="h-px bg-brand-rose-50 my-1" />
                                                    <button 
                                                        onClick={() => logout()}
                                                        className="w-full flex items-center gap-3 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-brand-rose-700 hover:bg-brand-rose-50 transition-colors rounded-sm"
                                                    >
                                                        <LogOut size={14} />
                                                        Logout
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => login()}
                                        disabled={isLoggingIn}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-brand-rose-700 text-brand-rose-50 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-brand-rose-700/10 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoggingIn ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            >
                                                <LogIn size={14} />
                                            </motion.div>
                                        ) : (
                                            <LogIn size={14} />
                                        )}
                                        <span>{isLoggingIn ? t('signingIn') : t('signIn')}</span>
                                    </button>
                                )}
                            </div>
                        )}
                     </div>
                </div>
            </div>
        </header>
    );
};

export default Header;