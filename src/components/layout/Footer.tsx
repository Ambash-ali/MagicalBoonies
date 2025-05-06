import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-coffee-900 text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold font-serif mb-4">
              Magical<span className="text-amber-400">Boonies</span>
            </div>
            <p className="text-gray-300 mb-4">
              Experience the untamed beauty of East Africa with our luxury safari tours. 
              Unforgettable wildlife encounters and breathtaking landscapes await.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Safari Packages
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-amber-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Travel Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations/masai-mara" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Masai Mara
                </Link>
              </li>
              <li>
                <Link to="/destinations/amboseli" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Amboseli
                </Link>
              </li>
              <li>
                <Link to="/destinations/tsavo" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Tsavo
                </Link>
              </li>
              <li>
                <Link to="/destinations/lake-nakuru" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Lake Nakuru
                </Link>
              </li>
              <li>
                <Link to="/destinations/samburu" className="text-gray-300 hover:text-amber-400 transition-colors">
                  Samburu
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin size={20} className="flex-shrink-0 mr-2 text-amber-400" />
                <span className="text-gray-300">
                  Wildlife Towers, Kenyatta Avenue<br />
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="flex-shrink-0 mr-2 text-amber-400" />
                <a href="tel:+254712345678" className="text-gray-300 hover:text-amber-400 transition-colors">
                  +254 712 345 678
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="flex-shrink-0 mr-2 text-amber-400" />
                <a href="mailto:info@safaridreams.com" className="text-gray-300 hover:text-amber-400 transition-colors">
                  info@magicalboonies.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-coffee-400 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} The MagicalBoonies. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;