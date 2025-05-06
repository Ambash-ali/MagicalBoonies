import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Users, Heart, Award, Leaf, Camera } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const TEAM_MEMBERS = [
  {
    name: 'J. Kanyi',
    role: 'Founder & Lead Guide',
    image: 'https://magicalboonies.wordpress.com/wp-content/uploads/2025/05/j_k-1.jpg',
    bio: '20+ years experience leading safaris across East Africa'
  },
  {
    name: 'A. Sendeo',
    role: 'Wildlife Expert',
    image: 'https://magicalboonies.wordpress.com/wp-content/uploads/2025/05/485795789_9252894221424313_4513616953420468015_n.jpg',
    bio: 'Wildlife Conservation, specializing in big cats'
  },
  {
    name: 'Sir Charles',
    role: 'Head of Operations',
    image: 'https://magicalboonies.wordpress.com/wp-content/uploads/2025/05/470191007_584313100955731_2624418725155957363_n.jpg',
    bio: '15 years experience in luxury safari operations'
  },
  {
    name: 'Alex Yeyo',
    role: 'Cultural Expert',
    image: 'https://magicalboonies.wordpress.com/wp-content/uploads/2025/05/117470175_1447402422127365_8102964290223221658_n.jpg',
    bio: 'Specialist in East African cultures and traditions'
  }
];

const VALUES = [
  {
    icon: <Shield className="h-8 w-8 text-amber-600" />,
    title: 'Safety First',
    description: 'Your well-being is our top priority, with comprehensive safety measures and experienced guides.'
  },
  {
    icon: <Heart className="h-8 w-8 text-amber-600" />,
    title: 'Passion for Wildlife',
    description: 'We are dedicated to sharing our love for Africa\'s incredible wildlife and natural heritage.'
  },
  {
    icon: <Users className="h-8 w-8 text-amber-600" />,
    title: 'Local Expertise',
    description: 'Our team of local experts brings authentic insights and deep cultural understanding.'
  },
  {
    icon: <Award className="h-8 w-8 text-amber-600" />,
    title: 'Excellence',
    description: 'We maintain the highest standards in service, accommodations, and experiences.'
  },
  {
    icon: <Leaf className="h-8 w-8 text-amber-600" />,
    title: 'Sustainability',
    description: 'Committed to conservation and supporting local communities through responsible tourism.'
  },
  {
    icon: <Camera className="h-8 w-8 text-amber-600" />,
    title: 'Memorable Moments',
    description: 'We create unforgettable experiences that will stay with you for a lifetime.'
  }
];

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About Us | MagicalBoonies</title>
        <meta 
          name="description" 
          content="Learn about our passion for African wildlife and commitment to creating unforgettable safari experiences. Meet our expert team of guides and wildlife specialists."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://magicalboonies.wordpress.com/wp-content/uploads/2023/11/i-tz5rdsr-x2.jpg)'
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>
        
        <div className="relative h-full flex items-center">
          <Container>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                About Magical Boonies
              </h1>
              <p className="text-xl text-white mb-8 max-w-2xl">
                Creating unforgettable African safari experiences with passion, expertise, and commitment to conservation.
              </p>
            </div>
          </Container>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2023, Magical Boonies was born from a deep passion for African wildlife and a desire to share the magic of East Africa with the world. What began as a small team of dedicated wildlife enthusiasts has grown into a leading luxury safari operator.
              </p>
              <p className="text-gray-600 mb-6">
                Our journey has been guided by a commitment to excellence, conservation, and creating meaningful connections between our guests and the incredible natural heritage of East Africa.
              </p>
              <p className="text-gray-600">
                Today, we pride ourselves on crafting bespoke safari experiences that combine luxury with adventure, cultural immersion with wildlife encounters, and comfort with authenticity.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img 
                src="https://magicalboonies.wordpress.com/wp-content/uploads/2023/11/i-h6nm6kd-x2.jpg"
                alt="Safari vehicle in the wilderness"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-amber-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide us in creating exceptional safari experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VALUES.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our experienced team of safari experts and wildlife specialists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-amber-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-900 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Ready to Start Your Safari Adventure?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let us help you plan the perfect East African safari experience
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/packages">
                <Button variant="primary">
                  Browse Packages
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-900">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default About;