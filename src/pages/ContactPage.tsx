import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

declare global {
  interface Window {
    emailjs?: any;
  }
}

const EMAILJS_SERVICE_ID = 'service_ic07uth';
const EMAILJS_TEMPLATE_ID = 'template_93h71xx';
const EMAILJS_PUBLIC_KEY = 'DEkJADZWqI-PpbIdA';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!window.emailjs) {
      toast.error('Email service is not available. Please try again later.');
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      subject,
      message,
      to_email: 'hetchavadiya@gmail.com',
      reply_to: email,
    };

    try {
      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      toast.success('Message sent successfully! We will get back to you soon.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (error: any) {
      let errorMessage = 'Failed to send message. Please try again later.';
      if (error?.status === 422) errorMessage = 'Invalid input. Please check and try again.';
      else if (error?.status === 403) errorMessage = 'Service access denied. Please contact us directly.';

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16"
    >
      {/* Hero */}
      <section className="bg-cocast-cream/60 py-16">
        <div className="container mx-auto text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">Get In Touch</h1>
          <p className="text-lg text-cocast-brown/80">
            Have a question, feedback, or want to collaborate? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-playfair font-bold mb-6">Send Us a Message</h2>
            <p className="text-cocast-brown/80 mb-6">
              We aim to respond within 24-48 hours on business days. Mark messages "Urgent" for priority.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-cocast-brown mb-1">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="w-full rounded-md border px-4 py-2 border-cocast-sage/30 focus:outline-none focus:ring-2 focus:ring-cocast-sage/20"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-cocast-brown mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-md border px-4 py-2 border-cocast-sage/30 focus:outline-none focus:ring-2 focus:ring-cocast-sage/20"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-cocast-brown mb-1">Subject</label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="Subject"
                  className="w-full rounded-md border px-4 py-2 border-cocast-sage/30 focus:outline-none focus:ring-2 focus:ring-cocast-sage/20"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-cocast-brown mb-1">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Your message..."
                  className="w-full rounded-md border px-4 py-2 border-cocast-sage/30 focus:outline-none focus:ring-2 focus:ring-cocast-sage/20"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cocast-sage hover:bg-cocast-darkSage text-white font-medium py-2.5 px-6 rounded-md transition-colors disabled:opacity-70 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.373 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:pl-10"
          >
            <h2 className="text-3xl font-playfair font-bold mb-6">Contact Information</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Email Us</h3>
                <p className="text-cocast-brown/80">General Inquiries</p>
                <a href="mailto:hello@cocast.com" className="text-cocast-darkSage hover:underline">hello@cocast.com</a>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Business Hours</h3>
                <div className="space-y-2 text-cocast-brown/80">
                  <p>Monday - Friday: 9:00 AM - 5:00 PM EST</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
              </div>
              <div className="bg-cocast-cream p-5 rounded-xl shadow-xl border border-cocast-darkSage/20">
                <h3 className="text-lg font-semibold mb-3 text-cocast-darkSage">Become a Retailer</h3>
                <p className="text-cocast-brown/90 mb-4">
                  Interested in stocking Cocast products in your store? We'd love to partner with like-minded retailers who share our values.
                </p>
                <a
                  href="mailto:wholesale@cocast.com"
                  className="inline-flex items-center text-cocast-darkSage hover:text-cocast-sage transition-colors font-medium"
                >
                  Contact our wholesale team
                  <svg className="ml-1 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>

            </div>


          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;
