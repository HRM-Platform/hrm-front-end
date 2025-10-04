import apiClient from '../api/client';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  status: string | boolean;
  token?: string;
  message?: string;
  data?: UserData;
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

/**
 * Calls the login API
 * @param payload { email, password }
 * @returns LoginResponse
 */
export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>(
      '/auth/login',
      payload
    );
    return response.data;
  } catch (error: any) {
    // Handle error and normalize the response
    return {
      status: 'success',
      code: error?.code,
      message: error.response?.data?.message || 'Something went wrong',
    };
  }
};
