// FeaturedPackages.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container'; // Assuming these paths are correct
import { Clock, Star, MapPin, ChevronRight, Loader2, AlertCircle } from 'lucide-react'; // Added Loader2 and AlertCircle
import Button from '../ui/Button';
import { useFeaturedPackages } from '../../hooks/FeaturedPackages'; // Adjust path if needed
// Removed the static FEATURED_PACKAGES array

const FeaturedPackages: React.FC = () => {
  // Use the custom hook to fetch data
  const { packages, loading, error } = useFeaturedPackages();

  // --- Loading State ---
  if (loading) {
    return (
      <section className="py-20">
        <Container className="flex justify-center items-center min-h-[300px]">
          <Loader2 className="h-12 w-12 animate-spin text-amber-600" />
          <span className="ml-4 text-xl text-gray-600">Loading Packages...</span>
        </Container>
      </section>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <section className="py-20">
        <Container className="text-center">
           <div className="flex justify-center items-center text-red-600 mb-4">
             <AlertCircle className="h-8 w-8 mr-2" />
             <h3 className="text-xl font-semibold">Failed to load packages</h3>
           </div>
           <p className="text-gray-600">Error: {error}</p>
           {/* Optionally add a retry button */}
        </Container>
      </section>
    );
  }

  // --- No Packages Found State ---
  if (!packages || packages.length === 0) {
     return (
      <section className="py-20">
        <Container className="text-center">
           <h3 className="text-xl font-semibold mb-4">No Featured Packages Found</h3>
           <p className="text-gray-600">Check back later for amazing safari deals!</p>
        </Container>
      </section>
    );
  }

  // --- Success State (Render Packages) ---
  return (
    <section className="py-20 bg-gradient-to-b from-amber-50/50 to-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Our Featured Safari Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular East African safari experiences, crafted to create unforgettable memories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Map over the fetched packages */}
          {packages.map((pkg) => (
            <div
              key={pkg.id} // Use the ID from the database
              className="group bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={pkg.image_url || 'https://via.placeholder.com/400x300?text=Safari'} // Use imageUrl, provide fallback
                  alt={pkg.title} // Use title
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy" // Add lazy loading for images
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex items-center text-white">
                    <MapPin size={16} className="text-amber-400 mr-1" />
                    {/* Use destinationCategory for location display on card */}
                    <span className="text-sm">{pkg.destination_category || 'Multiple Destinations'}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow"> {/* Added flex-grow */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-amber-500">
                    <Star size={16} fill="currentColor" />
                    {/* Use rating */}
                    <span className="ml-1 text-sm font-medium">{pkg.rating?.toFixed(1) ?? 'N/A'}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} />
                    {/* Use duration string directly */}
                    <span className="ml-1 text-sm">{pkg.duration || 'Variable Duration'}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-amber-600 transition-colors">
                  {pkg.title} {/* Use title */}
                </h3>

                {/* Use overview, limit lines */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow"> {/* Added flex-grow */}
                  {pkg.overview || 'No overview available.'}
                </p>

                <div className="flex items-center justify-between mt-auto"> {/* Added mt-auto */}
                  <div className="text-green-800 font-bold">
                     {/* Use priceRange */}
                    {pkg.price_range ? `$${pkg.price_range.toLocaleString()}` : 'Inquire'}
                    <span className="text-sm font-normal text-gray-500"> /person</span>
                  </div>

                  <Link
                    to={`/packages/${pkg.slug}`} // Use slug for link
                    className="text-amber-600 font-medium flex items-center hover:text-amber-800 transition-colors"
                  >
                    <span>Details</span>
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center"> {/* Increased margin top */}
          <Link to="/packages">
            <Button variant="outline" rightIcon={<ChevronRight />} size="lg"> {/* Made button larger */}
              View All Safari Packages
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedPackages;