'use client';

import { ReactNode, useState } from 'react';
import { Providers } from './providers';
import Header from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

interface RootLayoutClientProps {
  children: ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen font-sans">
      <Header onSidebarToggle={() => setSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <Providers>{children}</Providers>
        </main>
      </div>
      <Footer />
    </div>
  );
}
