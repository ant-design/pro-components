import React, { useRef } from 'react';
import { Button, Input, InputNumber } from 'antd';
import type { TableRowEditable, ProColumns, ActionType } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { ProFormText } from '@ant-design/pro-form';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint, waitTime } from '../util';
import ProForm from '@ant-design/pro-form';

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
        onChange: setEditorRowKeys,
        onDelete: props.onDelete,
      }}
    />
  );
};

describe('EditorProTable', () => {
  it('📝 EditableProTable support recordCreatorProps=false', async () => {
    const wrapper = mount(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={false}
        columns={columns}
        value={defaultData}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('📝 EditableProTable support pagination', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <EditableProTable<DataSourceType>
        rowKey="id"
        pagination={{
          pageSize: 2,
          current: 2,
        }}
        editable={{
          onChange: (keys) => fn(keys[0]),
        }}
        recordCreatorProps={{
          position: 'bottom',
          record: {
            id: 555,
          },
          id: 'addEditRecord',
        }}
        columns={columns}
        value={defaultData}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);

    act(() => {
      wrapper.find('button#addEditRecord').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(fn).toBeCalledWith(555);

    wrapper.unmount();
  });

  it('📝 EditableProTable add support children column', async () => {
    const onchange = jest.fn();
    const wrapper = mount(
      <EditableProTable<DataSourceType>
        rowKey="id"
        pagination={{
          pageSize: 2,
          current: 2,
        }}
        editable={{}}
        onChange={(data) => onchange(data[0].children?.length)}
        recordCreatorProps={{
          position: 'bottom',
          newRecordType: 'dataSource',
          parentKey: () => 624674790,
          record: {
            id: 555,
          },
          id: 'addEditRecord',
        }}
        columns={columns}
        value={[
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
              },
            ],
          },
        ]}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);

    act(() => {
      wrapper.find('button#addEditRecord').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(onchange).toBeCalledWith(2);

    wrapper.unmount();
  });

  it('📝 EditableProTable add support parentKey when newRecordType = cache', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={{
          newRecordType: 'cache',
          record: () => ({
            id: 555,
          }),
          parentKey: () => 624748504,
          id: 'add_new',
        }}
        columns={columns}
        defaultValue={defaultData}
        onChange={(list) => fn(list.length)}
        expandable={{
          defaultExpandAllRows: true,
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('button#add_new').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 2000);

    expect(fn).not.toBeCalled();
    act(() => {
      wrapper
        .find('.ant-table-tbody tr.ant-table-row')
        .at(1)
        .find(`td .ant-input`)
        .at(0)
        .simulate('change', {
          target: {
            value: 'zqran',
          },
        });
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect.any(wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find('input').exists());
    expect(wrapper.find('.ant-table-tbody').find('tr.ant-table-row').length).toBe(6);

    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find(`td a`).at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(wrapper.find('.ant-table-row.ant-table-row-level-1').length).toBe(2);

    wrapper.unmount();
  });

  it('📝 EditableProTable support maxLength', async () => {
    const wrapper = mount(
      <EditableProTable<DataSourceType>
        maxLength={2}
        rowKey="id"
        columns={columns}
        value={defaultData}
      />,
    );
    await waitForComponentToPaint(wrapper, 100);
    expect(wrapper.find('button.ant-btn-dashed').exists()).toBeFalsy();

    act(() => {
      wrapper.setProps({
        maxLength: 20,
      });
    });

    await waitForComponentToPaint(wrapper, 100);

    expect(wrapper.find('button.ant-btn-dashed').exists()).toBeTruthy();

    wrapper.unmount();
  });

  it('📝 EditableProTable support actionRender', async () => {
    const wrapper = mount(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={false}
        columns={columns}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        editable={{
          editableKeys: [624748504],
          actionRender: () => [
            <div key="test" id="test">
              xx
            </div>,
          ],
        }}
        value={defaultData}
      />,
    );
    await waitForComponentToPaint(wrapper, 1100);
    expect(wrapper.find('div#test').text()).toBe('xx');
  });

  it('📝 EditableProTable support recordCreatorProps', async () => {
    const wrapper = mount(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={{
          creatorButtonText: '测试添加数据',
          record: { id: 9999 },
        }}
        columns={columns}
        value={defaultData}
      />,
    );
    await waitForComponentToPaint(wrapper, 1100);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('📝 EditableProTable support controlled', async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <EditableProTable<DataSourceType>
        rowKey={(row) => row.id}
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
        onChange={onChange}
      />,
    );

    await waitForComponentToPaint(wrapper, 1100);
    expect(
      wrapper
        .find('.ant-table-cell .ant-row.ant-form-item .ant-form-item-control-input input')
        .at(1)
        .props().value,
    ).toBe('🐛 [BUG]yarn install命令 antd2.4.5会报错');

    act(() => {
      wrapper.setProps({
        value: [
          {
            id: '624748504',
            title: '🐛 [BUG]无法创建工程npm create umi',
            labels: [{ name: 'bug', color: 'error' }],
            time: {
              created_at: '2020-05-26T09:42:56Z',
            },
            state: 'processing',
          },
        ],
      });
    });

    waitForComponentToPaint(wrapper, 100);
    expect(
      wrapper
        .find('.ant-table-cell .ant-row.ant-form-item .ant-form-item-control-input input')
        .at(1)
        .props().value,
    ).toBe('🐛 [BUG]无法创建工程npm create umi');
  });

  it('📝 EditableProTable controlled will trigger onchange', async () => {
    const onChange = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper
        .find('.ant-table-cell .ant-row.ant-form-item .ant-form-item-control-input input')
        .at(1)
        .simulate('change', {
          target: {
            value: '🐛 [BUG]yarn install命令',
          },
        });
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

  it('📝 EditableProTable render input controlled will trigger onchange ', async () => {
    const onChange = jest.fn();
    const wrapper = mount(
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
      wrapper
        .find('.ant-table-cell .ant-row.ant-form-item .ant-form-item-control-input input')
        .at(0)
        .simulate('change', {
          target: {
            value: '🐛 [BUG]yarn install命令',
          },
        });
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
    const wrapper = mount(
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
      wrapper
        .find('.ant-table-cell .ant-row.ant-form-item .ant-form-item-control-input input')
        .at(0)
        .simulate('change', {
          target: {
            value: 'yarn install命令',
          },
        });
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
    const wrapper = mount(
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
      wrapper
        .find('.ant-table-cell .ant-row.ant-form-item .ant-form-item-control-input input')
        .at(1)
        .simulate('change', {
          target: {
            value: '🐛 [BUG]yarn install命令',
          },
        });
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

    const wrapper = mount(
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

  it('📝sub-column values are correct in the form', async () => {
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

    const wrapper = mount(
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

    wrapper.find('input').forEach((item) => {
      answerTitle += item.prop('value') as string;
    });

    expect(answerTitle).toMatch(resultTitle);

    expect(errorSpy).not.toBeCalled();

    errorSpy.mockRestore();
  });

  it('📝 EditableProTable support recordCreatorProps.position', async () => {
    const wrapper = mount(
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
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('📝 support onEditorChange', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <EditorProTableDemo
        onEditorChange={(keys) => {
          fn(keys);
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('#editor').at(0).simulate('click');
    });

    expect(fn).toBeCalledWith([624748504]);

    wrapper.unmount();
  });

  it('📝 support onValuesChange', async () => {
    const fn = jest.fn();
    const wrapper = mount(
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
      wrapper
        .find('.ant-table-tbody tr.ant-table-row')
        .at(0)
        .find(`td .ant-input`)
        .at(0)
        .simulate('change', {
          target: {
            value: 'qixian',
          },
        });
    });
    await waitForComponentToPaint(wrapper, 100);
    expect(fn).toBeCalledWith(624748504);

    wrapper.unmount();
  });

  it('📝 support onValuesChange when is string key', async () => {
    const fn = jest.fn();
    const wrapper = mount(
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
      wrapper
        .find('.ant-table-tbody tr.ant-table-row')
        .at(0)
        .find(`td .ant-input`)
        .at(0)
        .simulate('change', {
          target: {
            value: 'qixian',
          },
        });
    });
    await waitForComponentToPaint(wrapper, 100);
    expect(fn).toBeCalledWith('02');
    wrapper.unmount();
  });

  it('📝 support newRecordType = dataSource', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={{
          position: 'top',
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now().toString(),
          }),
          id: 'add_new',
        }}
        columns={columns}
        defaultValue={defaultData}
        onChange={(list) => fn(list.length)}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('button#add_new').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 2000);

    expect(fn).toBeCalledWith(4);

    act(() => {
      wrapper
        .find('.ant-table-tbody tr.ant-table-row')
        .at(0)
        .find(`td .ant-input`)
        .at(0)
        .simulate('change', {
          target: {
            value: 'qixian',
          },
        });
    });

    wrapper.unmount();
  });

  it('📝 support onValueChange when newRecordType = cache', async () => {
    const fn = jest.fn();
    const onValueChangeFn = jest.fn();
    const wrapper = mount(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={{
          record: {
            id: '1223',
          },
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
      wrapper.find('button.ant-btn-dashed').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 100);

    expect(fn).not.toBeCalled();

    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper
        .find('.ant-table-tbody tr.ant-table-row')
        .at(0)
        .find(`td .ant-input`)
        .at(0)
        .simulate('change', {
          target: {
            value: 'qixian',
          },
        });
    });
    await waitForComponentToPaint(wrapper, 100);
    expect(onValueChangeFn).toBeCalledWith('1223');
    wrapper.unmount();
  });

  it('📝 support onValueChange when has name', async () => {
    const onValueChangeFn = jest.fn();
    const actionRef = React.createRef<ActionType | undefined>();
    const wrapper = mount(
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
      wrapper.find('#start').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    act(() => {
      wrapper
        .find('.ant-table-tbody tr.ant-table-row')
        .at(0)
        .find(`td .ant-input`)
        .at(0)
        .simulate('change', {
          target: {
            value: 'qixian',
          },
        });
    });
    await waitForComponentToPaint(wrapper, 100);
    expect(onValueChangeFn).toBeCalledWith(624748504);

    act(() => {
      actionRef.current?.cancelEditable(0);
    });
    await waitForComponentToPaint(wrapper, 1000);
    expect(
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(0).find(`td .ant-input`).exists(),
    ).toBe(false);

    wrapper.unmount();
  });

  it('📝 support onValuesChange and recordCreatorProps', async () => {
    const fn = jest.fn();
    const newLineId = Date.now();
    const wrapper = mount(
      <EditableProTable<DataSourceType>
        rowKey="id"
        recordCreatorProps={{
          position: 'top',
          record: {
            id: newLineId,
          },
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
      wrapper.find('button.ant-btn-dashed').at(1).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 200);
    act(() => {
      wrapper
        .find('.ant-table-tbody tr.ant-table-row')
        .at(0)
        .find(`td .ant-input`)
        .at(0)
        .simulate('change', {
          target: {
            value: 'qixian',
          },
        });
    });
    await waitForComponentToPaint(wrapper, 200);
    expect(fn).toBeCalledWith(newLineId);
    wrapper.unmount();
  });

  it('📝 renderFormItem run defaultRender', async () => {
    const wrapper = mount(
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
    act(() => {
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  it('📝 columns support editable test', async () => {
    const wrapper = mount(
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
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('📝 columns initialValue alway work', async () => {
    const wrapper = mount(
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

    act(() => {
      expect(wrapper.render()).toMatchSnapshot();
    });
    wrapper.unmount();
  });

  it('📝 support editorRowKeys', async () => {
    const wrapper = mount(<EditorProTableDemo editorRowKeys={[624748504]} />);
    await waitForComponentToPaint(wrapper, 1000);
    // 第一行应该编辑态
    expect(
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(0).find('input').exists(),
    ).toBeTruthy();

    // 第二行不应该是编辑态
    expect(
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find('input').exists(),
    ).toBeFalsy();
  });

  it('📝 support cancel click', async () => {
    const wrapper = mount(<EditorProTableDemo />);
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('#editor').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 1000);
    expect(
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(0).find('input').exists(),
    ).toBeTruthy();

    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(0).find(`td a`).at(2).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(0).find('input').exists(),
    ).toBeFalsy();

    wrapper.unmount();
  });

  it('📝 support cancel click render false', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <EditorProTableDemo
        onEditorChange={(keys) => {
          fn(keys);
        }}
        onCancel={async () => false}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('#editor').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 1000);
    expect.any(wrapper.find('.ant-table-tbody tr.ant-table-row').at(0).find('input').exists());

    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(0).find(`td a`).at(2).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect.any(wrapper.find('.ant-table-tbody tr.ant-table-row').at(0).find('input').exists());
    wrapper.unmount();
  });

  it('📝 type=single, only edit one rows', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <EditorProTableDemo
        defaultKeys={[624748504]}
        onEditorChange={(keys) => {
          fn(keys);
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('#editor').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(fn).not.toBeCalled();
    wrapper.unmount();
  });

  it('📝 edit tree data table', async () => {
    const fn = jest.fn();
    const wrapper = mount(<EditorProTableDemo onSave={fn} dataSource={[defaultData[2]]} />);
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper
        .find('.ant-table-tbody tr.ant-table-row')
        .at(0)
        .find('td button.ant-table-row-expand-icon')
        .simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    act(() => {
      wrapper.find('#editor').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(0).find('input').exists(),
    ).toBeTruthy();

    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(0).find('td a').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 1000);

    expect(
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(0).find('input').exists(),
    ).toBeFalsy();

    expect(fn).toBeCalled();
    wrapper.unmount();
  });

  it('📝 type=multiple, edit multiple rows', async () => {
    const fn = jest.fn();
    const wrapper = mount(
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
      wrapper.find('#editor').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 1000);
    expect(fn).toBeCalledWith([624748504, 624691229]);
    wrapper.unmount();
  });

  it('📝 support onSave', async () => {
    const fn = jest.fn();
    const wrapper = mount(
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
      wrapper.find('#editor').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect.any(wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find('input').exists());

    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find(`td a`).at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);
    expect(fn).not.toBeCalled();
    await waitForComponentToPaint(wrapper, 1000);
    expect(fn).toBeCalledWith(624691229);
    wrapper.unmount();
  });

  it('📝 support onDelete', async () => {
    const fn = jest.fn();
    const wrapper = mount(
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
      wrapper.find('#editor').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect.any(wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find('input').exists());
    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find(`td a`).at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    act(() => {
      wrapper.find('.ant-popover-buttons .ant-btn-primary').simulate('click');
    });

    expect(fn).not.toBeCalled();

    await waitForComponentToPaint(wrapper, 1200);

    expect(fn).toBeCalledWith(624691229);
    wrapper.unmount();
  });

  it('📝 support onSave when add newLine', async () => {
    const onSave = jest.fn();
    const onDataSourceChange = jest.fn();
    const wrapper = mount(
      <EditorProTableDemo
        hideRules
        onSave={(key) => onSave(key)}
        onDataSourceChange={(data) => onDataSourceChange(data.length)}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('#editor').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect.any(wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find('input').exists());

    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find(`td a`).at(0).simulate('click');
    });

    act(() => {
      wrapper.find('button#addEditRecord').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(onSave).toBeCalledWith(624691229);
    expect(onDataSourceChange).toBeCalledWith(3);

    wrapper.unmount();
  });

  it('📝 support newLine and cancel', async () => {
    const wrapper = mount(
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

    expect(wrapper.find('.ant-table-tbody').find('tr.ant-table-row').length).toBe(1);
    act(() => {
      wrapper.find('Button#editor').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect.any(wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find('input').exists());
    expect(wrapper.find('.ant-table-tbody').find('tr.ant-table-row').length).toBe(2);

    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find(`td a`).at(2).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(wrapper.find('.ant-table-row.ant-table-row-level-0').length).toBe(1);
    wrapper.unmount();
  });

  it('📝 support onSave support false', async () => {
    const onSaveFn = jest.fn();
    const wrapper = mount(
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
      wrapper.find('#editor').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find('input').exists(),
    ).toBeTruthy();

    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find(`td a`).at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect.any(wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find('input').exists());

    expect(onSaveFn).toBeCalledWith(624691229);

    wrapper.unmount();
  });

  it('📝 support onCancel', async () => {
    const fn = jest.fn();
    const wrapper = mount(<EditorProTableDemo onCancel={(key) => fn(key)} />);
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('#editor').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect.any(wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find('input').exists());

    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find(`td a`).at(2).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(fn).toBeCalledWith(624691229);
  });

  it('📝 support onCancel support false', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <EditorProTableDemo
        onCancel={async (key) => {
          fn(key);
          return false;
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('#editor').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect.any(wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find('input').exists());

    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find(`td a`).at(2).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect.any(wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find('input').exists());

    expect(fn).toBeCalledWith(624691229);
    wrapper.unmount();
  });

  it('📝 onDelete auto close loading when error ', async () => {
    const wrapper = mount(
      <EditorProTableDemo
        onDelete={async () => {
          await waitTime(500);
          throw new Error('some time error');
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('#editor').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find('input').exists(),
    ).toBeTruthy();

    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find(`td a`).at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);
    act(() => {
      wrapper.find('.ant-popconfirm .ant-popover-buttons .ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(wrapper.find('LoadingOutlined').exists()).toBeFalsy();

    wrapper.unmount();
  });

  it('📝 support onDelete', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <EditorProTableDemo
        onDelete={async (key) => {
          await waitTime(500);
          fn(key);
          return false;
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('#editor').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find('input').exists(),
    ).toBeTruthy();

    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find(`td a`).at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);
    act(() => {
      wrapper.find('.ant-popconfirm .ant-popover-buttons .ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(fn).toBeCalledWith(624691229);
    act(() => {
      wrapper.unmount();
    });
  });

  it('📝 support onDelete return false', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <EditorProTableDemo
        onDelete={async (key) => {
          await waitTime(500);
          fn(key);
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('#editor').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find('input').exists(),
    ).toBeTruthy();

    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find(`td a`).at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);
    act(() => {
      wrapper.find('.ant-popconfirm .ant-popover-buttons .ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(fn).toBeCalledWith(624691229);
    act(() => {
      wrapper.unmount();
    });
  });

  it('📝 support form rules', async () => {
    const fn = jest.fn();
    const wrapper = mount(<EditorProTableDemo onSave={(key, row) => fn(row.title)} />);
    await waitForComponentToPaint(wrapper, 1000);

    act(() => {
      wrapper.find('#editor').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);
    expect.any(wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find('input').exists());

    act(() => {
      wrapper
        .find('.ant-table-tbody tr.ant-table-row')
        .at(1)
        .find(`td .ant-input`)
        .at(0)
        .simulate('change', {
          target: {
            value: '',
          },
        });
    });
    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find(`td a`).at(0).simulate('click');
    });

    // 没有通过验证，不触发 onSave
    expect(fn).not.toBeCalled();

    act(() => {
      wrapper
        .find('.ant-table-tbody tr.ant-table-row')
        .at(1)
        .find(`td .ant-input`)
        .at(0)
        .simulate('change', {
          target: {
            value: 'qixian',
          },
        });
    });

    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(1).find(`td a`).at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(fn).toBeCalledWith('qixian');
    wrapper.unmount();
  });

  it('📝 support add line for start', async () => {
    const fn = jest.fn();
    const wrapper = mount(<EditorProTableDemo position="top" onSave={fn} />);
    await waitForComponentToPaint(wrapper, 1000);

    act(() => {
      wrapper.find('button#addEditRecord').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);
    let editorRow = wrapper.find('.ant-table-tbody tr.ant-table-row').at(0);

    expect(editorRow.find('input').exists()).toBeTruthy();

    act(() => {
      editorRow.find(`td a`).at(1).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 100);
    editorRow = wrapper.find('.ant-table-tbody tr.ant-table-row').at(0);

    expect(editorRow.find('input').exists()).toBeFalsy();

    act(() => {
      wrapper.find('button#addEditRecord').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    act(() => {
      wrapper
        .find('.ant-table-tbody tr.ant-table-row')
        .at(0)
        .find(`td .ant-input`)
        .at(0)
        .simulate('change', {
          target: {
            value: 'qixian',
          },
        });
    });
    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(0).find(`td a`).at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 200);
    expect(fn).toBeCalled();
  });

  it('📝 support add line for bottom', async () => {
    const fn = jest.fn();
    const wrapper = mount(<EditorProTableDemo onSave={fn} />);
    await waitForComponentToPaint(wrapper, 1000);

    act(() => {
      wrapper.find('button#addEditRecord').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    act(() => {
      wrapper.find('button#addEditRecord').simulate('click');
    });

    let editorRow = wrapper.find('.ant-table-tbody tr.ant-table-row').at(3);

    expect(editorRow.find('input').exists()).toBeTruthy();

    act(() => {
      editorRow.find(`td a`).at(1).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 100);
    editorRow = wrapper.find('.ant-table-tbody tr.ant-table-row').at(3);

    expect(editorRow.find('input').exists()).toBeFalsy();

    act(() => {
      wrapper.find('button#addEditRecord').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    act(() => {
      wrapper
        .find('.ant-table-tbody tr.ant-table-row')
        .at(3)
        .find(`td .ant-input`)
        .at(0)
        .simulate('change', {
          target: {
            value: 'qixian',
          },
        });
    });
    act(() => {
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(3).find(`td a`).at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 200);
    expect(fn).toBeCalled();
  });

  it('📝 support add line when single line edit', async () => {
    const wrapper = mount(<EditorProTableDemo editorRowKeys={[624748504]} />);
    await waitForComponentToPaint(wrapper, 1000);
    expect(
      wrapper.find('.ant-table-tbody tr.ant-table-row').at(0).find('input').exists(),
    ).toBeTruthy();

    act(() => {
      wrapper.find('button#addEditRecord').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 100);

    act(() => {
      wrapper.find('button#addEditRecord').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 100);

    const editorRow = wrapper.find('.ant-table-tbody tr.ant-table-row').at(3);

    expect(editorRow.find('input').exists()).toBeFalsy();
  });
});
