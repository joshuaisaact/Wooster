import { format } from 'date-fns';
import { cn } from '@/lib/utils';

import { FormProvider, useForm, Controller } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Slider } from '../ui/slider';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/hooks/useAppContext';
import { Destination } from '@/types/types';
import { useCreateTrip } from '@/hooks/trip/useCreateTrip';

interface CreateTripProps {
  location: Destination | null;
  onClose?: () => void;
  className?: string;
}

interface TripFormData {
  days: number;
  startDate: Date | undefined;
  location?: string;
}

function CreateTrip({ location, onClose, className }: CreateTripProps) {
  const { state } = useAppContext();
  const { isLoading } = state;
  const { handleCreateTrip } = useCreateTrip(onClose);

  const form = useForm<TripFormData>({
    defaultValues: {
      days: 2,
      startDate: undefined,
      location: location?.destinationName || '',
    },
  });

  async function onSubmit(data: TripFormData) {
    try {
      await handleCreateTrip({
        days: data.days,
        location: location?.destinationName || data.location || '',
        startDate: data.startDate,
      });
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="mb-6 space-y-1">
        <h2 className="text-xl font-semibold tracking-tight text-green-900">Create a Trip</h2>
        <p className="text-sm text-gray-600">Plan your next adventure</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-4 text-gray-600">
          <span className="animate-pulse">Creating your trip...</span>
        </div>
      ) : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="days"
              render={({ field }) => (
                <FormItem>
                  <Controller
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="font-medium text-gray-900">Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  'w-full justify-start bg-white/50 font-normal hover:bg-white/80',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4 text-gray-900" />
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span className="text-muted-foreground text-gray-900">
                                    Pick a date
                                  </span> // Changed from text-gray-600
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              className="rounded-md border bg-white p-3"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription className="text-xs text-gray-600">
                          When do you want to start your trip?
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormLabel className="mt-4 flex justify-between font-medium text-gray-900">
                    Duration
                    <span className="font-normal text-gray-600">{field.value} days</span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      min={2}
                      max={5}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                      className="py-4"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-600">
                    Select the number of days for your trip
                  </FormDescription>
                </FormItem>
              )}
            />

            {location ? (
              <FormItem className="space-y-2">
                <FormLabel className="font-medium text-gray-900">Destination</FormLabel>
                <FormControl>
                  <Input
                    value={location.destinationName}
                    readOnly
                    className="bg-white/50 text-base text-gray-900"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-600">
                  Your destination
                </FormDescription>
              </FormItem>
            ) : (
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-gray-900">Destination</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a destination"
                        className="bg-white/50 text-gray-900 transition-shadow duration-200 focus:ring-2 focus:ring-green-500/20"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-gray-600">
                      Where do you want to go?
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}

            <Button
              type="submit"
              className="w-full bg-green-700 font-medium tracking-tight transition-all duration-200 hover:bg-green-800 active:scale-[0.98]"
            >
              Let's Go!
            </Button>
          </form>
        </FormProvider>
      )}
    </div>
  );
}

export default CreateTrip;
