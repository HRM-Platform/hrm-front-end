'use client';

import React, { useState, useEffect } from 'react';
import { Drawer, Button, Input } from 'antd';
import { Company } from '@/lib/services/company.service';

type Props = {
  visible: boolean;
  company: Company | null;
  onClose: () => void;
  onSave: (updated: Company) => void;
};

export default function CompanyDrawer({
  visible,
  company,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(company?.name || '');
  }, [company]);

  const handleSave = () => {
    if (!name.trim()) return;
    const updated = company
      ? { ...company, name }
      : {
          id: Date.now().toString(),
          name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
    onSave(updated);
    onClose();
  };

  return (
    <Drawer
      title={company ? 'Edit Company' : 'New Company'}
      open={visible}
      onClose={onClose}
      width={400}
    >
      <Input
        placeholder="Company Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4"
      />
      <Button type="primary" onClick={handleSave} className="mr-2">
        Save
      </Button>
      <Button onClick={onClose}>Cancel</Button>
    </Drawer>
  );
}
