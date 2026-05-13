import React, { createContext, useContext, useState, useEffect } from 'react';
import { getServices, updateServices as updateServicesInStorage } from '../utils/localStorage';

const ServiceContext = createContext();

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within ServiceProvider');
  }
  return context;
};

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadServices = () => {
    const allServices = getServices();
    setServices(allServices);
    setLoading(false);
  };

  const addService = (newService) => {
    const updatedServices = [...services, newService];
    updateServicesInStorage(updatedServices);
    setServices(updatedServices);
    // Trigger storage event for other tabs/windows
    window.dispatchEvent(new Event('storage'));
  };

  const updateService = (updatedService) => {
    const updatedServices = services.map(service => 
      service.id === updatedService.id ? updatedService : service
    );
    updateServicesInStorage(updatedServices);
    setServices(updatedServices);
    window.dispatchEvent(new Event('storage'));
  };

  const deleteService = (serviceId) => {
    const updatedServices = services.filter(service => service.id !== serviceId);
    updateServicesInStorage(updatedServices);
    setServices(updatedServices);
    window.dispatchEvent(new Event('storage'));
  };

  useEffect(() => {
    loadServices();
    
    // Listen for storage events (updates from other tabs/components)
    const handleStorageChange = () => {
      loadServices();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <ServiceContext.Provider value={{
      services,
      loading,
      addService,
      updateService,
      deleteService,
      refreshServices: loadServices
    }}>
      {children}
    </ServiceContext.Provider>
  );
};