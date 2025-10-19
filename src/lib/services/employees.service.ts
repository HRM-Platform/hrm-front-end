import type {
  Employee,
  CreateEmployeeInput,
  UpdateEmployeeInput,
  ApiResponse,
  PaginatedResponse,
} from '@/lib/types';
import api from '../api/api';

export const employeesService = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    const response = await api.get<PaginatedResponse<Employee>>('/employees', {
      params,
    });
    return response.data;
  },

  // Get employee by ID
  getById: async (id: number) => {
    const response = await api.get<ApiResponse<Employee>>(`/employees/${id}`);
    return response.data;
  },

  // Create new employee
  create: async (data: CreateEmployeeInput) => {
    const response = await api.post<ApiResponse<Employee>>('/employees', data);
    return response.data;
  },

  // Update employee
  update: async (id: number, data: UpdateEmployeeInput) => {
    const response = await api.put<ApiResponse<Employee>>(
      `/employees/${id}`,
      data
    );
    return response.data;
  },

  // Delete employee
  delete: async (id: number) => {
    const response = await api.delete<ApiResponse<void>>(`/employees/${id}`);
    return response.data;
  },

  // Get employees by department
  getByDepartment: async (department: string) => {
    const response = await api.get<ApiResponse<Employee[]>>(
      `/employees/department/${department}`
    );
    return response.data;
  },

  // Get employees by status
  getByStatus: async (status: 'active' | 'on-leave' | 'inactive') => {
    const response = await api.get<ApiResponse<Employee[]>>(
      `/employees/status/${status}`
    );
    return response.data;
  },
};
