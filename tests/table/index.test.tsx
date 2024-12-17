import type { ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { Button, Input } from 'antd';
import React, { act, useEffect, useRef } from 'react';
import { columns, request } from './demo';

afterEach(() => {
  cleanup();
});

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
    const pageSizeOnchange = vi.fn();
    const html = render(
      <ProTable
        size="small"
        columns={columns}
        request={request}
        rowKey="key"
        params={{ keyword: 'test' }}
        pagination={{
          defaultCurrent: 10,
          onChange: (e) => {
            pageSizeOnchange(e);
          },
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

    await html.queryByText('查 询');

    await waitFor(() => {
      return html.queryAllByText('Edward King 9');
    });

    await waitFor(
      () => {
        expect(pageSizeOnchange).toHaveBeenCalledWith(10);
      },
      {
        timeout: 1000,
      },
    );

    act(() => {
      html.rerender(
        <ProTable
          size="small"
          columns={columns}
          request={request}
          rowKey="key"
          params={{ keyword: 'test2' }}
          pagination={false}
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
    });

    await html.queryByText('更多操作');

    await waitFor(() => {
      return html.queryAllByText('Edward King 9');
    });
  });

  it('🎏 tableDropdown click trigger onSelect', async () => {
    const html = render(
      <div>
        <TableDropdown.Button
          key="copy"
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'clear', name: '清空' },
          ]}
        >
          更多操作
        </TableDropdown.Button>
        <TableDropdown
          key="tableDropdown"
          // eslint-disable-next-line react/no-children-prop
          children="其他操作"
          menus={[
            { key: 'edit', name: '编辑' },
            { key: 'create', name: '新建' },
          ]}
        />
      </div>,
    );

    await html.findByText('更多操作');

    await act(async () => {
      fireEvent.mouseOver(screen.getByText('更多操作'));
    });

    await waitFor(() => html.findByText('复制'));

    await act(async () => {
      (await html.findByText('复制')).click();
    });

    await act(async () => {
      fireEvent.mouseOver(screen.getByText('其他操作'));
    });

    await waitFor(() => html.findByText('编辑'));

    await act(async () => {
      (await html.findByText('编辑')).click();
    });
  });

  it('🎏 table support visibilitychange', async () => {
    const requestFfn = vi.fn();
    let fn: Function | null = null;
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const addEventListenerSpy = vi
      .spyOn(document, 'addEventListener')
      .mockImplementation((eventName, eventFn) => {
        if (eventName === 'visibilitychange') {
          //@ts-expect-error
          fn = eventFn;
        }
      });

    const html = render(
      <ProTable
        size="small"
        columns={columns}
        request={async () => {
          requestFfn();
          return request;
        }}
        rowKey="key"
        revalidateOnFocus
      />,
    );

    await html.findByText('查 询');

    await waitFor(() => {
      expect(requestFfn).toBeCalledTimes(1);
    });

    act(() => {
      fn?.();
    });

    errorSpy.mockRestore();
    addEventListenerSpy.mockRestore();

    await waitFor(() => {
      expect(requestFfn).toBeCalledTimes(2);
    });
  });

  it('🎏 do not render Search', async () => {
    const html = render(
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

    await waitFor(() => {
      expect(
        !!html.baseElement.querySelector('.ant-pro-table-search'),
      ).toBeFalsy();
    });
  });

  it('🎏 onLoadingChange should work', async () => {
    const loadingChangerFn = vi.fn();
    vi.useFakeTimers();
    const html = render(
      <ProTable
        size="small"
        columns={[
          {
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            valueType: 'index',
          },
        ]}
        request={async (params) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(request(params));
            }, 1000);
          });
        }}
        rowKey="key"
        onLoadingChange={loadingChangerFn}
        rowSelection={{
          selectedRowKeys: ['1'],
        }}
        search={false}
        params={{ keyword: 'test' }}
      />,
    );

    await html.findByText('序号');
    await waitFor(() => {
      expect(loadingChangerFn).toHaveBeenCalledWith(true, false);
    });

    act(() => {
      vi.runOnlyPendingTimers();
    });
    await waitFor(() => {
      return html.findByText('序号');
    });
    await waitFor(() => {
      expect(loadingChangerFn).toHaveBeenCalledWith(false, true);
    });

    vi.useRealTimers();
  });

  it('🎏 do not render default option', async () => {
    const html = render(
      <ProTable
        size="small"
        options={{
          fullScreen: false,
          reload: false,
          setting: false,
        }}
        search={false}
        columns={[
          {
            title: 'money title',
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        request={request}
        rowKey="key"
      />,
    );

    await html.findByText('money title');

    expect(
      html.baseElement.querySelectorAll(
        '.ant-pro-table-list-toolbar-setting-items .ant-pro-table-list-toolbar-setting-item',
      ).length,
    ).toBe(1);
  });

  it('🎏 ProTable support searchText and resetText', async () => {
    const html = render(
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
            title: 'money title',
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        dataSource={[]}
        rowKey="key"
      />,
    );

    await html.findByText('test');
    await html.findByText('test2');
  });

  it('🎏 ProTable support card props is false', async () => {
    const html = render(
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
        search={false}
        dataSource={[]}
        rowKey="key"
      />,
    );

    expect(!!html.baseElement.querySelector('.ant-pro-card')).toBe(false);

    act(() => {
      html.rerender(
        <ProTable
          size="small"
          toolBarRender={false}
          columns={[
            {
              dataIndex: 'money',
              valueType: 'money',
            },
          ]}
          search={false}
          dataSource={[]}
          rowKey="key"
        />,
      );
    });

    await waitFor(() => {
      expect(!!html.baseElement.querySelector('.ant-pro-card')).toBe(false);
    });

    act(() => {
      html.rerender(
        <ProTable
          size="small"
          toolBarRender={() => {
            return [<a key="submit">submit</a>];
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
    });
    await html.findByText('submit');

    await waitFor(() => {
      expect(!!html.baseElement.querySelector('.ant-pro-card')).toBe(true);
    });
  });

  it('🎏 do not render setting', async () => {
    const html = render(
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
    await html.findByText('查 询');
    act(() => {
      expect(!!html.baseElement.querySelector('.anticon-setting')).toBeFalsy();
    });
  });

  it('🎏 valueEnum support function', async () => {
    const html = render(
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
            dataIndex: 'status1',
            valueType: 'select',
            fieldProps: {
              open: true,
            },
            valueEnum: (row) => {
              if (!row) {
                return {
                  0: { text: 'Close', status: 'Default' },
                  1: { text: 'Processing', status: 'Processing' },
                  2: { text: 'Success', status: 'Success' },
                  3: { text: 'Error', status: 'Error' },
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

    await waitFor(() => {
      return html.queryAllByText('Close');
    });
    await waitFor(() => {
      return html.queryAllByText('Processing');
    });
    await waitFor(() => {
      return html.queryAllByText('Success');
    });
    await waitFor(() => {
      return html.queryAllByText('Error');
    });

    await waitFor(() => {
      return html.queryAllByText('异常');
    });
    await waitFor(() => {
      return html.queryAllByText('关闭');
    });
    await waitFor(() => {
      return html.queryAllByText('运行中');
    });
    await waitFor(() => {
      return html.queryAllByText('已上线');
    });
  });

  it('🎏 do not render pagination', async () => {
    const html = render(
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

    await waitFor(() => {
      expect(!!html.baseElement.querySelector('ul.ant-pagination')).toBeFalsy();
    });
    act(() => {
      html.rerender(
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
    });

    await waitFor(() => {
      expect(
        !!html.baseElement.querySelector('ul.ant-pagination'),
      ).toBeTruthy();
    });
  });

  it('🎏 page error test', async () => {
    const TargetComponent = () => {
      useEffect(() => {
        throw new Error('Errored!');
      }, []);
      return <></>;
    };
    const html = render(
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
        tableExtraRender={() => <TargetComponent />}
        search={false}
        rowKey="key"
      />,
    );

    await html.findByText('Something went wrong.');
  });

  it('🎏 request test', async () => {
    const fn = vi.fn();
    const html = render(
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
    await html.findByText('查 询');
    await waitFor(() => {
      expect(fn).toBeCalled();
    });
  });

  it('🎏 onLoadingChange test', async () => {
    const fn = vi.fn();
    vi.useFakeTimers();
    const html = render(
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
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                data: [],
              });
            }, 2000);
          });
        }}
        rowKey="key"
      />,
    );
    await html.findByText('查 询');

    act(() => {
      vi.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(fn).toBeCalled();
    });

    vi.useFakeTimers();
  });

  it('🎏 reload request test', async () => {
    const fn = vi.fn();
    vi.useFakeTimers();
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
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({ data: [] });
              }, 200);
            });
          }}
          rowKey="key"
        />
      );
    };
    const html = render(<Reload />);

    await html.findByText('查 询');

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });

    act(() => {
      fireEvent.click(html.baseElement.querySelector('#reload')!);
    });

    act(() => {
      fireEvent.click(html.baseElement.querySelector('#reload')!);
    });

    act(() => {
      vi.runOnlyPendingTimers();
    });

    await waitFor(() => {
      // 因为有 loading 的控制，所有只会触发两次
      expect(fn).toBeCalledTimes(2);
    });

    act(() => {
      fireEvent.click(html.baseElement.querySelector('#reset')!);
    });
    act(() => {
      vi.runOnlyPendingTimers();
    });
    await waitFor(() => {
      expect(fn).toBeCalledTimes(3);
    });

    vi.useRealTimers();

    html.unmount();
  });

  it('🎏 request error test', async () => {
    const fn = vi.fn();
    render(
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

    await waitFor(() => {
      expect(fn).toBeCalled();
    });
  });

  it('🎏 actionRef support clearSelected', async () => {
    const fn = vi.fn();
    const onChangeFn = vi.fn();
    const actionRef = React.createRef<ActionType>();
    const html = render(
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
    await html.findByText('查 询');

    act(() => {
      actionRef.current?.clearSelected?.();
    });

    await waitFor(() => {
      expect(fn).toBeCalled();
    });
    await waitFor(() => {
      expect(onChangeFn).toBeCalled();
    });
  });

  it('🎏 options.reload support is true', async () => {
    const fn = vi.fn();
    const html = render(
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
    await html.findByText('查 询');

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });

    act(() => {
      fireEvent.click(
        html.baseElement.querySelector(
          '.ant-pro-table-list-toolbar-setting-item span.anticon-reload',
        )!,
      );
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    });
  });

  it('🎏 receives two parameters when options.(reload | fullScreen) is passed the function', async () => {
    const reloadFn = vi.fn();
    const fullScreenFn = vi.fn();
    const actionRef = React.createRef<any>();
    const html = render(
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
          reload: reloadFn,
          fullScreen: fullScreenFn,
        }}
        actionRef={actionRef}
        rowKey="key"
      />,
    );
    await html.findByText('查 询');

    act(() => {
      fireEvent.click(
        html.baseElement.querySelector(
          '.ant-pro-table-list-toolbar-setting-item span.anticon-reload',
        )!,
      );
    });

    await waitFor(() => {
      expect(reloadFn).toHaveBeenCalledWith(
        expect.anything(),
        actionRef.current,
      );
    });

    act(() => {
      fireEvent.click(
        html.baseElement.querySelector(
          '.ant-pro-table-list-toolbar-setting-item span.anticon-fullscreen',
        )!,
      );
    });

    await waitFor(() => {
      expect(fullScreenFn).toHaveBeenCalledWith(
        expect.anything(),
        actionRef.current,
      );
    });
  });

  it('🎏 request reload', async () => {
    const fn = vi.fn();
    const html = render(
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
    await html.findByText('查 询');

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });

    act(() => {
      fireEvent.click(
        html.baseElement.querySelector(
          '.ant-pro-table-list-toolbar-setting-item span.anticon-reload',
        )!,
      );
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    });
  });

  it('🎏 onSizeChange load', async () => {
    const fn = vi.fn();
    const html = render(
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

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-pro-table-list-toolbar-setting-item span.anticon-column-height',
        )
        ?.click();
    });

    await waitFor(() => {
      return html.queryAllByText('large');
    });

    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>(
          '.ant-dropdown-menu .ant-dropdown-menu-item',
        )
        ?.click();
    });

    expect(fn).toHaveBeenCalledWith('large');
  });

  it('🎏 request load array', async () => {
    const fn = vi.fn();
    const actionRef = React.createRef<ActionType>();

    vi.useFakeTimers();
    const html = render(
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
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([]);
            }, 1000);
          });
        }}
        rowKey="key"
      />,
    );
    await html.findByText('查 询');
    act(() => {
      vi.runOnlyPendingTimers();
    });
    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });

    act(() => {
      actionRef.current?.reload(true);
    });
    // 这里可以测试，loading 是否被拦住
    act(() => {
      actionRef.current?.reload(true);
    });

    act(() => {
      vi.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    });
    vi.useRealTimers();
  });

  it('🎏 request should use postData', async () => {
    const postFn = vi.fn();
    const html = render(
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

    await html.findByText('查 询');

    await waitFor(() => {
      expect(postFn).toBeCalled();
    });
  });

  it('🎏 fullscreen icon test', async () => {
    const fn = vi.fn();
    const html = render(
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
    await html.findByText('查 询');

    act(() => {
      fireEvent.click(
        html.baseElement.querySelector(
          '.ant-pro-table-list-toolbar-setting-item span.anticon-fullscreen',
        )!,
      );
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });
  });

  it('🎏 fullscreen icon test when fullscreenEnabled', async () => {
    const fn = vi.fn();
    // @ts-ignore
    document.fullscreenEnabled = false;
    const html = render(
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

    act(() => {
      fireEvent.click(
        html.baseElement.querySelector(
          '.ant-pro-table-list-toolbar-setting-item span.anticon-fullscreen',
        )!,
      );
    });
    await html.findByText('查 询');

    await waitFor(() => {
      expect(fn).not.toBeCalled();
    });
  });

  it('🎏 fullscreen icon mock function', async () => {
    const exitFullscreen = vi.fn();
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
        console.log('Rrrrr------------');
        // @ts-ignore
        document.onfullscreenchange?.();
      },
    });

    const html = render(
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
        search={false}
        toolBarRender={() => [<Button key="fix">查询</Button>]}
        rowKey="key"
      />,
    );
    await html.findByText('查 询');

    act(() => {
      fireEvent.click(
        html.baseElement.querySelector(
          '.ant-pro-table-list-toolbar-setting-item span.anticon-fullscreen',
        )!,
      );
    });

    await waitFor(() => {
      expect(!!document.fullscreenElement).toBeTruthy();
    });

    act(() => {
      fireEvent.click(
        html.baseElement.querySelector(
          '.ant-pro-table-list-toolbar-setting-item span.anticon-fullscreen-exit',
        )!,
      );
    });
    await waitFor(() => {
      expect(!!document.fullscreenElement).toBeFalsy();
    });
    await waitFor(() => {
      expect(exitFullscreen).toBeCalled();
    });
  });

  it('🎏 size icon test', async () => {
    const fn = vi.fn();
    const html = render(
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
    await html.findByText('查 询');

    act(() => {
      fireEvent.click(
        html.baseElement.querySelector(
          '.ant-pro-table-list-toolbar-setting-item span.anticon-column-height',
        )!,
      );
    });

    act(() => {
      fireEvent.click(
        html.baseElement.querySelectorAll('li.ant-dropdown-menu-item')[1],
      );
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith('middle');
    });
  });

  it('🎏 loading test', async () => {
    const html = render(
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
    await html.findByText('查 询');
    expect(!!html.baseElement.querySelector('.ant-spin')).toBeTruthy();

    act(() => {
      html.rerender(
        <ProTable
          columns={[
            {
              title: 'money',
              dataIndex: 'money',
              valueType: 'money',
            },
          ]}
          loading={false}
          dataSource={[]}
          rowKey="key"
        />,
      );
    });

    await html.findByText('查 询');

    await waitFor(() => {
      // props 指定为 false 后，无论 request 完成与否都不会出现 spin
      expect(!!html.baseElement.querySelector('.ant-spin')).toBeFalsy();
    });
  });

  it('🎏 columns = undefined', async () => {
    const html = render(
      <ProTable
        columns={undefined}
        request={async () => {
          return { data: [] };
        }}
        search={false}
        toolBarRender={false}
        rowKey="key"
      />,
    );
    await waitFor(() => {
      html.getAllByText('暂无数据');
    });
  });

  it('🎏 search = true', async () => {
    const fn = vi.fn();
    const html = render(
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
    await html.findByText('查 询');

    act(() => {
      fireEvent.change(
        html.baseElement.querySelector(
          '.ant-pro-table-list-toolbar-search input',
        )!,
        {
          target: {
            value: 'name',
          },
        },
      );
    });

    await html.findByDisplayValue('name');

    act(() => {
      fireEvent.keyDown(
        html.baseElement.querySelector(
          '.ant-pro-table-list-toolbar-search input',
        )!,
        { key: 'Enter', keyCode: 13 },
      );
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith('name');
    });
  });

  it('🎏 search = true, name = test', async () => {
    const fn = vi.fn();
    const html = render(
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

    await html.findByText('查 询');

    act(() => {
      fireEvent.change(
        html.baseElement.querySelector(
          '.ant-pro-table-list-toolbar-search input',
        )!,
        {
          target: {
            value: 'name',
          },
        },
      );
    });
    await html.findByDisplayValue('name');

    act(() => {
      fireEvent.keyDown(
        html.baseElement.querySelector(
          '.ant-pro-table-list-toolbar-search input',
        )!,
        { key: 'Enter', keyCode: 13 },
      );
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith('name');
    });
  });

  it('🎏 search = true, name = test,onSearch return false', async () => {
    const fn = vi.fn();
    const html = render(
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

    await html.findByText('查 询');

    act(() => {
      fireEvent.change(
        html.baseElement.querySelector(
          '.ant-pro-table-list-toolbar-search input',
        )!,
        {
          target: {
            value: 'name',
          },
        },
      );
    });

    await html.findByDisplayValue('name');

    act(() => {
      fireEvent.keyDown(
        html.baseElement.querySelector(
          '.ant-pro-table-list-toolbar-search input',
        )!,
        { key: 'Enter', keyCode: 13 },
      );
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith('');
    });

    act(() => {
      fireEvent.change(
        html.baseElement.querySelector(
          '.ant-pro-table-list-toolbar-search input',
        )!,
        {
          target: {
            value: 'name1',
          },
        },
      );
    });

    // await html.findByDisplayValue('name1');

    // act(() => {
    //   fireEvent.keyDown(
    //     html.baseElement.querySelector(
    //       '.ant-pro-table-list-toolbar-search input',
    //     )!,
    //     { key: 'Enter', keyCode: 13 },
    //   );
    // });

    // await waitFor(() => {
    //   expect(fn).toHaveBeenCalledWith('name1');
    // });
  });

  it('🎏 bordered = true', async () => {
    const html = render(
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

    expect(
      !!html.baseElement.querySelector(
        '.ant-pro-table-search-query-filter.ant-pro-card-bordered',
      ),
    ).toBeTruthy();
    expect(
      !!html.baseElement.querySelector('.ant-pro-card.ant-pro-card-border'),
    ).toBeTruthy();
  });

  it('🎏 bordered = {search = true, table = false}', async () => {
    const html = render(
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
    expect(
      !!html.baseElement.querySelector('.ant-pro-card.ant-card-bordered'),
    ).toBeFalsy();
    expect(
      !!html.baseElement.querySelector(
        '.ant-pro-table-search-query-filter.ant-pro-card-bordered',
      ),
    ).toBeTruthy();
  });

  it('🎏 debounce time', async () => {
    const ref = React.createRef<ActionType>();
    const fn = vi.fn();
    vi.useFakeTimers();
    const html = render(
      <ProTable
        actionRef={ref as any}
        size="small"
        cardBordered
        columns={[
          {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
          },
        ]}
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

    await waitFor(() => {
      expect(fn).toBeCalledTimes(0);
    });

    act(() => {
      vi.runOnlyPendingTimers();
    });

    await waitFor(() => {
      return html.findAllByText('暂无数据');
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });

    act(() => {
      vi.runOnlyPendingTimers();
    });

    await waitFor(() => {
      return html.findAllByText('暂无数据');
    });

    for (let i = 0; i < 10; i += 1) {
      ref.current?.reload();
    }

    act(() => {
      vi.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    });

    await html.findAllByText('暂无数据');
    vi.useRealTimers();
  });

  it('🎏 support showHiddenNum', async () => {
    const ref = React.createRef<ActionType>();
    const fn = vi.fn();
    const html = render(
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
        search={{
          showHiddenNum: true,
        }}
        rowKey="key"
        debounceTime={500}
      />,
    );
    await html.findByText('展开(9)');
    expect(
      html.baseElement.querySelector('.ant-pro-query-filter-collapse-button')
        ?.textContent,
    ).toBe('展开(9)');
  });
});
