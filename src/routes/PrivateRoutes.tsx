import { Navigate, Outlet } from 'react-router-dom';
import { useFirebaseAuth } from '../hooks';
import { ROUTER_NAMES } from './names';

export const PrivateRoutes: React.FC = () => {
  const { user } = useFirebaseAuth();

  return user ? <Outlet /> : <Navigate to={ROUTER_NAMES.login} replace />;
};
