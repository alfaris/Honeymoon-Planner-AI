

import BeachIcon from './components/icons/BeachIcon';
import FestivalsEventsIcon from './components/icons/FestivalsEventsIcon';
import FineDiningIcon from './components/icons/FineDiningIcon';
import HikingIcon from './components/icons/HikingIcon';
import MuseumIcon from './components/icons/MuseumIcon';
import NightlifeIcon from './components/icons/NightlifeIcon';
import ShoppingIcon from './components/icons/ShoppingIcon';
import WaterSportsIcon from './components/icons/WaterSportsIcon';
import WellnessSpaIcon from './components/icons/WellnessSpaIcon';

import GlobeAmericasIcon from './components/icons/GlobeAmericasIcon';
import HomeIcon from './components/icons/HomeIcon';
import GlobeIcon from './components/icons/GlobeIcon';

// New Icons
import TropicalIcon from './components/icons/TropicalIcon';
import MediterraneanIcon from './components/icons/MediterraneanIcon';
import TemperateIcon from './components/icons/TemperateIcon';
import MountainIcon from './components/icons/MountainIcon';
import DesertIcon from './components/icons/DesertIcon';
import SnowflakeIcon from './components/icons/SnowflakeIcon';

import StarIcon from './components/icons/StarIcon';
import BoutiqueHotelIcon from './components/icons/BoutiqueHotelIcon';

import StreetFoodIcon from './components/icons/StreetFoodIcon';
import CasualDiningIcon from './components/icons/CasualDiningIcon';
import FusionIcon from './components/icons/FusionIcon';
import VegetarianIcon from './components/icons/VegetarianIcon';

import LuxuryResortIcon from './components/icons/LuxuryResortIcon';
import CityscapeIcon from './components/icons/CityscapeIcon';
import CountrysideIcon from './components/icons/CountrysideIcon';
import CompassIcon from './components/icons/CompassIcon';
import WildlifeIcon from './components/icons/WildlifeIcon';
import CulinaryIcon from './components/icons/CulinaryIcon';

export type TranslationSet = {
    [key: string]: any;
};

export const translations: { en: TranslationSet, ar: TranslationSet } = {
    en: {
        appName: "Honeymoon Planner AI",
        poweredBy: "Powered by Google AI",
        headerTitle: "Honeymoon Planner AI",
        
        // Discovery Form
        discoveryTitle: "Plan Your Dream Honeymoon",
        discoverySubtitle: "Answer a few questions, and our AI will craft the perfect romantic getaway, just for you.",
        findMyHoneymoon: "Find My Honeymoon",
        planning: "Planning...",
        
        // Sections
        budgetTimeline: "Budget & Timeline",
        budgetTimelineDesc: "Tell us about your budget and when you'd like to travel.",
        travelStyle: "Travel Style & Preferences",
        travelStyleDesc: "What kind of vibe are you looking for?",
        personalTouches: "Personal Touches",
        personalTouchesDesc: "Help us personalize your trip even more.",
        practicalNeeds: "Practical Needs",
        practicalNeedsDesc: "Just a few more details to ensure a smooth journey.",
        
        // Labels & Placeholders
        totalBudget: "Total Honeymoon Budget",
        totalBudgetPlaceholder: "e.g., 5000",
        currency: "Currency",
        duration: "How many days/nights?",
        durationPlaceholder: "e.g., 10",
        travelDates: "What month or dates are ideal?",
        travelDatesPlaceholder: "e.g., June 2025",
        selectTravelStyles: "Select your travel style(s)",
        preferredClimate: "Preferred Climate",
        accommodationStyle: "Accommodation Style",
        any: "Any",
        whatActivities: "What activities excite you most?",
        diningPreference: "Dining Preference",
        mustVisit: "Must-Visit Places",
        mustVisitPlaceholder: "e.g., Paris, the Eiffel Tower",
        noGo: "No-Go Places",
        noGoPlaceholder: "e.g., Avoid big crowded cities",
        mustVisitSuggestions: ["Eiffel Tower", "Beaches", "Mountains", "Museums", "Historical sites", "Good restaurants"],
        noGoSuggestions: ["Big crowded cities", "Touristy areas", "Cold places", "Remote areas", "Party destinations"],
        dietaryNeedsSuggestions: ["Gluten-free", "Vegetarian", "Vegan", "Nut allergy", "Wheelchair accessible", "Limited mobility"],
        partnerBalance: "If your preferences differ, how would you like to balance them?",
        dietaryNeeds: "Any dietary restrictions, accessibility needs, or mobility considerations?",
        dietaryNeedsPlaceholder: "e.g., Gluten-free, wheelchair accessible",
        userCountryLabel: "Your Home Country",
        userCountryPlaceholder: "e.g., United States (for visa checks)",
        longFlights: "How do you feel about flight duration?",
        preferredRegion: "Preferred Region",
        honeymoonLocation: "Honeymoon Location",
        gettingLocation: "Getting your location...",
        surpriseMeLabel: "Surprise Me!",
        surpriseMeDesc: "Feeling adventurous? Let our AI suggest a unique, unexpected destination that might be outside your stated preferences for a truly memorable honeymoon.",
        
        // Flight Preferences
        flightPrefNo: "No preference",
        flightPrefShort: "Prefer shorter distances",
        flightPrefLong: "Long flights are fine",
        flightPrefLabelShort: "Short-haul",
        flightPrefLabelAny: "Any",
        flightPrefLabelLong: "Long-haul",
        
        // Recommendations
        recommendationsTitle: "Your Honeymoon Destinations",
        recommendationsSubtitle: "Based on your preferences, here are a few ideas. Which one sparks joy?",
        bestTime: "Best Time to Visit",
        dailyCost: "Est. Daily Cost",
        tripStructure: "Trip Structure",
        romanticHighlights: "Romantic Highlights",
        planThisTrip: "Plan This Trip",
        estimatedBudget: "Estimated Budget",
        flights: "Flights",
        accommodation: "Accommodation",
        activities: "Activities",
        dining: "Dining",
        localTransport: "Local Transport",
        noResultsTitle: "No Destinations Found",
        noResultsDesc: "We couldn't find any matching destinations for your preferences. Please try adjusting your criteria.",
        startOver: "Start Over",
        orStartOver: "Or, start over with new preferences",
        perfectMatch: "Perfect Match",
        expertTip: "Expert Insight",
        expertTipText: "This itinerary is optimized for a balance of relaxation and authentic local discovery. Don't forget to book your preferred dinner spots at least 2 weeks in advance.",
        days: "Days",
        region: "Region",
        anywhere: "Anywhere",

        // Itinerary
        itineraryTitle: "Your Honeymoon to {destination}",
        itinerarySubtitle: "An unforgettable romantic adventure awaits!",
        dayByDay: "Day-by-Day Itinerary",
        accommodationOptions: "Accommodation Options",
        restaurantGuide: "Restaurant Guide",
        costAndTimeline: "Cost and Timeline",
        balanceHarmony: "Balance in Harmony",
        preTripChecklist: "Pre-Trip Checklist",
        backToDestinations: "Back to Destinations",
        startNewPlan: "Start a New Plan",
        day: "Day {day}",
        morning: "Morning",
        afternoon: "Afternoon",
        evening: "Evening",
        cost: "Cost",
        bookNow: "Book Now",
        reserve: "Reserve",
        inCity: "In {city}:",
        budget: "Budget",
        midRange: "Mid-Range",
        luxury: "Luxury",
        amenities: "Amenities",
        viewAndBook: "View & Book",
        mustTry: "Must Try",
        reservations: "Reservations",
        visualTimeline: "Visual Timeline",
        detailedCost: "Detailed Cost",
        activitiesSubtotal: "Activities",
        contingency: "Contingency (10%)",
        totalEstCost: "Total Estimated Cost",

        // Sharing
        shareItinerary: "Share Itinerary",
        shareTitle: "Share Your Dream Itinerary",
        shareDescription: "Copy the link below or share it directly to your favorite apps.",
        copyLink: "Copy Link",
        copied: "Copied!",
        shareOn: "Share on",

        // PDF Download
        downloadPDF: "Download as PDF",
        generatingPDF: "Generating PDF...",

        // Loading
        loadingDestinations: "Finding the perfect destinations for you...",
        loadingItinerarySteps: [
            "Crafting your itinerary for {destination}...",
            "Finding the most romantic dinner spots...",
            "Scouting for unique, memorable activities...",
            "Balancing your travel styles and preferences...",
            "Finalizing your accommodation options...",
            "Just a few more moments, it'll be worth it!",
        ],
        
        // Error
        errorTitle: "Oops! Something went wrong.",
        tryAgain: "Try Again",

        // Feedback
        feedbackTitle: "How was this plan?",
        feedbackThanks: "Thanks for your feedback!",
        feedbackUnhappy: "Unhappy",
        feedbackNeutral: "It's okay",
        feedbackHappy: "Happy",

        // Constants Data
        honeymoonTypes: [
            { id: 'abroad', name: 'Abroad', icon: GlobeAmericasIcon },
            { id: 'local', name: 'Local', icon: HomeIcon }
        ],
        destinationRegions: [
            { id: 'anywhere', name: 'Anywhere', icon: GlobeIcon },
            { id: 'europe', name: 'Europe', icon: GlobeIcon },
            { id: 'asia', name: 'Asia', icon: GlobeIcon },
            { id: 'north_america', name: 'North America', icon: GlobeIcon },
            { id: 'south_america', name: 'South America', icon: GlobeIcon },
            { id: 'africa', name: 'Africa', icon: GlobeIcon },
            { id: 'oceania', name: 'Oceania (Australia & Pacific)', icon: GlobeIcon }
        ],
        travelStyles: [
            { id: 'luxury', name: 'Luxury Resort Relaxation', icon: LuxuryResortIcon },
            { id: 'beach', name: 'Beach & Ocean Activities', icon: BeachIcon },
            { id: 'adventure', name: 'Adventure & Hiking', icon: HikingIcon },
            { id: 'culture', name: 'Cultural & Historical', icon: MuseumIcon },
            { id: 'city', name: 'Urban City Experiences', icon: CityscapeIcon },
            { id: 'countryside', name: 'Romantic Countryside', icon: CountrysideIcon },
            { id: 'off-the-beaten-path', name: 'Off-the-Beaten-Path', icon: CompassIcon },
            { id: 'wildlife', name: 'Wildlife & Nature', icon: WildlifeIcon },
            { id: 'foodie', name: 'Food & Culinary', icon: CulinaryIcon }
        ],
        activitiesList: [
            { id: 'beach', name: 'Beach', icon: BeachIcon }, 
            { id: 'hiking', name: 'Hiking', icon: HikingIcon }, 
            { id: 'museums', name: 'Museums', icon: MuseumIcon },
            { id: 'fine_dining', name: 'Fine Dining', icon: FineDiningIcon }, 
            { id: 'nightlife', name: 'Nightlife', icon: NightlifeIcon }, 
            { id: 'wellness_spa', name: 'Wellness/Spa', icon: WellnessSpaIcon },
            { id: 'water_sports', name: 'Water Sports', icon: WaterSportsIcon }, 
            { id: 'shopping', name: 'Shopping', icon: ShoppingIcon }, 
            { id: 'festivals_events', name: 'Festivals/Events', icon: FestivalsEventsIcon }
        ],
        climates: [
            { id: 'tropical', name: 'Tropical', icon: TropicalIcon }, 
            { id: 'mediterranean', name: 'Mediterranean', icon: MediterraneanIcon }, 
            { id: 'temperate', name: 'Temperate', icon: TemperateIcon },
            { id: 'mountain', name: 'Mountain', icon: MountainIcon }, 
            { id: 'desert', name: 'Desert', icon: DesertIcon }, 
            { id: 'snow', name: 'Snow', icon: SnowflakeIcon }
        ],
        accommodationStyles: [
            { id: 'budget', name: 'Budget-friendly', icon: StarIcon }, 
            { id: 'comfortable', name: 'Comfortable', icon: StarIcon }, 
            { id: 'upscale', name: 'Upscale', icon: StarIcon },
            { id: 'ultra_luxury', name: 'Ultra-luxury', icon: StarIcon }, 
            { id: 'boutique', name: 'Unique/Boutique', icon: BoutiqueHotelIcon }
        ],
        diningPreferences: [
            { id: 'street_food', name: 'Street Food', icon: StreetFoodIcon }, 
            { id: 'casual', name: 'Casual', icon: CasualDiningIcon }, 
            { id: 'fine_dining', name: 'Fine Dining', icon: FineDiningIcon },
            { id: 'fusion', name: 'Fusion', icon: FusionIcon }, 
            { id: 'vegetarian', name: 'Vegetarian-friendly', icon: VegetarianIcon }
        ],
        partnerBalanceOptions: [
            { id: 'balanced', name: 'A good mix of both our tastes' },
            { id: 'partner_a', name: 'Focus more on my tastes' },
            { id: 'partner_b', name: 'Focus more on my partner\'s tastes' },
            { id: 'separate', name: 'We like different things, plan for both!' }
        ]
    },
    ar: {
        appName: "مخطط شهر العسل بالذكاء الاصطناعي",
        poweredBy: "مدعوم بالذكاء الاصطناعي من Google",
        headerTitle: "مخطط شهر العسل بالذكاء الاصطناعي",
        
        // Discovery Form
        discoveryTitle: "خطط لشهر عسل أحلامك",
        discoverySubtitle: "أجب عن بعض الأسئلة، وسيقوم الذكاء الاصطناعي لدينا بصياغة عطلة رومانسية مثالية، خصيصًا لك.",
        findMyHoneymoon: "ابحث عن شهر العسل",
        planning: "جاري التخطيط...",

        // Sections
        budgetTimeline: "الميزانية والجدول الزمني",
        budgetTimelineDesc: "أخبرنا عن ميزانيتك ومتى ترغب في السفر.",
        travelStyle: "أسلوب السفر والتفضيلات",
        travelStyleDesc: "ما هو نوع الأجواء التي تبحث عنها؟",
        personalTouches: "لمسات شخصية",
        personalTouchesDesc: "ساعدنا في تخصيص رحلتك بشكل أكبر.",
        practicalNeeds: "الاحتياجات العملية",
        practicalNeedsDesc: "فقط بعض التفاصيل الإضافية لضمان رحلة سلسة.",

        // Labels & Placeholders
        totalBudget: "إجمالي ميزانية شهر العسل",
        totalBudgetPlaceholder: "مثال: 5000",
        currency: "العملة",
        duration: "كم عدد الأيام/الليالي؟",
        durationPlaceholder: "مثال: 10",
        travelDates: "ما هو الشهر أو التواريخ المثالية؟",
        travelDatesPlaceholder: "مثال: يونيو 2025",
        selectTravelStyles: "اختر أسلوب (أساليب) سفرك",
        preferredClimate: "المناخ المفضل",
        accommodationStyle: "نوع الإقامة",
        any: "أي نوع",
        whatActivities: "ما هي الأنشطة التي تثير حماسك أكثر؟",
        diningPreference: "تفضيلات الطعام",
        mustVisit: "أماكن لا بد من زيارتها",
        mustVisitPlaceholder: "مثال: باريس، برج إيفل",
        noGo: "أماكن تفضل تجنبها",
        noGoPlaceholder: "مثال: تجنب المدن الكبيرة المزدحمة",
        mustVisitSuggestions: ["برج إيفل", "شواطئ", "جبال", "متاحف", "مواقع تاريخية", "مطاعم جيدة"],
        noGoSuggestions: ["المدن الكبيرة المزدحمة", "المناطق السياحية", "الأماكن الباردة", "المناطق النائية", "وجهات الحفلات"],
        dietaryNeedsSuggestions: ["خالي من الغلوتين", "نباتي", "نباتي صرف", "حساسية المكسرات", "متاح للكراسي المتحركة", "حركة محدودة"],
        partnerBalance: "إذا كانت تفضيلاتكما مختلفة، كيف تودان الموازنة بينها؟",
        dietaryNeeds: "هل هناك أي قيود غذائية، احتياجات خاصة، أو اعتبارات حركية؟",
        dietaryNeedsPlaceholder: "مثال: خالي من الغلوتين، متاح للكراسي المتحركة",
        userCountryLabel: "بلدك الأم",
        userCountryPlaceholder: "مثال: الولايات المتحدة (للتحقق من التأشيرة)",
        longFlights: "ما هو شعورك تجاه مدة الرحلة؟",
        preferredRegion: "المنطقة المفضلة",
        honeymoonLocation: "مكان شهر العسل",
        gettingLocation: "جاري تحديد موقعك...",
        surpriseMeLabel: "فاجئني!",
        surpriseMeDesc: "هل تشعر بالمغامرة؟ دع الذكاء الاصطناعي يقترح وجهة فريدة وغير متوقعة قد تكون خارج تفضيلاتك المعلنة لشهر عسل لا يُنسى حقًا.",


        // Flight Preferences
        flightPrefNo: "لا يوجد تفضيل",
        flightPrefShort: "أفضل المسافات القصيرة",
        flightPrefLong: "الرحلات الطويلة لا بأس بها",
        flightPrefLabelShort: "قصيرة",
        flightPrefLabelAny: "أي مسافة",
        flightPrefLabelLong: "طويلة",

        // Recommendations
        recommendationsTitle: "وجهات شهر العسل الخاصة بك",
        recommendationsSubtitle: "بناءً على تفضيلاتك، إليك بعض الأفكار. أي واحدة تثير حماسك؟",
        bestTime: "أفضل وقت للزيارة",
        dailyCost: "التكلفة اليومية التقديرية",
        tripStructure: "هيكل الرحلة",
        romanticHighlights: "أبرز اللحظات الرومانسية",
        planThisTrip: "خطط لهذه الرحلة",
        estimatedBudget: "الميزانية التقديرية",
        flights: "الطيران",
        accommodation: "الإقامة",
        activities: "الأنشطة",
        dining: "الطعام",
        localTransport: "النقل المحلي",
        noResultsTitle: "لم يتم العثور على وجهات",
        noResultsDesc: "لم نتمكن من العثور على أي وجهات مطابقة لتفضيلاتك. يرجى محاولة تعديل معاييرك.",
        startOver: "ابدأ من جديد",
        orStartOver: "أو، ابدأ من جديد بتفضيلات جديدة",
        perfectMatch: "تطابق مثالي",
        expertTip: "نصيحة خبير",
        expertTipText: "تم تحسين مسار الرحلة هذا لتحقيق توازن بين الاسترخاء والاكتشاف المحلي الأصيل. لا تنس حجز أماكن العشاء المفضلة لديك قبل أسبوعين على الأقل.",
        days: "أيام",
        region: "المنطقة",
        anywhere: "أي مكان",

        // Itinerary
        itineraryTitle: "شهر العسل الخاص بك إلى {destination}",
        itinerarySubtitle: "مغامرة رومانسية لا تُنسى في انتظارك!",
        dayByDay: "برنامج الرحلة اليومي",
        accommodationOptions: "خيارات الإقامة",
        restaurantGuide: "دليل المطاعم",
        costAndTimeline: "التكلفة والجدول الزمني",
        balanceHarmony: "توازن متناغم",
        preTripChecklist: "قائمة التحقق قبل الرحلة",
        backToDestinations: "العودة إلى الوجهات",
        startNewPlan: "ابدأ خطة جديدة",
        day: "اليوم {day}",
        morning: "الصباح",
        afternoon: "بعد الظهر",
        evening: "المساء",
        cost: "التكلفة",
        bookNow: "احجز الآن",
        reserve: "احجز",
        inCity: "في {city}:",
        budget: "اقتصادي",
        midRange: "متوسط التكلفة",
        luxury: "فاخر",
        amenities: "وسائل الراحة",
        viewAndBook: "عرض وحجز",
        mustTry: "يجب تجربة",
        reservations: "الحجوزات",
        visualTimeline: "الجدول الزمني المرئي",
        detailedCost: "التكلفة التفصيلية",
        activitiesSubtotal: "الأنشطة",
        contingency: "الطوارئ (10%)",
        totalEstCost: "إجمالي التكلفة التقديرية",

        // Sharing
        shareItinerary: "مشاركة خط سير الرحلة",
        shareTitle: "شارك خط سير رحلة أحلامك",
        shareDescription: "انسخ الرابط أدناه أو شاركه مباشرة على تطبيقاتك المفضلة.",
        copyLink: "نسخ الرابط",
        copied: "تم النسخ!",
        shareOn: "المشاركة على",
        
        // PDF Download
        downloadPDF: "تحميل كملف PDF",
        generatingPDF: "جاري إنشاء PDF...",

        // Loading
        loadingDestinations: "نبحث لك عن أفضل الوجهات...",
        loadingItinerarySteps: [
            "نقوم بإعداد خط سير رحلتك إلى {destination}...",
            "نبحث عن أكثر أماكن العشاء رومانسية...",
            "نستكشف أنشطة فريدة لا تُنسى...",
            "نوازن بين أساليب السفر وتفضيلاتكما...",
            "نضع اللمسات الأخيرة على خيارات الإقامة...",
            "لحظات قليلة وستكون جاهزة، تستحق الانتظار!",
        ],

        // Error
        errorTitle: "عفوًا! حدث خطأ ما.",
        tryAgain: "حاول مرة أخرى",

        // Feedback
        feedbackTitle: "ما رأيك في هذه الخطة؟",
        feedbackThanks: "شكراً لملاحظاتك!",
        feedbackUnhappy: "غير راضٍ",
        feedbackNeutral: "لا بأس بها",
        feedbackHappy: "راضٍ",

        // Constants Data
        honeymoonTypes: [
            { id: 'abroad', name: 'في الخارج', icon: GlobeAmericasIcon },
            { id: 'local', name: 'محلي', icon: HomeIcon }
        ],
        destinationRegions: [
            { id: 'anywhere', name: 'أي مكان', icon: GlobeIcon },
            { id: 'europe', name: 'أوروبا', icon: GlobeIcon },
            { id: 'asia', name: 'آسيا', icon: GlobeIcon },
            { id: 'north_america', name: 'أمريكا الشمالية', icon: GlobeIcon },
            { id: 'south_america', name: 'أمريكا الجنوبية', icon: GlobeIcon },
            { id: 'africa', name: 'أفريقيا', icon: GlobeIcon },
            { id: 'oceania', name: 'أوقيانوسيا (أستراليا والمحيط الهادئ)', icon: GlobeIcon }
        ],
        travelStyles: [
            { id: 'luxury', name: 'استرخاء في منتجع فاخر', icon: LuxuryResortIcon },
            { id: 'beach', name: 'أنشطة شاطئية ومحيطية', icon: BeachIcon },
            { id: 'adventure', name: 'مغامرة وتنزه', icon: HikingIcon },
            { id: 'culture', name: 'ثقافية وتاريخية', icon: MuseumIcon },
            { id: 'city', name: 'تجارب في المدن الحضرية', icon: CityscapeIcon },
            { id: 'countryside', name: 'ريف رومانسي', icon: CountrysideIcon },
            { id: 'off-the-beaten-path', name: 'بعيدًا عن المسارات المعتادة', icon: CompassIcon },
            { id: 'wildlife', name: 'حياة برية وطبيعة', icon: WildlifeIcon },
            { id: 'foodie', name: 'طعام وفنون الطهي', icon: CulinaryIcon }
        ],
        activitiesList: [
            { id: 'beach', name: 'شاطئ', icon: BeachIcon }, 
            { id: 'hiking', name: 'تنزه', icon: HikingIcon }, 
            { id: 'museums', name: 'متاحف', icon: MuseumIcon },
            { id: 'fine_dining', name: 'عشاء فاخر', icon: FineDiningIcon }, 
            { id: 'nightlife', name: 'حياة ليلية', icon: NightlifeIcon }, 
            { id: 'wellness_spa', name: 'صحة/سبا', icon: WellnessSpaIcon },
            { id: 'water_sports', name: 'رياضات مائية', icon: WaterSportsIcon }, 
            { id: 'shopping', name: 'تسوق', icon: ShoppingIcon }, 
            { id: 'festivals_events', name: 'مهرجانات/فعاليات', icon: FestivalsEventsIcon }
        ],
        climates: [
            { id: 'tropical', name: 'استوائي', icon: TropicalIcon }, 
            { id: 'mediterranean', name: 'بحر متوسط', icon: MediterraneanIcon }, 
            { id: 'temperate', name: 'معتدل', icon: TemperateIcon },
            { id: 'mountain', name: 'جبلي', icon: MountainIcon }, 
            { id: 'desert', name: 'صحراوي', icon: DesertIcon }, 
            { id: 'snow', name: 'ثلجي', icon: SnowflakeIcon }
        ],
        accommodationStyles: [
            { id: 'budget', name: 'اقتصادي', icon: StarIcon }, 
            { id: 'comfortable', name: 'مريح', icon: StarIcon }, 
            { id: 'upscale', name: 'راقي', icon: StarIcon },
            { id: 'ultra_luxury', name: 'فخم جدًا', icon: StarIcon }, 
            { id: 'boutique', name: 'فريد/بوتيك', icon: BoutiqueHotelIcon }
        ],
        diningPreferences: [
            { id: 'street_food', name: 'طعام الشارع', icon: StreetFoodIcon }, 
            { id: 'casual', name: 'غير رسمي', icon: CasualDiningIcon }, 
            { id: 'fine_dining', name: 'عشاء فاخر', icon: FineDiningIcon },
            { id: 'fusion', name: 'مزيج', icon: FusionIcon }, 
            { id: 'vegetarian', name: 'صديق للنباتيين', icon: VegetarianIcon }
        ],
        partnerBalanceOptions: [
            { id: 'balanced', name: 'مزيج جيد من أذواقنا' },
            { id: 'partner_a', name: 'التركيز أكثر على أذواقي' },
            { id: 'partner_b', name: 'التركيز أكثر على أذواق شريكي' },
            { id: 'separate', name: 'نحب أشياء مختلفة، خطط لكليهما!' }
        ]
    }
};