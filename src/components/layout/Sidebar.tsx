import {
  Users,
  Calendar,
  Clock,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "employees", label: "Employees", icon: Users },
  { id: "attendance", label: "Attendance", icon: Clock },
  { id: "leave", label: "Leave Management", icon: Calendar },
  { id: "payroll", label: "Payroll", icon: DollarSign },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Building className="h-8 w-8 text-sidebar-primary" />
        <h1 className="ml-3 text-xl font-bold text-sidebar-foreground">
          HRIS Pro
        </h1>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                activeSection === item.id &&
                  "bg-sidebar-accent text-sidebar-primary font-medium"
              )}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
