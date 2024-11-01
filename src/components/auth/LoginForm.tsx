import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './../../index.css';

export function LoginForm() {
  const { session } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/home', { replace: true });
    }
  }, [session, navigate]);
  return (
    <Card className="w-full max-w-md border-white/20 bg-white/10 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight text-white">Welcome back</CardTitle>
        <CardDescription className="text-green-100/80">
          Sign in to access your trips
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            extend: true,
            variables: {
              default: {
                colors: {
                  brand: '#4A9F76',
                  brandAccent: '#3d8862',
                },
              },
            },
            className: {
              anchor: 'auth-anchor',
              button: 'auth-button',
            },
          }}
          providers={['google', 'github']}
          onlyThirdPartyProviders
        />
      </CardContent>
    </Card>
  );
}
