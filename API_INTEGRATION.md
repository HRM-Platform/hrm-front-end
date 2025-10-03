# API Integration Guide

This document explains how to use the API integration in this Next.js HRIS application.

## 📁 Project Structure

```
src/
├── lib/
│   └── api/
│       └── client.ts          # Axios client with interceptors
├── services/                  # API service layer
│   ├── employees.service.ts
│   ├── attendance.service.ts
│   ├── dashboard.service.ts
│   └── leave.service.ts
├── hooks/
│   ├── api/                   # React Query hooks
│   │   ├── useEmployees.ts
│   │   ├── useAttendance.ts
│   │   ├── useDashboard.ts
│   │   └── useLeave.ts
│   └── use-toast.ts          # Toast notifications
└── types/
    └── index.ts              # TypeScript interfaces
```

## 🔧 Configuration

### Environment Variables

Create or update `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
# NEXT_PUBLIC_API_URL=https://your-production-api.com/api

# Optional: API Authentication
# NEXT_PUBLIC_API_KEY=your-api-key-here
```

## 📡 API Client Features

The API client (`src/lib/api/client.ts`) includes:

- **Axios instance** with base URL configuration
- **Request interceptors** for adding auth tokens and API keys
- **Response interceptors** for error handling
- **Automatic token management** from localStorage
- **Error handling** for common HTTP status codes (401, 403, 404, 500)

### Authentication

Tokens are automatically added to requests:

```typescript
// The client automatically reads from localStorage
const token = localStorage.getItem("auth_token");

// To set a token (after login):
localStorage.setItem("auth_token", "your-jwt-token");

// To remove token (on logout):
localStorage.removeItem("auth_token");
```

## 🎯 Using API Hooks

### Example 1: Fetch Employees

```typescript
"use client";

import { useEmployees } from "@/hooks/api/useEmployees";

export function EmployeeList() {
  const { data, isLoading, isError } = useEmployees({
    page: 1,
    limit: 20,
    search: "john"
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading employees</div>;

  return (
    <div>
      {data?.data.map((employee) => (
        <div key={employee.id}>{employee.name}</div>
      ))}
    </div>
  );
}
```

### Example 2: Create Employee

```typescript
"use client";

import { useCreateEmployee } from "@/hooks/api/useEmployees";

export function AddEmployeeForm() {
  const createEmployee = useCreateEmployee();

  const handleSubmit = (formData) => {
    createEmployee.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      department: formData.department,
      joinDate: formData.joinDate,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={createEmployee.isPending}>
        {createEmployee.isPending ? "Creating..." : "Create Employee"}
      </button>
    </form>
  );
}
```

### Example 3: Dashboard Stats

```typescript
"use client";

import { useDashboardStats } from "@/hooks/api/useDashboard";

export function Dashboard() {
  const { data } = useDashboardStats();

  return (
    <div>
      <h1>Total Employees: {data?.data.totalEmployees}</h1>
      <h2>Present Today: {data?.data.presentToday}</h2>
    </div>
  );
}
```

### Example 4: Clock In/Out

```typescript
"use client";

import { useClockIn, useClockOut } from "@/hooks/api/useAttendance";

export function AttendanceActions({ employeeId }) {
  const clockIn = useClockIn();
  const clockOut = useClockOut();

  const handleClockIn = () => {
    clockIn.mutate({
      employeeId,
      clockIn: new Date().toISOString(),
    });
  };

  const handleClockOut = () => {
    clockOut.mutate({
      employeeId,
      clockOut: new Date().toISOString(),
    });
  };

  return (
    <div>
      <button onClick={handleClockIn}>Clock In</button>
      <button onClick={handleClockOut}>Clock Out</button>
    </div>
  );
}
```

## 📋 Available Hooks

### Employee Hooks

- `useEmployees(params)` - Get all employees with pagination/search
- `useEmployee(id)` - Get single employee
- `useEmployeesByDepartment(department)` - Get employees by department
- `useEmployeesByStatus(status)` - Get employees by status
- `useCreateEmployee()` - Create employee mutation
- `useUpdateEmployee()` - Update employee mutation
- `useDeleteEmployee()` - Delete employee mutation

### Attendance Hooks

- `useTodayAttendance()` - Get today's attendance (auto-refresh every minute)
- `useAttendanceByDate(date)` - Get attendance for specific date
- `useAttendanceByEmployee(employeeId, params)` - Get employee's attendance history
- `useAttendanceStats(params)` - Get attendance statistics
- `useWeeklyAttendance()` - Get weekly attendance data
- `useClockIn()` - Clock in mutation
- `useClockOut()` - Clock out mutation

### Dashboard Hooks

- `useDashboardStats()` - Get dashboard statistics (auto-refresh every 5 min)
- `useRecentActivities(limit)` - Get recent activities (auto-refresh every minute)
- `useAttendanceOverview(days)` - Get attendance overview

### Leave Hooks

- `useLeaveRequests(params)` - Get all leave requests
- `useLeaveRequest(id)` - Get single leave request
- `useLeaveByEmployee(employeeId)` - Get employee's leave requests
- `usePendingLeaves()` - Get pending leave requests
- `useCreateLeave()` - Create leave request mutation
- `useUpdateLeaveStatus()` - Approve/reject leave mutation
- `useDeleteLeave()` - Delete leave request mutation

## 🔄 React Query Features

All hooks use React Query which provides:

- **Automatic caching** - Reduces unnecessary API calls
- **Background refetching** - Keeps data fresh
- **Loading & error states** - Built-in state management
- **Optimistic updates** - Instant UI updates
- **Request deduplication** - Prevents duplicate requests

### Query States

```typescript
const { data, isLoading, isError, error, isFetching } = useEmployees();

// isLoading: First time loading
// isFetching: Any loading (including background refetch)
// isError: Query failed
// error: Error object
// data: Successful response data
```

### Mutation States

```typescript
const mutation = useCreateEmployee();

mutation.mutate(data);

// mutation.isPending: Mutation in progress
// mutation.isSuccess: Mutation succeeded
// mutation.isError: Mutation failed
// mutation.error: Error object
```

## 🎨 TypeScript Types

All types are defined in `src/types/index.ts`:

- `Employee`, `CreateEmployeeInput`, `UpdateEmployeeInput`
- `AttendanceRecord`, `ClockInInput`, `ClockOutInput`
- `LeaveRequest`, `CreateLeaveInput`, `ApproveLeaveInput`
- `DashboardStats`, `RecentActivity`, `AttendanceData`
- `ApiResponse<T>`, `PaginatedResponse<T>`, `ApiError`

## 🛠️ Direct API Calls (if needed)

If you need to make direct API calls without React Query:

```typescript
import { employeesService } from "@/services/employees.service";

const fetchEmployees = async () => {
  try {
    const response = await employeesService.getAll({ page: 1, limit: 10 });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
```

## 📝 Backend API Requirements

Your backend API should follow these endpoint structures:

### Employees
- `GET /api/employees` - List employees (supports ?page, ?limit, ?search)
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/employees/department/:department` - Get by department
- `GET /api/employees/status/:status` - Get by status

### Attendance
- `GET /api/attendance/today` - Today's attendance
- `GET /api/attendance/date/:date` - Attendance by date
- `GET /api/attendance/employee/:id` - Employee attendance history
- `POST /api/attendance/clock-in` - Clock in
- `POST /api/attendance/clock-out` - Clock out
- `GET /api/attendance/stats` - Attendance statistics
- `GET /api/attendance/weekly` - Weekly attendance

### Dashboard
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/dashboard/activities` - Recent activities
- `GET /api/dashboard/attendance-overview` - Attendance overview

### Leave
- `GET /api/leave` - List leave requests
- `GET /api/leave/:id` - Get leave request
- `POST /api/leave` - Create leave request
- `PATCH /api/leave/:id/status` - Update leave status
- `DELETE /api/leave/:id` - Delete leave request
- `GET /api/leave/employee/:id` - Employee's leave requests
- `GET /api/leave/pending` - Pending leave requests

## 🔐 Response Format

All API responses should follow this format:

**Success Response:**
```json
{
  "success": true,
  "data": { /* your data */ },
  "message": "Optional success message"
}
```

**Paginated Response:**
```json
{
  "success": true,
  "data": [ /* array of items */ ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "field": ["error message"]
  }
}
```

## 🚀 Next Steps

1. Update `.env.local` with your API URL
2. Replace mock components with API-integrated versions
3. Implement authentication/login flow
4. Add error boundaries for better error handling
5. Customize toast notifications
6. Add loading skeletons for better UX

## 📚 Learn More

- [React Query Documentation](https://tanstack.com/query/latest)
- [Axios Documentation](https://axios-http.com/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
