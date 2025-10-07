'use client';

import React, { useEffect, useState } from 'react';
import { Drawer, Button, Input, Form } from 'antd';
import { Company } from '@/lib/services/company.service';

interface CompanyDrawerProps {
  visible: boolean;
  onClose: () => void;
  company: Company | null;
  onSave: (updated: Company) => void;
}

export default function CompanyDrawer({
  visible,
  onClose,
  company,
  onSave,
}: CompanyDrawerProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (company) {
      form.setFieldsValue({
        name: company.name,
      });
    } else {
      form.resetFields();
    }
  }, [company, form]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        if (company) {
          onSave({ ...company, ...values });
        }
        onClose();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Drawer
      title={company ? 'Edit Company' : 'New Company'}
      placement="right"
      onClose={onClose}
      open={visible}
      width={400}
    >
      <Form form={form} layout="vertical" initialValues={{ name: '' }}>
        <Form.Item
          label="Company Name"
          name="name"
          rules={[{ required: true, message: 'Please enter company name' }]}
        >
          <Input placeholder="Company Name" />
        </Form.Item>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </Drawer>
  );
}
