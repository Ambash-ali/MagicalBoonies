import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Search } from 'lucide-react';
import { DESTINATIONS, GUEST_OPTIONS } from '../constants/safari';

interface SearchBoxProps {
  className?: string;
  variant?: 'hero' | 'standard';
  initialDestination?: string;
  initialDate?: string;
  initialGuests?: number;
  onFilterChange?: (filters: { destination: string; date: string; guests: number }) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ 
  className = "",
  variant = "standard",
  initialDestination = "",
  initialDate = "",
  initialGuests = 0,
  onFilterChange
}) => {
  const [selectedDestination, setSelectedDestination] = useState(initialDestination);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [guests, setGuests] = useState(initialGuests);
  const navigate = useNavigate();

  const handleSearch = () => {
    // If we're on the packages page and a callback is provided, use that
    if (onFilterChange) {
      onFilterChange({
        destination: selectedDestination,
        date: selectedDate,
        guests
      });
      return;
    }
    
    // Otherwise navigate to the packages page with the filters
    navigate({
      pathname: '/packages',
      search: `?${new URLSearchParams({
        ...(selectedDestination && { destinationCategory: selectedDestination }),
        ...(selectedDate && { date: selectedDate }),
        ...(guests && { guests: guests.toString() })
      }).toString()}`
    }, {
      state: { 
        destination: selectedDestination,
        date: selectedDate,
        guests
      }
    });
  };

  // Determine styles based on variant
  const containerStyles = variant === 'hero' 
    ? "bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-lg" 
    : "bg-white shadow-md p-4 rounded-lg border border-gray-100";

  const labelStyles = variant === 'hero'
    ? "block text-white text-sm mb-1"
    : "block text-gray-700 text-sm mb-1";

  const inputStyles = variant === 'hero'
    ? "w-full p-3 bg-white/80 backdrop-blur rounded-md border-0 focus:ring-2 focus:ring-amber-500"
    : "w-full p-3 bg-white rounded-md border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500";

  const buttonStyles = "bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-r-md flex items-center justify-center transition-colors duration-300";

  return (
    <div className={`${containerStyles} ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelStyles}>Destination</label>
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className={inputStyles}
          >
            <option value="">Choose destination</option>
            {DESTINATIONS.map((dest) => (
              <option key={dest} value={dest}>{dest}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelStyles}>Travel Date</label>
          <div className="relative">
            <Calendar size={16} className="absolute top-3.5 left-3 text-gray-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={`${inputStyles} pl-10`}
            />
          </div>
        </div>
        <div>
          <label className={labelStyles}>Guests</label>
          <div className="flex">
            <select
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className={`${inputStyles} rounded-r-none`}
            >
              {GUEST_OPTIONS.map((num) => (
                <option key={num} value={num}>{num} guest{num !== 1 ? 's' : ''}</option>
              ))}
            </select>
            <button
              onClick={handleSearch}
              className={buttonStyles}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;