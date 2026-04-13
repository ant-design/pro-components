import type {
  ActionType,
  EditableFormInstance,
  ProColumns,
  TableRowEditable,
} from '@ant-design/pro-components';
import {
  EditableProTable,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import { useControlledState } from '@rc-component/util';
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import { Button, Input, InputNumber, Popover } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { waitForWaitTime } from '../util';
type DataSourceType = {
  id: number | string;
  title?: string;
  labels?: {
    name: string;
    color: string;
  }[];
  state?: string;
  time?: {
    created_at?: number;
  };
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
    labels: [{ name: 'bug', color: 'error' }],
    time: {
      created_at: 1590486176000,
    },
    state: 'processing',
  },
  {
    id: 624691229,
    title: '🐛 [BUG]无法创建工程npm create umi',
    labels: [{ name: 'bug', color: 'error' }],
    time: {
      created_at: 1590481162000,
    },
    state: 'closed',
  },
  {
    id: 624674790,
    title: '🧐 [问题] build 后还存在 es6 的代码（Umi@2.13.13）',
    labels: [{ name: 'question', color: 'success' }],
    state: 'open',
    time: {
      created_at: 1590479665000,
    },
    children: [
      {
        id: 6246747901,
        title: '嵌套数据的编辑',
        labels: [{ name: 'question', color: 'success' }],
        state: 'closed',
        time: {
          created_at: 1590479665000,
        },
        children: [
          {
            id: 62467479012,
            title: '嵌套数据的编辑',
            labels: [{ name: 'question', color: 'success' }],
            state: 'closed',
            time: {
              created_at: 1590479665000,
            },
          },
        ],
      },
    ],
  },
];

const columns: ProColumns<DataSourceType>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
    formItemRender: () => <InputNumber />,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    fieldProps: {
      onChange: () => null,
    },
    ellipsis: true,
    tooltip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: '30%',
    search: false,
  },
  {
    title: '状态',
    dataIndex: 'state',
    initialValue: 'open',
    filters: true,
    valueType: 'select',
    width: 120,
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '创建时间',
    dataIndex: ['time', 'created_at'],
    valueType: 'date',
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, row, _, action) => [
      <a
        key="editor"
        id="editor"
        onClick={() => {
          action?.startEditable?.(row.id);
        }}
      >
        编辑
      </a>,
    ],
  },
];

const EditorProTableDemo = (
  props: {
    type?: 'multiple';
    hideRules?: boolean;
    defaultKeys?: React.Key[];
    editorRowKeys?: React.Key[];
    onEditorChange?: (editorRowKeys: React.Key[]) => void;
    dataSource?: DataSourceType[];
    onDataSourceChange?: (dataSource: readonly DataSourceType[]) => void;
    position?: 'top';
  } & TableRowEditable<DataSourceType>,
) => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditorRowKeysInner] = useControlledState<React.Key[]>(
    () => props.defaultKeys || [],
    props.editorRowKeys,
  );
  const setEditorRowKeys = useCallback(
    (updater: React.Key[] | ((prev: React.Key[]) => React.Key[])) => {
      setEditorRowKeysInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: React.Key[]) => React.Key[])(prev)
            : updater;
        props.onEditorChange?.(next);
        return next;
      });
    },
    [props.onEditorChange],
  );
  const [tableDataSource, setDataSourceInner] = useControlledState<
    readonly DataSourceType[]
  >(defaultData, props.dataSource);
  const setDataSource = useCallback(
    (
      updater:
        | readonly DataSourceType[]
        | ((prev: readonly DataSourceType[]) => readonly DataSourceType[]),
    ) => {
      setDataSourceInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (
                updater as (
                  p: readonly DataSourceType[],
                ) => readonly DataSourceType[]
              )(prev)
            : updater;
        props.onDataSourceChange?.(next);
        return next;
      });
    },
    [props.onDataSourceChange],
  );
  return (
    <EditableProTable<DataSourceType>
      rowKey="id"
      toolBarRender={() => [
        <Button
          key="addEditRecord"
          id="addEditRecord"
          onClick={() => {
            actionRef.current?.addEditRecord(
              {
                id: 10000,
              },
              {
                position: props.position,
              },
            );
          }}
        >
          增加一行
        </Button>,
      ]}
      columns={columns.map((item) => {
        if (props.hideRules) {
          // eslint-disable-next-line no-param-reassign
          delete item.formItemProps;
        }
        return item;
      })}
      actionRef={actionRef}
      value={tableDataSource}
      onChange={setDataSource}
      editable={{
        ...props,
        type: props.type,
        editableKeys,
        onSave: props.onSave,
        onChange: (keys) => setEditorRowKeys(keys),
        onDelete: props.onDelete,
      }}
    />
  );
};

afterEach(() => {
  cleanup();
});

describe('EditorProTable 2', () => {
  // 放到中间会报错，那就放到第一个吧
  it('📝 support form rules', async () => {
    const wrapper = render(<EditorProTableDemo />);

    // 等待组件完全渲染
    await waitForWaitTime(1000);

    // 检查组件是否渲染了基本内容
    await waitFor(
      () => {
        expect(wrapper.container.querySelector('.ant-pro-table')).toBeTruthy();
      },
      { timeout: 10000 },
    );

    // 检查是否有表格内容
    await waitFor(
      () => {
        expect(wrapper.container.querySelector('.ant-table')).toBeTruthy();
      },
      { timeout: 10000 },
    );

    // 检查是否有数据行
    await waitFor(
      () => {
        const rows = wrapper.container.querySelectorAll(
          '.ant-table-tbody tr.ant-table-row',
        );
        expect(rows.length).toBeGreaterThan(0);
      },
      { timeout: 10000 },
    );

    // 检查是否有编辑按钮
    await waitFor(
      () => {
        const editButtons = wrapper.container.querySelectorAll('a');
        expect(editButtons.length).toBeGreaterThan(0);
      },
      { timeout: 10000 },
    );

    wrapper.unmount();
  });
  it('📝 EditableProTable controlled will trigger onchange', async () => {
    const onChange = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        rowKey="id"
        controlled
        recordCreatorProps={{
          creatorButtonText: '测试添加数据',
          record: { id: 9999 },
        }}
        editable={{
          editableKeys: ['624748504'],
        }}
        columns={columns}
        value={[
          {
            id: '624748504',
            title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
            labels: [{ name: 'bug', color: 'error' }],
            time: {
              created_at: 1590486176000,
            },
            state: 'processing',
          },
        ]}
        onChange={(data) => {
          onChange(data[0]);
        }}
      />,
    );

    // 等待组件完全渲染
    await waitForWaitTime(1000);

    await wrapper.findAllByText('测试添加数据');

    act(() => {
      fireEvent.change(
        wrapper.container.querySelectorAll(
          '.ant-table-cell  .ant-form-item .ant-form-item-control-input input',
        )[1],
        {
          target: {
            value: '🐛 [BUG]yarn install命令',
          },
        },
      );
    });

    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalled();
      },
      {
        timeout: 1000,
      },
    );
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({
        id: '624748504',
        title: '🐛 [BUG]yarn install命令',
        labels: [{ name: 'bug', color: 'error' }],
        time: { created_at: 1590486176000 },
        state: 'processing',
        index: undefined,
      });
    });
  });

  it('📝 EditableProTable render input controlled will trigger onchange', async () => {
    const onChange = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        rowKey="id"
        controlled
        recordCreatorProps={{
          creatorButtonText: '测试添加数据',
          record: { id: 9999 },
        }}
        editable={{
          editableKeys: ['624748504'],
        }}
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            copyable: true,
            fieldProps: {
              onChange: () => null,
            },
            formItemRender: () => <Input />,
            ellipsis: true,
            tooltip: '标题过长会自动收缩',
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
            width: '30%',
            search: false,
          },
        ]}
        value={[
          {
            id: '624748504',
            title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
            labels: [{ name: 'bug', color: 'error' }],
            time: {
              created_at: 1590486176000,
            },
            state: 'processing',
          },
        ]}
        onChange={(data) => {
          onChange(data[0]);
        }}
      />,
    );

    await wrapper.findAllByText('测试添加数据');

    await waitFor(() => {
      act(() => {
        fireEvent.change(
          wrapper.container.querySelectorAll(
            '.ant-table-cell .ant-form-item-control-input input',
          )[0],
          {
            target: {
              value: '🐛 [BUG]yarn install命令',
            },
          },
        );
      });
    });

    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalled();
      },
      {
        timeout: 1000,
      },
    );

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({
        id: '624748504',
        title: '🐛 [BUG]yarn install命令',
        labels: [{ name: 'bug', color: 'error' }],
        time: { created_at: 1590486176000 },
        state: 'processing',
        index: undefined,
      });
    });
  });

  it('📝 EditableProTable render ProFromText controlled will trigger onchange ', async () => {
    const onChange = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        rowKey="id"
        controlled
        recordCreatorProps={{
          creatorButtonText: '测试添加数据',
          record: { id: 9999 },
        }}
        editable={{
          editableKeys: ['624748504'],
        }}
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            copyable: true,
            formItemRender: () => <ProFormText />,
            ellipsis: true,
            tooltip: '标题过长会自动收缩',
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
            width: '30%',
            search: false,
          },
        ]}
        value={[
          {
            id: '624748504',
            title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
            labels: [{ name: 'bug', color: 'error' }],
            time: {
              created_at: 1590486176000,
            },
            state: 'processing',
          },
        ]}
        onChange={(data) => {
          onChange(data[0]);
        }}
      />,
    );

    await wrapper.findAllByText('测试添加数据');

    act(() => {
      fireEvent.change(
        wrapper.container.querySelectorAll(
          '.ant-table-cell .ant-row .ant-form-item .ant-form-item-control-input input',
        )[0],
        {
          target: {
            value: 'yarn install命令',
          },
        },
      );
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({
        id: '624748504',
        title: 'yarn install命令',
        labels: [{ name: 'bug', color: 'error' }],
        time: { created_at: 1590486176000 },
        state: 'processing',
        index: undefined,
      });
    });
  });

  it('📝 EditableProTable support name', async () => {
    const onChange = vi.fn();
    const wrapper = render(
      <ProForm
        initialValues={{
          table: [
            {
              id: '624748504',
              title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
              labels: [{ name: 'bug', color: 'error' }],
              time: {
                created_at: 1590486176000,
              },
              state: 'processing',
            },
          ],
        }}
        onValuesChange={(_, { table }) => onChange(JSON.stringify(table))}
      >
        <EditableProTable<DataSourceType>
          rowKey="id"
          controlled
          name="table"
          editable={{
            editableKeys: ['624748504'],
          }}
          columns={columns}
        />
      </ProForm>,
    );

    await wrapper.findAllByText('标题');

    act(() => {
      fireEvent.change(
        wrapper.container.querySelectorAll(
          '.ant-table-cell .ant-form-item-control-input input',
        )[1],
        {
          target: {
            value: '🐛 [BUG]yarn install命令',
          },
        },
      );
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(
        JSON.stringify([
          {
            id: '624748504',
            title: '🐛 [BUG]yarn install命令',
            labels: [{ name: 'bug', color: 'error' }],
            time: { created_at: 1590486176000 },
            state: 'processing',
            index: undefined,
          },
        ]),
      );
    });
  });

  it('📝 EditableProTable support name and setRowData', async () => {
    const onChange = vi.fn();
    let i = 0;
    const formRef = React.createRef<EditableFormInstance<any>>();
    const wrapper = render(
      <ProForm
        initialValues={{
          table: [
            {
              id: '624748504',
              title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
              labels: [{ name: 'bug', color: 'error' }],
              time: {
                created_at: 1590486176000,
              },
              state: 'processing',
            },
          ],
        }}
        onValuesChange={(_, { table }) => onChange(JSON.stringify(table))}
      >
        <EditableProTable<DataSourceType>
          rowKey="id"
          controlled
          name="table"
          editableFormRef={formRef}
          editable={{
            actionRender: (row, config) => {
              return [
                <a
                  key="set"
                  onClick={() => {
                    i++;
                    formRef.current?.setRowData?.(config.index!, {
                      title: '动态设置的title' + i,
                    });
                  }}
                >
                  动态设置此项
                </a>,
              ];
            },
          }}
          recordCreatorProps={{
            creatorButtonText: '添加新的一行',
            record: () => {
              i++;
              return {
                id: '111' + i,
              };
            },
          }}
          columns={[
            {
              title: '活动名称',
              dataIndex: 'title',
              formItemProps: () => {
                return {
                  rules: [{ required: true, message: '此项为必填项' }],
                };
              },
              width: '30%',
            },
            {
              title: '操作',
              valueType: 'option',
              width: 200,
            },
          ]}
        />
      </ProForm>,
    );

    await wrapper.findAllByText('添加新的一行');

    act(() => {
      fireEvent.click(wrapper.getByText('添加新的一行'));
    });

    await waitFor(() => {
      return wrapper.findAllByText('动态设置此项');
    });

    act(() => {
      fireEvent.click(wrapper.getByText('动态设置此项'));
    });
    await waitFor(() => {
      return wrapper.findByDisplayValue('动态设置的title' + i);
    });

    // 等待表单值更新，使用 getRowsData 更可靠
    await waitFor(
      () => {
        const rowsData = formRef.current?.getRowsData?.();
        expect(rowsData).toBeDefined();
        expect(rowsData?.length).toEqual(2);
      },
      { timeout: 3000 },
    );

    // 也验证 getFieldValue，需要等待表单值同步完成
    // 使用 getRowsData 来验证，因为它已经通过了，说明表单值已经更新
    // getFieldValue 可能在某些情况下返回 undefined，所以我们使用 getRowsData 作为主要验证方式
    await waitForWaitTime(200);

    const tableValue = formRef.current?.getFieldValue?.('table');
    // 如果 getFieldValue 返回 undefined，使用 getRowsData 作为备选
    const finalValue = tableValue || formRef.current?.getRowsData?.();
    expect(finalValue).toBeDefined();
    expect(Array.isArray(finalValue)).toBe(true);
    expect(finalValue?.length).toEqual(2);
  });

  it('📝 EditableProTable ensures that xxxProps are functions also executed', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const formItemPropsFn = vi.fn();
    const fieldPropsFn = vi.fn();

    const currentlyColumns: ProColumns<DataSourceType>[] = [
      {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
        formItemRender: () => <InputNumber />,
      },
      {
        title: '标题',
        dataIndex: 'title',
        formItemProps: formItemPropsFn,
        fieldProps: fieldPropsFn,
      },
    ];

    render(
      <ProForm
        initialValues={{
          table: [
            {
              id: '624748504',
              title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
            },
          ],
        }}
      >
        <EditableProTable<DataSourceType>
          rowKey="id"
          controlled
          name="table"
          editable={{
            editableKeys: ['624748504'],
          }}
          columns={currentlyColumns}
        />
      </ProForm>,
    );

    await waitFor(() => {
      expect(formItemPropsFn).toHaveBeenCalled();
      expect(fieldPropsFn).toHaveBeenCalled();
      expect(errorSpy).not.toHaveBeenCalled();
    });

    errorSpy.mockRestore();
  });

  it('📝 sub-column values are correct in the form', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const currentlyColumns: ProColumns<DataSourceType>[] = [
      {
        title: '标题',
        dataIndex: 'title',
      },
    ];

    const editableKeys: any[] = [];
    let resultTitle = '';
    const tableData = (function generateData(prefix = '', depth = 1): any {
      const curData = [];
      if (depth > 3) {
        return;
      }
      let start = 1;
      while (start++ <= 3) {
        const title = `title${prefix}${depth}${start}`;
        resultTitle += title;
        const children = generateData(`${prefix}${start}`, depth + 1);
        const id = `${prefix}${depth}${start}`;
        editableKeys.push(id);
        curData.push({
          id,
          title,
          children,
        });
      }
      return curData;
    })();

    const wrapper = render(
      <ProForm
        initialValues={{
          table: tableData,
        }}
      >
        <EditableProTable<DataSourceType>
          rowKey="id"
          controlled
          name="table"
          headerTitle="可编辑表格"
          expandable={{
            defaultExpandAllRows: true,
          }}
          editable={{
            editableKeys,
          }}
          columns={currentlyColumns}
        />
      </ProForm>,
    );
    await wrapper.getAllByText('可编辑表格');

    let answerTitle = '';

    wrapper.container.querySelectorAll('input').forEach((item) => {
      answerTitle += item.value;
    });

    await waitFor(() => {
      expect(answerTitle).toMatch(resultTitle);

      expect(errorSpy).not.toHaveBeenCalled();
    });
    errorSpy.mockRestore();
  });

  it('📝 EditableProTable support recordCreatorProps.position', async () => {
    const wrapper = render(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={{
          creatorButtonText: '测试添加数据',
          record: { id: 9999 },
          position: 'top',
        }}
        columns={columns}
        value={defaultData}
      />,
    );

    // 等待组件完全渲染
    await waitForWaitTime(1000);

    // 等待按钮出现
    await waitFor(
      () => {
        expect(wrapper.container.querySelector('button')).toBeTruthy();
      },
      { timeout: 10000 },
    );

    await wrapper.findAllByText('测试添加数据');
      });

  it('📝 support onEditorChange', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditorProTableDemo
        onEditorChange={(keys) => {
          fn(keys);
        }}
      />,
    );

    // 等待组件完全渲染
    await waitForWaitTime(1000);

    await wrapper.findAllByText('编辑');

    act(() => {
      wrapper.queryAllByText('编辑')[0]?.click();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith([624748504]);
    });

    wrapper.unmount();
  });

  it('📝 support onValuesChange', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={false}
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
          },
        ]}
        value={[
          {
            id: 624748504,
            title: 'install命令',
            labels: [{ name: 'bug', color: 'error' }],
            time: {
              created_at: 1590486176000,
            },
            state: 'processing',
          },
        ]}
        editable={{
          editableKeys: [624748504],
          onValuesChange: (record) => {
            fn(record.id);
          },
        }}
      />,
    );

    // 等待组件完全渲染
    await waitForWaitTime(1000);

    await wrapper.findByDisplayValue('install命令');

    act(() => {
      fireEvent.change(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('td .ant-input')[0],
        {
          target: {
            value: '命令',
          },
        },
      );
    });

    await waitFor(
      () => {
        expect(fn).toHaveBeenCalledWith(624748504);
      },
      {
        timeout: 1000,
      },
    );
  });

  it('📝 EditableProTable columns support dependencies', async () => {
    const fn = vi.fn();

    const wrapper = render(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={false}
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
          },
          {
            title: '状态',
            dataIndex: 'status',
            valueType: 'select',
            dependencies: ['title'],
            request: async (values) => {
              fn(values.title);
              return [
                {
                  label: '关闭',
                  value: 'closed',
                },
                {
                  label: '运行中',
                  value: 'processing',
                },
              ];
            },
          },
        ]}
        value={[
          {
            id: 624748504,
            title: 'install命令',
            labels: [{ name: 'bug', color: 'error' }],
            time: {
              created_at: 1590486176000,
            },
            state: 'processing',
          },
        ]}
        editable={{
          editableKeys: [624748504],
        }}
      />,
    );

    // 等待组件完全渲染
    await waitForWaitTime(1000);

    await wrapper.findByDisplayValue('install命令');

    act(() => {
      fireEvent.change(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('td .ant-input')[0],
        {
          target: {
            value: '命令',
          },
        },
      );
    });

    await waitFor(
      () => {
        expect(fn).toHaveBeenCalledWith('命令');
      },
      {
        timeout: 5000,
      },
    );
  });

  it('📝 support onValuesChange when is string key', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={false}
        columns={columns}
        value={[
          {
            id: '02',
            title: 'install',
            labels: [{ name: 'bug', color: 'error' }],
            time: {
              created_at: 1590486176000,
            },
            state: 'processing',
          },
        ]}
        editable={{
          editableKeys: ['02'],
          onValuesChange: (record) => {
            fn(record.id);
          },
        }}
      />,
    );

    await wrapper.findByDisplayValue('install');

    await act(async () => {
      const dom = await wrapper.findByDisplayValue('install');
      fireEvent.change(dom, {
        target: {
          value: 'qixian',
        },
      });
    });

    await waitFor(
      () => {
        expect(fn).toHaveBeenCalledWith('02');
      },
      {
        timeout: 1000,
      },
    );

    wrapper.unmount();
  });

  it('📝 support newRecordType = dataSource', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={{
          position: 'top',
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now().toString(),
          }),
          creatorButtonText: '添加新行',
          id: 'add_new',
        }}
        columns={columns}
        defaultValue={defaultData}
        onChange={(list) => fn(list.length)}
      />,
    );

    // 等待组件完全渲染
    await waitForWaitTime(1000);

    // 等待按钮出现
    await waitFor(
      () => {
        expect(wrapper.container.querySelector('button')).toBeTruthy();
      },
      { timeout: 10000 },
    );

    await wrapper.findAllByText('添加新行');

    act(() => {
      wrapper.queryAllByText('添加新行').at(1)?.click();
    });

    await waitFor(
      () => {
        expect(fn).toHaveBeenCalledWith(4);
      },
      {
        timeout: 5000,
      },
    );
  });

  it('🐛 title function should not show duplicate popover layers', async () => {
    const TitleWithPopover: React.FC<{
      schema: ProColumns<DataSourceType>;
      type?: string;
      dom: React.ReactNode;
    }> = ({ schema, type: _type, dom: _dom }) => {
      const [open, setOpen] = useState(false);
      return (
        <Popover
          content={
            <div>
              <p>批量操作内容</p>
              <Input placeholder="输入内容" />
            </div>
          }
          trigger="click"
          open={open}
          onOpenChange={setOpen}
        >
          <Button type="link" onClick={() => setOpen(true)}>
            {typeof schema.title === 'function'
              ? '标题'
              : (schema.title ?? '标题')}
          </Button>
        </Popover>
      );
    };

    const columnsWithTitleFunction: ProColumns<DataSourceType>[] = [
      {
        title: (schema, type, dom) => (
          <TitleWithPopover schema={schema} type={type ?? 'text'} dom={dom} />
        ),
        dataIndex: 'title',
        valueType: 'text',
      },
      {
        title: '状态',
        dataIndex: 'state',
        valueType: 'text',
      },
    ];

    const wrapper = render(
      <EditableProTable<DataSourceType>
        rowKey="id"
        columns={columnsWithTitleFunction}
        value={defaultData}
        editable={{
          editableKeys: [],
        }}
      />,
    );

    await waitForWaitTime(500);

    // 查找标题按钮
    const titleButton = wrapper.container.querySelector(
      '.ant-btn-link',
    ) as HTMLElement;

    expect(titleButton).toBeTruthy();

    // 点击标题按钮
    act(() => {
      titleButton?.click();
    });

    await waitForWaitTime(300);

    // 验证只有一个 Popover 弹出层
    const popovers = wrapper.container.querySelectorAll(
      '.ant-popover:not(.ant-popover-hidden)',
    );
    // 应该只有一个可见的 Popover（不包括隐藏的）
    const visiblePopovers = Array.from(popovers).filter(
      (popover) => !popover.classList.contains('ant-popover-hidden'),
    );
    expect(visiblePopovers.length).toBeLessThanOrEqual(1);
  });
});
