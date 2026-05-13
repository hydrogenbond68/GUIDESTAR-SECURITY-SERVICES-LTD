import React, { useState, useEffect } from 'react';
import { getUsers, getReviews, deleteReview } from '../utils/localStorage';
import { compressImage, validateImage } from '../utils/imageUtils';
import { useServices } from '../context/ServiceContext';
import { FaUsers, FaShieldAlt, FaStar, FaTrash, FaPlus, FaUpload, FaTimes, FaEdit } from 'react-icons/fa';

const AdminDashboard = () => {
  const { services, addService, updateService, deleteService, refreshServices } = useServices();
  const [stats, setStats] = useState({ totalUsers: 0, totalServices: 0, totalReviews: 0 });
  const [reviews, setReviews] = useState([]);
  const [showAddService, setShowAddService] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    image: '',
    icon: '🛡️'
  });
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  useEffect(() => {
    loadData();
  }, [services]); // Re-run when services change

  const loadData = () => {
    const users = getUsers();
    const reviewsList = getReviews();
    
    setStats({
      totalUsers: users.length,
      totalServices: services.length,
      totalReviews: reviewsList.length
    });
    setReviews(reviewsList);
  };

  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
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
      showMessage('Image uploaded successfully!');
    } catch (error) {
      showMessage(error.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleAddService = async () => {
    if (!newService.name || !newService.description || !newService.image) {
      showMessage('Please fill all fields and upload an image', 'error');
      return;
    }

    const service = {
      id: Date.now().toString(),
      ...newService,
      createdAt: new Date().toISOString()
    };
    
    addService(service);
    resetForm();
    showMessage('Service added successfully! Updates appear everywhere instantly.');
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setNewService({
      name: service.name,
      description: service.description,
      image: service.image,
      icon: service.icon
    });
    setImagePreview(service.image);
    setShowAddService(true);
  };

  const handleUpdateService = () => {
    if (!newService.name || !newService.description) {
      showMessage('Please fill all fields', 'error');
      return;
    }

    const updatedService = {
      ...editingService,
      ...newService,
      updatedAt: new Date().toISOString()
    };
    
    updateService(updatedService);
    resetForm();
    showMessage('Service updated successfully! Updates appear everywhere instantly.');
  };

  const handleDeleteService = (serviceId, serviceName) => {
    if (window.confirm(`Are you sure you want to delete "${serviceName}"? This action cannot be undone.`)) {
      deleteService(serviceId);
      showMessage(`"${serviceName}" has been deleted! Updates appear everywhere instantly.`);
    }
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReview(reviewId);
      loadData();
      showMessage('Review deleted successfully!');
    }
  };

  const resetForm = () => {
    setShowAddService(false);
    setEditingService(null);
    setNewService({ name: '', description: '', image: '', icon: '🛡️' });
    setImagePreview('');
  };

  const statCards = [
    { icon: <FaUsers />, label: 'Total Users', value: stats.totalUsers, color: 'bg-blue-500' },
    { icon: <FaShieldAlt />, label: 'Total Services', value: stats.totalServices, color: 'bg-green-500' },
    { icon: <FaStar />, label: 'Total Reviews', value: stats.totalReviews, color: 'bg-yellow-500' }
  ];

  const iconOptions = [
    { value: '🛡️', label: '🛡️ Shield' },
    { value: '📹', label: '📹 Camera' },
    { value: '🐕', label: '🐕 Dog' },
    { value: '🔒', label: '🔒 Lock' },
    { value: '👮', label: '👮 Officer' },
    { value: '🐕‍🦺', label: '🐕‍🦺 Security Dog' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-dark text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-300 mt-2">Manage your security services platform</p>
          <p className="text-green-300 text-sm mt-1">✓ Changes sync instantly across the entire website</p>
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
          <div className={`mb-4 ${messageType === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} px-4 py-3 rounded relative border`}>
            {message}
          </div>
        )}

        {/* Services Management */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-dark">Manage Services ({services.length})</h2>
            <button
              onClick={() => {
                resetForm();
                setShowAddService(true);
              }}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
            >
              <FaPlus /> Add New Service
            </button>
          </div>

          {/* Add/Edit Service Form */}
          {showAddService && (
            <div className="p-6 border-b bg-gray-50">
              <h3 className="text-xl font-semibold mb-4">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Service Name *</label>
                  <input
                    type="text"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    className="input-field"
                    placeholder="Enter service name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Icon</label>
                  <select
                    value={newService.icon}
                    onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                    className="input-field"
                  >
                    {iconOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Description *</label>
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
                      {editingService && newService.image ? 'Change Image' : 'Upload Image'}
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
                <button 
                  onClick={editingService ? handleUpdateService : handleAddService} 
                  className="btn-primary"
                >
                  {editingService ? 'Update Service' : 'Add Service'}
                </button>
                <button onClick={resetForm} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Services List with Delete & Edit Buttons */}
          <div className="p-6">
            {services.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No services added yet. Click "Add New Service" to get started.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div key={service.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white relative">
                    <div className="relative h-48">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/600x400/1e3a8a/white?text=Service+Image";
                        }}
                      />
                      {/* Action Buttons Overlay */}
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button
                          onClick={() => handleEditService(service)}
                          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                          title="Edit Service"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id, service.name)}
                          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                          title="Delete Service"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-3xl mb-2">{service.icon}</div>
                      <h3 className="font-bold text-lg text-dark mb-2">{service.name}</h3>
                      <p className="text-gray-600 text-sm">{service.description.substring(0, 100)}...</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviews Management */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-dark">Manage Reviews ({reviews.length})</h2>
          </div>
          <div className="p-6">
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No reviews yet</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="font-semibold">{review.userName}</span>
                        <span className="text-yellow-400">{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</span>
                        <span className="text-gray-400 text-sm">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-500 hover:text-red-700 transition-colors ml-4 p-2"
                      title="Delete Review"
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