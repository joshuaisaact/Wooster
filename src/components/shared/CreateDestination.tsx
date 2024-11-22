import { FormProvider, useForm } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useCreateDestination } from '@/lib/query/destinations';

interface CreateDestinationProps {
  onClose?: () => void;
  className?: string;
}

interface DestinationFormData {
  destination: string;
}

function CreateDestination({ onClose, className }: CreateDestinationProps) {
  const { mutate, isPending } = useCreateDestination(onClose);

  const form = useForm<DestinationFormData>({
    defaultValues: {
      destination: '',
    },
  });

  async function onSubmit(data: DestinationFormData) {
    toast.promise(
      new Promise((resolve, reject) => {
        mutate(
          { destinationName: data.destination },
          {
            onSuccess: (data) => {
              resolve(data.destination);
            },
            onError: reject,
          },
        );
      }),
      {
        loading: 'Fetching your destination...',
        success: () => '🎉 Destination created successfully! Time to explore!',
        error: (err) => `${err instanceof Error ? err.message : 'Please try again'}`,
      },
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-6 space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-green-900 dark:text-white/95">
          Add a Destination
        </h2>
        <p className="text-sm text-gray-600 dark:text-green-100/70">
          Add a new destination to your list
        </p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-medium text-gray-900 dark:text-white/90">
                  Destination Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter destination name"
                    className="bg-white/50 text-gray-900 transition-shadow duration-200 focus:ring-2 focus:ring-green-500/20 dark:bg-green-800/30 dark:text-green-100 dark:placeholder-green-100/50 dark:focus:ring-green-400/20"
                    {...field}
                    required
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-600 dark:text-green-100/70">
                  Where would you like to go?
                </FormDescription>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-green-800 font-medium tracking-tight transition-all duration-200 hover:bg-green-700 active:scale-[0.98] dark:bg-green-600 dark:text-white/90 dark:hover:bg-green-700"
          >
            {isPending ? 'Adding...' : 'Add Destination'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default CreateDestination;
