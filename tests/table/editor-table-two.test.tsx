import type {
  ActionType,
  EditableFormInstance,
  ProColumns,
  TableRowEditable,
} from '@ant-design/pro-components';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-table';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { Button, Input, InputNumber } from 'antd';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import React, { act, useRef } from 'react';
import { waitTime } from '../util';

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
    renderFormItem: () => <InputNumber />,
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
  const [editableKeys, setEditorRowKeys] = useMergedState<React.Key[]>(
    () => props.defaultKeys || [],
    {
      value: props.editorRowKeys,
      onChange: props.onEditorChange,
    },
  );
  const [tableDataSource, setDataSource] = useMergedState<
    readonly DataSourceType[]
  >([], {
    value: props.dataSource,
    onChange: props.onDataSourceChange,
  });
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
        if (!props.hideRules) {
          // eslint-disable-next-line no-param-reassign
          delete item.formItemProps;
        }
        return item;
      })}
      actionRef={actionRef}
      request={async () => ({
        data: defaultData,
        total: 3,
        success: true,
      })}
      pagination={{}}
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
        expect(onChange).toBeCalled();
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
            renderFormItem: () => <Input />,
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
        expect(onChange).toBeCalled();
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
            fieldProps: {
              onChange: () => null,
            },
            renderFormItem: () => <ProFormText />,
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
      expect(onChange).toBeCalled();
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
      expect(onChange).toBeCalled();
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
    await waitFor(() => {
      expect(formRef.current?.getFieldValue?.('table').length).toEqual(2);
    });
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
        renderFormItem: () => <InputNumber />,
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
      expect(formItemPropsFn).toBeCalled();
      expect(fieldPropsFn).toBeCalled();
      expect(errorSpy).not.toBeCalled();
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

      expect(errorSpy).not.toBeCalled();
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
    await wrapper.findAllByText('测试添加数据');
    expect(wrapper.asFragment).toMatchSnapshot();
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
    vi.useFakeTimers();
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
                  label: '待审核',
                  value: values.title,
                },
              ];
            },
          },
        ]}
        editable={{
          editableKeys: [624748504],
          onValuesChange: (record) => {
            console.log(record);
          },
        }}
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
      />,
    );
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

    await act(async () => {
      vi.runOnlyPendingTimers();
    });

    await waitFor(
      () => {
        expect(fn).toHaveBeenCalledWith('命令');
      },
      {
        timeout: 1000,
      },
    );
    vi.useRealTimers();
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
    await wrapper.findAllByText('添加新行');

    act(() => {
      wrapper.queryAllByText('添加新行').at(1)?.click();
    });

    await waitFor(
      () => {
        expect(fn).toHaveBeenCalledWith(4);
      },
      {
        timeout: 1000,
      },
    );
  });

  it('📝 support onValueChange when newRecordType = cache', async () => {
    const fn = vi.fn();
    const onValueChangeFn = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={{
          record: {
            id: '1223',
            title: '新增的行123',
          },
          creatorButtonText: '添加新行',
          position: 'top',
        }}
        pagination={{
          pageSize: 2,
        }}
        editable={{
          onValuesChange: (record) => {
            onValueChangeFn(record.id);
          },
        }}
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
          },
        ]}
        value={[
          {
            id: '1',
            title: '标题',
          },
        ]}
        onChange={(list) => {
          fn(list.length);
        }}
      />,
    );
    await wrapper.findAllByText('添加新行');

    act(() => {
      wrapper.queryAllByText('添加新行')[0]?.click();
    });

    await waitFor(
      async () => {
        expect(
          wrapper.container
            .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
            .querySelectorAll('td .ant-input')[0],
        ).not.toBe(undefined);
      },
      {
        timeout: 2000,
      },
    );

    act(() => {
      fireEvent.change(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('td .ant-input')[0],
        {
          target: {
            value: 'qixian',
          },
        },
      );
    });

    await waitFor(() => {
      expect(onValueChangeFn).toHaveBeenCalledWith('1223');
    });
    wrapper.unmount();
  });

  it('📝 support onValueChange when has name', async () => {
    const onValueChangeFn = vi.fn();
    const actionRef = React.createRef<ActionType | undefined>();
    const wrapper = render(
      <ProForm
        initialValues={{
          table: defaultData,
        }}
      >
        <EditableProTable<DataSourceType>
          rowKey="id"
          actionRef={actionRef as any}
          name="table"
          pagination={{
            pageSize: 2,
          }}
          editable={{
            onValuesChange: (record) => {
              onValueChangeFn(record.id);
            },
          }}
          toolBarRender={(action) => [
            <a
              key="edit"
              id="start"
              onClick={() => {
                action?.startEditable('624748504');
              }}
            >
              开始编辑
            </a>,
            <a
              key="end"
              id="end"
              onClick={() => {
                action?.cancelEditable('624748504');
              }}
            >
              结束编辑
            </a>,
          ]}
          columns={columns}
        />
      </ProForm>,
    );
    await wrapper.findAllByText('开始编辑');

    act(() => {
      wrapper.queryByText('开始编辑')?.click();
    });

    await waitFor(
      async () => {
        expect(
          wrapper.container
            .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
            .querySelectorAll('td .ant-input')[0],
        ).not.toBe(undefined);
      },
      {
        timeout: 2000,
      },
    );

    act(() => {
      fireEvent.change(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('td .ant-input')[0],
        {
          target: {
            value: 'qixian',
          },
        },
      );
    });

    await waitFor(() => {
      expect(onValueChangeFn).toHaveBeenCalledWith(624748504);
    });

    act(() => {
      actionRef.current?.cancelEditable(0);
    });
    await waitFor(() => {
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('td .ant-input').length,
      ).toBe(0);
    });
  });

  it('📝 support onValuesChange and recordCreatorProps', async () => {
    const fn = vi.fn();
    const newLineId = Date.now();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={{
          position: 'top',
          record: {
            id: newLineId,
          },
          creatorButtonText: '添加新行',
        }}
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
            width: '30%',
          },
        ]}
        value={[]}
        editable={{
          onValuesChange: (record) => {
            fn(record.id);
          },
        }}
      />,
    );
    await wrapper.findAllByText('添加新行');

    act(() => {
      wrapper.queryAllByText('添加新行').at(0)?.click();
    });

    await waitFor(
      async () => {
        expect(
          wrapper.container
            .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
            .querySelectorAll('td .ant-input')[0],
        ).not.toBe(undefined);
      },
      {
        timeout: 2000,
      },
    );

    act(() => {
      fireEvent.change(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('td .ant-input')[0],
        {
          target: {
            value: 'qixian',
          },
        },
      );
    });

    await waitFor(
      () => {
        expect(fn).toHaveBeenCalledWith(newLineId);
      },
      {
        timeout: 2000,
      },
    );
    wrapper.unmount();
  });

  it('📝 renderFormItem run defaultRender', async () => {
    const wrapper = render(
      <EditableProTable<DataSourceType>
        rowKey="id"
        editable={{
          editableKeys: [624748504],
        }}
        columns={[
          {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
            title: '序号',
            renderFormItem: (item, config) => {
              return config.defaultRender(item);
            },
          },
        ]}
        value={defaultData}
      />,
    );
    await wrapper.findAllByText('序号');
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('📝 columns support editable test', async () => {
    const wrapper = render(
      <EditableProTable
        rowKey="id"
        editable={{
          editableKeys: [624748504],
        }}
        columns={[
          {
            dataIndex: 'index',
            valueType: 'indexBorder',
            title: '序号',
            width: 48,
            editable: (text, record, index) => {
              return index === 1;
            },
          },
          {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
            editable: false,
          },
        ]}
        value={defaultData}
      />,
    );
    await wrapper.findAllByText('序号');
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('📝 columns initialValue alway work', async () => {
    const wrapper = render(
      <EditableProTable
        rowKey="id"
        editable={{
          editableKeys: [624748504],
        }}
        columns={[
          {
            // dataIndex 存在有数据，不显示 initialValue
            dataIndex: 'title',
            valueType: 'text',
            width: 48,
            initialValue: '123',
          },
          {
            // dataIndex 不存在就没有数据显示 initialValue
            dataIndex: 'xxx2',
            valueType: 'text',
            width: 48,
            formItemProps: {
              initialValue: '123',
            },
          },
          {
            // dataIndex 不存在就没有数据显示 initialValue
            dataIndex: 'xxx',
            valueType: 'text',
            width: 48,
            formItemProps: () => {
              return { initialValue: '1234' };
            },
          },
        ]}
        value={[
          {
            id: 624748504,
            title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
            labels: [{ name: 'bug', color: 'error' }],
            time: {
              created_at: 1590486176000,
            },
            state: 'processing',
          },
        ]}
      />,
    );

    await wrapper.queryByDisplayValue('123');

    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('📝 support editorRowKeys', async () => {
    const wrapper = render(<EditorProTableDemo editorRowKeys={[624748504]} />);

    await waitFor(() => {
      // 第一行应该编辑态
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('input').length > 0,
      ).toBeTruthy();
    });
    await waitFor(() => {
      // 第二行不应该是编辑态
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
          .querySelectorAll('input').length > 0,
      ).toBeFalsy();
    });
  });

  it('📝 support cancel click', async () => {
    const wrapper = render(<EditorProTableDemo />);
    await wrapper.findAllByText('编辑');
    act(() => {
      wrapper.queryAllByText('编辑').at(0)?.click();
    });

    expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll('input').length > 0,
    ).toBeTruthy();

    await act(async () => {
      (await wrapper.findByText('取消')).click();
    });

    await waitFor(() => {
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('input').length > 0,
      ).toBeFalsy();
    });

    wrapper.unmount();
  });

  it('📝 support cancel click render false', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditorProTableDemo
        onEditorChange={(keys) => {
          fn(keys);
        }}
        onCancel={async () => false}
      />,
    );
    await wrapper.findAllByText('编辑');
    act(() => {
      wrapper.queryAllByText('编辑')[0]?.click();
    });
    await waitFor(() => {
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('input').length > 0,
      ).toBeTruthy();
    });

    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll<HTMLDivElement>(`td a`)[2]
        ?.click();
    });

    await waitFor(() => {
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('input').length > 0,
      ).toBeFalsy();
    });
  });

  it('📝 type=single, only edit one rows', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditorProTableDemo
        defaultKeys={[624748504]}
        onEditorChange={(keys) => {
          fn(keys);
        }}
      />,
    );
    await wrapper.findAllByText('编辑');

    act(() => {
      wrapper.queryAllByText('编辑')[0]?.click();
    });

    await waitFor(
      () => {
        expect(
          wrapper.container.querySelectorAll(
            '.ant-table-tbody tr.ant-table-row',
          ).length,
        ).toBe(3);
      },
      {
        timeout: 1000,
      },
    );

    await waitFor(
      () => {
        expect(fn).not.toBeCalled();
      },
      {
        timeout: 1000,
      },
    );
    wrapper.unmount();
  });

  it('📝 edit tree data table', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditorProTableDemo onSave={fn} dataSource={[defaultData[2]]} />,
    );
    await wrapper.findAllByText('编辑');
    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll<HTMLSpanElement>(
          'td button.ant-table-row-expand-icon',
        )[0]
        .click();
    });
    await wrapper.findAllByText('编辑');
    act(() => {
      wrapper.container.querySelectorAll<HTMLSpanElement>('#editor')[0].click();
    });

    await wrapper.findAllByText('编辑');

    await expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll('input').length > 0,
    ).toBeTruthy();

    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll<HTMLAnchorElement>('td a')[0]
        .click();
    });
    await waitFor(() => {
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('input').length > 0,
      ).toBeFalsy();

      expect(fn).toBeCalled();
    });
    wrapper.unmount();
  });

  it('📝 type=multiple, edit multiple rows', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditorProTableDemo
        type="multiple"
        defaultKeys={[624748504]}
        onEditorChange={(keys) => {
          fn(keys);
        }}
      />,
    );
    await wrapper.findAllByText('编辑');
    act(() => {
      wrapper.container
        .querySelectorAll<HTMLAnchorElement>('#editor')[0]
        .click();
    });
    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith([624748504, 624691229]);
    });

    wrapper.unmount();
  });

  it('📝 support onSave', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditorProTableDemo
        hideRules
        onSave={async (key) => {
          await waitTime(1000);
          fn(key);
        }}
      />,
    );
    await wrapper.findAllByText('编辑');

    act(() => {
      wrapper.container
        .querySelectorAll<HTMLAnchorElement>('#editor')[1]
        .click();
    });

    await wrapper.findAllByText('编辑');

    await waitFor(() => {
      expect.any(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
          .querySelectorAll('input').length > 0,
      );
    });

    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll<HTMLAnchorElement>(`td a`)[0]
        ?.click();
    });

    await waitFor(() => {
      expect(fn).not.toBeCalled();
    });
    await waitFor(
      () => {
        expect(fn).toHaveBeenCalledWith(624691229);
      },
      {
        timeout: 2000,
      },
    );
    wrapper.unmount();
  });

  it('📝 support onDelete', async () => {
    const fn = vi.fn();
    vi.useFakeTimers();
    const wrapper = render(
      <EditorProTableDemo
        hideRules
        onDelete={async (key) => {
          await waitTime(1000);
          fn(key);
        }}
      />,
    );
    await wrapper.findAllByText('编辑');

    act(() => {
      wrapper.container
        .querySelectorAll<HTMLAnchorElement>('#editor')[1]
        .click();
    });

    await act(async () => vi.runOnlyPendingTimers());

    await waitFor(() => {
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
          .querySelectorAll('input').length > 0,
      ).toBeTruthy();
    });

    await wrapper.findAllByText('删除');

    act(() => {
      wrapper.queryAllByText('删除').at(0)?.click();
    });

    await act(async () => vi.runOnlyPendingTimers());

    await waitFor(() => {
      expect(fn).not.toBeCalled();
    });

    act(() => {
      wrapper.queryAllByText('确 定').at(0)?.click();
    });

    await act(async () => vi.runOnlyPendingTimers());

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(624691229);
    });
    wrapper.unmount();
    vi.useRealTimers();
  });

  it('📝 support onSave when add newLine', async () => {
    const onSave = vi.fn();
    const onDataSourceChange = vi.fn();
    vi.useFakeTimers();
    const wrapper = render(
      <EditorProTableDemo
        hideRules
        onSave={(key) => onSave(key)}
        onDataSourceChange={(data) => onDataSourceChange(data.length)}
      />,
    );

    await wrapper.findAllByText('编辑');

    act(() => {
      wrapper.container
        .querySelectorAll<HTMLAnchorElement>('#editor')[1]
        .click();
    });

    await act(async () => vi.runOnlyPendingTimers());

    await waitFor(() => {
      expect.any(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
          .querySelectorAll('input').length > 0,
      );
    });

    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll<HTMLAnchorElement>(`td a`)[0]
        ?.click();
    });

    await wrapper.findAllByText('添加一行数据');

    await act(async () => {
      (await wrapper.queryAllByText('添加一行数据')).at(0)?.click();
    });

    await act(async () => vi.runOnlyPendingTimers());

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith(624691229);
    });

    await waitFor(() => {
      expect(onDataSourceChange).toHaveBeenCalledWith(3);
    });

    vi.useRealTimers();
    wrapper.unmount();
  });

  it('📝 support newLine and cancel', async () => {
    const wrapper = render(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={{
          id: 'editor',
          record: () => ({
            id: Date.now().toString(),
          }),
        }}
        columns={[
          {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
            editable: false,
          },
          {
            title: '操作',
            valueType: 'option',
            render: (text, row, _, action) => [
              <a
                key="editor"
                onClick={() => {
                  action?.startEditable?.(row.id);
                }}
              >
                编辑
              </a>,
            ],
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
      />,
    );

    await wrapper.queryAllByText('编辑');

    expect(
      wrapper.container
        .querySelector('.ant-table-tbody')
        ?.querySelectorAll('tr.ant-table-row').length,
    ).toBe(1);

    await act(async () => {
      ((await wrapper.findByText('添加一行数据')) as HTMLDivElement)?.click();
    });

    await waitFor(() => {
      expect.any(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('input').length > 0,
      );
    });

    await waitFor(
      () => {
        expect(
          wrapper.container
            .querySelector('.ant-table-tbody')
            ?.querySelectorAll('tr.ant-table-row').length,
        ).toBe(2);
      },
      {
        timeout: 2000,
      },
    );

    act(() => {
      wrapper.queryByText('取消')?.click();
    });

    await waitFor(
      () => {
        expect(
          wrapper.container.querySelectorAll(
            '.ant-table-row.ant-table-row-level-0',
          ).length,
        ).toBe(1);
      },
      {
        timeout: 1000,
      },
    );

    wrapper.unmount();
  });

  it('📝 support onSave support false', async () => {
    const onSaveFn = vi.fn();
    const wrapper = render(
      <EditorProTableDemo
        hideRules
        onSave={async (key) => {
          onSaveFn(key);
          return false;
        }}
      />,
    );
    await wrapper.findAllByText('编辑');
    act(() => {
      wrapper.container
        .querySelectorAll<HTMLAnchorElement>('#editor')[1]
        ?.click();
    });
    await waitFor(() => {
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
          .querySelectorAll('input').length > 0,
      ).toBeTruthy();
    });

    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll<HTMLAnchorElement>(`td a`)[0]
        ?.click();
    });

    await waitFor(() => {
      expect.any(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
          .querySelectorAll('input').length > 0,
      );
    });
    await waitFor(() => {
      expect(onSaveFn).toHaveBeenCalledWith(624691229);
    });
    wrapper.unmount();
  });

  it('📝 support onCancel', async () => {
    const fn = vi.fn();
    const wrapper = render(<EditorProTableDemo onCancel={(key) => fn(key)} />);
    await wrapper.findAllByText('编辑');
    act(() => {
      wrapper.container
        .querySelectorAll<HTMLAnchorElement>('#editor')[1]
        ?.click();
    });

    await waitFor(() => {
      expect.any(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('input').length > 0,
      );
    });

    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll<HTMLAnchorElement>(`td a`)[2]
        ?.click();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(624691229);
    });
  });

  it('📝 support onCancel support false', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditorProTableDemo
        onCancel={async (key) => {
          fn(key);
          return false;
        }}
      />,
    );
    await wrapper.findAllByText('编辑');
    act(() => {
      wrapper.container
        .querySelectorAll<HTMLAnchorElement>('#editor')[1]
        ?.click();
    });

    await waitFor(() => {
      expect.any(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('input').length > 0,
      );
    });
    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll<HTMLAnchorElement>(`td a`)[2]
        ?.click();
    });

    await waitFor(() => {
      expect.any(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('input').length,
      );
    });
    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(624691229);
    });
    wrapper.unmount();
  });

  it('📝 onDelete auto close loading when error ', async () => {
    const wrapper = render(
      <EditorProTableDemo
        onDelete={async () => {
          await waitTime(500);
          throw new Error('some time error');
        }}
      />,
    );
    await wrapper.findAllByText('编辑');

    act(() => {
      wrapper.queryAllByText('编辑')[0]?.click();
    });

    await waitFor(() => {
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('input').length > 0,
      ).toBeTruthy();
    });

    act(() => {
      wrapper.queryAllByText('删除')[0]?.click();
    });

    await wrapper.findAllByText('确 定');
    act(() => {
      wrapper.queryAllByText('确 定')[0]?.click();
    });

    await waitFor(() => {
      expect(!!wrapper.container.querySelector('.anticon-loading')).toBeFalsy();
    });

    wrapper.unmount();
  });

  it('📝 support onDelete dom render', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditorProTableDemo
        onDelete={async (key) => {
          fn(key);
          return false;
        }}
      />,
    );
    await wrapper.findAllByText('编辑');
    act(() => {
      wrapper.queryAllByText('编辑')[1]?.click();
    });

    await waitFor(() => {
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
          .querySelectorAll('input').length > 0,
      ).toBeTruthy();
    });

    await wrapper.findAllByText('删除');

    act(() => {
      wrapper.queryAllByText('删除')[0]?.click();
    });

    await wrapper.findAllByText('确 定');

    act(() => {
      wrapper.queryAllByText('确 定')[0]?.click();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(624691229);
      expect(wrapper.queryAllByText('删除').length > 0).toBeFalsy();
    });
  });

  it('📝 support onDelete return false', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditorProTableDemo
        onDelete={async (key) => {
          await waitTime(500);
          fn(key);
        }}
      />,
    );
    await wrapper.findAllByText('编辑');
    act(() => {
      wrapper.queryAllByText('编辑')[1]?.click();
    });

    await waitFor(() => {
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
          .querySelectorAll('input').length > 0,
      ).toBeTruthy();
    });

    act(() => {
      wrapper.queryAllByText('删除')[0]?.click();
    });

    await wrapper.findAllByText('确 定');
    act(() => {
      wrapper.queryAllByText('确 定')[0]?.click();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(624691229);
    });
  });

  it.skip('📝 support form rules', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditorProTableDemo onSave={(key, row) => fn(row.title)} />,
    );
    await wrapper.findAllByText('编辑');

    act(() => {
      wrapper.queryAllByText('编辑')[0]?.click();
    });

    await waitFor(() => {
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('input').length > 0,
      ).toBeTruthy();
    });

    act(() => {
      fireEvent.change(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll(`input`)[0],
        {
          target: {
            value: '',
          },
        },
      );
    });

    await wrapper.findAllByText('保存');

    act(() => {
      wrapper.queryAllByText('保存')[0]?.click();
    });

    await waitFor(() => {
      // 没有通过验证，不触发 onSave
      expect(fn).not.toBeCalled();
    });

    act(() => {
      fireEvent.change(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll(`td .ant-input`)[0],
        {
          target: {
            value: 'qixian',
          },
        },
      );
    });

    act(() => {
      wrapper.queryAllByText('保存')[0]?.click();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith('qixian');
    });
    wrapper.unmount();
  });

  it('📝 support add line for start', async () => {
    const fn = vi.fn();
    const wrapper = render(<EditorProTableDemo position="top" onSave={fn} />);
    await wrapper.findAllByText('编辑');

    await act(async () => {
      (await wrapper.queryAllByText('增加一行')).at(0)?.click();
    });

    await waitFor(
      () => {
        const editorRow = wrapper.container.querySelectorAll(
          '.ant-table-tbody tr.ant-table-row',
        )[0];
        expect(editorRow.querySelectorAll('input').length > 0).toBeTruthy();
      },
      {
        timeout: 1000,
      },
    );

    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll<HTMLButtonElement>(`td a`)[1]
        ?.click();
    });

    await waitFor(() => {
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('input').length > 0,
      ).toBeFalsy();
    });

    await act(async () => {
      (await wrapper.queryAllByText('增加一行')).at(0)?.click();
    });

    act(() => {
      fireEvent.change(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll(`td .ant-input`)[0],
        {
          target: {
            value: 'qixian',
          },
        },
      );
    });
    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll<HTMLAnchorElement>(`td a`)[0]
        ?.click();
    });
    await waitFor(() => {
      expect(fn).toBeCalled();
    });
  });

  it('📝 support add line for bottom', async () => {
    const fn = vi.fn();
    const wrapper = render(<EditorProTableDemo onSave={fn} />);
    await wrapper.findAllByText('增加一行');

    await waitFor(() => {
      expect(
        wrapper.container.querySelectorAll('.ant-table-tbody tr.ant-table-row')
          .length,
      ).toBe(3);
    });
    act(() => {
      wrapper.queryByText('增加一行')?.click();
    });

    await waitFor(
      () => {
        expect(
          wrapper.container.querySelectorAll(
            '.ant-table-tbody tr.ant-table-row',
          ).length,
        ).toBe(4);
      },
      {
        timeout: 1000,
      },
    );

    act(() => {
      wrapper.queryByText('增加一行')?.click();
    });

    await waitFor(
      () => {
        expect(
          wrapper.container.querySelectorAll(
            '.ant-table-tbody tr.ant-table-row',
          ).length,
        ).toBe(4);
      },
      {
        timeout: 1000,
      },
    );

    await waitFor(() => {
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[3]
          .querySelectorAll('input').length > 0,
      ).toBeTruthy();
    });

    act(() => {
      wrapper.queryByText('取消')?.click();
    });

    await waitFor(() => {
      expect(
        wrapper.container.querySelectorAll('.ant-table-tbody tr.ant-table-row')
          .length,
      ).toBe(3);
    });

    await waitFor(() => {
      expect(
        !!wrapper.container.querySelectorAll(
          '.ant-table-tbody tr.ant-table-row',
        )[3],
      ).toBeFalsy();
    });

    act(() => {
      wrapper.queryByText('增加一行')?.click();
    });

    await waitFor(() => {
      expect(
        wrapper.container.querySelectorAll('.ant-table-tbody tr.ant-table-row')
          .length,
      ).toBe(4);
    });

    await waitFor(() => {
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[3]
          .querySelectorAll('td .ant-input')[0],
      ).not.toBeUndefined();
    });

    act(() => {
      fireEvent.change(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[3]
          .querySelectorAll('td .ant-input')[0],
        {
          target: {
            value: 'qixian',
          },
        },
      );
    });

    await waitFor(() => {
      expect(
        wrapper.container.querySelectorAll(
          '.ant-table-tbody tr.ant-table-row',
        )[3],
      ).not.toBeUndefined();
    });

    act(() => {
      fireEvent.click(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[3]
          .querySelectorAll('td a')[0],
        {},
      );
    });
    await waitFor(() => {
      expect(fn).toBeCalled();
    });
  });

  it('📝 support add line when single line edit when keys', async () => {
    const wrapper = render(<EditorProTableDemo editorRowKeys={[624748504]} />);
    await wrapper.findAllByText('增加一行');
    await waitFor(() => {
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('input').length,
      ).toBe(4);
    });

    await act(async () => {
      (await wrapper.queryByText('增加一行'))?.click();
    });

    await waitFor(() => {
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('input').length,
      ).toBe(4);
    });

    await act(async () => {
      (await wrapper.queryByText('增加一行'))?.click();
    });

    await waitFor(() => {
      expect(
        wrapper.container
          .querySelectorAll('.ant-table-tbody')[0]
          .querySelectorAll('input').length,
      ).toBe(4);
    });
  });

  it('📝 support add line when single line edit', async () => {
    const wrapper = render(<EditorProTableDemo />);
    await wrapper.findAllByText('增加一行');
    await waitFor(
      () => {
        expect(
          wrapper.container
            .querySelectorAll('.ant-table-tbody')[0]
            .querySelectorAll('input').length,
        ).toBe(0);
      },
      {
        timeout: 1000,
      },
    );

    await act(async () => {
      (await wrapper.queryByText('增加一行'))?.click();
    });

    await act(async () => {
      (await wrapper.queryByText('增加一行'))?.click();
    });

    await waitFor(
      () => {
        expect(
          wrapper.container
            .querySelectorAll('.ant-table-tbody')[0]
            .querySelectorAll('input').length,
        ).toBe(4);
      },
      {
        timeout: 1000,
      },
    );
  });
});
