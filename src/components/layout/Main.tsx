import { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <main className="flex-1 bg-gray-50 p-6 overflow-auto">{children}</main>
  );
}
