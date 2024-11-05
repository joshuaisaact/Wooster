import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
    <>
      <div className="md:hidden">
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
                  defaultButtonBackground: 'rgba(255, 255, 255, 0.15)',
                  defaultButtonBackgroundHover: 'rgba(255, 255, 255, 0.25)',
                  defaultButtonText: 'white',
                  dividerBackground: 'rgba(255, 255, 255, 0.2)',
                },
              },
            },
            style: {
              button: {
                flex: '1',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
              },
              divider: {
                textAlign: 'center',
              },
              container: {
                textAlign: 'center',
              },
            },
          }}
          localization={{
            variables: {
              sign_in: {
                social_provider_text: 'Sign in with {{provider}}',
              },
            },
          }}
          providers={['google', 'github']}
          onlyThirdPartyProviders
        />
      </div>
      <Card className="hidden w-full max-w-md border-white/20 bg-white/10 text-center backdrop-blur-sm md:block">
        <CardHeader className="space-y-1 text-center">
          {/* <CardTitle className="text-center text-2xl font-bold tracking-tight text-white">
            Welcome
          </CardTitle>
          <CardDescription className="text-center text-green-100/80">
            Plan and track your adventures
          </CardDescription> */}
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
                    defaultButtonBackground: 'rgba(255, 255, 255, 0.15)',
                    defaultButtonBackgroundHover: 'rgba(255, 255, 255, 0.25)',
                    defaultButtonText: 'white',
                    dividerBackground: 'rgba(255, 255, 255, 0.2)',
                  },
                },
              },
              style: {
                button: {
                  flex: '1',
                  flexDirection: 'column',
                  gap: '8px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                },
                divider: {
                  textAlign: 'center',
                },
                container: {
                  textAlign: 'center',
                },
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  social_provider_text: 'Sign in with {{provider}}',
                },
              },
            }}
            providers={['google', 'github']}
            onlyThirdPartyProviders
          />
        </CardContent>
      </Card>
    </>
  );
}
