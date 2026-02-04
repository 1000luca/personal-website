import { useEffect } from 'react';
import Contact from '../components/Contact';

const ContactPage = () => {
  // Scroll to top when entering the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 min-h-screen section-alt">
      <Contact />
    </div>
  );
};

export default ContactPage;
