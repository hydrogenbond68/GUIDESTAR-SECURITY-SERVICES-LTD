import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  const handleWhatsApp = () => {
    const message = "Hello, I'm interested in your security services. Can you help me?";
    // Format: Country code (254) + phone number (704461031)
    window.open(`https://wa.me/254704461031?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsApp}
      className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all transform hover:scale-110 z-50 animate-bounce"
      style={{ animationDuration: '2s' }}
    >
      <FaWhatsapp className="text-3xl" />
    </button>
  );
};

export default WhatsAppButton;