import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useServices } from '../../context/ServiceContext';
import { FaShieldAlt, FaVideo, FaDog, FaLock, FaUsers, FaPaw, FaWhatsapp } from 'react-icons/fa';

const iconMap = {
  '🛡️': <FaShieldAlt />,
  '📹': <FaVideo />,
  '🐕': <FaDog />,
  '🔒': <FaLock />,
  '👮': <FaUsers />,
  '🐕‍🦺': <FaPaw />
};

const Services = () => {
  const { services, loading, refreshServices } = useServices();
  const navigate = useNavigate();

  // Listen for storage events to refresh services when admin makes changes
  useEffect(() => {
    const handleStorageChange = () => {
      refreshServices();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshServices]);

  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  const handleWhatsApp = (serviceName, e) => {
    e.stopPropagation();
    const message = `Hello, I'm interested in your ${serviceName} service. Can you provide more information?`;
    window.open(`https://wa.me/254704461031?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-dark mb-3 md:mb-4">Our Security Services</h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto px-4">
            Comprehensive security solutions tailored to meet your specific needs
          </p>
        </div>
        
        {services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No services available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className="card group hover:-translate-y-2 transition-all duration-300 cursor-pointer bg-white rounded-xl shadow-lg overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/600x400/1e3a8a/white?text=Security+Service";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white text-2xl md:text-3xl">
                    {iconMap[service.icon] || <FaShieldAlt />}
                  </div>
                  <button
                    onClick={(e) => handleWhatsApp(service.name, e)}
                    className="absolute bottom-4 right-4 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <FaWhatsapp className="text-lg md:text-xl" />
                  </button>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-dark">{service.name}</h3>
                  <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">{service.description.substring(0, 100)}...</p>
                  <div className="flex justify-between items-center">
                    <button className="text-primary font-semibold hover:text-secondary transition-colors text-sm md:text-base">
                      Learn More →
                    </button>
                    <span className="text-xs text-gray-400">Click for details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;