

export enum AppPhase {
  DISCOVERY,
  RECOMMENDING,
  RECOMMENDATIONS_READY,
  PLANNING,
  ITINERARY_READY,
  ERROR,
}

export interface HoneymoonPreferences {
  budget: string;
  currency: string;
  duration: string;
  travelDates: string;
  travelStyles: string[];
  climate: string;
  activities: string[];
  accommodationStyle: string;
  diningPreference: string;
  partnerBalance: string;
  mustVisit: string;
  noGo: string;
  dietaryNeeds: string;
  userCountry: string;
  honeymoonType: string;
  destinationRegion: string;
  flightPreference: string;
  surpriseMe: boolean;
}

export interface DestinationRecommendation {
  destinationName: string;
  whyItMatches: string;
  bestTimeToVisit: string;
  estimatedDailyCost: string;
  tripStructure: string;
  romanticHighlights: string[];
  photorealisticImagePrompt: string;
  imageUrl?: string;
}

export interface BudgetBreakdown {
  flights: string;
  accommodation: string;
  activities: string;
  dining: string;
  localTransport: string;
}

export interface Phase1Response {
  recommendations: DestinationRecommendation[];
  budgetBreakdown: BudgetBreakdown;
}


// For Phase 2
export interface Activity {
    activityName: string;
    location: string;
    duration: string;
    whatToExpect: string;
    costPerCouple: string;
    bookingLink?: string;
}

export interface DinnerRecommendation {
    restaurantName: string;
    cuisine: string;
    pricePerCouple: string;
    whyRecommended: string;
    reservation?: string;
    whatToTry: string[];
}

export interface DayPlan {
    day: number;
    title: string;
    morning?: Activity;
    afternoon?: Activity;
    evening: DinnerRecommendation;
    dayTotalCost: string;
}

export interface AccommodationOption {
    hotelName: string;
    pricePerNight: string;
    whyGoodForHoneymoon: string;
    amenities: string[];
    distanceToActivities: string;
    bookingLink: string;
}

export interface Accommodation {
    type: string;
    city: string;
    budget: AccommodationOption;
    midRange: AccommodationOption;
    luxury: AccommodationOption;
}

export interface Restaurant {
    restaurantName: string;
    cuisine: string;
    pricePerCouple: string;
    ambiance: string;
    whyRecommended: string;
    mustTryDishes: string[];
    reservation: string;
    dressCode?: string;
}

export interface DetailedCostBreakdown {
    flights: string;
    accommodation: string;
    activities: { name: string; cost: string }[];
    activitiesSubtotal: string;
    dining: string;
    localTransport: string;
    contingency: string;
    totalCost: string;
}

export interface VisualTimelineEntry {
    day: number;
    title: string;
    cost: string;
    isRomantic: boolean;
    isSpecial: boolean;
}

export interface DetailedItinerary {
    destination: string;
    dayByDay: DayPlan[];
    accommodationOptions: Accommodation[];
    restaurantGuide: Restaurant[];
    detailedCostBreakdown: DetailedCostBreakdown;
    visualTimeline: VisualTimelineEntry[];
    romanticHighlights: string[];
    partnerPreferenceBalance: string;
    preTripChecklist: string[];
}