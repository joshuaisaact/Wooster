import { Logo } from './Logo';
import { Footer } from './Footer';
import SidebarNav from './SidebarNav';

function Sidebar() {
  return (
    <div className="flex h-16 w-full flex-row items-center justify-between bg-green-700/95 px-4 py-2 text-white shadow-xl backdrop-blur-sm max-md:flex-row md:h-full md:min-h-screen md:w-48 md:flex-col md:px-6 md:py-8 lg:w-64 lg:px-8">
      <div className="flex w-full max-md:flex-row max-md:items-center max-md:justify-between md:flex-col md:items-center md:justify-start md:gap-8">
        <Logo
          height="h-8 md:h-24 lg:h-32"
          width="w-8 md:w-24 lg:w-32"
          link="/"
          className="transition-transform duration-200 hover:scale-105"
        />
        <SidebarNav />
      </div>
      <Footer />
    </div>
  );
}

export default Sidebar;
