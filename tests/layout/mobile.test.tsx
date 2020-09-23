import { mount, render } from 'enzyme';
import React from 'react';
import BasicLayout from '@ant-design/pro-layout';

import { waitForComponentToPaint } from '../util';

describe('mobile BasicLayout', () => {
  beforeAll(() => {
    Object.defineProperty(global.window, 'matchMedia', {
      value: jest.fn((query) => {
        //  (max-width: 575px)
        return {
          matches: query.includes('max-width'),
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      }),
    });
  });

  it('📱 base use', async () => {
    const html = render(<BasicLayout getContainer={false} onCollapse={() => {}} />);
    waitForComponentToPaint(html);
    expect(html).toMatchSnapshot();
  });

  it('📱 collapsed=false', async () => {
    const html = render(<BasicLayout getContainer={false} collapsed={false} />);
    waitForComponentToPaint(html);
    expect(html).toMatchSnapshot();
  });

  it('📱 layout=mix', async () => {
    const html = render(<BasicLayout getContainer={false} layout="mix" collapsed={false} />);
    waitForComponentToPaint(html);
    expect(html).toMatchSnapshot();
  });

  it('📱 layout menuHeaderRender=false', async () => {
    const html = render(
      <BasicLayout collapsed getContainer={false} layout="mix" menuHeaderRender={false} />,
    );
    waitForComponentToPaint(html);
    expect(html).toMatchSnapshot();
  });

  it('📱 layout menuHeaderRender', async () => {
    const html = render(
      <BasicLayout collapsed getContainer={false} layout="mix" menuHeaderRender={() => 'title'} />,
    );
    waitForComponentToPaint(html);
    expect(html).toMatchSnapshot();
  });

  it('📱 layout menuHeaderRender', async () => {
    const html = render(
      <BasicLayout collapsed getContainer={false} layout="mix" menuHeaderRender={() => 'title'} />,
    );
    waitForComponentToPaint(html);
    expect(html).toMatchSnapshot();
  });

  it('📱 layout menuHeaderRender', async () => {
    const onCollapse = jest.fn();
    const html = mount(
      <BasicLayout
        onCollapse={onCollapse}
        collapsed
        getContainer={false}
        layout="mix"
        menuHeaderRender={() => 'title'}
      />,
    );
    waitForComponentToPaint(html);
    html.find('.ant-pro-sider-collapsed-button').map((item) => item && item.simulate('click'));
    expect(onCollapse).toHaveBeenCalled();
    html.unmount();
  });
});
