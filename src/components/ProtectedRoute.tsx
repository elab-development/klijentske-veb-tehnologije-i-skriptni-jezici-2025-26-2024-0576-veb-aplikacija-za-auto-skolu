import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/useAuth';
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
    <div className='min-h-screen bg-[#f7f8fa] text-[#0b1d3a]'>
      <NavigationMenu />
      {children}
    </div>
  );
};

export default ProtectedRoute;
