import type { ProColumns } from '@ant-design/pro-components';
import { ProForm, ProTable } from '@ant-design/pro-components';
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import dayjs from 'dayjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

type DataSourceType = {
  id: number;
  all_money: number | string;
};

afterEach(() => {
  cleanup();
});

function createTable({
  valueType,
  onSave,
}: {
  valueType: 'digit' | 'text';
  onSave: (key: any, record: any, origin: any) => Promise<void>;
}) {
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '奖励信息',
      dataIndex: 'all_money',
      valueType,
      width: 200,
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: () => null,
    },
  ];

  return (
    <ProForm
      submitter={false}
      initialValues={{
        test: {
          table: [{ id: 1, all_money: 10000 }],
        },
      }}
    >
      <ProTable<DataSourceType>
        rowKey="id"
        name={['test', 'table']}
        columns={columns}
        options={false}
        search={false}
        pagination={false}
        dataSource={[
          {
            id: 1,
            all_money: 10000,
          },
        ]}
        editable={{
          editableKeys: ['0'],
          onSave,
        }}
      />
    </ProForm>
  );
}

describe('ProTable editable onSave record', () => {
  it('should provide latest record for valueType=digit', async () => {
    const onSave = vi.fn(async () => undefined);
    const wrapper = render(createTable({ valueType: 'digit', onSave }));

    await waitForWaitTime(200);

    const input = wrapper.container.querySelector(
      '.ant-table-tbody input',
    ) as HTMLInputElement | null;
    expect(input).toBeTruthy();

    act(() => {
      fireEvent.change(input!, { target: { value: '22' } });
      fireEvent.blur(input!);
    });

    await act(async () => {
      wrapper.getByText('保存').click();
    });

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledTimes(1);
    });

    const record = (onSave.mock.calls[0] as unknown as [any, any, any])[1];
    expect(Number(record.all_money)).toBe(22);
    expect(record).not.toHaveProperty('0');
    expect(record).not.toHaveProperty('1');
  });

  it('should not merge primitive into record for valueType=text', async () => {
    const onSave = vi.fn(async () => undefined);
    const wrapper = render(createTable({ valueType: 'text', onSave }));

    await waitForWaitTime(200);

    const input = wrapper.container.querySelector(
      '.ant-table-tbody input',
    ) as HTMLInputElement | null;
    expect(input).toBeTruthy();

    act(() => {
      fireEvent.change(input!, { target: { value: '22' } });
      fireEvent.blur(input!);
    });

    await act(async () => {
      wrapper.getByText('保存').click();
    });

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledTimes(1);
    });

    const record = (onSave.mock.calls[0] as unknown as [any, any, any])[1];
    expect(String(record.all_money)).toBe('22');
    expect(record).not.toHaveProperty('0');
    expect(record).not.toHaveProperty('1');
  });

  it('should keep dayjs value usable for valueType=date', async () => {
    type DateRecord = { id: number; createdAt: dayjs.Dayjs };
    const onSave = vi.fn(async () => undefined);
    const columns: ProColumns<DateRecord>[] = [
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        valueType: 'date',
      },
      {
        title: '操作',
        valueType: 'option',
        render: () => null,
      },
    ];
    const dataSource = [{ id: 1, createdAt: dayjs('2024-01-01') }];
    const wrapper = render(
      <ProForm
        submitter={false}
        dateFormatter={false}
        initialValues={{ table: dataSource }}
      >
        <ProTable<DateRecord>
          rowKey="id"
          name="table"
          columns={columns}
          options={false}
          search={false}
          pagination={false}
          dataSource={dataSource}
          editable={{
            editableKeys: ['0'],
            onSave,
          }}
        />
      </ProForm>,
    );

    await waitForWaitTime(200);

    await act(async () => {
      wrapper.getByText('保存').click();
    });

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledTimes(1);
    });

    const record = (onSave.mock.calls[0] as unknown as [any, any, any])[1];
    expect(record.createdAt).toBeInstanceOf(dayjs);
    expect(record.createdAt.format('YYYY-MM-DD')).toBe('2024-01-01');
  });
});
