/* eslint-disable @typescript-eslint/ban-types */
import { WaterMark } from '@ant-design/pro-components';
import { act, render } from '@testing-library/react';

describe('WaterMark', () => {
  it('test image watermark', async () => {
    let onloadRef: Function | undefined;

    Object.defineProperty(Image.prototype, 'onload', {
      get() {
        // eslint-disable-next-line no-underscore-dangle
        return this._onload;
      },
      set(onload: Function) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onloadRef = onload;
        // eslint-disable-next-line no-underscore-dangle
        this._onload = onload;
      },
    });
    const { container, unmount } = render(
      <WaterMark
        rotate={0}
        image="https://img.alicdn.com/tfs/TB1YM3LpipE_u4jSZKbXXbCUVXa-280-128.png"
      >
        <div style={{ height: 500 }}>123</div>
      </WaterMark>,
    );

    act(() => {
      onloadRef?.();
    });
    expect(container).toMatchSnapshot();
    unmount();
  });

  it('test text watermark', () => {
    const wrapper = render(
      <WaterMark content="Trusple">
        <div style={{ height: 500 }} />
      </WaterMark>,
    );

    expect(wrapper.asFragment()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('test image watermark', async () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation();
    const createElement = document.createElement.bind(document);
    // @ts-ignore
    document.createElement = (tagName: string) => {
      if (tagName === 'canvas') {
        return {
          setAttribute: () => null,
          getContext: () => null,
          measureText: () => ({}),
        };
      }
      return createElement(tagName);
    };

    const { unmount } = render(
      <WaterMark
        rotate={0}
        image="https://img.alicdn.com/tfs/TB1YM3LpipE_u4jSZKbXXbCUVXa-280-128.png"
      >
        <div style={{ height: 500 }}>123</div>
      </WaterMark>,
    );

    // @ts-ignore
    expect(console.error.mock.calls).toEqual([['当前环境不支持Canvas']]);
    unmount();
    spy.mockRestore();
  });
});
