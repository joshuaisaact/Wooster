import { createContext, useState, useEffect, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { setupAxiosAuth } from '@/lib/axios';

interface AuthContextType {
  session: Session | null;
  isAuthReady: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  session: null,
  isAuthReady: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    async function initializeAuth() {
      // Get initial session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Set the session
      setSession(session);

      // Set up axios auth only after we have the session
      await setupAxiosAuth(supabase);

      // Mark auth as ready
      setIsAuthReady(true);
    }

    initializeAuth();

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      // Re-setup axios auth when session changes
      await setupAxiosAuth(supabase);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ session, isAuthReady }}>{children}</AuthContext.Provider>;
}
