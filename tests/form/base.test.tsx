import { FontSizeOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, {
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormColorPicker,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormDigitRange,
  ProFormField,
  ProFormSelect,
  ProFormText,
  ProFormTimePicker,
  ProFormTreeSelect,
} from '@ant-design/pro-form';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, ConfigProvider, Input } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef } from 'react';
import { waitForWaitTime } from '../util';

describe('ProForm', () => {
  it('📦 submit props actionsRender=false', async () => {
    const wrapper = render(<ProForm submitter={false} />);

    expect(wrapper.asFragment()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('📦 componentSize is work', async () => {
    const wrapper = render(
      <ConfigProvider componentSize="small">
        <ProForm>
          <ProFormText />
        </ProForm>
      </ConfigProvider>,
    );
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>('.ant-input-sm').length,
    ).toBe(1);
    wrapper.unmount();
  });

  it('📦 addonAfter should work for ProFormCheck', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ProForm
        onFinish={async (e) => {
          fn(e.checked);
        }}
      >
        <ProFormCheckbox addonAfter="选择" name="checked">
          确定同意
        </ProFormCheckbox>
      </ProForm>,
    );

    wrapper.findAllByText('确定同意');

    await act(async () => {
      (await wrapper.findByText('确定同意')).click?.();
    });

    await act(async () => {
      (await wrapper.findByText('提 交')).click?.();
    });

    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith(true);
    });
  });

  it('📦 ProForm support sync form url', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.navTheme);
        }}
        syncToUrl
      >
        <ProFormText
          tooltip={{
            title: '主题',
            icon: <FontSizeOutlined />,
          }}
          name="navTheme"
        />
      </ProForm>,
    );

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    expect(fn).toHaveBeenCalledWith('realDark');

    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLHtmlElement>('button.ant-btn')[1]
        .click();
    });

    expect(fn).toHaveBeenCalledWith('realDark');
  });

  it('📦 ProForm support sync form url as important', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.navTheme);
        }}
        syncToUrl
        syncToUrlAsImportant
      >
        <ProFormText
          tooltip={{
            title: '主题',
            icon: <FontSizeOutlined />,
          }}
          name="navTheme"
        />
      </ProForm>,
    );

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });
    expect(fn).toHaveBeenCalledWith('realDark');

    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('button.ant-btn')[1]
        .click();
    });

    expect(fn).toHaveBeenCalledWith('realDark');
    wrapper.unmount();
  });

  it('📦 ProForm support sync form url and rest', async () => {
    const onFinish = jest.fn();
    const wrapper = render(
      <ProForm
        onFinish={async (values) => {
          onFinish(values.navTheme);
        }}
        syncToUrl
        syncToInitialValues={false}
      >
        <ProFormText name="navTheme" />
        <ProForm.Item shouldUpdate>
          {() => {
            return '123';
          }}
        </ProForm.Item>
      </ProForm>,
    );

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    expect(onFinish).toHaveBeenCalledWith('realDark');

    // rest
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('button.ant-btn')[1]
        .click();
    });

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    expect(onFinish).toHaveBeenCalledWith(undefined);
    wrapper.unmount();
  });

  it('📦 ProForm initialValues update will warning', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ProForm
        onFinish={async (values) => {
          fn(values.navTheme);
        }}
        initialValues={{}}
      >
        <ProFormText name="navTheme" />
      </ProForm>,
    );

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });
    expect(fn).toHaveBeenCalledWith(undefined);

    act(() => {
      wrapper.rerender(
        <ProForm
          onFinish={async (values) => {
            fn(values.navTheme);
          }}
          initialValues={{ navTheme: 'xxx' }}
        >
          <ProFormText name="navTheme" />
        </ProForm>,
      );
    });

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });
    expect(fn).toHaveBeenCalledWith(undefined);
  });

  it('📦 onFinish should simulate button loading', async () => {
    const fn = jest.fn();
    jest.useFakeTimers();
    const wrapper = render(
      <ProForm
        onFinish={async () => {
          fn();
          return new Promise((resolve) => {
            return setTimeout(() => {
              resolve(true);
            }, 4000);
          });
        }}
      />,
    );

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });
    const dom = await (await wrapper.findByText('提 交')).parentElement;
    expect(dom?.className.includes('ant-btn-loading')).toBe(true);
    expect(fn).toBeCalled();
    wrapper.unmount();
    jest.useRealTimers();
  });

  it('📦 onFinish should simulate button close loading', async () => {
    jest.useFakeTimers();

    const fn = jest.fn();
    const wrapper = render(
      <ProForm
        onFinish={async () => {
          fn();
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject(new Error('期贤'));
            }, 4000);
          });
        }}
      />,
    );

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });
    let dom: HTMLElement | undefined | null;
    await act(async () => {
      dom = await (await wrapper.findByText('提 交')).parentElement;
    });
    expect(dom?.className.includes('ant-btn-loading')).toBe(true);
    expect(fn).toBeCalled();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    await act(async () => {
      dom = await (await wrapper.findByText('提 交')).parentElement;
    });

    expect(dom?.className.includes('ant-btn-loading')).toBe(false);
    jest.useRealTimers();
  });

  it('📦 onFinish support params and request', async () => {
    const wrapper = render(
      <ProForm
        request={async (params) => {
          return params;
        }}
        params={{
          name: 'test',
        }}
      >
        <ProFormText name="name" />
      </ProForm>,
    );

    await wrapper.findByText('提 交');
    expect(!!(await wrapper.findByDisplayValue('test'))).toBeTruthy();

    act(() => {
      wrapper.rerender(
        <ProForm
          key="rerender"
          request={async (params) => {
            return params;
          }}
          params={{
            name: '1234',
          }}
        >
          <ProFormText name="name" />
        </ProForm>,
      );
    });
    await wrapper.findByText('提 交');
    expect(!!(await wrapper.findByDisplayValue('1234'))).toBeTruthy();
    wrapper.unmount();
  });

  it('📦 request rewrite initialsValue', async () => {
    const wrapper = render(
      <ProForm
        request={async () => {
          return {
            name: '100',
          };
        }}
        initialValues={{
          name: '不是1000',
        }}
      >
        <ProFormText name="name" />
      </ProForm>,
    );
    await wrapper.findByText('提 交');
    expect(!!(await wrapper.findByDisplayValue('100'))).toBeTruthy();
    wrapper.unmount();
  });

  it('📦 submit props actionsRender=()=>false', async () => {
    const wrapper = render(
      <ProForm
        submitter={{
          render: () => false,
        }}
      >
        text
      </ProForm>,
    );
    await wrapper.findByText('text');
    expect(wrapper.asFragment()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('📦 submit props actionsRender is one', async () => {
    const wrapper = render(
      <ProForm
        submitter={{
          render: () => [<a key="test">test</a>],
        }}
      />,
    );
    await wrapper.findByText('test');
    expect(wrapper.asFragment()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('📦 support formRef', async () => {
    const formRef = React.createRef<ProFormInstance<any>>();
    const wrapper = render(
      <ProForm
        formRef={formRef}
        submitter={{
          render: () => [<a key="test">test</a>],
        }}
        initialValues={{
          test: '12,34',
        }}
      >
        <ProFormText
          name="test"
          transform={(value) => {
            return {
              test: value.split(','),
            };
          }}
        />
      </ProForm>,
    );
    await wrapper.findByText('test');

    expect(formRef.current?.getFieldFormatValue?.('test')?.join('-')).toBe(
      '12-34',
    );
    expect(
      formRef.current?.getFieldFormatValueObject?.('test')?.test.join('-'),
    ).toBe('12-34');
    expect(formRef.current?.getFieldFormatValueObject?.()?.test.join('-')).toBe(
      '12-34',
    );
    expect(formRef.current?.getFieldsFormatValue?.()?.test.join('-')).toBe(
      '12-34',
    );
    expect(formRef.current?.getFieldFormatValue?.(['test'])?.join('-')).toBe(
      '12-34',
    );
    expect(formRef.current?.getFieldValue?.('test')).toBe('12,34');
    wrapper.unmount();
  });

  it('📦 ProForm support namePath is array', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ProForm
        initialValues={{
          name: {
            test: 'test',
          },
          test: 'test2',
        }}
        isKeyPressSubmit
        onFinish={async (params) => {
          fn(params);
        }}
      >
        <ProFormText name={['name', 'test']} />
        <ProFormText name="test" />
      </ProForm>,
    );

    await wrapper.findByText('提 交');
    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    expect(fn).toBeCalledWith({
      name: {
        test: 'test',
      },
      test: 'test2',
    });
    wrapper.unmount();
  });

  it('📦 ProForm support enter submit', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ProForm
        omitNil={false}
        isKeyPressSubmit
        onFinish={async () => {
          fn();
        }}
      >
        <ProFormText name="test" />
      </ProForm>,
    );

    await wrapper.findByText('提 交');
    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    expect(fn).toBeCalled();
    wrapper.unmount();
  });

  it('📦 submit props actionsRender=false', async () => {
    const wrapper = render(
      <ProForm
        submitter={{
          render: false,
        }}
      />,
    );

    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('📦 submit props actionsRender=()=>[]', async () => {
    const wrapper = render(
      <ProForm
        submitter={{
          render: () => [],
        }}
      />,
    );

    expect(wrapper.asFragment()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('📦 submit props render=()=>[]', async () => {
    const wrapper = render(
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
    await wrapper.findByText('提交并发布');
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('📦 submitter props support submitButtonProps', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ProForm
        submitter={{
          submitButtonProps: {
            className: 'test_button',
            onClick: () => {
              fn();
            },
          },
        }}
      />,
    );

    await wrapper.findByText('提 交');

    act(() => {
      expect(wrapper.asFragment()).toMatchSnapshot();
    });

    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('button.test_button')[0]
        .click();
    });

    expect(fn).toBeCalled();
    wrapper.unmount();
  });

  it('📦 submitter props support resetButtonProps', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ProForm
        submitter={{
          resetButtonProps: {
            className: 'test_button',
            onClick: () => {
              fn();
            },
          },
        }}
      />,
    );

    await wrapper.findByText('提 交');

    act(() => {
      expect(wrapper.asFragment()).toMatchSnapshot();
    });
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('button.test_button')[0]
        .click();
    });
    expect(fn).toBeCalled();
    wrapper.unmount();
  });

  it('📦 submitter.render simulate onFinish', async () => {
    const onFinish = jest.fn();
    const wrapper = render(
      <ProForm
        onFinish={onFinish}
        submitter={{
          render: ({ form }) => [
            <Button
              id="submit"
              key="submit"
              type="primary"
              onClick={() => {
                form?.submit();
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
    await wrapper.findByText('提交并发布');
    await act(async () => {
      (await wrapper.findByText('提交并发布')).click();
    });

    expect(onFinish).toBeCalled();
    wrapper.unmount();
  });

  it('📦 ProFormCaptcha support onGetCaptcha', async () => {
    jest.useFakeTimers();
    const wrapper = render(
      <ProForm>
        <ProFormCaptcha
          onGetCaptcha={async () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 2000);
            });
          }}
          captchaProps={{
            id: 'test',
          }}
          countDown={2}
          label="name"
          name="name"
        />
      </ProForm>,
    );

    await wrapper.findByText('提 交');

    let captcha = await wrapper.findByText('获取验证码');

    expect(!!captcha).toBeTruthy();

    await act(async () => {
      (await wrapper.findByText('获取验证码'))?.click();
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    await wrapper.findByText('2 秒后重新获取');

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    captcha = await wrapper.findByText('获取验证码');

    expect(!!captcha).toBeTruthy();

    wrapper.unmount();

    jest.useRealTimers();
  });

  it('📦 ProFormCaptcha support value and onchange', async () => {
    const onFinish = jest.fn();
    const wrapper = render(
      <ProForm onFinish={(values) => onFinish(values.name)}>
        <ProFormCaptcha
          onGetCaptcha={async () => {
            await waitForWaitTime(10);
          }}
          countDown={2}
          label="name"
          name="name"
        />
      </ProForm>,
    );
    await wrapper.findByText('提 交');

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelectorAll<HTMLElement>('input#name')[0],
        {
          target: {
            value: 'test',
          },
        },
      );
    });

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    expect(onFinish).toBeCalledWith('test');
    wrapper.unmount();
  });

  it('📦 ProFormCaptcha support captchaTextRender', async () => {
    jest.useFakeTimers();
    const wrapper = render(
      <ProForm>
        <ProFormCaptcha
          onGetCaptcha={async () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 200);
            });
          }}
          captchaTextRender={(timing) => (timing ? '重新获取' : '获取')}
          captchaProps={{
            id: 'test',
          }}
          label="name"
          name="name"
        />
      </ProForm>,
    );
    await wrapper.findByText('提 交');

    const firstCaptcha = await wrapper.findByText('获 取');
    expect(!!firstCaptcha).toBeTruthy();

    await act(async () => {
      const captcha = await wrapper.findByText('获 取');
      captcha?.click();
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    const captcha = await wrapper.findByText('重新获取');
    expect(!!captcha).toBeTruthy();
    jest.useRealTimers();
  });

  it('📦 ProFormCaptcha onGetCaptcha throw error', async () => {
    const wrapper = render(
      <ProForm>
        <ProFormCaptcha
          onGetCaptcha={async () => {
            throw new Error('TEST');
          }}
          captchaTextRender={(timing) => (timing ? '重新获取' : '获取')}
          captchaProps={{
            id: 'test',
          }}
          label="name"
          name="name"
        />
      </ProForm>,
    );

    await wrapper.findByText('提 交');

    act(() => {
      fireEvent.click(wrapper.baseElement.querySelector('#test')!);
    });

    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>('button#test')[0]
        .textContent,
    ).toBe('获 取');
    wrapper.unmount();
  });

  it('📦 ProFormCaptcha onGetCaptcha support rules', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ProForm>
        <ProFormText
          name="phone"
          rules={[
            {
              required: true,
            },
          ]}
        />
        <ProFormCaptcha
          onGetCaptcha={async () => {
            fn();
          }}
          phoneName="phone"
          captchaProps={{
            id: 'test',
          }}
          label="name"
          name="name"
        />
      </ProForm>,
    );

    const captcha = await wrapper.findByText('获取验证码');

    expect(!!captcha).toBeTruthy();

    await act(async () => {
      (await wrapper.findByText('获取验证码'))?.click();
    });

    expect(fn).not.toBeCalled();

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelectorAll<HTMLElement>('input')[1],
        {
          target: {
            value: 'tech',
          },
        },
      );
    });

    await act(async () => {
      captcha.click();
    });

    expect(fn).toBeCalled();
    wrapper.unmount();
  });

  it('📦 ProFormDependency', async () => {
    const onFinish = jest.fn();
    const wrapper = render(
      <ProForm
        onFinish={onFinish}
        initialValues={{
          name: '蚂蚁设计有限公司',
          name2: '蚂蚁设计集团',
          useMode: 'chapter',
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormText
          width="md"
          name={['name2', 'text']}
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        {/*  ProFormDependency 会自动注入并且 进行 shouldUpdate 的比对  */}
        <ProFormDependency name={['name', ['name2', 'text']]}>
          {(values) => {
            return (
              <ProFormSelect
                options={[
                  {
                    value: 'chapter',
                    label: '盖章后生效',
                  },
                ]}
                width="md"
                name="useMode"
                label={
                  <span id="label_text">{`与《${values?.name || ''}》 与 《${
                    values?.name2?.text || ''
                  }》合同约定生效方式`}</span>
                }
              />
            );
          }}
        </ProFormDependency>
      </ProForm>,
    );

    await wrapper.findByText('提 交');
    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelectorAll<HTMLElement>('input#name')[0],
        {
          target: {
            value: 'test',
          },
        },
      );
    });

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelectorAll<HTMLElement>(
          'input#name2_text',
        )[0],
        {
          target: {
            value: 'test2',
          },
        },
      );
    });

    expect(
      wrapper.baseElement.querySelector<HTMLElement>('span#label_text')
        ?.textContent,
    ).toBe('与《test》 与 《test2》合同约定生效方式');
    wrapper.unmount();
  });

  it('📦 ProForm.Group support collapsible', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ProForm>
        <ProForm.Group title="qixian" collapsible onCollapse={(c) => fn(c)}>
          <ProFormText name="phone" />
          <ProFormText name="phone2" />
        </ProForm.Group>
      </ProForm>,
    );
    await wrapper.findByText('提 交');
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-pro-form-group-title')[0]
        .click();
    });

    expect(fn).toBeCalledWith(true);

    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-pro-form-group-title')[0]
        .click();
    });

    expect(fn).toBeCalledWith(false);
    wrapper.unmount();
  });

  it('📦 ProForm.Group support defaultCollapsed', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ProForm>
        <ProForm.Group
          title="qixian"
          collapsible
          defaultCollapsed={true}
          onCollapse={(c) => fn(c)}
        >
          <ProFormText name="phone" />
          <ProFormText name="phone2" />
        </ProForm.Group>
      </ProForm>,
    );
    await wrapper.findByText('提 交');
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-pro-form-group-title')[0]
        .click();
    });

    expect(fn).toBeCalledWith(false);

    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-pro-form-group-title')[0]
        .click();
    });

    expect(fn).toBeCalledWith(true);
    wrapper.unmount();
  });

  it('📦 ProForm.Group support defaultCollapsed', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ProForm>
        <ProForm.Group
          title="qixian"
          collapsible
          extra={<a id="click">点击</a>}
          onCollapse={(c) => fn(c)}
        >
          <ProFormText name="phone" />
          <ProFormText name="phone2" />
        </ProForm.Group>
      </ProForm>,
    );
    await wrapper.findByText('提 交');
    act(() => {
      wrapper.baseElement.querySelectorAll<HTMLElement>('#click')[0].click();
    });

    expect(fn).not.toBeCalled();
    wrapper.unmount();
  });

  it('📦 ProForm.Group support FormItem hidden', async () => {
    const wrapper = render(
      <ProForm>
        <ProForm.Group title="qixian" collapsible>
          <ProFormText name="mobile" hidden />
          <div>mobile</div>
          <ProFormText name="mobile2" />
        </ProForm.Group>
      </ProForm>,
    );
    await wrapper.findByText('提 交');
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        '.ant-pro-form-group-container div.ant-form-item',
      ).length,
    ).toBe(1);
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        '.ant-pro-form-group-container div.ant-space-item',
      ).length,
    ).toBe(2);
    wrapper.unmount();
  });

  it('📦 ProFormField support onChange in ProForm', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ProForm onValuesChange={fn}>
        <ProFormField name="phone2">
          <Input id="testInput" />
        </ProFormField>
      </ProForm>,
    );
    await wrapper.findByText('提 交');
    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelectorAll<HTMLElement>('input#testInput')[0],
        {
          target: {
            value: 'test',
          },
        },
      );
    });
    expect(fn).toBeCalled();
    wrapper.unmount();
  });

  it('📦 ProFormField support onChange', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <ProForm>
        <ProFormField
          name="phone2"
          // @ts-ignore
          onChange={(e) => {
            fn(e.target.value);
          }}
        >
          <Input id="testInput" />
        </ProFormField>
      </ProForm>,
    );

    await wrapper.findByText('提 交');

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelectorAll<HTMLElement>('input#testInput')[0],
        {
          target: {
            value: 'test',
          },
        },
      );
    });
    expect(fn).toBeCalled();
    wrapper.unmount();
  });

  it('📦 DatePicker support dateformat', async () => {
    const onFinish = jest.fn();
    const wrapper = render(
      <ProForm
        onFinish={onFinish}
        initialValues={{
          date: '2020-09-10',
          dateMonth: '2020-09',
        }}
      >
        <ProFormDatePicker
          name="date"
          label="日期"
          fieldProps={{ open: true }}
        />
        <ProFormDatePicker.Month name="dateMonth" label="月" />
        <ProFormDatePicker.Year name="dateYear" label="年" />
      </ProForm>,
    );

    await wrapper.findByText('提 交');

    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-picker-cell')[2]
        .click();
    });

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    expect(onFinish).toHaveBeenCalledWith({
      date: '2020-09-01',
      dateMonth: '2020-09',
    });
    wrapper.unmount();
  });

  it('📦 SearchSelect onSearch support', async () => {
    const onSearch = jest.fn();
    const wrapper = render(
      <ProForm>
        <ProFormSelect.SearchSelect
          name="userQuery"
          label="查询选择器"
          fieldProps={{
            onSearch: (e) => onSearch(e),
          }}
          options={[
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ]}
        />
      </ProForm>,
    );

    await wrapper.findByText('查询选择器');

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: '全',
          },
        },
      );
    });

    expect(onSearch).toBeCalledWith('全');

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        '.ant-select-item-option-content div span',
      )[0].textContent,
    ).toBe('全');
    wrapper.unmount();
  });

  it('📦 SearchSelect onSearch support valueEnum', async () => {
    const onSearch = jest.fn();
    const wrapper = render(
      <ProForm>
        <ProFormSelect.SearchSelect
          name="userQuery"
          label="查询选择器"
          fieldProps={{
            onSearch: (e) => onSearch(e),
          }}
          valueEnum={{
            all: { text: '全部', status: 'Default' },
            open: {
              text: '未解决',
              status: 'Error',
            },
            closed: {
              text: '已解决',
              status: 'Success',
            },
            processing: {
              text: '解决中',
              status: 'Processing',
            },
          }}
        />
      </ProForm>,
    );

    await wrapper.findByText('查询选择器');

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: '全',
          },
        },
      );
    });

    expect(onSearch).toBeCalledWith('全');

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        '.ant-select-item-option-content div span',
      )[0].textContent,
    ).toBe('全');
    wrapper.unmount();
  });

  it('📦 SearchSelect onSearch support valueEnum clear', async () => {
    const onSearch = jest.fn();
    const onValuesChange = jest.fn();
    const wrapper = render(
      <ProForm
        onValuesChange={async (values) => {
          //  {"disabled": undefined, "key": "all", "label": "全部", "value": "all"}
          onValuesChange(values.userQuery[0].label);
        }}
      >
        <ProFormSelect.SearchSelect
          name="userQuery"
          label="查询选择器"
          fieldProps={{
            onSearch: (e) => onSearch(e),
          }}
          valueEnum={{
            all: { text: '全部', status: 'Default' },
            open: {
              text: '未解决',
              status: 'Error',
            },
            closed: {
              text: '已解决',
              status: 'Success',
            },
            processing: {
              text: '解决中',
              status: 'Processing',
            },
          }}
        />
      </ProForm>,
    );

    await wrapper.findByText('查询选择器');

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: '全',
          },
        },
      );
    });

    expect(onSearch).toBeCalledWith('全');

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        '.ant-select-item-option-content div span',
      )[0].textContent,
    ).toBe('全');

    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-select-item')[0]
        .click();
    });

    expect(onValuesChange).toBeCalledWith('全部');
    wrapper.unmount();
  });

  it('📦 SearchSelect onSearch support valueEnum clear item filter', async () => {
    const onSearch = jest.fn();
    const wrapper = render(
      <ProForm>
        <ProFormSelect.SearchSelect
          name="userQuery"
          label="查询选择器"
          fieldProps={{
            searchOnFocus: true,
            onSearch: (e) => onSearch(e),
          }}
          valueEnum={{
            all: { text: '全部', status: 'Default' },
            open: {
              text: '未解决',
              status: 'Error',
            },
            closed: {
              text: '已解决',
              status: 'Success',
            },
            processing: {
              text: '解决中',
              status: 'Processing',
            },
          }}
        />
      </ProForm>,
    );

    await wrapper.findByText('查询选择器');

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: '全',
          },
        },
      );
    });

    expect(onSearch).toBeCalledWith('全');

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        '.ant-select-item-option-content div span',
      )[0].textContent,
    ).toBe('全');

    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>('.ant-select-item')
        .length,
    ).toBe(1);

    act(() => {
      fireEvent.focus(
        wrapper.baseElement.querySelectorAll<HTMLElement>(
          '.ant-select-selector',
        )[0],
      );
    });

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>('.ant-select-item')
        .length,
    ).toBe(4);
    wrapper.unmount();
  });

  it('📦 SearchSelect support onClear', async () => {
    const onSearch = jest.fn();
    const wrapper = render(
      <ProForm onValuesChange={(e) => console.log(e)}>
        <ProFormSelect.SearchSelect
          name="userQuery"
          label="查询选择器"
          showSearch
          fieldProps={{
            searchOnFocus: true,
            onSearch: (e) => onSearch(e),
          }}
          valueEnum={{
            all: { text: '全部', status: 'Default' },
            open: {
              text: '未解决',
              status: 'Error',
            },
            closed: {
              text: '已解决',
              status: 'Success',
            },
            processing: {
              text: '解决中',
              status: 'Processing',
            },
          }}
        />
      </ProForm>,
    );

    await wrapper.findByText('查询选择器');

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: '全',
          },
        },
      );
    });

    expect(onSearch).toBeCalledWith('全');

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        '.ant-select-item-option-content div span',
      )[0].textContent,
    ).toBe('全');

    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>('.ant-select-item')
        .length,
    ).toBe(1);

    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>(
          '.ant-select-item-option-content div span',
        )[0]
        .click();
    });

    act(() => {
      fireEvent.mouseEnter(
        wrapper.baseElement.querySelectorAll<HTMLElement>('.ant-select')[0],
      );
    });

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[
          wrapper.baseElement.querySelectorAll<HTMLElement>(
            'span.ant-select-clear',
          ).length - 1
        ],
      );
    });

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>('.ant-select-item')
        .length,
    ).toBe(4);
    wrapper.unmount();
  });

  it('📦 SearchSelect support searchOnFocus', async () => {
    const onSearch = jest.fn();
    const wrapper = render(
      <ProForm>
        <ProFormSelect.SearchSelect
          name="userQuery"
          label="查询选择器"
          fieldProps={{
            searchOnFocus: true,
            onSearch: (e) => onSearch(e),
          }}
          valueEnum={{
            all: { text: '全部', status: 'Default' },
            open: {
              text: '未解决',
              status: 'Error',
            },
            closed: {
              text: '已解决',
              status: 'Success',
            },
            processing: {
              text: '解决中',
              status: 'Processing',
            },
          }}
        />
      </ProForm>,
    );

    await wrapper.findByText('查询选择器');

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: '全',
          },
        },
      );
    });

    expect(onSearch).toBeCalledWith('全');

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        '.ant-select-item-option-content div span',
      )[0].textContent,
    ).toBe('全');

    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>('.ant-select-item')
        .length,
    ).toBe(1);

    act(() => {
      fireEvent.focus(
        wrapper.baseElement.querySelectorAll<HTMLElement>(
          '.ant-select-selector',
        )[0],
      );
    });

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>('.ant-select-item')
        .length,
    ).toBe(4);
    wrapper.unmount();
  });

  it('📦 SearchSelect support resetAfterSelect', async () => {
    const onSearch = jest.fn();

    const wrapper = render(
      <ProForm>
        <ProFormSelect.SearchSelect
          name="userQuery"
          label="查询选择器"
          fieldProps={{
            resetAfterSelect: true,
            onSearch: (e) => onSearch(e),
          }}
          valueEnum={{
            all: { text: '全部', status: 'Default' },
            open: {
              text: '未解决',
              status: 'Error',
            },
            closed: {
              text: '已解决',
              status: 'Success',
            },
            processing: {
              text: '解决中',
              status: 'Processing',
            },
          }}
        />
      </ProForm>,
    );
    await wrapper.findByText('查询选择器');

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: '全',
          },
        },
      );
    });

    expect(onSearch).toBeCalledWith('全');

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>('.ant-select-item')
        .length,
    ).toBe(1);
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        '.ant-select-item-option-content div span',
      )[0].textContent,
    ).toBe('全');

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    // 选中第一个
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-select-item')[0]
        .click();
    });

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>('.ant-select-item')
        .length,
    ).toBe(4);
    wrapper.unmount();
  });

  it('📦 SearchSelect support fetchDataOnSearch: false', async () => {
    const onRequest = jest.fn();
    const wrapper = render(
      <ProForm>
        <ProFormSelect.SearchSelect
          name="userQuery"
          label="查询选择器"
          fieldProps={{
            fetchDataOnSearch: false,
          }}
          request={async () => {
            onRequest();
            return [
              { label: '全部', value: 'all' },
              { label: '未解决', value: 'open' },
              { label: '已解决', value: 'closed' },
              { label: '解决中', value: 'processing' },
            ];
          }}
        />
      </ProForm>,
    );

    await wrapper.findByText('查询选择器');

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: '全',
          },
        },
      );
    });

    expect(onRequest.mock.calls.length).toBe(1);
  });

  it('📦 SearchSelect support fetchDataOnSearch: true', async () => {
    const onRequest = jest.fn();
    const wrapper = render(
      <ProForm>
        <ProFormSelect.SearchSelect
          name="userQuery"
          label="查询选择器"
          fieldProps={{
            fetchDataOnSearch: true,
          }}
          request={async () => {
            onRequest();
            return [
              { label: '全部', value: 'all' },
              { label: '未解决', value: 'open' },
              { label: '已解决', value: 'closed' },
              { label: '解决中', value: 'processing' },
            ];
          }}
        />
      </ProForm>,
    );
    await wrapper.findByText('查询选择器');

    await waitFor(() => {
      expect(onRequest.mock.calls.length).toBe(1);
    });

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: '全',
          },
        },
      );
    });

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    await waitFor(() => {
      expect(onRequest.mock.calls.length).toBe(2);
    });

    wrapper.unmount();
  });

  it('📦 SearchSelect support multiple', async () => {
    const onSearch = jest.fn();
    const onFinish = jest.fn();
    const wrapper = render(
      <ProForm
        onFinish={async (values) => {
          onFinish(values?.userQuery?.length);
        }}
      >
        <ProFormSelect.SearchSelect
          name="userQuery"
          label="查询选择器"
          fieldProps={{
            mode: 'multiple',
            searchOnFocus: true,
            onSearch: (e) => onSearch(e),
          }}
          valueEnum={{
            all: { text: '全部', status: 'Default' },
            open: {
              text: '未解决',
              status: 'Error',
            },
            closed: {
              text: '已解决',
              status: 'Success',
            },
            processing: {
              text: '解决中',
              status: 'Processing',
            },
          }}
        />
      </ProForm>,
    );

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    // 选中第一个
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-select-item')[0]
        .click();
    });

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    // 选中第二个
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-select-item')[1]
        .click();
    });

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    // 多次提交需要阻止
    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    expect(onFinish).toBeCalledWith(2);
    wrapper.unmount();
  });

  it('📦 SearchSelect filter support optionGroup', async () => {
    const onValuesChange = jest.fn();
    const wrapper = render(
      <ProForm
        onValuesChange={async (values) => {
          onValuesChange(values?.userQuery[0].value);
        }}
      >
        <ProFormSelect.SearchSelect
          name="userQuery"
          label="业务线"
          rules={[{ required: true }]}
          options={[
            {
              label: 'A系统',
              value: 'A系统',
              optionType: 'optGroup',
              children: [
                { label: '门店小程序', value: '门店小程序' },
                { label: '资金线', value: '资金线' },
              ],
            },
            {
              label: 'B系统',
              value: 'B系统',
              optionType: 'optGroup',
              children: [
                { label: 'B门店小程序', value: 'B门店小程序' },
                { label: 'B资金线', value: 'B资金线' },
              ],
            },
          ]}
          showSearch
          fieldProps={{
            allowClear: false,
            showSearch: true,
          }}
        />
      </ProForm>,
    );

    await act(async () => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelector('.ant-select-selector')!,
      );
    });

    await act(async () => {
      const input = await wrapper.findByRole('combobox');
      fireEvent.change(input, {
        target: {
          value: '门',
        },
      });
      await waitForWaitTime(200);
    });

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelector('.ant-select-selector')!,
      );
    });

    // 应该有两个 item 被筛选出来
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        'div.ant-select-item.ant-select-item-option',
      ).length,
    ).toBe(2);

    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>(
          '.ant-select-item.ant-select-item-option',
        )[0]
        .click();
    });

    expect(onValuesChange).toBeCalledWith('门店小程序');

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelector('.ant-select-selector')!,
      );
    });

    await act(async () => {
      const input = await wrapper.findByRole('combobox');
      fireEvent.change(input, {
        target: {
          value: '期贤',
        },
      });
      await waitForWaitTime(200);
    });
    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelector('.ant-select-selector')!,
      );
    });

    // 应该没有筛选
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        'div.ant-select-item.ant-select-item-option',
      ).length,
    ).toBe(0);

    wrapper.unmount();
  });

  it('📦 SearchSelect filter support (', async () => {
    const onValuesChange = jest.fn();
    const wrapper = render(
      <ProForm
        onValuesChange={async (values) => {
          onValuesChange(values?.userQuery[0].value);
        }}
      >
        <ProFormSelect.SearchSelect
          name="userQuery"
          label="业务线"
          rules={[{ required: true }]}
          options={[
            {
              label: 'A系统',
              value: 'A系统',
              optionType: 'optGroup',
              children: [
                { label: '门店小程序(测试)', value: '门店小程序' },
                { label: '资金线', value: '资金线' },
              ],
            },
            {
              label: 'B系统',
              value: 'B系统',
              optionType: 'optGroup',
              children: [
                { label: 'B门店小程序', value: 'B门店小程序' },
                { label: 'B资金线', value: 'B资金线' },
              ],
            },
          ]}
          showSearch
          fieldProps={{
            allowClear: false,
            showSearch: true,
          }}
        />
      </ProForm>,
    );

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    await act(async () => {
      const input = await wrapper.findByRole('combobox');
      fireEvent.change(input, {
        target: {
          value: '(测试)',
        },
      });
      await waitForWaitTime(200);
    });

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    // 应该有两个 item 被筛选出来
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        'div.ant-select-item.ant-select-item-option',
      ).length,
    ).toBe(1);

    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>(
          '.ant-select-item.ant-select-item-option',
        )[0]
        .click();
    });

    expect(onValuesChange).toBeCalledWith('门店小程序');

    wrapper.unmount();
  });

  it('📦 SearchSelect support multiple and autoClearSearchValue: false ', async () => {
    const onSearch = jest.fn();
    const onFinish = jest.fn();

    const wrapper = render(
      <ProForm
        onFinish={async (values) => {
          onFinish(values?.userQuery?.length);
        }}
      >
        <ProFormSelect.SearchSelect
          name="userQuery"
          label="产品选择"
          placeholder="测试 placeholder"
          fieldProps={{
            mode: 'multiple',
            autoClearSearchValue: false,
            searchOnFocus: true,
            onSearch: (e) => onSearch(e),
          }}
          options={[
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ]}
        />
      </ProForm>,
    );

    // 点击搜索框
    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    // 默认展示所有的7个选项
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        'div.ant-select-item.ant-select-item-option',
      ).length,
    ).toBe(4);
    // 默认输入框没有内容
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        '.ant-select-item-option-content div span',
      ).length,
    ).toBe(0);
    // input 元素的内容也为空
    expect(
      wrapper.baseElement.querySelectorAll<HTMLInputElement>(
        'input.ant-select-selection-search-input',
      )[0].value,
    ).toBe('');

    // 输入搜索内容
    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: '解',
          },
        },
      );
    });

    // 应该有4个item 被筛选出来
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        'div.ant-select-item.ant-select-item-option',
      ).length,
    ).toBe(3);
    // input 也有输入的内容
    expect(
      wrapper.baseElement.querySelectorAll<HTMLInputElement>(
        'input.ant-select-selection-search-input',
      )[0].value,
    ).toBe('解');

    // 选中第一个
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-select-item')[0]
        .click();
    });

    // 选中的内容出现在 input 中
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        '.ant-select-item-option-content',
      )[0].textContent,
    ).toBe('未解决');
    expect(
      wrapper.baseElement.querySelectorAll<HTMLInputElement>(
        'input.ant-select-selection-search-input',
      )[0].value,
    ).toBe('解');
    // 搜索的结果, 应该保持不变
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        'div.ant-select-item.ant-select-item-option',
      ).length,
    ).toBe(3);

    // 继续选中第二个
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-select-item')[1]
        .click();
    });

    // 选中的内容出现在 input 中
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        '.ant-select-item-option-content',
      )[1].textContent,
    ).toBe('已解决');
    expect(
      wrapper.baseElement.querySelectorAll<HTMLInputElement>(
        'input.ant-select-selection-search-input',
      )[0].value,
    ).toBe('解');

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    // 多次提交需要阻止
    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    expect(onFinish).toBeCalledWith(2);
    wrapper.unmount();
  });

  it('📦 Select support single', async () => {
    const onFinish = jest.fn();
    const wrapper = render(
      <ProForm
        onFinish={async (values) => {
          onFinish(values?.userQuery);
        }}
      >
        <ProFormSelect
          name="userQuery"
          label="查询选择器"
          valueEnum={{
            all: { text: '全部', status: 'Default' },
            open: {
              text: '未解决',
              status: 'Error',
            },
            closed: {
              text: '已解决',
              status: 'Success',
            },
            processing: {
              text: '解决中',
              status: 'Processing',
            },
          }}
        />
      </ProForm>,
    );

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    // 选中第一个
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-select-item')[0]
        .click();
    });

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    // 选中第二个
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-select-item')[1]
        .click();
    });

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    expect(onFinish).toBeCalledWith('open');
  });

  it('📦 ProFormSelect support filterOption', async () => {
    const onSearch = jest.fn();
    const wrapper = render(
      <ProForm>
        <ProFormSelect
          fieldProps={{
            filterOption: false,
            onSearch: (e) => onSearch(e),
          }}
          options={[
            { value: 1, label: 'Aa' },
            { value: 2, label: 'Bb' },
            { value: 3, label: 'Cc' },
          ]}
          name="userQuery"
          label="查询选择器"
        />
      </ProForm>,
    );

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: 'A',
          },
        },
      );
    });

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>('.ant-select-item')
        .length,
    ).toBe(3);
  });

  it('📦 Select filterOption support mixed case', async () => {
    const wrapper = render(
      <ProForm>
        <ProFormSelect
          name="userQuery"
          label="查询选择器"
          fieldProps={{
            showSearch: true,
            options: [
              { value: 1, label: 'Aa' },
              { value: 2, label: 'Bb' },
              { value: 3, label: 'Cc' },
            ],
          }}
        />
      </ProForm>,
    );

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: 'b',
          },
        },
      );
    });

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>('.ant-select-item')
        .length,
    ).toBe(1);

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: 'B',
          },
        },
      );
    });

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>('.ant-select-item')
        .length,
    ).toBe(1);
  });

  it('📦 Select support labelInValue single', async () => {
    const onFinish = jest.fn();
    const wrapper = render(
      <ProForm
        onFinish={async (values) => {
          onFinish(values?.userQuery.value);
        }}
      >
        <ProFormSelect
          fieldProps={{
            labelInValue: true,
          }}
          name="userQuery"
          label="查询选择器"
          valueEnum={{
            all: { text: '全部', status: 'Default' },
            open: {
              text: '未解决',
              status: 'Error',
            },
            closed: {
              text: '已解决',
              status: 'Success',
            },
            processing: {
              text: '解决中',
              status: 'Processing',
            },
          }}
        />
      </ProForm>,
    );

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    // 选中第一个
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-select-item')[0]
        .click();
    });

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    // 选中第二个
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-select-item')[1]
        .click();
    });

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    expect(onFinish).toBeCalledWith('open');
  });
  it('📦 Select support multiple unnamed async options', async () => {
    const wrapper = render(
      <>
        <ProFormSelect id="select1" request={async () => [{ value: 1 }]} />
        <ProFormSelect id="select2" request={async () => [{ value: 2 }]} />
      </>,
    );

    await waitForWaitTime(100);

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
      );
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[1],
      );
    });

    const textList = wrapper.baseElement.querySelectorAll<HTMLElement>(
      '.ant-select-item-option-content',
    );
    // 加载 options
    expect(textList.length).toBe(2);
    expect(textList[0].textContent).toBe('1');
    expect(textList[1].textContent).toBe('2');
  });

  it('📦 Select support multiple and autoClearSearchValue: false ', async () => {
    const onSearch = jest.fn();
    const onFinish = jest.fn();

    const wrapper = render(
      <ProForm
        onFinish={async (values) => {
          onFinish(values?.userQuery?.length);
        }}
      >
        <ProFormSelect
          name="userQuery"
          label="产品选择"
          placeholder="测试 placeholder"
          fieldProps={{
            mode: 'multiple',
            autoClearSearchValue: false,
            searchOnFocus: true,
            onSearch: (e) => onSearch(e),
          }}
          options={[
            {
              value: '2',
              label: '网点2',
            },
            {
              value: '21',
              label: '网点21',
            },
            {
              value: '22',
              label: '网点22',
            },
            {
              value: '3',
              label: '网点3',
            },
            {
              value: '31',
              label: '网点31',
            },
            {
              value: '32',
              label: '网点32',
            },
            {
              value: '33',
              label: '网点33',
            },
          ]}
        />
      </ProForm>,
    );

    // 点击搜索框
    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    // 默认展示所有的7个选项
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        'div.ant-select-item.ant-select-item-option',
      ).length,
    ).toBe(7);
    // 默认输入框没有内容
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        '.ant-select-item-option-content div span',
      ).length,
    ).toBe(0);
    // input 元素的内容也为空
    expect(
      wrapper.baseElement.querySelectorAll<HTMLInputElement>(
        'input.ant-select-selection-search-input',
      )[0].value,
    ).toBe('');

    // 输入搜索内容
    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: '2',
          },
        },
      );
    });

    // 应该有4个item 被筛选出来
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        'div.ant-select-item.ant-select-item-option',
      ).length,
    ).toBe(4);
    // input 也有输入的内容
    expect(
      wrapper.baseElement.querySelectorAll<HTMLInputElement>(
        'input.ant-select-selection-search-input',
      )[0].value,
    ).toBe('2');

    // 选中第一个
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-select-item')[0]
        .click();
    });

    // 选中的内容出现在 input 中
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        '.ant-select-item-option-content',
      )[0].textContent,
    ).toBe('网点2');
    expect(
      wrapper.baseElement.querySelectorAll<HTMLInputElement>(
        'input.ant-select-selection-search-input',
      )[0].value,
    ).toBe('2');
    // 搜索的结果, 应该保持不变
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        'div.ant-select-item.ant-select-item-option',
      ).length,
    ).toBe(4);

    // 继续选中第二个
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-select-item')[1]
        .click();
    });

    // 选中的内容出现在 input 中
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        '.ant-select-item-option-content',
      )[1].textContent,
    ).toBe('网点21');
    expect(
      wrapper.baseElement.querySelectorAll<HTMLInputElement>(
        'input.ant-select-selection-search-input',
      )[0].value,
    ).toBe('2');

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    // 多次提交需要阻止
    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    expect(onFinish).toBeCalledWith(2);
  });

  it('📦 Select support multiple and autoClearSearchValue: true', async () => {
    const onSearch = jest.fn();
    const onFinish = jest.fn();

    const wrapper = render(
      <ProForm
        onFinish={async (values) => {
          onFinish(values?.userQuery?.length);
        }}
      >
        <ProFormSelect
          name="userQuery"
          label="产品选择"
          placeholder="测试 placeholder"
          fieldProps={{
            mode: 'multiple',
            autoClearSearchValue: true,
            searchOnFocus: true,
            onSearch: (e) => onSearch(e),
          }}
          options={[
            {
              value: '2',
              label: '网点2',
            },
            {
              value: '21',
              label: '网点21',
            },
            {
              value: '22',
              label: '网点22',
            },
            {
              value: '3',
              label: '网点3',
            },
            {
              value: '31',
              label: '网点31',
            },
            {
              value: '32',
              label: '网点32',
            },
            {
              value: '33',
              label: '网点33',
            },
          ]}
        />
      </ProForm>,
    );

    // 点击搜索框
    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    // 默认展示所有的7个选项
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        'div.ant-select-item.ant-select-item-option',
      ).length,
    ).toBe(7);
    // 默认输入框没有内容
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        '.ant-select-item-option-content div span',
      ).length,
    ).toBe(0);
    // input 元素的内容也为空
    expect(
      wrapper.baseElement.querySelectorAll<HTMLInputElement>(
        'input.ant-select-selection-search-input',
      )[0].value,
    ).toBe('');

    // 输入搜索内容
    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: '2',
          },
        },
      );
    });

    // 应该有4个item 被筛选出来
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        'div.ant-select-item.ant-select-item-option',
      ).length,
    ).toBe(4);
    // input 也有输入的内容
    expect(
      wrapper.baseElement.querySelectorAll<HTMLInputElement>(
        'input.ant-select-selection-search-input',
      )[0].value,
    ).toBe('2');

    // 选中第一个
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-select-item')[0]
        .click();
    });

    // 选中的内容出现在 input 中
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        '.ant-select-item-option-content',
      )[0].textContent,
    ).toBe('网点2');
    // 选中后， 会自动清空搜索内容
    expect(
      wrapper.baseElement.querySelectorAll<HTMLInputElement>(
        'input.ant-select-selection-search-input',
      )[0].value,
    ).toBe('');
    // 搜索的结果, 恢复到原始结果
    expect(
      wrapper.baseElement.querySelectorAll<HTMLElement>(
        'div.ant-select-item.ant-select-item-option',
      ).length,
    ).toBe(7);

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    // 多次提交需要阻止
    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    expect(onFinish).toBeCalledWith(1);
  });

  it('📦 ColorPicker support rgba', async () => {
    const onFinish = jest.fn();
    const wrapper = render(
      <ProForm
        onValuesChange={async (values) => {
          onFinish(values?.color);
        }}
      >
        <ProFormColorPicker name="color" label="颜色选择" />
      </ProForm>,
    );

    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-pro-field-color-picker')[0]
        .click();
    });

    // 选中第一个
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.flexbox-fix')[2]
        .querySelectorAll<HTMLDivElement>('div span div')[2]
        .click();
    });

    expect(onFinish).toBeCalledWith('#5b8ff9');

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelectorAll<HTMLElement>(
          '#rc-editable-input-5',
        )[0],
        {
          target: {
            value: 2,
          },
        },
      );
    });

    expect(onFinish).toBeCalledWith('rgba(91, 143, 249, 0.02)');
  });

  it('📦 validateFieldsReturnFormatValue', async () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const App = () => {
      const formRef = useRef<
        ProFormInstance<{
          date: string;
        }>
      >();

      useEffect(() => {
        formRef.current?.validateFieldsReturnFormatValue?.().then((val) => {
          fn1(val.date);
        });
      }, []);

      return (
        <ProForm
          onValuesChange={async () => {
            formRef.current?.validateFieldsReturnFormatValue?.().then((val) => {
              console.log(val);
              fn2(val.date);
            });
          }}
          formRef={formRef}
        >
          <ProFormDatePicker
            name="date"
            initialValue={dayjs('2021-08-09')}
            fieldProps={{ open: true }}
          />
        </ProForm>
      );
    };

    const wrapper = render(<App />);

    await waitForWaitTime(200);
    expect(fn1).toHaveBeenCalledWith('2021-08-09');

    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-picker-cell')[2]
        .click();
    });

    await waitForWaitTime(200);

    expect(fn2).toHaveBeenCalledWith('2021-08-03');

    expect(wrapper.asFragment()).toMatchSnapshot();
    wrapper.unmount();
  });

  it('📦 DigitRange Will return undefined when both value equal to undefined', async () => {
    const onFinish = jest.fn();
    const wrapper = render(
      <ProForm
        onFinish={async (values) => {
          onFinish(values?.digitRange);
        }}
      >
        <ProFormDigitRange name="digitRange" />
      </ProForm>,
    );

    // 测试基本功能
    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector('.ant-input-number-input')!,
        {
          target: {
            value: '1',
          },
        },
      );
    });

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelectorAll('.ant-input-number-input')[1],
        {
          target: {
            value: '2',
          },
        },
      );
    });

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });
    expect(onFinish).toBeCalledWith([1, 2]);

    // 测试清空两个值
    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelectorAll('.ant-input-number-input')[0],
        {
          target: {
            value: '',
          },
        },
      );
    });

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelectorAll('.ant-input-number-input')[1],
        {
          target: {
            value: '',
          },
        },
      );
    });

    act(() => {
      fireEvent.blur(
        wrapper.baseElement.querySelectorAll<HTMLElement>(
          '.ant-input-number-input',
        )[1],
      );
    });

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    expect(onFinish).toBeCalledWith(undefined);
  });

  it('📦 when dateFormatter is a Function', async () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const App = () => {
      return (
        <ProForm
          dateFormatter={(value, valueType) => {
            fn1(value.format('YYYY/MM/DD HH:mm:ss'), valueType);
            return value.format('YYYY/MM/DD HH:mm:ss');
          }}
          onFinish={async (values) => {
            fn2(values.datetime);
            return true;
          }}
        >
          <ProFormDateTimePicker
            name="datetime"
            initialValue={dayjs('2021-08-09 12:12:12')}
            fieldProps={{ open: true }}
          />

          <ProFormTimePicker name="time2" label="时间" />
        </ProForm>
      );
    };

    const wrapper = render(<App />);

    expect(fn1).toBeCalledWith('2021/08/09 12:12:12', 'dateTime');

    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });

    expect(fn2).toHaveBeenCalledWith('2021/08/09 12:12:12');

    act(() => {
      expect(wrapper.asFragment()).toMatchSnapshot();
    });
  });

  it(`📦 rules change should rerender`, () => {
    const html = render(
      <ProForm>
        <ProFormText
          width="md"
          rules={[
            {
              required: true,
              message: 'test',
            },
          ]}
          name="function"
          label="生效方式"
        />
      </ProForm>,
    );

    expect(
      html.baseElement.querySelectorAll('.ant-form-item-required').length,
    ).toBe(1);

    html.rerender(
      <ProForm>
        <ProFormText
          width="md"
          rules={[
            {
              required: false,
              message: 'test',
            },
          ]}
          name="function"
          label="生效方式"
        />
      </ProForm>,
    );

    expect(
      html.baseElement.querySelectorAll('.ant-form-item-required').length,
    ).toBe(0);
    html.unmount();
  });

  it('📦 fix onChange will get empty object when you set labelInValue ture in ProForm', async () => {
    const onChange = jest.fn();
    const wrapper = render(
      <ProForm>
        <ProFormSelect
          fieldProps={{
            labelInValue: true,
            onChange(value) {
              onChange(value);
            },
          }}
          name="userQuery"
          label="查询选择器"
          valueEnum={{
            all: { text: '全部', status: 'Default' },
            open: {
              text: '未解决',
              status: 'Error',
            },
            closed: {
              text: '已解决',
              status: 'Success',
            },
            processing: {
              text: '解决中',
              status: 'Processing',
            },
          }}
        />
      </ProForm>,
    );

    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });

    // 选中第一个
    act(() => {
      wrapper.baseElement
        .querySelectorAll<HTMLElement>('.ant-select-item')[0]
        .click();
    });

    // 鼠标移入选中区域
    act(() => {
      fireEvent.mouseEnter(
        wrapper.baseElement.querySelectorAll<HTMLElement>('.ant-select')[0],
      );
    });

    // 点击删除按钮进行删除操作
    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll<HTMLElement>(
          'span.ant-select-clear',
        )[
          wrapper.baseElement.querySelectorAll<HTMLElement>(
            'span.ant-select-clear',
          ).length - 1
        ],
      );
    });

    expect(onChange).toBeCalledWith(undefined);
    wrapper.unmount();
  });

  it(`📦 valueType digit with precision value`, async () => {
    const fn = jest.fn();
    const html = render(
      <ProForm
        onFinish={async (value) => {
          fn(value.count);
        }}
      >
        <ProFormDigit
          name="count"
          label="人数"
          fieldProps={{
            precision: 0,
          }}
        />
      </ProForm>,
    );

    await waitForWaitTime(300);
    act(() => {
      const dom =
        html.baseElement.querySelector<HTMLInputElement>('input#count')!;
      fireEvent.change(dom, {
        target: {
          value: '22.22',
        },
      });
      fireEvent.blur(dom);
      fireEvent.click(dom);
    });
    await waitForWaitTime(300);
    expect(
      html.baseElement.querySelector<HTMLInputElement>('input#count')?.value,
    ).toBe('22');

    await act(async () => {
      await (await html.findByText('提 交')).click();
    });

    expect(fn).toBeCalledWith(22);
    expect(html.asFragment()).toMatchSnapshot();
  });

  // https://github.com/ant-design/pro-components/issues/5743
  it(`📦 submitted value should be consistent with input when precision=0`, async () => {
    const fn = jest.fn();
    const html = render(
      <ProForm
        onFinish={async (value) => {
          fn(value.count);
        }}
      >
        <ProFormDigit
          name="count"
          label="人数"
          fieldProps={{
            precision: 0,
          }}
        />
      </ProForm>,
    );

    await waitForWaitTime(300);

    const dom =
      html.baseElement.querySelector<HTMLInputElement>('input#count')!;
    await userEvent.type(dom, '22.22.22');
    await userEvent.click(await html.findByText('提 交'));

    await waitForWaitTime(300);

    expect(dom.value).toBe('22');
    expect(fn).toBeCalledWith(22);
    expect(html.asFragment()).toMatchSnapshot();
  });

  it('📦 ProFormTreeSelect support fetchDataOnSearch: false', async () => {
    const onRequest = jest.fn();
    const wrapper = render(
      <ProForm>
        <ProFormTreeSelect
          name="userQuery"
          label="查询选择器"
          fieldProps={{
            showSearch: true,
            fetchDataOnSearch: false,
          }}
          request={async () => {
            onRequest();
            return [
              {
                value: 'parent 1',
                title: 'parent 1',
                children: [
                  {
                    value: 'parent 1-0',
                    title: 'parent 1-0',
                    children: [
                      {
                        value: 'leaf1',
                        title: 'leaf1',
                      },
                      {
                        value: 'leaf2',
                        title: 'leaf2',
                      },
                    ],
                  },
                  {
                    value: 'parent 1-1',
                    title: 'parent 1-1',
                    children: [
                      {
                        value: 'leaf3',
                        title: <b style={{ color: '#08c' }}>leaf3</b>,
                      },
                    ],
                  },
                ],
              },
            ];
          }}
        />
      </ProForm>,
    );

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: 'p',
          },
        },
      );
    });

    expect(onRequest.mock.calls.length).toBe(1);
  });

  it('📦 ProFormTreeSelect support fetchDataOnSearch: true', async () => {
    const onRequest = jest.fn();
    const wrapper = render(
      <ProForm>
        <ProFormTreeSelect
          name="userQuery"
          label="查询选择器"
          fieldProps={{
            showSearch: true,
            fetchDataOnSearch: true,
          }}
          request={async () => {
            onRequest();
            return [
              {
                value: 'parent 1',
                title: 'parent 1',
                children: [
                  {
                    value: 'parent 1-0',
                    title: 'parent 1-0',
                    children: [
                      {
                        value: 'leaf1',
                        title: 'leaf1',
                      },
                      {
                        value: 'leaf2',
                        title: 'leaf2',
                      },
                    ],
                  },
                  {
                    value: 'parent 1-1',
                    title: 'parent 1-1',
                    children: [
                      {
                        value: 'leaf3',
                        title: <b style={{ color: '#08c' }}>leaf3</b>,
                      },
                    ],
                  },
                ],
              },
            ];
          }}
        />
      </ProForm>,
    );

    await waitForWaitTime(100);

    act(() => {
      fireEvent.change(
        wrapper.baseElement.querySelector(
          '.ant-select-selection-search-input',
        )!,
        {
          target: {
            value: 'l',
          },
        },
      );
    });
    await waitForWaitTime(100);
    act(() => {
      fireEvent.mouseDown(
        wrapper.baseElement.querySelectorAll('.ant-select-selector')[0],
        {},
      );
    });
    await waitForWaitTime(100);
    expect(onRequest.mock.calls.length).toBe(3);
    wrapper.unmount();
  });
});
