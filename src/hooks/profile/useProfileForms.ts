import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EmailFormData,
  PasswordFormData,
  emailSchema,
  passwordSchema,
} from '@/lib/validations/profile';

export function useEmailForm() {
  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: EmailFormData) {
    try {
      // TODO: Implement email update logic
      console.log('Email Updated:', data);
    } catch (error) {
      console.error('Failed to update email:', error);
    }
  }

  return { form, onSubmit };
}

export function usePasswordForm() {
  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  async function onSubmit(data: PasswordFormData) {
    try {
      // TODO: Implement password update logic
      console.log('Password Updated:', data);
    } catch (error) {
      console.error('Failed to update password:', error);
    }
  }

  return { form, onSubmit };
}
