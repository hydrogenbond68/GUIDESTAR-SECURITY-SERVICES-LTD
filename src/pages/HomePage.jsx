import React from 'react';
import Hero from '../components/Home/Hero';
import Services from '../components/Home/Services';
import CompanyInfo from '../components/Home/CompanyInfo';
import Reviews from '../components/Home/Reviews';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Services />
      <CompanyInfo />
      <Reviews />
    </div>
  );
};

export default HomePage;