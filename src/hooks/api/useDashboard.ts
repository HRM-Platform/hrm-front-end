import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/lib/services/dashboard.service";

// Query Keys
export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
  activities: (limit?: number) => [...dashboardKeys.all, "activities", limit] as const,
  attendanceOverview: (days?: number) => [...dashboardKeys.all, "attendance-overview", days] as const,
};

// Get dashboard statistics
export const useDashboardStats = () => {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: () => dashboardService.getStats(),
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

// Get recent activities
export const useRecentActivities = (limit: number = 10) => {
  return useQuery({
    queryKey: dashboardKeys.activities(limit),
    queryFn: () => dashboardService.getRecentActivities(limit),
    refetchInterval: 60000, // Refetch every minute
  });
};

// Get attendance overview
export const useAttendanceOverview = (days: number = 7) => {
  return useQuery({
    queryKey: dashboardKeys.attendanceOverview(days),
    queryFn: () => dashboardService.getAttendanceOverview(days),
  });
};
