import { ProLayout } from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import { waitForWaitTime } from '../util';

describe('settings.test', () => {
  it('set title', async () => {
    const wrapper = render(<ProLayout title="test-title" />);
    await waitForWaitTime(160);
    expect(wrapper.getAllByText('test-title')).toBeTruthy();

    wrapper.rerender(<ProLayout title="test-title-2" />);
    expect(wrapper.getAllByText('test-title-2')).toBeTruthy();

    wrapper.unmount();
  });

  // it('RightContent resize', async () => {
  //   //@ts-ignore
  //   const html = render(
  //     <ProLayout
  //       actionsRender={(renProps) => {
  //         return [
  //           <div
  //             key="resize"
  //             id="resize"
  //             style={{
  //               width: 160,
  //             }}
  //           >
  //             {
  //               //@ts-ignore
  //               renProps.rightContentSize
  //             }
  //           </div>,
  //         ];
  //       }}
  //       layout="top"
  //     />,
  //   );

  //   await waitForWaitTime(1000);

  //   const dom = html.container.querySelector('#resize');

  //   // @ts-ignore
  //   dom.getBoundingClientRect = () => {
  //     return {
  //       x: 0,
  //       y: 0,
  //       bottom: 0,
  //       height: 0,
  //       left: 0,
  //       right: 0,
  //       top: 0,
  //       width: 200,
  //     };
  //   };

  //   /** 复制一下方法，方便使用 */
  //   // 为了mock 好辛苦
  //   _el.forEach((value) => {
  //     _el.set(dom!, value);
  //   });

  //   act(() => {
  //     _rs([
  //       // @ts-ignore
  //       {
  //         target: dom!,
  //       },
  //     ]);
  //   });

  //   await waitForWaitTime(1000);

  //   expect(html.container.querySelector('#resize')?.textContent).toBe('200');

  //   // @ts-ignore
  //   dom.getBoundingClientRect = () => {
  //     return {
  //       x: 0,
  //       y: 0,
  //       bottom: 0,
  //       height: 0,
  //       left: 0,
  //       right: 0,
  //       top: 0,
  //       width: 100,
  //     };
  //   };

  //   /** 复制一下方法，方便使用 */
  //   // 为了mock 好辛苦
  //   _el.forEach((value) => {
  //     _el.set(dom!, value);
  //   });

  //   act(() => {
  //     _rs([
  //       // @ts-ignore
  //       {
  //         target: dom!,
  //       },
  //     ]);
  //   });

  //   await waitForWaitTime(1000);
  //   expect(html.container.querySelector('#resize')?.textContent).toBe('100');
  // });
});
