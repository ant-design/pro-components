import { mount } from 'enzyme';
import React, { useRef } from 'react';
import { Input, Button } from 'antd';
import { act } from 'react-dom/test-utils';
import { ProCoreActionType } from '@ant-design/pro-utils';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
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
    await waitForComponentToPaint(html, 200);
    expect(html.render()).toMatchSnapshot();
  });

  it('🎏 do not render Search ', async () => {
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

    await waitForComponentToPaint(html, 200);
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
    await waitForComponentToPaint(html, 200);
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
    await waitForComponentToPaint(html, 200);
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
    await waitForComponentToPaint(html, 200);
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
    await waitForComponentToPaint(html, 200);
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
    await waitForComponentToPaint(html, 200);
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

  it('🎏  request reload', async () => {
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
          fn();
          return {
            data: [],
          };
        }}
        rowKey="key"
      />,
    );
    await waitForComponentToPaint(html, 1200);

    act(() => {
      html.find('.ant-pro-table-toolbar-item-icon span.anticon-reload').simulate('click');
    });

    await waitForComponentToPaint(html, 1200);
    expect(fn).toBeCalledTimes(2);
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
      html.find('.ant-pro-table-toolbar-item-icon span.anticon-fullscreen').simulate('click');
    });

    await waitForComponentToPaint(html, 1200);

    expect(fn).toBeCalledTimes(1);
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
      html.find('.ant-pro-table-toolbar-item-icon span.anticon-column-height').simulate('click');
    });
    await waitForComponentToPaint(html, 1200);
    act(() => {
      html.find('.ant-dropdown-menu-item').at(1).simulate('click');
    });
    await waitForComponentToPaint(html, 1200);

    expect(fn).toBeCalledWith('middle');
  });
});
