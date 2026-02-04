/**
 * Contact Information
 * Contact details and social links
 */

import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import type { ContactInfo, SocialLink } from '../types';

export const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'cheon@example.com',
    href: 'mailto:cheon@example.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+82 10-1234-5678',
    href: 'tel:+821012345678',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Seoul, South Korea',
    href: '#',
  },
];

export const socialLinks: SocialLink[] = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com',
  },
  {
    icon: Twitter,
    label: 'Twitter',
    href: 'https://twitter.com',
  },
];
