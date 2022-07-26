import {
  LightFilter,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormSlider,
  ProFormText,
  ProFormTimePicker,
} from '@ant-design/pro-form';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import dayjs from 'dayjs';
import { mount } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';
import { act } from 'react-dom/test-utils';
import { waitForComponentToPaint } from '../util';

describe('LightFilter', () => {
  it(' 🪕 basic use', async () => {
    const onValuesChange = jest.fn();
    const onFinish = jest.fn();
    const wrapper = mount(
      <LightFilter
        initialValues={{
          name1: 'yutingzhao1991',
          name3: '2020-08-19',
        }}
        onFinish={onFinish}
        onValuesChange={(_, values) => onValuesChange(values)}
      >
        <ProFormText name="name1" label="名称" />
        <ProFormText name="name2" label="地址" secondary />
        <ProFormDatePicker name="name3" label="日期" />
      </LightFilter>,
    );
    expect(wrapper.find('div.ant-col.ant-form-item-control').length).toEqual(2);
    expect(wrapper.find('.ant-pro-core-field-label').at(0).text()).toEqual('名称: yutingzhao1991');
    expect(wrapper.find('.ant-pro-core-field-label').at(1).text()).toEqual('日期: 2020-08-19');
    act(() => {
      // click open more drowdown
      wrapper.find('.ant-pro-core-field-dropdown-label').at(1).simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('div.ant-col.ant-form-item-control').length).toEqual(3);

    act(() => {
      // change input in drowdown
      wrapper.find('.ant-pro-core-field-dropdown-content .ant-input').simulate('change', {
        target: {
          value: 'new value',
          name3: '2020-08-19',
        },
      });
      wrapper.find('.ant-pro-core-dropdown-footer .ant-btn.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(onValuesChange).toHaveBeenCalledWith({
      name1: 'yutingzhao1991',
      name2: 'new value',
      name3: '2020-08-19',
    });
    expect(onFinish).toHaveBeenCalledWith({
      name1: 'yutingzhao1991',
      name2: 'new value',
      name3: '2020-08-19',
    });

    act(() => {
      // clear input
      wrapper.find('.ant-pro-core-field-label .anticon-close').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(onValuesChange).toHaveBeenCalledWith({
      name2: 'new value',
      name3: '2020-08-19',
    });
    await waitForComponentToPaint(wrapper);

    expect(onFinish).toHaveBeenCalledWith({
      name2: 'new value',
      name3: '2020-08-19',
    });
    expect(wrapper.find('div.ant-col.ant-form-item-control').length).toEqual(3);
    act(() => {
      // change outside input
      wrapper.find('.ant-pro-core-field-label').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper
        .find('.ant-input')
        .at(0)
        .simulate('change', {
          target: {
            value: 'name1 update',
          },
        });
    });
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-btn.ant-btn-primary').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(onValuesChange).toHaveBeenCalledWith({
      name1: 'name1 update',
      name2: 'new value',
      name3: '2020-08-19',
    });

    act(() => {
      // DatePicker click
      wrapper.find('.ant-pro-core-field-label').at(1).simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-picker-cell-in-view').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(onFinish).toHaveBeenCalledWith({
      name1: 'name1 update',
      name2: 'new value',
      name3: '2020-08-01',
    });
  });

  it(' 🪕 single select', async () => {
    const wrapper = mount(
      <LightFilter
        initialValues={{
          name: 'Jack2',
        }}
      >
        <ProFormSelect
          label="名称"
          name="name"
          valueEnum={{
            Jack: '杰克',
            Jack2: '杰克2',
            TechUI: 'TechUI',
          }}
        />
      </LightFilter>,
    );

    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('名称: 杰克2');
    expect(wrapper.find('.ant-pro-core-field-label-arrow.anticon-down').length).toEqual(1);
    act(() => {
      wrapper.find('.ant-pro-core-field-label').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-core-field-label-arrow.anticon-down').length).toEqual(1);
    act(() => {
      wrapper.find('.ant-select-item').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('名称: 杰克');

    act(() => {
      // close
      wrapper.find('.ant-pro-core-field-label .anticon-close').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('名称');

    act(() => {
      wrapper.unmount();
    });
  });

  it(' 🪕 QueryFilter FormItem support footerRender', async () => {
    const wrapper = mount(
      <LightFilter
        initialValues={{
          name: 'Jack2',
        }}
        collapse
        footerRender={false}
      >
        <ProFormText name="name" label="名称" />
      </LightFilter>,
    );

    expect(wrapper.find('.ant-pro-form-light-filter-effective').length).toEqual(1);

    act(() => {
      wrapper.find('.ant-pro-form-light-filter-container').simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-pro-core-dropdown-footer').length).toEqual(0);

    act(() => {
      wrapper.unmount();
    });
  });

  it(' 🪕 QueryFilter FormItem support footer', async () => {
    const wrapper = mount(
      <LightFilter
        initialValues={{
          name: 'Jack2',
        }}
      >
        <ProFormText footerRender={false} name="name1" label="名称" />
      </LightFilter>,
    );

    act(() => {
      wrapper.find('.ant-pro-core-field-label').at(0).simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-pro-core-dropdown-footer').length).toEqual(0);

    act(() => {
      wrapper.unmount();
    });
  });

  it(' 🪕 select showSearch', async () => {
    const wrapper = mount(
      <LightFilter
        initialValues={{
          name: 'Jack2',
        }}
      >
        <ProFormSelect
          showSearch
          label="名称"
          name="name"
          valueEnum={{
            Jack: '杰克',
            Jack2: '杰克2',
            TechUI: 'TechUI',
          }}
        />
      </LightFilter>,
    );

    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('名称: 杰克2');
    expect(wrapper.find('.ant-pro-core-field-label-arrow.anticon-down').length).toEqual(1);
    act(() => {
      wrapper.find('.ant-pro-core-field-label').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-core-field-label-arrow.anticon-down').length).toEqual(1);
    act(() => {
      wrapper.find('.ant-input').simulate('change', {
        target: {
          value: 'tech',
        },
      });
    });
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('.ant-select-item').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('名称: TechUI');
    act(() => {
      // close
      wrapper.find('.ant-pro-core-field-label .anticon-close').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('名称');

    act(() => {
      wrapper.unmount();
    });
  });

  it(' 🪕 multiple select showSearch', async () => {
    const wrapper = mount(
      <LightFilter
        initialValues={{
          name: ['Jack2'],
        }}
      >
        <ProFormSelect
          showSearch
          label="名称"
          name="name"
          mode="multiple"
          valueEnum={{
            Jack: '杰克',
            Jack2: '杰克2',
            TechUI: 'TechUI',
            long: 'YES这是一个很长很长的测试阿aa阿ABCDEFGHIJKLM',
          }}
        />
      </LightFilter>,
    );

    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('名称: 杰克2');
    expect(wrapper.find('.ant-pro-core-field-label-arrow.anticon-down').length).toEqual(1);
    act(() => {
      wrapper.find('.ant-pro-core-field-label').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-core-field-label-arrow.anticon-down').length).toEqual(1);
    act(() => {
      wrapper.find('.ant-input').simulate('change', {
        target: {
          value: 'tech',
        },
      });
    });
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('.ant-select-item').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('.ant-input').simulate('change', {
        target: {
          value: 'YES',
        },
      });
    });
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('.ant-select-item').at(0).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual(
      '名称: 杰克2,TechUI,YES这是一个很长很长的测试阿aa阿ABCDEFGHIJKL...3项',
    );
    act(() => {
      // press Backspace
      wrapper.find('.ant-input').simulate('keyDown', { which: KeyCode.BACKSPACE });
    });

    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual(
      '名称: 杰克2,TechUI,YES这是一个很长很长的测试阿aa阿ABCDEFGHIJKL...3项',
    );

    act(() => {
      wrapper.unmount();
    });
  });

  it(' 🪕 DateRangePicker', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <LightFilter onFinish={onFinish}>
        <ProFormDateRangePicker name="date" label="日期范围" />
      </LightFilter>,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('日期范围');

    act(() => {
      wrapper.find('.ant-pro-core-field-label').simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('div.ant-picker-range').simulate('click');
    });
    await waitForComponentToPaint(wrapper, 100);

    act(() => {
      wrapper.find('.ant-picker-cell-inner').at(2).simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-picker-cell-inner').at(12).simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-pro-core-dropdown-footer .ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual(
      '日期范围: 2016-11-02 ~ 2016-11-12',
    );

    await waitForComponentToPaint(wrapper);
    expect(onFinish).toHaveBeenCalledWith({ date: ['2016-11-02', '2016-11-12'] });

    act(() => {
      // close
      wrapper.find('.ant-pro-core-field-label .anticon-close').simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('日期范围');

    act(() => {
      // 测试第二次再打开的情况
      wrapper.find('.ant-pro-core-field-label').simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('div.ant-picker-range').simulate('click');
    });
    await waitForComponentToPaint(wrapper, 100);

    act(() => {
      wrapper.find('.ant-picker-cell-inner').at(2).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('.ant-picker-cell-inner').at(12).simulate('click');
    });

    await waitForComponentToPaint(wrapper);

    act(() => {
      wrapper.find('.ant-pro-core-dropdown-footer .ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual(
      '日期范围: 2016-11-02 ~ 2016-11-12',
    );
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it(' 🪕 DateTimePicker', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <LightFilter onFinish={onFinish}>
        <ProFormDateTimePicker name="datetime" label="日期时间" />
      </LightFilter>,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('日期时间');
    act(() => {
      wrapper.find('.ant-pro-core-field-label').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('.ant-picker-cell-inner').at(5).simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual(
      '日期时间: 2016-11-05 07:22:44',
    );
    expect(onFinish).toHaveBeenCalledWith({ datetime: '2016-11-05 07:22:44' });

    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it(' 🪕 TimePicker', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <LightFilter onFinish={onFinish}>
        <ProFormTimePicker name="time" label="时间" />
      </LightFilter>,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('时间');
    act(() => {
      wrapper.find('.ant-pro-core-field-label').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('.ant-picker-now-btn').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('时间: 07:22:44');

    await waitForComponentToPaint(wrapper);
    expect(onFinish).toHaveBeenCalledWith({ time: '07:22:44' });

    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });
  it(' 🪕 ProFormRadio', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <LightFilter
        onFinish={onFinish}
        initialValues={{
          radio: 'quarterly',
        }}
      >
        <ProFormRadio.Group
          name="radio"
          radioType="button"
          options={[
            {
              value: 'weekly',
              label: '每周',
            },
            {
              value: 'quarterly',
              label: '每季度',
            },
            {
              value: 'monthly',
              label: '每月',
            },
            {
              value: 'yearly',
              label: '每年',
            },
          ]}
        />
      </LightFilter>,
    );

    await waitForComponentToPaint(wrapper, 100);
    expect(
      wrapper.find('.ant-radio-button-wrapper.ant-radio-button-wrapper-checked').text(),
    ).toEqual('每季度');
    act(() => {
      wrapper.find('.ant-radio-button-input').at(3).simulate('change');
    });
    await waitForComponentToPaint(wrapper, 100);
    expect(
      wrapper.find('.ant-radio-button-wrapper.ant-radio-button-wrapper-checked').text(),
    ).toEqual('每年');
    expect(onFinish).toHaveBeenCalledWith({ radio: 'yearly' });
    act(() => {
      wrapper.unmount();
    });
  });

  it(' 🪕 collapse mode', async () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <LightFilter
        onValuesChange={(values) => {
          onChange(values.name);
        }}
        collapse
        collapseLabel={<div className="collapselabel">open</div>}
        initialValues={{
          name: ['ant'],
        }}
      >
        <ProFormSelect
          label="名称"
          name="name"
          mode="multiple"
          valueEnum={{
            Bigfish: '大鱼',
            ant: '蚂蚁',
            TechUI: 'TechUI',
            long: '这个是一个特别长特别长的选项，选择之后会截断',
          }}
        />
        <ProFormDateRangePicker label="时间范围" name="range2" />
      </LightFilter>,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.collapselabel').text()).toEqual('open');
    expect(wrapper.find('.ant-pro-form-light-filter-effective').length).toEqual(1);
    act(() => {
      wrapper.find('.collapselabel').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-select-selection-item').text()).toEqual('蚂蚁');

    act(() => {
      // clear
      wrapper.find('.ant-btn-link').simulate('click');
    });
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.find('.ant-btn-primary').simulate('click');
    });
    await waitForComponentToPaint(wrapper);

    expect(onChange).toHaveBeenCalledWith(undefined);
    expect(wrapper.find('.ant-pro-form-light-filter-effective').length).toEqual(0);
    await waitForComponentToPaint(wrapper);
    act(() => {
      wrapper.unmount();
    });
  });

  it(' 🪕 allowClear false', async () => {
    const wrapper = mount(
      <LightFilter
        initialValues={{
          name1: 'yutingzhao1991',
          name3: '2020-08-19',
          sex: 'woman',
        }}
        onFinish={async (values) => console.log(values)}
      >
        <ProFormSelect
          name="sex"
          label="性别"
          showSearch
          allowClear={false}
          valueEnum={{
            man: '男',
            woman: '女',
          }}
        />
        <ProFormText name="name1" label="名称" allowClear={false} />
        <ProFormDatePicker name="name3" label="不能清空的日期" allowClear={false} />
        <ProFormSelect
          name="sex"
          label="性别"
          showSearch
          fieldProps={{
            allowClear: false,
          }}
          valueEnum={{
            man: '男',
            woman: '女',
          }}
        />
        <ProFormText
          name="name4"
          label="名称"
          fieldProps={{
            allowClear: false,
          }}
        />
        <ProFormDatePicker
          name="name5"
          label="不能清空的日期"
          fieldProps={{
            allowClear: false,
          }}
        />
      </LightFilter>,
    );
    await waitForComponentToPaint(wrapper);
    expect(wrapper.find('.ant-pro-core-field-label .anticon-close').length).toEqual(0);
    act(() => {
      wrapper.find('.ant-pro-core-field-label').at(1).simulate('click');
    });
    await waitForComponentToPaint(wrapper, 100);

    expect(wrapper.find('.ant-input').length).toEqual(1);
    expect(wrapper.find('.ant-input-suffix .close-circle').length).toEqual(0);
    act(() => {
      wrapper.unmount();
    });
  });

  it('🪕 ProFormField support lightProps', () => {
    const html = render(
      <LightFilter
        initialValues={{
          range: [1000000000, 1500000000],
        }}
      >
        <ProFormSlider
          name="range"
          label="活跃时间"
          range
          fieldProps={{
            min: 1000000000,
            max: 2000000000,
            tipFormatter: (v: number | undefined) => (
              <div>{v ? dayjs.unix(v).format('YYYY-MM-DD HH:mm:ss') : 0}</div>
            ),
          }}
          lightProps={{
            allowClear: false,
            labelFormatter: (values) => {
              return values
                ?.map((value: number) => {
                  return dayjs.unix(value).format('YYYY-MM-DD HH:mm:ss');
                })
                .join('~');
            },
          }}
        />
      </LightFilter>,
    );

    const inputDom = html.findAllByText('活跃时间: 2001-09-09 01:46:40~2017-07-14 0...2项');
    expect(!!inputDom).toBeTruthy();
  });

  it('🪕 lightFilter support placement', async () => {
    const wrapper = mount(
      <LightFilter
        initialValues={{
          name1: 'yutingzhao1991',
          name3: '2020-08-19',
          sex: 'man',
        }}
        placement="topRight"
        onFinish={async (values) => console.log(values)}
      >
        <ProFormSelect
          name="sex"
          label="性别"
          showSearch
          fieldProps={{
            allowClear: false,
          }}
          valueEnum={{
            man: '男',
            woman: '女',
          }}
        />
        <ProFormText
          name="name4"
          label="名称"
          fieldProps={{
            allowClear: false,
          }}
        />
      </LightFilter>,
    );
    // 两种加载模式都需要判断（需要lightWrapper和不需要的）
    wrapper.find('.ant-pro-core-field-label').at(0).simulate('click');
    expect(wrapper.find('Trigger').at(0).prop('popupPlacement')).toEqual('topRight');
    wrapper.find('.ant-pro-core-field-label').at(1).simulate('click');
    expect(wrapper.find('Trigger').at(1).prop('popupPlacement')).toEqual('topRight');
    act(() => {
      wrapper.unmount();
    });
  });

  it('🪕 component placement priority should higher then lightFilter', async () => {
    const wrapper = mount(
      <LightFilter
        initialValues={{
          name1: 'yutingzhao1991',
          name3: '2020-08-19',
          sex: 'man',
        }}
        placement="topRight"
      >
        <ProFormSelect
          name="sex"
          label="性别"
          showSearch
          fieldProps={{
            allowClear: false,
            placement: 'bottomRight',
          }}
          valueEnum={{
            man: '男',
            woman: '女',
          }}
        />
      </LightFilter>,
    );
    // 两种加载模式都需要判断（需要lightWrapper和不需要的）
    wrapper.find('.ant-pro-core-field-label').at(0).simulate('click');
    expect(wrapper.find('Trigger').at(0).prop('popupPlacement')).toEqual('bottomRight');
    act(() => {
      wrapper.unmount();
    });
  });
});
