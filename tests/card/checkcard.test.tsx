import React from 'react';
import { mount } from 'enzyme';
import { CheckCard } from '@ant-design/pro-card';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint } from '../util';

describe('CheckCard', () => {
  it('should invoke onChange and onClick function when click option', async () => {
    const onChange = jest.fn();
    const onClick = jest.fn();
    const wrapper = mount(
      <CheckCard
        title="示例一"
        onChange={(e) => {
          onChange(e);
        }}
        onClick={onClick}
      />,
    );

    act(() => {
      wrapper.find('.ant-pro-checkcard').simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    expect(onChange).toBeCalledWith(true);
    expect(onClick).toHaveBeenCalled();

    act(() => {
      wrapper.unmount();
    });
  });

  it('should invoke onChange function when group click option', async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <CheckCard.Group
        onChange={(e) => onChange(e)}
        options={[
          { title: '苹果', value: 'Apple' },
          { title: '梨', value: 'Pear' },
          { title: '橙子', value: 'Orange' },
        ]}
        size="large"
      />,
    );
    act(() => {
      wrapper.find('.ant-pro-checkcard').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(onChange).toHaveBeenLastCalledWith('Apple');

    act(() => {
      wrapper.find('.ant-pro-checkcard').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(onChange).toHaveBeenLastCalledWith(undefined);
    act(() => {
      wrapper.find('.ant-pro-checkcard').at(1).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(onChange).toHaveBeenLastCalledWith('Pear');

    act(() => {
      wrapper.unmount();
    });
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

  it('should invoke onChange function when group click option in multiple mode', async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <CheckCard.Group
        onChange={(e) => onChange(e)}
        options={['Apple', 'Pear', 'Orange']}
        size="large"
        multiple
      />,
    );
    act(() => {
      wrapper.find('.ant-pro-checkcard').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(onChange).toHaveBeenLastCalledWith(['Apple']);

    act(() => {
      wrapper.find('.ant-pro-checkcard').at(1).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(onChange).toHaveBeenLastCalledWith(['Apple', 'Pear']);
    act(() => {
      wrapper.find('.ant-pro-checkcard').at(1).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(onChange).toHaveBeenLastCalledWith(['Apple']);
    act(() => {
      wrapper.unmount();
    });
  });

  it('should support defaultValue', async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <CheckCard.Group onChange={(e) => onChange(e)} defaultValue="A">
        <CheckCard title="Card A" description="选项一" value="A" />
        <CheckCard title="Card B" description="选项二" value="B" />
      </CheckCard.Group>,
    );
    expect(
      wrapper.find('.ant-pro-checkcard').at(0).hasClass('ant-pro-checkcard-checked'),
    ).toBeTruthy();

    act(() => {
      wrapper.find('.ant-pro-checkcard').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(onChange).toHaveBeenCalledWith(undefined);

    act(() => {
      wrapper.find('.ant-pro-checkcard').at(1).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(onChange).toHaveBeenCalledWith('B');

    act(() => {
      wrapper.unmount();
    });
  });

  it('should support defaultValue in multiple mode', async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <CheckCard.Group onChange={(e) => onChange(e)} defaultValue={['A']} multiple>
        <CheckCard title="Card A" description="选项一" value="A" />
        <CheckCard title="Card B" description="选项二" value="B" />
      </CheckCard.Group>,
    );
    expect(
      wrapper.find('.ant-pro-checkcard').at(0).hasClass('ant-pro-checkcard-checked'),
    ).toBeTruthy();

    act(() => {
      wrapper.find('.ant-pro-checkcard').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(onChange).toHaveBeenCalledWith([]);

    act(() => {
      wrapper.find('.ant-pro-checkcard').at(1).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(onChange).toHaveBeenCalledWith(['B']);

    act(() => {
      wrapper.unmount();
    });
  });

  it('should disabled onChange when group disabled', async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <CheckCard.Group onChange={(e) => onChange(e)} disabled defaultValue="A">
        <CheckCard title="Card A" description="选项一" value="A" />
        <CheckCard title="Card B" description="选项二" value="B" />
      </CheckCard.Group>,
    );
    act(() => {
      wrapper.find('.ant-pro-checkcard').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(onChange).not.toHaveBeenCalled();
    act(() => {
      wrapper.unmount();
    });
  });
});
