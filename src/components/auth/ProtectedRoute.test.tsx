import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ProtectedRoute from './ProtectedRoute';
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

describe('ProtectedRoute', () => {
  test('renders children when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  test('redirects to login when not authenticated', async () => {
    const mockUseAuth = useAuth as jest.Mock;
    mockUseAuth.mockReturnValue({ isAuthenticated: false });

    const mockNavigate = vi.fn();
    const navigateMock = useNavigate as jest.Mock;
    navigateMock.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    expect(screen.queryByText('Protected Content')).toBeNull();
  });
});
