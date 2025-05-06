// src/types/index.ts
export interface SafariPackage {
    id: string;
    slug: string;
    title: string;
    duration: string; // e.g., "4 Days / 3 Nights"
    group_size: string; // e.g., "Max 6 People"
    overview: string;
    itinerary_highlights: string[];
    inclusions: string[];
    exclusions: string[];
    best_travel_season: string;
    price_range: number; // Starting price per person
    tags: string[]; // e.g., ['medium', 'luxury', 'wildlife']
    rating: number; // e.g., 4.9
    image_url: string; // Primary image for the card
    image_suggestions: string[]; // Ideas for detail page gallery
    destination_category: 'Masai Mara' | 'Combo' | 'Samburu' | 'Lake Nakuru' | 'Amboseli';
    package_category: 'Premium' | 'Classic' | 'Adventure' | 'Cultural';// For potential filtering
  }