// src/components/packages/PackageCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { SafariPackage } from '../../types/sfp';
import Button from '../ui/Button'; // Assuming Button component exists as in Hero example

interface PackageCardProps {
  pkg: SafariPackage;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  // Get first sentence or ~120 chars of overview for description
  const shortDescription = pkg.overview.split('.')[0] + '.' || pkg.overview.substring(0, 120) + '...';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl flex flex-col h-full">
      <div className="relative h-60">
        <img
          src={pkg.image_url}
          alt={pkg.title}
          className="w-full h-full object-cover"
          loading="lazy" // Add lazy loading for performance
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-amber-700 font-bold shadow">
          ${pkg.price_range.toLocaleString()}+
        </div>
         <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <h3 className="text-lg font-semibold text-white leading-tight mb-1 line-clamp-2">{pkg.title}</h3>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
          <div className="flex items-center text-amber-500">
            <Star size={16} fill="currentColor" className="mr-1" />
            <span className="font-medium">{pkg.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{pkg.duration}</span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 text-sm flex-grow">{shortDescription}</p>

        {/* Display first 2-3 highlights */}
        <div className="space-y-2 mb-6 text-sm">
          {pkg.itinerary_highlights.slice(0, 3).map((highlight, index) => (
            <div key={index} className="flex items-start text-gray-700">
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 mt-1.5 flex-shrink-0" />
              <span className="line-clamp-1">{highlight}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto"> {/* Pushes button to bottom */}
          <Link to={`/packages/${pkg.slug}`}>
            <Button variant="primary" fullWidth>
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;