import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, CheckCircle, XCircle, AlertCircle, Calendar } from "lucide-react";

const todayAttendance = [
  {
    id: 1,
    name: "John Doe",
    clockIn: "09:00 AM",
    clockOut: "06:00 PM",
    status: "present",
    workingHours: "9h 00m",
    department: "Engineering"
  },
  {
    id: 2,
    name: "Sarah Wilson",
    clockIn: "08:45 AM",
    clockOut: "-",
    status: "present",
    workingHours: "6h 15m",
    department: "HR"
  },
  {
    id: 3,
    name: "Mike Johnson",
    clockIn: "-",
    clockOut: "-",
    status: "absent",
    workingHours: "0h 00m",
    department: "Marketing"
  },
  {
    id: 4,
    name: "Emma Davis",
    clockIn: "09:15 AM",
    clockOut: "-",
    status: "late",
    workingHours: "5h 45m",
    department: "Finance"
  },
];

const attendanceStats = [
  { label: "Present", count: 231, color: "text-success", icon: CheckCircle },
  { label: "Absent", count: 8, color: "text-destructive", icon: XCircle },
  { label: "Late", count: 5, color: "text-warning", icon: AlertCircle },
  { label: "On Leave", count: 3, color: "text-muted-foreground", icon: Calendar },
];

export function AttendanceTracking() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Attendance Tracking</h2>
          <p className="text-muted-foreground">Today's attendance overview</p>
        </div>
        <Button className="gap-2">
          <Clock className="h-4 w-4" />
          Clock In/Out
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {attendanceStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.count}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Today's Attendance ({new Date().toLocaleDateString()})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayAttendance.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {record.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{record.name}</p>
                    <p className="text-sm text-muted-foreground">{record.department}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Clock In</p>
                    <p className="font-medium">{record.clockIn}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Clock Out</p>
                    <p className="font-medium">{record.clockOut}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Hours</p>
                    <p className="font-medium">{record.workingHours}</p>
                  </div>
                  <Badge variant={
                    record.status === "present" ? "default" :
                    record.status === "late" ? "secondary" :
                    "destructive"
                  }>
                    {record.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}