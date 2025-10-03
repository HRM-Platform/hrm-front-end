import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { attendanceService } from "@/services/attendance.service";
import type { ClockInInput, ClockOutInput } from "@/types";
import { toast } from "@/hooks/use-toast";

// Query Keys
export const attendanceKeys = {
  all: ["attendance"] as const,
  today: () => [...attendanceKeys.all, "today"] as const,
  byDate: (date: string) => [...attendanceKeys.all, "date", date] as const,
  byEmployee: (employeeId: number, params?: any) =>
    [...attendanceKeys.all, "employee", employeeId, params] as const,
  stats: (params?: any) => [...attendanceKeys.all, "stats", params] as const,
  weekly: () => [...attendanceKeys.all, "weekly"] as const,
};

// Get today's attendance
export const useTodayAttendance = () => {
  return useQuery({
    queryKey: attendanceKeys.today(),
    queryFn: () => attendanceService.getToday(),
    refetchInterval: 60000, // Refetch every minute
  });
};

// Get attendance by date
export const useAttendanceByDate = (date: string) => {
  return useQuery({
    queryKey: attendanceKeys.byDate(date),
    queryFn: () => attendanceService.getByDate(date),
    enabled: !!date,
  });
};

// Get attendance by employee
export const useAttendanceByEmployee = (
  employeeId: number,
  params?: { startDate?: string; endDate?: string }
) => {
  return useQuery({
    queryKey: attendanceKeys.byEmployee(employeeId, params),
    queryFn: () => attendanceService.getByEmployee(employeeId, params),
    enabled: !!employeeId,
  });
};

// Get attendance statistics
export const useAttendanceStats = (params?: { startDate?: string; endDate?: string }) => {
  return useQuery({
    queryKey: attendanceKeys.stats(params),
    queryFn: () => attendanceService.getStats(params),
  });
};

// Get weekly attendance data
export const useWeeklyAttendance = () => {
  return useQuery({
    queryKey: attendanceKeys.weekly(),
    queryFn: () => attendanceService.getWeeklyData(),
  });
};

// Clock in mutation
export const useClockIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ClockInInput) => attendanceService.clockIn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: attendanceKeys.today() });
      queryClient.invalidateQueries({ queryKey: attendanceKeys.stats() });
      toast({
        title: "Success",
        description: "Clocked in successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to clock in",
        variant: "destructive",
      });
    },
  });
};

// Clock out mutation
export const useClockOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ClockOutInput) => attendanceService.clockOut(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: attendanceKeys.today() });
      queryClient.invalidateQueries({ queryKey: attendanceKeys.stats() });
      toast({
        title: "Success",
        description: "Clocked out successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to clock out",
        variant: "destructive",
      });
    },
  });
};
