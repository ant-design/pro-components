import ProForm, { ProFormText } from '@ant-design/pro-form';
import type { ActionType, ProColumns, TableRowEditable } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { act, fireEvent, render } from '@testing-library/react';
import { Button, Input, InputNumber } from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, { useRef } from 'react';
import { waitForComponentToPaint, waitTime } from '../util';

type DataSourceType = {
  id: number | string;
  title?: string;
  labels?: {
    name: string;
    color: string;
  }[];
  state?: string;
  time?: {
    created_at?: string;
  };
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
    labels: [{ name: 'bug', color: 'error' }],
    time: {
      created_at: '2020-05-26T09:42:56Z',
    },
    state: 'processing',
  },
  {
    id: 624691229,
    title: '🐛 [BUG]无法创建工程npm create umi',
    labels: [{ name: 'bug', color: 'error' }],
    time: {
      created_at: '2020-05-26T08:19:22Z',
    },
    state: 'closed',
  },
  {
    id: 624674790,
    title: '🧐 [问题] build 后还存在 es6 的代码（Umi@2.13.13）',
    labels: [{ name: 'question', color: 'success' }],
    state: 'open',
    time: {
      created_at: '2020-05-26T07:54:25Z',
    },
    children: [
      {
        id: 6246747901,
        title: '嵌套数据的编辑',
        labels: [{ name: 'question', color: 'success' }],
        state: 'closed',
        time: {
          created_at: '2020-05-26T07:54:25Z',
        },
        children: [
          {
            id: 62467479012,
            title: '嵌套数据的编辑',
            labels: [{ name: 'question', color: 'success' }],
            state: 'closed',
            time: {
              created_at: '2020-05-26T07:54:25Z',
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
    tip: '标题过长会自动收缩',
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
    onDataSourceChange?: (dataSource: DataSourceType[]) => void;
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
  const [tableDataSource, setDataSource] = useMergedState<DataSourceType[]>([], {
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
describe('EditorProTable 2', () => {
  it('📝 EditableProTable controlled will trigger onchange', async () => {
    const onChange = jest.fn();
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
              created_at: '2020-05-26T09:42:56Z',
            },
            state: 'processing',
          },
        ]}
        onChange={(data) => {
          onChange(data[0]);
        }}
      />,
    );

    act(() => {
      fireEvent.change(
        wrapper.container.querySelectorAll(
          '.ant-table-cell .ant-row.ant-form-item .ant-form-item-control-input input',
        )[1],
        {
          target: {
            value: '🐛 [BUG]yarn install命令',
          },
        },
      );
    });

    await waitForComponentToPaint(wrapper, 100);

    expect(onChange).toBeCalled();
    expect(onChange).toBeCalledWith({
      id: '624748504',
      title: '🐛 [BUG]yarn install命令',
      labels: [{ name: 'bug', color: 'error' }],
      time: { created_at: '2020-05-26T09:42:56Z' },
      state: 'processing',
      index: undefined,
    });
  });

  it('📝 EditableProTable render input controlled will trigger onchange', async () => {
    const onChange = jest.fn();
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
            tip: '标题过长会自动收缩',
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
              created_at: '2020-05-26T09:42:56Z',
            },
            state: 'processing',
          },
        ]}
        onChange={(data) => {
          onChange(data[0]);
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      fireEvent.change(
        wrapper.container.querySelectorAll(
          '.ant-table-cell .ant-row.ant-form-item .ant-form-item-control-input input',
        )[0],
        {
          target: {
            value: '🐛 [BUG]yarn install命令',
          },
        },
      );
    });

    await waitForComponentToPaint(wrapper, 100);

    expect(onChange).toBeCalled();
    expect(onChange).toBeCalledWith({
      id: '624748504',
      title: '🐛 [BUG]yarn install命令',
      labels: [{ name: 'bug', color: 'error' }],
      time: { created_at: '2020-05-26T09:42:56Z' },
      state: 'processing',
      index: undefined,
    });
  });

  it('📝 EditableProTable render ProFromText controlled will trigger onchange ', async () => {
    const onChange = jest.fn();
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
            tip: '标题过长会自动收缩',
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
              created_at: '2020-05-26T09:42:56Z',
            },
            state: 'processing',
          },
        ]}
        onChange={(data) => {
          onChange(data[0]);
        }}
      />,
    );

    await waitForComponentToPaint(wrapper, 1200);

    act(() => {
      fireEvent.change(
        wrapper.container.querySelectorAll(
          '.ant-table-cell .ant-row.ant-form-item .ant-form-item-control-input input',
        )[0],
        {
          target: {
            value: 'yarn install命令',
          },
        },
      );
    });

    await waitForComponentToPaint(wrapper, 100);

    expect(onChange).toBeCalled();
    expect(onChange).toBeCalledWith({
      id: '624748504',
      title: 'yarn install命令',
      labels: [{ name: 'bug', color: 'error' }],
      time: { created_at: '2020-05-26T09:42:56Z' },
      state: 'processing',
      index: undefined,
    });
  });

  it('📝 EditableProTable support name', async () => {
    const onChange = jest.fn();
    const wrapper = render(
      <ProForm
        initialValues={{
          table: [
            {
              id: '624748504',
              title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
              labels: [{ name: 'bug', color: 'error' }],
              time: {
                created_at: '2020-05-26T09:42:56Z',
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
    await waitForComponentToPaint(wrapper, 100);

    act(() => {
      fireEvent.change(
        wrapper.container.querySelectorAll(
          '.ant-table-cell .ant-row.ant-form-item .ant-form-item-control-input input',
        )[1],
        {
          target: {
            value: '🐛 [BUG]yarn install命令',
          },
        },
      );
    });

    await waitForComponentToPaint(wrapper, 100);

    expect(onChange).toBeCalled();
    expect(onChange).toBeCalledWith(
      JSON.stringify([
        {
          id: '624748504',
          title: '🐛 [BUG]yarn install命令',
          labels: [{ name: 'bug', color: 'error' }],
          time: { created_at: '2020-05-26T09:42:56Z' },
          state: 'processing',
          index: undefined,
        },
      ]),
    );
  });

  it('📝 EditableProTable ensures that xxxProps are functions also executed', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const formItemPropsFn = jest.fn();
    const fieldPropsFn = jest.fn();

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

    const wrapper = render(
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
    await waitForComponentToPaint(wrapper, 100);

    expect(formItemPropsFn).toBeCalled();
    expect(fieldPropsFn).toBeCalled();

    expect(errorSpy).not.toBeCalled();

    errorSpy.mockRestore();
  });

  it('📝 sub-column values are correct in the form', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

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
    await waitForComponentToPaint(wrapper, 100);

    let answerTitle = '';

    wrapper.container.querySelectorAll('input').forEach((item) => {
      answerTitle += item.value;
    });

    expect(answerTitle).toMatch(resultTitle);

    expect(errorSpy).not.toBeCalled();

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
    await waitForComponentToPaint(wrapper, 1200);
    expect(wrapper.asFragment).toMatchSnapshot();
  });

  it('📝 support onEditorChange', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <EditorProTableDemo
        onEditorChange={(keys) => {
          fn(keys);
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.queryAllByText('编辑')[0]?.click();
    });

    expect(fn).toBeCalledWith([624748504]);

    wrapper.unmount();
  });

  it('📝 support onValuesChange', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={false}
        columns={columns}
        value={defaultData}
        editable={{
          editableKeys: [624748504],
          onValuesChange: (record) => {
            fn(record.id);
          },
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);

    act(() => {
      fireEvent.change(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
          .querySelectorAll('td .ant-input')[0],
        {
          target: {
            value: '🐛 [BUG]yarn install命令',
          },
        },
      );
    });
    await waitForComponentToPaint(wrapper, 100);
    expect(fn).toBeCalledWith(624748504);
  });

  it('📝 support onValuesChange when is string key', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={false}
        columns={columns}
        value={[
          {
            id: '02',
            title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
            labels: [{ name: 'bug', color: 'error' }],
            time: {
              created_at: '2020-05-26T09:42:56Z',
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
    await waitForComponentToPaint(wrapper, 1000);

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

    await waitForComponentToPaint(wrapper, 100);
    expect(fn).toBeCalledWith('02');
    wrapper.unmount();
  });

  it('📝 support newRecordType = dataSource', async () => {
    const fn = jest.fn();
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
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.queryAllByText('添加新行').at(0)?.click();
    });
    await waitForComponentToPaint(wrapper, 2000);

    expect(fn).toBeCalledWith(4);
  });

  it('📝 support onValueChange when newRecordType = cache', async () => {
    const fn = jest.fn();
    const onValueChangeFn = jest.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={{
          record: {
            id: '1223',
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
        columns={columns}
        value={defaultData}
        onChange={(list) => {
          fn(list.length);
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 500);

    act(() => {
      wrapper.queryAllByText('添加新行')[0]?.click();
    });

    await waitForComponentToPaint(wrapper, 100);

    expect(fn).not.toBeCalled();

    await waitForComponentToPaint(wrapper, 1000);

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

    await waitForComponentToPaint(wrapper, 100);
    expect(onValueChangeFn).toBeCalledWith('1223');
    wrapper.unmount();
  });

  it('📝 support onValueChange when has name', async () => {
    const onValueChangeFn = jest.fn();
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
    await waitForComponentToPaint(wrapper, 1200);

    act(() => {
      wrapper.queryByText('开始编辑')?.click();
    });
    await waitForComponentToPaint(wrapper, 1000);

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

    await waitForComponentToPaint(wrapper, 100);
    expect(onValueChangeFn).toBeCalledWith(624748504);

    act(() => {
      actionRef.current?.cancelEditable(0);
    });
    await waitForComponentToPaint(wrapper, 1000);
    expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll('td .ant-input').length,
    ).toBe(0);
  });

  it('📝 support onValuesChange and recordCreatorProps', async () => {
    const fn = jest.fn();
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
        columns={columns}
        value={defaultData}
        editable={{
          onValuesChange: (record) => {
            fn(record.id);
          },
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);

    act(() => {
      wrapper.queryAllByText('添加新行').at(0)?.click();
    });
    await waitForComponentToPaint(wrapper, 200);

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

    await waitForComponentToPaint(wrapper, 200);
    expect(fn).toBeCalledWith(newLineId);
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
            renderFormItem: (item, config) => {
              return config.defaultRender(item);
            },
          },
        ]}
        value={defaultData}
      />,
    );
    await waitForComponentToPaint(wrapper, 1200);
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
    await waitForComponentToPaint(wrapper, 1200);
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
              created_at: '2020-05-26T09:42:56Z',
            },
            state: 'processing',
          },
        ]}
      />,
    );

    await waitForComponentToPaint(wrapper, 1200);

    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('📝 support editorRowKeys', async () => {
    const wrapper = render(<EditorProTableDemo editorRowKeys={[624748504]} />);
    await waitForComponentToPaint(wrapper, 1000);
    // 第一行应该编辑态
    expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll('input').length > 0,
    ).toBeTruthy();

    // 第二行不应该是编辑态
    expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll('input').length > 0,
    ).toBeFalsy();
  });

  it('📝 support cancel click', async () => {
    const wrapper = render(<EditorProTableDemo />);
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.queryAllByText('编辑').at(0)?.click();
    });
    await waitForComponentToPaint(wrapper, 1000);
    expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll('input').length > 0,
    ).toBeTruthy();

    await act(async () => {
      (await wrapper.findByText('取消')).click();
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll('input').length > 0,
    ).toBeFalsy();

    wrapper.unmount();
  });

  it('📝 support cancel click render false', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <EditorProTableDemo
        onEditorChange={(keys) => {
          fn(keys);
        }}
        onCancel={async () => false}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.queryAllByText('编辑')[0]?.click();
    });
    await waitForComponentToPaint(wrapper, 1000);

    expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll('input').length > 0,
    ).toBeTruthy();

    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll<HTMLDivElement>(`td a`)[2]
        ?.click();
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll('input').length > 0,
    ).toBeFalsy();
  });

  it('📝 type=single, only edit one rows', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <EditorProTableDemo
        defaultKeys={[624748504]}
        onEditorChange={(keys) => {
          fn(keys);
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.queryAllByText('编辑')[0]?.click();
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(fn).not.toBeCalled();
    wrapper.unmount();
  });

  it('📝 edit tree data table', async () => {
    const fn = jest.fn();
    const wrapper = render(<EditorProTableDemo onSave={fn} dataSource={[defaultData[2]]} />);
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll<HTMLSpanElement>('td button.ant-table-row-expand-icon')[0]
        .click();
    });

    await waitForComponentToPaint(wrapper, 200);

    act(() => {
      wrapper.container.querySelectorAll<HTMLSpanElement>('#editor')[0].click();
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(
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
    await waitForComponentToPaint(wrapper, 1000);

    expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll('input').length > 0,
    ).toBeFalsy();

    expect(fn).toBeCalled();
    wrapper.unmount();
  });

  it('📝 type=multiple, edit multiple rows', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <EditorProTableDemo
        type="multiple"
        defaultKeys={[624748504]}
        onEditorChange={(keys) => {
          fn(keys);
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.container.querySelectorAll<HTMLAnchorElement>('#editor')[0].click();
    });
    await waitForComponentToPaint(wrapper, 1000);
    expect(fn).toBeCalledWith([624748504, 624691229]);
    wrapper.unmount();
  });

  it('📝 support onSave', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <EditorProTableDemo
        hideRules
        onSave={async (key) => {
          await waitTime(1000);
          fn(key);
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.container.querySelectorAll<HTMLAnchorElement>('#editor')[1].click();
    });

    await waitForComponentToPaint(wrapper, 200);

    expect.any(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll('input').length > 0,
    );

    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll<HTMLAnchorElement>(`td a`)[0]
        ?.click();
    });

    await waitForComponentToPaint(wrapper, 200);
    expect(fn).not.toBeCalled();
    await waitForComponentToPaint(wrapper, 1000);
    expect(fn).toBeCalledWith(624691229);
    wrapper.unmount();
  });

  it('📝 support onDelete', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <EditorProTableDemo
        hideRules
        onDelete={async (key) => {
          await waitTime(1000);
          fn(key);
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.container.querySelectorAll<HTMLAnchorElement>('#editor')[1].click();
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll('input').length > 0,
    ).toBeTruthy();

    act(() => {
      wrapper.queryAllByText('删除').at(0)?.click();
    });

    await waitForComponentToPaint(wrapper, 200);

    act(() => {
      wrapper.queryAllByText('确 定').at(0)?.click();
    });

    expect(fn).not.toBeCalled();

    await waitForComponentToPaint(wrapper, 1200);

    expect(fn).toBeCalledWith(624691229);
    wrapper.unmount();
  });

  it('📝 support onSave when add newLine', async () => {
    const onSave = jest.fn();
    const onDataSourceChange = jest.fn();
    const wrapper = render(
      <EditorProTableDemo
        hideRules
        onSave={(key) => onSave(key)}
        onDataSourceChange={(data) => onDataSourceChange(data.length)}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.container.querySelectorAll<HTMLAnchorElement>('#editor')[1].click();
    });

    await waitForComponentToPaint(wrapper, 200);

    expect.any(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll('input').length > 0,
    );

    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll<HTMLAnchorElement>(`td a`)[0]
        ?.click();
    });

    await act(async () => {
      (await wrapper.queryAllByText('添加一行数据')).at(0)?.click();
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(onSave).toBeCalledWith(624691229);
    expect(onDataSourceChange).toBeCalledWith(3);

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
                id="editor"
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
              created_at: '2020-05-26T09:42:56Z',
            },
            state: 'processing',
          },
        ]}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);

    expect(
      wrapper.container.querySelector('.ant-table-tbody')?.querySelectorAll('tr.ant-table-row')
        .length,
    ).toBe(1);
    act(() => {
      wrapper.container.querySelector<HTMLButtonElement>('Button#editor')?.click();
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect.any(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll('input').length > 0,
    );
    expect(
      wrapper.container.querySelector('.ant-table-tbody')?.querySelectorAll('tr.ant-table-row')
        .length,
    ).toBe(2);

    act(() => {
      wrapper.queryByText('取消')?.click();
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(wrapper.container.querySelectorAll('.ant-table-row.ant-table-row-level-0').length).toBe(
      1,
    );
    wrapper.unmount();
  });

  it('📝 support onSave support false', async () => {
    const onSaveFn = jest.fn();
    const wrapper = render(
      <EditorProTableDemo
        hideRules
        onSave={async (key) => {
          onSaveFn(key);
          return false;
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.container.querySelectorAll<HTMLAnchorElement>('#editor')[1]?.click();
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll('input').length > 0,
    ).toBeTruthy();

    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll<HTMLAnchorElement>(`td a`)[0]
        ?.click();
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect.any(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll('input').length > 0,
    );

    expect(onSaveFn).toBeCalledWith(624691229);

    wrapper.unmount();
  });

  it('📝 support onCancel', async () => {
    const fn = jest.fn();
    const wrapper = render(<EditorProTableDemo onCancel={(key) => fn(key)} />);
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.container.querySelectorAll<HTMLAnchorElement>('#editor')[1]?.click();
    });

    await waitForComponentToPaint(wrapper, 200);

    expect.any(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll('input').length > 0,
    );

    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll<HTMLAnchorElement>(`td a`)[2]
        ?.click();
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(fn).toBeCalledWith(624691229);
  });

  it('📝 support onCancel support false', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <EditorProTableDemo
        onCancel={async (key) => {
          fn(key);
          return false;
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.container.querySelectorAll<HTMLAnchorElement>('#editor')[1]?.click();
    });

    await waitForComponentToPaint(wrapper, 200);

    expect.any(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll('input').length > 0,
    );

    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll<HTMLAnchorElement>(`td a`)[2]
        ?.click();
    });

    await waitForComponentToPaint(wrapper, 200);

    expect.any(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll('input').length,
    );

    expect(fn).toBeCalledWith(624691229);
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
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.queryAllByText('编辑')[0]?.click();
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll('input').length > 0,
    ).toBeTruthy();

    act(() => {
      wrapper.queryAllByText('删除')[0]?.click();
    });

    await waitForComponentToPaint(wrapper, 200);
    act(() => {
      wrapper.queryAllByText('确 定')[0]?.click();
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(!!wrapper.container.querySelector('.anticon-loading')).toBeFalsy();

    wrapper.unmount();
  });

  it('📝 support onDelete', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <EditorProTableDemo
        onDelete={async (key) => {
          fn(key);
          return false;
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.queryAllByText('编辑')[1]?.click();
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll('input').length > 0,
    ).toBeTruthy();

    act(() => {
      wrapper.queryAllByText('删除')[0]?.click();
    });

    await waitForComponentToPaint(wrapper, 200);

    act(() => {
      wrapper.queryAllByText('确 定')[0]?.click();
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(fn).toBeCalledWith(624691229);

    expect(wrapper.queryAllByText('删除').length > 0).toBeFalsy();
  });

  it('📝 support onDelete return false', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <EditorProTableDemo
        onDelete={async (key) => {
          await waitTime(500);
          fn(key);
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.queryAllByText('编辑')[1]?.click();
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll('input').length > 0,
    ).toBeTruthy();

    act(() => {
      wrapper.queryAllByText('删除')[0]?.click();
    });

    await waitForComponentToPaint(wrapper, 200);
    act(() => {
      wrapper.queryAllByText('确 定')[0]?.click();
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(fn).toBeCalledWith(624691229);
  });

  it('📝 support form rules', async () => {
    const fn = jest.fn();
    const wrapper = render(<EditorProTableDemo onSave={(key, row) => fn(row.title)} />);
    await waitForComponentToPaint(wrapper, 1000);

    act(() => {
      wrapper.queryAllByText('编辑')[0]?.click();
    });

    await waitForComponentToPaint(wrapper, 200);
    expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll('input').length > 0,
    ).toBeTruthy();

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
    act(() => {
      wrapper.queryAllByText('保存')[0]?.click();
    });

    // 没有通过验证，不触发 onSave
    expect(fn).not.toBeCalled();

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

    await waitForComponentToPaint(wrapper, 200);

    expect(fn).toBeCalledWith('qixian');
    wrapper.unmount();
  });

  it('📝 support add line for start', async () => {
    const fn = jest.fn();
    const wrapper = render(<EditorProTableDemo position="top" onSave={fn} />);
    await waitForComponentToPaint(wrapper, 1000);

    await act(async () => {
      (await wrapper.queryAllByText('增加一行')).at(0)?.click();
    });
    await waitForComponentToPaint(wrapper, 200);
    let editorRow = wrapper.container.querySelectorAll('.ant-table-tbody tr.ant-table-row')[0];

    expect(editorRow.querySelectorAll('input').length > 0).toBeTruthy();

    act(() => {
      editorRow.querySelectorAll<HTMLButtonElement>(`td a`)[1]?.click();
    });
    await waitForComponentToPaint(wrapper, 100);
    editorRow = wrapper.container.querySelectorAll('.ant-table-tbody tr.ant-table-row')[0];

    expect(editorRow.querySelectorAll('input').length > 0).toBeFalsy();

    await act(async () => {
      (await wrapper.queryAllByText('增加一行')).at(0)?.click();
    });

    await waitForComponentToPaint(wrapper, 200);

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
    await waitForComponentToPaint(wrapper, 200);
    expect(fn).toBeCalled();
  });

  it('📝 support add line for bottom', async () => {
    const fn = jest.fn();
    const wrapper = render(<EditorProTableDemo onSave={fn} />);
    await waitForComponentToPaint(wrapper, 1000);

    act(() => {
      wrapper.queryByText('增加一行')?.click();
    });

    await waitForComponentToPaint(wrapper, 200);

    act(() => {
      wrapper.queryByText('增加一行')?.click();
    });

    expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[3]
        .querySelectorAll('input').length > 0,
    ).toBeTruthy();

    act(() => {
      wrapper.queryByText('取消')?.click();
    });

    await waitForComponentToPaint(wrapper, 1000);

    act(() => {
      wrapper.queryByText('增加一行')?.click();
    });

    await waitForComponentToPaint(wrapper, 200);

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

    act(() => {
      fireEvent.click(
        wrapper.container
          .querySelectorAll('.ant-table-tbody tr.ant-table-row')[3]
          .querySelectorAll('td a')[0],
        {},
      );
    });
    await waitForComponentToPaint(wrapper, 200);
    expect(fn).toBeCalled();
  });

  it('📝 support add line when single line edit when keys', async () => {
    const wrapper = render(<EditorProTableDemo editorRowKeys={[624748504]} />);
    await waitForComponentToPaint(wrapper, 1000);

    expect(
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
        .querySelectorAll('input').length,
    ).toBe(4);

    await act(async () => {
      (await wrapper.queryByText('增加一行'))?.click();
    });

    await waitForComponentToPaint(wrapper, 100);

    await act(async () => {
      (await wrapper.queryByText('增加一行'))?.click();
    });
    await waitForComponentToPaint(wrapper, 100);

    expect(
      wrapper.container.querySelectorAll('.ant-table-tbody')[0].querySelectorAll('input').length,
    ).toBe(4);
  });

  it('📝 support add line when single line edit', async () => {
    const wrapper = render(<EditorProTableDemo />);
    await waitForComponentToPaint(wrapper, 1000);

    expect(
      wrapper.container.querySelectorAll('.ant-table-tbody')[0].querySelectorAll('input').length,
    ).toBe(0);

    await act(async () => {
      (await wrapper.queryByText('增加一行'))?.click();
    });

    await waitForComponentToPaint(wrapper, 100);

    await act(async () => {
      (await wrapper.queryByText('增加一行'))?.click();
    });
    await waitForComponentToPaint(wrapper, 100);

    expect(
      wrapper.container.querySelectorAll('.ant-table-tbody')[0].querySelectorAll('input').length,
    ).toBe(4);
  });
});
