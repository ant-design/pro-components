import { render, mount } from 'enzyme';
import React from 'react';
import ProLayout, { PageHeaderWrapper } from '../../src';
import defaultProps from './defaultProps';

describe('BasicLayout', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => 'zh-CN'),
      },
    });
  });

  it('base use', () => {
    const html = render(
      <ProLayout {...defaultProps}>
        <PageHeaderWrapper />
      </ProLayout>,
    ).html();
    expect(html).toMatchSnapshot();
  });

  it('content is text', () => {
    const html = render(
      <ProLayout {...defaultProps}>
        <PageHeaderWrapper content="just so so" />
      </ProLayout>,
    ).html();
    expect(html).toMatchSnapshot();
  });

  it('title=false, don not render title view', () => {
    const wrapper = mount(
      <ProLayout {...defaultProps}>
        <PageHeaderWrapper title={false} />
      </ProLayout>,
    );
    expect(wrapper.find('.ant-page-header-heading-title')).toHaveLength(0);
  });

  it('have default title', () => {
    const wrapper = mount(
      <ProLayout {...defaultProps}>
        <PageHeaderWrapper />
      </ProLayout>,
    );
    const titleDom = wrapper.find('.ant-page-header-heading-title');
    expect(titleDom.text()).toEqual('welcome');
  });

  it('title overrides the default title', () => {
    const wrapper = mount(
      <ProLayout {...defaultProps}>
        <PageHeaderWrapper title="name" />
      </ProLayout>,
    );
    const titleDom = wrapper.find('.ant-page-header-heading-title');
    expect(titleDom.text()).toEqual('name');
  });
});
