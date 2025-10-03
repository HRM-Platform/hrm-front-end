import { api } from "@/lib/api/client";
import type {
  AttendanceRecord,
  ClockInInput,
  ClockOutInput,
  ApiResponse,
  PaginatedResponse,
} from "@/lib/types";

export const attendanceService = {
  // Get today's attendance
  getToday: async () => {
    const response = await api.get<ApiResponse<AttendanceRecord[]>>("/attendance/today");
    return response.data;
  },

  // Get attendance by date
  getByDate: async (date: string) => {
    const response = await api.get<ApiResponse<AttendanceRecord[]>>(`/attendance/date/${date}`);
    return response.data;
  },

  // Get attendance by employee
  getByEmployee: async (employeeId: number, params?: { startDate?: string; endDate?: string }) => {
    const response = await api.get<PaginatedResponse<AttendanceRecord>>(
      `/attendance/employee/${employeeId}`,
      { params }
    );
    return response.data;
  },

  // Clock in
  clockIn: async (data: ClockInInput) => {
    const response = await api.post<ApiResponse<AttendanceRecord>>("/attendance/clock-in", data);
    return response.data;
  },

  // Clock out
  clockOut: async (data: ClockOutInput) => {
    const response = await api.post<ApiResponse<AttendanceRecord>>("/attendance/clock-out", data);
    return response.data;
  },

  // Get attendance statistics
  getStats: async (params?: { startDate?: string; endDate?: string }) => {
    const response = await api.get<
      ApiResponse<{
        present: number;
        absent: number;
        late: number;
        onLeave: number;
        attendanceRate: number;
      }>
    >("/attendance/stats", { params });
    return response.data;
  },

  // Get weekly attendance data
  getWeeklyData: async () => {
    const response = await api.get<
      ApiResponse<
        Array<{
          date: string;
          present: number;
          absent: number;
        }>
      >
    >("/attendance/weekly");
    return response.data;
  },
};
