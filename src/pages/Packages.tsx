// src/pages/PackagesPage.tsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Container from '../components/ui/Container';
import PackageCard from '../components/packages/packageCard';
import SearchBox from '../components/SearchBox';
import { usePackages } from '../hooks/usePackages';
import { MapPin } from 'lucide-react';

const PackagesPage: React.FC = () => {
  const location = useLocation();
  
  // Initialize state with URL parameters or location state
  const [filters, setFilters] = useState({
    destinationCategory: '',
    packageCategory: '',
    date: '',
    guests: 0
  });

  // Parse search parameters when component loads or URL changes
  useEffect(() => {
    // Get parameters from URL query string
    const params = new URLSearchParams(location.search);
    const destinationCategory = params.get('destinationCategory') || '';
    const packageCategory = params.get('packageCategory') || '';
    const date = params.get('date') || '';
    const guests = parseInt(params.get('guests') || '0', 10);
    
    // Check for parameters in location state (from navigation)
    const locationState = location.state as any;
    
    setFilters({
      destinationCategory: destinationCategory || (locationState?.destination || ''),
      packageCategory: packageCategory || (locationState?.packageCategory || ''),
      date: date || (locationState?.date || ''),
      guests: guests || (locationState?.guests || 0)
    });
  }, [location]);

  // Using our custom hook with destination filter
  const { packages, loading, error } = usePackages({
    destinationCategory: filters.destinationCategory,
    packageCategory: filters.packageCategory
  });

  return (
    <>
      <Helmet>
        <title>Explore Our Safari Packages | MagicalBoonies</title>
        <meta
          name="description"
          content="Discover expertly curated luxury safari packages across Kenya's most iconic destinations: Masai Mara, Amboseli, Samburu, Lake Nakuru, and more. Book your dream African adventure."
        />
      </Helmet>

      {/* Simple Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-yellow-900 h-[40vh] lg:h-[50vh] text-white flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg)' }}
        />
        <div className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center space-x-2 text-amber-300 mb-4">
            <MapPin size={20} />
            <span className="font-medium uppercase tracking-wider">Kenya Safari Adventures</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
            Curated Safari Experiences
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Explore our collection of handcrafted safari packages, designed for unforgettable wildlife encounters and authentic cultural immersion.
          </p>
        </div>
      </div>

      {/* Search Box (smaller version for packages page) */}
      <div className="bg-white py-8 shadow-md">
        <Container>
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Find Your Perfect Safari</h2>
            <p className="text-gray-600">Refine your search to discover the perfect safari adventure</p>
          </div>
          <SearchBox 
            variant="standard" 
            className="mt-4"
            initialDestination={filters.destinationCategory}
            initialDate={filters.date}
            initialGuests={filters.guests || 0}
            onFilterChange={(newFilters) => {
              setFilters({
                ...filters,
                destinationCategory: newFilters.destination,
                date: newFilters.date,
                guests: newFilters.guests
              });
              
              // Update URL for bookmark-ability without page reload
              const newParams = new URLSearchParams();
              if (newFilters.destination) newParams.set('destinationCategory', newFilters.destination);
              if (newFilters.date) newParams.set('date', newFilters.date);
              if (newFilters.guests) newParams.set('guests', newFilters.guests.toString());
              if (filters.packageCategory) newParams.set('packageCategory', filters.packageCategory);
              
              // Update URL without reloading page
              window.history.replaceState(
                {}, 
                '', 
                `${window.location.pathname}?${newParams.toString()}`
              );
            }}
          />
        </Container>
      </div>

      {/* Packages Grid Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          {/* Active Filters Display */}
          {(filters.destinationCategory || filters.packageCategory || filters.date || filters.guests > 0) && (
            <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-700 font-medium">Active Filters:</span>
                
                {filters.destinationCategory && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm flex items-center">
                    Destination: {filters.destinationCategory}
                    <button 
                      className="ml-2 text-amber-600 hover:text-amber-800"
                      onClick={() => setFilters({...filters, destinationCategory: ''})}
                    >
                      &times;
                    </button>
                  </span>
                )}
                
                {filters.packageCategory && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm flex items-center">
                    Type: {filters.packageCategory}
                    <button 
                      className="ml-2 text-amber-600 hover:text-amber-800"
                      onClick={() => setFilters({...filters, packageCategory: ''})}
                    >
                      &times;
                    </button>
                  </span>
                )}
                
                {filters.date && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm flex items-center">
                    Date: {new Date(filters.date).toLocaleDateString()}
                    <button 
                      className="ml-2 text-amber-600 hover:text-amber-800"
                      onClick={() => setFilters({...filters, date: ''})}
                    >
                      &times;
                    </button>
                  </span>
                )}
                
                {filters.guests > 0 && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm flex items-center">
                    Guests: {filters.guests}
                    <button 
                      className="ml-2 text-amber-600 hover:text-amber-800"
                      onClick={() => setFilters({...filters, guests: 0})}
                    >
                      &times;
                    </button>
                  </span>
                )}
                
                <button
                  className="ml-auto px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  onClick={() => setFilters({destinationCategory: '', packageCategory: '', date: '', guests: 0})}
                >
                  Clear All
                </button>
              </div>
            </div>
          )}

          {/* Basic Loading and Error States */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading safari packages...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 text-center">
              <p className="text-red-600">Error: {error}</p>
              <button 
                className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Filter UI - Basic version - moved to additional filters */}
          {!loading && !error && packages.length > 0 && (
            <div className="mb-12">
              <div className="flex flex-wrap gap-4 mb-8">
                {/* Package Type Filter */}
                <div>
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-md bg-white"
                    value={filters.packageCategory}
                    onChange={(e) => setFilters({...filters, packageCategory: e.target.value})}
                  >
                    <option value="">All Package Types</option>
                    <option value="Premium">Premium</option>
                    <option value="Classic">Classic</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Cultural">Cultural</option>
                  </select>
                </div>
                
                {/* Additional filters can be added here */}
              </div>
            </div>
          )}

          {/* No results message */}
          {!loading && !error && packages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No safari packages match your selected filters.</p>
              <button
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-md"
                onClick={() => setFilters({destinationCategory: '', packageCategory: '', date: '', guests: 0})}
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Packages Grid */}
          {!loading && !error && packages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default PackagesPage;