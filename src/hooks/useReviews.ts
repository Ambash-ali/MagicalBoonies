// src/hooks/useReviews.ts
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Review {
  id: string;
  package_id: string;
  name: string;
  email: string;
  rating: number;
  title: string;
  comment: string;
  submitted_at: string;
  updated_at: string;
  is_verified: boolean;
  is_approved: boolean;
  user_id: string | null;
  ip_address: string | null;
}

interface UseReviewsReturn {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  refreshReviews: () => Promise<void>;
  averageRating: number | null;
  reviewCount: number;
}

/**
 * Custom hook to fetch reviews for a specific safari package
 * @param packageId The ID of the safari package to fetch reviews for
 */
export function useReviews(packageId: string | undefined): UseReviewsReturn {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number>(0);

  const fetchReviews = async () => {
    if (!packageId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Fetch approved reviews
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('package_id', packageId)
        .eq('is_approved', true)
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      
      setReviews(data || []);
      setReviewCount(data?.length || 0);
      
      // Calculate average rating
      if (data && data.length > 0) {
        const total = data.reduce((sum, review) => sum + review.rating, 0);
        setAverageRating(parseFloat((total / data.length).toFixed(1)));
      } else {
        setAverageRating(null);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [packageId]);

  const refreshReviews = async () => {
    await fetchReviews();
  };

  return { reviews, loading, error, refreshReviews, averageRating, reviewCount };
}
