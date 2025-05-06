import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
}

export async function signUp(email: string, password: string, metadata?: { [key: string]: any }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });
  
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

export async function submitContactForm(formData: any) {
  const { data, error } = await supabase
    .from('contact_inquiries')
    .insert([formData]);
  
  return { data, error };
}

export async function getDestinations() {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .order('name');
  
  return { data, error };
}

export async function getDestinationBySlug(slug: string) {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .eq('slug', slug)
    .single();
  
  return { data, error };
}

export async function getPackages(filters?: { 
  destinationId?: string; 
  minPrice?: number; 
  maxPrice?: number; 
  minDuration?: number; 
  maxDuration?: number;
  minRating?: number;
}) {
  let query = supabase.from('packages').select('*');
  
  if (filters) {
    if (filters.destinationId) {
      query = query.eq('destinationId', filters.destinationId);
    }
    if (filters.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice);
    }
    if (filters.minDuration !== undefined) {
      query = query.gte('duration', filters.minDuration);
    }
    if (filters.maxDuration !== undefined) {
      query = query.lte('duration', filters.maxDuration);
    }
    if (filters.minRating !== undefined) {
      query = query.gte('rating', filters.minRating);
    }
  }
  
  const { data, error } = await query.order('price');
  
  return { data, error };
}

export async function getFeaturedPackages() {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('featured', true)
    .limit(4);
  
  return { data, error };
}

export async function getPackageBySlug(slug: string) {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .eq('slug', slug)
    .single();
  
  return { data, error };
}

export async function getTestimonials(limit = 6) {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('date', { ascending: false })
    .limit(limit);
  
  return { data, error };
}

export async function getFaqs(category?: string) {
  let query = supabase.from('faqs').select('*');
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query;
  
  return { data, error };
}

export async function getUserBookings(userId: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('userId', userId)
    .order('createdAt', { ascending: false });
  
  return { data, error };
}

export async function createBooking(bookingData: any) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData]);
  
  return { data, error };
}

// Debug with raw fetch
export async function debugFetch() {
  const response = await fetch(`${supabaseUrl}/rest/v1/reviews?package_id=eq.YOUR_PACKAGE_ID`, {
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  
  console.log('Status:', response.status);
  console.log('Headers:', Object.fromEntries([...response.headers]));
  const data = await response.json().catch(e => console.error('JSON parse error:', e));
  console.log('Data:', data);
}