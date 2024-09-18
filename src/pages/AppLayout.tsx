import Sidebar from '../components/Sidebar';
import Summary from '../components/Summary';

function AppLayout() {
  return (
    <div className="relative flex h-full justify-center overscroll-y-none p-10">
      <Sidebar />
      <Summary />
    </div>
  );
}

export default AppLayout;
