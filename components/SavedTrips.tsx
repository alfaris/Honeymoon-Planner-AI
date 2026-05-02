import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { DetailedItinerary, HoneymoonPreferences } from '../types';
import { Calendar, MapPin, ChevronRight, Trash2, Globe } from 'lucide-react';

interface SavedTripDoc {
    id: string;
    title: string;
    destination: string;
    itinerary: DetailedItinerary;
    preferences: HoneymoonPreferences;
    createdAt: any;
}

interface SavedTripsProps {
    onSelectTrip: (itinerary: DetailedItinerary, preferences: HoneymoonPreferences) => void;
    onBack: () => void;
    t: (key: string) => string;
}

const SavedTrips: React.FC<SavedTripsProps> = ({ onSelectTrip, onBack, t }) => {
    const { getSavedTrips, user } = useUser();
    const [trips, setTrips] = useState<SavedTripDoc[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            const data = await getSavedTrips();
            setTrips(data as SavedTripDoc[]);
            setLoading(false);
        };
        fetchTrips();
    }, [getSavedTrips]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-40">
                <div className="w-12 h-12 border-4 border-brand-rose-200 border-t-brand-rose-700 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                    <h2 className="text-6xl font-serif font-black text-brand-text-heading tracking-tighter italic mb-4">My Journal</h2>
                    <p className="text-xl text-brand-text-subtle italic serif opacity-70">A compilation of your curated escapes</p>
                </div>
                <button 
                    onClick={onBack}
                    className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-rose-700 border-b border-brand-rose-700 pb-1 hover:text-black hover:border-black transition-colors self-start md:self-auto"
                >
                    Back to Planning
                </button>
            </header>

            {trips.length === 0 ? (
                <div className="bg-white p-20 rounded-sm border border-brand-rose-100 text-center shadow-card">
                    <Globe className="w-16 h-16 text-brand-rose-200 mx-auto mb-8" />
                    <h3 className="text-3xl font-serif font-bold text-brand-text-heading italic mb-4">No trips curated yet</h3>
                    <p className="text-brand-text-subtle mb-10 max-w-sm mx-auto">Your dream honeymoon itineraries will appear here once you save them.</p>
                    <button 
                        onClick={onBack}
                        className="bg-brand-rose-700 text-brand-rose-50 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-black transition-all"
                    >
                        Start Planning
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {trips.map((trip, idx) => (
                        <motion.div 
                            key={trip.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white border border-brand-rose-100 rounded-sm shadow-card overflow-hidden group hover:border-brand-rose-300 transition-all"
                        >
                            <div className="p-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-3 bg-brand-rose-50 rounded-sm">
                                        <MapPin className="text-brand-rose-700 w-5 h-5" />
                                    </div>
                                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-rose-300 flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {trip.createdAt?.toDate().toLocaleDateString() || 'N/A'}
                                    </div>
                                </div>
                                
                                <h3 className="text-3xl font-serif font-black text-brand-text-heading italic mb-6 leading-tight group-hover:text-brand-rose-700 transition-colors">
                                    {trip.title}
                                </h3>
                                
                                <div className="flex flex-wrap gap-2 mb-10">
                                    <span className="text-[9px] font-bold text-brand-text-subtle bg-brand-rose-50 px-2.5 py-1 rounded-sm border border-brand-rose-100 italic">
                                        {trip.preferences.budget}
                                    </span>
                                    <span className="text-[9px] font-bold text-brand-text-subtle bg-brand-rose-50 px-2.5 py-1 rounded-sm border border-brand-rose-100 italic">
                                        {trip.preferences.duration} Days
                                    </span>
                                </div>

                                <button 
                                    onClick={() => onSelectTrip(trip.itinerary, trip.preferences)}
                                    className="w-full border border-brand-rose-700 text-brand-rose-700 py-4 px-6 rounded-sm text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brand-rose-700 hover:text-white transition-all flex items-center justify-center gap-4"
                                >
                                    View Itinerary
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedTrips;
