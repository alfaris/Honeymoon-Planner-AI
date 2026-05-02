import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Clock, Search, ExternalLink, MessageCircle, MoreVertical, CreditCard, User as UserIcon, Settings, Save } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface AdminDashboardProps {
    t: (key: string) => string;
    onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ t, onClose }) => {
    const { getPaymentRequests, adminUpdatePaymentStatus, instapayHandle, updateInstapayHandle } = useUser();
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'declined'>('pending');
    const [actioning, setActioning] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    
    // Config state
    const [newHandle, setNewHandle] = useState(instapayHandle);
    const [savingHandle, setSavingHandle] = useState(false);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        setLoading(true);
        const data = await getPaymentRequests(true); // all=true
        setRequests(data);
        setLoading(false);
    };

    const handleAction = async (requestId: string, userId: string, amount: number, status: 'approved' | 'declined') => {
        setActioning(requestId);
        try {
            const success = await adminUpdatePaymentStatus(requestId, userId, amount, status, comment);
            if (success) {
                setComment('');
                await loadRequests();
            }
        } catch (error) {
            console.error("Action failed:", error);
        } finally {
            setActioning(null);
        }
    };

    const onUpdateHandle = async () => {
        setSavingHandle(true);
        try {
            await updateInstapayHandle(newHandle);
        } catch (error) {
            console.error("Handle update failed:", error);
        } finally {
            setSavingHandle(false);
        }
    };

    const filteredRequests = requests.filter(req => filter === 'all' ? true : req.status === filter);

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <header className="bg-white border-b border-brand-rose-100 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-rose-700 text-white rounded-sm">
                            <CreditCard size={18} />
                        </div>
                        <h1 className="text-sm font-black uppercase tracking-widest">Admin Control</h1>
                    </div>
                    <button onClick={onClose} className="text-[10px] font-black uppercase tracking-widest text-brand-text-subtle hover:text-black">
                        Back to App
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-10">
                {/* Configuration Section */}
                <section className="mb-12 bg-white p-8 border border-brand-rose-100 rounded-sm shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <Settings size={20} className="text-brand-rose-700" />
                        <h3 className="text-lg font-serif font-black italic">Settings</h3>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-end gap-4 max-w-2xl">
                        <div className="flex-grow space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Instapay Handle</label>
                            <input 
                                type="text"
                                value={newHandle}
                                onChange={(e) => setNewHandle(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-sm font-mono text-sm focus:ring-1 focus:ring-brand-rose-300 outline-none"
                            />
                        </div>
                        <button 
                            onClick={onUpdateHandle}
                            disabled={savingHandle || newHandle === instapayHandle}
                            className="flex items-center gap-2 py-3.5 px-6 bg-brand-rose-700 text-white text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-black transition-all disabled:bg-slate-100 disabled:text-slate-400"
                        >
                            <Save size={14} />
                            {savingHandle ? 'Saving...' : 'Update Handle'}
                        </button>
                    </div>
                </section>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h2 className="text-4xl font-serif font-black italic text-brand-text-heading mb-2 leading-tight">Payment Requests</h2>
                        <p className="text-brand-text-subtle italic serif opacity-70">Review and verify credit purchase requests</p>
                    </div>

                    <div className="flex bg-white p-1 rounded-sm border border-brand-rose-100">
                        {['all', 'pending', 'approved', 'declined'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as any)}
                                className={`px-4 py-2 text-[8px] font-black uppercase tracking-widest transition-all rounded-sm ${
                                    filter === f ? 'bg-brand-rose-700 text-white shadow-lg' : 'text-brand-text-subtle hover:bg-slate-50'
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-brand-rose-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredRequests.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredRequests.map((req) => (
                            <motion.div 
                                layout
                                key={req.id}
                                className="bg-white border border-brand-rose-100 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                                    {/* User & Request Info */}
                                    <div className="md:w-1/3 flex flex-col justify-between border-b md:border-b-0 md:border-r border-brand-rose-50 pb-6 md:pb-0 md:pr-8">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-slate-100 rounded-sm flex items-center justify-center text-slate-400">
                                                <UserIcon size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-brand-text-heading leading-tight truncate w-full">{req.userEmail}</h3>
                                                <p className="text-[10px] text-slate-400 font-mono mt-1">ID: {req.userId?.slice(0, 8)}...</p>
                                            </div>
                                        </div>

                                        <div className="mt-8 space-y-4">
                                            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                                                <span className="text-slate-400">Amount</span>
                                                <span className="text-brand-rose-700 font-black">{req.amount} Credits</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                                                <span className="text-slate-400">Price</span>
                                                <span className="text-black">{req.price}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                                                <span className="text-slate-400">Date</span>
                                                <span className="text-slate-600">{req.createdAt?.toDate?.().toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Area */}
                                    <div className="md:w-2/3 flex flex-col md:flex-row gap-8">
                                        <div className="md:w-1/2 space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payment Reference</label>
                                            <div className="bg-slate-50 p-4 rounded-sm border border-slate-100 min-h-[80px] flex items-center justify-center text-center">
                                                {req.reference ? (
                                                    <span className="font-mono text-sm font-bold text-brand-rose-900">{req.reference}</span>
                                                ) : (
                                                    <span className="text-xs italic text-slate-400">No reference provided</span>
                                                )}
                                            </div>
                                            
                                            {/* Proof Link (Mock) */}
                                            {req.proofUrl && (
                                                <button className="flex items-center gap-2 text-[10px] font-bold text-brand-rose-600 hover:text-black transition-colors">
                                                    <ExternalLink size={14} />
                                                    View Proof Image
                                                </button>
                                            )}
                                        </div>

                                        <div className="md:w-1/2 flex flex-col justify-between gap-4">
                                            {req.status === 'pending' ? (
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Admin Comment (Internal)</label>
                                                    <textarea 
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                        placeholder="Optional reason for decline..."
                                                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-sm text-xs outline-none focus:ring-1 focus:ring-brand-rose-300 min-h-[80px]"
                                                    />
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <button 
                                                            disabled={actioning === req.id}
                                                            onClick={() => handleAction(req.id, req.userId, req.amount, 'declined')}
                                                            className="flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-rose-50 hover:text-rose-600 transition-all"
                                                        >
                                                            <XCircle size={14} />
                                                            Decline
                                                        </button>
                                                        <button 
                                                            disabled={actioning === req.id}
                                                            onClick={() => handleAction(req.id, req.userId, req.amount, 'approved')}
                                                            className="flex items-center justify-center gap-2 py-3 bg-brand-rose-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-black transition-all shadow-lg shadow-brand-rose-100"
                                                        >
                                                            <CheckCircle2 size={14} />
                                                            Approve
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={`p-6 rounded-sm border flex flex-col items-center justify-center text-center gap-3 ${
                                                    req.status === 'approved' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-rose-50 border-rose-100 text-rose-700'
                                                }`}>
                                                    {req.status === 'approved' ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
                                                    <div>
                                                        <div className="text-[10px] font-black uppercase tracking-widest">Request {req.status}</div>
                                                        {req.adminComment && <p className="text-[9px] mt-1 italic opacity-70">"{req.adminComment}"</p>}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-40 opacity-30 text-center">
                        <Clock size={48} className="mb-4" />
                        <h3 className="text-xl font-serif italic">No requests found</h3>
                        <p className="text-xs">Try changing the filter</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
