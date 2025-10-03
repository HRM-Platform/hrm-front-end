import { StatCard } from "./StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Clock, 
  Calendar, 
  DollarSign,
  CheckCircle,
  BarChart3
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const recentActivities = [
  { id: 1, type: "leave", message: "John Doe requested 3 days leave", time: "2 hours ago", status: "pending" },
  { id: 2, type: "attendance", message: "Sarah Wilson clocked in", time: "3 hours ago", status: "success" },
  { id: 3, type: "payroll", message: "Monthly payroll processed", time: "1 day ago", status: "success" },
  { id: 4, type: "leave", message: "Mike Johnson's leave approved", time: "2 days ago", status: "approved" },
];

const attendanceData = [
  { date: "Mon", present: 95, absent: 5 },
  { date: "Tue", present: 92, absent: 8 },
  { date: "Wed", present: 96, absent: 4 },
  { date: "Thu", present: 94, absent: 6 },
  { date: "Fri", present: 89, absent: 11 },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employees"
          value="247"
          change="+15 from last month"
          changeType="positive"
          icon={Users}
          gradient="from-primary to-primary/80"
        />
        <StatCard
          title="Present Today"
          value="231"
          change="94% attendance rate"
          changeType="positive"
          icon={CheckCircle}
          gradient="from-success to-success/80"
        />
        <StatCard
          title="Pending Leaves"
          value="8"
          change="3 urgent reviews"
          changeType="neutral"
          icon={Calendar}
          gradient="from-warning to-warning/80"
        />
        <StatCard
          title="Monthly Payroll"
          value="$284,900"
          change="+2.5% from last month"
          changeType="positive"
          icon={DollarSign}
          gradient="from-accent to-accent/80"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge variant={
                  activity.status === "success" ? "default" :
                  activity.status === "pending" ? "secondary" :
                  "outline"
                }>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Attendance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Weekly Attendance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {attendanceData.map((day) => (
              <div key={day.date} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{day.date}</span>
                  <span className="text-muted-foreground">{day.present}% present</span>
                </div>
                <Progress value={day.present} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <button className="flex items-center gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-accent hover:text-accent-foreground">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Add Employee</p>
                <p className="text-sm text-muted-foreground">Register new team member</p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-accent hover:text-accent-foreground">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Process Leave</p>
                <p className="text-sm text-muted-foreground">Review pending requests</p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-lg border border-border p-4 text-left transition-colors hover:bg-accent hover:text-accent-foreground">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Generate Payroll</p>
                <p className="text-sm text-muted-foreground">Create monthly reports</p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}