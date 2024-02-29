import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return <>{children || <Outlet />}</>;
};

export default BaseLayout;
