import { mount } from 'enzyme';
import React from 'react';
import ProTable from '@ant-design/pro-table';
import { request } from './demo';
import { waitForComponentToPaint } from '../util';

describe('Table ColumnSetting', () => {
  it('🎏 render', async () => {
    const callBack = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            render: (text) => callBack(text),
          },
        ]}
        request={request}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);
    expect(callBack).toBeCalled();
    expect(callBack).toBeCalledWith('Edward King 0');
  });

  it('🎏 render text', async () => {
    const callBack = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            renderText: (text) => callBack(text),
          },
        ]}
        request={request}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);
    expect(callBack).toBeCalled();
    expect(callBack).toBeCalledWith('Edward King 0');
  });

  it('🎏 change text by renderText', async () => {
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            renderText: (text) => `${text}2144`,
          },
        ]}
        search={false}
        request={request}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 200);
    expect(html.find('td.ant-table-cell')).toMatchSnapshot();
  });
});
