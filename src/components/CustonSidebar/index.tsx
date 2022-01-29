import { Button, Nav, Sidebar } from 'grommet';
import {
  Clock,
  Dashboard,
  Logout,
  Projects,
  SettingsOption,
} from 'grommet-icons';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSize } from '../../hooks';
import { useAuth } from '../../hooks/useAuth';
import { ROUTER_NAMES } from '../../routes/names';

export interface CustonSidebarLink {
  name: string;
  to: string;
  icon: JSX.Element;
}

export const CustonSidebar: React.FC = () => {
  const size = useSize();

  const { logout } = useAuth();

  const links: CustonSidebarLink[] = [
    { name: 'home', to: ROUTER_NAMES.home, icon: <Projects /> },
    { name: 'dashboard', to: ROUTER_NAMES.dashboard, icon: <Dashboard /> },
    { name: 'clock', to: ROUTER_NAMES.clock, icon: <Clock /> },
    {
      name: 'settings',
      to: ROUTER_NAMES.settings,
      icon: <SettingsOption />,
    },
  ];

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }, [logout]);

  return (
    <Sidebar
      background="#f2f2f2"
      footer={
        <Link to={ROUTER_NAMES.login}>
          <Button icon={<Logout />} hoverIndicator onClick={handleLogout} />
        </Link>
      }
    >
      <Nav gap={size}>
        {links.map(({ to, name, icon }) => (
          <Link key={name} to={to}>
            <Button a11yTitle={name} icon={icon} hoverIndicator />
          </Link>
        ))}
      </Nav>
    </Sidebar>
  );
};
