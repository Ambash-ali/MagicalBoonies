import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import Button from '../ui/Button';
import { Calendar, Users, PenLine } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface BookingFormProps {
  packageDetails: {
    name: string;
    price: number;
    duration: number;
    image: string;
    highlights: string[];
  };
}

const BookingForm: React.FC<BookingFormProps> = ({ packageDetails }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { packageId } = useParams();
  
  const [formData, setFormData] = useState({
    travelerCount: 2,
    startDate: '',
    note: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to book this safari');
      navigate('/auth/signin');
      return;
    }

    try {
      const { error } = await supabase.from('bookings').insert({
        user_id: user.id,
        package_id: packageId,
        traveler_count: formData.travelerCount,
        start_date: formData.startDate,
        note: formData.note,
      });

      if (error) throw error;

      toast.success('Booking submitted successfully!');
      navigate('/bookings');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to submit booking. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-serif font-bold mb-6">Book Your Safari</h2>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={packageDetails.image}
            alt={packageDetails.name}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-xl font-bold">{packageDetails.name}</h3>
            <p className="text-gray-600">
              {packageDetails.duration} days | ${packageDetails.price} per person
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {packageDetails.highlights.slice(0, 3).map((highlight, index) => (
            <div key={index} className="flex items-center text-gray-600">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Travelers
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="number"
              min="1"
              value={formData.travelerCount}
              onChange={(e) => setFormData({ ...formData, travelerCount: parseInt(e.target.value) })}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
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
              min={new Date().toISOString().split('T')[0]}
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Requests or Notes
          </label>
          <div className="relative">
            <PenLine className="absolute left-3 top-3 text-gray-400" size={20} />
            <textarea
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              rows={4}
              placeholder="Any special requirements or requests..."
            />
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            fullWidth
          >
            Confirm Booking
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;