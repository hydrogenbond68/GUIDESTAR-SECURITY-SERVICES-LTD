import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { saveUser, findUserByEmail } from '../utils/localStorage';
import { validateEmail, validatePassword, validateName } from '../utils/validation';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [registerError, setRegisterError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setRegisterError('');
    setSuccess('');

    const newErrors = {};
    if (!validateName(formData.name)) newErrors.name = 'Name must be at least 2 characters';
    if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check if user already exists
    const existingUser = findUserByEmail(formData.email);
    if (existingUser) {
      setRegisterError('User with this email already exists');
      return;
    }

    // Save new user
    saveUser({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    setSuccess('Registration successful! Redirecting to login...');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <img 
              src="/logo.png" 
              alt="SecureGuard Pro" 
              className="h-24 w-auto object-contain mb-4"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/200x80/1e3a8a/white?text=SecureGuard";
              }}
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or <Link to="/login" className="font-medium text-primary hover:text-secondary">sign in to existing account</Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input 
                id="name" 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                className="input-field mt-1" 
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input 
                id="email" 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                className="input-field mt-1" 
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                id="password" 
                type="password" 
                value={formData.password} 
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                className="input-field mt-1" 
                required
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input 
                id="confirmPassword" 
                type="password" 
                value={formData.confirmPassword} 
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
                className="input-field mt-1" 
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {registerError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {registerError}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              {success}
            </div>
          )}

          <div>
            <button type="submit" className="btn-primary w-full">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;