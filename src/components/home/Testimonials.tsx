import React, { useState, useEffect } from 'react';
import Container from '../ui/Container';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// This would come from the API in a real app
const TESTIMONIALS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    date: '2024-05-15',
    rating: 5,
    review: 'The Masai Mara safari exceeded all our expectations. Our guide was incredibly knowledgeable and ensured we had the best wildlife viewing opportunities. We witnessed the Great Migration, which was truly breathtaking!',
    package: 'Masai Mara Explorer',
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    date: '2024-04-22',
    rating: 5,
    review: 'The accommodations were luxurious and the staff was incredibly attentive. We got to see all the Big Five during our safari in Tsavo. The sunset views were spectacular, and the cultural experiences were authentic and educational.',
    package: 'Tsavo Wilderness Adventure',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    date: '2024-03-10',
    rating: 4,
    review: 'Amboseli was magical with Mt. Kilimanjaro as the backdrop. We saw hundreds of elephants and the photographic opportunities were endless. Our guide went above and beyond to ensure we had a comfortable and memorable experience.',
    package: 'Amboseli & Kilimanjaro Views',
  },
  {
    id: '4',
    name: 'David Omondi',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    date: '2024-05-03',
    rating: 5,
    review: 'The cultural immersion with the Samburu people was the highlight of our trip. We learned so much about their traditions and way of life. The wildlife sightings were excellent, and we even spotted the rare Grevys zebra.',
    package: 'Samburu Cultural Experience',
  },
  {
    id: '5',
    name: 'Jennifer Williams',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    date: '2024-02-18',
    rating: 5,
    review: 'Our family safari to Lake Nakuru was unforgettable. The flamingo-filled lake was a sight to behold, and we were fortunate to see both black and white rhinos. The accommodations were comfortable, and the food was delicious.',
    package: 'Lake Nakuru Flamingo Safari',
  },
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            What Our Guests Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Read about the experiences of travelers who have embarked on our safari adventures
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -left-10 -top-10 text-amber-400 opacity-20">
            <Quote size={80} />
          </div>
          
          <div className="relative">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-opacity duration-700 ${
                  activeIndex === index ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                }`}
              >
                {activeIndex === index && (
                  <div className="bg-white rounded-xl p-8 shadow-lg">
                    <div className="flex items-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-xl text-gray-700 italic mb-8">
                      "{testimonial.review}"
                    </blockquote>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-bold text-lg">{testimonial.name}</h4>
                          <p className="text-gray-600">{testimonial.package}</p>
                        </div>
                      </div>
                      <div className="text-gray-500 text-sm">
                        {new Date(testimonial.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === activeIndex ? 'bg-amber-500 w-6' : 'bg-gray-300'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between">
            <button
              onClick={prevTestimonial}
              className="bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-amber-600 transition-colors focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-amber-600 transition-colors focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;