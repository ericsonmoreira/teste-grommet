import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTER_NAMES } from './names';

export const PrivateRoutes: React.FC = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to={ROUTER_NAMES.login} replace />;
};
