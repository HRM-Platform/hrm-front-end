'use client';

import React, { useEffect } from 'react';
import { Drawer, Button, Form, Input, Space, message } from 'antd';
import {
  Company,
  createCompany,
  updateCompany,
} from '@/lib/services/company.service';

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
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  // Prefill when editing
  useEffect(() => {
    if (company) {
      form.setFieldsValue({ name: company.name });
    } else {
      form.resetFields();
    }
  }, [company, form]);

  const handleSave = async (values: { name: string }) => {
    setLoading(true);
    try {
      let updated: Company;

      if (company) {
        updated = await updateCompany({ ...company, name: values.name });
      } else {
        updated = await createCompany({ name: values.name });
      }

      onSave(updated);
      message.success('Company saved successfully');
      onClose();
    } catch (error: any) {
      console.error('Failed to save company:', error);

      // Handle backend validation errors
      if (error.response?.status && error.response?.data?.errors) {
        const backendErrors = error.response.data.errors;

        // Set errors for each form field
        Object.keys(backendErrors).forEach((key) => {
          form.setFields([
            {
              name: key,
              errors: backendErrors[key],
            },
          ]);
        });
      } else if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Something went wrong while saving company.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title={company ? 'Edit Company' : 'New Company'}
      open={visible}
      onClose={onClose}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        autoComplete="off"
      >
        <Form.Item
          label="Company Name"
          name="name"
          rules={[
            { required: true, message: 'Please enter company name' },
            { min: 3, message: 'Company name must be at least 3 characters' },
          ]}
        >
          <Input placeholder="Enter company name" />
        </Form.Item>

        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Space>
      </Form>
    </Drawer>
  );
}
