import React from 'react';
import { mount, render } from 'enzyme';
import { DefaultFooter } from '../../src';

describe('DefaultFooter test', () => {
  it('set title', () => {
    const wrapper = mount(<DefaultFooter links={false} />);

    expect(wrapper.find('.ant-pro-global-footer-links').exists()).toBeFalsy();
  });

  it('copyright support false', () => {
    const wrapper = render(<DefaultFooter copyright={false} />);
    expect(wrapper).toMatchSnapshot();
  });
});
