export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validateReview = (review) => {
  return review.trim().length >= 10 && review.trim().length <= 500;
};

export const validateRating = (rating) => {
  return rating >= 1 && rating <= 5;
};