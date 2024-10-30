import { Logo } from './Logo';
import { Footer } from './Footer';
import SidebarNav from './SidebarNav';

function Sidebar() {
  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-between bg-green-700 px-4 py-3 text-white lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:min-h-screen lg:max-w-xs lg:flex-col lg:px-20 lg:py-12 lg:pb-[3.5rem]">
      <div className="flex w-full flex-row items-center justify-between lg:flex-col lg:items-center">
        <Logo height="h-10 lg:h-40" width="w-10 lg:w-40" link="/" />
        <SidebarNav />
      </div>
      <Footer />
    </div>
  );
}

export default Sidebar;
