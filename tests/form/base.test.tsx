import React from 'react';
import { Button } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { mount } from 'enzyme';
import { waitTime } from '../util';

describe('ProForm', () => {
  it('submit props actionsRender=false', async () => {
    const wrapper = mount(<ProForm submitter={false} />);
    await waitTime();
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('submit props actionsRender=()=>false', async () => {
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

  it('submit props actionsRender=()=>[]', async () => {
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

  it('submit props render=()=>[]', async () => {
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

  it('submitter.render simulate onFinish', async () => {
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
});
