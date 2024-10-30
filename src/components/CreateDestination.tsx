import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/hooks/useAppContext';
import { createDestination } from '@/services/apiService';

interface FormData {
  destination: string;
}

function CreateDestination() {
  const { state, dispatch } = useAppContext();
  const { isLoading } = state;

  const form = useForm({
    defaultValues: {
      destination: '', // The only input field we need for this form
    },
  });

  // Create a new destination via form submission and API service imported function
  async function onSubmit(data: FormData) {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const newDestination = await createDestination(data.destination); // Call the API service
      dispatch({ type: 'ADD_DESTINATION', payload: newDestination }); // Dispatch action to add new destination
    } catch (error) {
      console.error('Error creating destination:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Add a Destination</CardTitle>
        <CardDescription>Add a new destination to your list</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div>Creating your destination...</div>
        ) : (
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter destination name" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-green-500">
                Add
              </Button>
            </form>
          </FormProvider>
        )}
      </CardContent>
    </Card>
  );
}

export default CreateDestination;
