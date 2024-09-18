import Logo from './Logo';
import Footer from './Footer';
import DaysNav from './DaysNav';

function Sidebar() {
  return (
    <div className="flex max-w-md basis-full flex-col items-center bg-green-800 px-20 py-12 pb-[3.5rem]">
      <Logo height="h-40" width="w-40" link="/" />
      <DaysNav />
      <Footer />
    </div>
  );
}

export default Sidebar;
