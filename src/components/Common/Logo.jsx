import React, { useState, useEffect } from 'react';

const Logo = ({ className = "h-12 w-auto", showText = false, textColor = "text-white" }) => {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState('/logo.png');

  // Try multiple logo paths
  const logoPaths = [
    '/logo.png',
    '/images/logo.png'
  ];

  useEffect(() => {
    // Try to find a working logo path
    const testImage = (url) => {
      const img = new Image();
      img.onload = () => {
        setImageSrc(url);
        setImageError(false);
      };
      img.onerror = () => {
        const currentIndex = logoPaths.indexOf(url);
        if (currentIndex < logoPaths.length - 1) {
          testImage(logoPaths[currentIndex + 1]);
        } else {
          setImageError(true);
        }
      };
      img.src = url;
    };
    
    testImage(logoPaths[0]);
  }, []);

  if (imageError) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-lg text-center">
          <span className="text-white font-bold text-xs md:text-sm">GUIDESTAR SECURITY SERVICES LTD</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <img 
        src={imageSrc} 
        alt="GUIDESTAR SECURITY SERVICES LTD" 
        className={className}
        style={{ objectFit: 'contain' }}
      />
      {showText && <span className={textColor}>GUIDESTAR SECURITY SERVICES LTD</span>}
    </div>
  );
};

export default Logo;