import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const AuthRedirector = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && user) {
      // Check if user has completed preferences
      const checkPreferences = async () => {
        try {
          const response = await fetch(`/api/user/preferences/check/${user.id}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data.hasCompletedPreferences) {
            // User has completed preferences, redirect to home
            navigate('/');
          } else {
            // User hasn't completed preferences, redirect to preferences form
            navigate('/preferences');
          }
        } catch (error) {
          console.error('Error checking preferences:', error);
          // Fallback to preferences form if there's an error
          navigate('/preferences');
        }
      };

      checkPreferences();
    }
  }, [user, isLoaded, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your experience...</p>
      </div>
    </div>
  );
};

export default AuthRedirector;