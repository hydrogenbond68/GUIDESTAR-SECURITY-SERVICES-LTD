import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getServices } from '../utils/localStorage';
import { FaShieldAlt, FaVideo, FaDog, FaLock, FaUsers, FaPaw } from 'react-icons/fa';

const iconMap = {
  '1': 'https://your-new-image-1.jpg',
  '2': 'https://your-new-image-2.jpg',
  '3': 'https://your-new-image-3.jpg',
  '4': 'https://your-new-image-4.jpg',
  '5': 'https://your-new-image-5.jpg',
  '6': 'https://your-new-image-6.jpg'
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setServices(getServices());
  }, []);

  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Security Services</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Comprehensive security solutions tailored to protect what matters most
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              onClick={() => handleServiceClick(service.id)}
              className="card group hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white text-4xl">
                  {iconMap[service.icon] || <FaShieldAlt />}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-dark">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="text-primary font-semibold hover:text-secondary transition-colors">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;