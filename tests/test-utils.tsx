import { ReactElement, ReactNode } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { AppProvider } from '@/context/AppContext';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface WrapperProps {
  children: ReactNode;
  queryClient: QueryClient;
}

function render(
  ui: ReactElement,
  {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    }),
    ...options
  } = {},
) {
  function Wrapper({ children, queryClient }: WrapperProps) {
    const methods = useForm();
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppProvider>
            <MemoryRouter>
              <FormProvider {...methods}>
                {children}
                <Toaster />
              </FormProvider>
            </MemoryRouter>
          </AppProvider>
        </AuthProvider>
      </QueryClientProvider>
    );
  }

  return rtlRender(ui, {
    wrapper: ({ children }) => <Wrapper queryClient={queryClient}>{children}</Wrapper>,
    ...options,
  });
}

// Helper function to create a fresh QueryClient for tests
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,

        staleTime: Infinity,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { render };
