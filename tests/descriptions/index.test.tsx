import { mount } from 'enzyme';
import React, { useRef } from 'react';
import { Button } from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';
import { ProCoreActionType } from '@ant-design/pro-utils';
import { act } from 'react-dom/test-utils';

import { waitForComponentToPaint, waitTime } from '../util';

describe('descriptions', () => {
  it('🥩 descriptions render valueEnum when data = 0', async () => {
    const html = mount(
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
    await waitForComponentToPaint(html, 200);
    expect(html.find('span.ant-badge-status-text').text()).toBe('关闭');
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
              修改
            </Button>
          }
        >
          <ProDescriptions.Item label="文本" dataIndex="id" />
          <ProDescriptions.Item dataIndex="date" label="日期" valueType="date" />
          <ProDescriptions.Item label="money" dataIndex="money" valueType="money" />
        </ProDescriptions>
      );
    };
    const html = mount(<Reload />);
    await waitForComponentToPaint(html, 300);

    act(() => {
      html.find('Button#reload').simulate('click');
    });
    act(() => {
      html.find('Button#reload').simulate('click');
    });
    await waitForComponentToPaint(html);

    // 因为有 loading 的控制，所有只会触发两次
    expect(fn).toBeCalledTimes(2);
  });

  it('🥩 test reload by params', async () => {
    const fn = jest.fn();

    const html = mount(
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
      html.setProps({
        params: { name: 'qixian' },
      });
    });

    await waitForComponentToPaint(html);

    expect(fn).toBeCalledTimes(2);
  });

  it('🥩 test request error', async () => {
    const fn = jest.fn();

    const html = mount(
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
});
