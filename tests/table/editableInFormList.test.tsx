import type { EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProForm, ProFormList } from '@ant-design/pro-components';
import { act, render } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';

type RowType = {
  id: number | string;
  title?: string;
};

const columns: ProColumns<RowType>[] = [
  { dataIndex: 'title', title: '标题' },
];

const tableA: RowType[] = [
  { id: 'a1', title: 'A-行1' },
  { id: 'a2', title: 'A-行2' },
];

/**
 * #6508 ProFormList 嵌套 EditableProTable:
 * - 表单值驱动渲染(name 指向 ProFormList 行内的数组字段)
 * - setFieldsValue 更新外部数据时表格内容跟随更新
 */
describe('#6508 ProFormList 嵌套 EditableProTable', () => {
  it('setFieldsValue 更新后嵌套表格内容跟随更新', async () => {
    const formRef = React.createRef<any>();

    const wrapper = render(
      <ProForm formRef={formRef}>
        <ProFormList name="groups" label="分组" initialValue={[{ key: 'g1' }]}>
          {(field) => (
            <ProForm.Item
              label="数据"
              name={[field.name, 'rows']}
              trigger="onValuesChange"
            >
              <EditableProTable<RowType>
                rowKey="id"
                columns={columns}
                recordCreatorProps={{
                  newRecordType: 'dataSource',
                  record: () => ({ id: Date.now() }),
                }}
                editable={{}}
              />
            </ProForm.Item>
          )}
        </ProFormList>
      </ProForm>,
    );
    await waitForWaitTime(200);

    // 初始渲染出第一组的空表格
    expect(
      wrapper.container.querySelectorAll('tr.ant-table-row').length,
    ).toBe(0);

    // 外部 setFieldsValue 注入第一组数据
    await act(async () => {
      formRef.current?.setFieldsValue({
        groups: [{ key: 'g1', rows: tableA }],
      });
    });
    await waitForWaitTime(300);

    // 表格渲染出注入的两行
    const rows = wrapper.container.querySelectorAll('tr.ant-table-row');
    expect(rows.length).toBe(2);
    expect(wrapper.container.textContent).toContain('A-行1');
    expect(wrapper.container.textContent).toContain('A-行2');

    wrapper.unmount();
  });

  it('initialValues 数据完整渲染,提交保留 rows', async () => {
    const onFinish = vi.fn();

    const wrapper = render(
      <ProForm
        onFinish={onFinish}
        initialValues={{ groups: [{ key: 'g1', rows: tableA }] }}
      >
        <ProFormList name="groups" label="分组">
          {(field) => (
            <ProForm.Item
              label="数据"
              name={[field.name, 'rows']}
              trigger="onValuesChange"
            >
              <EditableProTable<RowType>
                rowKey="id"
                columns={columns}
                recordCreatorProps={false}
                editable={{}}
              />
            </ProForm.Item>
          )}
        </ProFormList>
        <button type="submit">submit</button>
      </ProForm>,
    );
    await waitForWaitTime(300);

    // initialValues 直接渲染两行
    const rows = wrapper.container.querySelectorAll('tr.ant-table-row');
    expect(rows.length).toBe(2);

    await act(async () => {
      wrapper.container
        .querySelector('button[type="submit"]')
        ?.dispatchEvent(
          new MouseEvent('click', { bubbles: true, cancelable: true }),
        );
    });
    await waitForWaitTime(300);

    expect(onFinish).toHaveBeenCalled();
    const values = onFinish.mock.calls[0][0];
    expect(values.groups[0].rows.map((r: RowType) => r.title)).toEqual([
      'A-行1',
      'A-行2',
    ]);

    wrapper.unmount();
  });
});
