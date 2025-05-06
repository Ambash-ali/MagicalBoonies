import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Container from '../../components/ui/Container';
import { Star, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useUserReviews } from '../../hooks/useUserReviews';

const Reviews: React.FC = () => {
  const { user } = useAuth();
  const { reviews, loading, error, deleteReview } = useUserReviews();

  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    const success = await deleteReview(reviewId);
    if (success) {
      toast.success('Review deleted successfully');
    } else {
      toast.error('Failed to delete review');
    }
  };

  return (
    <>
      <Helmet>
        <title>My Reviews | MagicalBoonies</title>
        <meta 
          name="description" 
          content="View and manage your safari package reviews."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <Container>
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold">My Reviews</h1>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent mx-auto"></div>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-600 mb-4">Error loading reviews: {error}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
                  >
                    Try Again
                  </button>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">You haven't written any reviews yet.</p>
                  <Link to="/packages">
                    <button className="text-amber-600 hover:text-amber-700 font-medium">
                      Browse Packages
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="flex gap-6 p-4 border rounded-lg">
                      <div className="w-32 h-24 flex-shrink-0">
                        <img
                          src={review.package_details?.image_url || '/placeholder-image.jpg'}
                          alt={review.package_details?.name || 'Safari Package'}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-image.jpg';
                          }}
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold">{review.package_details?.name || 'Safari Package'}</h3>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleDeleteReview(review.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {new Date(review.submitted_at).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <h4 className="font-medium mb-1">{review.title}</h4>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Reviews;