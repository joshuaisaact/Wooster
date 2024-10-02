import { AuthState, AuthAction } from '@/types/types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};
function authReducer(state: AuthState = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error('Unknown action');
  }
}

export { initialState, authReducer };
