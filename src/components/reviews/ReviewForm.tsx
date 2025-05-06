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
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

  // Show error if recaptcha site key is missing
  useEffect(() => {
    if (!recaptchaSiteKey) {
      console.error('Missing reCAPTCHA site key. Set VITE_RECAPTCHA_SITE_KEY in your environment.');
    }
  }, [recaptchaSiteKey]);

  // Verify package exists in safari_packages
  useEffect(() => {
    const verifyPackage = async () => {
      try {
        const { data, error } = await supabase
          .from('safari_packages')
          .select('id')
          .eq('id', packageId)
          .single();
          
        if (error) {
          console.error('Package verification error:', error);
          toast.error('Unable to verify safari package');
        }
      } catch (err) {
        console.error('Error verifying safari package:', err);
      }
    };
    
    verifyPackage();
  }, [packageId]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '',
        email: user.email || ''
      }));

      const fetchExistingReview = async () => {
        try {
          const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('package_id', packageId)
            .eq('user_id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
            throw error;
          }

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
        } catch (error) {
          console.error('Error fetching existing review:', error);
          toast.error('Failed to check for your existing review');
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
      // Verify package exists in safari_packages before proceeding
      const { data: packageData, error: packageError } = await supabase
        .from('safari_packages')
        .select('id')
        .eq('id', packageId)
        .single();
        
      if (packageError) {
        throw new Error('Invalid safari package or package not found');
      }

      const now = new Date().toISOString();
      const reviewData = {
        package_id: packageId,
        user_id: user.id,
        ...formData,
        is_approved: false, // New reviews need approval
        is_verified: false,  // Default value
        submitted_at: existingReview ? existingReview.submitted_at : now, // Keep original submission date for updates
        updated_at: now // Add update timestamp
      };

      let result;
      if (existingReview) {
        result = await supabase
          .from('reviews')
          .update(reviewData)
          .eq('id', existingReview.id);
      } else {
        result = await supabase
          .from('reviews')
          .insert([reviewData]);
      }

      if (result.error) throw result.error;

      // Check if operation was successful
      if (result.status >= 200 && result.status < 300) {
        toast.success(existingReview 
          ? 'Review updated successfully!' 
          : 'Thank you for your review! It will be visible after approval.'
        );
        
        onSuccess?.();
        
        if (!existingReview) {
          setFormData({
            name: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : '',
            email: user.email || '',
            rating: 5,
            title: '',
            comment: ''
          });
        }
      } else {
        throw new Error(`Received status code ${result.status}`);
      }
      
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If not logged in, show login prompt
  if (!user) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Sign in to leave a review</h3>
        <p className="text-gray-600 mb-4">Your insights help other travelers make the right choice</p>
        <Button
          variant="primary"
          onClick={() => window.location.href = '/auth/SignIn?redirect=' + encodeURIComponent(window.location.pathname)}
        >
          Sign In
        </Button>
      </div>
    );
  }

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
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 bg-gray-100"
            required
            disabled={true} // Always disabled as it's set from user profile
            readOnly
            aria-readonly="true"
          />
          <p className="mt-1 text-xs text-gray-500">This is your profile name</p>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 bg-gray-100"
            required
            disabled={true} // Always disabled as it's set from user profile
            readOnly
            aria-readonly="true"
          />
          <p className="mt-1 text-xs text-gray-500">Your email will not be displayed publicly</p>
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
                aria-label={`Rate ${i + 1} out of 5 stars`}
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
            maxLength={100}
            placeholder="Summarize your experience"
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
            maxLength={2000}
            placeholder="Share your experience to help other travelers"
          />
        </div>
      </div>
      
      {recaptchaSiteKey && (
        <div>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={recaptchaSiteKey}
            onChange={(token) => setRecaptchaToken(token)}
            onExpired={() => {
              setRecaptchaToken(null);
              toast.error('reCAPTCHA verification expired. Please complete it again.');
            }}
          />
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        isLoading={isSubmitting}
        fullWidth
        disabled={!recaptchaSiteKey}
      >
        {existingReview ? 'Update Review' : 'Submit Review'}
      </Button>
    </form>
  );
};

export default ReviewForm;
