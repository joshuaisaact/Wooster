import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

function Homepage() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-green-800">
      <Logo height={'h-72'} image={'/wooster-homepage-no-bg.png'} />
      <h1 className="text-grey py-10 font-black">Wooster</h1>
      <h3 className="py-10">Your trip companion</h3>
      <Link
        to="/home"
        className="flex items-center justify-center rounded-lg px-4 py-2 text-gray-300 transition-colors duration-200 hover:bg-gray-700 hover:text-white"
      >
        Log in
      </Link>
    </div>
  );
}

export default Homepage;
