import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, PawPrint, Bird, Mountain, Users, Eye, Check, ArrowRight } from 'lucide-react';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';

// --- 1. Define Destination Data Structure & Data ---

interface Destination {
  id: string;
  name: string;
  tagline: string;
  imageUrl: string;
  description: string;
  glowColor: string; // Color for the halo effect
  keyFeatures: { icon: React.ElementType; text: string }[];
  link: string;
}

const destinationsData: Destination[] = [
  {
    id: 'masai-mara',
    name: 'Masai Mara',
    tagline: 'The Theatre of Wildlife',
    imageUrl: 'https://magicalboonies.wordpress.com/wp-content/uploads/2023/07/wildebeest-maasai-mara-national-reserve.jpg',
    glowColor: '217 119 6', // amber-600 RGB
    description: 'Kenya\'s crown jewel, renowned for the Great Migration, abundant predators, and vast savannahs teeming with life year-round. Experience the raw pulse of the African wilderness.',
    keyFeatures: [
      { icon: PawPrint, text: 'Great Migration Spectacle (Jul-Oct)' },
      { icon: PawPrint, text: 'Unrivaled Big Five Sightings' },
      { icon: Users, text: 'Authentic Maasai Cultural Encounters' },
    ],
    link: '/destinations/masai-mara',
  },
  {
    id: 'amboseli',
    name: 'Amboseli',
    tagline: 'Land of Giants under Kilimanjaro',
    imageUrl: 'https://magicalboonies.wordpress.com/wp-content/uploads/2023/07/amboseli-national-park-1.jpg',
    glowColor: '59 130 246', // blue-500 RGB
    description: 'Famous for its large, free-ranging elephant herds gracefully moving against the breathtaking backdrop of snow-capped Mount Kilimanjaro.',
    keyFeatures: [
      { icon: PawPrint, text: 'Iconic Elephant Herds' },
      { icon: Mountain, text: 'Majestic Kilimanjaro Views' },
      { icon: Eye, text: 'Superb Photographic Opportunities' },
    ],
    link: '/destinations/amboseli',
  },
  {
    id: 'tsavo',
    name: 'Tsavo (East & West)',
    tagline: 'Vast Wilderness & Red Earth',
    imageUrl: 'https://magicalboonies.wordpress.com/wp-content/uploads/2023/07/wallpaperflare.com_wallpaper.jpg',
    glowColor: '22 163 74', // red-600 RGB
    description: 'Explore one of Kenya\'s largest parks, a rugged expanse known for its unique red-dusted elephants, dramatic lava flows, and the lush Mzima Springs oasis.',
    keyFeatures: [
      { icon: PawPrint, text: 'Unique "Red" Elephants' },
      { icon: Eye, text: 'Expansive, Untamed Landscapes' },
      { icon: PawPrint, text: 'Rich History & Biodiversity' },
    ],
    link: '/destinations/tsavo',
  },
  {
    id: 'lake-nakuru',
    name: 'Lake Nakuru',
    tagline: 'Avian Paradise & Rhino Haven',
    imageUrl: 'https://magicalboonies.wordpress.com/wp-content/uploads/2023/07/pink-flamingos-lake-nakuru.jpg',
    glowColor: '236 72 153', // pink-500 RGB
    description: 'Nestled in the Great Rift Valley, this stunning soda lake is famed for its vibrant flamingo populations and critical role as a rhino sanctuary.',
    keyFeatures: [
      { icon: Bird, text: 'Potential Flamingo Spectacle' },
      { icon: PawPrint, text: 'Vital Black & White Rhino Sanctuary' },
      { icon: Bird, text: 'Over 450 Bird Species Recorded' },
    ],
    link: '/destinations/lake-nakuru',
  },
  {
    id: 'samburu',
    name: 'Samburu',
    tagline: 'Northern Frontier Adventure',
    imageUrl: 'https://magicalboonies.wordpress.com/wp-content/uploads/2023/07/lion-samburu-national-park.jpg',
    glowColor: '202 138 4', // yellow-600 RGB
    description: 'Discover the semi-arid beauty of Kenya\'s north, home to unique wildlife found nowhere else, sustained by the life-giving Ewaso Ng\'iro river.',
    keyFeatures: [
      { icon: PawPrint, text: 'The "Samburu Special Five" Wildlife' },
      { icon: Users, text: 'Rich Samburu Cultural Heritage' },
      { icon: Eye, text: 'Dramatic Scenery & Riverine Forests' },
    ],
    link: '/destinations/samburu',
  },
];


// --- 2. Main Destinations Page Component with Google Lens-like Halo Effect ---

const DestinationsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Explore Safari Destinations | MagicalBoonies</title>
        <meta
          name="description"
          content="Discover Kenya's premier safari destinations: Masai Mara, Amboseli, Tsavo, Lake Nakuru, and Samburu. Plan your unforgettable African wildlife adventure."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gray-800 h-[50vh] lg:h-[60vh] text-white flex items-center justify-center overflow-hidden">
         <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url(https://magicalboonies.wordpress.com/wp-content/uploads/2023/07/banner-themara.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
           <div className="flex items-center justify-center space-x-2 text-amber-400 mb-4">
            <MapPin size={20} />
            <span className="font-medium uppercase tracking-wider">Your Gateway to Kenyan Adventures</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
            Discover Your Perfect Destination
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            From the iconic plains of the Masai Mara to the unique landscapes of Samburu, explore the diverse ecosystems and incredible wildlife that Kenya has to offer.
          </p>
        </div>
      </div>

      {/* Destinations with Google Lens-like Halo Effect */}
      <section className="bg-white">
        {destinationsData.map((destination, index) => (
          <div
            key={destination.id}
            className="relative"
            style={{
              backgroundColor: index % 2 === 0 ? 'white' : 'rgba(251, 243, 219, 0.3)'
            }}
          >
            {/* Lens Effect Background - Applied to the entire section */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${index % 2 !== 0 ? '70%' : '30%'} 50%, rgb(${destination.glowColor} / 0.2), transparent 70%)`,
              }}
            />
            
            <Container className="py-16 lg:py-24 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
                
                {/* Image Column */}
                <div className={`relative rounded-xl overflow-hidden shadow-xl ${index % 2 !== 0 ? 'md:order-2' : 'md:order-1'}`}>
                  {/* Subtle glass shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent z-10 pointer-events-none"></div>
                  
                  {/* Image */}
                  <img
                    src={destination.imageUrl}
                    alt={`Scenic view of ${destination.name}`}
                    className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Text Content Column - Clear, no backdrop blur affecting text */}
                <div className={`flex flex-col justify-center ${index % 2 !== 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <span className="text-amber-600 font-semibold uppercase tracking-wider text-sm mb-2">{destination.tagline}</span>
                  <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">{destination.name}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{destination.description}</p>

                  {/* Key Features */}
                  <div className="mb-8 space-y-3">
                    {destination.keyFeatures.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-gray-700">
                        <feature.icon className="w-5 h-5 mr-3 text-amber-500 flex-shrink-0" />
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                     <Link to={destination.link}>
                       <Button
                         variant="primary"
                         size="lg"
                         className="inline-flex items-center group"
                         rightIcon={<ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />}
                       >
                         Explore {destination.name}
                       </Button>
                     </Link>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        ))}
      </section>
    </>
  );
};

export default DestinationsPage;