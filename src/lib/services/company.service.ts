// src/services/company.service.ts
import api from '../api/client';

export interface Company {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyPayload {
  name: string;
}

/**
 * Get all companies
 */
export async function getCompanies(): Promise<Company[]> {
  const response = await api.get('/companies');
  return response.data.data;
}

/**
 * Create a new company
 */
export async function createCompany(payload: CompanyPayload): Promise<Company> {
  const response = await api.post('/companies', payload);
  return response.data?.data;
}

export async function updateCompany(company: Company): Promise<Company> {
  const res = await fetch(`/api/companies/${company.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(company),
  });
  if (!res.ok) throw new Error('Failed to update company');
  return res.json();
}
