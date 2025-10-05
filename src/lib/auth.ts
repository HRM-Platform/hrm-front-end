// lib/auth.ts
'use server';

import { cookies } from 'next/headers';

export async function setAuthCookie(token: string) {
  (await cookies()).set('access_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });
}

export async function clearAuthCookie() {
  (await cookies()).delete('access_token');
}

export async function getAuthToken() {
  return (await cookies()).get('access_token')?.value || null;
}
