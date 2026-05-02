import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DetailedItinerary, HoneymoonPreferences } from '../types';
import ItineraryDay from './itinerary/ItineraryDay';
import AccommodationSection from './itinerary/AccommodationSection';
import RestaurantGuide from './itinerary/RestaurantGuide';
import CostAndTimeline from './itinerary/CostAndTimeline';
import PreTripChecklist from './itinerary/PreTripChecklist';
import { 
    Heart, 
    Download,
    Save,
    CheckCircle2
} from 'lucide-react';
import ShareItinerary from './itinerary/ShareItinerary';
import Feedback from './itinerary/Feedback';
import { useUser } from '../context/UserContext';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface ItineraryProps {
    itinerary: DetailedItinerary;
    preferences: HoneymoonPreferences;
    onBack: () => void;
    onRestart: () => void;
    t: (key: string, replacements?: { [key: string]: string }) => string;
    language: 'en' | 'ar';
}

const Itinerary: React.FC<ItineraryProps> = ({ itinerary, preferences, onBack, onRestart, t, language }) => {
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const [activeDay, setActiveDay] = useState(1);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const { user, login, saveTrip } = useUser();

    useEffect(() => {
        const handleScroll = () => {
            const elements = itinerary.dayByDay.map(day => document.getElementById(`day-${day.day}`));
            const scrollPos = window.scrollY + 200;
            
            elements.forEach((el, idx) => {
                if (el && scrollPos >= el.offsetTop && scrollPos < (el.offsetTop + el.offsetHeight)) {
                    setActiveDay(idx + 1);
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [itinerary.dayByDay]);

    const handleSaveTrip = async () => {
        if (!user) {
            try {
                await login();
            } catch (err) {
                return; // User cancelled or failed
            }
        }

        setIsSaving(true);
        try {
            await saveTrip({
                title: itinerary.title || `Trip to ${itinerary.destination}`,
                preferences,
                itinerary,
                destination: itinerary.destination
            });
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error("Failed to save trip:", error);
            alert("Failed to save trip. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDownloadPdf = async () => {
        const element = document.getElementById('itinerary-content');
        if (!element) return;
    
        setIsGeneratingPdf(true);
    
        const shareButton = document.getElementById('share-button');
        const header = document.querySelector('header');
        if (shareButton) shareButton.style.visibility = 'hidden';
        if (header) header.style.visibility = 'hidden';

        const originalBodyBg = document.body.style.backgroundImage;
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = '#fdfcfb'; // --color-brand-rose-50

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#fdfcfb',
            });
    
            const imgData = canvas.toDataURL('image/png');
            
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'pt',
                format: 'a4'
            });
    
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const imgWidth = imgProps.width;
            const imgHeight = imgProps.height;

            const ratio = imgWidth / imgHeight;
            const scaledHeight = pdfWidth / ratio;

            let heightLeft = scaledHeight;
            let position = 0;
            
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
            heightLeft -= pdfHeight;
    
            while (heightLeft > 0) {
                position -= pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
                heightLeft -= pdfHeight;
            }
    
            pdf.save(`Honeymoon-Itinerary-to-${itinerary.destination.replace(/[\s,]+/g, '-')}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("An error occurred while generating the PDF. Please try again.");
        } finally {
            if (shareButton) shareButton.style.visibility = 'visible';
            if (header) header.style.visibility = 'visible';
            document.body.style.backgroundImage = originalBodyBg;
            document.body.style.backgroundColor = '';
            setIsGeneratingPdf(false);
        }
    };

    return (
        <div className="py-20 relative">
            {/* Sticky Navigation Sidebar */}
            <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-6">
                <div className="w-[1px] h-32 bg-brand-rose-200/50 absolute left-[7.5px] top-1/2 -translate-y-1/2 -z-10" />
                {itinerary.dayByDay.map(day => (
                    <button
                        key={day.day}
                        onClick={() => document.getElementById(`day-${day.day}`)?.scrollIntoView({ behavior: 'smooth' })}
                        className="group relative flex items-center h-4"
                    >
                        <motion.div 
                            animate={{ 
                                scale: activeDay === day.day ? 1.5 : 1,
                                backgroundColor: activeDay === day.day ? 'var(--color-brand-rose-400)' : 'var(--color-brand-rose-200)'
                            }}
                            className="w-1.5 h-1.5 rounded-full transition-all duration-300" 
                        />
                        <span className={`absolute left-6 text-[8px] font-black uppercase tracking-[0.3em] whitespace-nowrap transition-all duration-500 ${activeDay === day.day ? 'opacity-100 translate-x-0 text-brand-rose-700' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
                            Day {day.day}
                        </span>
                    </button>
                ))}
            </div>

            <div id="itinerary-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-24 relative pt-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                        viewport={{ once: true }}
                        style={{ color: 'rgba(232, 219, 196, 0.05)' }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 text-[10rem] md:text-[18rem] font-serif font-black select-none -z-10 tracking-[0.3em] italic leading-none pointer-events-none uppercase"
                    >
                        JOURNAL
                    </motion.div>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-8xl font-serif font-black text-brand-text-heading tracking-tighter leading-tight mb-10 italic"
                    >
                        {t('itineraryTitle', { destination: itinerary.destination })}
                    </motion.h2>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-6"
                    >
                        <div className="h-px w-8" style={{ backgroundColor: 'rgba(161, 130, 74, 0.2)' }}></div>
                        <p className="text-lg text-brand-text-subtle max-w-xl font-light italic serif leading-loose">
                            {t('itinerarySubtitle')}
                        </p>
                        <div className="h-px w-8" style={{ backgroundColor: 'rgba(161, 130, 74, 0.2)' }}></div>
                    </motion.div>
                </header>

                {/* Trip Overview Stats - "Glass Stationary" Style */}
                <div className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Duration', value: `${itinerary.dayByDay.length} Days`, sub: 'Golden timeframe' },
                        { label: 'Vibe', value: preferences.travelStyles[0], sub: 'Primary aesthetic' },
                        { label: 'Season', value: preferences.travelDates, sub: 'Seasonal peak' },
                        { label: 'Total Est.', value: itinerary.detailedCostBreakdown.totalCost, sub: 'Excluding flights' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-8 border border-brand-rose-200/50 rounded-sm shadow-sm flex flex-col items-center group transition-all duration-700">
                             <span className="block text-[8px] font-black uppercase tracking-[0.4em] text-brand-rose-400 mb-4 transition-colors uppercase">{stat.label}</span>
                             <span className="block text-3xl font-serif font-black italic text-brand-text-heading mb-1 transition-colors leading-none">{stat.value}</span>
                             <span className="text-[9px] font-light italic serif text-brand-text-subtle transition-colors">{stat.sub}</span>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-10 items-start">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-12">
                        <section id="day-by-day">
                            <div className="flex items-end gap-6 mb-12">
                                <h3 className="text-5xl font-serif font-bold text-brand-text-heading tracking-tight italic">{t('dayByDay')}</h3>
                                <div className="h-[1px] flex-grow bg-brand-rose-400/30 mb-3"></div>
                            </div>
                            <div className="space-y-10 relative">
                                <div 
                                    className="absolute start-[23px] top-10 bottom-10 w-px opacity-40"
                                    style={{ background: 'linear-gradient(to bottom, #102a43, #e8dbc4, transparent)' }}
                                ></div>
                                {itinerary.dayByDay.map(day => <ItineraryDay key={day.day} dayPlan={day} t={t} />)}
                            </div>
                        </section>

                        <AccommodationSection accommodationOptions={itinerary.accommodationOptions} t={t} />
                        <RestaurantGuide restaurants={itinerary.restaurantGuide} t={t} />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-10 lg:sticky top-28">
                        <CostAndTimeline breakdown={itinerary.detailedCostBreakdown} timeline={itinerary.visualTimeline} t={t} />

                        <div className="bg-white p-10 rounded-sm shadow-card border border-brand-rose-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-rose-100 rounded-full -mr-20 -mt-20 opacity-30 blur-3xl -z-10"></div>
                            <h3 className="text-2xl font-serif font-black text-brand-text-heading mb-8 tracking-tight flex items-center gap-4 italic border-b border-brand-rose-100 pb-5">
                                <div className="p-2.5 bg-brand-rose-700 rounded-sm shadow-lg shadow-black/5">
                                    <Heart className="h-5 w-5 text-brand-rose-100 fill-current" /> 
                                </div>
                                {t('romanticHighlights')}
                            </h3>
                            <ul className="space-y-5">
                                {itinerary.romanticHighlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start gap-4 text-brand-text-main/90 font-light italic serif leading-loose">
                                        <div className="w-1.5 h-1.5 bg-brand-rose-400 rounded-full mt-3.5 shrink-0 shadow-[0_0_8px_#a1824a]"></div>
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <PreTripChecklist t={t} items={itinerary.preTripChecklist} />

                        <div className="bg-brand-rose-700 p-10 rounded-sm shadow-2xl relative overflow-hidden border border-brand-rose-800">
                            <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-rose-50/5 rounded-full -mr-20 -mb-20 blur-3xl"></div>
                            <h3 className="text-2xl font-serif font-black text-brand-rose-50 mb-6 tracking-tight italic border-b border-brand-rose-600 pb-4">{t('balanceHarmony')}</h3>
                            <p className="text-brand-rose-100/90 font-light italic serif leading-relaxed text-lg">{itinerary.partnerPreferenceBalance}</p>
                        </div>
                        
                        <Feedback t={t} />
                    </div>
                </div>
            </div>
            
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 flex flex-wrap justify-center items-center gap-6 pb-20">
                <button onClick={onBack} className="bg-white text-brand-text-heading font-black uppercase tracking-[0.3em] text-[10px] py-6 px-10 rounded-sm hover:bg-brand-rose-100 transition-all border border-brand-rose-200 shadow-card">
                    {t('backToDestinations')}
                </button>
                 <button onClick={onRestart} className="bg-brand-rose-600 text-brand-rose-50 font-black uppercase tracking-[0.3em] text-[10px] py-6 px-10 rounded-sm hover:bg-brand-rose-700 hover:shadow-2xl transition-all">
                    {t('startNewPlan')}
                </button>
                <button 
                    onClick={handleSaveTrip} 
                    disabled={isSaving || saveSuccess}
                    className={`font-black uppercase tracking-[0.3em] text-[10px] py-6 px-10 rounded-sm transition-all flex items-center justify-center gap-4 shadow-xl ${
                        saveSuccess 
                        ? 'bg-green-600 text-white' 
                        : 'bg-brand-rose-700 text-brand-rose-50 hover:bg-black'
                    }`}
                 >
                    {saveSuccess ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                    {isSaving ? t('saving') : saveSuccess ? t('savedToProfile') : t('saveToProfile')}
                 </button>
                 <button 
                    onClick={handleDownloadPdf} 
                    disabled={isGeneratingPdf}
                    className="bg-brand-rose-400 text-brand-rose-800 font-black uppercase tracking-[0.3em] text-[10px] py-6 px-10 rounded-sm hover:bg-brand-rose-300 transition-all flex items-center justify-center gap-4 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-xl shadow-brand-rose-400/10"
                 >
                    <Download className="w-5 h-5" />
                    {isGeneratingPdf ? t('generatingPDF') : t('downloadPDF')}
                 </button>
            </div>
            <ShareItinerary itinerary={itinerary} preferences={preferences} t={t} />
        </div>
    );
};

export default Itinerary;