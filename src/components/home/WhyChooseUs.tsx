import React from 'react';
import Container from '../ui/Container';
import { ShieldCheck, Map, Users, HeartHandshake, Clock, CameraIcon } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-amber-600" />,
    title: 'Safety Guaranteed',
    description: 'Your well-being is our top priority with experienced guides and premium vehicles.',
  },
  {
    icon: <Map className="h-10 w-10 text-amber-600" />,
    title: 'Expertly Crafted Itineraries',
    description: 'Our routes are designed to maximize wildlife viewing and authentic experiences.',
  },
  {
    icon: <Users className="h-10 w-10 text-amber-600" />,
    title: 'Small Group Sizes',
    description: 'Enjoy personalized attention with never more than 6 guests per safari vehicle.',
  },
  {
    icon: <HeartHandshake className="h-10 w-10 text-amber-600" />,
    title: 'Community Partnership',
    description: 'We work directly with local communities, ensuring they benefit from tourism.',
  },
  {
    icon: <Clock className="h-10 w-10 text-amber-600" />,
    title: 'Flexible Scheduling',
    description: 'Customize your safari dates to suit your travel plans and preferences.',
  },
  {
    icon: <CameraIcon className="h-10 w-10 text-amber-600" />,
    title: 'Perfect Photo Opportunities',
    description: 'Our guides know the best spots and times for incredible wildlife photography.',
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-amber-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Why Choose Magical<span className="text-amber-600">Boonies</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We create personalized safari experiences that combine luxury, adventure, and sustainability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-amber-600 text-white p-8 md:p-12 rounded-xl">
          <div className="md:flex items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready for the adventure of a lifetime?
              </h3>
              <p className="text-amber-100 text-lg">
                Our East African safari experts are ready to help plan your perfect wildlife experience.
              </p>
            </div>
            <div>
              <a 
                href="/contact" 
                className="inline-block bg-white text-amber-600 font-medium px-6 py-3 rounded-md hover:bg-amber-100 transition-colors"
              >
                Contact Us Today
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;