import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import Container from '../../components/ui/Container';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/');
      } else {
        navigate('/auth/signin');
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Container size="sm">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Completing authentication...</p>
        </div>
      </Container>
    </div>
  );
};

export default AuthCallback;