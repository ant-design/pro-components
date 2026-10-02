import type { ActionType, ProFormInstance } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProForm,
  ProFormList,
} from '@ant-design/pro-components';
import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

type Row = { id: React.Key; title: string; children?: Row[] };

afterEach(cleanup);

const columns = [
  { title: '标题', dataIndex: 'title' },
  { title: '操作', valueType: 'option' as const },
];

describe('nested list and editable table paths (#8893, #6508)', () => {
  it('uses function rowKey values to register child form paths', async () => {
    const { container } = render(
      <ProForm
        submitter={false}
        initialValues={{
          table: [
            {
              id: 'p1',
              title: 'Parent',
              children: [{ id: 'c1', title: 'Child' }],
            },
          ],
        }}
      >
        <EditableProTable<Row>
          name="table"
          rowKey={(record) => record.id}
          controlled
          recordCreatorProps={false}
          expandable={{ defaultExpandAllRows: true }}
          editable={{ type: 'multiple', editableKeys: ['p1', 'c1'] }}
          columns={columns}
        />
      </ProForm>,
    );
    await waitFor(() => {
      const values = Array.from(container.querySelectorAll('input')).map(
        (input) => input.value,
      );
      expect(values).toContain('Parent');
      expect(values).toContain('Child');
    });
  });

  it('tracks setFieldsValue through a ProFormList row path', async () => {
    const formRef = React.createRef<ProFormInstance>();
    const { findByText } = render(
      <ProForm
        formRef={formRef}
        submitter={false}
        initialValues={{ groups: [{ rows: [{ id: '1', title: 'before' }] }] }}
      >
        <ProFormList name="groups" creatorButtonProps={false}>
          {(field) => (
            <ProForm.Item name={[field.name, 'rows']} trigger="onValuesChange">
              <EditableProTable<Row>
                rowKey="id"
                controlled
                recordCreatorProps={false}
                editable={{}}
                columns={columns}
              />
            </ProForm.Item>
          )}
        </ProFormList>
      </ProForm>,
    );
    expect(await findByText('before')).toBeTruthy();
    act(() => {
      formRef.current?.setFieldsValue({
        groups: [{ rows: [{ id: '1', title: 'after' }] }],
      });
    });
    expect(await findByText('after')).toBeTruthy();
  });

  it('keeps index zero as a valid parent key in name mode', async () => {
    const actionRef = React.createRef<ActionType>();
    const formRef = React.createRef<ProFormInstance>();
    render(
      <ProForm
        formRef={formRef}
        submitter={false}
        initialValues={{ table: [{ id: 'p1', title: 'Parent' }] }}
      >
        <EditableProTable<Row>
          name="table"
          rowKey="id"
          actionRef={actionRef}
          controlled
          recordCreatorProps={false}
          editable={{}}
          columns={columns}
        />
      </ProForm>,
    );
    await waitFor(() => expect(actionRef.current).toBeTruthy());
    act(() => {
      actionRef.current?.addEditRecord?.(
        { id: 'c1', title: 'Child' },
        { parentKey: 0, newRecordType: 'dataSource' },
      );
    });
    await waitFor(() => {
      expect(formRef.current?.getFieldValue('table')).toEqual([
        {
          id: 'p1',
          title: 'Parent',
          children: [{ id: 'c1', title: 'Child' }],
        },
      ]);
    });
  });

  it('keeps parent key zero when a cached child is saved', async () => {
    const actionRef = React.createRef<ActionType>();
    const onChange = vi.fn();
    const { container } = render(
      <EditableProTable<Row>
        rowKey="id"
        actionRef={actionRef}
        defaultValue={[{ id: 0, title: 'Parent' }]}
        onChange={onChange}
        recordCreatorProps={false}
        expandable={{ defaultExpandAllRows: true }}
        editable={{}}
        columns={columns}
      />,
    );
    await waitFor(() => expect(actionRef.current).toBeTruthy());
    act(() => {
      actionRef.current?.addEditRecord?.(
        { id: 1, title: 'Child' },
        { parentKey: 0, newRecordType: 'cache' },
      );
    });
    const childInput = await waitFor(() => {
      const input = Array.from(container.querySelectorAll('input')).find(
        (item) => item.value === 'Child',
      );
      expect(input).toBeTruthy();
      return input!;
    });
    fireEvent.click(childInput.closest('tr')!.querySelector('a')!);
    await waitFor(() => {
      const nextValue = onChange.mock.lastCall?.[0];
      expect(nextValue).toHaveLength(1);
      expect(nextValue?.[0]).toMatchObject({
        id: 0,
        title: 'Parent',
        children: [{ id: 1, title: 'Child' }],
      });
    });
  });
});
