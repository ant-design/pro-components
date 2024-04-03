import ProDescriptions from '@ant-design/pro-descriptions';
import type { ProCoreActionType } from '@ant-design/pro-utils';
import { act, cleanup, render, waitFor } from '@testing-library/react';
import { Button, Input } from 'antd';
import React from 'react';

afterEach(() => {
  cleanup();
});

describe('descriptions', () => {
  afterEach(() => {
    cleanup();
  });
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
      expect(
        container.querySelector('span.ant-badge-status-text')?.innerHTML,
      ).toBe('关闭'),
    );
  });

  it('🎏 onLoadingChange test', async () => {
    const fn = vi.fn();
    render(
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

    await waitFor(() => {
      expect(fn).toBeCalled();
    });
  });

  it('🎏 loading test', async () => {
    vi.useFakeTimers();
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

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(!!html.baseElement.querySelector('.ant-skeleton')).toBeTruthy();
    });

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

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      // props 指定为 false 后，无论 request 完成与否都不会出现 spin
      expect(!!html.baseElement.querySelector('.ant-skeleton')).toBeFalsy();
    });

    vi.useRealTimers();
  });

  it('🥩 test reload', async () => {
    const fn = vi.fn();
    vi.useFakeTimers();
    const actionRef = React.createRef<ProCoreActionType>();
    const Reload = () => {
      return (
        <ProDescriptions
          actionRef={actionRef}
          title="高级定义列表 request"
          request={async () => {
            fn();
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve({
                  success: true,
                  data: {
                    id: '这是一段文本',
                    date: '20200730',
                    money: '12121',
                  },
                });
              }, 2000);
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
          test reload
          <ProDescriptions.Item label="文本" dataIndex="id" />
          <ProDescriptions.Item
            dataIndex="date"
            label="日期"
            valueType="date"
          />
          <ProDescriptions.Item
            label="money"
            dataIndex="money"
            valueType="money"
            renderFormItem={() => <Input />}
          />
        </ProDescriptions>
      );
    };
    const html = render(<Reload />);

    await act(() => {
      return vi.runOnlyPendingTimers();
    });

    await html.findAllByText('这是一段文本');
    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });
    act(() => {
      html.queryByText('刷新')?.click();
    });
    act(() => {
      actionRef.current?.reload();
    });
    act(() => {
      actionRef.current?.reload();
    });

    await waitFor(() => {
      // 因为有 loading 的控制，所有只会触发两次
      expect(fn).toBeCalledTimes(2);
    });

    vi.useRealTimers();
  });

  it('🥩 test reload by params', async () => {
    const fn = vi.fn();
    vi.useFakeTimers();
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
        <ProDescriptions.Item
          label="money"
          dataIndex="money"
          valueType="money"
        />
      </ProDescriptions>,
    );

    await html.findAllByText('这是一段文本');

    act(() => {
      vi.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });

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
          <ProDescriptions.Item
            dataIndex="date"
            label="日期"
            valueType="date"
          />
          <ProDescriptions.Item
            label="money"
            dataIndex="money"
            valueType="money"
          />
        </ProDescriptions>,
      );
    });

    act(() => {
      vi.runOnlyPendingTimers();
    });

    await html.findAllByText('这是一段文本');

    await waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    });

    vi.useRealTimers();
  });

  it('🥩 test request error', async () => {
    const fn = vi.fn();

    render(
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
        <ProDescriptions.Item
          label="money"
          dataIndex="money"
          valueType="money"
        />
      </ProDescriptions>,
    );

    await waitFor(() => {
      expect(fn).toBeCalledTimes(1);
    });
  });

  it('🏊 Progress', async () => {
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
    await waitFor(() => {
      expect(
        html.baseElement.querySelector('.ant-progress-text')?.textContent,
      ).toEqual('40%');
    });

    await waitFor(() => {
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
  });

  it('🏊 ProDescriptions support order', async () => {
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

    await waitFor(() => {
      expect(
        wrapper.baseElement.querySelector(
          'span.ant-descriptions-item-content div.ant-typography-copy',
        ),
      ).toBeTruthy();
    });

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

    await waitFor(() => {
      expect(
        wrapper.baseElement.querySelectorAll(
          '.ant-descriptions-item-content .ant-typography-copy',
        ).length,
      ).toBe(0);
    });

    wrapper.unmount();
  });
});
