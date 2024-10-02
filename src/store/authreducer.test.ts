import { describe, test, expect } from 'vitest';
import { authReducer, initialState } from './authreducer';
import { AuthState, AuthAction } from '@/types/types';

// Mock data for a sample user
const mockUser = {
  id: 1,
  name: 'Josh',
  email: 'josh@example.com',
  password: '1234',
  avatar: 'josh.png',
};

describe('authReducer', () => {
  test('should handle LOGIN action', () => {
    const loginAction: AuthAction = { type: 'LOGIN', payload: mockUser };
    const expectedState: AuthState = {
      user: mockUser,
      isAuthenticated: true,
    };

    const newState = authReducer(initialState, loginAction);
    expect(newState).toEqual(expectedState);
  });

  test('should handle LOGOUT action', () => {
    const logoutAction: AuthAction = { type: 'LOGOUT' };
    const currentState: AuthState = {
      user: mockUser,
      isAuthenticated: true,
    };

    const expectedState: AuthState = {
      user: null,
      isAuthenticated: false,
    };

    const newState = authReducer(currentState, logoutAction);
    expect(newState).toEqual(expectedState);
  });

  test('should throw an error for unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    expect(() => authReducer(initialState, unknownAction as AuthAction)).toThrowError(
      'Unknown action',
    );
  });
});
