import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { StepsForm, ProFormText } from '@ant-design/pro-form';
import { waitTime, waitForComponentToPaint } from '../util';

describe('StepsFrom', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  it('basic use', async () => {
    const html = mount(
      <StepsForm>
        <StepsForm.StepForm title="表单1">
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm title="表单2">
          <ProFormText name="邮箱" />
        </StepsForm.StepForm>
        <StepsForm.StepForm title="表单3">
          <ProFormText name="地址" />
        </StepsForm.StepForm>
      </StepsForm>,
    );
    expect(html.find('span.ant-steps-icon').length).toBe(3);
    expect(html.find('div.ant-steps-item-title').at(0).text()).toBe('表单1');
    expect(html.find('div.ant-steps-item-title').at(1).text()).toBe('表单2');
    expect(html.find('div.ant-steps-item-title').at(2).text()).toBe('表单3');
  });

  fit('onFinish', async () => {
    const html = mount(
      <StepsForm onCurrentChange={(cr) => console.log(cr)}>
        <StepsForm.StepForm name="base" title="表单1">
          <ProFormText name="姓名" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="moreInfo" title="表单2">
          <ProFormText name="邮箱" />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="extraInfo" title="表单3">
          <ProFormText name="地址" />
        </StepsForm.StepForm>
      </StepsForm>,
    );

    act(() => {
      jest.runAllTimers();
    });

    act(() => {
      html
        .find('.ant-pro-form-steps-form-step-active button.ant-btn.ant-btn-primary')
        .simulate('click');
    });

    expect(
      html.find('.ant-pro-form-steps-form-step-active button.ant-btn.ant-btn-primary').text(),
    ).toBe('下一步');
  });
});
