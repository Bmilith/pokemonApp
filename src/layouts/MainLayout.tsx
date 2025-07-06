import { Outlet } from 'react-router-dom';
import { NavBar } from '@/components/features';

export const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};
