// src/hooks/usePackage.ts
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { SafariPackage } from '../types/sfp';

interface UsePackageReturn {
  package: SafariPackage | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch a single safari package by slug
 * @param slug The slug of the package to fetch
 */
export function usePackage(slug: string | undefined): UsePackageReturn {
  const [packageData, setPackageData] = useState<SafariPackage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError('No package slug provided');
      return;
    }

    const fetchPackage = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('safari_packages')
          .select(`
            id,
            slug,
            title,
            duration,
            group_size,
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
            destination_category,
            package_category
          `)
          .eq('slug', slug)
          .single();

        if (error) throw error;
        
        if (!data) {
          throw new Error('Package not found');
        }

        setPackageData(data as unknown as SafariPackage);
      } catch (err) {
        console.error('Error fetching package:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch package');
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [slug]);

  return { package: packageData, loading, error };
}