import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  height?: string;
  width?: string;
  link?: string;
  image?: string;
  className?: string;
}

export function Logo({
  height,
  width,
  link,
  image = '/wooster-face-front-no-bg.png',
  className,
}: LogoProps) {
  const img = <img src={image} alt="Wooster logo" className={cn(className, height, width)} />;

  return link ? <Link to={link}>{img}</Link> : img;
}
