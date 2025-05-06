// src/hooks/usePackages.ts
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { SafariPackage } from '../types/sfp';

interface UsePackagesOptions {
  destinationCategory?: string;
  packageCategory?: string;
  limit?: number;
  specificId?: string; // Added to support fetching by ID or slug
}

interface UsePackagesReturn {
  packages: SafariPackage[];
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch all safari packages with optional filtering
 * @param options Optional filtering parameters
 */
export function usePackages(options: UsePackagesOptions = {}): UsePackagesReturn {
  const [packages, setPackages] = useState<SafariPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let query = supabase
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
          `);
        
        // If specificId is provided, check if it's a UUID or slug and filter accordingly
        if (options.specificId) {
          const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(options.specificId);
          
          if (isUUID) {
            query = query.eq('id', options.specificId);
          } else {
            query = query.eq('slug', options.specificId);
          }
        } else {
          // Apply other filters if no specific ID is provided
          if (options.destinationCategory) {
            query = query.eq('destination_category', options.destinationCategory);
          }
          
          if (options.packageCategory) {
            query = query.eq('package_category', options.packageCategory);
          }
        }
        
        // Apply limit if provided
        if (options.limit) {
          query = query.limit(options.limit);
        }

        const { data, error } = await query;

        if (error) throw error;
        
        if (options.specificId && (!data || data.length === 0)) {
          throw new Error('Package not found');
        }
        
        setPackages(data as unknown as SafariPackage[]);
      } catch (err) {
        console.error('Error fetching packages:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch packages');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [options.destinationCategory, options.packageCategory, options.limit, options.specificId]);

  return { packages, loading, error };
}