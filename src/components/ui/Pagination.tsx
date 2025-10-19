'use client';

import React from 'react';
import { Button } from './button';

type Props = {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, pageCount, onChange }: Props) {
  return (
    <div className="flex justify-end items-center gap-2 p-4 border-t">
      <Button disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Prev
      </Button>
      <span>
        {page} / {pageCount}
      </span>
      <Button disabled={page >= pageCount} onClick={() => onChange(page + 1)}>
        Next
      </Button>
    </div>
  );
}
