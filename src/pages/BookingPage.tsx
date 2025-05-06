import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { initializePayment } from '../lib/paystack';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { Calendar, Users, PenLine, ArrowRight, Baby, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { addDays, format, isBefore, addMonths, parseISO } from 'date-fns';
import { SafariPackage, BookingFormData } from '../types/index';

// Import the usePackages hook we'll be using
import { usePackages } from '../hooks/usePackages';

const BookingPage: React.FC = () => {
  const { packageId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use the packages hook with filter by slug or ID
  const { packages, loading: isLoading, error } = usePackages({
    specificId: packageId
  });
  
  // Get the first package from the result (should be only one)
  const packageDetails = packages && packages.length > 0 ? packages[0] : null;
  
  // Define contactInfo with correct typing
  const initialContactInfo: Required<BookingFormData>['contactInfo'] = {
    name: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || '' : '',
    email: user?.email || '',
    phone: '',
    country: ''
  };

  const [formData, setFormData] = useState<BookingFormData>({
    packageId: packageId || '',
    startDate: '',
    adults: 2,
    children: 0,
    specialRequests: '',
    contactInfo: initialContactInfo
  });

  // Check availability
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  
  const checkAvailability = useCallback(async () => {
    if (!formData.startDate || !packageDetails) {
      setAvailabilityChecked(false);
      return;
    }
    
    try {
      // Calculate end date based on package duration
      const duration = parseInt(packageDetails.duration.split(' ')[0]);
      const startDate = parseISO(formData.startDate);
      const endDate = addDays(startDate, duration - 1);
      
      // Check if there are other bookings for the same period
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('package_id', packageDetails.id)
        .gte('start_date', format(startDate, 'yyyy-MM-dd'))
        .lte('end_date', format(endDate, 'yyyy-MM-dd'))
        .not('status', 'eq', 'cancelled');
        
      if (error) throw error;
      
      // Check if there's availability (assuming each package has limited spots)
      const maxGroupSize = parseInt(packageDetails.group_size.split(' ')[1]);
      const bookedSpots = data.reduce((acc, booking) => acc + (booking.adults || 0) + (booking.children || 0), 0);
      const requestedSpots = (formData.adults || 0) + (formData.children || 0);
      
      setIsAvailable(bookedSpots + requestedSpots <= maxGroupSize);
      setAvailabilityChecked(true);
    } catch (err) {
      console.error('Error checking availability:', err);
      toast.error('Failed to check availability');
      setAvailabilityChecked(false);
    }
  }, [formData.startDate, formData.adults, formData.children, packageDetails]);

  useEffect(() => {
    if (formData.startDate && packageDetails) {
      checkAvailability();
    } else {
      setAvailabilityChecked(false);
    }
  }, [formData.startDate, formData.adults, formData.children, packageDetails, checkAvailability]);

  // Handle form input changes with proper typing
  const handleContactInfoChange = (field: keyof Required<BookingFormData>['contactInfo'], value: string) => {
    setFormData({
      ...formData,
      contactInfo: {
        ...formData.contactInfo,
        [field]: value
      }
    });
  };

  // Redirect if package not found or user not logged in
  if (error && !isLoading) {
    toast.error(error);
    return <Navigate to="/packages" replace />;
  }

  if (!isLoading && !user) {
    return <Navigate to={`/auth/signin?redirect=/book/${packageId}`} replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin text-amber-500" size={32} />
      </div>
    );
  }

  if (!packageDetails) {
    return <Navigate to="/packages" replace />;
  }

  // Calculate total price
  const adultPrice = packageDetails.price_range;
  const childPrice = Math.round(adultPrice * 0.7); // Assuming children get 30% off
  const totalPrice = (formData.adults || 0) * adultPrice + (formData.children || 0) * childPrice;

  // Calculate min and max date
  const today = new Date();
  const minDate = format(addDays(today, 14), 'yyyy-MM-dd'); // Minimum 2 weeks in advance
  const maxDate = format(addMonths(today, 12), 'yyyy-MM-dd'); // Maximum 1 year in advance

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to make a booking');
      return;
    }
    
    if (!formData.startDate) {
      toast.error('Please select a start date');
      return;
    }
    
    if ((formData.adults || 0) < 1) {
      toast.error('At least 1 adult traveler is required');
      return;
    }

    // Validate contact info
    const contactInfo = formData.contactInfo;
    if (!contactInfo.name || !contactInfo.email || !contactInfo.phone) {
      toast.error('Please fill all contact information fields');
      return;
    }

    // Check if start date is valid
    const startDate = parseISO(formData.startDate);
    if (isBefore(startDate, new Date(minDate))) {
      toast.error(`Booking must be at least 2 weeks in advance`);
      return;
    }

    // Final availability check
    await checkAvailability();
    if (!isAvailable) {
      toast.error('Sorry, this package is no longer available for the selected dates');
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate end date based on package duration
      const duration = parseInt(packageDetails.duration.split(' ')[0]);
      const endDate = addDays(startDate, duration - 1);

      // Create booking record
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          user_id: user?.id,
          package_id: packageDetails.id,
          adults: formData.adults,
          children: formData.children || 0,
          start_date: format(startDate, 'yyyy-MM-dd'),
          end_date: format(endDate, 'yyyy-MM-dd'),
          special_requests: formData.specialRequests,
          status: 'pending',
          total_amount: totalPrice,
          contact_name: formData.contactInfo.name,
          contact_email: formData.contactInfo.email,
          contact_phone: formData.contactInfo.phone,
          contact_country: formData.contactInfo.country,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Initialize Paystack payment
      initializePayment({
        email: user?.email || '',
        amount: totalPrice,
        bookingId: booking.id,
        onSuccess: (reference) => {
          // Update booking status to confirmed
          updateBookingStatus(booking.id, 'confirmed', reference);
          navigate(`/booking-success?ref=${reference}`);
        },
        onCancel: async () => {
          // Update booking status to cancelled
          updateBookingStatus(booking.id, 'cancelled');
          toast.error('Payment was cancelled');
          setIsSubmitting(false);
        }
      });
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to create booking. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  const updateBookingStatus = async (bookingId: string, status: string, reference?: string) => {
    try {
      const updateData: any = { status };
      if (reference) {
        updateData.payment_reference = reference;
      }
      
      await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId);
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Book {packageDetails.title} | MagicalBoonies</title>
        <meta 
          name="description" 
          content={`Book your ${packageDetails.title} safari adventure with MagicalBoonies. Experience the best of African wildlife.`}
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <Container size="md">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-serif font-bold mb-6">Book Your Safari</h2>

            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={packageDetails.image_url}
                  alt={packageDetails.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold">{packageDetails.title}</h3>
                  <p className="text-gray-600">
                    {packageDetails.duration} | ${packageDetails.price_range} per person
                  </p>
                  <p className="text-sm text-amber-600 font-medium">{packageDetails.destination_category} - {packageDetails.package_category}</p>
                </div>
              </div>

              <div className="space-y-2">
                {packageDetails.itinerary_highlights.slice(0, 3).map((highlight, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Adults
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      min="1"
                      value={formData.adults || 2}
                      onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) })}
                      className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Children
                  </label>
                  <div className="relative">
                    <Baby className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      min="0"
                      value={formData.children || 0}
                      onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) })}
                      className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="date"
                    min={minDate}
                    max={maxDate}
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                {formData.startDate && (
                  <div className="mt-2">
                    {availabilityChecked && (
                      <p className={`text-sm ${isAvailable ? 'text-green-600' : 'text-red-500'}`}>
                        {isAvailable ? '✓ Available for your dates' : '✗ Not available for selected dates'}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium mb-3">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.contactInfo.name}
                      onChange={(e) => handleContactInfoChange('name', e.target.value)}
                      className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.contactInfo.email}
                      onChange={(e) => handleContactInfoChange('email', e.target.value)}
                      className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.contactInfo.phone}
                      onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                      className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formData.contactInfo.country}
                      onChange={(e) => handleContactInfoChange('country', e.target.value)}
                      className="px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requests or Notes
                </label>
                <div className="relative">
                  <PenLine className="absolute left-3 top-3 text-gray-400" size={20} />
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    rows={4}
                    placeholder="Any dietary requirements, accessibility needs, or special requests..."
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Adult price (per person)</span>
                    <span>${adultPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Adults</span>
                    <span>× {formData.adults || 0}</span>
                  </div>
                  {(formData.children || 0) > 0 && (
                    <>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Child price (per child)</span>
                        <span>${childPrice}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Children</span>
                        <span>× {formData.children || 0}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total Amount</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isSubmitting}
                  disabled={isSubmitting || !isAvailable || !availabilityChecked}
                  rightIcon={<ArrowRight size={18} />}
                >
                  {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                </Button>
                
                {!isAvailable && availabilityChecked && (
                  <p className="text-red-500 text-sm mt-2">
                    This package is not available for the selected dates. Please choose different dates.
                  </p>
                )}
              </div>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default BookingPage;