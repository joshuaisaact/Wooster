import { Logo } from './Logo';
import { Footer } from './Footer';
import SidebarNav from './SidebarNav';
import { JobHunt } from './JobHunt';
import { ThemeToggle } from './ThemeToggle';

function Sidebar() {
  return (
    <div className="flex h-16 w-full flex-row items-center justify-between bg-green-700/95 py-2 text-white shadow-xl backdrop-blur-sm dark:bg-green-900/90 dark:text-green-50 max-md:flex-row md:h-full md:min-h-screen md:w-48 md:flex-col md:px-6 md:py-8 lg:w-64 lg:px-8">
      {/* Mobile: Left section, Desktop: Top section */}
      <div className="flex items-center max-md:gap-2 md:w-full md:flex-col md:items-center md:gap-8">
        <div className="hidden max-md:w-8 md:block md:w-auto">
          <Logo
            height="h-8 md:h-24 lg:h-32"
            width="w-8 md:w-24 lg:w-32"
            link="/"
            className="transition-transform duration-200 hover:scale-105"
          />
        </div>
        <SidebarNav />
      </div>

      {/* Mobile: Right section, Desktop: Bottom section */}
      <div className="hidden items-center gap-4 max-md:flex-row md:block md:flex-col md:items-center">
        <div className="flex items-center gap-4 max-md:flex-row md:flex-col">
          <ThemeToggle />
          <JobHunt />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Sidebar;
