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
import { usePasswordForm } from '@/hooks/profile/useProfileForms';
import { KeyRound } from 'lucide-react';

export function PasswordUpdateForm() {
  const { form, onSubmit } = usePasswordForm();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <KeyRound className="h-5 w-5 text-gray-500" />
        <div>
          <h2 className="font-semibold tracking-tight text-gray-900">Password</h2>
          <p className="text-sm text-gray-500">Change your password</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Current Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    placeholder="Enter current password"
                    className="bg-white/50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    placeholder="Enter new password"
                    className="bg-white/50"
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Password must be at least 6 characters long
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white transition-colors hover:bg-blue-700 sm:w-auto"
          >
            Update Password
          </Button>
        </form>
      </Form>
    </div>
  );
}
