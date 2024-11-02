import { Link, LinkProps } from 'react-router-dom';

const ScrollLink = ({ children, ...props }: LinkProps) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default ScrollLink;
