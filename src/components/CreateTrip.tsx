import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Slider } from './ui/slider';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/hooks/useAppContext';
import { createTrip } from '@/services/apiService';
import { Destination } from '@/types/types';

interface CreateTripProps {
  location: Destination | null;
}

function CreateTrip({ location }: CreateTripProps) {
  const { state, dispatch } = useAppContext();
  const { isLoading } = state;

  const form = useForm({
    defaultValues: {
      days: 2,
      location: location,
      startDate: undefined,
    },
  });

  const navigate = useNavigate();

  async function onSubmit(data: { days: number; location: string; startDate: Date | undefined }) {
    dispatch({ type: 'SET_LOADING', payload: true });
    const formattedData = {
      // REFACTOR WITH AUTH DO NOT FORGET
      userId: 'e92ad976-973d-406d-92d4-34b6ef182e1a', // Hardcoded userId, refactor later when auth is live
      days: data.days,
      location: data.location,
      start_date: data.startDate ? data.startDate.toISOString() : null, // Convert Date to ISO string
      itinerary: [],
    };

    try {
      const result = await createTrip(formattedData);

      dispatch({ type: 'ADD_TRIP', payload: result.trip });

      if (result.trip && result.trip.tripId) {
        navigate(`/trips/${result.trip.tripId}`);
      }
    } catch (error) {
      console.error('Error creating trip:', error);
      // dispatch({ type: 'SET_ERROR', payload: 'Failed to create trip' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Create a Trip</CardTitle>
        <CardDescription>Plan your next adventure</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div>Creating your trip...</div>
        ) : (
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Form fields go here, same as before */}
              <FormField
                control={form.control}
                name="days"
                render={({ field }) => (
                  <FormItem>
                    <Controller
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    'w-full justify-start text-left font-normal',
                                    !field.value && 'text-muted-foreground',
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? (
                                    format(field.value, 'PPP')
                                  ) : (
                                    <span>Pick a date</span>
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
                                className="bg-white text-black"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>When do you want to start your trip?</FormDescription>
                        </FormItem>
                      )}
                    />
                    <FormLabel className="flex justify-between">
                      Days
                      <span>{field.value}</span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        min={2}
                        max={5}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                    <FormDescription>Select the number of days for your trip </FormDescription>
                  </FormItem>
                )}
              />

              {location ? (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <Input value={location} readOnly className="text-base" />
                  </FormControl>
                  <FormDescription>Your destination</FormDescription>
                </FormItem>
              ) : (
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a destination" {...field} required />
                      </FormControl>
                      <FormDescription>Where do you want to go?</FormDescription>
                    </FormItem>
                  )}
                />
              )}

              <Button type="submit" className="w-full bg-green-500">
                Go!
              </Button>
            </form>
          </FormProvider>
        )}
      </CardContent>
    </Card>
  );
}

export default CreateTrip;
