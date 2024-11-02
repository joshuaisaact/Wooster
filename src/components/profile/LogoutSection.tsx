import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

export function LogoutSection() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Error signing out. Please try again.');
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
