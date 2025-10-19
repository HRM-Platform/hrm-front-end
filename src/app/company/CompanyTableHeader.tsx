'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, RefreshCcw } from 'lucide-react';

type Props = {
  query: string;
  setQuery: (q: string) => void;
  onNew: () => void;
  onRefresh: () => void;
};

export default function CompanyTableHeader({
  query,
  setQuery,
  onNew,
  onRefresh,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b">
      <h2 className="text-xl font-semibold text-gray-800">🏢 Companies</h2>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white shadow"
          onClick={onRefresh}
        >
          <RefreshCcw className="h-4 w-4 mr-1" /> Refresh
        </Button>

        <div className="relative w-full sm:w-72">
          <Input
            placeholder="Search company..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-10 rounded-lg"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white shadow"
          onClick={onNew}
        >
          <Plus className="h-4 w-4 mr-1" /> New
        </Button>
      </div>
    </div>
  );
}
