'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Company } from '@/lib/services/company.service';
import { useCompanies } from '@/hooks/useCompanies';

import Pagination from '@/components/ui/Pagination';

import CompanyTableHeader from './CompanyTableHeader';
import CompanyTableBody from './CompanyTableBody';
import CompanyDrawer from './CompanyDrawer';

export default function CompanyTable() {
  const { toast } = useToast();
  const {
    paged,
    page,
    setPage,
    pageCount,
    loading,
    query,
    setQuery,
    refresh,
    setCompanies,
  } = useCompanies();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleEdit = (company: Company) => {
    setSelectedCompany(company);
    setIsDrawerOpen(true);
  };

  const handleSaveCompany = (updated: Company) => {
    setCompanies((prev) => {
      const exists = prev.find((c) => c.id === updated.id);
      return exists
        ? prev.map((c) => (c.id === updated.id ? updated : c))
        : [updated, ...prev];
    });
    toast({ title: 'Success', description: 'Company saved successfully.' });
  };

  return (
    <div className="w-full">
      <Card className="w-full bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 ease-in-out">
        {/* Header */}
        <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-2xl px-6 py-4">
          <CompanyTableHeader
            query={query}
            setQuery={setQuery}
            onNew={() => setIsDrawerOpen(true)}
            onRefresh={refresh}
          />
        </CardHeader>

        {/* Table + Pagination */}
        <CardContent className="p-0">
          <div className="overflow-hidden rounded-b-2xl">
            <div className="overflow-x-auto bg-white">
              <CompanyTableBody
                paged={paged}
                loading={loading}
                page={page}
                perPage={10}
                onEdit={handleEdit}
              />
            </div>

            {!loading && paged.length > 0 && (
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center">
                <Pagination
                  page={page}
                  pageCount={pageCount}
                  onChange={setPage}
                />
              </div>
            )}
          </div>
        </CardContent>

        {/* Drawer */}
        <CompanyDrawer
          visible={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          company={selectedCompany}
          onSave={handleSaveCompany}
        />
      </Card>
    </div>
  );
}
