import React, { useRef } from 'react';
import { InputNumber, Form } from 'antd';
import type { RowEditableConfig } from '@ant-design/pro-utils';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type {
  ProDescriptionsActionType,
  ProDescriptionsItemProps,
} from '@ant-design/pro-descriptions';
import Descriptions from '@ant-design/pro-descriptions';
import { mount, render } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint } from '../util';

type DataSourceType = {
  id: number;
  title?: string;
  labels?: {
    name: string;
    color: string;
  }[];
  state?: string;
  time?: {
    created_at?: string;
  };
  children?: DataSourceType;
};

const defaultData: DataSourceType = {
  id: 624748504,
  title: '🐛 [BUG]yarn install命令 antd2.4.5会报错',
  labels: [{ name: 'bug', color: 'error' }],
  time: {
    created_at: '2020-05-26T09:42:56Z',
  },
  state: 'processing',
};

const columns: ProDescriptionsItemProps<DataSourceType>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    renderFormItem: () => <InputNumber />,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
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
    valueType: 'date',
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
  const actionRef = useRef<ProDescriptionsActionType>();
  const [editableKeys, setEditorRowKeys] = useMergedState<React.Key[]>(
    () => props.defaultKeys || [],
    {
      value: props.editorRowKeys,
      onChange: props.onEditorChange,
    },
  );
  const [dataSource, setDataSource] = useMergedState<DataSourceType, DataSourceType>(
    props.dataSource as any,
    {
      value: props.dataSource,
      onChange: props.onDataSourceChange,
    },
  );
  return (
    <Descriptions<DataSourceType>
      columns={columns}
      actionRef={actionRef}
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
      dataSource={dataSource}
      onDataSourceChange={setDataSource}
      editable={{
        ...props,
        form,
        type: props.type,
        editableKeys,
        onSave: props.onSave,
        onChange: setEditorRowKeys,
      }}
    />
  );
};

describe('Descriptions', () => {
  it('📝 Descriptions close editable', async () => {
    const wrapper = mount(
      <Descriptions<DataSourceType> columns={columns} dataSource={defaultData} />,
    );
    await waitForComponentToPaint(wrapper, 100);
    expect(wrapper.find('ProForm').exists()).toBeFalsy();
  });

  it('📝 Descriptions support editable', async () => {
    const wrapper = mount(
      <Descriptions<DataSourceType> columns={columns} dataSource={defaultData} editable={{}} />,
    );
    await waitForComponentToPaint(wrapper, 100);
    expect(wrapper.find('ProForm').exists()).toBeTruthy();
  });

  it('📝 support onEditorChange', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DescriptionsDemo
        onEditorChange={(keys) => {
          fn(keys);
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('span.anticon-edit').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith(['title']);
  });

  it('📝 support set Form', async () => {
    const wrapper = mount(<DescriptionsDemo editorRowKeys={['title']} />);
    await waitForComponentToPaint(wrapper, 1000);

    act(() => {
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(0)
        .find(`.ant-input`)
        .simulate('change', {
          target: {
            value: 'test',
          },
        });
    });
    await waitForComponentToPaint(wrapper, 200);

    expect(
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(0)
        .find(`.ant-input`)
        .props().value,
    ).toBe('test');

    act(() => {
      wrapper.find('#reset_test').simulate('click');
    });
    await waitForComponentToPaint(wrapper, 200);

    expect(
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(0)
        .find(`.ant-input`)
        .props().value,
    ).toBe('🐛 [BUG]yarn install命令 antd2.4.5会报错');
  });

  it('📝 renderFormItem run defaultRender', async () => {
    const wrapper = render(
      <Descriptions<DataSourceType>
        editable={{
          editableKeys: ['title'],
        }}
        columns={[
          {
            dataIndex: 'title',
            renderFormItem: (item, config) => {
              return config.defaultRender(item);
            },
          },
        ]}
        dataSource={defaultData}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('📝 columns support editable test', async () => {
    const wrapper = render(
      <Descriptions
        editable={{
          editableKeys: ['title'],
        }}
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
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('📝 support actionRender', async () => {
    const wrapper = render(
      <Descriptions
        editable={{
          editableKeys: ['title'],
          actionRender: () => [
            <div key="test" id="test">
              xx
            </div>,
          ],
        }}
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
      />,
    );
    expect(wrapper.find('div#test').text()).toBe('xx');
  });

  it('📝 support editorRowKeys', async () => {
    const wrapper = mount(<DescriptionsDemo editorRowKeys={['title']} />);
    await waitForComponentToPaint(wrapper, 1000);
    // 第一行应该编辑态
    expect(
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(0)
        .find('input')
        .exists(),
    ).toBeTruthy();

    // 第二行不应该是编辑态
    expect(
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(1)
        .find('input')
        .exists(),
    ).toBeFalsy();
  });

  it('📝 support cancel click', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DescriptionsDemo
        onEditorChange={(keys) => {
          fn(keys);
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('span.anticon-edit').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 1000);
    expect(
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(0)
        .find('input')
        .exists(),
    ).toBeTruthy();

    act(() => {
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(0)
        .find(`span.anticon-close`)
        .simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(0)
        .find('input')
        .exists(),
    ).toBeFalsy();
  });

  it('📝 support cancel click render false', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DescriptionsDemo
        onEditorChange={(keys) => {
          fn(keys);
        }}
        onCancel={async () => false}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('span.anticon-edit').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 1000);
    expect(
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(0)
        .find('input')
        .exists(),
    ).toBeTruthy();

    act(() => {
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(0)
        .find(`span.anticon-close`)
        .simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(0)
        .find('input')
        .exists(),
    ).toBeFalsy();
  });

  it('📝 type=single, only edit one rows', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DescriptionsDemo
        defaultKeys={['state']}
        onEditorChange={(keys) => {
          fn(keys);
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('span.anticon-edit').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 1000);

    expect(fn).not.toBeCalled();
  });

  it('📝 type=multiple, edit multiple rows', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DescriptionsDemo
        type="multiple"
        defaultKeys={['state']}
        onEditorChange={(keys) => {
          fn(keys);
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('span.anticon-edit').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 1000);
    expect(fn).toBeCalledWith(['state', 'title']);
  });

  it('📝 support onSave', async () => {
    const fn = jest.fn();
    const wrapper = mount(<DescriptionsDemo onSave={(key) => fn(key)} />);
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('span.anticon-edit').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(1)
        .find('input')
        .exists(),
    ).toBeTruthy();

    act(() => {
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(1)
        .find(`span.anticon-check`)
        .simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(fn).toBeCalledWith('state');
  });

  it('📝 support onSave support false', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <DescriptionsDemo
        onSave={async (key) => {
          fn(key);
          return false;
        }}
      />,
    );
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('span.anticon-edit').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(1)
        .find('input')
        .exists(),
    ).toBeTruthy();

    act(() => {
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(1)
        .find(`span.anticon-check`)
        .simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(1)
        .find('input')
        .exists(),
    ).toBeTruthy();

    expect(fn).toBeCalledWith('state');
  });

  it('📝 support onCancel', async () => {
    const fn = jest.fn();
    const wrapper = mount(<DescriptionsDemo onCancel={(key) => fn(key)} />);
    await waitForComponentToPaint(wrapper, 1000);
    act(() => {
      wrapper.find('span.anticon-edit').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(1)
        .find('input')
        .exists(),
    ).toBeTruthy();

    act(() => {
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(1)
        .find(`span.anticon-close`)
        .simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(fn).toBeCalledWith('state');
  });

  it('📝 support form rules', async () => {
    const fn = jest.fn();
    const wrapper = mount(<DescriptionsDemo onSave={(key, row) => fn(row.title)} />);
    await waitForComponentToPaint(wrapper, 1000);

    act(() => {
      wrapper.find('span.anticon-edit').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);
    expect(
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(0)
        .find('input')
        .exists(),
    ).toBeTruthy();

    act(() => {
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(0)
        .find(`.ant-input`)
        .simulate('change', {
          target: {
            value: '',
          },
        });
    });
    act(() => {
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(0)
        .find(`span.anticon-check`)
        .simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    // 没有通过验证，不触发 onSave
    expect(fn).not.toBeCalled();

    act(() => {
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(0)
        .find(`input.ant-input`)
        .simulate('change', {
          target: {
            value: 'qixian',
          },
        });
    });

    act(() => {
      wrapper
        .find('td.ant-descriptions-item .ant-descriptions-item-content')
        .at(0)
        .find(`span.anticon-check`)
        .simulate('click');
    });

    await waitForComponentToPaint(wrapper, 200);

    expect(fn).toBeCalledWith('qixian');
  });
});
