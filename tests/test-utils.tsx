// tests/test-utils.tsx
import { ReactElement, ReactNode } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

interface WrapperProps {
  children: ReactNode;
}

// Create a custom render function that includes providers
function render(ui: ReactElement, options = {}) {
  function Wrapper({ children }: WrapperProps) {
    return <MemoryRouter>{children}</MemoryRouter>;
  }

  return rtlRender(ui, {
    wrapper: Wrapper,
    ...options,
  });
}

// Re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { render };
