import React, { useState } from 'react';
import { DetailedItinerary, HoneymoonPreferences } from '../types';
import ItineraryDay from './itinerary/ItineraryDay';
import AccommodationSection from './itinerary/AccommodationSection';
import RestaurantGuide from './itinerary/RestaurantGuide';
import CostAndTimeline from './itinerary/CostAndTimeline';
import PreTripChecklist from './itinerary/PreTripChecklist';
import HeartIcon from './icons/HeartIcon';
import ShareItinerary from './itinerary/ShareItinerary';
import DownloadIcon from './icons/DownloadIcon';
import Feedback from './itinerary/Feedback';

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
        document.body.style.backgroundColor = 'var(--brand-rose-50)';

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: 'var(--brand-rose-50)',
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
        <div className="py-20">
            <div id="itinerary-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-28 relative">
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-[14rem] font-serif font-black text-brand-rose-200/20 select-none -z-10 tracking-widest italic leading-none">
                        03
                    </div>
                    <h2 className="text-7xl md:text-8xl font-serif font-black text-brand-text-heading tracking-tighter leading-[0.85] mb-8 italic">
                        {t('itineraryTitle', { destination: itinerary.destination })}
                    </h2>
                    <p className="text-2xl text-brand-text-main/70 max-w-2xl mx-auto font-light leading-relaxed italic font-serif">
                        {t('itinerarySubtitle')}
                    </p>
                </div>

                {/* Trip Overview Stats */}
                <div className="mb-24 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="bg-white/50 backdrop-blur-sm p-10 border border-brand-rose-200 rounded-sm text-center group hover:bg-brand-rose-700 transition-all duration-500">
                        <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-brand-rose-400 mb-4 group-hover:text-brand-rose-300">Duration</span>
                        <span className="block text-4xl font-serif font-black italic text-brand-text-heading group-hover:text-brand-rose-50">{itinerary.dayByDay.length} Days</span>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm p-10 border border-brand-rose-200 rounded-sm text-center group hover:bg-brand-rose-700 transition-all duration-500">
                        <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-brand-rose-400 mb-4 group-hover:text-brand-rose-300">Vibe</span>
                        <span className="block text-4xl font-serif font-black italic text-brand-text-heading group-hover:text-brand-rose-50">{preferences.travelStyles[0]}</span>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm p-10 border border-brand-rose-200 rounded-sm text-center group hover:bg-brand-rose-700 transition-all duration-500">
                        <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-brand-rose-400 mb-4 group-hover:text-brand-rose-300">Season</span>
                        <span className="block text-4xl font-serif font-black italic text-brand-text-heading group-hover:text-brand-rose-50">{preferences.travelDates}</span>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm p-10 border border-brand-rose-200 rounded-sm text-center group hover:bg-brand-rose-700 transition-all duration-500">
                        <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-brand-rose-400 mb-4 group-hover:text-brand-rose-300">Total Est.</span>
                        <span className="block text-4xl font-serif font-black italic text-brand-text-heading group-hover:text-brand-rose-50">{itinerary.detailedCostBreakdown.totalCost}</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-16">
                        <section id="day-by-day">
                            <div className="flex items-end gap-6 mb-12">
                                <h3 className="text-5xl font-serif font-bold text-brand-text-heading tracking-tight italic">{t('dayByDay')}</h3>
                                <div className="h-[1px] flex-grow bg-brand-rose-400/30 mb-3"></div>
                            </div>
                            <div className="space-y-10 relative">
                                <div className="absolute start-[23px] top-10 bottom-10 w-[1px] bg-brand-rose-400/50"></div>
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
                                    <HeartIcon className="h-5 w-5 text-brand-rose-100" /> 
                                </div>
                                {t('romanticHighlights')}
                            </h3>
                            <ul className="space-y-5">
                                {itinerary.romanticHighlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start gap-4 text-brand-text-main/90 font-light italic serif leading-loose">
                                        <div className="w-1.5 h-1.5 bg-brand-rose-400 rounded-full mt-3.5 shrink-0 shadow-[0_0_8px_var(--color-brand-rose-400)]"></div>
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
                    onClick={handleDownloadPdf} 
                    disabled={isGeneratingPdf}
                    className="bg-brand-rose-400 text-brand-rose-800 font-black uppercase tracking-[0.3em] text-[10px] py-6 px-10 rounded-sm hover:bg-brand-rose-300 transition-all flex items-center justify-center gap-4 disabled:bg-slate-300 disabled:cursor-not-allowed shadow-xl shadow-brand-rose-400/10"
                 >
                    <DownloadIcon className="w-5 h-5" />
                    {isGeneratingPdf ? t('generatingPDF') : t('downloadPDF')}
                 </button>
            </div>
            <ShareItinerary itinerary={itinerary} preferences={preferences} t={t} />
        </div>
    );
};

export default Itinerary;