// src/hooks/useFeaturedPackages.ts
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Adjust path if needed
import { SafariPackage } from '../types/sfp'; // Adjust path if needed

// Define the shape of the hook's return value
interface UseFeaturedPackagesReturn {
  packages: SafariPackage[] | null;
  loading: boolean;
  error: string | null;
}

// --- Data Fetching Function (can be kept inside or moved to a separate api service file) ---
async function getFeaturedPackagesData(): Promise<SafariPackage[]> {
  // Select specific columns matching the interface and rename snake_case to camelCase
  // Fetch packages marked as featured and limit to 4
  const { data, error } = await supabase
    .from('safari_packages')
    .select(`
      id,
      slug,
      title,
      duration,
      overview,
      itinerary_highlights,
      inclusions,
      exclusions,
      best_travel_season,
      price_range,
      tags,
      rating,
      image_url,
      image_suggestions,
      destination_category
    `)
    .eq('is_featured', true) // Assuming you added the 'is_featured' column
    .limit(4); // Limit to 4 featured packages

  if (error) {
    console.error('Error fetching featured packages:', error);
    throw new Error(error.message || 'Failed to fetch featured packages.');
  }

  // Supabase typings might need assertion or validation here
  // If data is null, return empty array or handle as needed
  return (data as unknown as SafariPackage[]) || [];
}

// --- The Custom Hook ---
export function useFeaturedPackages(): UseFeaturedPackagesReturn {
  const [packages, setPackages] = useState<SafariPackage[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedPackages = await getFeaturedPackagesData();
        setPackages(fetchedPackages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        console.error(err); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();

    // Cleanup function is not strictly necessary here unless
    // you need to cancel the request on unmount, but good practice.
    return () => {
      // Potential cleanup logic (e.g., abort controller if using fetch directly)
    };
  }, []); // Empty dependency array means this runs once on mount

  return { packages, loading, error };
}