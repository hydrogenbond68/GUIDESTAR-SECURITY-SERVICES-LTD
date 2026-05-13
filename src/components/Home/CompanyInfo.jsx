import React from 'react';
import { FaAward, FaUsers, FaClock, FaGlobe } from 'react-icons/fa';

const CompanyInfo = () => {
  const stats = [
    { icon: <FaAward />, value: '15+', label: 'Years Experience' },
    { icon: <FaUsers />, value: '500+', label: 'Security Experts' },
    { icon: <FaClock />, value: '24/7', label: 'Support Available' },
    { icon: <FaGlobe />, value: '50+', label: 'Cities Covered' }
  ];

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">We are committed to providing the highest level of security services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg">
            With over 15 years of experience in the security industry, we have built a reputation for excellence, reliability, and professionalism. Our team of highly trained security experts is dedicated to providing you with peace of mind through comprehensive protection solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;