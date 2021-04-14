import React from 'react';
import { Button, Input } from 'antd';
import ProForm, {
  ProFormText,
  ProFormCaptcha,
  ProFormDatePicker,
  ProFormDependency,
  ProFormSelect,
  ProFormColorPicker,
  ProFormField,
} from '@ant-design/pro-form';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { waitTime, waitForComponentToPaint } from '../util';

describe('ProForm', () => {
  it('📦 submit props actionsRender=false', async () => {
    const wrapper = mount(<ProForm submitter={false} />);
    await waitForComponentToPaint(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('📦 ProForm support sync form url', async () => {
    const wrapper = mount(
      <ProForm onFinish={async () => {}} syncToUrl>
        <ProFormText name="navTheme" />
      </ProForm>,
    );
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('button.ant-btn-primary').simulate('click');
    });

    act(() => {
      wrapper.find('button.ant-btn').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper);

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

  it('📦 onFinish should simulate button close loading', async () => {
    const fn = jest.fn();
    const wrapper = mount(
      <ProForm
        onFinish={async () => {
          fn();
          await waitTime(1000);
          throw new Error('期贤');
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

    await waitForComponentToPaint(wrapper, 1000);

    expect(wrapper.find('.ant-btn-loading').exists()).toBe(false);
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
          render: () => [<a>test</a>],
        }}
      />,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.render()).toMatchSnapshot();
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
      wrapper.find('Input#testInput').simulate('change', {
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

  it('📦 SearchSelect onSearch support valueEnum', async () => {
    const onSearch = jest.fn();
    const onFinish = jest.fn();
    const wrapper = mount(
      <ProForm
        onValuesChange={async (values) => {
          console.log(values);
          //  {"disabled": undefined, "key": "all", "label": "全部", "value": "all"}
          onFinish(values.userQuery[0].label);
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

    expect(onFinish).toBeCalledWith('全部');
  });

  it('📦 SearchSelect onSearch support valueEnum', async () => {
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

  it('📦 SearchSelect support searchOnFocus', async () => {
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

    await waitForComponentToPaint(wrapper);

    expect(onFinish).toBeCalledWith(2);
  });

  it('📦 Select support singe', async () => {
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

  it('📦 Select support labelInValue singe', async () => {
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
});
