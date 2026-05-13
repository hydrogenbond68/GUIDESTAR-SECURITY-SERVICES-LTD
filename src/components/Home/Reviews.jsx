import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getReviews, saveReview } from '../../utils/localStorage';
import { validateReview, validateRating } from '../../utils/validation';
import { FaStar, FaStarHalfAlt, FaRegStar, FaUserCircle } from 'react-icons/fa';

const Reviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ rating: 5, comment: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = () => {
    const allReviews = getReviews();
    setReviews(allReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    setTotalReviews(allReviews.length);
    
    // Calculate average rating
    if (allReviews.length > 0) {
      const avg = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
      setAverageRating(avg);
    } else {
      setAverageRating(0);
    }
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
    if (errors.rating) setErrors({ ...errors, rating: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');

    // Check if user is logged in
    if (!user) {
      setErrors({ submit: 'Please login to submit a review' });
      return;
    }

    // Check if user is admin
    if (user.isAdmin) {
      setErrors({ submit: 'Admins cannot submit reviews' });
      return;
    }

    const newErrors = {};
    if (!validateReview(formData.comment)) newErrors.comment = 'Review must be between 10 and 500 characters';
    if (!validateRating(formData.rating)) newErrors.rating = 'Please select a rating';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      await saveReview({
        userId: user.id,
        userName: user.name,
        rating: formData.rating,
        comment: formData.comment
      });
      
      setSuccess('Review submitted successfully!');
      setFormData({ rating: 5, comment: '' });
      loadReviews(); // Reload reviews to show the new one immediately
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setErrors({ submit: 'Failed to submit review' });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) stars.push(<FaStar key={i} className="text-yellow-400" />);
      else if (i - 0.5 === rating) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      else stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Client Reviews</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            What our clients say about our security services
          </p>
        </div>

        {/* Rating Summary */}
        {totalReviews > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl p-6 mb-8 text-center">
            <div className="text-5xl font-bold text-primary mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex justify-center gap-1 mb-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-gray-600">
              Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Review Form - Only show if user is logged in and not admin */}
          {user && !user.isAdmin ? (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Share Your Experience</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        className="text-2xl focus:outline-none transition-transform hover:scale-110"
                      >
                        {star <= formData.rating ? (
                          <FaStar className="text-yellow-400" />
                        ) : (
                          <FaRegStar className="text-gray-300" />
                        )}
                      </button>
                    ))}
                  </div>
                  {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Your Review</label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    rows="4"
                    className="input-field"
                    placeholder="Share your experience with our services..."
                  ></textarea>
                  {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
                </div>

                {errors.submit && <p className="text-red-500 text-sm mb-4">{errors.submit}</p>}
                {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <FaUserCircle className="text-6xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Share Your Experience</h3>
              <p className="text-gray-600 mb-4">
                {!user ? 'Login to share your experience with our services' : 'Admins cannot submit reviews'}
              </p>
              {!user && (
                <Link to="/login" className="btn-primary inline-block">
                  Login to Review
                </Link>
              )}
            </div>
          )}

          {/* Reviews List - Visible to EVERYONE */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Customer Reviews ({totalReviews})
            </h3>
            {reviews.length === 0 ? (
              <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-xl">
                <FaUserCircle className="text-5xl text-gray-300 mx-auto mb-3" />
                <p>No reviews yet.</p>
                <p className="text-sm mt-2">Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 hover:bg-gray-50 p-3 rounded-lg transition-all duration-300">
                    <div className="flex items-start space-x-3">
                      <FaUserCircle className="text-3xl text-gray-400 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className="font-semibold text-dark">{review.userName}</span>
                          <div className="flex gap-1">{renderStars(review.rating)}</div>
                        </div>
                        <p className="text-gray-600 mb-2 leading-relaxed">{review.comment}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;