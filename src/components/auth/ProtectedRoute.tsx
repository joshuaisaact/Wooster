import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAppContext } from '@/hooks/useAppContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          dispatch({ type: 'RESET_STATE' });
          navigate('/', { replace: true });
        }
      } catch (error) {
        // If we can't check the session, assume we're logged out
        console.error('Error checking auth:', error);
        dispatch({ type: 'RESET_STATE' });
        navigate('/', { replace: true });
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        dispatch({ type: 'RESET_STATE' });
        navigate('/', { replace: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, dispatch]);

  return children;
}

export default ProtectedRoute;
