import SidebarNavLink from './SidebarNavLink';

function SidebarNav() {
  return (
    <nav className="flex w-64 justify-center p-6">
      <ul className="space-y-6">
        <li>
          <SidebarNavLink to="/home" label="Dashboard" />
        </li>
        <li>
          <SidebarNavLink to="/trips" label="My Trips" />
        </li>
        <li>
          <SidebarNavLink to="/explore" label="Explore" />
        </li>
        <li>
          <SidebarNavLink to="/globe" label="Globe" />
        </li>
        <li>
          <SidebarNavLink to="/destination-list" label="Saved Destinations" />
        </li>
        <li>
          <SidebarNavLink to="/settings" label="Settings" />
        </li>
      </ul>
    </nav>
  );
}

export default SidebarNav;
