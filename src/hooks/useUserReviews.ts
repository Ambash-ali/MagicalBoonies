// src/hooks/useUserReviews.ts
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export interface UserReview {
  id: string;
  package_id: string;
  name: string;
  email: string;
  rating: number;
  title: string;
  comment: string;
  submitted_at: string;
  is_verified: boolean;
  is_approved: boolean;
  user_id: string;
  ip_address: string | null;
  package_details?: {
    name: string;
    image_url: string;
  };
}

interface UseUserReviewsReturn {
  reviews: UserReview[];
  loading: boolean;
  error: string | null;
  refreshReviews: () => Promise<void>;
  deleteReview: (reviewId: string) => Promise<boolean>;
}

/**
 * Custom hook to fetch all reviews for the currently logged-in user
 */
export function useUserReviews(): UseUserReviewsReturn {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    if (!user) {
      setReviews([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Get user reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .eq('user_id', user.id)
        .order('submitted_at', { ascending: false });

      if (reviewsError) throw reviewsError;
      
      // Now fetch package details for each review
      const reviewsWithPackages = await Promise.all(
        (reviewsData || []).map(async (review) => {
          try {
            const { data: packageData, error: packageError } = await supabase
              .from('safari_packages')  // Use the correct table name
              .select('name, image_url')
              .eq('package_id', review.package_id)  // Match on package_id
              .single();
              
            if (packageError) throw packageError;
            
            return {
              ...review,
              package_details: packageData || { name: 'Unknown Package', image_url: '/placeholder-image.jpg' }
            };
          } catch (err) {
            console.warn(`Could not fetch package details for review ${review.id}:`, err);
            return {
              ...review,
              package_details: { name: 'Unknown Package', image_url: '/placeholder-image.jpg' }
            };
          }
        })
      );
      
      setReviews(reviewsWithPackages);
    } catch (err) {
      console.error('Error fetching user reviews:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [user]);

  const refreshReviews = async () => {
    await fetchReviews();
  };

  const deleteReview = async (reviewId: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      // Update the local state to remove the deleted review
      setReviews(reviews.filter(review => review.id !== reviewId));
      return true;
    } catch (err) {
      console.error('Error deleting review:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete review');
      return false;
    }
  };

  return { reviews, loading, error, refreshReviews, deleteReview };
}
