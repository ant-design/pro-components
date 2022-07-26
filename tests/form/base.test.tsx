import { FontSizeOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, {
  ProFormCaptcha,
  ProFormColorPicker,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDependency,
  ProFormDigitRange,
  ProFormField,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import '@testing-library/jest-dom';
import { render as reactRender } from '@testing-library/react';
import { Button, ConfigProvider, Input } from 'antd';
import dayjs from 'dayjs';
import { mount } from 'enzyme';
import React, { useEffect, useRef } from 'react';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint, waitTime } from '../util';

describe('ProForm', () => {
  it('📦 submit props actionsRender=false', async () => {
    const wrapper = mount(<ProForm submitter={false} />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('📦 componentSize is work', async () => {
    const wrapper = mount(
      <ConfigProvider componentSize="small">
        <ProForm>
          <ProFormText />
        </ProForm>
      </ConfigProvider>,
    );
    expect(wrapper.find('.ant-input-sm').length).toBe(1);
  });

  it('📦 ProForm support sync form url', async () => {
    const fn = jest.fn();
    const wrapper = mount<{ navTheme: string }>(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toHaveBeenCalledWith('realDark');

    act(() => {
      wrapper.find('button.ant-btn').at(1).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toHaveBeenCalledWith('realDark');
  });

  it('📦 ProForm support sync form url as important', async () => {
    const fn = jest.fn();
    const wrapper = mount<{ navTheme: string }>(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toHaveBeenCalledWith('realDark');

    act(() => {
      wrapper.find('button.ant-btn').at(1).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toHaveBeenCalledWith('realDark');
  });

  it('📦 ProForm support sync form url and rest', async () => {
    const onFinish = jest.fn();
    const wrapper = mount<{ navTheme: string }>(
      <ProForm
        onFinish={async (values) => {
          onFinish(values.navTheme);
        }}
        syncToUrl
        syncToInitialValues={false}
      >
        <ProFormText name="navTheme" />
        <ProForm.Item>
          {() => {
            return '123';
          }}
        </ProForm.Item>
      </ProForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(onFinish).toHaveBeenCalledWith('realDark');

    // rest
    act(() => {
      wrapper.find('button.ant-btn').at(1).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(onFinish).toHaveBeenCalledWith(undefined);
  });

  it('📦 ProForm initialValues update will warning', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <ProForm
        onFinish={async (values) => {
          fn(values.navTheme);
        }}
        initialValues={{}}
      >
        <ProFormText name="navTheme" />
      </ProForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toHaveBeenCalledWith(undefined);

    act(() => {
      wrapper.setProps({
        initialValues: {
          navTheme: 'xxx',
        },
      });
    });
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toHaveBeenCalledWith(undefined);
  });

  it('📦 onFinish should simulate button loading', async () => {
    const fn = jest.fn();
    const wrapper = reactRender(
      <ProForm
        onFinish={async () => {
          fn();
          await waitTime(2000);
        }}
      />,
    );

    await waitForComponentToPaint(wrapper, 200);
    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });
    await waitForComponentToPaint(wrapper, 200);
    const dom = await (await wrapper.findByText('提 交')).parentElement;
    expect(dom?.className.includes('ant-btn-loading')).toBe(true);
    expect(fn).toBeCalled();
  });

  it('📦 onFinish should simulate button close loading', async () => {
    const fn = jest.fn();
    const wrapper = reactRender(
      <ProForm
        onFinish={async () => {
          fn();
          await waitTime(1000);
          throw new Error('期贤');
        }}
      />,
    );

    await waitForComponentToPaint(wrapper, 200);
    await act(async () => {
      await (await wrapper.findByText('提 交')).click();
    });
    await waitForComponentToPaint(wrapper, 200);
    let dom = await (await wrapper.findByText('提 交')).parentElement;
    expect(dom?.className.includes('ant-btn-loading')).toBe(true);
    expect(fn).toBeCalled();

    await waitForComponentToPaint(wrapper, 1000);

    dom = await (await wrapper.findByText('提 交')).parentElement;
    expect(dom?.className.includes('ant-btn-loading')).toBe(false);
  });

  it('📦 onFinish support params and request', async () => {
    const wrapper = reactRender(
      <ProForm
        request={async (params) => {
          await waitTime(100);
          return params;
        }}
        params={{
          name: 'test',
        }}
      >
        <ProFormText name="name" />
      </ProForm>,
    );

    await waitForComponentToPaint(wrapper, 200);

    expect(!!wrapper.findAllByDisplayValue('test')).toBeTruthy();

    act(() => {
      wrapper.rerender(
        <ProForm
          key="rerender"
          request={async (params) => {
            await waitTime(100);
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
    await waitForComponentToPaint(wrapper, 500);

    expect(!!wrapper.findAllByDisplayValue('1234')).toBeTruthy();
  });

  it('📦 submit props actionsRender=()=>false', async () => {
    const wrapper = mount(
      <ProForm
        submitter={{
          render: () => false,
        }}
      />,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('📦 submit props actionsRender is one', async () => {
    const wrapper = mount(
      <ProForm
        submitter={{
          render: () => [<a key="test">test</a>],
        }}
      />,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('📦 support formRef', async () => {
    const formRef = React.createRef<ProFormInstance<any>>();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper, 1000);
    expect(formRef.current?.getFieldFormatValue?.('test')?.join('-')).toBe('12-34');
    expect(formRef.current?.getFieldFormatValueObject?.('test')?.test.join('-')).toBe('12-34');
    expect(formRef.current?.getFieldFormatValueObject?.()?.test.join('-')).toBe('12-34');
    expect(formRef.current?.getFieldsFormatValue?.()?.test.join('-')).toBe('12-34');
    expect(formRef.current?.getFieldFormatValue?.(['test'])?.join('-')).toBe('12-34');
    expect(formRef.current?.getFieldValue?.('test')).toBe('12,34');
  });

  it('📦 ProForm support namePath is array', async () => {
    const fn = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('keypress', {
        key: 'Enter',
      });
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalledWith({
      name: {
        test: 'test',
      },
      test: 'test2',
    });
  });

  it('📦 ProForm support enter submit', async () => {
    const fn = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('keypress', {
        key: 'Enter',
      });
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalled();
  });

  it('📦 submit props actionsRender=false', async () => {
    const wrapper = mount(
      <ProForm
        submitter={{
          render: false,
        }}
      />,
    );
    await waitForComponentToPaint(wrapper);
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
    await waitForComponentToPaint(wrapper);
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
    await waitForComponentToPaint(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('📦 submitter props support submitButtonProps', async () => {
    const fn = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      expect(wrapper.render()).toMatchSnapshot();
    });

    act(() => {
      wrapper.find('button.test_button').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalled();
  });

  it('📦 submitter props support resetButtonProps', async () => {
    const fn = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);
    act(() => {
      expect(wrapper.render()).toMatchSnapshot();
    });
    act(() => {
      wrapper.find('button.test_button').simulate('click');
    });
    expect(fn).toBeCalled();
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

    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('button#submit').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 100);

    expect(onFinish).toBeCalled();
  });

  it('📦 ProFormCaptcha support onGetCaptcha', async () => {
    const wrapper = mount(
      <ProForm>
        <ProFormCaptcha
          onGetCaptcha={async () => {
            await waitTime(10);
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
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('Button#test').text()).toBe('获取验证码');
    act(() => {
      wrapper.find('Button#test').simulate('click');
    });
    await waitForComponentToPaint(wrapper, 100);

    expect(wrapper.find('button#test').text()).toBe('2 秒后重新获取');
    await waitForComponentToPaint(wrapper, 1200);

    expect(wrapper.find('button#test').text()).toBe('1 秒后重新获取');

    await waitForComponentToPaint(wrapper, 2000);
    expect(wrapper.find('Button#test').text()).toBe('获取验证码');
  });

  it('📦 ProFormCaptcha support value and onchange', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <ProForm onFinish={(values) => onFinish(values.name)}>
        <ProFormCaptcha
          onGetCaptcha={async () => {
            await waitTime(10);
          }}
          countDown={2}
          label="name"
          name="name"
        />
      </ProForm>,
    );
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('input#name').simulate('change', {
        target: {
          value: 'test',
        },
      });
    });

    await waitForComponentToPaint(wrapper, 100);

    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper, 100);

    expect(onFinish).toBeCalledWith('test');
  });

  it('📦 ProFormCaptcha support captchaTextRender', async () => {
    const wrapper = mount(
      <ProForm>
        <ProFormCaptcha
          onGetCaptcha={async () => {
            await waitTime(10);
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
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('Button#test').text()).toBe('获 取');
    act(() => {
      wrapper.find('Button#test').simulate('click');
    });
    await waitForComponentToPaint(wrapper, 100);
    expect(wrapper.find('button#test').text()).toBe('重新获取');
  });

  it('📦 ProFormCaptcha onGetCaptcha throw error', async () => {
    const wrapper = mount(
      <ProForm>
        <ProFormCaptcha
          onGetCaptcha={async () => {
            await waitTime(10);
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
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('Button#test').simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('button#test').text()).toBe('获 取');
  });

  it('📦 ProFormCaptcha onGetCaptcha support rules', async () => {
    const fn = jest.fn();
    const wrapper = mount(
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
            await waitTime(10);
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
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('Button#test').simulate('click');
    });

    expect(fn).not.toBeCalled();
    act(() => {
      wrapper
        .find('input')
        .at(1)
        .simulate('change', {
          target: {
            value: 'tech',
          },
        });
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('Button#test').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(fn).toBeCalled();
  });

  it('📦 ProFormDependency', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
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

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('input#name').simulate('change', {
        target: {
          value: 'test',
        },
      });
    });

    act(() => {
      wrapper.find('input#name2_text').simulate('change', {
        target: {
          value: 'test2',
        },
      });
    });

    expect(wrapper.find('span#label_text').text()).toBe('与《test》 与 《test2》合同约定生效方式');
  });

  it('📦 ProForm.Group support collapsible', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <ProForm>
        <ProForm.Group title="qixian" collapsible onCollapse={(c) => fn(c)}>
          <ProFormText name="phone" />
          <ProFormText name="phone2" />
        </ProForm.Group>
      </ProForm>,
    );

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-pro-form-group-title').simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(fn).toBeCalledWith(true);

    act(() => {
      wrapper.find('.ant-pro-form-group-title').simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    expect(fn).toBeCalledWith(false);
  });

  it('📦 ProForm.Group support defaultCollapsed', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <ProForm>
        <ProForm.Group title="qixian" collapsible defaultCollapsed={true} onCollapse={(c) => fn(c)}>
          <ProFormText name="phone" />
          <ProFormText name="phone2" />
        </ProForm.Group>
      </ProForm>,
    );

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-pro-form-group-title').simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(fn).toBeCalledWith(false);

    act(() => {
      wrapper.find('.ant-pro-form-group-title').simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    expect(fn).toBeCalledWith(true);
  });

  it('📦 ProForm.Group support defaultCollapsed', async () => {
    const fn = jest.fn();
    const wrapper = mount(
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

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('#click').simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(fn).not.toBeCalled();
  });
  it('📦 ProForm.Group support FormItem hidden', async () => {
    const wrapper = mount(
      <ProForm>
        <ProForm.Group title="qixian" collapsible>
          <ProFormText name="mobile" hidden />
          <div>mobile</div>
          <ProFormText name="mobile2" />
        </ProForm.Group>
      </ProForm>,
    );

    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-pro-form-group-container div.ant-form-item').length).toBe(1);
    expect(wrapper.find('.ant-pro-form-group-container div.ant-space-item').length).toBe(2);
  });

  it('📦 ProFormField support onChange', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <ProForm onValuesChange={fn}>
        <ProFormField name="phone2">
          <Input id="testInput" />
        </ProFormField>
      </ProForm>,
    );

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('input#testInput').simulate('change', {
        target: {
          value: 'test',
        },
      });
    });
    expect(fn).toBeCalled();
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
    act(() => {
      wrapper.find('.ant-picker-cell').at(2).simulate('click');
    });
    act(() => {
      wrapper.find('.ant-btn-primary').simulate('submit');
    });
    await waitForComponentToPaint(wrapper);
    expect(onFinish).toHaveBeenCalledWith({
      date: '2020-09-02',
      dateWeek: '2020-37th',
      dateMonth: '2020-09',
      dateQuarter: '2020-Q2',
    });
  });

  it('📦 SearchSelect onSearch support', async () => {
    const onSearch = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selection-search-input').simulate('change', {
        target: {
          value: '全',
        },
      });
    });
    await waitForComponentToPaint(wrapper);

    expect(onSearch).toBeCalledWith('全');

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });
    expect(wrapper.find('.ant-select-item-option-content div span').text()).toBe('全');
  });

  it('📦 SearchSelect onSearch support valueEnum', async () => {
    const onSearch = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selection-search-input').simulate('change', {
        target: {
          value: '全',
        },
      });
    });
    await waitForComponentToPaint(wrapper);

    expect(onSearch).toBeCalledWith('全');

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });
    expect(wrapper.find('.ant-select-item-option-content div span').text()).toBe('全');
  });

  it('📦 SearchSelect onSearch support valueEnum clear', async () => {
    const onSearch = jest.fn();
    const onValuesChange = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selection-search-input').simulate('change', {
        target: {
          value: '全',
        },
      });
    });
    await waitForComponentToPaint(wrapper);

    expect(onSearch).toBeCalledWith('全');

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });
    expect(wrapper.find('.ant-select-item-option-content div span').text()).toBe('全');

    act(() => {
      wrapper.find('.ant-select-item').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    expect(onValuesChange).toBeCalledWith('全部');
  });

  it('📦 SearchSelect onSearch support valueEnum clear item filter', async () => {
    const onSearch = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selection-search-input').simulate('change', {
        target: {
          value: '全',
        },
      });
    });
    await waitForComponentToPaint(wrapper);

    expect(onSearch).toBeCalledWith('全');

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });
    expect(wrapper.find('.ant-select-item-option-content div span').text()).toBe('全');

    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-select-item').length).toBe(1);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('focus');
      wrapper.update();
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-select-item').length).toBe(4);
  });

  it('📦 SearchSelect support onClear', async () => {
    const onSearch = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selection-search-input').simulate('change', {
        target: {
          value: '全',
        },
      });
    });
    await waitForComponentToPaint(wrapper);

    expect(onSearch).toBeCalledWith('全');

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });
    expect(wrapper.find('.ant-select-item-option-content div span').text()).toBe('全');

    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-select-item').length).toBe(1);

    act(() => {
      wrapper.find('.ant-select-item-option-content div span').simulate('click');
      wrapper.update();
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select').simulate('mouseenter');
      wrapper.update();
    });
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('span.ant-select-clear').last().simulate('mousedown');
    });

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-select-item').length).toBe(4);
  });

  it('📦 SearchSelect support searchOnFocus', async () => {
    const onSearch = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selection-search-input').simulate('change', {
        target: {
          value: '全',
        },
      });
    });
    await waitForComponentToPaint(wrapper);

    expect(onSearch).toBeCalledWith('全');

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });
    expect(wrapper.find('.ant-select-item-option-content div span').text()).toBe('全');

    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-select-item').length).toBe(1);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('focus');
      wrapper.update();
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-select-item').length).toBe(4);
  });

  it('📦 SearchSelect support resetAfterSelect', async () => {
    const onSearch = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selection-search-input').simulate('change', {
        target: {
          value: '全',
        },
      });
    });
    await waitForComponentToPaint(wrapper);

    expect(onSearch).toBeCalledWith('全');

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });

    expect(wrapper.find('.ant-select-item').length).toBe(1);
    expect(wrapper.find('.ant-select-item-option-content div span').text()).toBe('全');

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });

    // 选中第一个
    act(() => {
      wrapper.find('.ant-select-item').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });

    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-select-item').length).toBe(4);
  });

  it('📦 SearchSelect support fetchDataOnSearch: false', async () => {
    const onRequest = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selection-search-input').simulate('change', {
        target: {
          value: '全',
        },
      });
    });
    await waitForComponentToPaint(wrapper);

    expect(onRequest.mock.calls.length).toBe(1);
  });

  it('📦 SearchSelect support fetchDataOnSearch: true', async () => {
    const onRequest = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selection-search-input').simulate('change', {
        target: {
          value: '全',
        },
      });
    });
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });

    await waitForComponentToPaint(wrapper);

    expect(onRequest.mock.calls.length).toBe(2);
  });

  it('📦 SearchSelect support multiple', async () => {
    const onSearch = jest.fn();
    const onFinish = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });
    await waitForComponentToPaint(wrapper);
    // 选中第一个
    act(() => {
      wrapper.find('.ant-select-item').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });

    // 选中第二个
    act(() => {
      wrapper.find('.ant-select-item').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-btn-primary').simulate('submit');
    });

    // 多次提交需要阻止
    act(() => {
      wrapper.find('.ant-btn-primary').simulate('submit');
    });

    await waitForComponentToPaint(wrapper);

    expect(onFinish).toBeCalledWith(2);
  });

  it('📦 SearchSelect filter support optionGroup', async () => {
    const onValuesChange = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selection-search-input').simulate('change', {
        target: {
          value: '门',
        },
      });
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });
    expect(wrapper.find('.ant-select-item-option-content div span').at(0).text()).toBe('门');

    // 应该有两个 item 被筛选出来
    expect(wrapper.find('div.ant-select-item.ant-select-item-option').length).toBe(2);

    act(() => {
      wrapper.find('.ant-select-item.ant-select-item-option').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    expect(onValuesChange).toBeCalledWith('门店小程序');

    // 应该有两个 item 被筛选出来
    expect(wrapper.find('div.ant-select-item.ant-select-item-option').length).toBe(4);
  });

  it('📦 SearchSelect filter support (', async () => {
    const onValuesChange = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selection-search-input').simulate('change', {
        target: {
          value: '(测试)',
        },
      });
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });
    expect(wrapper.find('.ant-select-item-option-content div span').at(0).text()).toBe('(测试)');

    // 应该有两个 item 被筛选出来
    expect(wrapper.find('div.ant-select-item.ant-select-item-option').length).toBe(1);

    act(() => {
      wrapper.find('.ant-select-item.ant-select-item-option').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    expect(onValuesChange).toBeCalledWith('门店小程序');

    // 应该有两个 item 被筛选出来
    expect(wrapper.find('div.ant-select-item.ant-select-item-option').length).toBe(4);
  });

  it('📦 SearchSelect support multiple and autoClearSearchValue: false ', async () => {
    const onSearch = jest.fn();
    const onFinish = jest.fn();

    const wrapper = mount(
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
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });

    await waitForComponentToPaint(wrapper);

    // 默认展示所有的7个选项
    expect(wrapper.find('div.ant-select-item.ant-select-item-option').length).toBe(4);
    // 默认输入框没有内容
    expect(wrapper.find('.ant-select-item-option-content div span').length).toBe(0);
    // input 元素的内容也为空
    expect(wrapper.find('input.ant-select-selection-search-input').props().value).toBe('');

    // 输入搜索内容
    act(() => {
      wrapper.find('.ant-select-selection-search-input').simulate('change', {
        target: {
          value: '解',
        },
      });
    });

    await waitForComponentToPaint(wrapper);

    // 应该有4个item 被筛选出来
    expect(wrapper.find('div.ant-select-item.ant-select-item-option').length).toBe(3);
    // input 也有输入的内容
    expect(wrapper.find('input.ant-select-selection-search-input').props().value).toBe('解');

    // 选中第一个
    act(() => {
      wrapper.find('.ant-select-item').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    // 选中的内容出现在 input 中
    expect(wrapper.find('.ant-select-item-option-content').at(0).text()).toBe('未解决');
    expect(wrapper.find('input.ant-select-selection-search-input').props().value).toBe('解');
    // 搜索的结果, 应该保持不变
    expect(wrapper.find('div.ant-select-item.ant-select-item-option').length).toBe(3);

    // 继续选中第二个
    act(() => {
      wrapper.find('.ant-select-item').at(1).simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    // 选中的内容出现在 input 中
    expect(wrapper.find('.ant-select-item-option-content').at(1).text()).toBe('已解决');
    expect(wrapper.find('input.ant-select-selection-search-input').props().value).toBe('解');

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });

    act(() => {
      wrapper.find('.ant-btn-primary').simulate('submit');
    });

    // 多次提交需要阻止
    act(() => {
      wrapper.find('.ant-btn-primary').simulate('submit');
    });

    await waitForComponentToPaint(wrapper);

    expect(onFinish).toBeCalledWith(2);
  });

  it('📦 Select support single', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });
    await waitForComponentToPaint(wrapper);
    // 选中第一个
    act(() => {
      wrapper.find('.ant-select-item').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });

    // 选中第二个
    act(() => {
      wrapper.find('.ant-select-item').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-btn-primary').simulate('submit');
    });

    await waitForComponentToPaint(wrapper);

    expect(onFinish).toBeCalledWith('open');
  });

  it('📦 ProFormSelect support filterOption', async () => {
    const onSearch = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selection-search-input').simulate('change', {
        target: {
          value: 'A',
        },
      });
    });
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });

    expect(wrapper.find('.ant-select-item').length).toBe(3);

    await waitForComponentToPaint(wrapper);
  });

  it('📦 Select filterOption support mixed case', async () => {
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selection-search-input').simulate('change', {
        target: {
          value: 'b',
        },
      });
    });
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });

    expect(wrapper.find('.ant-select-item').length).toBe(1);

    act(() => {
      wrapper.find('.ant-select-selection-search-input').simulate('change', {
        target: {
          value: 'B',
        },
      });
    });
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });

    expect(wrapper.find('.ant-select-item').length).toBe(1);

    await waitForComponentToPaint(wrapper);
  });

  it('📦 Select support labelInValue single', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });
    await waitForComponentToPaint(wrapper);
    // 选中第一个
    act(() => {
      wrapper.find('.ant-select-item').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });

    // 选中第二个
    act(() => {
      wrapper.find('.ant-select-item').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-btn-primary').simulate('submit');
    });

    await waitForComponentToPaint(wrapper);

    expect(onFinish).toBeCalledWith('open');
  });

  it('📦 Select support multiple unnamed async options', async () => {
    const wrapper = mount(
      <>
        <ProFormSelect id="select1" request={async () => [{ value: 1 }]} />
        <ProFormSelect id="select2" request={async () => [{ value: 2 }]} />
      </>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').at(0).simulate('mousedown');
      wrapper.find('.ant-select-selector').at(1).simulate('mousedown');
      wrapper.update();
    });
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('#select1 .ant-select-item').at(0).text()).toBe('1');
    expect(wrapper.find('#select2 .ant-select-item').at(0).text()).toBe('2');
  });

  it('📦 Select support multiple and autoClearSearchValue: false ', async () => {
    const onSearch = jest.fn();
    const onFinish = jest.fn();

    const wrapper = mount(
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
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });

    await waitForComponentToPaint(wrapper);

    // 默认展示所有的7个选项
    expect(wrapper.find('div.ant-select-item.ant-select-item-option').length).toBe(7);
    // 默认输入框没有内容
    expect(wrapper.find('.ant-select-item-option-content div span').length).toBe(0);
    // input 元素的内容也为空
    expect(wrapper.find('input.ant-select-selection-search-input').props().value).toBe('');

    // 输入搜索内容
    act(() => {
      wrapper.find('.ant-select-selection-search-input').simulate('change', {
        target: {
          value: '2',
        },
      });
    });

    await waitForComponentToPaint(wrapper);

    // 应该有4个item 被筛选出来
    expect(wrapper.find('div.ant-select-item.ant-select-item-option').length).toBe(4);
    // input 也有输入的内容
    expect(wrapper.find('input.ant-select-selection-search-input').props().value).toBe('2');

    // 选中第一个
    act(() => {
      wrapper.find('.ant-select-item').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    // 选中的内容出现在 input 中
    expect(wrapper.find('.ant-select-item-option-content').at(0).text()).toBe('网点2');
    expect(wrapper.find('input.ant-select-selection-search-input').props().value).toBe('2');
    // 搜索的结果, 应该保持不变
    expect(wrapper.find('div.ant-select-item.ant-select-item-option').length).toBe(4);

    // 继续选中第二个
    act(() => {
      wrapper.find('.ant-select-item').at(1).simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    // 选中的内容出现在 input 中
    expect(wrapper.find('.ant-select-item-option-content').at(1).text()).toBe('网点21');
    expect(wrapper.find('input.ant-select-selection-search-input').props().value).toBe('2');

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });

    act(() => {
      wrapper.find('.ant-btn-primary').simulate('submit');
    });

    // 多次提交需要阻止
    act(() => {
      wrapper.find('.ant-btn-primary').simulate('submit');
    });

    await waitForComponentToPaint(wrapper);

    expect(onFinish).toBeCalledWith(2);
  });

  it('📦 Select support multiple and autoClearSearchValue: true', async () => {
    const onSearch = jest.fn();
    const onFinish = jest.fn();

    const wrapper = mount(
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
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });

    await waitForComponentToPaint(wrapper);

    // 默认展示所有的7个选项
    expect(wrapper.find('div.ant-select-item.ant-select-item-option').length).toBe(7);
    // 默认输入框没有内容
    expect(wrapper.find('.ant-select-item-option-content div span').length).toBe(0);
    // input 元素的内容也为空
    expect(wrapper.find('input.ant-select-selection-search-input').props().value).toBe('');

    // 输入搜索内容
    act(() => {
      wrapper.find('.ant-select-selection-search-input').simulate('change', {
        target: {
          value: '2',
        },
      });
    });

    await waitForComponentToPaint(wrapper);

    // 应该有4个item 被筛选出来
    expect(wrapper.find('div.ant-select-item.ant-select-item-option').length).toBe(4);
    // input 也有输入的内容
    expect(wrapper.find('input.ant-select-selection-search-input').props().value).toBe('2');

    // 选中第一个
    act(() => {
      wrapper.find('.ant-select-item').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    // 选中的内容出现在 input 中
    expect(wrapper.find('.ant-select-item-option-content').at(0).text()).toBe('网点2');
    // 选中后， 会自动清空搜索内容
    expect(wrapper.find('input.ant-select-selection-search-input').props().value).toBe('');
    // 搜索的结果, 恢复到原始结果
    expect(wrapper.find('div.ant-select-item.ant-select-item-option').length).toBe(7);

    act(() => {
      wrapper.find('.ant-btn-primary').simulate('submit');
    });

    // 多次提交需要阻止
    act(() => {
      wrapper.find('.ant-btn-primary').simulate('submit');
    });

    await waitForComponentToPaint(wrapper);

    expect(onFinish).toBeCalledWith(1);
  });

  it('📦 ColorPicker support rgba', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <ProForm
        onValuesChange={async (values) => {
          onFinish(values?.color);
        }}
      >
        <ProFormColorPicker name="color" label="颜色选择" />
      </ProForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-pro-field-color-picker').simulate('click');
      wrapper.update();
    });
    await waitForComponentToPaint(wrapper);
    // 选中第一个
    act(() => {
      wrapper.find('.flexbox-fix').at(2).find('div span div').at(2).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 100);

    expect(onFinish).toBeCalledWith('#5b8ff9');

    act(() => {
      wrapper.find('#rc-editable-input-5').simulate('change', {
        target: {
          value: 2,
        },
      });
    });
    await waitForComponentToPaint(wrapper, 100);
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

    const wrapper = mount(<App />);
    await waitForComponentToPaint(wrapper);

    expect(fn1).toHaveBeenCalledWith('2021-08-09');

    act(() => {
      wrapper.find('.ant-picker-cell').at(2).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 100);
    expect(fn2).toHaveBeenCalledWith('2021-07-28');
    act(() => {
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  it('📦 DigitRange Will return undefined when both value equal to undefined', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <ProForm
        onFinish={async (values) => {
          onFinish(values?.digitRange);
        }}
      >
        <ProFormDigitRange name="digitRange" />
      </ProForm>,
    );
    await waitForComponentToPaint(wrapper);

    // 测试基本功能
    act(() => {
      wrapper
        .find('.ant-input-number-input')
        .at(0)
        .simulate('change', {
          target: {
            value: '1',
          },
        });
    });

    await waitForComponentToPaint(wrapper, 100);

    act(() => {
      wrapper
        .find('.ant-input-number-input')
        .at(1)
        .simulate('change', {
          target: {
            value: '2',
          },
        });
    });

    await waitForComponentToPaint(wrapper, 100);

    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 100);

    expect(onFinish).toBeCalledWith([1, 2]);

    // 测试清空两个值
    act(() => {
      wrapper
        .find('.ant-input-number-input')
        .at(0)
        .simulate('change', {
          target: {
            value: '',
          },
        });
    });

    await waitForComponentToPaint(wrapper, 100);

    act(() => {
      wrapper
        .find('.ant-input-number-input')
        .at(1)
        .simulate('change', {
          target: {
            value: '',
          },
        });
    });

    await waitForComponentToPaint(wrapper, 100);

    act(() => {
      wrapper.find('.ant-input-number-input').at(1).simulate('blur');
    });

    await waitForComponentToPaint(wrapper, 100);

    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });

    await waitForComponentToPaint(wrapper, 100);

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
        </ProForm>
      );
    };

    const wrapper = mount(<App />);
    await waitForComponentToPaint(wrapper);

    expect(fn1).toBeCalledWith('2021/08/09 12:12:12', 'dateTime');
    act(() => {
      wrapper.find('button.ant-btn-primary').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper, 100);
    expect(fn2).toHaveBeenCalledWith('2021/08/09 12:12:12');

    act(() => {
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  it(`📦 rules change should rerender`, () => {
    const html = reactRender(
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

    expect(html.baseElement.querySelectorAll('.ant-form-item-required').length).toBe(1);

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

    expect(html.baseElement.querySelectorAll('.ant-form-item-required').length).toBe(0);
  });

  it('📦 fix onChange will get empty object when you set labelInValue ture in ProForm', async () => {
    const onChange = jest.fn();
    const wrapper = mount(
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
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      wrapper.update();
    });
    await waitForComponentToPaint(wrapper);
    // 选中第一个
    act(() => {
      wrapper.find('.ant-select-item').at(0).simulate('click');
      wrapper.update();
    });

    await waitForComponentToPaint(wrapper);

    // 鼠标移入选中区域
    act(() => {
      wrapper.find('.ant-select').simulate('mouseenter');
      wrapper.update();
    });
    await waitForComponentToPaint(wrapper);

    // 点击删除按钮进行删除操作
    act(() => {
      wrapper.find('span.ant-select-clear').last().simulate('mousedown');
    });
    await waitForComponentToPaint(wrapper);

    expect(onChange).toBeCalledWith(undefined);
  });
});
