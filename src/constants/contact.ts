/**
 * Contact Information
 * Contact details and social links
 */

import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import type { ContactInfo, SocialLink } from '../types';

export const contactInfo: ContactInfo[] = [
  {
    icon: Mail({ size: 20 }),
    label: 'Email',
    value: 'cheon@example.com',
    href: 'mailto:cheon@example.com',
  },
  {
    icon: Phone({ size: 20 }),
    label: 'Phone',
    value: '+82 10-1234-5678',
    href: 'tel:+821012345678',
  },
  {
    icon: MapPin({ size: 20 }),
    label: 'Location',
    value: 'Seoul, South Korea',
    href: '#',
  },
];

export const socialLinks: SocialLink[] = [
  {
    icon: Github({ size: 20 }),
    label: 'GitHub',
    href: 'https://github.com',
  },
  {
    icon: Linkedin({ size: 20 }),
    label: 'LinkedIn',
    href: 'https://linkedin.com',
  },
  {
    icon: Twitter({ size: 20 }),
    label: 'Twitter',
    href: 'https://twitter.com',
  },
];
