import React from 'react';
import { Link } from 'react-router-dom';
import { FaAward, FaUsers, FaClock, FaCheckCircle, FaChartLine, FaHandshake, FaGlobeAfrica, FaArrowRight, FaShieldAlt, FaBuilding, FaTrophy, FaHeart } from 'react-icons/fa';

const AboutPage = () => {
  const stats = [
    { icon: <FaUsers className="text-3xl md:text-4xl" />, value: '1000+', label: 'Security Experts' },
    { icon: <FaAward className="text-3xl md:text-4xl" />, value: '20+', label: 'Years Experience' },
    { icon: <FaClock className="text-3xl md:text-4xl" />, value: '24/7', label: 'Support Available' },
    { icon: <FaGlobeAfrica className="text-3xl md:text-4xl" />, value: '100+', label: 'Cities Covered' }
  ];

  const values = [
    {
      title: 'Integrity',
      description: 'We operate with honesty and transparency in all our dealings, building trust with every client.',
      icon: <FaHandshake className="text-2xl md:text-3xl" />
    },
    {
      title: 'Excellence',
      description: 'We strive for the highest standards in security services through continuous improvement.',
      icon: <FaChartLine className="text-2xl md:text-3xl" />
    },
    {
      title: 'Reliability',
      description: 'We deliver consistent, dependable protection 24/7, 365 days a year.',
      icon: <FaCheckCircle className="text-2xl md:text-3xl" />
    }
  ];

  const achievements = [
    'ISO 9001:2015 Certified',
    'Best Security Company Award 2023',
    '1000+ Satisfied Clients',
    '24/7 Customer Support Excellence'
  ];

  const ceo = {
    name: 'HANNIEL NJIRU NGUU',
    role: 'CEO & Founder',
    experience: '20+ years in security industry',
    vision: 'To revolutionize security services in Africa through innovation, training, and unwavering commitment to client safety.',
    message: 'At SecureGuard Pro, we understand that security is not just about protection - it\'s about creating an environment where you can focus on what matters most.'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-dark to-primary text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">About SecureGuard Pro</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto px-4">
            Kenya's leading security solutions provider with over 20 years of excellence in protecting what matters most.
          </p>
        </div>
      </div>

      {/* Company Story */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-dark text-center mb-8">Our Story</h2>
          <div className="prose prose-lg mx-auto">
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Founded in 2004 by <span className="font-bold text-primary">Hanniel Njiru Nguu</span>, Guidstar Security Services LTD emerged from a vision to transform Kenya's security landscape. What started as a small team of dedicated professionals has grown into one of East Africa's most trusted security service providers.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Over two decades, we've evolved from basic guarding services to comprehensive security solutions. Our journey has been marked by continuous innovation, investment in cutting-edge technology, and an unwavering commitment to excellence.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Today, we proudly serve over 1000 clients across Kenya, from small businesses to multinational corporations. Our success is built on a foundation of trust, professionalism, and a relentless pursuit of security excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
              <div className="text-primary text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-dark mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide exceptional security services that protect lives, property, and assets through professional expertise, advanced technology, and unwavering commitment to our clients' safety.
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300">
              <div className="text-primary text-5xl mb-4">👁️</div>
              <h3 className="text-2xl font-bold text-dark mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be the most trusted and innovative security solutions provider in Africa, setting the standard for excellence in protection services.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-dark to-primary text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
            <p className="text-lg text-blue-100">Delivering excellence across Kenya</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-110 transition-all duration-300">
                <div className="flex justify-center mb-4 text-accent">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Our Core Values</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-primary flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-dark mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-100 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              What makes SecureGuard Pro the preferred security partner for hundreds of clients
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Licensed and insured security professionals',
              '24/7 customer support and emergency response',
              'Advanced technology and surveillance systems',
              'Customized security solutions for every client',
              'Regular training and quality assurance',
              'Competitive pricing with flexible packages'
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Our Achievements</h2>
          <p className="text-gray-600 text-lg">Recognized for excellence in security services</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300">
              <FaTrophy className="text-4xl mx-auto mb-3" />
              <p className="font-semibold">{achievement}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CEO Section */}
      <div className="bg-gray-100 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Message from Our CEO</h2>
              <p className="text-gray-600 text-lg">Leadership that drives excellence</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white text-center">
                <FaHeart className="text-5xl mx-auto mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{ceo.name}</h3>
                <p className="text-lg opacity-90">{ceo.role}</p>
                <p className="text-md mt-2">{ceo.experience}</p>
              </div>
              <div className="p-8">
                <p className="text-gray-700 text-lg italic leading-relaxed mb-6">
                  "{ceo.vision}"
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {ceo.message}
                </p>
                <div className="mt-6 pt-6 border-t text-center">
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-all">
                    Get in Touch <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-dark text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your World?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and security assessment
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-accent px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105">
            Contact Us Today <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;