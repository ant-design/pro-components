import { cleanup, render, waitFor } from '@testing-library/react';
import type { ProCoreActionType } from '@xxlabs/pro-components';
import { ProDescriptions } from '@xxlabs/pro-components';
import { Button, Input } from 'antd';
import React, { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

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

    await waitFor(() => expect(container.querySelector('span.ant-badge-status-text')?.innerHTML).toBe('关闭'));
  });

  it('🎏 onLoadingChange test', async () => {
    const fn = vi.fn();
    render(
      <ProDescriptions
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
        size="small"
        onLoadingChange={fn}
      />,
    );

    await waitFor(() => {
      expect(fn).toHaveBeenCalled();
    });
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

    await waitFor(() => {
      // props 指定为 false 后，无论 request 完成与否都不会出现 spin
      expect(!!html.baseElement.querySelector('.ant-skeleton')).toBeFalsy();
    });
  });

  it('🥩 test reload', async () => {
    const fn = vi.fn();

    const actionRef = React.createRef<ProCoreActionType>();
    const Reload = () => {
      return (
        <ProDescriptions
          actionRef={actionRef}
          extra={
            <Button
              id="reload"
              type="link"
              onClick={() => {
                actionRef.current?.reload();
              }}
            >
              刷新
            </Button>
          }
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
          title="高级定义列表 request"
        >
          test reload
          <ProDescriptions.Item dataIndex="id" label="文本" />
          <ProDescriptions.Item dataIndex="date" label="日期" valueType="date" />
          <ProDescriptions.Item dataIndex="money" formItemRender={() => <Input />} label="money" valueType="money" />
        </ProDescriptions>
      );
    };
    const html = render(<Reload />);

    // 等待数据加载完成，而不是直接查找文本
    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(1);
    });

    // 等待文本出现，增加超时时间以处理2秒延迟
    await waitFor(
      () => {
        expect(html.getByText('这是一段文本')).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

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
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  it('🥩 test reload by params', async () => {
    const fn = vi.fn();

    const html = render(
      <ProDescriptions
        extra={
          <Button id="reload" type="link">
            修改
          </Button>
        }
        request={async () => {
          fn();
          return Promise.resolve({
            success: true,
            data: { id: '这是一段文本', date: '20200730', money: '12121' },
          });
        }}
        title="高级定义列表 request"
      >
        <ProDescriptions.Item dataIndex="id" label="文本" />
        <ProDescriptions.Item dataIndex="date" label="日期" valueType="date" />
        <ProDescriptions.Item dataIndex="money" label="money" valueType="money" />
      </ProDescriptions>,
    );

    // 等待数据加载完成
    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(1);
    });

    // 等待文本出现
    await waitFor(() => {
      expect(html.getByText('这是一段文本')).toBeInTheDocument();
    });

    act(() => {
      html.rerender(
        <ProDescriptions
          extra={
            <Button id="reload" type="link">
              修改
            </Button>
          }
          params={{ name: 'qixian' }}
          request={async () => {
            fn();
            return Promise.resolve({
              success: true,
              data: { id: '这是一段文本', date: '20200730', money: '12121' },
            });
          }}
          title="高级定义列表 request"
        >
          <ProDescriptions.Item dataIndex="id" label="文本" />
          <ProDescriptions.Item dataIndex="date" label="日期" valueType="date" />
          <ProDescriptions.Item dataIndex="money" label="money" valueType="money" />
        </ProDescriptions>,
      );
    });

    // 等待重新渲染后的文本出现
    await waitFor(() => {
      expect(html.getByText('这是一段文本')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  it('🥩 test request error', async () => {
    const fn = vi.fn();

    render(
      <ProDescriptions
        extra={
          <Button id="reload" type="link">
            修改
          </Button>
        }
        request={async () => {
          throw new Error('load error');
        }}
        title="高级定义列表 request"
        onRequestError={fn}
      >
        <ProDescriptions.Item dataIndex="id" label="文本" />
        <ProDescriptions.Item dataIndex="date" label="日期" valueType="date" />
        <ProDescriptions.Item dataIndex="money" label="money" valueType="money" />
      </ProDescriptions>,
    );

    await waitFor(() => {
      expect(fn).toHaveBeenCalledTimes(1);
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
      expect(html.baseElement.querySelector('.ant-progress-text')?.textContent).toEqual('40%');
    });

    await waitFor(() => {
      expect(
        !!html.baseElement.querySelectorAll('.ant-progress-text')?.[1]?.querySelector('.anticon-close-circle'),
      ).toBeTruthy();
      expect(
        !!html.baseElement.querySelectorAll('.ant-progress-text')?.[2]?.querySelector('.anticon-check-circle'),
      ).toBeTruthy();
    });
  });

  it('🏊 ProDescriptions support order', async () => {
    const html = render(
      <ProDescriptions
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            valueType: 'text',
            order: 100,
          },
        ]}
        dataSource={{
          title: 'test',
        }}
      >
        <ProDescriptions.Item label="进度条1" order={9} valueType="progress">
          40
        </ProDescriptions.Item>
        <ProDescriptions.Item label="进度条2" valueType="progress">
          -1
        </ProDescriptions.Item>
        <ProDescriptions.Item label="进度条3" order={8} valueType="progress">
          100
        </ProDescriptions.Item>
      </ProDescriptions>,
    );
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('📝 typography support and copy', async () => {
    const wrapper = render(
      <ProDescriptions
        columns={[
          {
            title: '文本',
            key: 'text',
            dataIndex: 'id',
            ellipsis: true,
            copyable: true,
          },
        ]}
        dataSource={{
          id: '这是一段文本columns',
          date: '20200809',
          money: '1212100',
          state: 'all',
          state2: 'open',
        }}
        title="dataSource and columns"
      />,
    );

    await waitFor(() => {
      expect(
        wrapper.baseElement.querySelector('span.ant-descriptions-item-content button.ant-typography-copy'),
      ).toBeTruthy();
    });

    wrapper.rerender(
      <ProDescriptions
        columns={[
          {
            title: '文本',
            key: 'text',
            dataIndex: 'id',
          },
        ]}
        dataSource={{
          id: '这是一段文本columns',
          date: '20200809',
          money: '1212100',
          state: 'all',
          state2: 'open',
        }}
        title="dataSource and columns"
      />,
    );

    await waitFor(() => {
      expect(wrapper.baseElement.querySelectorAll('.ant-descriptions-item-content .ant-typography-copy').length).toBe(
        0,
      );
    });

    wrapper.unmount();
  });
});
