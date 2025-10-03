"use client";

import { AppLayout } from "@/app/_components/AppLayout";

export default function LeaveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout activeSection="leave">{children}</AppLayout>;
}
