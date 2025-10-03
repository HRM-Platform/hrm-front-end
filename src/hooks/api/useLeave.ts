import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveService } from "@/lib/services/leave.service";
import type { CreateLeaveInput, ApproveLeaveInput } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

// Query Keys
export const leaveKeys = {
  all: ["leave"] as const,
  lists: () => [...leaveKeys.all, "list"] as const,
  list: (params?: any) => [...leaveKeys.lists(), params] as const,
  details: () => [...leaveKeys.all, "detail"] as const,
  detail: (id: number) => [...leaveKeys.details(), id] as const,
  byEmployee: (employeeId: number) => [...leaveKeys.all, "employee", employeeId] as const,
  pending: () => [...leaveKeys.all, "pending"] as const,
};

// Get all leave requests
export const useLeaveRequests = (params?: { page?: number; limit?: number; status?: string }) => {
  return useQuery({
    queryKey: leaveKeys.list(params),
    queryFn: () => leaveService.getAll(params),
  });
};

// Get leave request by ID
export const useLeaveRequest = (id: number) => {
  return useQuery({
    queryKey: leaveKeys.detail(id),
    queryFn: () => leaveService.getById(id),
    enabled: !!id,
  });
};

// Get leave requests by employee
export const useLeaveByEmployee = (employeeId: number) => {
  return useQuery({
    queryKey: leaveKeys.byEmployee(employeeId),
    queryFn: () => leaveService.getByEmployee(employeeId),
    enabled: !!employeeId,
  });
};

// Get pending leave requests
export const usePendingLeaves = () => {
  return useQuery({
    queryKey: leaveKeys.pending(),
    queryFn: () => leaveService.getPending(),
  });
};

// Create leave request mutation
export const useCreateLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLeaveInput) => leaveService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaveKeys.lists() });
      queryClient.invalidateQueries({ queryKey: leaveKeys.pending() });
      toast({
        title: "Success",
        description: "Leave request submitted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit leave request",
        variant: "destructive",
      });
    },
  });
};

// Update leave status mutation
export const useUpdateLeaveStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ApproveLeaveInput) => leaveService.updateStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaveKeys.lists() });
      queryClient.invalidateQueries({ queryKey: leaveKeys.pending() });
      toast({
        title: "Success",
        description: "Leave status updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update leave status",
        variant: "destructive",
      });
    },
  });
};

// Delete leave request mutation
export const useDeleteLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => leaveService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: leaveKeys.lists() });
      queryClient.invalidateQueries({ queryKey: leaveKeys.pending() });
      toast({
        title: "Success",
        description: "Leave request deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete leave request",
        variant: "destructive",
      });
    },
  });
};
