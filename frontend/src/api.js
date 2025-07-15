import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

// Request interceptor: attach token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle expired access token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if token expired and not already retried
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const res = await axios.post('http://127.0.0.1:8000/token/refresh/', {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;
        localStorage.setItem('access_token', newAccessToken);

        // Set new token in header and retry
        originalRequest.headers.Authorization =`Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout user
        localStorage.clear();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default API;