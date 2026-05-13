import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Preload the image to check if it loads
    const img = new Image();
    img.src = 'https://i.postimg.cc/CM4YLXS4/Chat-GPT-Image-Apr-22-2026-12-21-19-PM.png';
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, []);

  return (
    <div className="relative h-screen min-h-[600px] max-h-[800px] text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: !imageError 
            ? `url('https://i.postimg.cc/CM4YLXS4/Chat-GPT-Image-Apr-22-2026-12-21-19-PM.png')`
            : `url('https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=1600')`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Your Safety is Our Mission
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Professional security solutions tailored to protect what matters most to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/services" 
              className="bg-accent px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 text-center"
            >
              Explore Services
            </Link>
            <Link 
              to="/register" 
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-dark transition-all text-center"
            >
              Get Started
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="text-accent" />
              <span>24/7 Protection</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="text-accent" />
              <span>Licensed Professionals</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="text-accent" />
              <span>Advanced Technology</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;