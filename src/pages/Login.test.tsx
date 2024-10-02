import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import { useAuth } from '@/context/AuthContext';

// Mock the useNavigate hook
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

// Mock the useAuth hook
vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('Login Component', () => {
  const mockNavigate = vi.fn();
  const mockLogin = vi.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isAuthenticated: false,
    });
  });

  test('renders form elements', () => {
    render(<Login />);

    // Check that the Logo component is rendered
    expect(screen.getByAltText(/wooster/i)).toBeInTheDocument();

    // Check email and password inputs
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Check login button
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('updates email and password on input', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Check that input values are updated
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('calls login function on form submit', () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByText(/login/i);

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(loginButton);

    // Check that login is called with the correct arguments
    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  test('redirects to home when authenticated', () => {
    // Set isAuthenticated to true
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isAuthenticated: true,
    });

    render(<Login />);

    // Check that navigate is called to redirect to home
    expect(mockNavigate).toHaveBeenCalledWith('/home', { replace: true });
  });
});
