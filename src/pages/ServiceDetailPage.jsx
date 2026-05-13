import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServices } from '../utils/localStorage';
import { FaWhatsapp, FaEnvelope, FaPhone, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const services = getServices();
    const foundService = services.find(s => s.id === id);
    setService(foundService);
    setLoading(false);
  }, [id]);

  const handleWhatsApp = () => {
    const message = `Hello, I'm interested in your ${service?.name} service. Can you please provide more information?`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = () => {
    const subject = `Inquiry about ${service?.name} service`;
    const body = `Hello,\n\nI'm interested in your ${service?.name} service. Could you please provide more details?\n\nThank you.`;
    window.location.href = `mailto:info@secureguardpro.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleCall = () => {
    window.location.href = 'tel:+15551234567';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h2>
          <button onClick={() => navigate('/services')} className="btn-primary">
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-dark to-primary">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <img 
          src={service.image} 
          alt={service.name}
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              {service.name}
            </h1>
            <button 
              onClick={() => navigate('/services')}
              className="inline-flex items-center gap-2 bg-white text-dark px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FaArrowLeft /> Back to Services
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">
                About This Service
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {service.description}
              </p>
              
              <h3 className="text-xl font-bold text-dark mb-3">Key Features:</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>24/7 Professional Support</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>Certified and Trained Experts</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>Customized Solutions</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  <span>Competitive Pricing</span>
                </li>
              </ul>

              <div className="bg-gray-50 rounded-lg p-4 mt-6">
                <h3 className="font-semibold text-dark mb-2">Service Includes:</h3>
                <p className="text-gray-600">
                  {service.name} includes comprehensive security solutions tailored to your specific needs. 
                  Our team of experts will assess your requirements and provide the best possible protection plan.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-dark mb-4 text-center">
                Get in Touch
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Interested in this service? Contact us now for a free consultation!
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-xl" />
                  Chat on WhatsApp
                </button>
                
                <button
                  onClick={handleEmail}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FaEnvelope className="text-xl" />
                  Send Email
                </button>
                
                <button
                  onClick={handleCall}
                  className="w-full bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <FaPhone className="text-xl" />
                  Call Us Now
                </button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-dark mb-2">Business Hours:</h4>
                <p className="text-gray-600 text-sm">Monday - Friday: 24/7</p>
                <p className="text-gray-600 text-sm">Saturday - Sunday: 24/7</p>
                <p className="text-gray-600 text-sm mt-2">Emergency Response: 24/7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Services Section */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-8 text-center">
            Other Services You Might Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getServices()
              .filter(s => s.id !== service.id)
              .slice(0, 3)
              .map(relatedService => (
                <div 
                  key={relatedService.id}
                  onClick={() => navigate(`/service/${relatedService.id}`)}
                  className="card cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
                >
                  <img 
                    src={relatedService.image} 
                    alt={relatedService.name}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{relatedService.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {relatedService.description.substring(0, 100)}...
                    </p>
                    <button className="mt-3 text-primary font-semibold hover:text-secondary">
                      Learn More →
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;