import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeesService } from "@/services/employees.service";
import type { CreateEmployeeInput, UpdateEmployeeInput } from "@/types";
import { toast } from "@/hooks/use-toast";

// Query Keys
export const employeeKeys = {
  all: ["employees"] as const,
  lists: () => [...employeeKeys.all, "list"] as const,
  list: (params?: any) => [...employeeKeys.lists(), params] as const,
  details: () => [...employeeKeys.all, "detail"] as const,
  detail: (id: number) => [...employeeKeys.details(), id] as const,
  byDepartment: (department: string) => [...employeeKeys.all, "department", department] as const,
  byStatus: (status: string) => [...employeeKeys.all, "status", status] as const,
};

// Get all employees
export const useEmployees = (params?: { page?: number; limit?: number; search?: string }) => {
  return useQuery({
    queryKey: employeeKeys.list(params),
    queryFn: () => employeesService.getAll(params),
  });
};

// Get employee by ID
export const useEmployee = (id: number) => {
  return useQuery({
    queryKey: employeeKeys.detail(id),
    queryFn: () => employeesService.getById(id),
    enabled: !!id,
  });
};

// Get employees by department
export const useEmployeesByDepartment = (department: string) => {
  return useQuery({
    queryKey: employeeKeys.byDepartment(department),
    queryFn: () => employeesService.getByDepartment(department),
    enabled: !!department,
  });
};

// Get employees by status
export const useEmployeesByStatus = (status: "active" | "on-leave" | "inactive") => {
  return useQuery({
    queryKey: employeeKeys.byStatus(status),
    queryFn: () => employeesService.getByStatus(status),
    enabled: !!status,
  });
};

// Create employee mutation
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEmployeeInput) => employeesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
      toast({
        title: "Success",
        description: "Employee created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create employee",
        variant: "destructive",
      });
    },
  });
};

// Update employee mutation
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEmployeeInput }) =>
      employeesService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
      queryClient.invalidateQueries({ queryKey: employeeKeys.detail(variables.id) });
      toast({
        title: "Success",
        description: "Employee updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update employee",
        variant: "destructive",
      });
    },
  });
};

// Delete employee mutation
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => employeesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
      toast({
        title: "Success",
        description: "Employee deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete employee",
        variant: "destructive",
      });
    },
  });
};
