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
          ? 'gap-5font-semibold flex items-center gap-3 rounded-lg bg-gray-700 px-4 py-2 text-lg text-white transition-all'
          : 'flex items-center gap-3 rounded-lg px-4 py-2 text-lg font-semibold text-white transition-all transition-colors duration-200 hover:bg-accent hover:text-white'
      }
    >
      {children}
    </NavLink>
  );
}

export default SidebarNavLink;
