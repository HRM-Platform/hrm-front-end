'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
import { Providers } from './providers';
import '../css/global.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const excludedRoutes = ['/login', '/register', '/forgot-password'];
  const isExcluded = excludedRoutes.some((route) => pathname.startsWith(route));

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token && !isExcluded) {
      router.push('/login');
    }
  }, [pathname, isExcluded, router]);

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Providers>
          {isExcluded ? (
            <main className="min-h-screen">{children}</main>
          ) : (
            <div className="flex flex-col h-screen">
              <Header onSidebarToggle={() => setSidebarOpen(true)} />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar
                  isOpen={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                />
                <main className="flex-1 overflow-y-auto p-4">{children}</main>
              </div>
              <Footer />
            </div>
          )}
        </Providers>
      </body>
    </html>
  );
}
