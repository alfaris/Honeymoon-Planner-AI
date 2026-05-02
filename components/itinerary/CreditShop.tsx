import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ShieldCheck, Zap, Heart, Upload, Clipboard, History, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useUser } from '../../context/UserContext';

interface CreditShopProps {
    isOpen: boolean;
    onClose: () => void;
    t: (key: string) => string;
}

const CreditShop: React.FC<CreditShopProps> = ({ isOpen, onClose, t }) => {
    const { createPaymentRequest, getPaymentRequests, user, instapayHandle } = useUser();
    const [isPurchasing, setIsPurchasing] = useState<any | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [purchased, setPurchased] = useState(false);
    const [view, setView] = useState<'packages' | 'history'>('packages');
    const [requests, setRequests] = useState<any[]>([]);
    
    // Form state
    const [reference, setReference] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (isOpen && view === 'history') {
            loadRequests();
        }
    }, [isOpen, view]);

    const loadRequests = async () => {
        const data = await getPaymentRequests();
        setRequests(data);
    };

    const packages = [
        { id: 1, amount: 10, price: "500 EGP", icon: Sparkles, color: "text-brand-rose-500", bg: "bg-brand-rose-50" },
        { id: 2, amount: 25, price: "1000 EGP", icon: Zap, color: "text-amber-500", bg: "bg-amber-50", popular: true, tag: t('popular') },
        { id: 3, amount: 60, price: "2000 EGP", icon: Heart, color: "text-rose-600", bg: "bg-rose-50", tag: t('bestValue') }
    ];

    const copyHandle = () => {
        navigator.clipboard.writeText(instapayHandle);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isPurchasing || submitting) return;

        setSubmitting(true);
        try {
            const success = await createPaymentRequest({
                packageId: isPurchasing.id,
                amount: isPurchasing.amount,
                price: isPurchasing.price,
                reference: reference,
                proofUrl: '', // In a real app, upload to storage first
            });

            if (success) {
                setPurchased(true);
                setTimeout(() => {
                    setPurchased(false);
                    setReference('');
                    setIsPurchasing(null);
                    onClose();
                }, 3000);
            }
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden min-h-[500px]"
                    >
                        {/* Header Tabs */}
                        <div className="flex border-b border-brand-rose-100">
                            <button 
                                onClick={() => setView('packages')}
                                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-colors ${view === 'packages' ? 'text-brand-rose-700 bg-brand-rose-50' : 'text-brand-text-subtle hover:bg-slate-50'}`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <Sparkles size={14} />
                                    {t('buyCredits')}
                                </div>
                            </button>
                            <button 
                                onClick={() => setView('history')}
                                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-colors ${view === 'history' ? 'text-brand-rose-700 bg-brand-rose-50' : 'text-brand-text-subtle hover:bg-slate-50'}`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <History size={14} />
                                    {t('myRequests')}
                                </div>
                            </button>
                            <button onClick={onClose} className="p-4 text-brand-text-subtle hover:text-black">
                                <X size={20} />
                            </button>
                        </div>

                        {view === 'packages' ? (
                            <div className="flex flex-col md:flex-row">
                                {/* Left Side - Instructions */}
                                <div className="md:w-1/2 bg-brand-rose-50 p-10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-rose-200/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                                    
                                    <div className="relative">
                                        <h2 className="text-4xl font-serif font-black text-brand-text-heading italic mb-4 leading-tight">{t('creditShopTitle')}</h2>
                                        <p className="text-sm text-brand-text-subtle leading-relaxed opacity-80 mb-8">{t('creditShopSub')}</p>
                                        
                                        <div className="bg-white p-6 rounded-sm shadow-card border border-brand-rose-100 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-brand-rose-100 flex items-center justify-center text-brand-rose-700 shrink-0">
                                                    <ShieldCheck size={16} />
                                                </div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest">{t('payViaInstapay')}</span>
                                            </div>
                                            
                                            <div className="space-y-1">
                                                <label className="text-[9px] text-brand-text-subtle uppercase tracking-wider font-bold">{t('instapayHandle')}</label>
                                                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-sm border border-slate-100 group">
                                                    <span className="font-mono text-sm font-bold">{instapayHandle}</span>
                                                    <button onClick={copyHandle} className="text-brand-rose-600 hover:text-black transition-colors">
                                                        {isCopied ? <CheckCircle2 size={16} /> : <Clipboard size={16} />}
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <p className="text-[10px] text-brand-text-subtle italic opacity-70 leading-relaxed font-light">
                                                {t('instapayInfo')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Packages / Form */}
                                <div className="md:w-1/2 p-10 bg-white">
                                    {purchased ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                                <CheckCircle2 size={40} />
                                            </motion.div>
                                            <h3 className="text-2xl font-serif font-bold italic mb-2">Submitted</h3>
                                            <p className="text-brand-text-subtle text-sm max-w-xs">{t('successPurchase')}</p>
                                        </div>
                                    ) : isPurchasing ? (
                                        <div className="space-y-6">
                                            <button onClick={() => setIsPurchasing(null)} className="text-[10px] font-bold uppercase tracking-widest text-brand-text-subtle hover:text-brand-rose-700">
                                                ← Back to packages
                                            </button>
                                            
                                            <div className="p-4 bg-brand-rose-50 rounded-sm border border-brand-rose-100 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <isPurchasing.icon size={20} className={isPurchasing.color} />
                                                    <span className="font-serif font-black italic">{isPurchasing.amount} Credits</span>
                                                </div>
                                                <span className="font-bold">{isPurchasing.price}</span>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold uppercase tracking-widest">{t('uploadProof')}</label>
                                                    <div className="border-2 border-dashed border-slate-200 rounded-sm p-8 flex flex-col items-center justify-center gap-2 hover:border-brand-rose-300 transition-colors cursor-pointer group">
                                                        <Upload className="text-slate-300 group-hover:text-brand-rose-500 transition-colors" />
                                                        <span className="text-[10px] text-slate-400">Click to upload screenshot</span>
                                                        <p className="text-[8px] text-slate-400 italic">PNG, JPG up to 5MB</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold uppercase tracking-widest">{t('referenceHint')}</label>
                                                    <input 
                                                        type="text" 
                                                        required={!false} // Ideally one or the other
                                                        value={reference}
                                                        onChange={(e) => setReference(e.target.value)}
                                                        placeholder="Transaction ID / Reference"
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-sm italic focus:ring-1 focus:ring-brand-rose-300 outline-none transition-all"
                                                    />
                                                </div>

                                                <button 
                                                    type="submit"
                                                    disabled={submitting}
                                                    className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm transition-all ${
                                                        submitting 
                                                        ? 'bg-slate-100 text-slate-400' 
                                                        : 'bg-brand-rose-700 text-white hover:bg-black shadow-lg hover:shadow-brand-rose-200'
                                                    }`}
                                                >
                                                    {submitting ? t('purchasing') : t('submitRequest')}
                                                </button>
                                            </form>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-4">
                                            {packages.map((pkg) => (
                                                <div 
                                                    key={pkg.id}
                                                    className={`relative p-6 border rounded-sm transition-all group ${
                                                        pkg.popular ? 'border-brand-rose-300 shadow-lg' : 'border-brand-rose-100 hover:border-brand-rose-200'
                                                    }`}
                                                >
                                                    {pkg.tag && (
                                                        <span className={`absolute -top-2 right-4 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.2em] rounded-sm text-white ${
                                                            pkg.popular ? 'bg-brand-rose-700' : 'bg-black'
                                                        }`}>
                                                            {pkg.tag}
                                                        </span>
                                                    )}
                                                    
                                                    <div className="flex items-center justify-between gap-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className={`p-3 rounded-sm ${pkg.bg} ${pkg.color}`}>
                                                                <pkg.icon size={20} />
                                                            </div>
                                                            <div>
                                                                <div className="text-lg font-serif font-black italic">{pkg.amount} Credits</div>
                                                                <div className="text-xs text-brand-text-subtle opacity-60">Custom Curations</div>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-4">
                                                            <div className="text-xl font-bold text-brand-text-heading">{pkg.price}</div>
                                                            <button 
                                                                onClick={() => setIsPurchasing(pkg)}
                                                                className="min-w-[100px] text-[10px] font-black uppercase tracking-widest py-3 px-4 rounded-sm transition-all bg-brand-rose-700 text-white hover:bg-black"
                                                            >
                                                                {t('buy')}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            /* History View */
                            <div className="p-10 bg-white min-h-[400px]">
                                {requests.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-brand-rose-100">
                                                    <th className="py-4 text-[10px] font-black uppercase tracking-widest text-brand-text-subtle">{t('date')}</th>
                                                    <th className="py-4 text-[10px] font-black uppercase tracking-widest text-brand-text-subtle">{t('amount')}</th>
                                                    <th className="py-4 text-[10px] font-black uppercase tracking-widest text-brand-text-subtle">{t('status')}</th>
                                                    <th className="py-4 text-[10px] font-black uppercase tracking-widest text-brand-text-subtle">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                                {requests.map((req) => (
                                                    <tr key={req.id} className="group hover:bg-slate-50 transition-colors">
                                                        <td className="py-4 text-xs text-brand-text-main">
                                                            {req.createdAt?.toDate ? req.createdAt.toDate().toLocaleDateString() : 'Pending...'}
                                                        </td>
                                                        <td className="py-4 text-sm font-bold text-brand-text-heading">{req.amount} Credits</td>
                                                        <td className="py-4">
                                                            <div className="flex items-center gap-2">
                                                                {req.status === 'pending' && <Clock size={14} className="text-amber-500" />}
                                                                {req.status === 'approved' && <CheckCircle2 size={14} className="text-green-500" />}
                                                                {req.status === 'declined' && <AlertCircle size={14} className="text-rose-500" />}
                                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                                                                    req.status === 'pending' ? 'text-amber-600' : 
                                                                    req.status === 'approved' ? 'text-green-600' : 'text-rose-600'
                                                                }`}>
                                                                    {req.status}
                                                                </span>
                                                            </div>
                                                            {req.adminComment && (
                                                                <div className="text-[9px] text-slate-400 italic mt-1 line-clamp-1">{req.adminComment}</div>
                                                            )}
                                                        </td>
                                                        <td className="py-4 text-xs font-medium text-slate-500">{req.price}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                                        <History size={48} className="mb-4" />
                                        <p className="text-sm font-serif italic">No purchase history yet.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CreditShop;
