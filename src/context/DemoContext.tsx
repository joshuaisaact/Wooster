import { createContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface DemoContextType {
  isDemo: boolean;
  isDemoMode: boolean;
  isDemoModalOpen: boolean;
  loginAsDemo: () => Promise<void>;
  toggleDemoMode: () => void;
  resetDemoState: () => void;
  closeDemoModal: () => void;
}

export const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isDemo, setIsDemo] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(true);

  useEffect(() => {
    const checkDemoStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setIsDemo(false);
        setIsDemoMode(false);
        return;
      }

      const { data } = await supabase.from('profiles').select('is_demo').eq('id', user.id).single();
      setIsDemo(Boolean(data?.is_demo));

      // Reset modal state when demo status changes
      if (data?.is_demo) {
        setIsDemoModalOpen(true);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setIsDemo(false);
        setIsDemoMode(false);
      } else {
        checkDemoStatus();
      }
    });

    checkDemoStatus();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleDemoMode = () => {
    setIsDemoMode((prevState) => !prevState);
  };

  const resetDemoState = () => {
    setIsDemo(false);
    setIsDemoMode(false);
    setIsDemoModalOpen(true);
  };

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
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
      setIsDemoModalOpen(true);
    }
  };

  return (
    <DemoContext.Provider
      value={{
        isDemo,
        isDemoMode,
        isDemoModalOpen,
        loginAsDemo,
        toggleDemoMode,
        resetDemoState,
        closeDemoModal,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}
