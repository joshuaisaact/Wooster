import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { queryKeys } from '@/lib/query/keys';

interface DemoProfile {
  is_demo: boolean;
}

export const useDemo = () => {
  const queryClient = useQueryClient();

  const { data: demoProfile } = useQuery({
    queryKey: queryKeys.demo.profile(),
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return { is_demo: false };

      const { data } = await supabase
        .from('profiles')
        .select('is_demo')
        .eq('id', user.id)
        .maybeSingle();

      return data as DemoProfile | null;
    },
  });

  const { data: isDemoModalOpen = false } = useQuery({
    queryKey: queryKeys.demo.modal(),
    queryFn: () => false,
    staleTime: Infinity,
  });

  const { data: isDemoMode = false } = useQuery({
    queryKey: queryKeys.demo.mode(),
    queryFn: () => false,
    staleTime: Infinity,
  });

  const loginMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'demo@wooster.app',
        password: 'demo-password',
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.demo.modal(), true);
      queryClient.invalidateQueries({ queryKey: queryKeys.demo.profile() });
    },
  });

  return {
    isDemo: demoProfile?.is_demo ?? false,
    isDemoMode,
    isDemoModalOpen,
    loginAsDemo: () => loginMutation.mutateAsync(),
    toggleDemoMode: () => {
      queryClient.setQueryData(queryKeys.demo.mode(), !isDemoMode);
    },
    resetDemoState: () => {
      queryClient.setQueryData(queryKeys.demo.profile(), { is_demo: false });
      queryClient.setQueryData(queryKeys.demo.mode(), false);
      queryClient.setQueryData(queryKeys.demo.modal(), true);
    },
    closeDemoModal: () => {
      queryClient.setQueryData(queryKeys.demo.modal(), false);
    },
  };
};
