import { useEffect } from 'react';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

const ContactPage = () => {
  // Scroll to top when entering the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 min-h-screen section-alt">
      <SEO 
        title="Contact" 
        description="Get in touch with Hyunjae Cheon. Available for freelance projects and full-time opportunities." 
      />
      <Contact />
    </div>
  );
};

export default ContactPage;
