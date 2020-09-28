import React from 'react';
import { Button } from 'antd';
import ProForm, { ProFormText, ProFormDatePicker } from '@ant-design/pro-form';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { waitTime, waitForComponentToPaint } from '../util';

describe('ProForm', () => {
  it('📦 submit props actionsRender=false', async () => {
    const wrapper = mount(<ProForm submitter={false} />);
    await waitTime();
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('📦 onFinish should simulate button loading', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <ProForm
        onFinish={async () => {
          fn();
          await waitTime(2000);
        }}
      />,
    );

    await waitForComponentToPaint(wrapper, 200);
    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper, 200);
    expect(wrapper.find('.ant-btn-loading').exists()).toBe(true);
    expect(fn).toBeCalled();
  });

  it('📦 submit props actionsRender=()=>false', async () => {
    const wrapper = mount(
      <ProForm
        submitter={{
          render: () => false,
        }}
      />,
    );
    await waitTime();
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('📦 submit props actionsRender=()=>[]', async () => {
    const wrapper = mount(
      <ProForm
        submitter={{
          render: () => [],
        }}
      />,
    );
    await waitTime();
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('📦 submit props render=()=>[]', async () => {
    const wrapper = mount(
      <ProForm
        submitter={{
          render: () => [
            <Button key="submit" type="primary">
              提交并发布
            </Button>,
          ],
        }}
      />,
    );
    await waitTime();
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('📦 submitter props support submitButtonProps', async () => {
    const wrapper = mount(
      <ProForm
        submitter={{
          submitButtonProps: {
            loading: true,
          },
        }}
      />,
    );
    await waitTime();
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('📦 submitter props support resetButtonProps', async () => {
    const wrapper = mount(
      <ProForm
        submitter={{
          resetButtonProps: {
            loading: true,
          },
        }}
      />,
    );
    await waitTime();
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('📦 submitter.render simulate onFinish', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <ProForm
        onFinish={onFinish}
        submitter={{
          render: ({ form }) => [
            <Button
              id="submit"
              key="submit"
              type="primary"
              onClick={() => {
                form.submit();
              }}
            >
              提交并发布
            </Button>,
          ],
        }}
      >
        <ProFormText label="name" name="name" />
      </ProForm>,
    );
    await waitTime();

    wrapper.find('button#submit').simulate('click');
    await waitTime(100);

    expect(onFinish).toBeCalled();
  });

  it('📦 DatePicker', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <ProForm
        onFinish={onFinish}
        initialValues={{
          date: '2020-09-10',
          dateWeek: '2020-37th',
          dateMonth: '2020-09',
          dateQuarter: '2020-Q2',
        }}
      >
        <ProFormDatePicker name="date" label="日期" fieldProps={{ open: true }} />
        <ProFormDatePicker.Week name="dateWeek" label="周" />
        <ProFormDatePicker.Month name="dateMonth" label="月" />
        <ProFormDatePicker.Quarter name="dateQuarter" label="季度" />
        <ProFormDatePicker.Year name="dateYear" label="年" />
      </ProForm>,
    );

    wrapper.find('.ant-picker-cell').at(2).simulate('click');
    wrapper.find('.ant-btn-primary').simulate('submit');
    await waitTime();
    expect(onFinish).toHaveBeenCalledWith({
      date: '2020-09-01',
      dateWeek: '2020-37th',
      dateMonth: '2020-09',
      dateQuarter: '2020-Q2',
    });
  });
});
