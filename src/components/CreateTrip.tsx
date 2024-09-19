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

interface CreateTripProps {
  baseURL: string;
  addNewTrip: (trip: Trip) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

function CreateTrip({ addNewTrip, isLoading, setIsLoading }: CreateTripProps) {
  const form = useForm({
    defaultValues: {
      days: 1,
      location: '',
      date: undefined,
    },
  });

  const navigate = useNavigate();

  async function onSubmit(data: { days: number; location: string; date: Date | undefined }) {
    setIsLoading(true);
    const formattedData = {
      days: data.days,
      location: data.location,
      date: data.date ? data.date.toISOString() : null, // Convert Date to ISO string
      itinerary: [],
    };

    console.log(JSON.stringify(formattedData));

    try {
      const response = await fetch(`http://localhost:4000/newtrip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        addNewTrip(result); // Add the new trip to the parent state
        navigate(`/trips/${result.trip.id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
                      name="date"
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
                        min={1}
                        max={3}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                    <FormDescription>Select the number of days for your trip (1-3)</FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a location" {...field} required />
                    </FormControl>
                    <FormDescription>Where do you want to go?</FormDescription>
                  </FormItem>
                )}
              />

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
