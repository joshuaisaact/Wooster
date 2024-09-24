import { Link } from 'react-router-dom';

interface LogoProps {
  height?: string;
  width?: string;
  link?: string;
  image?: string;
}

function Logo({ height, width, link, image }: LogoProps) {
  return link ? (
    <Link to={link}>
      <img
        src="/wooster-face-front-no-bg-alt.png"
        alt="Wooster logo"
        className={`${height} ${width}`}
      />
    </Link>
  ) : (
    <img
      src={image ? image : '/wooster-face-front-no-bg.png'}
      alt="Wooster logo"
      className={`${height} ${width}`}
    />
  );
}

export default Logo;
