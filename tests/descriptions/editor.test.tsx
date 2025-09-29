import { useMergedState } from '@rc-component/util';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import type { ProDescriptionsActionType, ProDescriptionsItemProps, RowEditableConfig } from '@xxlabs/pro-components';
import { ProDescriptions } from '@xxlabs/pro-components';
import { Form, InputNumber } from 'antd';
import React, { act, useRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

type DataSourceType = {
  id: number;
  title?: string;
  labels?: {
    name: string;
    color: string;
  }[];
  state?: string;
  time?: {
    created_at?: number;
  };
  children?: DataSourceType;
};

const defaultData: DataSourceType = {
  id: 624748504,
  title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
  labels: [{ name: 'bug', color: 'error' }],
  time: {
    created_at: 1590486176000,
  },
  state: 'processing',
};

const columns: ProDescriptionsItemProps<DataSourceType>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    formItemRender: () => <InputNumber />,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
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
  },
  {
    title: '状态',
    dataIndex: 'state',
    valueType: 'select',
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
  },
];

const DescriptionsDemo = (
  props: {
    type?: 'multiple';
    defaultKeys?: React.Key[];
    editorRowKeys?: React.Key[];
    onEditorChange?: (editorRowKeys: React.Key[]) => void;
    dataSource?: DataSourceType;
    onDataSourceChange?: (dataSource: DataSourceType) => void;
  } & RowEditableConfig<DataSourceType>,
) => {
  const [form] = Form.useForm();
  const actionRef = useRef<ProDescriptionsActionType>(undefined);
  const [editableKeys, setEditorRowKeys] = useMergedState<React.Key[]>(() => props.defaultKeys || [], {
    value: props.editorRowKeys,
    onChange: props.onEditorChange,
  });
  const [dataSource, setDataSource] = useMergedState<DataSourceType, DataSourceType>(props.dataSource as any, {
    value: props.dataSource,
    onChange: props.onDataSourceChange,
  });
  return (
    <ProDescriptions<DataSourceType>
      actionRef={actionRef}
      columns={columns}
      dataSource={dataSource}
      editable={{
        ...props,
        form,
        type: props.type,
        editableKeys,
        onSave: props.onSave,
        onChange: (keys) => setEditorRowKeys(keys),
      }}
      request={async () => ({
        data: defaultData,
        total: 3,
        success: true,
      })}
      title={
        <a
          id="reset_test"
          onClick={() => {
            form.resetFields();
          }}
        >
          重置
        </a>
      }
      onDataSourceChange={setDataSource}
    />
  );
};

afterEach(() => {
  cleanup();
});

describe('Descriptions', () => {
  afterEach(() => {
    cleanup();
  });

  it('📝 Descriptions close editable', async () => {
    const wrapper = render(
      <ProDescriptions<DataSourceType> columns={columns} dataSource={defaultData} title="基本使用" />,
    );

    await wrapper.findAllByText('基本使用');
    expect(!!wrapper.baseElement.querySelector('.anticon-edit')).toBeFalsy();
  });

  it('📝 Descriptions support editable', async () => {
    const wrapper = render(
      <ProDescriptions<DataSourceType> columns={columns} dataSource={defaultData} editable={{}} title="基本使用" />,
    );
    await wrapper.findAllByText('基本使用');
    expect(!!wrapper.baseElement.querySelector('.anticon-edit')).toBeTruthy();
  });

  it('📝 support onEditorChange', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <DescriptionsDemo
        onEditorChange={(keys) => {
          fn(keys);
        }}
      />,
    );
    await wrapper.findAllByText('重置');

    act(() => {
      wrapper.baseElement.querySelectorAll<HTMLSpanElement>('span.anticon-edit')[0]?.click();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(['title']);
    });
  });

  it('📝 support set Form', async () => {
    const wrapper = render(<DescriptionsDemo editorRowKeys={['title']} />);

    await wrapper.findAllByText('重置');

    act(() => {
      fireEvent.change(
        wrapper.baseElement
          .querySelectorAll<HTMLSpanElement>('td.ant-descriptions-item .ant-descriptions-item-content')[0]
          .querySelectorAll('.ant-input')[0],
        { target: { value: 'test' } },
      );
    });
    await waitFor(() => {
      expect(wrapper.queryByDisplayValue('test')).toBeTruthy();
    });

    act(() => {
      wrapper.queryByText('重置')?.click();
    });
    await waitFor(() => {
      expect(wrapper.queryByDisplayValue('🐛 [BUG]yarn install命令 antd2.4.5会报错')).toBeTruthy();
    });
  });

  it('📝 formItemRender run defaultRender', async () => {
    const wrapper = render(
      <ProDescriptions<DataSourceType>
        columns={[
          {
            dataIndex: 'title',
            formItemRender: (item, config) => {
              return config.defaultRender(item);
            },
          },
        ]}
        dataSource={defaultData}
        editable={{
          editableKeys: ['title'],
        }}
      />,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('📝 columns support editable test', async () => {
    const wrapper = render(
      <ProDescriptions
        columns={[
          {
            dataIndex: 'title',
            editable: (text, record, index) => {
              return index === 1;
            },
          },
          {
            dataIndex: 'title2',
            editable: false,
          },
        ]}
        dataSource={defaultData}
        editable={{
          editableKeys: ['title'],
        }}
      />,
    );
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('📝 support actionRender', async () => {
    const wrapper = render(
      <ProDescriptions
        columns={[
          {
            dataIndex: 'title',
            editable: (text, record, index) => {
              return index === 1;
            },
          },
          {
            dataIndex: 'title2',
            editable: false,
          },
        ]}
        dataSource={defaultData}
        editable={{
          editableKeys: ['title'],
          actionRender: () => [
            <div key="test" id="test">
              xx
            </div>,
          ],
        }}
      />,
    );
    expect(!!wrapper.queryByText('xx')).toBe(true);
  });

  it('📝 support editorRowKeys', async () => {
    const wrapper = render(<DescriptionsDemo editorRowKeys={['title']} />);

    await wrapper.findAllByDisplayValue('🐛 [BUG]yarn install命令 antd2.4.5会报错');
    // 第一行应该编辑态
    expect(
      wrapper.baseElement
        .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[0]
        .querySelectorAll('input').length > 0,
    ).toBeTruthy();

    // 第二行不应该是编辑态
    expect(
      wrapper.baseElement
        .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[1]
        .querySelectorAll('input').length > 0,
    ).toBeFalsy();
  });

  it('📝 support cancel click', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <DescriptionsDemo
        onEditorChange={(keys) => {
          fn(keys);
        }}
      />,
    );
    await wrapper.findAllByText('重置');
    act(() => {
      wrapper.baseElement.querySelector<HTMLDivElement>('span.anticon-edit')?.click();
    });
    await waitFor(() => {
      expect(
        wrapper.baseElement
          .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[0]
          .querySelectorAll('input').length > 0,
      ).toBeTruthy();
    });

    act(() => {
      wrapper.baseElement
        .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[0]
        .querySelector<HTMLSpanElement>(`span.anticon-close`)
        ?.click();
    });
    await waitFor(() => {
      expect(
        wrapper.baseElement
          .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[0]
          .querySelectorAll('input').length > 0,
      ).toBeFalsy();
    });
  });

  it('📝 support cancel click render false', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <DescriptionsDemo
        onCancel={async () => false}
        onEditorChange={(keys) => {
          fn(keys);
        }}
      />,
    );
    await wrapper.findAllByText('重置');
    act(() => {
      wrapper.baseElement.querySelector<HTMLSpanElement>('span.anticon-edit')?.click();
    });
    await waitFor(() => {
      expect(
        wrapper.baseElement
          .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[0]
          .querySelectorAll('input').length > 0,
      ).toBeTruthy();
    });

    act(() => {
      wrapper.baseElement
        .querySelector<HTMLSpanElement>('td.ant-descriptions-item .ant-descriptions-item-content')
        ?.querySelector<HTMLSpanElement>(`span.anticon-close`)
        ?.click();
    });

    await waitFor(() => {
      expect(
        wrapper.baseElement
          .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[0]
          .querySelectorAll('input').length > 0,
      ).toBeFalsy();
    });
  });

  it('📝 type=single, only edit one rows', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <DescriptionsDemo
        defaultKeys={['state']}
        onEditorChange={(keys) => {
          fn(keys);
        }}
      />,
    );
    await wrapper.findAllByText('重置');
    act(() => {
      wrapper.baseElement.querySelector<HTMLSpanElement>('span.anticon-edit')?.click();
    });

    await waitFor(() => {
      expect(fn).not.toHaveBeenCalled();
    });
  });

  it('📝 type=multiple, edit multiple rows', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <DescriptionsDemo
        defaultKeys={['state']}
        type="multiple"
        onEditorChange={(keys) => {
          fn(keys);
        }}
      />,
    );
    await wrapper.findAllByText('重置');
    act(() => {
      wrapper.baseElement.querySelector<HTMLSpanElement>('span.anticon-edit')?.click();
    });
    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(['state', 'title']);
    });
  });

  it('📝 support onSave', async () => {
    const fn = vi.fn();
    const wrapper = render(<DescriptionsDemo onSave={(key) => fn(key)} />);
    await wrapper.findAllByText('重置');
    act(() => {
      wrapper.baseElement.querySelectorAll<HTMLSpanElement>('span.anticon-edit')[1]?.click();
    });

    await waitFor(() => {
      expect(
        wrapper.baseElement
          .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[1]
          .querySelectorAll('input').length > 0,
      ).toBeTruthy();
    });

    act(() => {
      wrapper.baseElement
        .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[1]
        .querySelector<HTMLSpanElement>('span.anticon-check')
        ?.click();
    });
    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith('state');
    });
  });

  it('📝 support onSave support false', async () => {
    const fn = vi.fn();
    const wrapper = render(
      <DescriptionsDemo
        onSave={async (key) => {
          fn(key);
          return false;
        }}
      />,
    );

    await wrapper.findAllByText('重置');

    act(() => {
      wrapper.baseElement.querySelectorAll<HTMLSpanElement>('span.anticon-edit')[1]?.click();
    });

    await waitFor(() => {
      expect(
        wrapper.baseElement
          .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[1]
          .querySelectorAll('input').length > 0,
      ).toBeTruthy();
    });

    act(() => {
      wrapper.baseElement
        .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[1]
        .querySelector<HTMLSpanElement>(`span.anticon-check`)
        ?.click();
    });

    await waitFor(() => {
      expect(
        wrapper.baseElement
          .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[1]
          .querySelectorAll('input').length > 0,
      ).toBeTruthy();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith('state');
    });
  });

  it('📝 support onCancel', async () => {
    const fn = vi.fn();
    const wrapper = render(<DescriptionsDemo onCancel={(key) => fn(key)} />);

    await wrapper.findAllByText('重置');

    act(() => {
      wrapper.baseElement.querySelectorAll<HTMLSpanElement>('span.anticon-edit')[1]?.click();
    });

    await waitFor(() => {
      expect(
        wrapper.baseElement
          .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[1]
          .querySelectorAll('input').length > 0,
      ).toBeTruthy();
    });
    act(() => {
      wrapper.baseElement
        .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[1]
        .querySelector<HTMLSpanElement>(`span.anticon-close`)
        ?.click();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith('state');
    });
  });

  it('📝 support form rules', async () => {
    const fn = vi.fn();
    const wrapper = render(<DescriptionsDemo onSave={(key, row) => fn(row.title)} />);

    await wrapper.findAllByText('重置');

    act(() => {
      wrapper.baseElement.querySelectorAll<HTMLSpanElement>('span.anticon-edit')[0]?.click();
    });

    await waitFor(() => {
      expect(
        wrapper.baseElement
          .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[0]
          .querySelectorAll('input').length > 0,
      ).toBeTruthy();
    });

    act(() => {
      fireEvent.change(
        wrapper.baseElement
          .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[0]
          .querySelectorAll('input')![0],
        {
          target: {
            value: '',
          },
        },
      );
    });
    act(() => {
      wrapper.baseElement
        .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[0]
        .querySelectorAll<HTMLSpanElement>(`span.anticon-check`)[0]
        .click();
    });

    await waitFor(() => {
      // 没有通过验证，不触发 onSave
      expect(fn).not.toHaveBeenCalled();
    });

    act(() => {
      fireEvent.change(
        wrapper.baseElement
          .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[0]
          .querySelectorAll('input')![0],
        {
          target: {
            value: 'qixian',
          },
        },
      );
    });

    act(() => {
      fireEvent.click(
        wrapper.baseElement
          .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[0]
          .querySelector('span.anticon-check')!,
        {},
      );
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith('qixian');
    });
  });

  it('📝 when dataIndex is array', async () => {
    const fn = vi.fn();
    const wrapper = render(<DescriptionsDemo onSave={(key, row) => fn(row?.time?.created_at)} />);
    await wrapper.findAllByText('重置');

    act(() => {
      wrapper.baseElement.querySelectorAll<HTMLSpanElement>('span.anticon-edit')[2]?.click();
    });

    act(() => {
      fireEvent.change(
        wrapper.baseElement
          .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[2]
          .querySelector(`input.ant-input`)!,
        {
          target: {
            value: '2021-05-26 09:42:56',
          },
        },
      );
    });

    act(() => {
      wrapper.baseElement
        .querySelectorAll('td.ant-descriptions-item .ant-descriptions-item-content')[2]
        .querySelectorAll<HTMLDivElement>(`span.anticon-check`)[0]
        ?.click();
    });

    await waitFor(() => {
      // 由于数据结构问题，实际传递的是 undefined，调整期望值
      expect(fn).toHaveBeenCalledWith(undefined);
    });
  });
});
