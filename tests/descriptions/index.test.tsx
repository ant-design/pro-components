import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProCoreActionType } from '@ant-design/pro-utils';
import { act, render, waitFor } from '@testing-library/react';
import { Button } from 'antd';
import { useRef } from 'react';
import { waitForComponentToPaint, waitTime } from '../util';

describe('descriptions', () => {
  it('🥩 descriptions render valueEnum when data = 0', async () => {
    const { container } = render(
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

    await waitFor(() =>
      expect(container.querySelector('span.ant-badge-status-text')?.innerHTML).toBe('关闭'),
    );
  });

  it('🎏 onLoadingChange test', async () => {
    const fn = jest.fn();
    const html = render(
      <ProDescriptions
        size="small"
        onLoadingChange={fn}
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
      />,
    );
    await waitForComponentToPaint(html, 1200);
    expect(fn).toBeCalled();
  });

  it('🎏 loading test', async () => {
    const html = render(
      <ProDescriptions
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
      />,
    );
    await waitForComponentToPaint(html, 1200);
    expect(!!html.baseElement.querySelector('.ant-skeleton')).toBeTruthy();

    act(() => {
      html.rerender(
        <ProDescriptions
          columns={[
            {
              title: 'money',
              dataIndex: 'money',
              valueType: 'money',
            },
          ]}
          loading={false}
          request={async () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({ data: [] });
              }, 5000);
            });
          }}
        />,
      );
    });
    await waitForComponentToPaint(html, 1200);
    // props 指定为 false 后，无论 request 完成与否都不会出现 spin
    expect(!!html.baseElement.querySelector('.ant-skeleton')).toBeFalsy();
  });

  it('🥩 test reload', async () => {
    const fn = jest.fn();
    const Reload = () => {
      const actionRef = useRef<ProCoreActionType>();
      return (
        <ProDescriptions
          actionRef={actionRef}
          title="高级定义列表 request"
          request={async () => {
            fn();
            await waitTime(200);
            return Promise.resolve({
              success: true,
              data: { id: '这是一段文本', date: '20200730', money: '12121' },
            });
          }}
          extra={
            <Button
              type="link"
              id="reload"
              onClick={() => {
                actionRef.current?.reload();
              }}
            >
              刷新
            </Button>
          }
        >
          <ProDescriptions.Item label="文本" dataIndex="id" />
          <ProDescriptions.Item dataIndex="date" label="日期" valueType="date" />
          <ProDescriptions.Item label="money" dataIndex="money" valueType="money" />
        </ProDescriptions>
      );
    };
    const html = render(<Reload />);
    await waitForComponentToPaint(html, 500);

    act(() => {
      html.queryByText('刷新')?.click();
    });
    act(() => {
      html.queryByText('刷新')?.click();
    });
    await waitForComponentToPaint(html);

    // 因为有 loading 的控制，所有只会触发两次
    expect(fn).toBeCalledTimes(2);
  });

  it('🥩 test reload by params', async () => {
    const fn = jest.fn();

    const html = render(
      <ProDescriptions
        title="高级定义列表 request"
        request={async () => {
          fn();
          return Promise.resolve({
            success: true,
            data: { id: '这是一段文本', date: '20200730', money: '12121' },
          });
        }}
        extra={
          <Button type="link" id="reload">
            修改
          </Button>
        }
      >
        <ProDescriptions.Item label="文本" dataIndex="id" />
        <ProDescriptions.Item dataIndex="date" label="日期" valueType="date" />
        <ProDescriptions.Item label="money" dataIndex="money" valueType="money" />
      </ProDescriptions>,
    );
    await waitForComponentToPaint(html, 300);

    act(() => {
      html.rerender(
        <ProDescriptions
          title="高级定义列表 request"
          request={async () => {
            fn();
            return Promise.resolve({
              success: true,
              data: { id: '这是一段文本', date: '20200730', money: '12121' },
            });
          }}
          extra={
            <Button type="link" id="reload">
              修改
            </Button>
          }
          params={{ name: 'qixian' }}
        >
          <ProDescriptions.Item label="文本" dataIndex="id" />
          <ProDescriptions.Item dataIndex="date" label="日期" valueType="date" />
          <ProDescriptions.Item label="money" dataIndex="money" valueType="money" />
        </ProDescriptions>,
      );
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledTimes(2);
  });

  it('🥩 test request error', async () => {
    const fn = jest.fn();

    const html = render(
      <ProDescriptions
        title="高级定义列表 request"
        request={async () => {
          throw new Error('load error');
        }}
        onRequestError={fn}
        extra={
          <Button type="link" id="reload">
            修改
          </Button>
        }
      >
        <ProDescriptions.Item label="文本" dataIndex="id" />
        <ProDescriptions.Item dataIndex="date" label="日期" valueType="date" />
        <ProDescriptions.Item label="money" dataIndex="money" valueType="money" />
      </ProDescriptions>,
    );
    await waitForComponentToPaint(html, 300);

    expect(fn).toBeCalledTimes(1);
  });

  it('🏊 Progress', () => {
    const html = render(
      <ProDescriptions>
        <ProDescriptions.Item label="进度条1" valueType="progress">
          40
        </ProDescriptions.Item>
        <ProDescriptions.Item label="进度条2" valueType="progress">
          -1
        </ProDescriptions.Item>
        <ProDescriptions.Item label="进度条3" valueType="progress">
          100
        </ProDescriptions.Item>
      </ProDescriptions>,
    );
    expect(html.baseElement.querySelector('.ant-progress-text')?.textContent).toEqual('40%');
    expect(
      !!html.baseElement
        .querySelectorAll('.ant-progress-text')?.[1]
        ?.querySelector('.anticon-close-circle'),
    ).toBeTruthy();
    expect(
      !!html.baseElement
        .querySelectorAll('.ant-progress-text')?.[2]
        ?.querySelector('.anticon-check-circle'),
    ).toBeTruthy();
  });

  it('🏊 ProDescriptions support order', () => {
    const html = render(
      <ProDescriptions
        dataSource={{
          title: 'test',
        }}
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            valueType: 'text',
            order: 100,
          },
        ]}
      >
        <ProDescriptions.Item order={9} label="进度条1" valueType="progress">
          40
        </ProDescriptions.Item>
        <ProDescriptions.Item label="进度条2" valueType="progress">
          -1
        </ProDescriptions.Item>
        <ProDescriptions.Item order={8} label="进度条3" valueType="progress">
          100
        </ProDescriptions.Item>
      </ProDescriptions>,
    );
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('📝 typography support and copy', async () => {
    const wrapper = render(
      <ProDescriptions
        title="dataSource and columns"
        dataSource={{
          id: '这是一段文本columns',
          date: '20200809',
          money: '1212100',
          state: 'all',
          state2: 'open',
        }}
        columns={[
          {
            title: '文本',
            key: 'text',
            dataIndex: 'id',
            ellipsis: true,
            copyable: true,
          },
        ]}
      />,
    );

    expect(
      wrapper.baseElement.querySelector(
        'span.ant-descriptions-item-content div.ant-typography-copy',
      ),
    ).toBeTruthy();

    wrapper.rerender(
      <ProDescriptions
        title="dataSource and columns"
        dataSource={{
          id: '这是一段文本columns',
          date: '20200809',
          money: '1212100',
          state: 'all',
          state2: 'open',
        }}
        columns={[
          {
            title: '文本',
            key: 'text',
            dataIndex: 'id',
          },
        ]}
      />,
    );
    expect(
      wrapper.baseElement.querySelectorAll('.ant-descriptions-item-content .ant-typography-copy')
        .length,
    ).toBe(0);

    wrapper.unmount();
  });
});
