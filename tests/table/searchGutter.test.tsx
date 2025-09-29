import { cleanup, render } from '@testing-library/react';
import { ProTable } from '@xxlabs/pro-components';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { waitForWaitTime } from '../util';
afterEach(() => {
  cleanup();
});

describe('BasicTable SearchGutter', () => {
  const LINE_STR_COUNT = 20;
  // Mock offsetHeight
  // @ts-expect-error
  const originOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight').get;
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

  it('🎏 ProTable support searchGutter', async () => {
    const html = render(
      <ProTable
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        dataSource={[]}
        options={{
          fullScreen: false,
          reload: false,
          setting: false,
        }}
        rowKey="key"
        search={{
          searchGutter: [16, 24],
        }}
        size="small"
      />,
    );
    await waitForWaitTime(1200);
    const ele = html.baseElement.querySelector<HTMLDivElement>('.ant-form');
    expect(ele).toMatchSnapshot();
  });

  it('🎏 ProTable searchGutter default is [24 0]', async () => {
    const html = render(
      <ProTable
        columns={[
          {
            dataIndex: 'money',
            valueType: 'money',
          },
        ]}
        dataSource={[]}
        options={{
          fullScreen: false,
          reload: false,
          setting: false,
        }}
        rowKey="key"
        search={{
          searchGutter: 12,
        }}
        size="small"
      />,
    );
    await waitForWaitTime(1200);
    const ele = html.baseElement.querySelector<HTMLDivElement>('.ant-col');
    expect(ele?.style.paddingLeft).toBe('6px');
  });
});
