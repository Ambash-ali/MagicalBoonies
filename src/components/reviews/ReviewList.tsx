import React from 'react';
import { Star } from 'lucide-react';
import { format } from 'date-fns';
import { Review } from '../../hooks/useReviews';

interface ReviewListProps {
  reviews: Review[];
  loading?: boolean;
  error?: string | null;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-amber-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading reviews: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg">{review.title}</h3>
              <p className="text-gray-600">{review.name}</p>
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                />
              ))}
            </div>
          </div>
          
          <p className="text-gray-700 mb-2">{review.comment}</p>
          
          <div className="text-sm text-gray-500">
            {format(new Date(review.submitted_at), 'MMMM d, yyyy')}
          </div>
        </div>
      ))}

      {reviews.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No reviews yet. Be the first to share your experience!
        </div>
      )}
    </div>
  );
};
export default ReviewList;