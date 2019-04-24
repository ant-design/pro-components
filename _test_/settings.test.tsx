import React from 'react';
import { mount } from 'enzyme';
import BasicLayout from '../src/BasicLayout';
import 'jsdom-global/register';

describe('settings.test', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: false,
          addListener: function() {},
          removeListener: function() {},
        };
      }),
    });
  });

  it('set title', () => {
    const wrapper = mount(<BasicLayout title="test-title" />);
    let title = wrapper.find('#logo').text();
    expect(title).toEqual('test-title');
    wrapper.setProps({
      title: 'Ant Design Pro',
    });
    title = wrapper.find('#logo').text();
    expect(title).toEqual('Ant Design Pro');
  });
});
