import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams, Link, Navigate } from 'react-router-dom';
import { verifyPayment } from '../lib/paystack';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { CheckCircle, ArrowRight } from 'lucide-react';

const BookingSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  
  const reference = searchParams.get('ref');

  useEffect(() => {
    const verify = async () => {
      if (!reference) return;
      
      const payment = await verifyPayment(reference);
      setIsVerified(payment?.status === 'success');
      setIsVerifying(false);
    };

    verify();
  }, [reference]);

  if (!reference) {
    return <Navigate to="/packages" replace />;
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Container size="sm">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Verification Failed</h1>
            <p className="text-gray-600 mb-6">
              We couldn't verify your payment. If you believe this is an error, please contact our support team.
            </p>
            <Link to="/contact">
              <Button variant="primary">Contact Support</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Booking Confirmed | MagicalBoonies</title>
        <meta 
          name="description" 
          content="Your safari booking has been confirmed. Get ready for an unforgettable adventure!"
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <Container size="sm">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-green-600 mb-6">
              <CheckCircle size={64} className="mx-auto" />
            </div>
            
            <h1 className="text-3xl font-serif font-bold mb-4">
              Booking Confirmed!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Thank you for booking your safari adventure with us. Your payment has been processed successfully.
            </p>

            <div className="space-y-4">
              <Link to="/bookings">
                <Button 
                  variant="primary" 
                  fullWidth
                  rightIcon={<ArrowRight size={18} />}
                >
                  View My Bookings
                </Button>
              </Link>
              
              <Link to="/">
                <Button variant="outline" fullWidth>
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default BookingSuccessPage;