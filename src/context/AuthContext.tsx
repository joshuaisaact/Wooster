import { authReducer, initialState } from '@/store/authreducer';
import { createContext, ReactNode, useContext, useReducer } from 'react';
import { User } from '@/types/types';
import { DUMMY_USER } from '@/store/dummyData';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(authReducer, initialState);

  function login(email: string, password: string) {
    if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
      dispatch({ type: 'LOGIN', payload: DUMMY_USER });
    }
  }

  function logout() {
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('AuthContext was used outside the AuthProvider!');
  }
  return context;
}

export { AuthProvider, useAuth };
