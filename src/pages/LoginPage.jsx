import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { findUser } from '../utils/localStorage';
import { validateEmail, validatePassword } from '../utils/validation';
import Logo from '../components/Common/Logo';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setLoginError('');

    const newErrors = {};
    if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 6 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (formData.email === 'admin@secureguard.com' && formData.password === 'admin123') {
      login({ id: 'admin', name: 'Administrator', email: formData.email, role: 'admin' });
      navigate('/admin');
      return;
    }

    const user = findUser(formData.email, formData.password);
    if (user) {
      login({ id: user.id, name: user.name, email: user.email, role: 'user' });
      navigate('/');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Logo className="h-24 w-auto" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or <Link to="/register" className="font-medium text-primary hover:text-secondary">create a new account</Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
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
          </div>

          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {loginError}
            </div>
          )}

          <div>
            <button type="submit" className="btn-primary w-full">
              Sign in
            </button>
          </div>
          
          <div className="text-center text-sm text-gray-600">
            <p>register as a new user</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;