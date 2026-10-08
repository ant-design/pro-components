import {
  ProFormDateRangePicker,
  ProFormSelect,
  ProTable,
  QueryFilter,
} from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const captureConsoleMessages = () => {
  const errorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => undefined);
  const warnSpy = vi
    .spyOn(console, 'warn')
    .mockImplementation(() => undefined);

  return () =>
    [...errorSpy.mock.calls, ...warnSpy.mock.calls]
      .flat()
      .map(String)
      .join('\n');
};

const expectNoLegacyWarnings = (messages: string) => {
  expect(messages).not.toMatch(/findDOMNode/i);
  expect(messages).not.toMatch(/bordered.*deprecated/i);
};

describe('deprecated API warnings on antd 6', () => {
  it('renders the ProTable search and options paths without warnings (#8830)', () => {
    const getMessages = captureConsoleMessages();

    render(
      <ProTable
        rowKey="id"
        columns={[
          { title: 'Name', dataIndex: 'name' },
          {
            title: 'Status',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: { open: 'Open', closed: 'Closed' },
          },
        ]}
        dataSource={[]}
      />,
    );

    expectNoLegacyWarnings(getMessages());
  });

  it('renders QueryFilter fields without warnings (#8685, #8091)', () => {
    const getMessages = captureConsoleMessages();

    render(
      <QueryFilter>
        <ProFormDateRangePicker
          name="date"
          label="Date"
          placeholder={['Start', 'End']}
        />
        <ProFormSelect
          name="status"
          label="Status"
          options={[
            { label: 'Open', value: 'open' },
            { label: 'Closed', value: 'closed' },
          ]}
        />
      </QueryFilter>,
    );

    expectNoLegacyWarnings(getMessages());
  });
});
