import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, ReactNode } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/');
    }
  }, [session, navigate]);

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
