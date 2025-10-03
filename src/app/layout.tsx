import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../index.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HRIS Pro - Human Resource Information System",
  description: "Professional HRIS system for managing employees, attendance, leave, and payroll",
  authors: [{ name: "HRIS Pro" }],
  openGraph: {
    title: "HRIS Pro - Human Resource Information System",
    description: "Professional HRIS system for managing employees, attendance, leave, and payroll",
    type: "website",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lovable_dev",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
