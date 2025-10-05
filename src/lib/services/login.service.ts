import { api } from '../api/client';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserData {
  access_token: string;
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  code: number;
  status: string | boolean;
  token?: string;
  message?: string;
  data?: UserData;
}

export interface ApiError {
  status?: number | string | null;
  code?: number | string | null;
  message?: string;
  data?: any;
}

// ----------------------------
// Helper to normalize errors
// ----------------------------
const handleApiError = (error: any): ApiError => ({
  status: error?.status || null,
  code: error?.code || null,
  message: error?.data?.message || 'Something went wrong',
  data: error?.data || null,
});

// ----------------------------
// Auth Services
// ----------------------------
export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  try {
    // api.post automatically returns response.data
    const data = await api.post<LoginResponse>('/auth/login', payload);
    return data;
  } catch (error: any) {
    // Normalize the error
    throw handleApiError(error);
  }
};

export const checkEmail = async (email: string) => {
  try {
    const data = await api.post('auth/check-email', {
      email,
    });
    return data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};
