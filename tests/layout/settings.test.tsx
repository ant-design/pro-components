import React from 'react';
import { mount } from 'enzyme';
import BasicLayout from '@ant-design/pro-layout';
import { waitForComponentToPaint } from '../util';
import { act } from 'react-dom/test-utils';

describe('settings.test', () => {
  it('set title', async () => {
    const wrapper = mount(<BasicLayout title="test-title" />);
    await waitForComponentToPaint(wrapper);
    let title = wrapper.find('#logo').at(0).text();
    expect(title).toEqual('test-title');
    act(() => {
      wrapper.setProps({
        title: 'Ant Design Pro',
      });
    });
    title = wrapper.find('#logo').text();
    expect(title).toEqual('Ant Design Pro');
  });
});
