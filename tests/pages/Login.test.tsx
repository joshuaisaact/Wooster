import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Login from '@/pages/Login';
import { useAuth } from '@/context/AuthContext';
import { MemoryRouter, useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('Login Page', () => {
  test('renders login page with logo and form', () => {
    (useAuth as jest.Mock).mockReturnValue({
      login: vi.fn(),
      isAuthenticated: false,
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    expect(screen.getByAltText(/wooster/i)).toBeInTheDocument();
    expect(screen.getByText(/your trip companion/i)).toBeInTheDocument();
  });

  test('redirects to home when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      login: vi.fn(),
      isAuthenticated: true,
    });

    const mockNavigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    expect(mockNavigate).toHaveBeenCalledWith('/home', { replace: true });
  });
});
