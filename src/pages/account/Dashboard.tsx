import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import { User, Clock, MapPin, Star, LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  return (
    <>
      <Helmet>
        <title>My Account | MagicalBoonies</title>
        <meta 
          name="description" 
          content="Manage your MagicalBoonies account, view bookings, and update preferences."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-center mb-6">
                  <div className="h-24 w-24 rounded-full bg-amber-100 flex items-center justify-center text-2xl font-bold text-amber-800 mx-auto mb-4">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <h2 className="text-xl font-bold">{user.email}</h2>
                  <p className="text-gray-600">Member since {new Date(user.created_at || Date.now()).toLocaleDateString()}</p>
                </div>

                <nav className="space-y-2">
                  <Link 
                    to="/account"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-amber-50 text-amber-700"
                  >
                    <User size={20} />
                    <span>Profile</span>
                  </Link>
                  <Link 
                    to="/bookings"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
                  >
                    <Clock size={20} />
                    <span>My Bookings</span>
                  </Link>
                  <Link 
                    to="/account/reviews"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
                  >
                    <Star size={20} />
                    <span>My Reviews</span>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 w-full"
                  >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h1 className="text-2xl font-bold">Account Details</h1>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user.email || ''}
                        disabled
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={user.user_metadata?.full_name || 'Not provided'}
                        disabled
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Type
                      </label>
                      <input
                        type="text"
                        value="Google Account"
                        disabled
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Member Since
                      </label>
                      <input
                        type="text"
                        value={new Date(user.created_at || Date.now()).toLocaleDateString()}
                        disabled
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Account Activity</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-700 mb-1">0</div>
                        <div className="text-sm text-green-600">Completed Safaris</div>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-amber-700 mb-1">0</div>
                        <div className="text-sm text-amber-600">Upcoming Trips</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700 mb-1">0</div>
                        <div className="text-sm text-blue-600">Reviews Written</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Preferences</h2>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="emailNotifications"
                          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                        />
                        <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                          Receive email notifications about special offers and new packages
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="newsletter"
                          className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                        />
                        <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                          Subscribe to our monthly newsletter
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <Button variant="primary">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-8 bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">Recent Activity</h2>
                </div>
                <div className="p-6">
                  <div className="text-center text-gray-500 py-8">
                    No recent activity to display
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;