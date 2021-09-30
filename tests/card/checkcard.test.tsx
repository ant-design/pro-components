import React from 'react';
import { mount } from 'enzyme';
import { CheckCard } from '@ant-design/pro-card';

describe('CheckCard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should invoke onChange and onClick function when click option', () => {
    const onChange = jest.fn();
    const onClick = jest.fn();
    const wrapper = mount(<CheckCard title="示例一" onChange={onChange} onClick={onClick} />);

    wrapper.find('.ant-pro-checkcard').at(0).simulate('click');

    jest.runAllTimers();
    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(onClick).toHaveBeenCalled();
    wrapper.unmount();
  });

  it('should invoke onChange function when group click option', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <CheckCard.Group
        onChange={onChange}
        options={[
          { title: '苹果', value: 'Apple' },
          { title: '梨', value: 'Pear' },
          { title: '橙子', value: 'Orange' },
        ]}
        size="large"
      />,
    );

    wrapper.find('.ant-pro-checkcard').at(0).simulate('click');

    jest.runAllTimers();
    expect(onChange).toHaveBeenLastCalledWith('Apple');

    wrapper.find('.ant-pro-checkcard').at(0).simulate('click');

    jest.runAllTimers();
    expect(onChange).toHaveBeenLastCalledWith(undefined);

    wrapper.find('.ant-pro-checkcard').at(1).simulate('click');

    jest.runAllTimers();
    expect(onChange).toHaveBeenLastCalledWith('Pear');
    wrapper.unmount();
  });

  it('should be controlled by value', () => {
    const wrapper = mount(
      <CheckCard.Group
        options={[
          { title: '苹果', value: 'Apple' },
          { title: '梨', value: 'Pear' },
          { title: '橙子', value: 'Orange' },
        ]}
      />,
    );

    expect(wrapper.find('.ant-pro-checkcard-checked').length).toBe(0);
    wrapper.setProps({ value: ['Apple'] });
    wrapper.update();
    expect(wrapper.find('.ant-pro-checkcard-checked').length).toBe(0);

    wrapper.unmount();
  });

  it('should invoke onChange function when group click option in multiple mode', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <CheckCard.Group
        onChange={onChange}
        options={['Apple', 'Pear', 'Orange']}
        size="large"
        multiple
      />,
    );

    wrapper.find('.ant-pro-checkcard').at(0).simulate('click');

    jest.runAllTimers();
    expect(onChange).toHaveBeenLastCalledWith(['Apple']);

    wrapper.find('.ant-pro-checkcard').at(1).simulate('click');

    jest.runAllTimers();
    expect(onChange).toHaveBeenLastCalledWith(['Apple', 'Pear']);

    wrapper.find('.ant-pro-checkcard').at(1).simulate('click');

    jest.runAllTimers();
    expect(onChange).toHaveBeenLastCalledWith(['Apple']);

    wrapper.unmount();
  });

  it('should disabled onChange when group disabled', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <CheckCard.Group onChange={onChange} disabled defaultValue="A">
        <CheckCard title="Card A" description="选项一" value="A" />
        <CheckCard title="Card B" description="选项二" value="B" />
      </CheckCard.Group>,
    );

    wrapper.find('.ant-pro-checkcard').at(0).simulate('click');

    jest.runAllTimers();
    expect(onChange).not.toHaveBeenCalled();
    wrapper.unmount();
  });
});
