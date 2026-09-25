import { ProTable } from '@ant-design/pro-components';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

describe('ProTable dynamic search columns', () => {
  it('refreshes select options when columns change (#7197)', async () => {
    const Demo = () => {
      const [options, setOptions] = React.useState<
        { label: string; value: string }[]
      >([]);
      return (
        <>
          <button
            type="button"
            onClick={() => setOptions([{ label: 'Customer A', value: 'a' }])}
          >
            Load options
          </button>
          <ProTable
            manualRequest
            columns={[
              {
                title: 'Customer',
                dataIndex: 'customerId',
                hideInTable: true,
                valueType: 'select',
                fieldProps: { options },
              },
            ]}
          />
        </>
      );
    };
    const wrapper = render(<Demo />);

    fireEvent.click(wrapper.getByText('Load options'));
    fireEvent.mouseDown(
      wrapper.container.querySelector('.ant-select-content')!,
    );

    await waitFor(() => {
      expect(document.body.textContent).toContain('Customer A');
    });
  });
});
