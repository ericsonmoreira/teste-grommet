import { Route, Routes } from 'react-router-dom';
import {
  ClockPage,
  DashboardPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  SettingsPage,
  SignUpPage,
} from '../pages';
import { ROUTER_NAMES } from './names';
import { PrivateRoutes } from './PrivateRoutes';

export const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTER_NAMES.login} element={<LoginPage />} />
      <Route path={ROUTER_NAMES.signUp} element={<SignUpPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path={ROUTER_NAMES.home} element={<HomePage />} />
        <Route path={ROUTER_NAMES.clock} element={<ClockPage />} />
        <Route path={ROUTER_NAMES.settings} element={<SettingsPage />} />
        <Route path={ROUTER_NAMES.dashboard} element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
