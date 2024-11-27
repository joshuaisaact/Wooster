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
import { Destination } from '@/types';
import { toast } from 'sonner';
import withDemoDisabled from '../ui/WithDemoDisabled';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { useCreateTrip } from '@/hooks/trip/useCreateTrip';

interface CreateTripProps {
  location: Destination | null;
  onClose?: () => void;
  className?: string;
  title?: boolean;
}

interface TripFormData {
  days: number;
  startDate: Date | undefined;
  location?: string;
  selectedCategories?: string[];
}

const categories = [
  'Adventure',
  'Cultural',
  'Nature',
  'Food & Drink',
  'Shopping',
  'Entertainment',
] as const;

function CreateTrip({ location, onClose, className, title }: CreateTripProps) {
  const { mutate, isPending } = useCreateTrip(onClose);
  const SubmitButton = withDemoDisabled(Button);
  const [open, setOpen] = useState(false);

  const form = useForm<TripFormData>({
    defaultValues: {
      days: 2,
      startDate: undefined,
      location: location?.destinationName || '',
      selectedCategories: [],
    },
  });

  async function onSubmit(data: TripFormData) {
    toast.promise(
      new Promise((resolve, reject) => {
        mutate(
          {
            days: data.days,
            location: location?.destinationName || data.location || '',
            startDate: data.startDate || undefined,
            selectedCategories: data.selectedCategories,
          },
          {
            onSuccess: resolve,
            onError: reject,
          },
        );
      }),
      {
        loading: 'Planning your adventure...',
        success: () => '🎉 Trip created successfully! Time to pack your bags!',
        error: (err) =>
          `Failed to create trip: ${err instanceof Error ? err.message : 'Unknown error'}`,
      },
    );
  }

  return (
    <div className={cn('w-full', className)}>
      {!title && (
        <div className="mb-6 space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-green-900 dark:text-white/95">
            Create a Trip
          </h2>
          <p className="text-sm text-gray-600 dark:text-green-100/70">Plan your next adventure</p>
        </div>
      )}

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
                      <FormLabel className="font-medium text-gray-900 dark:text-white/90">
                        Start Date
                      </FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start bg-white/50 font-normal text-gray-600 hover:bg-white/80 dark:bg-green-800/30 dark:text-green-100/90 dark:hover:bg-green-800/40',
                                !field.value && 'text-muted-foreground dark:text-green-100/70',
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 text-gray-900 dark:text-green-100" />
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span className="text-gray-900 dark:text-green-100/90">
                                  Pick a date
                                </span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setOpen(false);
                            }}
                            initialFocus
                            className="rounded-md border bg-white p-3 dark:border-white/10 dark:bg-green-800/30"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription className="text-xs text-gray-600 dark:text-green-100/70">
                        When do you want to start your trip?
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormLabel className="mt-4 flex justify-between font-medium text-gray-900 dark:text-white/90">
                  Duration
                  <span className="font-normal text-gray-600 dark:text-green-100/80">
                    {field.value} days
                  </span>
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
                <FormDescription className="text-xs text-gray-600 dark:text-green-100/70">
                  Select the number of days for your trip
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="selectedCategories"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-medium text-gray-900 dark:text-white/90">
                  Activity Categories
                </FormLabel>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const isSelected = field.value?.includes(category);
                    return (
                      <Badge
                        key={category}
                        variant="outline"
                        className={cn(
                          'cursor-pointer select-none px-3 py-1 text-sm transition-all hover:scale-105 active:scale-[0.98]',
                          isSelected
                            ? 'border-transparent bg-green-700 text-white hover:bg-green-800 dark:bg-green-600 dark:text-white/90 dark:hover:bg-green-700'
                            : 'border-gray-200/50 bg-white/50 text-gray-600 hover:bg-white/80 hover:text-gray-900 dark:border-white/10 dark:bg-green-800/30 dark:text-green-100/90 dark:hover:bg-green-800/40',
                        )}
                        onClick={() => {
                          const updatedCategories = isSelected
                            ? (field.value || []).filter((value) => value !== category)
                            : [...(field.value || []), category];
                          field.onChange(updatedCategories);
                        }}
                      >
                        {category}
                      </Badge>
                    );
                  })}
                </div>
                <FormDescription className="text-xs text-gray-600 dark:text-green-100/70">
                  {field.value?.length === 0
                    ? 'Choose categories to personalize your activity feed. If no categories are selected, all types will be included.'
                    : field.value?.length === 1
                      ? 'Your itinerary will only include activities from this category.'
                      : `Your itinerary will include activities from ${field.value?.length} selected categories.`}
                </FormDescription>
              </FormItem>
            )}
          />

          {location ? (
            <FormItem className="space-y-2">
              <FormLabel className="font-medium text-gray-900 dark:text-white/90">
                Destination
              </FormLabel>
              <FormControl>
                <Input
                  value={location.destinationName}
                  readOnly
                  className="bg-white/50 text-base text-gray-900 dark:bg-green-800/30 dark:text-green-100"
                />
              </FormControl>
              <FormDescription className="text-xs text-gray-600 dark:text-green-100/70">
                Your destination
              </FormDescription>
            </FormItem>
          ) : (
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium text-gray-900 dark:text-white/90">
                    Destination
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a destination"
                      className="bg-white/50 text-gray-900 transition-shadow duration-200 focus:ring-2 focus:ring-green-500/20 dark:bg-green-800/30 dark:text-green-100 dark:focus:ring-green-400/20"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-600 dark:text-green-100/70">
                    Where do you want to go?
                  </FormDescription>
                </FormItem>
              )}
            />
          )}

          <SubmitButton
            type="submit"
            disabled={isPending || form.formState.isSubmitting}
            className="w-full bg-green-700 font-medium tracking-tight transition-all duration-200 hover:bg-green-800 active:scale-[0.98] disabled:opacity-50 dark:bg-green-600 dark:text-white/90 dark:hover:bg-green-700"
          >
            {isPending ? 'Creating...' : "Let's Go!"}
          </SubmitButton>
        </form>
      </FormProvider>
    </div>
  );
}

export default CreateTrip;
