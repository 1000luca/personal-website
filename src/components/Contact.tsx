import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { containerVariants, itemVariants } from '../constants/animations';
import { contactInfo, socialLinks } from '../constants/contact';
import { useFormValidation } from '../hooks';
import type { FormData } from '../types';

const Contact = () => {

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
    setIsSubmitting,
  } = useFormValidation(initialValues);

  const onSubmit = async (formData: FormData) => {
    try {
      // Show loading toast
      const loadingToast = toast.loading('메시지를 전송하고 있습니다...');

      // Simulate API call - Replace with actual email service (EmailJS, etc.)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Form submitted:', formData);

      // Dismiss loading and show success
      toast.dismiss(loadingToast);
      toast.success(
        `감사합니다, ${formData.name}님! 곧 연락드리겠습니다.`,
        {
          duration: 5000,
          icon: '✅',
        }
      );
    } catch (error) {
      console.error('Form submission error:', error);

      toast.error(
        '메시지 전송에 실패했습니다. 다시 시도해주세요.',
        {
          duration: 5000,
          icon: '❌',
        }
      );

      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 section-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4 text-slate-100"
          >
            <span className="gradient-text">Get In Touch</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-slate-300 text-lg max-w-2xl mx-auto"
          >
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-effect p-8 rounded-xl">
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Let's Connect</h3>
              <p className="text-slate-200/90 mb-8">
                I'm always interested in hearing about new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 p-4 glass-effect rounded-lg hover:border-emerald-300/50 transition-colors duration-200 group"
                  >
                    <div className="p-2 bg-gradient-to-r from-emerald-400 to-amber-300 rounded-lg text-slate-900 group-hover:scale-110 transition-transform duration-200">
                      <info.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-effect p-8 rounded-xl">
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass-effect rounded-lg hover:border-emerald-300/50 transition-all duration-200 group"
                    aria-label={social.label}
                  >
                    <div className="text-slate-300 group-hover:text-emerald-200 group-hover:scale-110 transition-all duration-200">
                      <social.icon size={20} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <form
              onSubmit={(e) => handleSubmit(onSubmit, e)}
              className="glass-effect p-8 rounded-xl space-y-6"
              noValidate
            >
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Send a Message</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input-field ${
                      touched.name && errors.name
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                        : ''
                    }`}
                    placeholder="Your Name"
                    aria-invalid={touched.name && errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {touched.name && errors.name && (
                    <p id="name-error" className="text-red-400 text-sm mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input-field ${
                      touched.email && errors.email
                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                        : ''
                    }`}
                    placeholder="your@email.com"
                    aria-invalid={touched.email && errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {touched.email && errors.email && (
                    <p id="email-error" className="text-red-400 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`input-field ${
                    touched.subject && errors.subject
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                      : ''
                  }`}
                  placeholder="Project Inquiry"
                  aria-invalid={touched.subject && errors.subject ? 'true' : 'false'}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {touched.subject && errors.subject && (
                  <p id="subject-error" className="text-red-400 text-sm mt-1">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={5}
                  className={`input-field resize-none ${
                    touched.message && errors.message
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                      : ''
                  }`}
                  placeholder="Tell me about your project..."
                  aria-invalid={touched.message && errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {touched.message && errors.message && (
                  <p id="message-error" className="text-red-400 text-sm mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
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
