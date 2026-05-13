import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Logo from '../Common/Logo';

const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info with Logo */}
          <div>
            <div className="mb-4">
              <Logo className="h-12 w-auto mb-2" />
            </div>
            <p className="text-sm">
              Providing top-notch security solutions for over a decade. Your safety is our priority.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="/services" className="hover:text-accent transition-colors">Services</a></li>
              <li><a href="/login" className="hover:text-accent transition-colors">Login</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FaPhone className="text-accent" />
                <span>+254 704 461 031</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-accent" />
                <span>guidstarsecurityservicesltd@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-accent" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-accent transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-accent transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl hover:text-accent transition-colors">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2026 SGUIDESTAR SECURITY SERVICES LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;