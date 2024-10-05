import SidebarNavLink from './SidebarNavLink';
import {
  HiOutlineCog6Tooth,
  HiOutlineGlobeEuropeAfrica,
  HiOutlineHome,
  HiOutlineMap,
} from 'react-icons/hi2';
import { IoAirplaneOutline } from 'react-icons/io5';

function SidebarNav() {
  return (
    <nav className="flex w-64 justify-center p-6">
      <ul className="space-y-6">
        <li>
          <SidebarNavLink to="/home">
            <HiOutlineHome className="h-6 w-6" />
            <span>Home</span>
          </SidebarNavLink>
        </li>
        <li>
          <SidebarNavLink to="/trips">
            <IoAirplaneOutline className="h-6 w-6" />
            Trips
          </SidebarNavLink>
        </li>
        <li>
          <SidebarNavLink to="/destination-list">
            <HiOutlineMap className="h-6 w-6" />
            <span>Destinations</span>
          </SidebarNavLink>
        </li>
        <li>
          <SidebarNavLink to="/explore">
            <HiOutlineGlobeEuropeAfrica className="h-6 w-6" />
            <span>Explore</span>
          </SidebarNavLink>
        </li>
        {/* <li>
          <SidebarNavLink to="/globe" label="Globe" />
        </li> */}

        <li>
          <SidebarNavLink to="/settings">
            <HiOutlineCog6Tooth className="h-6 w-6" />
            <span>Settings</span>
          </SidebarNavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SidebarNav;
