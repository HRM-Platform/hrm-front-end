'use client';

import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onSidebarToggle?: () => void;
}

export default function Header({ onSidebarToggle }: HeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/login');
  };

  return (
    <header className="flex items-center justify-between bg-blue-800 text-white px-6 h-16 shadow-md">
      <div className="flex items-center gap-3">
        {onSidebarToggle && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-blue-700"
            onClick={onSidebarToggle}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-lg font-semibold tracking-wide">HRMS</h1>
      </div>
      <div>
        <Button
          variant="ghost"
          className="hidden lg:inline-flex text-white hover:bg-blue-700"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}
