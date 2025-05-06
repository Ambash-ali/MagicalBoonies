import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Calendar, Star, Users, Clock, PawPrint, Eye, Check, ArrowRight, X, Plus } from 'lucide-react';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { SafariPackage } from '../../types/index';

// Ensure we handle potentially missing data safely
const ensureArray = (data: any[] | undefined | null): any[] => {
  return Array.isArray(data) ? data : [];
};

const MasaiMara: React.FC = () => {
  const [packages, setPackages] = useState<SafariPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Record<string, 'highlights' | 'inclusions' | 'exclusions'>>({});

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Fetch packages from Supabase where destinationCategory is 'Masai Mara'
        const { data, error } = await supabase
          .from('safari_packages')
          .select('*')
          .eq('destination_category', 'Masai Mara');
          
        if (error) throw error;
        
        if (data) {
          console.log('Fetched packages:', data); // Debug log
          
          // Ensure data matches our type expectations
          const formattedPackages = data.map(pkg => ({
            ...pkg,
            // Ensure imageUrl is properly set
            imageUrl: pkg.imageUrl || 'https://via.placeholder.com/400x300?text=Safari',
            // Ensure priceRange is properly set
            priceRange: typeof pkg.priceRange === 'number' ? pkg.priceRange : null,
            // Ensure arrays are properly set
            itineraryHighlights: ensureArray(pkg.itineraryHighlights),
            inclusions: ensureArray(pkg.inclusions),
            exclusions: ensureArray(pkg.exclusions),
            tags: ensureArray(pkg.tags)
          }));
          
          // Set initial active tab for each package
          const initialTabs: Record<string, 'highlights' | 'inclusions' | 'exclusions'> = {};
          formattedPackages.forEach(pkg => {
            initialTabs[pkg.id] = 'highlights';
          });
          setActiveTab(initialTabs);
          
          setPackages(formattedPackages);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleTabChange = (packageId: string, tab: 'highlights' | 'inclusions' | 'exclusions') => {
    setActiveTab(prev => ({
      ...prev,
      [packageId]: tab
    }));
  };

  return (
    <>
      <Helmet>
        <title>Masai Mara Safaris | MagicalBoonies</title>
        <meta 
          name="description" 
          content="Experience the magic of Masai Mara with our luxury safari packages. Witness the Great Migration, spot the Big Five, and immerse yourself in Maasai culture."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://magicalboonies.wordpress.com/wp-content/uploads/2023/11/mara.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>
        
        <div className="relative h-full flex items-center">
          <Container>
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 text-amber-400 mb-4">
                <MapPin size={20} />
                <span className="text-white font-medium">Masai Mara National Reserve, Kenya</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                Masai Mara Safaris
              </h1>
              <p className="text-xl text-white mb-8 max-w-2xl">
                Experience the world's most spectacular wildlife sanctuary, home to the Great Migration and abundant year-round wildlife.
              </p>
            </div>
          </Container>
        </div>
      </div>

      {/* Overview Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-serif font-bold mb-6">
                About Masai Mara
              </h2>
              <p className="text-gray-600 mb-6">
                The Masai Mara is Kenya's most famous and finest game reserve. Known as the jewel of Kenya's wildlife viewing areas, the annual wildebeest migration alone involves over 1.5 million animals arriving in July and departing in November.
              </p>
              <p className="text-gray-600 mb-6">
                The Mara has the largest population of lions in Kenya, and most other animals can be spotted here throughout the year. The park is famous for being able to spot all of the "Big Five" (lion, leopard, elephant, rhino, and buffalo) in a single day.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-amber-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Best Time to Visit</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Calendar size={18} className="text-amber-600 mr-2" />
                      <span>Migration Season: July - October</span>
                    </li>
                    <li className="flex items-center">
                      <Calendar size={18} className="text-amber-600 mr-2" />
                      <span>Dry Season: June - October</span>
                    </li>
                    <li className="flex items-center">
                      <Calendar size={18} className="text-amber-600 mr-2" />
                      <span>Green Season: November - May</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Highlights</h3>
                  <ul className="space-y-2">
                    <li>Great Migration</li>
                    <li>Big Five Sightings</li>
                    <li>Hot Air Balloon Safaris</li>
                    <li>Maasai Cultural Visits</li>
                    <li>Luxury Tented Camps</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin size={18} className="text-amber-600 mr-2 mt-1" />
                    <div>
                      <span className="font-medium">Location:</span>
                      <p className="text-gray-600">Southwestern Kenya</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users size={18} className="text-amber-600 mr-2 mt-1" />
                    <div>
                      <span className="font-medium">Size:</span>
                      <p className="text-gray-600">1,510 square kilometers</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock size={18} className="text-amber-600 mr-2 mt-1" />
                    <div>
                      <span className="font-medium">Getting There:</span>
                      <p className="text-gray-600">1-hour flight from Nairobi or 5-6 hours by road</p>
                    </div>
                  </li>
                </ul>
                
                <Link to="/contact" className="mt-6 block">
                  <Button variant="primary" fullWidth>
                    Enquire Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Safari Packages Section - Redesigned to match destination layout */}
      <section className="bg-white">
        <div className="text-center py-16">
          <Container>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Masai Mara Safari Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the magic of Masai Mara with our specialized safari packages
            </p>
          </Container>
        </div>

        {loading ? (
          <Container className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </Container>
        ) : (
          <>
            {packages.length === 0 ? (
              <Container className="text-center py-12">
                <p className="text-gray-600">No packages available for Masai Mara at the moment.</p>
              </Container>
            ) : (
              packages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="relative"
                  style={{
                    backgroundColor: index % 2 === 0 ? 'white' : 'rgba(251, 243, 219, 0.3)'
                  }}
                >
                  {/* Lens Effect Background - Alternate between different colors */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: index % 4 === 0 
                        ? `radial-gradient(circle at ${index % 2 !== 0 ? '70%' : '30%'} 50%, rgb(217 119 6 / 0.2), transparent 70%)`
                        : index % 4 === 1
                          ? `radial-gradient(circle at ${index % 2 !== 0 ? '70%' : '30%'} 50%, rgb(120 113 108 / 0.2), transparent 70%)`
                          : index % 4 === 2
                            ? `radial-gradient(circle at ${index % 2 !== 0 ? '70%' : '30%'} 50%, rgb(71 85 105 / 0.2), transparent 70%)`
                            : `radial-gradient(circle at ${index % 2 !== 0 ? '70%' : '30%'} 50%, rgb(180 83 9 / 0.2), transparent 70%)`
                    }}
                  />
                  
                  <Container className="py-16 lg:py-24 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
                      
                      {/* Image Column - Always on the left */}
                      <div className="relative rounded-xl overflow-hidden shadow-xl md:order-1">
                        {/* Subtle glass shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent z-10 pointer-events-none"></div>
                        
                        {/* Image */}
                        <img
                          src={pkg.image_url || 'https://via.placeholder.com/400x300?text=Safari'}
                          alt={`${pkg.title} safari package`}
                          className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                        
                        {/* Price Badge */}
                        <div className="absolute top-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                          From ${pkg.price_range ? pkg.price_range.toLocaleString() : 'Inquire'}
                        </div>
                      </div>

                      {/* Text Content Column - Always on the right */}
                      <div className="flex flex-col justify-center md:order-2">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center text-amber-500">
                            <Star size={18} fill="currentColor" />
                            <span className="ml-1 font-medium">{pkg.rating?.toFixed(1) ?? 'N/A'}</span>
                          </div>
                          <span className="text-gray-400">|</span>
                          <span className="text-gray-600">{pkg.duration}</span>
                        </div>
                        
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">{pkg.title || 'Safari Package'}</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">{pkg.overview || 'Experience the stunning wilderness of Masai Mara with this safari package.'}</p>

                        {/* Tab Navigation */}
                        <div className="flex mb-6 border-b border-gray-200">
                          <button
                            onClick={() => handleTabChange(pkg.id, 'highlights')}
                            className={`px-4 py-2 font-medium text-sm ${
                              activeTab[pkg.id] === 'highlights' 
                                ? 'text-amber-600 border-b-2 border-amber-600' 
                                : 'text-gray-500 hover:text-amber-500'
                            }`}
                          >
                            Highlights
                          </button>
                          <button
                            onClick={() => handleTabChange(pkg.id, 'inclusions')}
                            className={`px-4 py-2 font-medium text-sm ${
                              activeTab[pkg.id] === 'inclusions' 
                                ? 'text-amber-600 border-b-2 border-amber-600' 
                                : 'text-gray-500 hover:text-amber-500'
                            }`}
                          >
                            Inclusions
                          </button>
                          <button
                            onClick={() => handleTabChange(pkg.id, 'exclusions')}
                            className={`px-4 py-2 font-medium text-sm ${
                              activeTab[pkg.id] === 'exclusions' 
                                ? 'text-amber-600 border-b-2 border-amber-600' 
                                : 'text-gray-500 hover:text-amber-500'
                            }`}
                          >
                            Exclusions
                          </button>
                        </div>

                        {/* Tab Content */}
                        <div className="mb-8">
                          {/* Highlights Tab */}
                          {activeTab[pkg.id] === 'highlights' && (
                            <div className="space-y-3">
                              {ensureArray(pkg.itinerary_highlights).slice(0, 4).map((highlight, i) => (
                                <div key={i} className="flex items-center text-gray-700">
                                  <Check className="w-5 h-5 mr-3 text-pink-500 flex-shrink-0" />
                                  <span>{highlight}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Inclusions Tab */}
                          {activeTab[pkg.id] === 'inclusions' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {ensureArray(pkg.inclusions).map((inclusion, i) => (
                                <div key={i} className="flex items-center text-gray-700">
                                  <Plus className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                                  <span>{inclusion}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Exclusions Tab */}
                          {activeTab[pkg.id] === 'exclusions' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {ensureArray(pkg.exclusions).map((exclusion, i) => (
                                <div key={i} className="flex items-center text-gray-700">
                                  <X className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" />
                                  <span>{exclusion}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Info Cards - Similar to the destination key features */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                          <div className="flex items-center text-gray-700">
                            <Calendar className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0" />
                            <span>Best Season: {pkg.best_travel_season || 'Year-round'}</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Users className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0" />
                            <span>Group Size: {pkg.group_size || 'Small groups'}</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <PawPrint className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0" />
                            <span>Wildlife Focus: {ensureArray(pkg.tags).slice(0, 2).join(', ') || 'Diverse wildlife'}</span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-auto">
                          <Link to={`/packages/${pkg.slug}`}>
                            <Button
                              variant="primary"
                              size="lg"
                              className="inline-flex items-center group"
                              rightIcon={<ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />}
                            >
                              Explore This Package
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Container>
                </div>
              ))
            )}
          </>
        )}
      </section>
    </>
  );
};

export default MasaiMara;