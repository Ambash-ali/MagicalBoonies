import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import FeaturedPackages from '../components/home/FeaturedPackages';
import Destinations from '../components/home/Destinations';
import Testimonials from '../components/home/Testimonials';
import WhyChooseUs from '../components/home/WhyChooseUs';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>MagicalBoonies | Luxury East African Wildlife Safaris</title>
        <meta 
          name="description" 
          content="Experience the beauty of East Africa with our luxury safari tours. Explore Masai Mara, Amboseli, Tsavo, Lake Nakuru, and Samburu with expert guides."
        />
      </Helmet>
      
      <div>
        <Hero />
        <FeaturedPackages />
        <Destinations />
        <WhyChooseUs />
        <Testimonials />
      </div>
    </>
  );
};

export default Home;