import { tripService } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useShareTrip() {
  return useMutation({
    mutationFn: async (tripId: string) => {
      const response = await tripService.createShareLink(tripId);
      return response.shareCode;
    },
    onSuccess: (shareCode) => {
      const shareUrl = `${window.location.origin}/shared/${shareCode}`;

      // Copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      toast.success('Share link copied to clipboard!');

      // Open in new tab
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    },
    onError: () => {
      toast.error('Failed to create share link');
    },
  });
}
