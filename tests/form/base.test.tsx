import React from 'react';
import { Button } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { mount } from 'enzyme';
import { waitTime } from '../util';

describe('ProForm', () => {
  it('submit props actionsRender=false', async () => {
    const wrapper = mount(
      <ProForm
        submitterProps={{
          actionsRender: false,
        }}
      />,
    );
    await waitTime();
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('submit props actionsRender=()=>false', async () => {
    const wrapper = mount(
      <ProForm
        submitterProps={{
          actionsRender: () => false,
        }}
      />,
    );
    await waitTime();
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('submit props actionsRender=()=>[]', async () => {
    const wrapper = mount(
      <ProForm
        submitterProps={{
          actionsRender: () => [],
        }}
      />,
    );
    await waitTime();
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('submit props actionsRender=()=>[]', async () => {
    const wrapper = mount(
      <ProForm
        submitterProps={{
          actionsRender: () => [
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

  it('actionsRender simulate onFinish', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <ProForm
        onFinish={onFinish}
        submitterProps={{
          actionsRender: ({ form }) => [
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
});
