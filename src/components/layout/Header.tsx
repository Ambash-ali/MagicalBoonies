import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const destinations = [
    { name: 'Masai Mara', path: '/destinations/masai-mara' },
    { name: 'Tsavo', path: '/destinations/tsavo' },
    { name: 'Lake Nakuru', path: '/destinations/lake-nakuru' },
    { name: 'Amboseli', path: '/destinations/amboseli' },
    { name: 'Samburu', path: '/destinations/samburu' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
          >
            <div className="text-2xl font-bold font-serif tracking-tight text-white">
              Magical<span className="text-amber-700">Boonies</span>
            </div>
          </Link>
          

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/'
                  ? 'text-amber-700'
                  : isScrolled ? 'text-gray-800 hover:text-amber-700' : 'text-white hover:text-amber-200'
                }`}
            >
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsDestinationsOpen(true)}
              onMouseLeave={() => setIsDestinationsOpen(false)}
            >
              <Link
                to="/destinations"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${location.pathname.includes('/destinations')
                    ? 'text-amber-700'
                    : isScrolled ? 'text-gray-800 hover:text-amber-700' : 'text-white hover:text-amber-200'
                  }`}
              >
                Destinations
                <ChevronDown size={16} className="ml-1" />
              </Link>

              {isDestinationsOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
                  {destinations.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/packages"
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/packages'
                  ? 'text-amber-700'
                  : isScrolled ? 'text-gray-800 hover:text-amber-700' : 'text-white hover:text-amber-200'
                }`}
            >
              Packages
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/about'
                  ? 'text-amber-700'
                  : isScrolled ? 'text-gray-800 hover:text-amber-700' : 'text-white hover:text-amber-200'
                }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/contact'
                  ? 'text-amber-700'
                  : isScrolled ? 'text-gray-800 hover:text-amber-700' : 'text-white hover:text-amber-200'
                }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/account" className="flex items-center space-x-1">
                  <User size={18} className={isScrolled ? 'text-gray-800' : 'text-white'} />
                  <span className={isScrolled ? 'text-gray-800' : 'text-white'}>
                    {user.firstName || 'My Account'}
                  </span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className={!isScrolled ? 'border-white text-white hover:bg-white hover:text-amber-700' : ''}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth/signin">
                  <Button
                    variant="text"
                    size="sm"
                    className={!isScrolled ? 'text-white hover:bg-white/20' : ''}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button
                    variant="primary"
                    size="sm"
                    className={!isScrolled ? 'bg-amber text-white hover:bg-amber-100' : ''}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${isScrolled ? 'text-gray-800' : 'text-white'
                }`}
            >
              {isMenuOpen ? (
                <X size={24} aria-hidden="true" />
              ) : (
                <Menu size={24} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/'
                  ? 'bg-amber-50 text-amber-700'
                  : 'text-gray-800 hover:bg-amber-50 hover:text-amber-700'
                }`}
            >
              Home
            </Link>

            <button
              onClick={() => setIsDestinationsOpen(!isDestinationsOpen)}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium ${location.pathname.includes('/destinations')
                  ? 'bg-amber-50 text-amber-700'
                  : 'text-gray-800 hover:bg-amber-50 hover:text-amber-700'
                }`}
            >
              <span>Destinations</span>
              <ChevronDown size={16} className={isDestinationsOpen ? 'transform rotate-180' : ''} />
            </button>

            {isDestinationsOpen && (
              <div className="pl-4 space-y-1">
                {destinations.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-700"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            <Link
              to="/packages"
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/packages'
                  ? 'bg-amber-50 text-amber-700'
                  : 'text-gray-800 hover:bg-amber-50 hover:text-amber-700'
                }`}
            >
              Packages
            </Link>

            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/about'
                  ? 'bg-amber-50 text-amber-700'
                  : 'text-gray-800 hover:bg-amber-50 hover:text-amber-700'
                }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/contact'
                  ? 'bg-amber-50 text-amber-700'
                  : 'text-gray-800 hover:bg-amber-50 hover:text-amber-700'
                }`}
            >
              Contact
            </Link>
          </div>

          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold">
                    {user.firstName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.firstName || 'User'}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
            ) : (
              <div className="px-5 py-4 flex gap-3">
                <Link to="/auth/signin" className="w-1/2">
                  <Button
                    variant="outline"
                    fullWidth
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/signup" className="w-1/2">
                  <Button
                    variant="primary"
                    fullWidth
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {user && (
              <div className="mt-3 px-2 space-y-1">
                <Link
                  to="/account"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-700"
                >
                  My Account
                </Link>
                <Link
                  to="/account/bookings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-700"
                >
                  My Bookings
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-700"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;