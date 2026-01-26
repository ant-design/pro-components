import { ProTable } from '@ant-design/pro-components';
import { cleanup, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('ProTable Validation Bypass', () => {
  it('should validate on initial load when ignoreRules is false', async () => {
    const requestFn = vi.fn();
    const { container } = render(
      <ProTable
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            formItemProps: {
              rules: [{ required: true, message: 'Required' }],
            },
          },
        ]}
        form={{ ignoreRules: false }}
        request={async () => {
          requestFn();
          return { data: [] };
        }}
        rowKey="key"
      />
    );

    await waitFor(() => {
      // Should show validation error
      expect(container.querySelector('.ant-form-item-explain-error')).toBeTruthy();
    });

    expect(requestFn).not.toHaveBeenCalled();
  });

  it('should validate on reset when ignoreRules is false and initial value is empty', async () => {
    const user = userEvent.setup();
    const requestFn = vi.fn();
    const { getByText, container } = render(
      <ProTable
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            formItemProps: {
              rules: [{ required: true, message: 'Required' }],
            },
          },
        ]}
        form={{ ignoreRules: false }}
        request={async () => {
          requestFn();
          return { data: [] };
        }}
        rowKey="key"
      />
    );

    // Initial load should fail validation
    await waitFor(() => {
       expect(container.querySelector('.ant-form-item-explain-error')).toBeTruthy();
    });
    expect(requestFn).not.toHaveBeenCalled();

    // Reset (should still be invalid because initialValue is empty)
    await user.click(getByText('重 置'));

    // Wait a bit to ensure potential async request (if bug existed) would have happened
    await waitFor(() => {
      expect(container.querySelector('.ant-form-item-explain-error')).toBeTruthy();
    });

    // Request should NOT be called because validation failed
    expect(requestFn).not.toHaveBeenCalled();
  });
});
