import LoadingSpinner from '@/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const AuthenticatedRoutes = () => {
  console.log('ousll protected routes');

  const { user, authState } = useAuth();

  if (authState.status === 'loading') return <LoadingSpinner />;

  if (authState.status === 'unauthenticated') return <Navigate to="/login" replace />;

  if (user === null) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default AuthenticatedRoutes;
