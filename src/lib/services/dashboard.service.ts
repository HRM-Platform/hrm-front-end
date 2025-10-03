import { api } from "@/lib/api/client";
import type { DashboardStats, RecentActivity, AttendanceData, ApiResponse } from "@/lib/types";

export const dashboardService = {
  // Get dashboard statistics
  getStats: async () => {
    const response = await api.get<ApiResponse<DashboardStats>>("/dashboard/stats");
    return response.data;
  },

  // Get recent activities
  getRecentActivities: async (limit: number = 10) => {
    const response = await api.get<ApiResponse<RecentActivity[]>>("/dashboard/activities", {
      params: { limit },
    });
    return response.data;
  },

  // Get attendance overview
  getAttendanceOverview: async (days: number = 7) => {
    const response = await api.get<ApiResponse<AttendanceData[]>>("/dashboard/attendance-overview", {
      params: { days },
    });
    return response.data;
  },
};
