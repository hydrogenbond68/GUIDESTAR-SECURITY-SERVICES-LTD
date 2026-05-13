import React, { useState, useEffect } from 'react';
import { getUsers, getServices, getReviews, saveService, updateServices, deleteReview } from '../utils/localStorage';
import { compressImage, validateImage } from '../utils/imageUtils';
import { FaUsers, FaShieldAlt, FaStar, FaTrash, FaPlus, FaUpload, FaTimes } from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalServices: 0, totalReviews: 0 });
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    image: '',
    icon: '🛡️'
  });
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const users = getUsers();
    const servicesList = getServices();
    const reviewsList = getReviews();
    
    setStats({
      totalUsers: users.length,
      totalServices: servicesList.length,
      totalReviews: reviewsList.length
    });
    setServices(servicesList);
    setReviews(reviewsList);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      validateImage(file);
      setUploading(true);
      const compressedImage = await compressImage(file);
      setImagePreview(compressedImage);
      setNewService({ ...newService, image: compressedImage });
      setMessage('Image uploaded successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setUploading(false);
    }
  };

  const handleAddService = async () => {
    if (!newService.name || !newService.description || !newService.image) {
      setMessage('Please fill all fields and upload an image');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const service = {
      id: Date.now().toString(),
      ...newService,
      createdAt: new Date().toISOString()
    };
    
    saveService(service);
    loadData();
    setShowAddService(false);
    setNewService({ name: '', description: '', image: '', icon: '🛡️' });
    setImagePreview('');
    setMessage('Service added successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReview(reviewId);
      loadData();
      setMessage('Review deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const statCards = [
    { icon: <FaUsers />, label: 'Total Users', value: stats.totalUsers, color: 'bg-blue-500' },
    { icon: <FaShieldAlt />, label: 'Total Services', value: stats.totalServices, color: 'bg-green-500' },
    { icon: <FaStar />, label: 'Total Reviews', value: stats.totalReviews, color: 'bg-yellow-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-dark text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-300 mt-2">Manage your security services platform</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-full text-white text-2xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message */}
        {message && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {message}
          </div>
        )}

        {/* Services Management */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-dark">Manage Services</h2>
            <button
              onClick={() => setShowAddService(!showAddService)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
            >
              <FaPlus /> Add New Service
            </button>
          </div>

          {/* Add Service Form */}
          {showAddService && (
            <div className="p-6 border-b bg-gray-50">
              <h3 className="text-xl font-semibold mb-4">Add New Service</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Service Name</label>
                  <input
                    type="text"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    className="input-field"
                    placeholder="Enter service name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Icon (Choose one)</label>
                  <select
                    value={newService.icon}
                    onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                    className="input-field"
                  >
                    <option value="🛡️">🛡️ Shield</option>
                    <option value="📹">📹 Camera</option>
                    <option value="🐕">🐕 Dog</option>
                    <option value="🔒">🔒 Lock</option>
                    <option value="👮">👮 Officer</option>
                    <option value="🐕‍🦺">🐕‍🦺 Security Dog</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    className="input-field"
                    rows="3"
                    placeholder="Enter service description"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Service Image</label>
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors">
                      <FaUpload className="inline mr-2" />
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {uploading && <span className="text-gray-500">Uploading...</span>}
                  </div>
                  {imagePreview && (
                    <div className="mt-4 relative inline-block">
                      <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-lg" />
                      <button
                        onClick={() => {
                          setImagePreview('');
                          setNewService({ ...newService, image: '' });
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleAddService} className="btn-primary">
                  Add Service
                </button>
                <button
                  onClick={() => {
                    setShowAddService(false);
                    setImagePreview('');
                    setNewService({ name: '', description: '', image: '', icon: '🛡️' });
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Services List */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <div key={service.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <img src={service.image} alt={service.name} className="h-40 w-full object-cover rounded-lg mb-3" />
                  <h4 className="font-semibold text-lg">{service.name}</h4>
                  <p className="text-gray-600 text-sm mt-1">{service.description.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Management */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-dark">Manage Reviews</h2>
          </div>
          <div className="p-6">
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No reviews yet</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{review.userName}</span>
                        <span className="text-yellow-400">{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</span>
                        <span className="text-gray-400 text-sm">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-500 hover:text-red-700 transition-colors ml-4"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;