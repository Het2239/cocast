import { useState, useEffect } from 'react';
import useSEO from '@/hooks/useSEO';


// ============================================================================
// GOOGLE FORMS CONFIGURATION
// ============================================================================
// Form URL: https://forms.gle/suytGiynPgjoAxtk9
// All responses will be automatically saved to your linked Google Sheet
// ============================================================================

const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSft3UPqcrMEuTos0P0F4bx3QDV9krBq0MiTp2-RjhHraQStKg/formResponse';

const GOOGLE_FORM_FIELDS = {
  name: 'entry.1928515957',
  email: 'entry.1528967230',
  subject: 'entry.1044895054',
  message: 'entry.1297713770',
  // TODO: Add these 3 new fields to your Google Form, then replace the entry IDs below
  phone: 'entry.966412314',
  state: 'entry.1891163916',
  country: 'entry.557688671',
};

const MapSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Interactive Map */}
      <div className="h-96 bg-gray-100 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.512979219108!2d72.67843049999999!3d23.041647599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e870f0201f751%3A0xd520da49a126b37!2sCocast%20india!5e0!3m2!1sen!2sin!4v1749776542211!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Cocast Office Location"
        ></iframe>
      </div>

      {/* Map Info */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Address */}
        <div className="text-center">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h3 className="font-semibold mb-1">Address</h3>
          <p className="text-gray-600 text-sm">
            Arth Business Centre (ABC), 107, <br />
            Sardar Patel Ring Rd, Nikol<br />
            Ahmedabad, Gujarat 382350
          </p>
        </div>

        {/* Hours */}
        <div className="text-center">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="font-semibold mb-1">Hours</h3>
          <p className="text-gray-600 text-sm">
            Mon-Fri: 9:00 AM - 5:00 PM<br />
            Weekends: Closed
          </p>
        </div>

        {/* Contact */}
        <div className="text-center">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="font-semibold mb-1">Contact</h3>
          <p className="text-gray-600 text-sm">
            <a href="tel:+1234567890" className="text-green-600 hover:underline">
              +91 (966) 235-7458
            </a>
            <br />
            <a href="mailto:hello@cocast.com" className="text-green-600 hover:underline">
              cocast.india@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  useSEO({
    title: 'Contact Us',
    description: 'Get in touch with Cocast for product enquiries, distributorship, retail partnerships, or brand collaborations. We\'d love to hear from you.',
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 p-4 rounded-md text-white z-50 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
      }`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form fields
    if (!name || !email || !phone || !state || !country || !subject || !message) {
      showToast('Please fill in all fields.', 'error');
      setIsSubmitting(false);
      return;
    }

    // Create form data for Google Forms
    const formData = new FormData();
    formData.append(GOOGLE_FORM_FIELDS.name, name);
    formData.append(GOOGLE_FORM_FIELDS.email, email);
    formData.append(GOOGLE_FORM_FIELDS.phone, phone);
    formData.append(GOOGLE_FORM_FIELDS.state, state);
    formData.append(GOOGLE_FORM_FIELDS.country, country);
    formData.append(GOOGLE_FORM_FIELDS.subject, subject);
    formData.append(GOOGLE_FORM_FIELDS.message, message);

    try {
      // Submit to Google Forms
      // Note: Using 'no-cors' mode because Google Forms doesn't return CORS headers
      // This means we can't read the response, but the submission still works
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });

      // Since we can't read the response with no-cors, we assume success
      showToast('Message sent successfully! We will get back to you soon.');

      // Clear form
      setName('');
      setEmail('');
      setPhone('');
      setState('');
      setCountry('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Form submission error:', error);
      showToast('Failed to send message. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="py-16">
        <div className="container mx-auto text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-lg text-gray-700">
            Have a question, feedback, or want to collaborate? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            <p className="text-gray-700 mb-6">
              We aim to respond within 24-48 hours on business days. Mark messages "Urgent" for priority.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="w-full rounded-md border px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-md border px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-1">Contact No.</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full rounded-md border px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-800 mb-1">State</label>
                  <input
                    id="state"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    placeholder="e.g. Gujarat"
                    className="w-full rounded-md border px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-800 mb-1">Country</label>
                  <input
                    id="country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    placeholder="e.g. India"
                    className="w-full rounded-md border px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-800 mb-1">Subject</label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="Subject"
                  className="w-full rounded-md border px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-1">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Your message..."
                  className="w-full rounded-md border px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
          </div>

          {/* Contact Info */}
          <div className="lg:pl-10">
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-8">
              {/* Address */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Visit Our Office
                </h3>
                <div className="text-gray-700 ml-7">
                  <p>Arth Business Centre (ABC), 107,</p>
                  <p>Sardar Patel Ring Rd, Nikol</p>
                  <p>Ahmedabad, Gujarat 382350</p>
                  <p>India</p>
                </div>
              </div>

              {/* Phone */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Us
                </h3>
                <div className="text-gray-700 ml-7">
                  <p>Main: <a href="tel:+919662357458" className="text-green-600 hover:underline">+91 (966) 235-7458</a></p>
                  <p>Support: <a href="tel:+918734840052" className="text-green-600 hover:underline">+91 (873) 484-0052</a></p>
                </div>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Us
                </h3>
                <div className="text-gray-700 ml-7">
                  <p>General: <a href="mailto:cocast.india@gmail.com" className="text-green-600 hover:underline">cocast.india@gmail.com</a></p>
                </div>
              </div>

              {/* Business Hours */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Business Hours
                </h3>
                <div className="space-y-2 text-gray-700 ml-7">
                  <p>Monday - Friday: 9:00 AM - 5:00 PM EST</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
              </div>

              {/* Retailer Info */}
              <div className="bg-gray-50 p-5 rounded-xl border">
                <h3 className="text-lg font-semibold mb-3 text-green-600">Become a Retailer</h3>
                <p className="text-gray-700 mb-4">
                  Interested in stocking Cocast products in your store? We'd love to partner with like-minded retailers who share our values.
                </p>
                <a
                  href="mailto:cocast.india@gmail.com"
                  className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors font-medium"
                >
                  Contact our wholesale team
                  <svg className="ml-1 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <MapSection />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;