import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Button from '../ui/Button';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';
import { Review } from '../../hooks/useReviews';

interface ReviewFormProps {
  packageId: string;
  onSuccess?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ packageId, onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    title: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [existingReview, setExistingReview] = useState<Review | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '',
        email: user.email || ''
      }));

      const fetchExistingReview = async () => {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .eq('package_id', packageId)
          .eq('user_id', user.id)
          .single();

        if (data) {
          setExistingReview(data);
          setFormData({
            name: data.name,
            email: data.email,
            rating: data.rating,
            title: data.title,
            comment: data.comment
          });
        }
      };

      fetchExistingReview();
    }
  }, [user, packageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to submit a review');
      return;
    }

    if (!recaptchaToken) {
      toast.error('Please complete the reCAPTCHA verification');
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        package_id: packageId,
        user_id: user.id,
        ...formData,
        is_approved: false, // New reviews need approval
        is_verified: false  // Default value
      };

      const { error } = existingReview
        ? await supabase
            .from('reviews')
            .update(reviewData)
            .eq('id', existingReview.id)
        : await supabase
            .from('reviews')
            .insert([reviewData]);

      if (error) throw error;

      toast.success(existingReview 
        ? 'Review updated successfully!' 
        : 'Thank you for your review! It will be visible after approval.'
      );
      
      onSuccess?.();
      
      if (!existingReview) {
        setFormData({
          name: '',
          email: '',
          rating: 5,
          title: '',
          comment: ''
        });
      }
      
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            required
            disabled={!!user}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            required
            disabled={!!user}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={24}
                className={`cursor-pointer ${
                  i < formData.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                }`}
                onClick={() => setFormData({ ...formData, rating: i + 1 })}
              />
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Review Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
            required
          />
        </div>
        
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Your Review
          </label>
          <textarea
            id="comment"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 h-32"
            required
          />
        </div>
      </div>
      
      <div>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          onChange={(token) => setRecaptchaToken(token)}
          onExpired={() => {
            setRecaptchaToken(null);
            toast.error('reCAPTCHA verification expired. Please complete it again.');
          }}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={isSubmitting}
        fullWidth
      >
        {existingReview ? 'Update Review' : 'Submit Review'}
      </Button>
    </form>
  );
};
export default ReviewForm;
