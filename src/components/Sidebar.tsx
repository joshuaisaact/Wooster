import Logo from './Logo';
import Footer from './Footer';
import SidebarNav from './SidebarNav';

function Sidebar() {
  return (
    <div className="flex min-h-screen max-w-xs flex-col items-center justify-between bg-green-700 px-20 py-12 pb-[3.5rem] text-white">
      <div className="flex flex-col items-center">
        <Logo height="h-40" width="w-40" link="/" />
        <SidebarNav />
      </div>
      <Footer />
    </div>
  );
}

export default Sidebar;
