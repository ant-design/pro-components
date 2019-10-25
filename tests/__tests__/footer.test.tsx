import React from 'react';
import { mount } from 'enzyme';
import { DefaultFooter } from '../../src';

describe('DefaultFooter test', () => {
  it('set title', () => {
    const wrapper = mount(<DefaultFooter links={false} />);

    expect(wrapper.find('.ant-pro-global-footer-links').exists()).toBeFalsy();
  });
});
