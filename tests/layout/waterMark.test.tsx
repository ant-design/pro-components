/* eslint-disable @typescript-eslint/ban-types */
import { WaterMark } from '@ant-design/pro-components';
import { cleanup, render } from '@testing-library/react';
import { act } from 'react';

afterEach(() => {
  cleanup();
});

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
    const spy = vi.spyOn(global.console, 'error');
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

    expect(spy.mock.calls).toEqual([['当前环境不支持Canvas']]);
    unmount();
    spy.mockRestore();
  });

  it('renders watermark with multiline text content', () => {
    const multilineContent = ['蚂蚁集团', '多行文字'];
    const { container } = render(
      <WaterMark content={multilineContent}>
        <div style={{ height: 500 }}>Content</div>
      </WaterMark>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders watermark with rotation', () => {
    const { container } = render(
      <WaterMark content="Rotated" rotate={45}>
        <div style={{ height: 500 }}>Content</div>
      </WaterMark>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders watermark with custom styles', () => {
    const { container } = render(
      <WaterMark
        content="Custom Style"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
        markStyle={{ color: 'red' }}
      >
        <div style={{ height: 500 }}>Content</div>
      </WaterMark>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders without content when content prop is not provided', () => {
    const { container } = render(
      <WaterMark>
        <div style={{ height: 500 }}>Content</div>
      </WaterMark>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders without watermark when both image and content props are not provided', () => {
    const { container } = render(
      <WaterMark>
        <div style={{ height: 500 }}>Content</div>
      </WaterMark>,
    );
    expect(container).toMatchSnapshot();
  });
});
