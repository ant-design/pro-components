import React from 'react';
import { mount } from 'enzyme';
import { WaterMark } from '@ant-design/pro-layout';

describe('WaterMark', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('test image watermark', (done) => {
    const wrapper = mount(
      <WaterMark
        rotate={0}
        image="https://img.alicdn.com/tfs/TB1YM3LpipE_u4jSZKbXXbCUVXa-280-128.png"
      >
        <div style={{ height: 500 }}>123</div>
      </WaterMark>,
    );

    process.nextTick(() => {
      wrapper.update();
      expect(wrapper).toMatchSnapshot();
      wrapper.unmount();
      done();
    });
  });

  it('test text watermark', (done) => {
    const wrapper = mount(
      <WaterMark content="Trusple">
        <div style={{ height: 500 }} />
      </WaterMark>,
    );

    process.nextTick(() => {
      wrapper.update();
      expect(wrapper).toMatchSnapshot();
      wrapper.unmount();
      done();
    });
  });
});
