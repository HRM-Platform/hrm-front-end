import { api } from "@/lib/api/client";
import type {
  LeaveRequest,
  CreateLeaveInput,
  ApproveLeaveInput,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

export const leaveService = {
  // Get all leave requests
  getAll: async (params?: { page?: number; limit?: number; status?: string }) => {
    const response = await api.get<PaginatedResponse<LeaveRequest>>("/leave", { params });
    return response.data;
  },

  // Get leave request by ID
  getById: async (id: number) => {
    const response = await api.get<ApiResponse<LeaveRequest>>(`/leave/${id}`);
    return response.data;
  },

  // Create leave request
  create: async (data: CreateLeaveInput) => {
    const response = await api.post<ApiResponse<LeaveRequest>>("/leave", data);
    return response.data;
  },

  // Approve/Reject leave request
  updateStatus: async (data: ApproveLeaveInput) => {
    const response = await api.patch<ApiResponse<LeaveRequest>>(
      `/leave/${data.leaveId}/status`,
      data
    );
    return response.data;
  },

  // Get leave requests by employee
  getByEmployee: async (employeeId: number) => {
    const response = await api.get<ApiResponse<LeaveRequest[]>>(`/leave/employee/${employeeId}`);
    return response.data;
  },

  // Get pending leave requests
  getPending: async () => {
    const response = await api.get<ApiResponse<LeaveRequest[]>>("/leave/pending");
    return response.data;
  },

  // Delete leave request
  delete: async (id: number) => {
    const response = await api.delete<ApiResponse<void>>(`/leave/${id}`);
    return response.data;
  },
};
