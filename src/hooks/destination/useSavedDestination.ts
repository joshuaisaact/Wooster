import { useSaveDestinationActions } from '@/lib/query/destinations';

export function useSaveDestination() {
  const { toggleSaveDestination, isDestinationSaved, isPending } = useSaveDestinationActions();

  return {
    toggleSaveDestination,
    isDestinationSaved,
    isPending,
  };
}
