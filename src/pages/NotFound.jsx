import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <FaExclamationTriangle className="text-6xl text-yellow-500 mx-auto mb-6" />
        <h1 className="text-6xl font-extrabold text-dark mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="btn-primary inline-flex items-center gap-2"
        >
          <FaHome />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;