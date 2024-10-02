import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

function Login() {
  // Pre-filled for dev purposes

  const [email, setEmail] = useState('josh@example.com');
  const [password, setPassword] = useState('qwerty');

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      console.log('Is authenticated:', isAuthenticated);
      if (isAuthenticated) {
        navigate('/home', { replace: true });
      }
    },
    [isAuthenticated, navigate],
  );

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  return (
    <div className="flex h-full flex-col items-center justify-center bg-green-800">
      <Logo height={'h-72'} image={'/wooster-homepage-no-bg.png'} />
      <h1 className="text-grey py-10 font-black">Wooster</h1>
      <h3 className="py-10">Your trip companion</h3>
      <form onSubmit={handleSubmit}>
        <div className="m-1 flex flex-col">
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className="m-1 flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {/* <Link
        to="/home"
        className="flex items-center justify-center rounded-lg px-4 py-2 text-gray-300 transition-colors duration-200 hover:bg-gray-700 hover:text-white"
      >
        Log in
      </Link> */}
        <div className="m-3">
          <Button>Login</Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
