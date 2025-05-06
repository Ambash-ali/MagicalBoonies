import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Container from '../../components/ui/Container';
import GoogleSignInButton from '../../components/auth/GoogleSignInButton';

const SignUp: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Sign Up | MagicalBoonies</title>
        <meta 
          name="description" 
          content="Create your MagicalBoonies account to start planning your perfect African safari adventure."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <Container size="sm">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif font-bold mb-2">Create Account</h1>
              <p className="text-gray-600">
                Join MagicalBoonies to start planning your perfect African adventure
              </p>
            </div>

            <div className="space-y-4">
              <GoogleSignInButton mode="signup" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SignUp;