import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { useTheme } from '../contexts/ThemeProvider';

export default function Layout() {
  const { darkMode } = useTheme();
  return (
    <div className={darkMode ? 'test dark' : 'test'}>
      <div className={darkMode ? 'left dark' : 'left'}>
        <Navigation />
      </div>
      <Outlet />
    </div>
  );
}
