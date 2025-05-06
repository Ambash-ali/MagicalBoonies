import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import { ArrowRight } from 'lucide-react';

const DESTINATIONS = [
  {
    id: '1',
    name: 'Masai Mara',
    slug: 'masai-mara',
    image: 'imgs/destinations/mara.jpg',
    description: 'Home to the Great Migration and abundant wildlife',
    packages: 5,
  },
  {
    id: '2',
    name: 'Amboseli',
    slug: 'amboseli',
    image: 'imgs/destinations/amboseli.jpg',
    description: 'Spectacular views of Mt. Kilimanjaro with free-roaming elephants',
    packages: 2,
  },
  {
    id: '3',
    name: 'Tsavo',
    slug: 'tsavo',
    image: 'imgs/destinations/tsavo.jpg',
    description: "Kenya's largest national park with the famed maneless lions",
    packages: 3,
  },
  {
    id: '4',
    name: 'Lake Nakuru',
    slug: 'lake-nakuru',
    image: 'imgs/destinations/lake-nakuru.jpg',
    description: 'Famous for flamingos, rhinos and over 450 bird species',
    packages: 1,
  },
  {
    id: '5',
    name: 'Samburu',
    slug: 'samburu',
    image: 'imgs/destinations/samburu.jpg',
    description: 'Rugged landscapes and unique wildlife species',
    packages: 2,
  },
  {
    id: '6',
    name: 'Bespoke Safari',
    slug: 'bespoke-safari',
    image: 'imgs/destinations/bespoke.jpg',
    description: 'Tailor your own safari experience with our expert guides',
    packages: 2,
  },
];

const Destinations: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
  className="relative py-20 bg-center bg-cover bg-no-repeat"
  style={{
    backgroundImage: "url('https://magicalboonies.wordpress.com/wp-content/uploads/2023/11/pexels-photo-417142.jpg')",
  }}
>
  {/* Dark translucent overlay + blur */}
  <div className="absolute inset-0 bg-black/50 backdrop-blur-lg"></div>

  {/* Main content, elevated above background */}
  <Container className="relative z-10">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-white drop-shadow-md">
        Explore Our Top Destinations
      </h2>
      <p className="text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-sm">
        Discover the magic of East Africa's most spectacular wildlife and landscapes
      </p>
    </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS.map((destination, index) => (
            <Link
              key={destination.id}
              to={`/destinations/${destination.slug}`}
              className="relative rounded-xl overflow-hidden h-80 block group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="absolute inset-0">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredIndex === index ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300" />
              </div>
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform transition-transform duration-300 translate-y-0 group-hover:-translate-y-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{destination.name}</h3>
                  <p className="text-gray-200 mb-3">{destination.description}</p>
                  <div className="flex items-center text-amber-400 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <span className="mr-2">Explore {destination.packages} packages</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Destinations;