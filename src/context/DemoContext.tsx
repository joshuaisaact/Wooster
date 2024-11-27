import { createContext, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

import { useDemo } from '@/hooks/useDemo';
import { queryKeys } from '@/lib/query/keys';

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
  const queryClient = useQueryClient();
  const demoState = useDemo();

  // Handle auth state changes
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        queryClient.setQueryData(queryKeys.demo.profile(), { is_demo: false });
        queryClient.setQueryData(queryKeys.demo.mode(), false);
      } else {
        queryClient.invalidateQueries({ queryKey: queryKeys.demo.profile() });
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  return <DemoContext.Provider value={demoState}>{children}</DemoContext.Provider>;
}
