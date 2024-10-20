import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarNavLinkProps {
  to: string;
  children: ReactNode;
}

function SidebarNavLink({ to, children }: SidebarNavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'flex items-center gap-3 rounded-lg bg-green-800 px-4 py-2 text-lg font-semibold text-white shadow-md transition-colors duration-200 ease-in-out'
          : 'flex items-center gap-3 rounded-lg px-4 py-2 text-lg font-semibold text-white transition-colors duration-200 ease-in-out hover:bg-green-600 hover:text-yellow-400 hover:shadow-lg'
      }
    >
      {children}
    </NavLink>
  );
}

export default SidebarNavLink;
