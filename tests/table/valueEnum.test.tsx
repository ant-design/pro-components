import { mount } from 'enzyme';
import React from 'react';
import ProTable from '@ant-design/pro-table';
import { act } from 'react-dom/test-utils';

import { waitForComponentToPaint } from '../util';

describe('Table valueEnum', () => {
  it('🎏 dynamic enum test', async () => {
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: '状态',
            dataIndex: 'status',
            hideInForm: true,
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
            },
          ],
        })}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);

    act(() => {
      html.setProps({
        columns: [
          {
            title: '状态',
            dataIndex: 'status',
            hideInForm: true,
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
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
    expect(html.find('div.ant-select-dropdown').render()).toMatchSnapshot();
    expect(html.find('td.ant-table-cell').text()).toBe('已上线');
  });
});
