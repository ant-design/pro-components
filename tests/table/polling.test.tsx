import { mount } from 'enzyme';
import React from 'react';
import ProTable from '@ant-design/pro-table';

import { waitForComponentToPaint } from '../util';

describe('Table polling', () => {
  it('function', async () => {
    const onRequest = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        polling={() => 1000}
        request={async () => {
          onRequest();
          return { data: [] };
        }}
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
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1500);

    expect(onRequest).toHaveBeenCalledTimes(2);
  });
});
