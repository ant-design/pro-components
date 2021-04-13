import React from 'react';
import { mount, render } from 'enzyme';
import { BetaSchemaForm } from '@ant-design/pro-form';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import { waitForComponentToPaint } from '../util';
import { Input } from 'antd';

const columns: ProFormColumnsType<any>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 200,
  },
  {
    title: (_, type) => (type === 'table' ? '状态' : '列表状态'),
    dataIndex: 'state',
    initialValue: 'all',
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
    },
  },
  {
    title: '排序方式',
    key: 'direction',
    dataIndex: 'direction',
    valueType: 'select',
    valueEnum: {
      asc: '正序',
      desc: '倒序',
    },
  },
  {
    title: '创建时间',
    key: 'since',
    dataIndex: 'created_at',
    valueType: 'dateTime',
  },
  {
    title: 'option',
    valueType: 'option',
    dataIndex: 'id',
  },
];

describe('SchemaForm', () => {
  it('😊 SchemaForm support table', () => {
    const html = render(<BetaSchemaForm columns={columns} />);
    expect(html).toMatchSnapshot();
  });

  it('😊 SchemaForm support table columns', async () => {
    const html = mount(<BetaSchemaForm columns={columns} />);
    await waitForComponentToPaint(html);
    expect(html.find('div.ant-form-item').length).toBe(4);
  });

  it('😊 SchemaForm support render', async () => {
    const html = mount(
      <BetaSchemaForm
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            readonly: true,
            width: 200,
            render: () => {
              return <Input id="test" />;
            },
          },
        ]}
      />,
    );
    await waitForComponentToPaint(html);
    expect(html.find('#test').exists()).toBeTruthy();
  });

  it('😊 SchemaForm support render', async () => {
    const html = mount(
      <BetaSchemaForm
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            width: 200,
            renderFormItem: () => {
              return <Input id="test" />;
            },
          },
        ]}
      />,
    );
    await waitForComponentToPaint(html);
    expect(html.find('#test').exists()).toBeTruthy();
  });

  it('😊 SchemaForm support render', async () => {
    const html = mount(
      <BetaSchemaForm
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            width: 200,
            renderFormItem: (_, { defaultRender }) => {
              return defaultRender(_);
            },
          },
        ]}
      />,
    );
    await waitForComponentToPaint(html);
    expect(html.find('input').exists()).toBeTruthy();
  });
});
