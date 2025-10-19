import { AxiosError, AxiosResponse } from 'axios';
import { setHeader } from './helpers';
import { STATUS_MESSAGES } from './statusMessages';
import apiClient from './api';

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        setHeader(config, 'Authorization', `Bearer ${token}`);
        console.log('[API] Token attached:', token);
      } else {
        console.warn('[API] No auth token found');
      }
    }

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (apiKey) setHeader(config, 'X-API-Key', apiKey);

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const data = error.response?.data;
    const url = error.config?.url || 'Unknown URL';

    console.groupCollapsed(
      `%c[API ERROR] ${status || 'NETWORK'} - ${url}`,
      'color: #e74c3c; font-weight: bold;'
    );
    console.error('Message:', STATUS_MESSAGES[status || 0] || error.message);
    console.error('Response:', data);
    console.groupEnd();

    if (status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }

    (error as any).status = status ?? null;
    (error as any).data = data ?? null;

    return Promise.reject(error);
  }
);

export default apiClient;
