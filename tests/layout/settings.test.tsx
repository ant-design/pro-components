import React from 'react';
import BasicLayout from '@ant-design/pro-layout';
import { waitForComponentToPaint, waitTime } from '../util';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { RightContent } from '../../packages/layout/src/components/TopNavHeader';

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
    const dom = document.createElement('div');
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
    const props: any = {};
    const html = render(
      <RightContent
        prefixCls="ant-pro"
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
        {...props}
      />,
    );

    await waitTime(1000);
    act(() => {
      // @ts-ignore
      window.resizeObserverListener.map((item) => {
        item([
          {
            target: dom,
          },
        ]);
      });
    });

    await waitTime(1000);

    expect(html.container.querySelector('.ant-pro-right-content-resize')?.textContent).toBe('200');

    // // @ts-ignore
    // dom.getBoundingClientRect = () => {
    //   return {
    //     x: 0,
    //     y: 0,
    //     bottom: 0,
    //     height: 0,
    //     left: 0,
    //     right: 0,
    //     top: 0,
    //     width: 100,
    //   };
    // };

    // act(() => {
    //   // @ts-ignore
    //   window.resizeObserverListener.map((item) => {
    //     item([
    //       {
    //         target: dom,
    //       },
    //     ]);
    //   });
    // });

    // await waitTime(1000);
    // expect(html.container.querySelector('.ant-pro-right-content-resize')?.textContent).toBe('100');
  });
});
