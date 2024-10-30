import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarNavLinkProps {
  to: string;
  children: ReactNode;
}

const baseStyles =
  'flex items-center gap-3 rounded-lg px-4 py-2 text-lg font-semibold text-white transition-colors duration-200 ease-in-out';
const activeStyles = 'bg-green-800 shadow-md';
const hoverStyles = 'hover:bg-green-600 hover:text-yellow-400 hover:shadow-lg';

export function SidebarNavLink({ to, children }: SidebarNavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(baseStyles, isActive ? activeStyles : hoverStyles)}
    >
      {children}
    </NavLink>
  );
}
