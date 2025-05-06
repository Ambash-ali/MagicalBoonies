import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import MasaiMara from './pages/destinations/MasaiMara';
import Amboseli from './pages/destinations/Amboseli';
import Tsavo from './pages/destinations/Tsavo';
import LakeNakuru from './pages/destinations/LakeNakuru';
import Samburu from './pages/destinations/Samburu';
import SignIn from './pages/auth/SignIn';
import AuthCallback from './pages/auth/AuthCallback';
import SignUp from './pages/auth/SignUp';
import BookingPage from './pages/BookingPage';
import BookingsPage from './pages/BookingsPage';
import DestinationsPage from './pages/destinations/DestinationsPage';
import BookingSuccessPage from './pages/BookingSuccessPage';
import Dashboard from './pages/account/Dashboard';
import Reviews from './pages/account/Reviews';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/signin" element={<SignIn />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/packages" element={<Packages />} />
                <Route path="/packages/:slug" element={<PackageDetail />} />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/destinations/masai-mara" element={<MasaiMara />} />
                <Route path="/destinations/amboseli" element={<Amboseli />} />
                <Route path="/destinations/tsavo" element={<Tsavo />} />
                <Route path="/destinations/lake-nakuru" element={<LakeNakuru />} />
                <Route path="/destinations/samburu" element={<Samburu />} />
                <Route path="/book/:packageId" element={<BookingPage />} />
                <Route path="/booking-success" element={<BookingSuccessPage />} />
                <Route path="/bookings" element={<BookingsPage />} />
                <Route path="/account" element={<Dashboard />} />
                <Route path="/account/reviews" element={<Reviews />} />
                
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
              },
            }}
          />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;