import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/useAuth';
import Footer from './Footer';
import NavigationMenu from './NavigationMenu';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate replace to='/login' />;
  }

  return (
    <div className='flex min-h-screen flex-col bg-[#f7f8fa] text-[#0b1d3a]'>
      <NavigationMenu />
      <div className='flex-1'>{children}</div>
      <Footer />
    </div>
  );
};

export default ProtectedRoute;
