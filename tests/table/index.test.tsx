import { mount, render } from 'enzyme';
import React, { useRef } from 'react';
import { Input, Button } from 'antd';
import { act } from 'react-dom/test-utils';
import type { ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { columns, request } from './demo';
import { waitForComponentToPaint, waitTime } from '../util';

describe('BasicTable', () => {
  const LINE_STR_COUNT = 20;
  // Mock offsetHeight
  // @ts-expect-error
  const originOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight',
  ).get;
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    get() {
      let html = this.innerHTML;
      html = html.replace(/<[^>]*>/g, '');
      const lines = Math.ceil(html.length / LINE_STR_COUNT);
      return lines * 16;
    },
  });

  // Mock getComputedStyle
  const originGetComputedStyle = window.getComputedStyle;
  window.getComputedStyle = (ele) => {
    const style = originGetComputedStyle(ele);
    style.lineHeight = '16px';
    return style;
  };

  beforeAll(() => {
    process.env.NODE_ENV = 'TEST';
  });

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get: originOffsetHeight,
    });
    window.getComputedStyle = originGetComputedStyle;
  });

  it('🎏 base use', async () => {
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
            key="search"
            style={{
              width: 200,
            }}
          />,
          <TableDropdown.Button
            key="copy"
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
    await waitForComponentToPaint(html, 2000);
    act(() => {
      expect(html.render()).toMatchSnapshot();
    });
  });

  it('🎏 do not render Search', async () => {
    const html = mount(
      <ProTable
        size="small"
        columns={columns}
        request={request}
        rowKey="key"
        rowSelection={{
          selectedRowKeys: ['1'],
        }}
        search={false}
        params={{ keyword: 'test' }}
        pagination={{
          defaultCurrent: 10,
        }}
      />,
    );

    await waitForComponentToPaint(html, 2000);
    expect(html.find('.ant-pro-table-search').exists()).toBeFalsy();
  });

  it('🎏 do not render default option', async () => {
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
    await waitForComponentToPaint(html, 1200);
    expect(
      html.find(
        '.ant-pro-table-list-toolbar-setting-items .ant-pro-table-list-toolbar-setting-item',
      ).length,
    ).toBe(1);
  });

  it('🎏 ProTable support searchText and resetText', async () => {
    const html = mount(
      <ProTable
        size="small"
        options={{
          fullScreen: false,
          reload: false,
          setting: false,
        }}
        form={{
          searchText: 'test',
          resetText: 'test2',
        }}
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        dataSource={[]}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);

    expect(html.find('.ant-btn.ant-btn-primary').text()).toBe('test');
    expect(html.find('.ant-btn').at(0).text()).toBe('test2');
  });

  it('🎏 ProTable support card props is false', async () => {
    const html = mount(
      <ProTable
        size="small"
        cardProps={false}
        toolBarRender={false}
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        dataSource={[]}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);

    expect(html.find('.ant-card').exists()).toBe(false);

    act(() => {
      html.setProps({
        cardProps: undefined,
      });
    });
    await waitForComponentToPaint(html, 1200);
    expect(html.find('.ant-card').exists()).toBe(true);
  });

  it('🎏 do not render setting', async () => {
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
    await waitForComponentToPaint(html, 1200);
    act(() => {
      expect(html.find('.anticon-setting').exists()).toBeFalsy();
    });
  });

  it('🎏 valueEnum support function', async () => {
    const html = mount(
      <ProTable
        size="small"
        options={false}
        columns={[
          {
            title: '状态',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: (row) => {
              if (row) {
                return {
                  0: { text: '1关闭', status: 'Default' },
                  1: { text: '1运行中', status: 'Processing' },
                  2: { text: '1已上线', status: 'Success' },
                  3: { text: '1异常', status: 'Error' },
                };
              }
              return {
                0: { text: '关闭', status: 'Default' },
                1: { text: '运行中', status: 'Processing' },
                2: { text: '已上线', status: 'Success' },
                3: { text: '异常', status: 'Error' },
              };
            },
          },
          {
            dataIndex: 'status',
            valueType: 'select',
            fieldProps: {
              open: true,
            },
            valueEnum: (row) => {
              if (!row) {
                return {
                  0: { text: '1关闭', status: 'Default' },
                  1: { text: '1运行中', status: 'Processing' },
                  2: { text: '1已上线', status: 'Success' },
                  3: { text: '1异常', status: 'Error' },
                };
              }
              return {
                0: { text: '关闭', status: 'Default' },
                1: { text: '运行中', status: 'Processing' },
                2: { text: '已上线', status: 'Success' },
                3: { text: '异常', status: 'Error' },
              };
            },
          },
        ]}
        request={request}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);
    act(() => {
      expect(html.render()).toMatchSnapshot();
    });
  });

  it('🎏 do not render pagination', async () => {
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
        pagination={false}
        request={async () => ({
          data: [
            {
              key: 'first',
            },
          ],
          success: true,
        })}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 600);
    expect(html.find('ul.ant-pagination').exists()).toBeFalsy();

    act(() => {
      html.setProps({
        pagination: undefined,
      });
    });

    await waitForComponentToPaint(html, 600);
    expect(html.find('ul.ant-pagination').exists()).toBeTruthy();
  });

  it('🎏 page error test', async () => {
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        request={async () => ({
          data: [],
          success: true,
        })}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 300);
    act(() => {
      html.find('ProTable').simulateError(new Error('test error'));
    });
    await waitForComponentToPaint(html, 10);
    let dom = null;
    act(() => {
      dom = html.render();
    });
    expect(dom).toMatchSnapshot();
  });

  it('🎏 request test', async () => {
    const fn = jest.fn();
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
        request={async () => {
          fn();
          return {
            data: [],
          };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);
    expect(fn).toBeCalled();
  });

  it('🎏 onLoadingChange test', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        onLoadingChange={fn}
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
        request={async () => {
          return {
            data: [],
          };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);
    expect(fn).toBeCalled();
  });

  it('🎏 reload request test', async () => {
    const fn = jest.fn();
    const Reload = () => {
      const actionRef = useRef<ActionType>();
      return (
        <ProTable
          actionRef={actionRef}
          toolBarRender={() => [
            <Button
              onClick={() => {
                actionRef.current?.reloadAndRest?.();
              }}
              key="reload"
              id="reload"
            >
              刷新
            </Button>,
            <Button
              onClick={() => {
                actionRef.current?.reset?.();
              }}
              key="reset"
              id="reset"
            >
              刷新
            </Button>,
          ]}
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
          request={async () => {
            fn();
            await waitTime(200);
            return {
              data: [],
            };
          }}
          rowKey="key"
        />
      );
    };
    const html = mount(<Reload />);

    await waitForComponentToPaint(html, 1200);

    act(() => {
      html.find('Button#reload').simulate('click');
    });

    act(() => {
      html.find('Button#reload').simulate('click');
    });

    await waitForComponentToPaint(html, 1200);

    // 因为有 loading 的控制，所有只会触发两次
    expect(fn).toBeCalledTimes(2);

    act(() => {
      html.find('Button#reset').simulate('click');
    });

    await waitForComponentToPaint(html, 1200);

    expect(fn).toBeCalledTimes(3);
  });

  it('🎏 request error test', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        request={async () => {
          throw new Error('load error');
        }}
        onRequestError={fn}
        rowKey="key"
      />,
    );

    await waitForComponentToPaint(html, 1200);

    expect(fn).toBeCalled();
  });

  it('🎏 actionRef should use', async () => {
    const fn = jest.fn();
    const onChangeFn = jest.fn();
    const actionRef = React.createRef<ActionType>();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        actionRef={(ref) => {
          // @ts-expect-error
          actionRef.current = ref;
        }}
        request={async () => {
          throw new Error('load error');
        }}
        rowSelection={{
          onChange: onChangeFn,
        }}
        onRequestError={fn}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);

    act(() => {
      actionRef.current?.clearSelected?.();
    });
    await waitForComponentToPaint(html);
    expect(fn).toBeCalled();
    expect(onChangeFn).toBeCalled();
  });

  it('🎏 options.reload support is true', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: 'money',
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        options={{
          reload: true,
        }}
        rowSelection={{
          selectedRowKeys: ['first'],
        }}
        tableAlertRender={false}
        request={async () => {
          fn();
          return {
            data: [
              {
                key: 'first',
              },
            ],
          };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);

    act(() => {
      html.find('.ant-pro-table-list-toolbar-setting-item span.anticon-reload').simulate('click');
    });

    await waitForComponentToPaint(html, 1200);
    expect(fn).toBeCalledTimes(2);
  });

  it('🎏 request reload', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: 'money',
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        rowSelection={{
          selectedRowKeys: ['first'],
        }}
        tableAlertRender={false}
        request={async () => {
          fn();
          return {
            data: [
              {
                key: 'first',
              },
            ],
          };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);

    act(() => {
      html.find('.ant-pro-table-list-toolbar-setting-item span.anticon-reload').simulate('click');
    });

    await waitForComponentToPaint(html, 1200);
    expect(fn).toBeCalledTimes(2);
  });

  it('🎏 onSizeChange load', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        columns={[
          {
            title: 'money',
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        onSizeChange={(size) => fn(size)}
        request={async () => {
          return {
            data: [
              {
                key: 'first',
              },
            ],
          };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html);

    act(() => {
      html
        .find('.ant-pro-table-list-toolbar-setting-item span.anticon-column-height')
        .simulate('click');
    });
    await waitForComponentToPaint(html);
    act(() => {
      html.find('.ant-dropdown-menu .ant-dropdown-menu-item').at(0).simulate('click');
    });

    await waitForComponentToPaint(html, 1200);
    expect(fn).toBeCalledWith('large');
  });

  it('🎏 request load array', async () => {
    const fn = jest.fn();
    const actionRef = React.createRef<ActionType>();
    const html = mount(
      <ProTable
        size="small"
        // @ts-ignore
        actionRef={actionRef}
        columns={[
          {
            title: 'money',
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        postData={undefined}
        request={async () => {
          fn();
          await waitTime(500);
          return [];
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);
    act(() => {
      actionRef.current?.reload(true);
    });

    // 这里可以测试，loading 是否被拦住
    await waitTime(12);
    act(() => {
      actionRef.current?.reload(true);
    });
    await waitForComponentToPaint(html, 1200);
    expect(fn).toBeCalledTimes(2);
  });

  it('🎏 request should use postData', async () => {
    const postFn = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: 'money',
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        postData={() => postFn()}
        request={async () => {
          return {
            data: [],
          };
        }}
        rowKey="key"
      />,
    );

    await waitForComponentToPaint(html, 1200);

    expect(postFn).toBeCalled();
    // test useEffect render

    act(() => {
      html.unmount();
    });
  });

  it('🎏 fullscreen icon test', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: 'money',
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        options={{
          fullScreen: fn,
        }}
        request={async () => {
          return {
            data: [],
          };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);

    act(() => {
      html
        .find('.ant-pro-table-list-toolbar-setting-item span.anticon-fullscreen')
        .simulate('click');
    });

    await waitForComponentToPaint(html, 1200);

    expect(fn).toBeCalledTimes(1);
  });

  it('🎏 fullscreen icon test when fullscreenEnabled', async () => {
    const fn = jest.fn();
    // @ts-ignore
    document.fullscreenEnabled = false;
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: 'money',
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        options={{
          fullScreen: true,
        }}
        request={async () => {
          return {
            data: [],
          };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);

    act(() => {
      html
        .find('.ant-pro-table-list-toolbar-setting-item span.anticon-fullscreen')
        .simulate('click');
    });

    await waitForComponentToPaint(html, 1200);

    expect(fn).not.toBeCalled();
  });

  it('🎏 fullscreen icon mock function', async () => {
    const exitFullscreen = jest.fn();
    document.exitFullscreen = async () => {
      // @ts-ignore
      document.fullscreenElement = null;
      exitFullscreen();
    };
    Object.defineProperty(document, 'fullscreenEnabled', {
      value: true,
    });

    Object.defineProperty(HTMLElement.prototype, 'requestFullscreen', {
      value: () => {
        // @ts-ignore
        document.fullscreenElement = document.createElement('div');

        // @ts-ignore
        document.onfullscreenchange?.();
      },
    });

    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: 'money',
            dataIndex: 'money',
            valueType: 'money',
            children: [
              {
                title: 'money',
                dataIndex: 'money',
                valueType: 'money',
              },
              {
                title: 'name',
                dataIndex: 'name',
                valueType: 'text',
              },
            ],
          },
        ]}
        options={{
          fullScreen: true,
        }}
        request={async () => {
          return {
            data: [],
          };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 600);

    act(() => {
      html
        .find('.ant-pro-table-list-toolbar-setting-item span.anticon-fullscreen')
        .simulate('click');
    });
    await waitForComponentToPaint(html, 1200);

    expect(!!document.fullscreenElement).toBeTruthy();

    act(() => {
      html
        .find('.ant-pro-table-list-toolbar-setting-item span.anticon-fullscreen-exit')
        .simulate('click');
    });

    await waitForComponentToPaint(html, 600);

    expect(!!document.fullscreenElement).toBeFalsy();

    expect(exitFullscreen).toBeCalled();
  });

  it('🎏 size icon test', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        size="small"
        columns={[
          {
            title: 'money',
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        request={async () => {
          return {
            data: [],
          };
        }}
        onSizeChange={(size) => {
          fn(size);
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);

    act(() => {
      html
        .find('.ant-pro-table-list-toolbar-setting-item span.anticon-column-height')
        .simulate('click');
    });
    await waitForComponentToPaint(html, 1200);
    act(() => {
      html.find('li.ant-dropdown-menu-item').at(1).simulate('click');
    });
    await waitForComponentToPaint(html, 1200);

    expect(fn).toBeCalledWith('middle');
  });

  it('🎏 loading test', async () => {
    const html = mount(
      <ProTable
        columns={[
          {
            title: 'money',
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        loading
        dataSource={[]}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);
    expect(html.find('.ant-spin').exists()).toBeTruthy();

    act(() => {
      html.setProps({
        loading: false,
      });
    });

    await waitForComponentToPaint(html, 1200);
    // props 指定为 false 后，无论 request 完成与否都不会出现 spin
    expect(html.find('.ant-spin').exists()).toBeFalsy();
  });

  it('🎏 columns = undefined', async () => {
    const html = render(
      <ProTable
        columns={undefined}
        request={async () => {
          return { data: [] };
        }}
        rowKey="key"
      />,
    );
    expect(html).toMatchSnapshot();
  });

  it('🎏 search = true', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        columns={[{ dataIndex: 'name' }]}
        options={{
          search: true,
        }}
        request={async (params) => {
          fn(params.keyword);
          return {
            data: [
              {
                key: '1',
                name: 'string',
              },
            ],
          };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);

    act(() => {
      html.find('.ant-pro-table-list-toolbar-search input').simulate('change', {
        target: {
          value: 'name',
        },
      });
    });

    act(() => {
      html
        .find('.ant-pro-table-list-toolbar-search input')
        .simulate('keydown', { key: 'Enter', keyCode: 13 });
    });

    await waitForComponentToPaint(html, 600);

    expect(fn).toBeCalledWith('name');
  });

  it('🎏 search = true, name = test', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable<
        Record<string, any>,
        {
          test: string;
        }
      >
        columns={[{ dataIndex: 'name' }]}
        options={{
          search: {
            name: 'test',
          },
        }}
        request={async (params) => {
          fn(params.test);
          return { data: [] };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);

    act(() => {
      html.find('.ant-pro-table-list-toolbar-search input').simulate('change', {
        target: {
          value: 'name',
        },
      });
    });

    act(() => {
      html
        .find('.ant-pro-table-list-toolbar-search input')
        .simulate('keydown', { key: 'Enter', keyCode: 13 });
    });

    await waitForComponentToPaint(html, 600);

    expect(fn).toBeCalledWith('name');
  });

  it('🎏 search = true, name = test,onSearch return false', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable<
        Record<string, any>,
        {
          test: string;
        }
      >
        columns={[{ dataIndex: 'name' }]}
        options={{
          search: {
            name: 'test',
            onSearch: (keyword) => keyword !== 'name',
          },
        }}
        request={async (params) => {
          fn(params.test);
          return { data: [] };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);

    act(() => {
      html.find('.ant-pro-table-list-toolbar-search input').simulate('change', {
        target: {
          value: 'name',
        },
      });
    });

    act(() => {
      html
        .find('.ant-pro-table-list-toolbar-search input')
        .simulate('keydown', { key: 'Enter', keyCode: 13 });
    });

    await waitForComponentToPaint(html, 600);

    expect(fn).toBeCalledWith(undefined);

    act(() => {
      html.find('.ant-pro-table-list-toolbar-search input').simulate('change', {
        target: {
          value: 'name1',
        },
      });
    });

    act(() => {
      html
        .find('.ant-pro-table-list-toolbar-search input')
        .simulate('keydown', { key: 'Enter', keyCode: 13 });
    });

    await waitForComponentToPaint(html, 200);

    expect(fn).toBeCalledWith('name1');
  });

  it('🎏 bordered = true', async () => {
    const html = mount(
      <ProTable
        size="small"
        cardBordered
        columns={columns}
        request={request}
        rowKey="key"
        rowSelection={{
          selectedRowKeys: ['1'],
        }}
        params={{ keyword: 'test' }}
        pagination={{
          defaultCurrent: 10,
        }}
      />,
    );

    expect(html.find('.ant-pro-table-search-query-filter.ant-card-bordered').exists()).toBeTruthy();
    expect(html.find('.ant-card.ant-card-bordered').exists()).toBeTruthy();
  });

  it('🎏 bordered = {search = true, table = false}', async () => {
    const html = mount(
      <ProTable
        size="small"
        cardBordered={{
          search: true,
          table: false,
        }}
        columns={columns}
        dataSource={[]}
        rowKey="key"
        rowSelection={{
          selectedRowKeys: ['1'],
        }}
        params={{ keyword: 'test' }}
        pagination={{
          defaultCurrent: 10,
        }}
      />,
    );
    expect(html.find('.ant-card.ant-card-bordered').exists()).toBeFalsy();
    expect(html.find('.ant-pro-table-search-query-filter.ant-card-bordered').exists()).toBeTruthy();
  });

  it('🎏 debounce time', async () => {
    const ref = React.createRef<ActionType>();
    const fn = jest.fn();
    const html = mount(
      <ProTable
        actionRef={ref as any}
        size="small"
        cardBordered
        columns={columns}
        request={async () => {
          fn();
          return Promise.resolve({
            data: [],
            total: 200,
            success: true,
          });
        }}
        rowKey="key"
        debounceTime={500}
      />,
    );
    await waitForComponentToPaint(html, 2000);
    for (let i = 0; i < 10; i += 1) {
      ref.current?.reload();
    }
    await waitForComponentToPaint(html, 2000);

    expect(fn).toBeCalledTimes(2);
  });
});
