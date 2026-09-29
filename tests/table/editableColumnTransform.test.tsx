import { EditableProTable, ProTable } from '@ant-design/pro-components';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

/**
 * #9032:ProTable/EditableProTable 值转化能力验证。
 * - 搜索表单: column.search.transform 生效
 * - 可编辑表格: column 顶层 transform 在行保存(onSave 拿到的 record)时生效
 */
describe('#9032 ProTable transform/convertValue on columns', () => {
  it('ProTable search: search.transform converts params', async () => {
    const request = vi.fn(
      async (params: any) => ({ data: [], total: 0, success: true }),
    );
    const { container } = render(
      <ProTable
        request={request}
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
          },
          {
            title: '时间',
            dataIndex: 'range',
            valueType: 'dateTimeRange',
            hideInTable: true,
            search: {
              transform: (value: any) => ({
                startTime: value?.[0],
                endTime: value?.[1],
              }),
            },
          },
        ]}
        rowKey="id"
      />,
    );

    await waitForWaitTime(1500);

    // 名称输入框(第一个搜索项)
    const nameInput = container.querySelector(
      '[id$="_name"]',
    ) as HTMLInputElement | null;
    expect(nameInput).toBeTruthy();
    fireEvent.change(nameInput!, { target: { value: 'foo' } });
    await act(async () => {
      screen.getByText('查 询').click();
    });
    await waitForWaitTime(800);

    const lastCall = request.mock.calls[request.mock.calls.length - 1];
    const params = lastCall?.[0] ?? {};
    expect(params.name).toBe('foo');
    // transform 后不再有 range 字段
    expect('range' in params).toBe(false);
  });

  it('EditableProTable: column transform applies on row save (serialize)', async () => {
    const onSave = vi.fn(async (_key: any, _row: any) => undefined);
    const { container } = render(
      <EditableProTable
        rowKey="id"
        editable={{
          editableKeys: ['row-1'],
          onSave: async (key, row) => {
            await onSave(key, row);
          },
        }}
        recordCreatorProps={false}
        columns={[
          {
            title: '数量',
            dataIndex: 'count',
            valueType: 'digit',
            // serialize:提交/保存时把展示值还原为提交值(如 分<->元 换算)
            transform: (value: any) => Number(value) * 100,
          },
          {
            title: '操作',
            valueType: 'option',
            render: () => null,
          },
        ]}
        value={[{ id: 'row-1', count: 1 }]}
      />,
    );

    await waitForWaitTime(800);

    const inputs = container.querySelectorAll(
      '.ant-form-item-control-input input',
    );
    expect(inputs.length).toBeGreaterThan(0);
    act(() => {
      fireEvent.change(inputs[0], { target: { value: '2' } });
    });
    await waitForWaitTime(300);
    await act(async () => {
      screen.getByText('保存').click();
    });
    await waitForWaitTime(800);

    expect(onSave).toHaveBeenCalled();
    const savedRow = onSave.mock.calls[0][1];
    expect(savedRow.count).toBe(200);
  });
});
