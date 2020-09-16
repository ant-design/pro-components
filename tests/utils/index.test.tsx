import {
  conversionSubmitValue,
  parseValueToMoment,
  isNil,
  ListToolBar,
} from '@ant-design/pro-utils';
import { SettingOutlined, FullscreenOutlined, DownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import * as React from 'react';
import { mount } from 'enzyme';
import moment, { Moment } from 'moment';

describe('utils', () => {
  it('📅 conversionSubmitValue string', async () => {
    const html = conversionSubmitValue(
      {
        dataTime: moment('2019-11-16 12:50:26'),
        time: moment('2019-11-16 12:50:26'),
        name: 'qixian',
        money: 20,
        dateTimeRange: [moment('2019-11-16 12:50:26'), moment('2019-11-16 12:50:26')],
        dateRange: [moment('2019-11-16 12:50:26'), moment('2019-11-16 12:50:26')],
        timeRange: [moment('2019-11-16 12:50:26'), moment('2019-11-16 12:50:26')],
        timeRange2: [moment('2019-11-16 12:50:26'), moment('2019-11-16 12:50:26')],
      },
      'string',
      {
        dataTime: 'dataTime',
        time: 'time',
        name: 'text',
        dateRange: 'dateRange',
        timeRange: 'timeRange',
      },
    );
    expect(html.dataTime).toBe('2019-11-16 12:50:26');
    expect(html.time).toBe('12:50:26');
    expect(html.name).toBe('qixian');
    expect(html.money).toBe(20);
    expect(html.dateTimeRange.join(',')).toBe('2019-11-16 12:50:26,2019-11-16 12:50:26');
    expect(html.dateRange.join(',')).toBe('2019-11-16,2019-11-16');
    expect(html.timeRange2.join(',')).toBe('2019-11-16 12:50:26,2019-11-16 12:50:26');
  });

  it('📅 conversionSubmitValue number', async () => {
    const html = conversionSubmitValue(
      {
        dataTime: moment('2019-11-16 12:50:26'),
        time: moment('2019-11-16 12:50:26'),
        name: 'qixian',
        money: 20,
        dateTimeRange: [moment('2019-11-16 12:50:26'), moment('2019-11-16 12:50:26')],
        dateRange: [moment('2019-11-16 12:50:26'), moment('2019-11-16 12:50:26')],
        timeRange: [moment('2019-11-16 12:50:26'), moment('2019-11-16 12:50:26')],
        timeRange2: [moment('2019-11-16 12:50:26'), moment('2019-11-16 12:50:26')],
      },
      'number',
      {
        dateTime: 'dataTime',
        time: 'time',
        name: 'text',
        dateRange: 'dateRange',
        timeRange: 'timeRange',
      },
    );
    expect(html.dataTime).toBe(1573908626000);
    expect(html.time).toBe(1573908626000);
    expect(html.name).toBe('qixian');
    expect(html.money).toBe(20);
    expect(html.dateTimeRange.join(',')).toBe('1573908626000,1573908626000');
    expect(html.dateRange.join(',')).toBe('1573908626000,1573908626000');
    expect(html.timeRange2.join(',')).toBe('1573908626000,1573908626000');
  });

  it('📅 conversionSubmitValue moment', async () => {
    const html = conversionSubmitValue(
      {
        dataTime: moment('2019-11-16 12:50:26'),
        time: moment('2019-11-16 12:50:26'),
        name: 'qixian',
        money: 20,
        dateTimeRange: [moment('2019-11-16 12:50:26'), moment('2019-11-16 12:50:26')],
        dateRange: [moment('2019-11-16 12:50:26'), moment('2019-11-16 12:50:26')],
        timeRange: [moment('2019-11-16 12:50:26'), moment('2019-11-16 12:50:26')],
        timeRange2: [moment('2019-11-16 12:50:26'), moment('2019-11-16 12:50:26')],
      },
      false,
      {
        dateTime: 'dataTime',
        time: 'time',
        name: 'text',
        dateRange: 'dateRange',
        timeRange: 'timeRange',
      },
    );
    expect(html.dataTime.valueOf()).toBe(1573908626000);
    expect(html.time.valueOf()).toBe(1573908626000);
    expect(html.name).toBe('qixian');
    expect(html.money).toBe(20);

    expect(html.dateTimeRange.map((item) => item.valueOf()).join(',')).toBe(
      '1573908626000,1573908626000',
    );
    expect(html.dateTimeRange.map((item) => item.valueOf()).join(',')).toBe(
      '1573908626000,1573908626000',
    );
    expect(html.dateTimeRange.map((item) => item.valueOf()).join(',')).toBe(
      '1573908626000,1573908626000',
    );
  });

  it('📅 parseValueToMoment moment', async () => {
    const html = parseValueToMoment(['2019-11-16 12:50:26', '2019-11-16 12:50:26'], 'YYYY-MM-DD');
    expect((html as Moment[]).map((item) => item.valueOf()).join(',')).toBe(
      '1573862400000,1573862400000',
    );
  });

  it('📅 isNil', async () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil(0)).toBe(false);
    expect(isNil('')).toBe(false);
    expect(isNil({})).toBe(false);
    expect(isNil(true)).toBe(false);
  });

  it('ListToolBar onAction', () => {
    const onAction = jest.fn();
    const wrapper = mount(
      <ListToolBar
        actions={[
          <Button>批量导入</Button>,
          <Button
            type="primary"
            onClick={() => {
              onAction('add');
            }}
          >
            添加
          </Button>,
        ]}
      />,
    );
    wrapper.find('button.ant-btn-primary').simulate('click');
    expect(onAction).toHaveBeenLastCalledWith('add');
  });

  it('ListToolBar onSettingClick', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <ListToolBar
        settings={[
          {
            icon: <SettingOutlined />,
            tooltip: '设置',
            onClick,
            key: 's-value',
          },
          {
            icon: <FullscreenOutlined />,
            tooltip: '全屏',
          },
        ]}
      />,
    );
    wrapper.find('.anticon-setting').simulate('click');
    expect(onClick).toHaveBeenLastCalledWith('s-value');
    expect(wrapper.find('.ant-divider').length).toEqual(0);
  });

  it('ListToolBar search left', () => {
    const onSearch = jest.fn();
    const wrapper = mount(
      <ListToolBar
        search={{
          placeholder: '自定义 placeholder',
          onSearch,
        }}
      />,
    );
    const inputEle = wrapper.find('input');
    inputEle.simulate('focus');
    inputEle.simulate('change', { target: { value: 'input 值' } });
    inputEle.simulate('keyDown', { keyCode: 13 });
    expect(wrapper.find('.ant-pro-core-toolbar-left input').prop('value')).toEqual('input 值');
    expect(onSearch).toHaveBeenCalled();
    expect(wrapper.find('input').prop('placeholder')).toEqual('自定义 placeholder');
  });

  it('ListToolBar search right', () => {
    const onSearch = jest.fn();
    const wrapper = mount(
      <ListToolBar
        title="I am title"
        search={{
          placeholder: '自定义 placeholder',
          onSearch,
        }}
      />,
    );
    const inputEle = wrapper.find('input');
    inputEle.simulate('focus');
    inputEle.simulate('change', { target: { value: 'input 值' } });
    inputEle.simulate('keyDown', { keyCode: 13 });
    expect(wrapper.find('.ant-pro-core-toolbar-right input').prop('value')).toEqual('input 值');
    expect(onSearch).toHaveBeenCalled();
    expect(wrapper.find('input').prop('placeholder')).toEqual('自定义 placeholder');
  });

  it('ListToolBar menu', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <ListToolBar
        menu={{
          type: 'dropdown',
          items: [
            {
              label: '全部事项',
              key: 'all',
            },
            {
              label: '已办事项',
              key: 'done',
            },
          ],
          onChange,
        }}
      />,
    );
    wrapper.find('.ant-pro-core-toolbar-dropdownmenu-label').simulate('click');
    wrapper.find('.ant-dropdown-menu-item').at(1).simulate('click');

    expect(onChange).toHaveBeenCalledWith('done');
  });

  it('ListToolBar inline menu', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <ListToolBar
        menu={{
          type: 'inline',
          items: [
            {
              label: '全部事项',
              key: 'all',
            },
            {
              label: '已办事项',
              key: 'done',
            },
          ],
          onChange,
        }}
      />,
    );
    wrapper.find('.ant-pro-core-toolbar-inlinemenu-item').at(1).simulate('click');
    expect(onChange).toHaveBeenCalledWith('done');
  });
});
