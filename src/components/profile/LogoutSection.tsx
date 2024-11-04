import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/hooks/useAppContext';
import { toast } from 'sonner';

export function LogoutSection() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAppContext();

  const forceLogout = () => {
    // Clear all Supabase storage
    window.localStorage.removeItem('sb-gjylcnjrzwtxtawyqyif-auth-token');

    // Clear any other app storage you might have
    // window.localStorage.clear(); // Use this if you want to clear everything

    // Reset app state
    dispatch({ type: 'RESET_STATE' });

    // Navigate to login
    navigate('/', { replace: true });
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      try {
        // Try normal signout first
        await supabase.auth.signOut();
      } catch (error) {
        console.warn('Normal signout failed, forcing logout:', error);
      }

      // Regardless of whether signOut succeeded, force a logout
      forceLogout();
    } catch (error) {
      console.error('Error during sign out:', error);
      toast.error('There was an issue signing out');
      // Still force logout even if there's an error
      forceLogout();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <LogOut className="h-5 w-5 text-gray-500" />
        <div>
          <h2 className="font-semibold tracking-tight text-gray-900 dark:text-white/90">
            Sign Out
          </h2>
          <p className="font-normal text-gray-600 dark:text-green-100/80">
            Sign out of your account
          </p>
        </div>
      </div>

      <Button
        onClick={handleLogout}
        variant="destructive"
        className="w-full transition-colors sm:w-auto"
        disabled={isLoading}
      >
        {isLoading ? 'Signing out...' : 'Sign Out'}
      </Button>
    </div>
  );
}
