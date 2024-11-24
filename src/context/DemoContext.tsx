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
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    const checkDemoStatus = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setIsDemo(false);
          setIsDemoMode(false);
          return;
        }

        const { data } = await supabase
          .from('profiles')
          .select('is_demo')
          .eq('id', user.id)
          .maybeSingle();

        setIsDemo(Boolean(data?.is_demo));
        if (data?.is_demo) {
          setIsDemoModalOpen(true);
        }
      } catch (error) {
        console.error('Error checking demo status:', error);
        setIsDemo(false);
        setIsDemoMode(false);
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

  const loginAsDemo = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'demo@wooster.app',
        password: 'demo-password',
      });

      if (error) {
        console.error('Demo login failed:', error.message);
      } else {
        setIsDemoModalOpen(true);
      }
    } catch (error) {
      console.error('Demo login failed:', error);
    }
  };

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
