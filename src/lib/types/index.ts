// Employee Types
export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: "active" | "on-leave" | "inactive";
  avatar?: string;
  joinDate: string;
  salary?: number;
}

export interface CreateEmployeeInput {
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joinDate: string;
  salary?: number;
}

export interface UpdateEmployeeInput extends Partial<CreateEmployeeInput> {
  status?: "active" | "on-leave" | "inactive";
}

// Attendance Types
export interface AttendanceRecord {
  id: number;
  employeeId: number;
  name: string;
  department: string;
  clockIn: string;
  clockOut?: string;
  status: "present" | "absent" | "late" | "on-leave";
  workingHours: string;
  date: string;
}

export interface ClockInInput {
  employeeId: number;
  clockIn: string;
}

export interface ClockOutInput {
  employeeId: number;
  clockOut: string;
}

// Leave Types
export interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  leaveType: "sick" | "vacation" | "personal" | "emergency";
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface CreateLeaveInput {
  employeeId: number;
  leaveType: "sick" | "vacation" | "personal" | "emergency";
  startDate: string;
  endDate: string;
  reason: string;
}

export interface ApproveLeaveInput {
  leaveId: number;
  status: "approved" | "rejected";
  rejectionReason?: string;
}

// Dashboard Types
export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  pendingLeaves: number;
  monthlyPayroll: number;
  attendanceRate: number;
  employeeGrowth: number;
}

export interface RecentActivity {
  id: number;
  type: "leave" | "attendance" | "payroll" | "employee";
  message: string;
  time: string;
  status: "pending" | "success" | "approved" | "rejected";
}

export interface AttendanceData {
  date: string;
  present: number;
  absent: number;
}

// Payroll Types
export interface PayrollRecord {
  id: number;
  employeeId: number;
  employeeName: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: "pending" | "processed" | "paid";
  paidDate?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
