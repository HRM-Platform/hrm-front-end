"use client";

import { AppLayout } from "@/app/_components/AppLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout activeSection="dashboard">{children}</AppLayout>;
}
