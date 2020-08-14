import { mount } from 'enzyme';
import React from 'react';

import ProDescriptions from '@ant-design/pro-descriptions';
import { waitForComponentToPaint } from '../util';

describe('descriptions', () => {
  it('🥩 descriptions render valueEnum when data = 0', async () => {
    const html = mount(
      <ProDescriptions
        columns={[
          {
            dataIndex: 'status',
            title: '状态',
            valueEnum: {
              0: { text: '关闭', status: 'Default' },
              1: { text: '运行中', status: 'Processing' },
              2: { text: '已上线', status: 'Success' },
              3: { text: '异常', status: 'Error' },
            },
          },
        ]}
        request={async () => ({
          data: {
            status: 0,
          },
        })}
      />,
    );
    await waitForComponentToPaint(html, 200);
    expect(html.find('span.ant-badge-status-text').text()).toBe('关闭');
  });
});
