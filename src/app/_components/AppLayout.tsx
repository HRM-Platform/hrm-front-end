"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { useRouter } from "next/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
  activeSection: string;
}

export function AppLayout({ children, activeSection }: AppLayoutProps) {
  const router = useRouter();

  const handleSectionChange = (section: string) => {
    const routeMap: Record<string, string> = {
      dashboard: "/dashboard",
      employees: "/employees",
      attendance: "/attendance",
      leave: "/leave",
      payroll: "/payroll",
      settings: "/settings",
    };

    router.push(routeMap[section] || "/dashboard");
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}
