import { mount } from 'enzyme';
import React from 'react';
import {
  LightFilter,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormTimePicker,
  ProFormRadio,
} from '@ant-design/pro-form';
import KeyCode from 'rc-util/lib/KeyCode';
import { waitTime } from '../util';

describe('LightFilter', () => {
  it('basic use', async () => {
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

    // click open more drowdown
    wrapper.find('.ant-pro-core-field-dropdown-label').at(1).simulate('click');
    expect(wrapper.find('div.ant-col.ant-form-item-control').length).toEqual(3);

    // change input in drowdown
    wrapper.find('.ant-input').simulate('change', {
      target: {
        value: 'new value',
        name3: '2020-08-19',
      },
    });
    wrapper.find('.ant-btn.ant-btn-primary').simulate('click');
    expect(onValuesChange).toHaveBeenCalledWith({
      name1: 'yutingzhao1991',
      name2: 'new value',
      name3: '2020-08-19',
    });
    await waitTime();
    expect(onFinish).toHaveBeenCalledWith({
      name1: 'yutingzhao1991',
      name2: 'new value',
      name3: '2020-08-19',
    });

    // clear input
    wrapper.find('.ant-pro-core-field-label .anticon-close').at(0).simulate('click');
    expect(onValuesChange).toHaveBeenCalledWith({
      name2: 'new value',
      name3: '2020-08-19',
    });
    await waitTime();
    expect(onFinish).toHaveBeenCalledWith({
      name2: 'new value',
      name3: '2020-08-19',
    });
    expect(wrapper.find('div.ant-col.ant-form-item-control').length).toEqual(3);

    // change outside input
    wrapper.find('.ant-pro-core-field-label').at(0).simulate('click');
    wrapper.find('.ant-input').simulate('change', {
      target: {
        value: 'name1 update',
      },
    });
    wrapper.find('.ant-btn.ant-btn-primary').simulate('click');
    expect(onValuesChange).toHaveBeenCalledWith({
      name1: 'name1 update',
      name2: 'new value',
      name3: '2020-08-19',
    });

    // DatePicker click
    wrapper.find('.ant-pro-core-field-label').at(2).simulate('click');
    wrapper.find('.ant-picker-cell-in-view').at(0).simulate('click');
    await waitTime();
    expect(onFinish).toHaveBeenCalledWith({
      name1: 'name1 update',
      name2: 'new value',
      name3: '2020-08-01',
    });
  });

  it('single select', () => {
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
    wrapper.find('.ant-pro-core-field-label').simulate('click');
    expect(wrapper.find('.ant-pro-core-field-label-arrow.anticon-down').length).toEqual(1);
    wrapper.find('.ant-select-item').at(0).simulate('click');
    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('名称: 杰克');

    // close
    wrapper.find('.ant-pro-core-field-label .anticon-close').simulate('click');
    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('名称');

    wrapper.unmount();
  });

  it('select showSearch', () => {
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
    wrapper.find('.ant-pro-core-field-label').simulate('click');
    expect(wrapper.find('.ant-pro-core-field-label-arrow.anticon-down').length).toEqual(1);
    wrapper.find('.ant-input').simulate('change', {
      target: {
        value: 'tech',
      },
    });
    wrapper.find('.ant-select-item').at(0).simulate('click');
    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('名称: TechUI');

    // close
    wrapper.find('.ant-pro-core-field-label .anticon-close').simulate('click');
    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('名称');

    wrapper.unmount();
  });

  it('multiple select showSearch', () => {
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
            long: 'YES这是一个很长很长的测试阿aa阿ABCS',
          }}
        />
      </LightFilter>,
    );

    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('名称: 杰克2');
    expect(wrapper.find('.ant-pro-core-field-label-arrow.anticon-down').length).toEqual(1);
    wrapper.find('.ant-pro-core-field-label').simulate('click');
    expect(wrapper.find('.ant-pro-core-field-label-arrow.anticon-down').length).toEqual(1);
    wrapper.find('.ant-input').simulate('change', {
      target: {
        value: 'tech',
      },
    });
    wrapper.find('.ant-select-item').at(0).simulate('click');
    wrapper.find('.ant-input').simulate('change', {
      target: {
        value: 'YES',
      },
    });
    wrapper.find('.ant-select-item').at(0).simulate('click');
    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual(
      '名称: 杰克2,TechUI,YES这是...3项',
    );
    // press Backspace
    wrapper.find('.ant-input').simulate('keyDown', { which: KeyCode.BACKSPACE });
    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual(
      '名称: 杰克2,TechUI,YES这是...3项',
    );

    wrapper.unmount();
  });

  it('DateRangePicker', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <LightFilter onFinish={onFinish}>
        <ProFormDateRangePicker name="date" label="日期范围" />
      </LightFilter>,
    );

    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('日期范围');
    wrapper.find('.ant-pro-core-field-label').simulate('click');
    wrapper.find('.ant-picker-cell-inner').at(2).simulate('click');
    wrapper.find('.ant-picker-cell-inner').at(12).simulate('click');

    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual(
      '日期范围: 2016-11-01 ~ 2016-11-11',
    );

    await waitTime();
    expect(onFinish).toHaveBeenCalledWith({ date: ['2016-11-01', '2016-11-11'] });

    // close
    wrapper.find('.ant-pro-core-field-label .anticon-close').simulate('click');
    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('日期范围');

    // 测试第二次再打开的情况
    wrapper.find('.ant-pro-core-field-label').simulate('click');
    wrapper.find('.ant-picker-cell-inner').at(2).simulate('click');
    wrapper.find('.ant-picker-cell-inner').at(12).simulate('click');

    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual(
      '日期范围: 2016-11-01 ~ 2016-11-11',
    );

    wrapper.unmount();
  });

  it('DateTimePicker', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <LightFilter onFinish={onFinish}>
        <ProFormDateTimePicker name="datetime" label="日期时间" />
      </LightFilter>,
    );

    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('日期时间');
    wrapper.find('.ant-pro-core-field-label').simulate('click');
    wrapper.find('.ant-picker-cell-inner').at(5).simulate('click');
    wrapper.find('.ant-btn-primary').simulate('click');

    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual(
      '日期时间: 2016-11-04 07:22:44',
    );

    await waitTime();
    expect(onFinish).toHaveBeenCalledWith({ datetime: '2016-11-04 07:22:44' });
    wrapper.unmount();
  });

  it('TimePicker', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <LightFilter onFinish={onFinish}>
        <ProFormTimePicker name="time" label="时间" />
      </LightFilter>,
    );

    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('时间');
    wrapper.find('.ant-pro-core-field-label').simulate('click');
    wrapper.find('.ant-picker-now-btn').simulate('click');

    expect(wrapper.find('.ant-pro-core-field-label').text()).toEqual('时间: 07:22:44');

    await waitTime();
    expect(onFinish).toHaveBeenCalledWith({ time: '07:22:44' });
    wrapper.unmount();
  });

  it('ProFormRadio', async () => {
    const onFinish = jest.fn();
    const wrapper = mount(
      <LightFilter
        onFinish={onFinish}
        initialValues={{
          radio: 'queterly',
        }}
      >
        <ProFormRadio.Group name="radio">
          <ProFormRadio.Button value="weekly">每周</ProFormRadio.Button>
          <ProFormRadio.Button value="queterly">每季度</ProFormRadio.Button>
          <ProFormRadio.Button value="monthly">每月</ProFormRadio.Button>
          <ProFormRadio.Button value="yearly">每年</ProFormRadio.Button>
        </ProFormRadio.Group>
      </LightFilter>,
    );

    expect(
      wrapper.find('.ant-radio-button-wrapper.ant-radio-button-wrapper-checked').text(),
    ).toEqual('每季度');
    wrapper.find('.ant-radio-button-input').at(3).simulate('change');
    wrapper.update();
    await waitTime();
    expect(
      wrapper.find('.ant-radio-button-wrapper.ant-radio-button-wrapper-checked').text(),
    ).toEqual('每年');
    expect(onFinish).toHaveBeenCalledWith({ radio: 'yearly' });
    wrapper.unmount();
  });

  it('collapse mode', async () => {
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

    expect(wrapper.find('.collapselabel').text()).toEqual('open');
    expect(wrapper.find('.ant-pro-form-light-filter-effective').length).toEqual(1);
    wrapper.find('.collapselabel').simulate('click');
    expect(wrapper.find('.ant-select-selection-item').text()).toEqual('蚂蚁');

    // clear
    wrapper.find('.ant-btn-link').simulate('click');
    wrapper.find('.ant-btn-primary').simulate('click');

    expect(onChange).toHaveBeenCalledWith(undefined);
    expect(wrapper.find('.ant-pro-form-light-filter-effective').length).toEqual(0);

    wrapper.unmount();
  });
});
