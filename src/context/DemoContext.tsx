import { createContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // adjust to your supabase client import path

interface DemoContextType {
  isDemo: boolean;
  isDemoMode: boolean;
  loginAsDemo: () => Promise<void>;
  toggleDemoMode: () => void;
}
export const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isDemo, setIsDemo] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const checkDemoStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase.from('profiles').select('is_demo').eq('id', user.id).single();

      setIsDemo(!!data?.is_demo);
    };

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkDemoStatus();
    });

    // Initial check
    checkDemoStatus();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []); // This is fine now as supabase is imported, not from props/context

  const toggleDemoMode = () => {
    setIsDemoMode((prevState) => !prevState);
  };

  const loginAsDemo = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'demo@wooster.app',
      password: 'demo-password',
    });

    if (error) {
      console.error('Demo login failed:', error.message);
    } else {
      const { error } = await supabase
        .from('profiles')
        .update({ is_demo: true })
        .eq('email', 'demo@wooster.app');

      if (error) {
        console.error('Failed to update demo user profile:', error.message);
      }
    }
  };

  return (
    <DemoContext.Provider value={{ isDemo, isDemoMode, loginAsDemo, toggleDemoMode }}>
      {children}
    </DemoContext.Provider>
  );
}
