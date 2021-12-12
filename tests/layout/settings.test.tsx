import React from 'react';
import BasicLayout from '@ant-design/pro-layout';
import { waitForComponentToPaint, waitTime } from '../util';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { _el, _rs } from 'rc-resize-observer/lib/utils/observerUtil';

describe('settings.test', () => {
  it('set title', async () => {
    const wrapper = render(<BasicLayout title="test-title" />);
    await waitForComponentToPaint(wrapper, 160);
    expect(wrapper.getAllByText('test-title')).toBeTruthy();

    wrapper.rerender(<BasicLayout title="test-title-2" />);
    expect(wrapper.getAllByText('test-title-2')).toBeTruthy();

    wrapper.unmount();
  });

  it('RightContent resize', async () => {
    //@ts-ignore
    const html = render(
      <BasicLayout
        rightContentRender={(renProps) => {
          return (
            <div
              id="resize"
              style={{
                width: 160,
              }}
            >
              {
                //@ts-ignore
                renProps.rightContentSize
              }
            </div>
          );
        }}
        layout="top"
      />,
    );

    await waitTime(1000);

    const dom = html.container.querySelector('#resize');

    // @ts-ignore
    dom.getBoundingClientRect = () => {
      return {
        x: 0,
        y: 0,
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 200,
      };
    };

    /** 复制一下方法，方便使用 */
    // 为了mock 好辛苦
    _el.forEach((value) => {
      _el.set(dom!, value);
    });

    act(() => {
      _rs([
        // @ts-ignore
        {
          target: dom!,
        },
      ]);
    });

    await waitTime(1000);

    expect(html.container.querySelector('.ant-pro-right-content-resize')?.textContent).toBe('200');

    // @ts-ignore
    dom.getBoundingClientRect = () => {
      return {
        x: 0,
        y: 0,
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 100,
      };
    };

    /** 复制一下方法，方便使用 */
    // 为了mock 好辛苦
    _el.forEach((value) => {
      _el.set(dom!, value);
    });

    act(() => {
      _rs([
        // @ts-ignore
        {
          target: dom!,
        },
      ]);
    });

    await waitTime(1000);
    expect(html.container.querySelector('.ant-pro-right-content-resize')?.textContent).toBe('100');
  });
});
