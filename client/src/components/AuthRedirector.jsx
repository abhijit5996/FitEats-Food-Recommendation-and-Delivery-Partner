import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const AuthRedirector = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🔄 AuthRedirector mounted', { isLoaded, hasUser: !!user });
    
    if (isLoaded && user) {
      console.log('👤 User loaded:', { id: user.id, email: user.primaryEmailAddress?.emailAddress });
      
      // Check if user has completed preferences
      const checkPreferences = async () => {
        try {
          console.log('📡 Checking preferences for user:', user.id);
          const response = await fetch(`/api/user/preferences/check/${user.id}`);
          
          if (!response.ok) {
            console.error('❌ Preferences check failed:', response.status, response.statusText);
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('✅ Preferences check response:', data);
          
          if (data.hasCompletedPreferences) {
            // User has completed preferences, redirect to home
            console.log('✨ User has preferences, redirecting to home');
            navigate('/');
          } else {
            // User hasn't completed preferences, redirect to preferences form
            console.log('📝 User needs to complete preferences, redirecting to /preferences');
            navigate('/preferences');
          }
        } catch (error) {
          console.error('💥 Error checking preferences:', error);
          // Fallback to preferences form if there's an error
          console.log('🔧 Fallback: redirecting to /preferences');
          navigate('/preferences');
        }
      };

      checkPreferences();
    }
  }, [user, isLoaded, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffc107] mx-auto"></div>
        <p className="mt-4 text-gray-300">Setting up your experience...</p>
      </div>
    </div>
  );
};

export default AuthRedirector;