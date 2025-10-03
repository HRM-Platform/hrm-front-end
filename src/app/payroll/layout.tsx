"use client";

import { AppLayout } from "@/app/_components/AppLayout";

export default function PayrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
