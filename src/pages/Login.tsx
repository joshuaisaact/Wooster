import { Logo } from '@/components/layout/Logo';
import { LoginForm } from '@/components/auth/LoginForm';

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-green-800 to-green-900 px-4">
      <div className="mb-8 flex flex-col items-center">
        <Logo height="h-32" image="/wooster-homepage-no-bg.png" />
        <h1 className="mt-6 text-3xl font-black text-white">Wooster</h1>
        <p className="mt-2 text-lg text-green-100">Your trip companion</p>
      </div>

      <LoginForm />
    </div>
  );
}
