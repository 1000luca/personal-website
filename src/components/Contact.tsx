import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { MockDataService } from '../services/mockDataService';
import { useFormValidation } from '../hooks';
import type { FormData, ContactInfo, SocialLink } from '../types';

const Contact = () => {
  const [info, setInfo] = useState<ContactInfo[]>([]);
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [i, s] = await Promise.all([
          MockDataService.getContactInfo(),
          MockDataService.getSocialLinks()
        ]);
        setInfo(i);
        setSocials(s);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const initialValues: FormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormValidation(initialValues);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-[var(--accent)] border-t-transparent animate-spin" />
      </div>
    );
  }

  const onSubmit = async (formData: FormData) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error('EmailJS configuration missing. Please check your .env file.');
      throw new Error('EmailJS configuration missing');
    }

    const loadingToast = toast.loading('Sending your message...');

    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Hyunjae Cheon',
      },
      publicKey
    );

    toast.dismiss(loadingToast);
    toast.success(`Thank you, ${formData.name}! I'll be in touch soon.`, {
      duration: 5000,
    });
  };

  return (
    <section id="contact" className="py-32">
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-display font-semibold text-primary mb-6">
            Get In Touch
          </h2>
          <div className="h-px w-32 bg-gradient-to-r from-[var(--accent)] to-transparent mb-8" />
          <p className="text-xl text-secondary max-w-2xl leading-relaxed">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-2 space-y-12"
          >
            <div className="space-y-6">
              {info.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-start gap-4 group"
                >
                  <item.icon
                    size={20}
                    strokeWidth={1.5}
                    className="text-[var(--accent)] mt-1 flex-shrink-0"
                  />
                  <div>
                    <p className="text-xs text-secondary font-light tracking-wider uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="text-lg text-primary group-hover:text-[var(--accent)] transition-colors duration-400">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="space-y-6 pt-8 border-t border-[var(--border-light)]">
              <h3 className="text-xl font-display font-medium text-primary">
                Connect
              </h3>
              <div className="flex gap-6">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-[var(--accent)] transition-colors duration-400"
                    aria-label={social.label}
                  >
                    <social.icon size={20} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={(e) => handleSubmit(onSubmit, e)}
              className="refined-card p-8 md:p-12 space-y-8"
              noValidate
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-primary mb-3"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input-field ${
                      touched.name && errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder="Your Name"
                    aria-invalid={touched.name && errors.name ? 'true' : 'false'}
                  />
                  {touched.name && errors.name && (
                    <p className="text-red-500 text-xs mt-2">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-primary mb-3"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input-field ${
                      touched.email && errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="your@email.com"
                    aria-invalid={touched.email && errors.email ? 'true' : 'false'}
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-xs mt-2">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-primary mb-3"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input-field ${
                    touched.subject && errors.subject ? 'border-red-500' : ''
                  }`}
                  placeholder="Project Inquiry"
                  aria-invalid={touched.subject && errors.subject ? 'true' : 'false'}
                />
                {touched.subject && errors.subject && (
                  <p className="text-red-500 text-xs mt-2">{errors.subject}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-primary mb-3"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={6}
                  className={`input-field resize-none ${
                    touched.message && errors.message ? 'border-red-500' : ''
                  }`}
                  placeholder="Tell me about your project..."
                  aria-invalid={touched.message && errors.message ? 'true' : 'false'}
                />
                {touched.message && errors.message && (
                  <p className="text-red-500 text-xs mt-2">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full md:w-auto flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[var(--bg-0)] border-t-transparent animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
