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
        const { jsPDF } = (window as any).jspdf;
        const html2canvas = (window as any).html2canvas;
        
        if (!jsPDF || !html2canvas) {
            console.error("PDF generation libraries not loaded.");
            alert("Sorry, the PDF generation feature is currently unavailable. Please try again later.");
            return;
        }
    
        const element = document.getElementById('itinerary-content');
        if (!element) return;
    
        setIsGeneratingPdf(true);
    
        const shareButton = document.getElementById('share-button');
        if (shareButton) shareButton.style.display = 'none';

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#fff1f2' // tailwind rose-50
            });
    
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4'
            });
    
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / canvasHeight;
            const imgHeight = pdfWidth / ratio;
    
            let heightLeft = imgHeight;
            let position = 0;
    
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();
    
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdf.internal.pageSize.getHeight();
            }
    
            pdf.save(`Honeymoon-Itinerary-to-${itinerary.destination.replace(/[\s,]+/g, '-')}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("An error occurred while generating the PDF. Please try again.");
        } finally {
            if (shareButton) shareButton.style.display = 'flex';
            setIsGeneratingPdf(false);
        }
    };

    return (
        <div id="itinerary-content" className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-5xl md:text-6xl font-serif font-extrabold text-slate-900">{t('itineraryTitle', { destination: itinerary.destination })}</h2>
                <p className="mt-4 text-xl text-slate-600">{t('itinerarySubtitle')}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <section id="day-by-day">
                        <h3 className="text-3xl font-serif font-bold text-slate-800 mb-4 border-b-2 border-rose-200 pb-2">{t('dayByDay')}</h3>
                        <div className="space-y-2 relative">
                             {/* Vertical line for timeline */}
                            <div className="absolute start-6 top-6 bottom-6 w-0.5 bg-rose-100"></div>
                            {itinerary.dayByDay.map(day => <ItineraryDay key={day.day} dayPlan={day} t={t} />)}
                        </div>
                    </section>

                     <AccommodationSection accommodationOptions={itinerary.accommodationOptions} t={t} />
                     <RestaurantGuide restaurants={itinerary.restaurantGuide} t={t} />
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8 lg:sticky top-28">
                     <CostAndTimeline breakdown={itinerary.detailedCostBreakdown} timeline={itinerary.visualTimeline} t={t} />

                    <div className="p-6 bg-white rounded-xl shadow-xl border border-slate-200/80">
                        <h3 className="text-xl font-serif font-bold text-slate-800 mb-4 flex items-center text-rose-600">
                            <HeartIcon className="h-6 w-6 inline-block me-2" /> 
                            {t('romanticHighlights')}
                        </h3>
                        <ul className="space-y-2 list-disc list-inside text-slate-600">
                            {itinerary.romanticHighlights.map((highlight, index) => <li key={index}>{highlight}</li>)}
                        </ul>
                    </div>

                    <PreTripChecklist t={t} items={itinerary.preTripChecklist} />

                     <div className="p-6 bg-white rounded-xl shadow-xl border border-slate-200/80">
                        <h3 className="text-xl font-serif font-bold text-slate-800 mb-4">{t('balanceHarmony')}</h3>
                         <p className="text-sm text-slate-600">{itinerary.partnerPreferenceBalance}</p>
                    </div>

                </div>
            </div>

             <div className="text-center mt-16 flex flex-wrap justify-center items-center gap-4">
                <button onClick={onBack} className="bg-slate-200 text-slate-800 font-bold py-3 px-8 rounded-full hover:bg-slate-300 transition-colors">
                    {t('backToDestinations')}
                </button>
                <button 
                    onClick={handleDownloadPdf} 
                    disabled={isGeneratingPdf}
                    className="bg-sky-600 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-700 transition-colors flex items-center justify-center gap-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
                 >
                    <DownloadIcon className="w-5 h-5" />
                    {isGeneratingPdf ? t('generatingPDF') : t('downloadPDF')}
                 </button>
                 <button onClick={onRestart} className="bg-gradient-to-br from-rose-500 to-rose-600 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg hover:shadow-rose-200 transition-all">
                    {t('startNewPlan')}
                </button>
            </div>
            <ShareItinerary itinerary={itinerary} preferences={preferences} t={t} />
        </div>
    );
};

export default Itinerary;