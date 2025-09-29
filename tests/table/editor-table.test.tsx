import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import type { ActionType, EditableFormInstance, ProColumns } from '@xxlabs/pro-components';
import { EditableProTable, ProForm, ProFormText } from '@xxlabs/pro-components';
import { InputNumber } from 'antd';
import crypto from 'crypto';
import React from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
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

afterEach(() => {
  cleanup();
});

describe('EditorProTable', () => {
  beforeAll(() => vi.useFakeTimers());
  afterAll(() => vi.useRealTimers());
  afterEach(() => {
    cleanup();
  });
  it('📝 EditableProTable support recordCreatorProps=false', async () => {
    const wrapper = render(
      <EditableProTable<DataSourceType> columns={columns} recordCreatorProps={false} rowKey="id" value={defaultData} />,
    );
    await waitForWaitTime(1000);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('📝 EditableProTable support pagination', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        columns={columns}
        editable={{
          onChange: (keys) => fn(keys[0]),
        }}
        pagination={{
          pageSize: 2,
          current: 2,
        }}
        recordCreatorProps={{
          position: 'bottom',
          record: {
            id: 555,
          },
          id: 'addEditRecord',
        }}
        rowKey="id"
        value={defaultData}
      />,
    );
    await waitForWaitTime(1000);

    await act(async () => {
      (await wrapper.queryByText('添加一行数据'))?.click();
    });

    await waitForWaitTime(1000);

    expect(fn).toHaveBeenCalledWith(555);

    wrapper.unmount();
  });

  it('📝 EditableProTable addEditRecord is null will throw Error', async () => {
    const spy = vi.spyOn(global.console, 'warn');
    const actionRef = React.createRef<ActionType>();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        actionRef={actionRef}
        columns={columns}
        pagination={{
          pageSize: 2,
          current: 2,
        }}
        rowKey="id"
        value={defaultData}
      />,
    );
    await waitForWaitTime(1000);

    try {
      //@ts-ignore
      actionRef.current?.addEditRecord(undefined);
    } catch (error) {
      expect((error as any).message).toEqual('请设置 recordCreatorProps.record 并返回一个唯一的key');
    }
    await waitForWaitTime(1000);
    spy.mockRestore();
    wrapper.unmount();
  });

  it('📝 EditableProTable saveEditable should save and quit editing', async () => {
    const actionRef = React.createRef<ActionType>();
    let changedDataSource: DataSourceType[] = [];

    const onChange = vi.fn((value) => {
      changedDataSource = value;
    });
    const wrapper = render(
      <ProForm
        initialValues={{
          table: defaultData,
        }}
      >
        <div>render</div>
        <EditableProTable<DataSourceType>
          actionRef={actionRef}
          columns={columns}
          name="table"
          rowKey="id"
          onChange={onChange}
        />
      </ProForm>,
    );

    await wrapper.findByText('render');

    await waitFor(() => {
      expect(wrapper.container.querySelector('.ant-table-tbody')?.querySelectorAll('tr.ant-table-row').length).toBe(
        defaultData.length,
      );
    });

    const editAndChange = async (inputValue: string) => {
      act(() => {
        wrapper.container.querySelector<HTMLButtonElement>('#editor')?.click();
      });

      act(() => {
        fireEvent.change(wrapper.container.querySelectorAll(`.ant-form-item-control-input input`)[1], {
          target: {
            value: inputValue,
          },
        });
      });
      await act(() => vi.runOnlyPendingTimers());

      await wrapper.findAllByDisplayValue(inputValue);
    };
    await editAndChange('');
    // should block saving when there is validation error
    await act(() => {
      return actionRef.current?.saveEditable(624748504);
    });
    // should exist validation error

    await act(() => vi.runOnlyPendingTimers());

    await waitFor(() => {
      expect(
        wrapper.container.querySelectorAll('.ant-table-tbody')[0].querySelectorAll('.ant-form-item-has-error').length,
      ).toBe(0);
    });
    await waitFor(() => {
      expect(wrapper.container.querySelectorAll('.ant-table-tbody')[0].querySelectorAll('input').length).toBe(4);
    });
    await waitFor(() => {
      expect(onChange).not.toHaveBeenCalled();
    });
    editAndChange('test value');
    // save with recordKey

    await act(() => {
      return actionRef.current?.saveEditable(624748504);
    });

    await act(() => vi.runOnlyPendingTimers());

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(changedDataSource).toHaveLength(defaultData.length);
    });
    await waitFor(() => {
      expect(changedDataSource[0]?.title).toBe('test value');
    });
    await editAndChange('test value2');
    // save with array index, if name is set
    await act(() => {
      return actionRef.current?.saveEditable(0);
    });

    await act(() => vi.runOnlyPendingTimers());

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(changedDataSource).toHaveLength(defaultData.length);
    });
    await waitFor(() => {
      expect(changedDataSource[0]?.title).toBe('test value2');
    });

    wrapper.unmount();
  });

  it('📝 EditableProTable add support children column', async () => {
    const onchange = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        columns={columns}
        editable={{}}
        pagination={{
          pageSize: 2,
          current: 2,
        }}
        recordCreatorProps={{
          position: 'bottom',
          newRecordType: 'dataSource',
          parentKey: () => 624674790,
          record: {
            id: 555,
          },
          id: 'addEditRecord',
        }}
        rowKey="id"
        value={[
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
              },
            ],
          },
        ]}
        onChange={(data) => onchange(data[0].children?.length)}
      />,
    );
    await waitForWaitTime(1000);

    await act(async () => {
      (await wrapper.queryByText('添加一行数据'))?.click();
    });

    await waitForWaitTime(1000);

    expect(onchange).toHaveBeenCalledWith(2);

    wrapper.unmount();
  });

  it('📝 EditableProTable add support nested children column', async () => {
    const onchange = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        columns={columns}
        editable={{}}
        expandable={{
          childrenColumnName: 'children',
        }}
        pagination={{
          pageSize: 2,
          current: 2,
        }}
        recordCreatorProps={{
          position: 'top',
          newRecordType: 'dataSource',
          parentKey: () => 6246747901,
          record: {
            id: 555,
          },
          id: 'addEditRecord',
        }}
        rowKey="id"
        value={[
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
              },
            ],
          },
        ]}
        onChange={(data) => {
          onchange(data[0].children![0]!.children!.length);
        }}
      />,
    );
    await waitForWaitTime(1000);

    await act(async () => {
      (await wrapper.queryAllByText('添加一行数据')).at(0)?.click();
    });

    await waitForWaitTime(1000);

    expect(onchange).toHaveBeenCalledWith(1);

    wrapper.unmount();
  });

  it("📝 EditableProTable can't find record by parentKey", async () => {
    const onchange = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        columns={columns}
        editable={{}}
        expandable={{
          childrenColumnName: 'children',
        }}
        pagination={{
          pageSize: 2,
          current: 2,
        }}
        recordCreatorProps={{
          position: 'bottom',
          newRecordType: 'dataSource',
          parentKey: () => 624671234,
          record: {
            id: 555,
          },
          id: 'addEditRecord',
        }}
        rowKey="id"
        value={[
          {
            id: 624674790,
            title: '点击添加按钮，但是和我的parentKey不同，会报错的！',
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
              },
            ],
          },
        ]}
        onChange={(data) => onchange(data[0].children?.length)}
      />,
    );
    await waitForWaitTime(1000);

    await act(async () => {
      (await wrapper.queryByText('添加一行数据'))?.click();
    });

    await waitForWaitTime(1000);

    expect(onchange).not.toHaveBeenCalled();

    wrapper.unmount();
  });

  it('📝 EditableProTable add support parentKey when newRecordType = cache', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        columns={columns}
        defaultValue={defaultData}
        expandable={{
          defaultExpandAllRows: true,
        }}
        recordCreatorProps={{
          newRecordType: 'cache',
          record: () => ({
            id: 555,
          }),
          parentKey: () => 624748504,
          id: 'add_new',
        }}
        rowKey="id"
        onChange={(list) => fn(list.length)}
      />,
    );
    await waitForWaitTime(1000);

    await act(async () => {
      (await wrapper.queryByText('添加一行数据'))?.click();
    });

    await waitForWaitTime(1200);

    expect(fn).not.toHaveBeenCalled();
    act(() => {
      fireEvent.change(
        wrapper.container.querySelectorAll('.ant-table-tbody tr.ant-table-row')[1].querySelectorAll(`td .ant-input`)[0],
        {
          target: {
            value: 'zqran',
          },
        },
      );
    });

    await waitForWaitTime(1000);

    expect(
      wrapper.container.querySelectorAll('.ant-table-tbody tr.ant-table-row')[1].querySelectorAll('input'),
    ).toBeTruthy();
    expect(wrapper.container.querySelector('.ant-table-tbody')?.querySelectorAll('tr.ant-table-row').length).toBe(6);

    act(() => {
      wrapper.container
        .querySelectorAll('.ant-table-tbody tr.ant-table-row')[1]
        .querySelectorAll<HTMLAnchorElement>(`td a`)[0]
        ?.click?.();
    });

    await waitForWaitTime(1000);

    expect(wrapper.container.querySelectorAll('.ant-table-row.ant-table-row-level-1').length).toBe(2);

    wrapper.unmount();
  });

  it('📝 EditableProTable support maxLength', async () => {
    const wrapper = render(
      <EditableProTable<DataSourceType> columns={columns} maxLength={2} rowKey="id" value={defaultData} />,
    );
    await waitForWaitTime(100);
    expect(wrapper.container.querySelectorAll('button.ant-btn-dashed').length).toBe(0);

    act(() => {
      wrapper.rerender(
        <EditableProTable<DataSourceType> columns={columns} maxLength={20} rowKey="id" value={defaultData} />,
      );
    });

    await waitForWaitTime(100);

    expect(wrapper.container.querySelectorAll('button.ant-btn-dashed').length).toBe(1);
  });

  it('📝 EditableProTable support editableFormRef', async () => {
    const editorRef = React.createRef<EditableFormInstance<DataSourceType>>();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        columns={columns}
        editable={{
          editableKeys: defaultData.map((item) => item.id),
        }}
        editableFormRef={editorRef}
        rowKey="id"
        value={defaultData}
      />,
    );
    await waitForWaitTime(100);

    const firstRowKey = defaultData[0]?.id || 0;

    expect(editorRef.current?.getRowData?.(firstRowKey)?.title).toBe(defaultData?.[0]?.title);

    expect(editorRef.current?.getRowData?.(0)?.title).toBe(defaultData?.[0]?.title);

    await waitForWaitTime(100);

    act(() => {
      editorRef.current?.setRowData?.(firstRowKey, { title: 'test-title' });
    });

    expect(editorRef.current?.getRowData?.(firstRowKey)?.title).toBe('test-title');

    expect(editorRef.current?.getRowsData?.()?.length).toBe(3);

    wrapper.unmount();
  });

  it('📝 EditableProTable editableFormRef need rowIndex', async () => {
    const editorRef = React.createRef<EditableFormInstance<DataSourceType>>();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        columns={columns}
        editable={{
          editableKeys: defaultData.map((item) => item.id),
        }}
        editableFormRef={editorRef}
        rowKey="id"
        value={defaultData}
      />,
    );
    await waitForWaitTime(100);

    try {
      //@ts-expect-error
      editorRef.current?.getRowData?.();
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe('rowIndex is required');
    }

    try {
      //@ts-expect-error
      editorRef.current?.setRowData?.(undefined, { title: 'test-title' });
    } catch (error) {
      // @ts-ignore
      expect(error.message).toBe('rowIndex is required');
    }

    wrapper.unmount();
  });

  it('📝 EditableProTable use name support editableFormRef', async () => {
    const editorRef = React.createRef<EditableFormInstance<DataSourceType>>();
    const wrapper = render(
      <ProForm
        initialValues={{
          table: defaultData,
        }}
      >
        <EditableProTable<DataSourceType> columns={columns} editableFormRef={editorRef} name="table" rowKey="id" />
        <ProFormText name="test" />
      </ProForm>,
    );

    const firstRowKey = defaultData?.[0]?.id || 0;

    expect(editorRef.current?.getRowData?.(firstRowKey)?.title).toBe(defaultData?.[0]?.title);

    expect(editorRef.current?.getRowData?.(0)?.title).toBe(defaultData?.[0]?.title);

    act(() => {
      editorRef.current?.setRowData?.(firstRowKey, { title: 'test-title' });
    });

    expect(editorRef.current?.getRowData?.(firstRowKey)?.title).toBe('test-title');

    expect(editorRef.current?.getRowsData?.()?.length).toBe(3);

    wrapper.unmount();
  });

  it('📝 EditableProTable add newLine use rowKey', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <ProForm
        initialValues={{
          table: defaultData,
        }}
      >
        <EditableProTable<DataSourceType>
          columns={columns}
          editable={{
            onChange: (keys) => {
              fn(keys.join(','));
            },
          }}
          name="table"
          recordCreatorProps={{
            id: 'new-button',
            record: () => ({ id: '1234' }),
          }}
          rowKey="id"
        />
      </ProForm>,
    );

    await act(async () => {
      (await wrapper.queryByText('添加一行数据'))?.click();
    });

    await waitForWaitTime(200);

    expect(fn).toHaveBeenCalledWith('1234');
  });

  it('📝 EditableProTable add newLine when position=top', async () => {
    const wrapper = render(
      <ProForm
        initialValues={{
          table: defaultData,
        }}
      >
        <EditableProTable<DataSourceType>
          columns={columns}
          name="table"
          recordCreatorProps={{
            id: 'new-button',
            record: () => ({ id: Math.random() * 100000000 }),
            position: 'top',
          }}
          rowKey="id"
        />
      </ProForm>,
    );

    await act(async () => {
      (await wrapper.queryAllByText('添加一行数据')).at(0)?.click();
    });

    await act(async () => {
      (await wrapper.queryAllByText('添加一行数据')).at(0)?.click();
    });
    await waitForWaitTime(200);

    const firstLineValue = wrapper.container
      .querySelectorAll('.ant-table-tbody tr.ant-table-row')[0]
      .querySelectorAll<HTMLInputElement>(`td .ant-input`)[0].value;

    expect(firstLineValue).toBe('');

    wrapper.unmount();
  });

  it('📝 EditableProTable support actionRender', async () => {
    const wrapper = render(
      <EditableProTable<DataSourceType>
        columns={columns}
        editable={{
          editableKeys: [624748504],
          actionRender: () => [
            <div key="test" id="test">
              xx
            </div>,
          ],
        }}
        recordCreatorProps={false}
        request={async () => ({
          data: defaultData,
          total: 3,
          success: true,
        })}
        rowKey="id"
        value={defaultData}
      />,
    );
    await waitForWaitTime(1200);
    expect(wrapper.container.querySelector('div#test')?.textContent).toBe('xx');
  });

  it('📝 EditableProTable support recordCreatorProps', async () => {
    const wrapper = render(
      <EditableProTable<DataSourceType>
        columns={columns}
        recordCreatorProps={{
          creatorButtonText: '测试添加数据',
          record: { id: 9999 },
        }}
        rowKey="id"
        value={defaultData}
      />,
    );
    await waitForWaitTime(1200);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('📝 EditableProTable support controlled', async () => {
    const onChange = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        controlled
        columns={columns}
        editable={{
          editableKeys: ['624748504'],
        }}
        recordCreatorProps={{
          creatorButtonText: '测试添加数据',
          record: { id: 9999 },
        }}
        rowKey={(row) => row.id}
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
        onChange={onChange}
      />,
    );
    await waitForWaitTime(1200);
    expect(wrapper.container.querySelectorAll<HTMLInputElement>('.ant-form-item-control-input input')[1].value).toBe(
      '🐛 [BUG]yarn install命令 antd2.4.5会报错',
    );

    act(() => {
      wrapper.rerender(
        <EditableProTable<DataSourceType>
          controlled
          columns={columns}
          editable={{
            editableKeys: ['624748504'],
          }}
          recordCreatorProps={{
            creatorButtonText: '测试添加数据',
            record: { id: 9999 },
          }}
          rowKey={(row) => row.id}
          value={[
            {
              id: '624748504',
              title: '🐛 [BUG]无法创建工程npm create umi',
              labels: [{ name: 'bug', color: 'error' }],
              time: {
                created_at: 1590486176000,
              },
              state: 'processing',
            },
          ]}
          onChange={onChange}
        />,
      );
    });

    await waitForWaitTime(100);
    expect(wrapper.container.querySelectorAll<HTMLInputElement>('.ant-form-item-control-input input')[1].value).toBe(
      '🐛 [BUG]无法创建工程npm create umi',
    );
  });

  it('📝 EditableProTable support nested children column without config "childrenColumnName:children" and "position:top"', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        columns={columns}
        editable={{
          onChange: (keys) => fn(keys[0]),
        }}
        pagination={{
          pageSize: 2,
          current: 2,
        }}
        recordCreatorProps={{
          parentKey: () => 6246747901,
          record: {
            id: 555,
          },
          id: 'addEditRecord',
        }}
        rowKey="id"
        value={[
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
              },
            ],
          },
        ]}
      />,
    );
    await waitForWaitTime(1000);

    await act(async () => {
      (await wrapper.queryAllByText('添加一行数据')).at(0)?.click();
    });

    await waitForWaitTime(1000);

    expect(fn).toHaveBeenCalledWith(555);

    wrapper.unmount();
  });

  it('📝 EditableProTable add new child line when position = top', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        columns={columns}
        editable={{
          onChange: (keys) => fn(keys[0]),
        }}
        expandable={{
          defaultExpandAllRows: true,
        }}
        pagination={{
          pageSize: 2,
          current: 2,
        }}
        recordCreatorProps={{
          parentKey: () => 624674790,
          position: 'top',
          record: {
            id: 555,
          },
          id: 'addEditRecord',
        }}
        rowKey="id"
        value={[
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
              },
            ],
          },
        ]}
      />,
    );
    await waitForWaitTime(1000);

    await act(async () => {
      (await wrapper.queryAllByText('添加一行数据')).at(0)?.click();
    });

    await waitForWaitTime(1000);

    expect(fn).toHaveBeenCalledWith(555);

    const { dataset } = wrapper.container.querySelectorAll('.ant-table-tbody tr.ant-table-row')[1] as HTMLElement;

    expect(dataset.rowKey).toBe('555');

    wrapper.unmount();
  });

  it('📝 EditableProTable add new child line when position <> top', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        columns={columns}
        editable={{
          onChange: (keys) => fn(keys[0]),
        }}
        expandable={{
          defaultExpandAllRows: true,
        }}
        pagination={{
          pageSize: 2,
          current: 2,
        }}
        recordCreatorProps={{
          parentKey: () => 624674790,
          record: {
            id: 555,
          },
          id: 'addEditRecord',
        }}
        rowKey="id"
        value={[
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
              },
            ],
          },
        ]}
      />,
    );
    await waitForWaitTime(1000);

    await act(async () => {
      (await wrapper.queryAllByText('添加一行数据')).at(0)?.click();
    });

    await waitForWaitTime(1000);

    expect(fn).toHaveBeenCalledWith(555);

    const { dataset } = wrapper.container.querySelectorAll('.ant-table-tbody tr.ant-table-row')[2] as HTMLElement;

    expect(dataset.rowKey).toBe('555');

    wrapper.unmount();
  });

  it('📝 EditableProTable onValuesChange will not trigger when init', async () => {
    const valuesChangeFn = vi.fn();
    const wrapper = render(
      <ProForm<{
        table: DataSourceType[];
      }>
        initialValues={{
          table: defaultData,
        }}
        validateTrigger="onBlur"
      >
        <EditableProTable<DataSourceType>
          columns={columns}
          editable={{
            type: 'multiple',
            onValuesChange: (values) => {
              valuesChangeFn(values.title);
            },
          }}
          headerTitle="可编辑表格"
          maxLength={5}
          name="table"
          rowKey="id"
          scroll={{
            x: 960,
          }}
        />
      </ProForm>,
    );

    await waitForWaitTime(300);

    await waitFor(() => {
      expect(valuesChangeFn).not.toHaveBeenCalled();
    });

    await act(async () => {
      (await wrapper.queryAllByText('编辑')).at(0)?.click();
    });
    await waitForWaitTime(1200);

    act(() => {
      fireEvent.change(
        wrapper.container.querySelectorAll('.ant-table-tbody tr.ant-table-row')[0].querySelectorAll(`td .ant-input`)[0],
        {
          target: {
            value: 'test',
          },
        },
      );
    });
    expect(valuesChangeFn).toHaveBeenCalledTimes(1);
    expect(valuesChangeFn).toHaveBeenCalledWith('test');
  });

  it('📝 EditableProTable add new child line when position is top and tree level > 1 and parent has children', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        columns={columns}
        defaultExpandAllRows={true}
        editable={{
          onChange: (keys) => fn(keys[0]),
        }}
        recordCreatorProps={{
          parentKey: () => 6246747901,
          position: 'top',
          record: {
            id: 555,
          },
          id: 'addEditRecord',
        }}
        rowKey="id"
        value={[
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
                    id: 62467479011,
                    title: '嵌套数据的编辑1',
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
        ]}
      />,
    );
    await waitForWaitTime(1000);

    await act(async () => {
      (await wrapper.queryAllByText('添加一行数据')).at(0)?.click();
    });

    await waitForWaitTime(1000);

    expect(fn).toHaveBeenCalledWith(555);

    const { dataset } = wrapper.container.querySelectorAll('.ant-table-tbody tr.ant-table-row')[2] as HTMLElement;

    expect(dataset.rowKey).toBe('555');
    wrapper.unmount();
  });

  it('📝 EditableProTable add new child line when position is top and tree level > 1 and parent has no children', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        columns={columns}
        defaultExpandAllRows={true}
        editable={{
          onChange: (keys) => fn(keys[0]),
        }}
        recordCreatorProps={{
          parentKey: () => 6246747901,
          position: 'top',
          record: {
            id: 555,
          },
          id: 'addEditRecord',
        }}
        rowKey="id"
        value={[
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
              },
            ],
          },
        ]}
      />,
    );
    await waitForWaitTime(1000);

    await act(async () => {
      (await wrapper.queryAllByText('添加一行数据')).at(0)?.click();
    });

    await waitForWaitTime(1000);

    expect(fn).toHaveBeenCalledWith(555);

    const { dataset } = wrapper.container.querySelectorAll('.ant-table-tbody tr.ant-table-row')[2] as HTMLElement;

    expect(dataset.rowKey).toBe('555');
    wrapper.unmount();
  });

  it('📝 EditableProTable add new child line when position <> top and tree level > 1 and parent has children', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        columns={columns}
        defaultExpandAllRows={true}
        editable={{
          onChange: (keys) => fn(keys[0]),
        }}
        recordCreatorProps={{
          parentKey: () => 6246747901,
          record: {
            id: 555,
          },
          id: 'addEditRecord',
        }}
        rowKey="id"
        value={[
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
                    id: 62467479011,
                    title: '嵌套数据的编辑1',
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
        ]}
      />,
    );
    await waitForWaitTime(1000);

    await act(async () => {
      (await wrapper.queryAllByText('添加一行数据')).at(0)?.click();
    });

    await waitForWaitTime(1000);

    expect(fn).toHaveBeenCalledWith(555);

    const { dataset } = wrapper.container.querySelectorAll('.ant-table-tbody tr.ant-table-row')[3] as HTMLElement;

    expect(dataset.rowKey).toBe('555');
    wrapper.unmount();
  });

  it('📝 EditableProTable add new child line when position <> top and tree level > 1 and parent has no children', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <EditableProTable<DataSourceType>
        columns={columns}
        defaultExpandAllRows={true}
        editable={{
          onChange: (keys) => fn(keys[0]),
        }}
        recordCreatorProps={{
          parentKey: () => 6246747901,
          record: {
            id: 555,
          },
          id: 'addEditRecord',
        }}
        rowKey="id"
        value={[
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
              },
            ],
          },
        ]}
      />,
    );
    await waitForWaitTime(1000);

    await act(async () => {
      (await wrapper.queryAllByText('添加一行数据')).at(0)?.click();
    });

    await waitForWaitTime(1000);

    expect(fn).toHaveBeenCalledWith(555);

    const { dataset } = wrapper.container.querySelectorAll('.ant-table-tbody tr.ant-table-row')[2] as HTMLElement;

    expect(dataset.rowKey).toBe('555');
    wrapper.unmount();
  });

  it('📝 EditableProTable add new nested child line with Random Condition', async () => {
    const nodeTpl: DataSourceType = {
      id: 'A',
      title: '🧐 [问题] build 后还存在 es6 的代码（Umi@2.13.13）',
      labels: [{ name: 'question', color: 'success' }],
      state: 'open',
      time: {
        created_at: 1590479665000,
      },
    };
    const fn = vi.fn();
    const testFn = async () => {
      const depth = crypto.randomInt(2, 10);
      const topOrBottom = crypto.randomInt(100) > 50 ? 'top' : 'bottom';
      const hasChildren = crypto.randomInt(100) > 50;
      const node = Object.assign({}, nodeTpl);
      let parent = node;

      for (let i = 1; i < depth; i++) {
        const child = Object.assign({}, nodeTpl, { id: `${parent.id}-${i}` });
        parent.children = [child];
        parent = child;
      }
      if (hasChildren) {
        const child = Object.assign({}, nodeTpl, {
          id: `${parent.id}-placeholder`,
        });
        parent.children = [child];
      }
      const recordId = `${parent.id}-${depth}`;

      console.log(`当前测试参数, Tree层级: ${depth}, 方向: ${topOrBottom}, 目标父节点是否已有子元素: ${hasChildren}`);

      const wrapper = render(
        <EditableProTable<DataSourceType>
          columns={columns}
          editable={{
            onChange: (keys) => fn(keys[0]),
          }}
          expandable={{ defaultExpandAllRows: true }}
          recordCreatorProps={{
            parentKey: () => parent.id,
            position: topOrBottom,
            record: {
              id: recordId,
            },
            id: 'addEditRecord',
          }}
          rowKey="id"
          value={[node]}
        />,
      );
      await waitForWaitTime(1000);
      await act(async () => {
        (await wrapper.queryAllByText('添加一行数据')).at(0)?.click();
      });
      await waitForWaitTime(1000);

      expect(fn).toHaveBeenCalledWith(recordId);
      const trDoms = wrapper.container.querySelectorAll('.ant-table-tbody tr.ant-table-row');
      expect(trDoms.length).toBe((hasChildren ? depth + 1 : depth) + 1);
      const index = topOrBottom !== 'top' && hasChildren ? depth + 1 : depth;
      const { dataset } = trDoms[index] as HTMLElement;
      expect(dataset.rowKey).toBe(recordId);
      wrapper.unmount();
    };

    for (let i = 0; i < 5; i++) {
      await testFn();
    }
  });
});
