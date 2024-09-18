import { Link } from 'react-router-dom';

interface LogoProps {
  height: string;
  width: string;
  link: string;
}

function Logo({ height, width, link }: LogoProps) {
  return (
    <Link to={link}>
      <img src="/logo.png" alt="Wooster logo" className={`${height} ${width}`} />
    </Link>
  );
}

export default Logo;
