import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { ArrowRight, MapPin, Calendar, Search } from 'lucide-react';

const HERO_IMAGES = [
  {
    url: '/imgs/hero/wildebeest-at-river-crossing-masai-mara.jpg',
    title: 'Experience the Great Migration',
    subtitle: 'Witness millions of wildebeest traversing the Masai Mara',
    location: 'Masai Mara, Kenya',
  },
  {
    url: '/imgs/hero/amboseli-national-park-giraffe.jpg',
    title: 'Magnificent Giraffes of Amboseli',
    subtitle: 'See giraffes against the backdrop of Mt. Kilimanjaro',
    location: 'Amboseli National Park, Kenya',
  },
  {
    url: '/imgs/hero/flock-pink-flamingos-walvis-bay.jpg',
    title: 'The Rare Pink Flamingos',
    subtitle: 'Witness the stunning pink flamingos at lake Nakuru',
    location: 'Lake Nakuru, Kenya',
  },
  {
    url: '/imgs/hero/samburu-leopard.jpg',
    title: 'The Big Five Safari',
    subtitle: 'Lion, Leopard, Rhino, Elephant and Cape Buffalo',
    location: 'Tsavo National Park, Kenya',
  },
];

const destinations = [
  'Masai Mara',
  'Amboseli',
  'Tsavo',
  'Lake Nakuru',
  'Samburu',
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  // Preload images for smoother transitions
  useEffect(() => {
    HERO_IMAGES.forEach(image => {
      const img = new Image();
      img.src = image.url;
    });
  }, []);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        setCurrentSlide((prev) => (prev === HERO_IMAGES.length - 1 ? 0 : prev + 1));
      }, 6000);
    }

    return () => {
      resetTimeout();
    };
  }, [currentSlide, isPaused]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    // Brief pause when manually changing slides
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  const handleSearch = () => {
    // In a real app, we would construct a query string with the search parameters
    navigate('/packages', { 
      state: { 
        destination: selectedDestination,
        date: selectedDate,
        guests
      } 
    });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Image Slider with Ken Burns effect */}
      {HERO_IMAGES.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1500 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            zIndex: index === currentSlide ? 10 : 0,
          }}
        >
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out ${
              index === currentSlide ? 'scale-110' : 'scale-100'
            }`}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            {HERO_IMAGES.map((image, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${
                  index === currentSlide
                    ? 'opacity-100 transform translate-y-0'
                    : 'opacity-0 transform translate-y-8 absolute'
                }`}
              >
                {index === currentSlide && (
                  <>
                    <div className="flex items-center space-x-2 text-amber-400 mb-4">
                      <MapPin size={18} />
                      <span className="text-sm font-medium tracking-wider uppercase">{image.location}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-4 leading-tight">
                      {image.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
                      {image.subtitle}
                    </p>
                  </>
                )}
              </div>
            ))}

            {/* Search Box */}
            <div className="mt-8 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white text-sm mb-1">Destination</label>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full p-3 bg-white/80 backdrop-blur rounded-md border-0 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">Choose destination</option>
                    {destinations.map((dest) => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white text-sm mb-1">Travel Date</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute top-3.5 left-3 text-gray-500" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 pl-10 bg-white/80 backdrop-blur rounded-md border-0 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm mb-1">Guests</label>
                  <div className="flex">
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full p-3 bg-white/80 backdrop-blur rounded-l-md border-0 focus:ring-2 focus:ring-amber-500"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>{num} guest{num !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                    <button
                      onClick={handleSearch}
                      className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-r-md flex items-center justify-center transition-colors duration-300"
                    >
                      <Search size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => navigate('/packages')}
                rightIcon={<ArrowRight size={18} />}
                className="bg-amber-600 hover:bg-amber-700 text-white border-0 px-8 py-4 text-lg"
              >
                Explore Packages
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white/20 px-8 py-4 text-lg"
                onClick={() => navigate('/destinations')}
              >
                View Destinations
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
        <div className="flex space-x-3">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentSlide ? 'bg-amber-400 w-8' : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;