

import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import { HoneymoonPreferences, Phase1Response, DetailedItinerary } from '../types';

let aiClient: GoogleGenAI | null = null;

function getAi() {
    if (!aiClient) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY environment variable not set. Please add it to your environment.");
        }
        aiClient = new GoogleGenAI({ apiKey });
    }
    return aiClient;
}

const recommendationSchema = {
    type: Type.OBJECT,
    properties: {
        recommendations: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    destinationName: { type: Type.STRING },
                    whyItMatches: { type: Type.STRING },
                    bestTimeToVisit: { type: Type.STRING },
                    estimatedDailyCost: { type: Type.STRING },
                    tripStructure: { type: Type.STRING },
                    romanticHighlights: { type: Type.ARRAY, items: { type: Type.STRING } },
                    photorealisticImagePrompt: { type: Type.STRING, description: "A detailed, stunning, photorealistic image prompt for a travel poster of this destination. Should evoke romance and the couple's preferences." }
                },
                required: ["destinationName", "whyItMatches", "bestTimeToVisit", "estimatedDailyCost", "tripStructure", "romanticHighlights", "photorealisticImagePrompt"]
            }
        },
        budgetBreakdown: {
            type: Type.OBJECT,
            properties: {
                flights: { type: Type.STRING },
                accommodation: { type: Type.STRING },
                activities: { type: Type.STRING },
                dining: { type: Type.STRING },
                localTransport: { type: Type.STRING }
            },
            required: ["flights", "accommodation", "activities", "dining", "localTransport"]
        }
    },
    required: ["recommendations", "budgetBreakdown"]
};

const itinerarySchema = {
    type: Type.OBJECT,
    properties: {
        destination: { type: Type.STRING },
        dayByDay: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    morning: { 
                        type: Type.OBJECT,
                        properties: {
                            activityName: { type: Type.STRING }, location: { type: Type.STRING }, duration: { type: Type.STRING }, whatToExpect: { type: Type.STRING }, costPerCouple: { type: Type.STRING }, bookingLink: { type: Type.STRING }
                        },
                         required: ["activityName", "location", "duration", "whatToExpect", "costPerCouple", "bookingLink"]
                    },
                    afternoon: { 
                        type: Type.OBJECT,
                        properties: {
                            activityName: { type: Type.STRING }, location: { type: Type.STRING }, duration: { type: Type.STRING }, whatToExpect: { type: Type.STRING }, costPerCouple: { type: Type.STRING }, bookingLink: { type: Type.STRING }
                        },
                         required: ["activityName", "location", "duration", "whatToExpect", "costPerCouple", "bookingLink"]
                    },
                    evening: {
                        type: Type.OBJECT,
                        properties: {
                            restaurantName: { type: Type.STRING }, cuisine: { type: Type.STRING }, pricePerCouple: { type: Type.STRING }, whyRecommended: { type: Type.STRING }, reservation: { type: Type.STRING }, whatToTry: { type: Type.ARRAY, items: { type: Type.STRING } }
                        },
                        required: ["restaurantName", "cuisine", "pricePerCouple", "whyRecommended", "whatToTry", "reservation"]
                    },
                    dayTotalCost: { type: Type.STRING }
                },
                required: ["day", "title", "evening", "dayTotalCost"]
            }
        },
        accommodationOptions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    type: { type: Type.STRING },
                    city: { type: Type.STRING },
                    budget: { type: Type.OBJECT, properties: { hotelName: { type: Type.STRING }, pricePerNight: { type: Type.STRING }, whyGoodForHoneymoon: { type: Type.STRING }, amenities: { type: Type.ARRAY, items: { type: Type.STRING } }, distanceToActivities: { type: Type.STRING }, bookingLink: { type: Type.STRING } }, required: ["hotelName", "pricePerNight", "whyGoodForHoneymoon", "amenities", "distanceToActivities", "bookingLink"] },
                    midRange: { type: Type.OBJECT, properties: { hotelName: { type: Type.STRING }, pricePerNight: { type: Type.STRING }, whyGoodForHoneymoon: { type: Type.STRING }, amenities: { type: Type.ARRAY, items: { type: Type.STRING } }, distanceToActivities: { type: Type.STRING }, bookingLink: { type: Type.STRING } }, required: ["hotelName", "pricePerNight", "whyGoodForHoneymoon", "amenities", "distanceToActivities", "bookingLink"] },
                    luxury: { type: Type.OBJECT, properties: { hotelName: { type: Type.STRING }, pricePerNight: { type: Type.STRING }, whyGoodForHoneymoon: { type: Type.STRING }, amenities: { type: Type.ARRAY, items: { type: Type.STRING } }, distanceToActivities: { type: Type.STRING }, bookingLink: { type: Type.STRING } }, required: ["hotelName", "pricePerNight", "whyGoodForHoneymoon", "amenities", "distanceToActivities", "bookingLink"] }
                },
                required: ["type", "city", "budget", "midRange", "luxury"]
            }
        },
        restaurantGuide: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    restaurantName: { type: Type.STRING }, cuisine: { type: Type.STRING }, pricePerCouple: { type: Type.STRING }, ambiance: { type: Type.STRING }, whyRecommended: { type: Type.STRING }, mustTryDishes: { type: Type.ARRAY, items: { type: Type.STRING } }, reservation: { type: Type.STRING }, dressCode: { type: Type.STRING }
                },
                 required: ["restaurantName", "cuisine", "pricePerCouple", "ambiance", "whyRecommended", "mustTryDishes", "reservation", "dressCode"]
            }
        },
        detailedCostBreakdown: {
            type: Type.OBJECT,
            properties: {
                flights: { type: Type.STRING }, accommodation: { type: Type.STRING }, activities: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, cost: { type: Type.STRING } }, required: ["name", "cost"] } }, activitiesSubtotal: { type: Type.STRING }, dining: { type: Type.STRING }, localTransport: { type: Type.STRING }, contingency: { type: Type.STRING }, totalCost: { type: Type.STRING }
            },
            required: ["flights", "accommodation", "activities", "activitiesSubtotal", "dining", "localTransport", "contingency", "totalCost"]
        },
        visualTimeline: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER }, title: { type: Type.STRING }, cost: { type: Type.STRING }, isRomantic: { type: Type.BOOLEAN }, isSpecial: { type: Type.BOOLEAN }
                },
                required: ["day", "title", "cost", "isRomantic", "isSpecial"]
            }
        },
        romanticHighlights: { type: Type.ARRAY, items: { type: Type.STRING } },
        partnerPreferenceBalance: { type: Type.STRING },
        preTripChecklist: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A personalized checklist of 8-10 essential pre-trip tasks for the couple."
        }
    },
    required: ["destination", "dayByDay", "accommodationOptions", "restaurantGuide", "detailedCostBreakdown", "visualTimeline", "romanticHighlights", "partnerPreferenceBalance", "preTripChecklist"]
};


const generatePhase1Prompt = (prefs: HoneymoonPreferences, language: 'en' | 'ar'): string => {
    const langInstruction = language === 'ar' 
        ? 'All user-facing text content within the JSON response (like "whyItMatches", "tripStructure", "romanticHighlights", "destinationName") must be in Arabic.'
        : 'All user-facing text content within the JSON response should be in English.';
    
    const surpriseMeInstruction = prefs.surpriseMe
        ? `**Surprise Me Activated!** The couple is open to a surprise. You have creative freedom to suggest ONE of the destinations that is unconventional or unexpected based on their profile. This 'wildcard' option should be truly romantic and unique, even if it contradicts some of their stated preferences (e.g., climate, activities). Justify why this surprise destination would make for an unforgettable honeymoon. The other 2-4 destinations should still align with their preferences.`
        : '';

    return `
You are an expert honeymoon planning AI assistant. A newly married couple has provided their preferences.
Your task is to provide 3-5 high-level destination recommendations and a budget breakdown.

**Couple's Preferences:**
- Total Budget: ${prefs.budget} ${prefs.currency}
- Duration: ${prefs.duration}
- Ideal Dates: ${prefs.travelDates}
- User's Home Country: ${prefs.userCountry} (for visa considerations and location context)
- Honeymoon Type: ${prefs.honeymoonType}
- Preferred Destination Region (if abroad): ${prefs.destinationRegion || 'Anywhere'}
- Travel Styles: ${prefs.travelStyles.join(', ')}
- Preferred Climate: ${prefs.climate}
- Desired Activities: ${prefs.activities.join(', ')}
- Accommodation Style: ${prefs.accommodationStyle}
- Dining Preference: ${prefs.diningPreference}
- Balancing Partner Preferences: ${prefs.partnerBalance}
- Must-Visit Places: ${prefs.mustVisit || 'None'}
- No-Go Places: ${prefs.noGo || 'None'}
- Dietary/Accessibility Needs: ${prefs.dietaryNeeds || 'None'}
- Flight Preference: ${prefs.flightPreference}
- Surprise Me Option: ${prefs.surpriseMe ? 'Yes' : 'No'}

**Instructions:**
- Based on the user's home country (${prefs.userCountry}) and their choice of honeymoon type (${prefs.honeymoonType}), select appropriate destinations.
- If honeymoon type is 'local', all recommendations MUST be within ${prefs.userCountry}.
- If honeymoon type is 'abroad', all recommendations MUST be outside of ${prefs.userCountry}.
- If a specific region is requested for an 'abroad' trip (and is not 'Anywhere'), please prioritize destinations from that region.
- Provide 3 to 5 diverse destination recommendations. For each, explain why it's a good fit.
- Provide a sample budget breakdown for their total budget.
- For each recommendation, create a stunning, photorealistic image prompt suitable for a travel poster that captures the essence of that destination for a honeymoon.
${surpriseMeInstruction}

Return the response in a structured JSON format. ${langInstruction}
`;
};

const generatePhase2Prompt = (destination: string, prefs: HoneymoonPreferences, language: 'en' | 'ar'): string => {
    const langInstruction = language === 'ar' 
        ? 'All user-facing text content within the JSON response (e.g., activity names, descriptions, restaurant details, highlights, etc.) must be in Arabic.'
        : 'All user-facing text content within the JSON response should be in English.';

    const surpriseMeInstruction = prefs.surpriseMe
        ? `**Surprise Me Context:** The couple originally selected the 'Surprise Me' option, indicating they are adventurous and open to unique experiences. When generating this itinerary for ${destination}, feel free to include unique, spontaneous, or unconventional romantic activities that might not perfectly align with their original stated preferences but would create a truly memorable and surprising experience. Lean into what makes this destination special and different.`
        : '';

    return `
You are an expert honeymoon planning AI assistant. The couple has selected a destination and wants a complete, detailed itinerary.
Your task is to generate this full itinerary.

**Selected Destination:** ${destination}

**Original Couple's Preferences:**
- Total Budget: ${prefs.budget} ${prefs.currency}
- Duration: ${prefs.duration}
- Ideal Dates: ${prefs.travelDates}
- User's Home Country: ${prefs.userCountry}
- Honeymoon Type: ${prefs.honeymoonType}
- Preferred Region (if abroad): ${prefs.destinationRegion || 'N/A'}
- Travel Styles: ${prefs.travelStyles.join(', ')}
- Preferred Climate: ${prefs.climate}
- Desired Activities: ` + (prefs.activities ? prefs.activities.join(', ') : 'Not specified') + `
- Accommodation Style: ${prefs.accommodationStyle}
- Dining Preference: ${prefs.diningPreference}
- Balancing Partner Preferences: ${prefs.partnerBalance}
- Surprise Me Option was selected: ${prefs.surpriseMe ? 'Yes' : 'No'}

**Instructions:**
${surpriseMeInstruction}
Generate a complete day-by-day itinerary including:
1.  **Day-by-Day Plan:** For each day, provide morning, afternoon, and evening activities/dining. Include names, locations, durations, costs, and booking links where possible.
2.  **Accommodation Options:** For each major location in the itinerary, provide a Budget, Mid-Range, and Luxury hotel option with details.
3.  **Restaurant Guide:** A list of 8-12 recommended restaurants matching their dining style.
4.  **Detailed Cost Breakdown:** A comprehensive breakdown of all estimated costs.
5.  **Visual Timeline:** A simple summary of each day's theme.
6.  **Romantic Highlights:** A list of special romantic moments.
7.  **Partner Preference Balance:** A short explanation of how the itinerary balances their different interests if applicable.
8.  **Pre-Trip Checklist:** Based on the destination, activities, and couple's home country (${prefs.userCountry}), generate a practical checklist of 8-10 essential tasks. Examples: "Check visa requirements for citizens of ${prefs.userCountry} traveling to ${destination}.", "Book scuba diving tour in advance.", "Pack appropriate hiking gear."
9.  **Important:** For fields like \`bookingLink\`, \`reservation\`, and \`dressCode\`, if a value is not available or not applicable, you **must** provide an empty string (\`""\`). Do not omit these keys.


Return the response in a structured JSON format. Ensure all costs are in ${prefs.currency}. ${langInstruction}
`;
};


export const getRecommendations = async (preferences: HoneymoonPreferences, language: 'en' | 'ar'): Promise<Phase1Response> => {
    const prompt = generatePhase1Prompt(preferences, language);
    const ai = getAi();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recommendationSchema
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as Phase1Response;
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        throw new Error("Failed to get recommendations from AI. The model may have returned an invalid format.");
    }
};

export const getItinerary = async (destination: string, preferences: HoneymoonPreferences, language: 'en' | 'ar'): Promise<DetailedItinerary> => {
    const prompt = generatePhase2Prompt(destination, preferences, language);
    const ai = getAi();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3.1-pro-preview', // Using a more powerful model for the complex itinerary
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: itinerarySchema,
                thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as DetailedItinerary;
    } catch (error) {
        console.error("Error fetching itinerary:", error);
        throw new Error("Failed to generate the detailed itinerary. The model may have returned an invalid format.");
    }
};

export const getCountryFromCoords = async (lat: number, lon: number): Promise<string> => {
    const prompt = `What country is at latitude ${lat} and longitude ${lon}? Respond with ONLY the country name.`;
    const ai = getAi();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error fetching country from coords:", error);
        return ""; // Return empty string on failure
    }
};

export const generateImage = async (prompt: string): Promise<string> => {
    const ai = getAi();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        text: `${prompt}, travel poster style, romantic, high detail, cinematic lighting, photorealistic, 4k`,
                    },
                ],
            },
            config: {
                imageConfig: {
                    aspectRatio: "4:3",
                },
            },
        });
        
        const candidates = response.candidates;
        if (candidates && candidates.length > 0 && candidates[0].content && candidates[0].content.parts) {
            for (const part of candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64EncodeString: string = part.inlineData.data;
                    return `data:image/png;base64,${base64EncodeString}`;
                }
            }
        }
        
        const keywords = prompt.split(',')[0].trim().replace(/\s+/g, '-');
        return `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80&sig=${encodeURIComponent(keywords)}`;
    } catch (error) {
        console.error("Error generating image:", error);
        return `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80&sig=error`;
    }
};