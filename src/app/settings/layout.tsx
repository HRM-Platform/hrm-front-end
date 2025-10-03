"use client";

import { AppLayout } from "@/app/_components/AppLayout";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout activeSection="settings">{children}</AppLayout>;
}
