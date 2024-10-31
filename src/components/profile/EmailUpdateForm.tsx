import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEmailForm } from '@/hooks/profile/useProfileForms';
import { Mail } from 'lucide-react';

export function EmailUpdateForm() {
  const { form, onSubmit } = useEmailForm();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Mail className="h-5 w-5 text-gray-500" />
        <div>
          <h2 className="font-semibold tracking-tight text-gray-900">Email Address</h2>
          <p className="text-sm text-gray-500">Update your email address</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">New Email Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter new email" className="bg-white/50" />
                </FormControl>
                <FormDescription className="text-xs">
                  We'll send a verification link to this email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-green-600 text-white transition-colors hover:bg-green-700 sm:w-auto"
          >
            Update Email
          </Button>
        </form>
      </Form>
    </div>
  );
}
