import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { STATUS_MESSAGES } from '../statusMessages';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// ----------------------------
// Helper to safely set headers
// ----------------------------
const setHeader = (config: AxiosRequestConfig, key: string, value: string) => {
  config.headers = config.headers ?? {};
  (config.headers as any)[key] = value;
};

// ----------------------------
// Request Interceptor
// ----------------------------
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) setHeader(config, 'Authorization', `Bearer ${token}`);

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (apiKey) setHeader(config, 'X-API-Key', apiKey);

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ----------------------------
// Response Interceptor
// ----------------------------
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const responseData = error.response?.data || error.message || null;

    // Attach status and data to the original error
    (error as any).status = status || null;
    (error as any).data = responseData;

    if (status) {
      if (status === 401) {
        localStorage.removeItem('auth_token');
        if (typeof window !== 'undefined') window.location.href = '/login';
      }

      const message = STATUS_MESSAGES[status] || `Unexpected Error: ${status}`;
      console.error(message, responseData);
    } else if (error.request) {
      console.error(
        'Network error: No response received from server',
        error.request
      );
    } else {
      console.error('Error:', responseData);
    }

    return Promise.reject(error);
  }
);

// ----------------------------
// API Wrapper Methods
// ----------------------------
export const api = {
  get: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  },
  post: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  },
  put: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  },
  patch: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await apiClient.patch<T>(url, data, config);
    return response.data;
  },
  delete: async <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  },
};

export default apiClient;
