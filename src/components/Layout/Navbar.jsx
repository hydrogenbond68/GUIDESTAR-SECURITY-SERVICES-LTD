import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import { FaHome, FaInfoCircle, FaConciergeBell, FaEnvelope } from 'react-icons/fa';
import Logo from '../Common/Logo';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

const navLinks = [
  { path: '/', label: 'Home', icon: <FaHome className="mr-2" /> },
  { path: '/about', label: 'About', icon: <FaInfoCircle className="mr-2" /> },
  { path: '/services', label: 'Services', icon: <FaConciergeBell className="mr-2" /> },
  { path: '/contact', label: 'Contact', icon: <FaEnvelope className="mr-2" /> }, // Add this line
];

  return (
    <nav className="bg-dark text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Component */}
          <Link to="/" className="flex items-center">
            <Logo className="h-12 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            
            {user ? (
              <>
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 hover:text-accent transition-colors"
                  >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                  </Link>
                )}
                <div className="flex items-center space-x-3">
                  <span className="text-gray-300">
                    <FaUser className="inline mr-1" />
                    {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-accent px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login / Register
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block py-2 hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                {isAdmin() && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block py-2 hover:text-accent transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <div className="py-2 text-gray-300">
                  <FaUser className="inline mr-2" />
                  {user.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block mt-2 bg-accent px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition-colors"
              >
                Login / Register
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;