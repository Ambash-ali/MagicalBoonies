import React, { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import Container from '../components/ui/Container';
import { Calendar, Users, MapPin, DollarSign, Clock, AlertCircle, Check, X, Baby, ExternalLink } from 'lucide-react';
import Button from '../components/ui/Button';
import { toast } from 'react-hot-toast';
import { format, parseISO, differenceInDays } from 'date-fns';
import { Booking, SafariPackage } from '../types/index';

interface ExtendedBooking extends Booking {
  package_details?: {
    title: string;
    image_url: string;
    duration: string;
    destination_category: string;
  };
  adults: number;
  children: number;
  start_date: string;
  end_date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'failed';
  created_at: string;
  special_requests?: string;
  payment_reference?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_country?: string;
  total_amount: number;
  payment_status?: string;
}

const BookingsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<ExtendedBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('all');
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // First get all bookings for this user
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (bookingsError) {
        throw bookingsError;
      }
      
      if (!bookingsData?.length) {
        setBookings([]);
        setLoading(false);
        return;
      }
      
      // Extract unique package IDs for efficient querying
      const packageIds = [...new Set(bookingsData.map(booking => booking.package_id))];
      
      if (packageIds.length === 0) {
        setBookings([]);
        setLoading(false);
        return;
      }
      
      // Next get package details for each booking - UPDATED TO USE safari_packages TABLE
      const { data: packagesData, error: packagesError } = await supabase
        .from('safari_packages')
        .select('id, title, image_url, duration, destination_category')
        .in('id', packageIds);
        
      if (packagesError) {
        throw packagesError;
      }
      
      // Map package details to bookings
      const enhancedBookings = bookingsData.map(booking => {
        const packageDetails = packagesData?.find(pkg => pkg.id === booking.package_id);
        return {
          ...booking,
          package_details: packageDetails
        } as ExtendedBooking;
      });
      
      setBookings(enhancedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
      setError('Failed to load bookings. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user, fetchBookings]);

  if (!user) {
    return <Navigate to="/auth/signin?redirect=/bookings" replace />;
  }

  const handleCancelBooking = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state without refetching all bookings
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' } 
          : booking
      ));

      toast.success('Booking cancelled successfully');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel booking');
    }
  };

  const handleRetryPayment = (booking: ExtendedBooking) => {
    try {
      // Direct user to a payment page or re-initiate the payment process
      // For demo purposes, navigate to a fictional payment retry page
      navigate(`/payment/retry/${booking.id}`);
    } catch (error) {
      console.error('Error retrying payment:', error);
      toast.error('Failed to process payment retry');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <Check size={16} className="mr-1" />;
      case 'pending': return <Clock size={16} className="mr-1" />;
      case 'cancelled': return <X size={16} className="mr-1" />;
      case 'failed': return <AlertCircle size={16} className="mr-1" />;
      default: return null;
    }
  };

  const isUpcoming = (booking: ExtendedBooking) => {
    return new Date(booking.start_date) > new Date() && booking.status !== 'cancelled';
  };

  const isPast = (booking: ExtendedBooking) => {
    return new Date(booking.end_date) < new Date() && booking.status !== 'cancelled';
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return isUpcoming(booking);
    if (activeTab === 'past') return isPast(booking);
    if (activeTab === 'cancelled') return booking.status === 'cancelled';
    return true;
  });

  const getDuration = (startDate: string, endDate: string) => {
    try {
      const days = differenceInDays(new Date(endDate), new Date(startDate)) + 1;
      return `${days} days`;
    } catch (error) {
      console.error('Error calculating duration:', error);
      return 'N/A';
    }
  };

  const handleRefresh = () => {
    fetchBookings();
  };

  return (
    <>
      <Helmet>
        <title>My Bookings | MagicalBoonies</title>
        <meta 
          name="description" 
          content="View and manage your safari bookings with MagicalBoonies."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h1 className="text-3xl font-serif font-bold">My Bookings</h1>
            <div className="mt-4 md:mt-0 space-x-4">
              <Button 
                variant="secondary" 
                onClick={handleRefresh}
              >
                Refresh
              </Button>
              <Button 
                variant="primary" 
                onClick={() => navigate('/packages')}
              >
                Browse More Safaris
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('all')}
                className={`pb-4 font-medium text-sm ${
                  activeTab === 'all'
                    ? 'border-b-2 border-amber-500 text-amber-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                All Bookings
              </button>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`pb-4 font-medium text-sm ${
                  activeTab === 'upcoming'
                    ? 'border-b-2 border-amber-500 text-amber-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`pb-4 font-medium text-sm ${
                  activeTab === 'past'
                    ? 'border-b-2 border-amber-500 text-amber-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Past
              </button>
              <button
                onClick={() => setActiveTab('cancelled')}
                className={`pb-4 font-medium text-sm ${
                  activeTab === 'cancelled'
                    ? 'border-b-2 border-amber-500 text-amber-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Cancelled
              </button>
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center">
                <AlertCircle className="text-red-500 mr-3" size={24} />
                <p className="text-red-700">{error}</p>
              </div>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={handleRefresh}
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && bookings.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-gray-400" size={32} />
              </div>
              <h2 className="text-xl font-medium mb-2">No bookings found</h2>
              <p className="text-gray-500 mb-6">
                You haven't made any safari bookings yet. Start exploring our packages and create unforgettable memories.
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/packages')}
              >
                Explore Safari Packages
              </Button>
            </div>
          )}

          {/* Bookings list */}
          {!loading && !error && filteredBookings.length > 0 && (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Left column - Image */}
                    <div className="lg:w-1/4 h-48 lg:h-auto">
                      <div className="w-full h-full relative">
                        {booking.package_details?.image_url ? (
                          <img 
                            src={booking.package_details.image_url} 
                            alt={booking.package_details.title || 'Safari package'} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <MapPin className="text-gray-400" size={32} />
                          </div>
                        )}
                        {/* Status badge */}
                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold flex items-center ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Right column - Details */}
                    <div className="lg:w-3/4 p-6">
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <div>
                          <h2 className="text-xl font-serif font-bold mb-2">
                            {booking.package_details?.title || 'Safari Package'}
                          </h2>
                          <div className="flex flex-wrap gap-y-2 gap-x-4 mb-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="mr-1" size={16} />
                              {format(new Date(booking.start_date), 'MMM d, yyyy')} - {format(new Date(booking.end_date), 'MMM d, yyyy')}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1" size={16} />
                              {getDuration(booking.start_date, booking.end_date)}
                            </div>
                            <div className="flex items-center">
                              <Users className="mr-1" size={16} />
                              {booking.adults} {booking.adults === 1 ? 'Adult' : 'Adults'}
                              {booking.children > 0 && (
                                <>
                                  , <Baby className="mx-1" size={16} />
                                  {booking.children} {booking.children === 1 ? 'Child' : 'Children'}
                                </>
                              )}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-1" size={16} />
                              {booking.package_details?.destination_category || 'N/A'}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 text-right">
                          <div className="text-lg font-bold text-amber-600">
                            <DollarSign className="inline-block -mt-1" size={18} />
                            {booking.total_amount.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            Booked on {format(new Date(booking.created_at), 'MMM d, yyyy')}
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/bookings/${booking.id}`)}
                        >
                          View Details
                        </Button>
                        
                        {/* Show cancel button only for upcoming bookings that aren't cancelled */}
                        {isUpcoming(booking) && booking.status !== 'cancelled' && (
                          <Button
                            variant="danger"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel Booking
                          </Button>
                        )}
                        
                        {/* Show retry payment button for failed payments */}
                        {booking.status === 'failed' || booking.payment_status === 'failed' && (
                          <Button
                            variant="primary"
                            onClick={() => handleRetryPayment(booking)}
                          >
                            Retry Payment
                          </Button>
                        )}
                        
                        {/* Show download itinerary button for confirmed bookings */}
                        {(booking.status === 'confirmed' || booking.status === 'completed') && (
                          <Button
                            variant="secondary"
                            onClick={() => window.open(`/api/itinerary/${booking.id}`, '_blank')}
                          >
                            <ExternalLink size={16} className="mr-1" />
                            Download Itinerary
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Show message when filtered results are empty */}
          {!loading && !error && bookings.length > 0 && filteredBookings.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="text-gray-400" size={24} />
              </div>
              <h2 className="text-lg font-medium mb-2">No {activeTab} bookings found</h2>
              <p className="text-gray-500 mb-4">
                {activeTab === 'upcoming' && "You don't have any upcoming safari bookings."}
                {activeTab === 'past' && "You don't have any past safari bookings."}
                {activeTab === 'cancelled' && "You don't have any cancelled safari bookings."}
              </p>
              <Button
                variant="secondary"
                onClick={() => setActiveTab('all')}
              >
                View All Bookings
              </Button>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default BookingsPage;