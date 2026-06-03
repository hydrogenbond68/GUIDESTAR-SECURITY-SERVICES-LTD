const USERS_KEY = 'security_users';
const SERVICES_KEY = 'security_services';
const REVIEWS_KEY = 'security_reviews';
const CURRENT_USER_KEY = 'security_current_user';

const defaultServices = [
  {
    id: '1',
    name: 'Guarding Services',
    description: 'Professional security guards for residential and commercial properties. 24/7 surveillance and rapid response. Our trained guards provide access control, crowd management, and emergency response services.',
    image: '/images/services/guarding.jpg',
    icon: '🛡️'
  },
  {
    id: '2',
    name: 'CCTV Installation',
    description: 'State-of-the-art CCTV systems with remote monitoring. High-definition cameras, night vision, motion detection, and intelligent analytics for complete surveillance coverage of your property.',
    image: '/images/services/cctv.jpg',
    icon: '📹'
  },
  {
    id: '3',
    name: 'Dog Handling & Training',
    description: 'Expertly trained security dogs and handlers for enhanced security operations. Our K9 units are trained in patrol, detection, narcotics search, and suspect apprehension.',
    image: '/images/services/dog-handling.jpg',
    icon: '🐕'
  },
  {
    id: '4',
    name: 'Protection Services',
    description: 'Comprehensive protection for life and property. Executive protection, VIP security, asset protection, and risk assessment services for high-value targets and critical infrastructure.',
    image: '/images/services/protection.jpg',
    icon: '🔒'
  },
  {
    id: '5',
    name: 'Trained Personnel',
    description: 'Highly trained security professionals certified in latest security protocols. Continuous training in conflict resolution, first aid, fire safety, and emergency response procedures.',
    image: '/images/services/personnel.jpg',
    icon: '👮'
  },
  {
    id: '6',
    name: 'Security Dogs',
    description: 'Specially trained security dogs for patrol, detection, and response. German Shepherds and Belgian Malinois trained in perimeter security, narcotics detection, and suspect apprehension.',
    image: '/images/services/security-dogs.jpg',
    icon: '🐕‍🦺'
  }
];

const STORAGE_VERSION = '1.1'; // Increment this to force reset on all clients
const VERSION_KEY = 'security_version';

export const initializeStorage = () => {
  const currentVersion = localStorage.getItem(VERSION_KEY);
  
  if (currentVersion !== STORAGE_VERSION) {
    // Version mismatch or first run - update services to latest defaults
    localStorage.setItem(SERVICES_KEY, JSON.stringify(defaultServices));
    localStorage.setItem(VERSION_KEY, STORAGE_VERSION);
    window.dispatchEvent(new Event('storage'));
  }

  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(REVIEWS_KEY)) {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify([]));
  }
};

export const clearAllStorage = () => {
  localStorage.clear();
  window.location.reload();
};

export const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user) => {
  const users = getUsers();
  users.push({ ...user, id: Date.now().toString(), createdAt: new Date().toISOString() });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  // Trigger storage event so other tabs/components update
  window.dispatchEvent(new Event('storage'));
};

export const findUser = (email, password) => {
  const users = getUsers();
  return users.find(user => user.email === email && user.password === password);
};

export const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

export const getServices = () => {
  const services = localStorage.getItem(SERVICES_KEY);
  return services ? JSON.parse(services) : [];
};

export const saveService = (service) => {
  const services = getServices();
  services.push(service);
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
  window.dispatchEvent(new Event('storage'));
};

export const updateServices = (services) => {
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
  window.dispatchEvent(new Event('storage'));
};

export const getReviews = () => {
  const reviews = localStorage.getItem(REVIEWS_KEY);
  return reviews ? JSON.parse(reviews) : [];
};

export const saveReview = (review) => {
  const reviews = getReviews();
  reviews.push({
    ...review,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  });
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  window.dispatchEvent(new Event('storage'));
};

export const deleteReview = (reviewId) => {
  const reviews = getReviews();
  const updatedReviews = reviews.filter(review => review.id !== reviewId);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(updatedReviews));
  window.dispatchEvent(new Event('storage'));
};

export const setCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const clearCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};