"use client";

import { AppLayout } from "@/app/_components/AppLayout";

export default function EmployeesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
