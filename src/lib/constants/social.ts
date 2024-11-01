import { Globe, Linkedin, Mail } from 'lucide-react';
import { ReactNode } from 'react';
import { IoLogoGithub } from 'react-icons/io5';

export const SOCIAL_LINKS = [
  {
    icon: Globe,
    href: 'https://joshtuddenham.tech',
    label: 'Portfolio',
  },
  {
    icon: IoLogoGithub,
    href: 'https://github.com/joshuaisaact',
    label: 'GitHub',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/joshuatuddenham/',
    label: 'LinkedIn',
  },
  {
    icon: Mail,
    href: 'mailto:joshuaisaact@gmail.com',
    label: 'Email',
  },
] as const;

export type SocialLink = {
  icon: ReactNode;
  href: string;
  label: string;
};
