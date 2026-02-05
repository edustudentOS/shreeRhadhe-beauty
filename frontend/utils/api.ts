import axios from 'axios';
import Constants from 'expo-constants';

const BACKEND_URL = Constants.expoConfig?.extra?.EXPO_PUBLIC_BACKEND_URL || process.env.EXPO_PUBLIC_BACKEND_URL || '';

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

// API Functions
export const productsAPI = {
  getAll: (category?: string, featured?: boolean) => {
    const params: any = {};
    if (category) params.category = category;
    if (featured !== undefined) params.featured = featured;
    return api.get('/api/products', { params });
  },
  getById: (id: string) => api.get(`/api/products/${id}`),
  create: (data: any) => api.post('/api/products', data),
  update: (id: string, data: any) => api.put(`/api/products/${id}`, data),
  delete: (id: string) => api.delete(`/api/products/${id}`),
};

export const bookingsAPI = {
  getAll: (status?: string) => api.get('/api/bookings', { params: status ? { status } : {} }),
  create: (data: any) => api.post('/api/bookings', data),
  updateStatus: (id: string, status: string) => api.put(`/api/bookings/${id}`, { status }),
};

export const reviewsAPI = {
  getAll: (approved?: boolean) => api.get('/api/reviews', { params: approved !== undefined ? { approved } : {} }),
  create: (data: any) => api.post('/api/reviews', data),
  approve: (id: string, approved: boolean) => api.put(`/api/reviews/${id}`, { approved }),
};

export const servicesAPI = {
  getAll: () => api.get('/api/services'),
  create: (data: any) => api.post('/api/services', data),
  update: (id: string, data: any) => api.put(`/api/services/${id}`, data),
  delete: (id: string) => api.delete(`/api/services/${id}`),
};

export const galleryAPI = {
  getAll: () => api.get('/api/gallery'),
  create: (data: any) => api.post('/api/gallery', data),
  delete: (id: string) => api.delete(`/api/gallery/${id}`),
};

export const adminAPI = {
  login: (username: string, password: string) => api.post('/api/admin/login', { username, password }),
};

export const seedDataAPI = {
  seed: () => api.post('/api/seed-data'),
};
