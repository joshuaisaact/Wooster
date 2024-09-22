import { NavLink } from 'react-router-dom';

interface SidebarNavLinkProps {
  to: string;
  label: string;
}

function SidebarNavLink({ to, label }: SidebarNavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'flex items-center justify-center rounded-lg bg-gray-700 px-4 py-2 text-lg font-semibold text-white'
          : 'hover:bg-accent flex items-center justify-center rounded-lg px-4 py-2 text-lg font-semibold text-white transition-colors duration-200 hover:text-white'
      }
    >
      {label}
    </NavLink>
  );
}

export default SidebarNavLink;
