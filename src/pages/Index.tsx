import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { EmployeeList } from "@/components/employees/EmployeeList";
import { AttendanceTracking } from "@/components/attendance/AttendanceTracking";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />;
      case "employees":
        return <EmployeeList />;
      case "attendance":
        return <AttendanceTracking />;
      case "leave":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Leave Management</h2>
            <p className="text-muted-foreground">Leave management features coming soon...</p>
          </div>
        );
      case "payroll":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Payroll</h2>
            <p className="text-muted-foreground">Payroll management features coming soon...</p>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="text-muted-foreground">System settings coming soon...</p>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
