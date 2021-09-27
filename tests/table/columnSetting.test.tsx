import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import ProTable from '@ant-design/pro-table';
import { columns } from './demo';
import { waitForComponentToPaint } from '../util';

describe('Table ColumnSetting', () => {
  it('🎏 columnSetting', async () => {
    const html = mount(
      <ProTable
        size="small"
        columns={columns}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html);

    act(() => {
      const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-setting');
      icon.simulate('click');
    });
    await waitForComponentToPaint(html);
    const overlay = html.find('.ant-pro-table-column-setting-overlay');
    expect(overlay.exists()).toBeTruthy();

    act(() => {
      const item = html.find('span.ant-pro-table-column-setting-list-item').first();
      item
        .find('.ant-pro-table-column-setting-list-item-option .anticon-vertical-align-top')
        .simulate('click');
    });
    await waitForComponentToPaint(html);

    const titleList = html.find(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(titleList.length).toBe(2);
  });

  it('🎏 columnSetting columnsStateMap props', async () => {
    const html = mount(
      <ProTable
        size="small"
        columnsStateMap={{
          index: { fixed: 'left' },
          Age: { show: false },
          option: { fixed: 'right' },
        }}
        columns={columns}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html);

    act(() => {
      const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-setting');
      icon.simulate('click');
    });
    await waitForComponentToPaint(html);
    let overlay = html.find(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(3);

    act(() => {
      html.setProps({
        columnsStateMap: {
          index: { fixed: 'left' },
        },
      });
    });
    await waitForComponentToPaint(html);
    overlay = html.find(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(2);
  });

  it('🎏 columnSetting columnsStateMap onChange', async () => {
    const callBack = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columnsStateMap={{
          index: { fixed: 'left' },
          Age: { show: false },
          option: { fixed: 'right' },
        }}
        onColumnsStateChange={callBack}
        columns={columns}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    await waitForComponentToPaint(html, 200);
    act(() => {
      const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-setting');
      icon.simulate('click');
    });
    await waitForComponentToPaint(html);

    const reset = html.find('.ant-pro-table-column-setting-title a');
    act(() => {
      reset.simulate('click');
    });
    await waitForComponentToPaint(html);

    expect(callBack).toBeCalled();
  });

  it('🎏 columnSetting columnsState.value props', async () => {
    const html = mount(
      <ProTable
        size="small"
        columnsState={{
          value: {
            index: { fixed: 'left' },
            Age: { show: false },
            option: { fixed: 'right' },
          },
        }}
        columns={columns}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html);

    act(() => {
      const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-setting');
      icon.simulate('click');
    });
    await waitForComponentToPaint(html);
    let overlay = html.find(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(3);

    act(() => {
      html.setProps({
        columnsState: {
          value: {
            index: { fixed: 'left' },
          },
        },
      });
    });
    await waitForComponentToPaint(html);
    overlay = html.find(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(2);

    // 触发重置
    act(() => {
      html.find('.ant-pro-table-column-setting-ation-rest-button').simulate('click');
    });
    await waitForComponentToPaint(html);
  });

  it('🎏 columnSetting columnsState.onChange', async () => {
    const callBack = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columnsState={{
          value: {
            index: { fixed: 'left' },
            Age: { show: false },
            option: { fixed: 'right' },
          },
          onChange: callBack,
        }}
        columns={columns}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    act(() => {
      const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-setting');
      icon.simulate('click');
    });
    await waitForComponentToPaint(html);
    const overlay = html.find(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(3);

    await waitForComponentToPaint(html, 200);
    act(() => {
      const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-setting');
      icon.simulate('click');
    });
    await waitForComponentToPaint(html);

    const reset = html.find('.ant-pro-table-column-setting-title a');
    act(() => {
      reset.simulate('click');
    });
    await waitForComponentToPaint(html);

    expect(callBack).toBeCalled();
  });

  it('🎏 columnSetting columnsState.persistenceKey', async () => {
    const callBack = jest.fn();

    window.localStorage.setItem(
      'test-keys',
      JSON.stringify({
        index: { fixed: 'left' },
        Age: { show: false },
        option: { fixed: 'right' },
      }),
    );
    const html = mount(
      <ProTable
        size="small"
        columnsState={{
          persistenceKey: 'test-keys',
          persistenceType: 'localStorage',
          onChange: callBack,
        }}
        columns={columns}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    await waitForComponentToPaint(html);

    act(() => {
      const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-setting');
      icon.simulate('click');
    });
    await waitForComponentToPaint(html);
    let overlay = html.find(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(3);

    act(() => {
      html.setProps({
        columnsState: {
          value: {
            index: { fixed: 'left' },
          },
        },
      });
    });
    await waitForComponentToPaint(html);
    overlay = html.find(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(2);
  });

  it('🎏 columnSetting columnsState.persistenceKey is error dom', async () => {
    const callBack = jest.fn();

    window.localStorage.setItem(
      'test-keys',
      '{"index":{"fixed":"left"},.["Age":{"show":false},"option":{"fixed":"right"}}',
    );

    const html = mount(
      <ProTable
        size="small"
        columnsState={{
          persistenceKey: 'test-keys',
          persistenceType: 'localStorage',
          onChange: callBack,
        }}
        columns={columns}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    await waitForComponentToPaint(html);

    act(() => {
      const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-setting');
      icon.simulate('click');
    });
    await waitForComponentToPaint(html);
    let overlay = html.find(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(0);

    act(() => {
      html.setProps({
        columnsState: {
          value: {
            index: { fixed: 'left' },
          },
        },
      });
    });
    await waitForComponentToPaint(html);
    overlay = html.find(
      '.ant-pro-table-column-setting-overlay .ant-pro-table-column-setting-list-title',
    );
    expect(overlay.length).toBe(2);
  });

  it('🎏 columnSetting select all', async () => {
    const callBack = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        onColumnsStateChange={() => {
          callBack();
        }}
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            copyable: true,
            children: [
              {
                title: 'Name2',
                key: 'name2',
                dataIndex: 'name2',
              },
              {
                title: 'Name3',
                key: 'name3',
                dataIndex: 'name3',
              },
            ],
          },
        ]}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                name2: `TradeCode ${1}`,
                name3: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    await waitForComponentToPaint(html, 200);
    act(() => {
      const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-setting');
      icon.simulate('click');
    });

    await waitForComponentToPaint(html, 200);

    act(() => {
      html
        .find('.ant-pro-table-column-setting-title .ant-checkbox-wrapper')
        .find('.ant-checkbox-input')
        .simulate('change', {
          target: {
            checked: false,
          },
        });
    });

    await waitForComponentToPaint(html, 200);

    expect(html.find('span.ant-checkbox.ant-checkbox-checked').length).toBe(0);

    act(() => {
      html
        .find('.ant-pro-table-column-setting-title .ant-checkbox-wrapper')
        .find('.ant-checkbox-input')
        .simulate('change', {
          target: {
            checked: true,
          },
        });
    });
    await waitForComponentToPaint(html);

    expect(
      html.find('span.ant-checkbox.ant-checkbox-checked').length +
        html.find('span.ant-tree-checkbox.ant-tree-checkbox-checked').length,
    ).toBe(2);

    expect(callBack).toBeCalled();
  });

  it('🎏 columnSetting select one', async () => {
    const callBack = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        onColumnsStateChange={() => {
          callBack();
        }}
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            copyable: true,
          },
        ]}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    await waitForComponentToPaint(html, 200);
    act(() => {
      const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-setting');
      icon.simulate('click');
    });

    await waitForComponentToPaint(html, 200);

    act(() => {
      html.find('.ant-pro-table-column-setting-list .ant-tree-checkbox').simulate('click');
    });

    await waitForComponentToPaint(html, 200);

    expect(html.find('span.ant-checkbox.ant-checkbox-checked').length).toBe(0);

    act(() => {
      html.find('.ant-pro-table-column-setting-list .ant-tree-checkbox').simulate('click');
    });
    await waitForComponentToPaint(html);

    expect(
      html.find('span.ant-checkbox.ant-checkbox-checked').length +
        html.find('span.ant-tree-checkbox.ant-tree-checkbox-checked').length,
    ).toBe(2);

    expect(callBack).toBeCalled();
  });

  it('🎏 columnSetting close checkable', async () => {
    const html = mount(
      <ProTable
        size="small"
        options={{
          setting: {
            draggable: false,
            checkable: false,
          },
        }}
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            copyable: true,
          },
          {
            title: 'Name2',
            key: 'name2',
            dataIndex: 'name2',
            copyable: true,
          },
        ]}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    await waitForComponentToPaint(html, 200);
    act(() => {
      const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-setting');
      icon.simulate('click');
    });

    await waitForComponentToPaint(html, 200);

    expect(html.find('span.ant-tree-checkbox.ant-tree-checkbox-checked').length).toBe(0);
  });

  it('🎏 columnSetting open checkable', async () => {
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            copyable: true,
          },
          {
            title: 'Name2',
            key: 'name2',
            dataIndex: 'name2',
            copyable: true,
          },
        ]}
        request={async () => {
          return {
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: 1602572994055,
              },
            ],
            success: true,
          };
        }}
        rowKey="key"
      />,
    );

    await waitForComponentToPaint(html, 200);
    act(() => {
      const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-setting');
      icon.simulate('click');
    });

    await waitForComponentToPaint(html, 500);

    expect(html.find('span.ant-tree-checkbox.ant-tree-checkbox-checked').length).toBe(2);

    html.find('.ant-tree-treenode > .ant-tree-node-content-wrapper').at(1).simulate('dragStart');
    html.find('.ant-tree-treenode > .ant-tree-node-content-wrapper').at(0).simulate('dragEnter');
    await waitForComponentToPaint(html, 1000);

    html.find('.ant-tree-treenode > .ant-tree-node-content-wrapper').at(0).simulate('drop');

    await waitForComponentToPaint(html, 1000);
  });

  it('🎏 columnSetting support hideInSetting', async () => {
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            copyable: true,
            hideInSetting: true,
          },
          {
            title: 'Name2',
            key: 'name2',
            dataIndex: 'name2',
            copyable: true,
          },
          {
            title: 'Name3',
            key: 'name3',
            dataIndex: 'name3',
            hideInTable: true,
          },
        ]}
        dataSource={[
          {
            key: 1,
            name: `TradeCode ${1}`,
            createdAt: 1602572994055,
          },
        ]}
        rowKey="key"
      />,
    );

    await waitForComponentToPaint(html, 200);
    act(() => {
      const icon = html.find('.ant-pro-table-list-toolbar-setting-item .anticon-setting');
      icon.simulate('click');
    });

    await waitForComponentToPaint(html, 1000);

    expect(html.find('.ant-tree-treenode').length).toBe(2);
  });
});
