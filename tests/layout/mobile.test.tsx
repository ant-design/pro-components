import { render } from 'enzyme';
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
    const html = render(<BasicLayout getContainer={false} />);
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
});
