import { mount } from 'enzyme';
import React, { useRef } from 'react';
import { Input, Button } from 'antd';
import { act } from 'react-dom/test-utils';
import { ProCoreActionType } from '@ant-design/pro-utils';
import ProTable, { ActionType, TableDropdown } from '@ant-design/pro-table';
import { columns, request } from './demo';
import { waitForComponentToPaint, waitTime } from '../util';

describe('BasicTable', () => {
  const LINE_STR_COUNT = 20;
  // Mock offsetHeight
  // @ts-expect-error
  const originOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
    .get;
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
    await waitForComponentToPaint(html, 1000);
    expect(html.render()).toMatchSnapshot();
  });

  it('🎏 do not render Search ', async () => {
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

    await waitForComponentToPaint(html, 1000);
    expect(html.render()).toMatchSnapshot();
  });

  it('🎏  do not render default option', async () => {
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
    await waitForComponentToPaint(html, 1000);
    expect(html.render()).toMatchSnapshot();
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
    await waitForComponentToPaint(html, 1000);
    expect(html.render()).toMatchSnapshot();
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
        request={request}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1000);
    expect(html.find('ul.ant-pagination').exists()).toBeFalsy();

    act(() => {
      html.setProps({
        pagination: undefined,
      });
    });

    await waitForComponentToPaint(html, 20);
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
        request={request}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1000);
    html.find('ProTable').simulateError(new Error('test error'));
    expect(html.render()).toMatchSnapshot();
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
    await waitForComponentToPaint(html, 1000);
    expect(fn).toBeCalled();
  });

  it('🎏 reload request test', async () => {
    const fn = jest.fn();
    const Reload = () => {
      const actionRef = useRef<ProCoreActionType>();
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
    await waitForComponentToPaint(html, 1000);

    act(() => {
      html.find('Button#reload').simulate('click');
    });
    act(() => {
      html.find('Button#reload').simulate('click');
    });

    await waitForComponentToPaint(html, 1000);

    // 因为有 loading 的控制，所有只会触发两次
    expect(fn).toBeCalledTimes(2);

    act(() => {
      html.find('Button#reset').simulate('click');
    });

    await waitForComponentToPaint(html, 1000);

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
    await waitForComponentToPaint(html, 1000);

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
    await waitForComponentToPaint(html, 1000);

    act(() => {
      actionRef.current?.clearSelected?.();
    });
    expect(fn).toBeCalled();
    expect(onChangeFn).toBeCalled();
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
    await waitForComponentToPaint(html, 1000);

    act(() => {
      html.find('.ant-pro-table-list-toolbar-setting-item span.anticon-reload').simulate('click');
    });

    await waitForComponentToPaint(html, 1000);
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

    await waitForComponentToPaint(html, 1000);
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
        // @ts-expect-error
        request={async () => {
          fn();
          return [];
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1000);
    act(() => {
      actionRef.current?.reload(true);
    });
    await waitForComponentToPaint(html, 1000);
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

    await waitForComponentToPaint(html, 1000);

    expect(postFn).toBeCalled();
    // test useEffect render
    html.unmount();
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
    await waitForComponentToPaint(html, 1000);

    act(() => {
      html
        .find('.ant-pro-table-list-toolbar-setting-item span.anticon-fullscreen')
        .simulate('click');
    });

    await waitForComponentToPaint(html, 1000);

    expect(fn).toBeCalledTimes(1);
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
    await waitForComponentToPaint(html, 1000);

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
    await waitForComponentToPaint(html, 1000);

    act(() => {
      html
        .find('.ant-pro-table-list-toolbar-setting-item span.anticon-column-height')
        .simulate('click');
    });
    await waitForComponentToPaint(html, 1000);
    act(() => {
      html.find('.ant-dropdown-menu-item').at(1).simulate('click');
    });
    await waitForComponentToPaint(html, 1000);

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
        request={async () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({ data: [] });
            }, 5000);
          });
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1000);
    expect(html.find('.ant-spin').exists()).toBeTruthy();

    act(() => {
      html.setProps({
        loading: false,
      });
    });
    await waitForComponentToPaint(html, 1000);
    // props 指定为 false 后，无论 request 完成与否都不会出现 spin
    expect(html.find('.ant-spin').exists()).toBeFalsy();
  });

  it('🎏 columns = undefined', async () => {
    const html = mount(
      <ProTable
        columns={undefined}
        request={async () => {
          return { data: [] };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1000);
    expect(html.render()).toMatchSnapshot();
  });

  it('🎏 search = true', async () => {
    const fn = jest.fn();
    const html = mount(
      <ProTable
        columns={undefined}
        options={{
          search: true,
        }}
        request={async (params) => {
          fn(params.keyword);
          return { data: [] };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 600);

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
        {},
        {
          test: string;
        }
      >
        columns={undefined}
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
    await waitForComponentToPaint(html, 600);

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
});
