import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Header from '../components/Header';

// Validation schema using Zod
const emailSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});

function Profile() {
  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  function onEmailSubmit(data: any) {
    console.log('Email Updated:', data);
  }

  function onPasswordSubmit(data: any) {
    console.log('Password Updated:', data);
  }

  return (
    <div className="text-text flex h-full flex-col items-center pt-10">
      <Header>Settings</Header>
      <div className="bg-background mt-10 w-full max-w-4xl space-y-10 rounded-lg p-6 shadow-md">
        {/* Update Email Section */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Update Email</h2>
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
              className="flex flex-col space-y-4"
            >
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter new email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">
                Update Email
              </Button>
            </form>
          </Form>
        </div>

        {/* Change Password Section */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Change Password</h2>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="flex flex-col space-y-4"
            >
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} placeholder="Enter current password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} placeholder="Enter new password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                Change Password
              </Button>
            </form>
          </Form>
        </div>

        {/* Logout Section */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Log Out</h2>
          <Button
            onClick={() => {
              // Handle logout functionality
              alert('Logging out...');
            }}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
