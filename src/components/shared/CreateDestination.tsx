import { FormProvider, useForm } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/hooks/useAppContext';
import { useCreateDestination } from '@/hooks/destination/useCreateDestination';
import { cn } from '@/lib/utils';

interface CreateDestinationProps {
  onClose?: () => void;
  className?: string;
}

interface DestinationFormData {
  destination: string;
}

function CreateDestination({ onClose, className }: CreateDestinationProps) {
  const { state } = useAppContext();
  const { isLoading } = state;
  const { handleCreateDestination } = useCreateDestination(onClose);

  const form = useForm<DestinationFormData>({
    defaultValues: {
      destination: '',
    },
  });

  async function onSubmit(data: DestinationFormData) {
    try {
      await handleCreateDestination({
        destinationName: data.destination,
      });
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-6 space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-green-900">Add a Destination</h2>
        <p className="text-sm text-gray-600">Add a new destination to your list</p>
      </div>

      {isLoading ? (
        <div className="text-muted-foreground flex items-center justify-center py-4">
          <span className="animate-pulse">Creating your destination...</span>
        </div>
      ) : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium text-gray-900">Destination Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter destination name"
                      className="bg-white/50 transition-shadow duration-200 focus:ring-2 focus:ring-green-500/20"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormDescription className="text-muted-foreground text-xs text-gray-600">
                    Where would you like to go?
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-green-700 font-medium tracking-tight transition-all duration-200 hover:bg-green-800 active:scale-[0.98]"
            >
              Add Destination
            </Button>
          </form>
        </FormProvider>
      )}
    </div>
  );
}

export default CreateDestination;
