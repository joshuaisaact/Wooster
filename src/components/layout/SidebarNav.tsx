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
    <nav className="flex w-full items-center justify-start md:justify-center md:p-6 lg:w-64">
      <ul className="flex w-full justify-between md:w-auto md:flex-col md:space-y-6">
        <li>
          <SidebarNavLink to="/home">
            <div className="flex flex-col items-center md:flex-row">
              <HiOutlineHome className="h-6 w-6" />
              <span className="mt-1 text-xs md:ml-2 md:mt-0 md:text-base">Home</span>
            </div>
          </SidebarNavLink>
        </li>
        <li>
          <SidebarNavLink to="/trips">
            <div className="flex flex-col items-center md:flex-row">
              <IoAirplaneOutline className="h-6 w-6" />
              <span className="mt-1 text-xs md:ml-2 md:mt-0 md:text-base">Trips</span>
            </div>
          </SidebarNavLink>
        </li>
        <li>
          <SidebarNavLink to="/destination-list">
            <div className="flex flex-col items-center md:flex-row">
              <HiOutlineMap className="h-6 w-6" />
              <span className="mt-1 text-xs md:ml-2 md:mt-0 md:text-base">Destinations</span>
            </div>
          </SidebarNavLink>
        </li>
        <li>
          <SidebarNavLink to="/explore">
            <div className="flex flex-col items-center md:flex-row">
              <HiOutlineGlobeEuropeAfrica className="h-6 w-6" />
              <span className="mt-1 text-xs md:ml-2 md:mt-0 md:text-base">Explore</span>
            </div>
          </SidebarNavLink>
        </li>
        <li>
          <SidebarNavLink to="/settings">
            <div className="flex flex-col items-center md:flex-row">
              <HiOutlineCog6Tooth className="h-6 w-6" />
              <span className="mt-1 text-xs md:ml-2 md:mt-0 md:text-base">Settings</span>
            </div>
          </SidebarNavLink>
        </li>
      </ul>
    </nav>
  );
}
export default SidebarNav;
