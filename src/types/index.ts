export interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  highlights: string[];
  image: string;
  location: string;
  packages: SafariPackage[];
}

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
    image_url: string;
    image_gallery: string[]; 
    image_suggestions: string[]; // Ideas for detail page gallery
    destination_category: 'Masai Mara' | 'Combo' | 'Samburu' | 'Lake Nakuru' | 'Amboseli';
    package_category: 'Premium' | 'Classic' | 'Adventure' | 'Cultural';// For potential filtering
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  review: string;
  package: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface BookingFormData {
  packageId: string;
  startDate: string;
  adults: number;
  children: number;
  specialRequests?: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    country: string;
  };
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bookings: Booking[];
}

export interface Booking {
  id: string;
  userId: string;
  packageId: string;
  startDate: string;
  adults: number;
  children: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'failed';
  totalAmount: number;
  createdAt: string;
  packageDetails: {
    name: string;
    image: string;
    duration: number;
    destination: string;
  };
}