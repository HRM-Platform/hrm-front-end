'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Company } from '@/lib/services/company.service';
import { Badge } from '@/components/ui/badge';

type Props = {
  paged: Company[];
  page: number;
  perPage: number;
  loading: boolean;
  onEdit: (company: Company) => void;
  onDelete?: (id: number) => void;
};

export default function CompanyTableBody({
  paged,
  page,
  perPage,
  loading,
  onEdit,
  onDelete,
}: Props) {
  if (loading) {
    return (
      <div className="p-4 space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-b-2xl">
      <Table className="min-w-full">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-12 text-gray-600">#</TableHead>
            <TableHead className="text-gray-600">Name</TableHead>
            <TableHead className="text-gray-600">Created</TableHead>
            <TableHead className="text-gray-600">Updated</TableHead>
            <TableHead className="text-center text-gray-600">Actions</TableHead>
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
                      onClick={() => onEdit(company)}
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
                    {onDelete && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-red-50"
                        onClick={() => onDelete(company.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-400">
                No records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
