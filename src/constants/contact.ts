/**
 * Contact Information
 * Contact details and social links
 */

import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import type { ContactInfo, SocialLink } from "../types";

export const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: "Email",
    value: "1000luca@kaist.ac.kr",
    href: "mailto:1000luca@kaist.ac.kr",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+82 10-9930-9930",
    href: "tel:+821099309930",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Seoul, South Korea",
    href: "#",
  },
];

export const socialLinks: SocialLink[] = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "https://twitter.com",
  },
];
