import { SidebarNavLink } from './SidebarNavLink';
import {
  HiOutlineCog6Tooth,
  HiOutlineGlobeEuropeAfrica,
  HiOutlineHome,
  HiOutlineMap,
} from 'react-icons/hi2';
import { IoAirplaneOutline } from 'react-icons/io5';

function SidebarNav() {
  return (
    <nav className="flex w-full justify-center p-4 md:p-6 lg:w-64">
      <ul className="flex space-x-6 md:flex-col md:space-x-0 md:space-y-6">
        <li>
          <SidebarNavLink to="/home">
            <HiOutlineHome className="h-6 w-6" />
            <span className="hidden lg:ml-2 lg:inline">Home</span>
          </SidebarNavLink>
        </li>
        <li>
          <SidebarNavLink to="/trips">
            <IoAirplaneOutline className="h-6 w-6" />
            <span className="hidden lg:ml-2 lg:inline">Trips</span>
          </SidebarNavLink>
        </li>
        <li>
          <SidebarNavLink to="/destination-list">
            <HiOutlineMap className="h-6 w-6" />
            <span className="hidden lg:ml-2 lg:inline">Destinations</span>
          </SidebarNavLink>
        </li>
        <li>
          <SidebarNavLink to="/explore">
            <HiOutlineGlobeEuropeAfrica className="h-6 w-6" />
            <span className="hidden lg:ml-2 lg:inline">Explore</span>
          </SidebarNavLink>
        </li>

        <li>
          <SidebarNavLink to="/settings">
            <HiOutlineCog6Tooth className="h-6 w-6" />
            <span className="hidden lg:ml-2 lg:inline">Settings</span>
          </SidebarNavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SidebarNav;
