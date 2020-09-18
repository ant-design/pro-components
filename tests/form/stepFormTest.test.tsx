import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { StepsFrom, StepsFromProps, ProFormText } from '@ant-design/pro-form';
import { waitTime } from '../util';
import { Button } from 'antd';

describe('StepsFrom', () => {
  it('🐲 basic use', () => {
    const html = mount(
      <StepsFrom>
        <StepsFrom.StepFrom title="表单1">
          <ProFormText name="姓名" />
        </StepsFrom.StepFrom>
        <StepsFrom.StepFrom title="表单2">
          <ProFormText name="邮箱" />
        </StepsFrom.StepFrom>
        <StepsFrom.StepFrom title="表单3">
          <ProFormText name="地址" />
        </StepsFrom.StepFrom>
      </StepsFrom>,
    );
    expect(html.find('span.ant-steps-icon').length).toBe(3);
    expect(html.find('div.ant-steps-item-title').at(0).text()).toBe('表单1');
    expect(html.find('div.ant-steps-item-title').at(1).text()).toBe('表单2');
    expect(html.find('div.ant-steps-item-title').at(2).text()).toBe('表单3');
  });

  it('🐲 renderSteps', () => {
    const html = mount<StepsFromProps>(
      <StepsFrom renderSteps={() => null}>
        <StepsFrom.StepFrom name="base" title="表单1">
          <ProFormText name="姓名" />
        </StepsFrom.StepFrom>
        <StepsFrom.StepFrom name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsFrom.StepFrom>
        <StepsFrom.StepFrom name="extraInfo" title="表单3">
          <ProFormText name="地址" />
        </StepsFrom.StepFrom>
      </StepsFrom>,
    );

    expect(html.find('.ant-steps').exists()).toBeFalsy();

    act(() => {
      html.setProps({
        renderSteps: (_, dom) => <div id="test">{dom}</div>,
      });
    });

    expect(html.find('.ant-steps').exists()).toBeTruthy();
    expect(html.find('div#test').exists()).toBeTruthy();
  });

  it('🐲 pre button ', async () => {
    const onCurrentChange = jest.fn();
    const html = mount<StepsFromProps>(
      <StepsFrom
        current={1}
        onCurrentChange={(current) => {
          onCurrentChange(current);
        }}
      >
        <StepsFrom.StepFrom name="base" title="表单1">
          <ProFormText name="姓名" />
        </StepsFrom.StepFrom>
        <StepsFrom.StepFrom name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsFrom.StepFrom>
        <StepsFrom.StepFrom name="extraInfo" title="表单3">
          <ProFormText name="地址" />
        </StepsFrom.StepFrom>
      </StepsFrom>,
    );
    await waitTime(100);
    act(() => {
      html.find('.ant-pro-steps-form-step-active button.ant-btn').at(0).simulate('click');
    });
    expect(onCurrentChange).toBeCalledWith(0);
  });

  it('🐲 async onFinish', async () => {
    const fn = jest.fn();
    const currentFn = jest.fn();
    const onFinish = jest.fn();

    const html = mount<StepsFromProps>(
      <StepsFrom onCurrentChange={currentFn} onFinish={onFinish}>
        <StepsFrom.StepFrom
          name="base"
          title="表单1"
          onFinish={async (values) => {
            fn(values);
            return true;
          }}
        >
          <ProFormText name="姓名" />
        </StepsFrom.StepFrom>
        <StepsFrom.StepFrom name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsFrom.StepFrom>
      </StepsFrom>,
    );
    await waitTime(100);

    act(() => {
      html.find('.ant-pro-steps-form-step-active button.ant-btn.ant-btn-primary').simulate('click');
    });

    await waitTime(100);

    expect(fn).toBeCalled();
    expect(currentFn).toBeCalled();

    act(() => {
      html
        .find('.ant-pro-steps-form-step')
        .at(1)
        .find('button.ant-btn.ant-btn-primary')
        .simulate('click');
    });
    await waitTime(100);
    expect(onFinish).toBeCalled();
  });

  it('🐲 submitter render=false', () => {
    const html = mount<StepsFromProps>(
      <StepsFrom>
        <StepsFrom.StepFrom
          name="base"
          title="表单1"
          submitter={{
            render: false,
          }}
        >
          <ProFormText name="姓名" />
        </StepsFrom.StepFrom>
        <StepsFrom.StepFrom name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsFrom.StepFrom>
      </StepsFrom>,
    );

    expect(
      html.find('.ant-pro-steps-form-step-active button.ant-btn.ant-btn-primary').exists(),
    ).toBeFalsy();
  });

  it('🐲 submitter=false', () => {
    const html = mount<StepsFromProps>(
      <StepsFrom>
        <StepsFrom.StepFrom name="base" title="表单1" submitter={false}>
          <ProFormText name="姓名" />
        </StepsFrom.StepFrom>
        <StepsFrom.StepFrom name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsFrom.StepFrom>
      </StepsFrom>,
    );

    expect(
      html.find('.ant-pro-steps-form-step-active button.ant-btn.ant-btn-primary').exists(),
    ).toBeFalsy();
  });

  it('🐲 submitter render function', () => {
    const html = mount<StepsFromProps>(
      <StepsFrom>
        <StepsFrom.StepFrom
          name="base"
          title="表单1"
          submitter={{
            render: () => {
              return [
                <Button id="next" key="next">
                  下一步
                </Button>,
              ];
            },
          }}
        >
          <ProFormText name="姓名" />
        </StepsFrom.StepFrom>
        <StepsFrom.StepFrom name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsFrom.StepFrom>
      </StepsFrom>,
    );

    expect(html.find('button#next').exists()).toBeTruthy();
  });
});
