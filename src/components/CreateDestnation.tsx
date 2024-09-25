import { useForm, FormProvider } from 'react-hook-form';
import { Destination } from '@/types/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FormData {
  destination: string;
}

interface CreateDestinationProps {
  addNewDestination?: (Destination: Destination) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

function CreateDestination({ addNewDestination, isLoading, setIsLoading }: CreateDestinationProps) {
  const form = useForm({
    defaultValues: {
      destination: '', // The only input field we need for this form
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const formattedData = {
      destination: data.destination,
    };

    console.log(JSON.stringify(formattedData));

    try {
      const response = await fetch(`http://localhost:4000/newdestination`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        const newDestination = result.destination;
        if (addNewDestination) {
          addNewDestination(newDestination);
        } else {
          console.warn('addNewDestination is undefined');
        }
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
