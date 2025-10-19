'use client';

import { useEffect, useMemo, useState } from 'react';
import { Company, getCompanies } from '@/lib/services/company.service';

export function useCompanies(perPage = 10) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const data = await getCompanies();
      setCompanies(data);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? companies.filter((c) => c.name.toLowerCase().includes(q))
      : companies;
  }, [companies, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page, perPage]);

  const refresh = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500)); // simulate loading
    await fetchCompanies();
    setLoading(false);
  };

  return {
    companies,
    paged,
    page,
    setPage,
    pageCount,
    loading,
    query,
    setQuery,
    refresh,
    setCompanies,
  };
}
