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
import { Trip } from '@/types/types';
import { Action } from '@/store/reducer';

interface CreateTripProps {
  addNewTrip: (trip: Trip) => void;
  isLoading: boolean;
  dispatch: React.Dispatch<Action>;
  location?: string;
}

function CreateTrip({ isLoading, dispatch, location }: CreateTripProps) {
  const form = useForm({
    defaultValues: {
      days: 2,
      location: location,
      start_date: undefined,
    },
  });

  const navigate = useNavigate();

  async function onSubmit(data: { days: number; location: string; start_date: Date | undefined }) {
    dispatch({ type: 'SET_LOADING', payload: true });
    const formattedData = {
      days: data.days,
      location: data.location,
      start_date: data.start_date ? data.start_date.toISOString() : null, // Convert Date to ISO string
      itinerary: [],
    };

    console.log(JSON.stringify(formattedData));

    try {
      const response = await fetch(`http://localhost:4000/newtripdb`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const result = await response.json();

        dispatch({ type: 'ADD_TRIP', payload: result.trip });

        // Use the correct path for the trip_id
        if (result.trip && result.trip.trip_id) {
          navigate(`/trips/${result.trip.trip_id}`);
        }
      }
    } catch (error) {
      console.error(error);
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
                      name="start_date"
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
