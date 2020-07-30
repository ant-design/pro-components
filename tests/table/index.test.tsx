import { mount } from 'enzyme';
import React from 'react';
import { Input } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { columns, request } from './demo';

describe('BasicTable', () => {
  it('🎏 base use', () => {
    const html = mount(
      <ProTable
        size="small"
        columns={columns}
        request={request}
        rowKey="key"
        params={{ keyword: 'test' }}
        pagination={{
          defaultCurrent: 10,
        }}
        toolBarRender={() => [
          <Input.Search
            style={{
              width: 200,
            }}
          />,
          <TableDropdown.Button
            menus={[
              { key: 'copy', name: '复制' },
              { key: 'clear', name: '清空' },
            ]}
          >
            更多操作
          </TableDropdown.Button>,
        ]}
      />,
    );
    html.update();
    expect(html.render()).toMatchSnapshot();
  });

  it('🎏 do not render Search ', () => {
    const html = mount(
      <ProTable
        size="small"
        columns={columns}
        request={request}
        rowKey="key"
        search={false}
        params={{ keyword: 'test' }}
        pagination={{
          defaultCurrent: 10,
        }}
      />,
    );
    html.update();
    expect(html.render()).toMatchSnapshot();
  });

  it('🎏  do not render default option', () => {
    const html = mount(
      <ProTable
        size="small"
        options={{
          fullScreen: false,
          reload: false,
          setting: false,
        }}
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        request={request}
        rowKey="key"
      />,
    );
    html.update();
    expect(html.render()).toMatchSnapshot();
  });

  it('🎏  do not render setting', () => {
    const html = mount(
      <ProTable
        size="small"
        options={{
          fullScreen: true,
          reload: true,
          setting: false,
        }}
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        request={request}
        rowKey="key"
      />,
    );
    html.update();
    expect(html.render()).toMatchSnapshot();
  });
});
