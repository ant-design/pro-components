import { mount } from 'enzyme';
import React, { useContext } from 'react';
import ProProvider from '@ant-design/pro-provider';
import ProTable from '@ant-design/pro-table';
import { act } from 'react-dom/test-utils';
import { Input } from 'antd';

import { waitForComponentToPaint } from '../util';

const Demo = () => {
  const values = useContext(ProProvider);
  return (
    <ProProvider.Provider
      value={{
        ...values,
        valueTypeMap: {
          link: {
            render: (text) => <a>{text}</a>,
            renderFormItem: (text, props) => (
              <Input placeholder="请输入链接" {...props?.fieldProps} />
            ),
          },
        },
      }}
    >
      <ProTable<any, Record<string, any>, 'link' | 'tags'>
        columns={[
          {
            title: '链接',
            dataIndex: 'name',
            valueType: 'link',
          },
        ]}
        request={() => {
          return Promise.resolve({
            total: 200,
            data: [
              {
                key: 1,
                name: 'test',
              },
            ],
            success: true,
          });
        }}
        rowKey="key"
      />
    </ProProvider.Provider>
  );
};

describe('Table valueEnum', () => {
  it('🎏 dynamic enum test', async () => {
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: '状态',
            dataIndex: 'status',
            valueEnum: {},
            fieldProps: {
              open: true,
            },
          },
        ]}
        request={async () => ({
          data: [
            {
              status: 2,
              key: '1',
            },
          ],
        })}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);

    act(() => {
      html.setProps({
        columns: [
          {
            title: '状态',
            dataIndex: 'status',
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing', disabled: true },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            },
            fieldProps: {
              open: true,
            },
          },
        ],
      });
    });
    await waitForComponentToPaint(html, 200);
    act(() => {
      html.find('form.ant-form div.ant-select').simulate('click');
    });
    act(() => {
      expect(html.find('div.ant-select-dropdown').render()).toMatchSnapshot();
    });
    expect(html.find('td.ant-table-cell').text()).toBe('已上线');
  });

  it('🎏 customization valueType', async () => {
    const html = mount(<Demo />);
    await waitForComponentToPaint(html, 1200);
    act(() => {
      expect(html.render()).toMatchSnapshot();
    });
  });
});
