import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Calendar, Star, Clock, Users, ChevronRight, Camera, Heart, Share2 } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { SafariPackage } from '../types/index';
import { useReviews } from '../hooks/useReviews';

const PackageDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [pkg, setPkg] = useState<SafariPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { 
    reviews, 
    loading: reviewsLoading, 
    error: reviewsError, 
    refreshReviews 
  } = useReviews(pkg?.id);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const { data: packageData, error: packageError } = await supabase
          .from('safari_packages')
          .select('*')
          .eq('slug', slug)
          .single();

        if (packageError) throw packageError;
        setPkg(packageData);
      } catch (error) {
        console.error('Error fetching package:', error);
        toast.error('Failed to load package details');
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen py-20">
        <Container>
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Package Not Found</h1>
            <p className="text-gray-600 mb-8">The safari package you're looking for doesn't exist.</p>
            <Link to="/packages">
              <Button variant="primary">Browse All Packages</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const images = [pkg.image_url, ...(pkg.image_gallery || []).slice(0, 3)];
  const durationDays = parseInt(pkg.duration.split(' ')[0]) || 0;
  const destinationName = pkg.destination_category;


  return (
    <>
      <Helmet>
        <title>{pkg.title} | MagicalBoonies</title>
        <meta 
          name="description" 
          content={pkg.overview}
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{
            backgroundImage: `url(${images[selectedImage]})`,
            transform: `scale(${selectedImage === 0 ? '1' : '1.1'})`
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>
        
        <div className="relative h-full flex items-center">
          <Container>
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 text-amber-400 mb-4">
                <MapPin size={20} />
                <Link 
                  to={`/destinations/${pkg.destination_category.toLowerCase().replace(' ', '-')}`}
                  className="text-white font-medium hover:text-amber-400 transition-colors"
                >
                  {destinationName}
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                {pkg.title}
              </h1>
              <div className="flex items-center space-x-6 text-white">
                <div className="flex items-center">
                  <Clock size={20} className="mr-2" />
                  <span>{pkg.duration}</span>
                </div>
                <div className="flex items-center">
                  <Star size={20} className="mr-2 fill-amber-400 text-amber-400" />
                  <span>{pkg.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <Users size={20} className="mr-2" />
                  <span>{pkg.group_size}</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Image Gallery Thumbnails */}
        <div className="absolute bottom-8 left-0 right-0">
          <Container>
            <div className="flex space-x-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-16 w-24 rounded-lg overflow-hidden transition-opacity ${
                    selectedImage === index ? 'ring-2 ring-amber-400' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </Container>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Package Details */}
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-3xl font-serif font-bold mb-6">Overview</h2>
                <p className="text-gray-600 mb-8">{pkg.overview}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-amber-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Inclusions</h3>
                    <ul className="space-y-2">
                      {pkg.inclusions.map((item, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">Exclusions</h3>
                    <ul className="space-y-2">
                      {pkg.exclusions.map((item, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-serif font-bold mb-6">Itinerary Highlights</h3>
                <div className="space-y-6 mb-12">
                  {pkg.itinerary_highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-amber-600 font-bold">{index + 1}</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-gray-700">{highlight}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 p-6 rounded-lg mb-12">
                  <h3 className="text-xl font-bold mb-4">Best Time to Visit</h3>
                  <div className="flex items-start">
                    <Calendar size={24} className="text-green-600 mr-3 mt-1" />
                    <p className="text-gray-700">{pkg.best_travel_season}</p>
                  </div>
                </div>

                {/* Package Category and Tags */}
                <div className="mb-12">
                  <h3 className="text-2xl font-serif font-bold mb-4">Package Details</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                      {pkg.package_category}
                    </span>
                    {pkg.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <section className="mt-16">
                <h2 className="text-3xl font-serif font-bold mb-8">Guest Reviews</h2>
                <ReviewList 
                  reviews={reviews} 
                  loading={reviewsLoading}
                  error={reviewsError}
                />
                
                <div className="mt-12">
                  <h3 className="text-2xl font-serif font-bold mb-6">Write a Review</h3>
                  <ReviewForm 
                    packageId={pkg.id} 
                    onSuccess={refreshReviews} 
                  />
                </div>
              </section>
            </div>

            {/* Right Column - Booking Card */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-amber-600">
                    ${pkg.price_range}
                    <span className="text-base font-normal text-gray-600">/person</span>
                  </div>
                  <p className="text-gray-600">Based on double occupancy</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Duration</span>
                    <span className="font-medium">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Group Size</span>
                    <span className="font-medium">{pkg.group_size}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Category</span>
                    <span className="font-medium">{pkg.package_category}</span>
                  </div>
                </div>

                <Link to={`/book/${pkg.id}`}>
                  <Button 
                    variant="primary" 
                    fullWidth
                    rightIcon={<ChevronRight size={18} />}
                  >
                    Book Now
                  </Button>
                </Link>

                <div className="mt-6 flex justify-center space-x-4">
                  <button className="flex items-center text-gray-600 hover:text-amber-600 transition-colors">
                    <Heart size={18} className="mr-1" />
                    <span>Save</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-amber-600 transition-colors">
                    <Share2 size={18} className="mr-1" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-amber-600 transition-colors">
                    <Camera size={18} className="mr-1" />
                    <span>Photos</span>
                  </button>
                </div>

                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-bold mb-2">Need Help?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Our safari experts are here to help plan your perfect trip.
                  </p>
                  <Link to="/contact">
                    <Button variant="outline" fullWidth>
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default PackageDetail;