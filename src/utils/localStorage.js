const USERS_KEY = 'security_users';
const SERVICES_KEY = 'security_services';
const REVIEWS_KEY = 'security_reviews';
const CURRENT_USER_KEY = 'security_current_user';

const defaultServices = [
  {
    id: '1',
    name: 'Guarding Services',
    description: 'Professional security guards for residential and commercial properties. 24/7 surveillance and rapid response. Our trained guards provide access control, crowd management, and emergency response services.',
    image: 'https://media.istockphoto.com/id/1319764687/photo/security-guard-standing-outside-building.jpg?s=612x612&w=0&k=20&c=6ZpBUmhJnXwjCx0japPdi2gzJzyhP9-lQyyR3Pbqg_g=',
    icon: '🛡️'
  },
  {
    id: '2',
    name: 'CCTV Installation',
    description: 'State-of-the-art CCTV systems with remote monitoring. High-definition cameras, night vision, motion detection, and intelligent analytics for complete surveillance coverage of your property.',
    image: 'https://media.istockphoto.com/id/1320843452/photo/security-camera-over-city.jpg?s=612x612&w=0&k=20&c=GqA2O7qZVjLf_1G1-IA6eL2I4JW8fYUGIdHrr2B9zE4=',
    icon: '📹'
  },
  {
    id: '3',
    name: 'Dog Handling & Training',
    description: 'Expertly trained security dogs and handlers for enhanced security operations. Our K9 units are trained in patrol, detection, narcotics search, and suspect apprehension.',
    image: 'https://media.istockphoto.com/id/1180543700/photo/german-shepherd-dog-in-police-uniform.jpg?s=612x612&w=0&k=20&c=GkOZ9H2VYUh4Q8K5Xk_y6QF3m0BxR_t3hB2jFj9VKDY=',
    icon: '🐕'
  },
  {
    id: '4',
    name: 'Protection Services',
    description: 'Comprehensive protection for life and property. Executive protection, VIP security, asset protection, and risk assessment services for high-value targets and critical infrastructure.',
    image: 'https://media.istockphoto.com/id/1284592983/photo/closeup-of-security-guard-wearing-body-armor-vest.jpg?s=612x612&w=0&k=20&c=uPmIDv9iFyyE9GBIh-wn0XV2XZ2rF3eQOpS-eOkNq5Y=',
    icon: '🔒'
  },
  {
    id: '5',
    name: 'Trained Personnel',
    description: 'Highly trained security professionals certified in latest security protocols. Continuous training in conflict resolution, first aid, fire safety, and emergency response procedures.',
    image: 'https://media.istockphoto.com/id/1330650907/photo/security-guards-standing-outside-building.jpg?s=612x612&w=0&k=20&c=od69ZkQhR_ybOO1ylnIfcCLYTnP2LWHKk69z7bqNHqY=',
    icon: '👮'
  },
  {
    id: '6',
    name: 'Security Dogs',
    description: 'Specially trained security dogs for patrol, detection, and response. German Shepherds and Belgian Malinois trained in perimeter security, narcotics detection, and suspect apprehension.',
    image: 'https://media.istockphoto.com/id/1147242551/photo/belgian-malinois-dog-police-dog.jpg?s=612x612&w=0&k=20&c=ufsXr0cWZPUIKe_3Ih3YMrT8uG6Y9sXHWTNWIQ5ktuw=',
    icon: '🐕‍🦺'
  }
];

export const initializeStorage = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(SERVICES_KEY)) {
    localStorage.setItem(SERVICES_KEY, JSON.stringify(defaultServices));
  }
  
  if (!localStorage.getItem(REVIEWS_KEY)) {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify([]));
  }
};

export const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user) => {
  const users = getUsers();
  users.push({ ...user, id: Date.now().toString(), createdAt: new Date().toISOString() });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
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
};

export const updateServices = (services) => {
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
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
};

export const deleteReview = (reviewId) => {
  const reviews = getReviews();
  const updatedReviews = reviews.filter(review => review.id !== reviewId);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(updatedReviews));
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