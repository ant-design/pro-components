import { render } from 'enzyme';

import React from 'react';
import PageHeaderWrapper from '../src/PageHeaderWrapper';

describe('BasicLayout', () => {
  it('base use', () => {
    const html = render(<PageHeaderWrapper />).html();
    expect(html).toMatchSnapshot();
  });

  it('content is text', () => {
    const html = render(<PageHeaderWrapper content="just so so" />).html();
    expect(html).toMatchSnapshot();
  });
});
