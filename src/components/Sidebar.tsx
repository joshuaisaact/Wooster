import Logo from './Logo';
import Footer from './Footer';
import SidebarNav from './SidebarNav';

function Sidebar() {
  return (
    <div className="flex max-w-xs basis-full flex-col items-center justify-between bg-green-800 px-20 py-12 pb-[3.5rem]">
      <div className="flex flex-col items-center">
        <Logo height="h-40" width="w-40" link="/" />
        <SidebarNav />
      </div>
      <Footer />
    </div>
  );
}

export default Sidebar;
