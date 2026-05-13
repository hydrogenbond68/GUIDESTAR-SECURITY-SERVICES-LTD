import React, { useState } from 'react';
import { FaPaperPlane, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaLinkedin, FaUser, FaComment, FaBuilding, FaPhoneAlt, FaHeadset, FaGlobe } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleWhatsApp = () => {
    const message = "Hello, I'm interested in your security services. Can you provide more information?";
    window.open(`https://wa.me/254704461031?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:info@secureguardpro.com?subject=Security Services Inquiry';
  };

  const handleCall = () => {
    window.location.href = 'tel:+254704461031';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    
    const message = `*New Security Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Service:* ${formData.service}%0A*Message:* ${formData.message}`;
    
    setTimeout(() => {
      window.open(`https://wa.me/254704461031?text=${message}`, '_blank');
      setSubmitted(true);
      setSending(false);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 500);
  };

  const services = [
    'Guarding Services',
    'CCTV Installation',
    'Dog Handling',
    'Protection Services',
    'Trained Personnel',
    'Security Dogs'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-dark to-primary text-white py-16 md:py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Contact Us</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            We're here to help 24/7. Choose your preferred way to reach us.
          </p>
        </div>
      </div>

      {/* Quick Contact Cards */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div onClick={handleWhatsApp} className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer transform hover:-translate-y-2 transition-all duration-300 border-b-4 border-green-500">
            <FaWhatsapp className="text-green-500 text-5xl mx-auto mb-3" />
            <h3 className="text-xl font-bold text-dark mb-2">WhatsApp</h3>
            <p className="text-gray-500 text-sm mb-2">Quickest response</p>
            <p className="text-primary font-semibold">+254 704 461 031</p>
          </div>
          
          <div onClick={handleCall} className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer transform hover:-translate-y-2 transition-all duration-300 border-b-4 border-primary">
            <FaPhone className="text-primary text-5xl mx-auto mb-3" />
            <h3 className="text-xl font-bold text-dark mb-2">Call Us</h3>
            <p className="text-gray-500 text-sm mb-2">24/7 Emergency</p>
            <p className="text-primary font-semibold">+254 704 461 031</p>
          </div>
          
          <div onClick={handleEmail} className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer transform hover:-translate-y-2 transition-all duration-300 border-b-4 border-blue-500">
            <FaEnvelope className="text-blue-500 text-5xl mx-auto mb-3" />
            <h3 className="text-xl font-bold text-dark mb-2">Email Us</h3>
            <p className="text-gray-500 text-sm mb-2">Within 24 hours</p>
            <p className="text-primary font-semibold">GUIDESTAR SECURITY SERVICES LTD.com</p>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Emergency Card */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-6">
              <FaHeadset className="text-4xl mb-3" />
              <h3 className="text-xl font-bold mb-2">Emergency Hotline</h3>
              <p className="text-3xl font-bold mb-2">+254 704 461 031</p>
              <p className="text-sm opacity-90">Available 24/7 for emergencies</p>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaClock className="text-primary text-2xl" />
                <h3 className="text-xl font-bold text-dark">Business Hours</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold">Monday - Friday:</span>
                  <span>24 Hours</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-semibold">Saturday:</span>
                  <span>24 Hours</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-semibold">Sunday:</span>
                  <span>24 Hours</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">Emergency support available 24/7/365</p>
            </div>

            {/* Main Office */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaBuilding className="text-primary text-2xl" />
                <h3 className="text-xl font-bold text-dark">Main Office</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-primary mt-1" />
                  <p className="text-gray-600">Upper Hill, Nairobi, Kenya</p>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-primary" />
                  <p className="text-gray-600">+254 704 461 031</p>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-primary" />
                  <p className="text-gray-600">gssl@secureguardpro.com</p>
                </div>
                <div className="flex items-center gap-3">
                  <FaGlobe className="text-primary" />
                  <p className="text-gray-600">www.secureguardpro.com</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-dark mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-all transform hover:scale-110">
                  <FaFacebook className="text-xl" />
                </a>
                <a href="#" className="bg-sky-500 text-white p-3 rounded-full hover:bg-sky-600 transition-all transform hover:scale-110">
                  <FaTwitter className="text-xl" />
                </a>
                <a href="#" className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition-all transform hover:scale-110">
                  <FaLinkedin className="text-xl" />
                </a>
                <button onClick={handleWhatsApp} className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-all transform hover:scale-110">
                  <FaWhatsapp className="text-xl" />
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-dark mb-2">Send Us a Message</h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you shortly</p>
              </div>
              
              {submitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg text-center">
                  <FaPaperPlane className="text-3xl mx-auto mb-2" />
                  <p className="font-semibold">Message Sent Successfully!</p>
                  <p className="text-sm mt-1">We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">
                      <FaUser className="inline mr-2 text-primary" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-700 mb-2 font-semibold">
                        <FaEnvelope className="inline mr-2 text-primary" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2 font-semibold">
                        <FaPhone className="inline mr-2 text-primary" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="+254 XXX XXX XXX"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">
                      <FaBuilding className="inline mr-2 text-primary" />
                      Service Interested In
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">
                      <FaComment className="inline mr-2 text-primary" />
                      Your Message *
                    </label>
                    <textarea
                      rows="5"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Tell us about your security needs..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-all transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {sending ? (
                      <>Sending... <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div></>
                    ) : (
                      <>Send Message <FaPaperPlane /></>
                    )}
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By submitting this form, you agree to our privacy policy. We'll respond within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Branch Locations */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Our Branch Locations</h2>
            <p className="text-gray-600 text-lg">Find a branch near you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <FaBuilding className="text-primary text-2xl" />
                <h3 className="text-xl font-bold text-dark">Nairobi</h3>
              </div>
              <p className="text-gray-600 mb-2">Upper Hill, Nairobi</p>
              <p className="text-gray-600 mb-1">📞 +254 704 461 031</p>
              <p className="text-gray-600">📧 gssl@secureguardpro.com</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <FaBuilding className="text-primary text-2xl" />
                <h3 className="text-xl font-bold text-dark">Mombasa</h3>
              </div>
              <p className="text-gray-600 mb-2">Mombasa CBD</p>
              <p className="text-gray-600 mb-1">📞 +254 704 461 032</p>
              <p className="text-gray-600">📧 gssl@secureguardpro.com</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <FaBuilding className="text-primary text-2xl" />
                <h3 className="text-xl font-bold text-dark">Kisumu</h3>
              </div>
              <p className="text-gray-600 mb-2">Kisumu CBD</p>
              <p className="text-gray-600 mb-1">📞 +254 704 461 033</p>
              <p className="text-gray-600">📧 gssl@secureguardpro.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">Quick answers to common questions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h4 className="font-bold text-primary text-lg mb-2">How quickly can you respond?</h4>
            <p className="text-gray-600">We respond within 30 minutes for emergencies and within 24 hours for general inquiries.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h4 className="font-bold text-primary text-lg mb-2">Do you offer free consultations?</h4>
            <p className="text-gray-600">Yes, we offer free security assessments and consultations for all potential clients.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h4 className="font-bold text-primary text-lg mb-2">Are your guards licensed?</h4>
            <p className="text-gray-600">All our security personnel are fully licensed, trained, and insured.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <h4 className="font-bold text-primary text-lg mb-2">What areas do you serve?</h4>
            <p className="text-gray-600">We serve all major cities in Kenya including Nairobi, Mombasa, and Kisumu.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;