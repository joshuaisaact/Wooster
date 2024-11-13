import React, { ReactElement, ReactNode } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { AppProvider } from '@/context/AppContext';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'sonner';

interface WrapperProps {
  children: ReactNode;
}

function render(ui: ReactElement, options = {}) {
  function Wrapper({ children }: WrapperProps) {
    const methods = useForm();
    return (
      <AuthProvider>
        <AppProvider>
          <MemoryRouter>
            <FormProvider {...methods}>
              {children} <Toaster />
            </FormProvider>
          </MemoryRouter>
        </AppProvider>
      </AuthProvider>
    );
  }

  return rtlRender(ui, {
    wrapper: Wrapper,
    ...options,
  });
}

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { render };
