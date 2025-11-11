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
        <div>
            <div id="itinerary-content" className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-5xl md:text-6xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-rose-800)] to-[var(--brand-rose-500)] py-2">{t('itineraryTitle', { destination: itinerary.destination })}</h2>
                    <p className="mt-4 text-xl text-[var(--brand-text-subtle)]">{t('itinerarySubtitle')}</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <section id="day-by-day">
                            <h3 className="text-3xl font-serif font-bold text-[var(--brand-text-heading)] mb-4 border-b-2 border-[var(--brand-rose-200)] pb-2">{t('dayByDay')}</h3>
                            <div className="space-y-4 relative">
                                <div className="absolute start-[19px] top-6 bottom-6 w-0.5 bg-[var(--brand-rose-100)]"></div>
                                {itinerary.dayByDay.map(day => <ItineraryDay key={day.day} dayPlan={day} t={t} />)}
                            </div>
                        </section>

                        <AccommodationSection accommodationOptions={itinerary.accommodationOptions} t={t} />
                        <RestaurantGuide restaurants={itinerary.restaurantGuide} t={t} />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8 lg:sticky top-28">
                        <CostAndTimeline breakdown={itinerary.detailedCostBreakdown} timeline={itinerary.visualTimeline} t={t} />

                        <div className="card-style p-6">
                            <h3 className="text-xl font-serif font-bold text-[var(--brand-text-heading)] mb-4 flex items-center text-[var(--brand-rose-600)]">
                                <HeartIcon className="h-6 w-6 inline-block me-2" /> 
                                {t('romanticHighlights')}
                            </h3>
                            <ul className="space-y-2 list-disc list-inside text-[var(--brand-text-subtle)]">
                                {itinerary.romanticHighlights.map((highlight, index) => <li key={index}>{highlight}</li>)}
                            </ul>
                        </div>

                        <PreTripChecklist t={t} items={itinerary.preTripChecklist} />

                        <div className="card-style p-6">
                            <h3 className="text-xl font-serif font-bold text-[var(--brand-text-heading)] mb-4">{t('balanceHarmony')}</h3>
                            <p className="text-sm text-[var(--brand-text-subtle)]">{itinerary.partnerPreferenceBalance}</p>
                        </div>
                        
                        <Feedback t={t} />

                    </div>
                </div>
            </div>
            
             <div className="text-center mt-16 flex flex-wrap justify-center items-center gap-4">
                <button onClick={onBack} className="bg-white text-[var(--brand-text-main)] font-bold py-3 px-8 rounded-full hover:bg-[var(--brand-surface-subtle)] transition-colors border border-[var(--brand-border-soft)] shadow-sm">
                    {t('backToDestinations')}
                </button>
                 <button onClick={onRestart} className="bg-gradient-to-br from-[var(--brand-rose-500)] to-[var(--brand-rose-600)] text-white font-bold py-3 px-8 rounded-full hover:shadow-lg hover:shadow-[var(--brand-rose-200)] transition-all">
                    {t('startNewPlan')}
                </button>
                 <button 
                    onClick={handleDownloadPdf} 
                    disabled={isGeneratingPdf}
                    className="bg-sky-600 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-700 transition-colors flex items-center justify-center gap-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
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