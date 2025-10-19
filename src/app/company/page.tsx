'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Company } from '@/lib/services/company.service';
import { useCompanies } from '@/hooks/useCompanies';

import Pagination from '@/components/ui/Pagination';
import CompanyTableHeader from '@/app/company/CompanyTableHeader';
import CompanyTableBody from '@/app/company/CompanyTableBody';
import CompanyDrawer from '@/app/company/CompanyDrawer';

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
    <Card className="w-full shadow-md rounded-2xl border border-gray-100">
      <CardHeader>
        <CompanyTableHeader
          query={query}
          setQuery={setQuery}
          onNew={() => setIsDrawerOpen(true)}
          onRefresh={refresh}
        />
      </CardHeader>
      <CardContent className="p-0">
        <CompanyTableBody
          paged={paged}
          loading={loading}
          page={page}
          perPage={10}
          onEdit={handleEdit}
        />
        {!loading && paged.length > 0 && (
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        )}
      </CardContent>
      <CompanyDrawer
        visible={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        company={selectedCompany}
        onSave={handleSaveCompany}
      />
    </Card>
  );
}
