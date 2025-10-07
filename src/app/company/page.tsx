'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { Company, getCompanies } from '@/lib/services/company.service';
import { Badge } from '@/components/ui/badge';
import CompanyDrawer from '@/components/company/EditCompanyDrawer';

export default function CompanyTable() {
  const { toast } = useToast();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const [loading, setLoading] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        setLoading(true);
        const data = await getCompanies();
        setCompanies(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch companies. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
    fetchCompanies();
  }, [toast]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((comp) => comp.name.toLowerCase().includes(q));
  }, [query, companies]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  function handlePrev() {
    setPage((p) => Math.max(1, p - 1));
  }
  function handleNext() {
    setPage((p) => Math.min(pageCount, p + 1));
  }

  function handleEdit(company: Company) {
    setSelectedCompany(company);
    setIsDrawerOpen(true);
  }

  function handleDelete(id: string) {
    toast({
      title: 'Delete Company',
      description: `Company ID: ${id} removed.`,
      variant: 'destructive',
    });
  }

  const handleSaveCompany = (updated: Company) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  return (
    <Card className="w-full shadow-md rounded-2xl border border-gray-100">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b">
        <CardTitle className="text-xl font-semibold text-gray-800">
          🏢 Companies
        </CardTitle>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Input
              placeholder="Search company..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="pr-10 rounded-lg"
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow">
            <Plus className="h-4 w-4 mr-1" /> New
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {loading ? (
          <div className="p-4 space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-md" />
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-b-2xl">
            <Table className="min-w-full">
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-12 text-gray-600">#</TableHead>
                  <TableHead className="text-gray-600">Name</TableHead>
                  <TableHead className="text-gray-600">Created</TableHead>
                  <TableHead className="text-gray-600">Updated</TableHead>
                  <TableHead className="text-center text-gray-600">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paged.length > 0 ? (
                  paged.map((company, idx) => (
                    <TableRow
                      key={company.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <TableCell className="font-medium text-gray-700">
                        {(page - 1) * perPage + idx + 1}
                      </TableCell>
                      <TableCell className="font-medium text-gray-800">
                        {company.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {new Date(company.created_at).toLocaleDateString()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {new Date(company.updated_at).toLocaleDateString()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="hover:bg-blue-50"
                            onClick={() => handleEdit(company)}
                          >
                            <Edit className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="hover:bg-red-50"
                            onClick={() => handleDelete(company.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-gray-400"
                    >
                      No records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {!loading && companies.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50 rounded-b-2xl">
            <div className="text-sm text-gray-500">
              Showing {(page - 1) * perPage + 1} -{' '}
              {Math.min(page * perPage, filtered.length)} of {filtered.length}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium text-gray-600">
                Page {page} / {pageCount}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={page === pageCount}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
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
