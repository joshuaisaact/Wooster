import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="flex items-center justify-center">
      <h1>Wooster</h1>
      <Link to="/app">Log in</Link>
    </div>
  );
}

export default Homepage;
