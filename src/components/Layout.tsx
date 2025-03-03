
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import ThemeToggle from './ThemeToggle';

const Layout = () => {
  const { mode } = useAppSelector((state) => state.theme);
  
  // Apply theme on mount and when it changes
  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            Country Explorer
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="container py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
