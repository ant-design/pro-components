import React, { useEffect } from 'react';
import {
  conversionSubmitValue,
  parseValueToMoment,
  transformKeySubmitValue,
  isNil,
  isUrl,
  InlineErrorFormItem,
  useDebounceFn,
  pickProProps,
  DropdownFooter,
  LabelIconTip,
} from '@ant-design/pro-utils';
import { mount } from 'enzyme';
import { Form, Input } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { act } from 'react-dom/test-utils';
import { waitTime, waitForComponentToPaint } from '../util';
import isDropdownValueType from '../../packages/utils/src/isDropdownValueType/index';
import { CodeFilled } from '@ant-design/icons';

describe('utils', () => {
  it('📅 useDebounceFn', async () => {
    pickProProps({
      fieldProps: {
        name: 'string',
      },
    });
    const fn = jest.fn();
    const App = (props: { deps: string[] }) => {
      const fetchData = useDebounceFn(async () => fn(), props.deps);
      useEffect(() => {
        fetchData.run();
        return fetchData.cancel();
      }, []);
      return (
        <div
          id="test"
          onClick={() => {
            fetchData.run();
            fetchData.run();
          }}
        />
      );
    };
    const html = mount(<App deps={['name']} />);

    act(() => {
      html.find('#test').simulate('click');
    });

    await waitTime(100);

    act(() => {
      html.setProps({
        deps: ['string'],
      });
    });
    await waitTime(100);

    act(() => {
      act(() => {
        html.unmount();
      });
    });

    expect(fn).toBeCalledTimes(2);
  });

  it('📅 conversionSubmitValue nil', async () => {
    const html = conversionSubmitValue(
      {
        name: 'qixian',
        money: null,
      },
      'string',
      {
        name: 'text',
        money: 'text',
      },
      true,
    );
    expect(html.money === undefined).toBeTruthy();
  });

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

  it('📅 conversionSubmitValue string', async () => {
    const html = conversionSubmitValue(
      {
        dataTime: moment('2019-11-16 12:50:26'),
        time: moment('2019-11-16 12:50:26'),
      },
      'string',
      {
        dataTime: {
          valueType: 'dataTime',
          dateFormat: 'YY-MM',
        },
        time: 'time',
      },
    );
    expect(html.dataTime).toBe('19-11');
    expect(html.time).toBe('12:50:26');
  });

  it('📅 conversionSubmitValue namePath string', async () => {
    const html = conversionSubmitValue<any>(
      {
        date: {
          dataTime: moment('2019-11-16 12:50:26'),
          dateTimeRange: [moment('2019-11-16 12:50:26'), moment('2019-11-16 12:50:26')],
          dateRange: [moment('2019-11-16 12:50:26'), moment('2019-11-16 12:50:26')],
          timeRange: [moment('2019-11-16 12:50:26'), moment('2019-11-16 12:50:26')],
          timeRange2: [moment('2019-11-16 12:50:26'), moment('2019-11-16 12:50:26')],
        },
      },
      'string',
      {
        date: {
          dateTimeRange: 'dateTimeRange',
          dateRange: 'dateRange',
          timeRange: 'timeRange',
          dataTime: 'dateTime',
          timeRange2: 'dateTimeRange',
        },
      },
    );
    expect(html.date.dataTime).toBe('2019-11-16 12:50:26');
    expect(html.date.dateTimeRange.join(',')).toBe('2019-11-16 12:50:26,2019-11-16 12:50:26');
    expect(html.date.dateRange.join(',')).toBe('2019-11-16,2019-11-16');
    expect(html.date.timeRange2.join(',')).toBe('2019-11-16 12:50:26,2019-11-16 12:50:26');
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

  it('📅 DropdownFooter click', async () => {
    const html = mount(
      <DropdownFooter>
        <Input id="test" />
      </DropdownFooter>,
    );
    act(() => {
      html.find('.ant-pro-core-dropdown-footer').simulate('click');
    });
    expect(html.find('.ant-pro-core-dropdown-footer').exists()).toBeTruthy();
  });

  it('📅 InlineErrorFormItem onValuesChange', async () => {
    const ruleMessage = {
      required: '必填项',
      min: '最小长度为12',
      numberRequired: '必须包含数字',
      alphaRequired: '必须包含字母',
    };
    const html = mount(
      <Form>
        <InlineErrorFormItem
          errorType="popover"
          rules={[
            {
              required: true,
              message: ruleMessage.required,
            },
            {
              min: 12,
              message: ruleMessage.min,
            },
            {
              message: ruleMessage.numberRequired,
              pattern: /[0-9]/,
            },
            {
              message: ruleMessage.alphaRequired,
              pattern: /[a-zA-Z]/,
            },
          ]}
          popoverProps={{ trigger: 'focus' }}
          name="title"
        >
          <Input id="test" />
        </InlineErrorFormItem>
      </Form>,
    );

    act(() => {
      html.find('Input#test').simulate('focus');
    });
    await waitForComponentToPaint(html, 100);
    expect(html.find('div.ant-popover').exists()).toBeTruthy();
    expect(html.find('.ant-popover .anticon.anticon-check-circle').length).toEqual(0);
    expect(html.find('.ant-popover .anticon.anticon-close-circle').length).toEqual(0);

    act(() => {
      html.find('Input#test').simulate('change', {
        target: {
          value: '1',
        },
      });
    });
    await waitForComponentToPaint(html, 1000);

    const li = html.find('div.ant-popover .ant-popover-inner-content ul li');
    expect(li.length).toEqual(4);
    expect(li.at(0).find('.ant-space-item span').at(1).text()).toEqual(ruleMessage.required);
    expect(li.at(1).find('.ant-space-item span').at(1).text()).toEqual(ruleMessage.min);
    expect(li.at(2).find('.ant-space-item span').at(1).text()).toEqual(ruleMessage.numberRequired);
    expect(li.at(3).find('.ant-space-item span').at(1).text()).toEqual(ruleMessage.alphaRequired);
    expect(
      html
        .find('div.ant-popover .ant-progress-bg')
        .at(0)
        .getDOMNode()
        .getAttribute('style')
        ?.indexOf('width: 50%'),
    ).toBeGreaterThanOrEqual(0);
    expect(html.find('.ant-popover .anticon.anticon-check-circle').length).toEqual(2);

    act(() => {
      html.find('Input#test').simulate('change', {
        target: {
          value: '12345678901AB',
        },
      });
    });
    await waitForComponentToPaint(html, 1000);

    act(() => {
      html.find('Input#test').simulate('change', {
        target: {
          value: '.',
        },
      });
    });
    await waitForComponentToPaint(html, 1000);
    expect(html.find('div.ant-popover.ant-popover-hidden').exists()).toBeFalsy();
    expect(html.find('.ant-popover .anticon.anticon-check-circle').length).toEqual(1);

    act(() => {
      html.find('Input#test').simulate('change', {
        target: {
          value: '',
        },
      });
    });
    await waitForComponentToPaint(html, 1000);
    expect(html.find('div.ant-popover.ant-popover-hidden').exists()).toBeFalsy();
    expect(html.find('.ant-popover .anticon.anticon-check-circle').length).toEqual(0);
  });

  it('📅 InlineErrorFormItem no progress', async () => {
    const html = mount(
      <Form>
        <InlineErrorFormItem
          errorType="popover"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
          popoverProps={{ trigger: 'focus' }}
          name="title"
          progressProps={false}
        >
          <Input id="test" />
        </InlineErrorFormItem>
      </Form>,
    );
    act(() => {
      html.find('Input#test').simulate('focus');
    });
    act(() => {
      html.find('Input#test').simulate('change', {
        target: {
          value: '1',
        },
      });
    });
    await waitForComponentToPaint(html, 100);
    expect(html.find('div.ant-popover .ant-progress').exists()).toBeFalsy();
  });

  it('📅 InlineErrorFormItem have progress', async () => {
    const html = mount(
      <Form>
        <InlineErrorFormItem
          errorType="popover"
          rules={[
            {
              required: true,
              message: '必填项',
            },
            {
              min: 12,
              message: '最小长度12',
            },
          ]}
          popoverProps={{ trigger: 'focus' }}
          name="title"
        >
          <Input id="test" />
        </InlineErrorFormItem>
      </Form>,
    );
    act(() => {
      html.find('Input#test').simulate('focus');
    });
    act(() => {
      html.find('Input#test').simulate('change', {
        target: {
          value: '1',
        },
      });
    });
    await waitForComponentToPaint(html, 100);
    expect(html.find('div.ant-popover .ant-progress').exists()).toBeTruthy();
  });

  it('📅 transformKeySubmitValue return string', async () => {
    const html = transformKeySubmitValue(
      {
        dataTime: '2019-11-16 12:50:26',
        time: '2019-11-16 12:50:26',
        name: 'qixian',
        money: 20,
        dateTimeRange: ['2019-11-16 12:50:26', '2019-11-16 12:55:26'],
        dateRange: ['2019-11-16 12:50:26', '2019-11-16 12:55:26'],
      },
      {
        dataTime: () => 'new-dataTime',
        time: () => 'new-time',
        name: () => 'new-name',
        money: () => 'new-money',
      },
    );
    const htmlKeys = Object.keys(html).sort();
    expect(htmlKeys).toEqual(
      ['new-dataTime', 'new-time', 'new-name', 'new-money', 'dateTimeRange', 'dateRange'].sort(),
    );
    expect(htmlKeys).not.toEqual(
      ['dataTime', 'time', 'name', 'money', 'dateTimeRange', 'dateRange'].sort(),
    );
    expect((html as any)['new-dataTime']).toBe('2019-11-16 12:50:26');
    expect((html as any)['new-time']).toBe('2019-11-16 12:50:26');
    expect((html as any)['new-name']).toBe('qixian');
    expect((html as any)['new-money']).toBe(20);
    expect(html.dateTimeRange.join(',')).toBe('2019-11-16 12:50:26,2019-11-16 12:55:26');
    expect(html.dateRange.join(',')).toBe('2019-11-16 12:50:26,2019-11-16 12:55:26');
  });

  it('📅 transformKeySubmitValue return object', async () => {
    const html = transformKeySubmitValue(
      {
        dataTime: '2019-11-16 12:50:26',
        time: '2019-11-16 12:50:26',
        name: 'qixian',
        money: 20,
        test: {
          name: 'test',
        },
        dateTimeRange: {
          time: ['2019-11-16 12:50:26', '2019-11-16 12:55:26'],
        },
        dateRange: ['2019-11-16 12:50:26', '2019-11-16 12:55:26'],
      },
      {
        dateTimeRange: {
          // @ts-ignore
          time: (value: any) => ({
            dateTimeRange1: value[0],
            dateTimeRange2: value[1],
          }),
        },
        dateRange: (value: any) => ({
          dateRange1: value[0],
          dateRange2: value[1],
        }),
      },
    );
    const htmlKeys = Object.keys(html).sort();

    expect(htmlKeys).toEqual(
      [
        'dateTimeRange1',
        'dateTimeRange2',
        'dateRange1',
        'dateRange2',
        'dataTime',
        'time',
        'name',
        'test',
        'money',
      ].sort(),
    );

    expect(htmlKeys).not.toEqual(
      ['dataTime', 'time', 'name', 'money', 'dateTimeRange', 'dateRange'].sort(),
    );
    expect(html.dataTime).toBe('2019-11-16 12:50:26');
    expect(html.time).toBe('2019-11-16 12:50:26');
    expect(html.name).toBe('qixian');
    expect(html.money).toBe(20);
    expect((html as any).dateTimeRange1).toBe('2019-11-16 12:50:26');
    expect((html as any).dateTimeRange2).toBe('2019-11-16 12:55:26');
    expect((html as any).dateRange1).toBe('2019-11-16 12:50:26');
    expect((html as any).dateRange2).toBe('2019-11-16 12:55:26');
  });

  it('📅 transformKeySubmitValue return nest object', async () => {
    const html = transformKeySubmitValue(
      {
        a: {
          b: {
            name: 'test',
          },
        },
      },
      {
        a: {
          b: {
            name: (e: string) => ({
              a: {
                b: {
                  name: `qixian_${e}`,
                },
              },
            }),
          } as any,
        },
      },
    );
    expect(html.a.b.name).toBe('qixian_test');
  });

  it('📅 transformKeySubmitValue return array', async () => {
    const html = transformKeySubmitValue(
      {
        dataTime: '2019-11-16 12:50:26',
        time: '2019-11-16 12:50:26',
        name: 'qixian',
        money: 20,
        dateTimeRange: ['2019-11-16 12:50:26', '2019-11-16 12:55:26'],
        dateRange: ['2019-11-16 12:50:26', '2019-11-16 12:55:26'],
      },
      {
        dataTime: () => ['new-dataTime'],
        time: () => ['new-time'],
      },
    );
    const htmlKeys = Object.keys(html).sort();
    expect(htmlKeys).toEqual(
      ['dateRange', 'dateTimeRange', 'money', 'name', 'new-dataTime', 'new-time'].sort(),
    );
    expect(html['new-dataTime']).toBe('2019-11-16 12:50:26');
    expect(html['new-time']).toBe('2019-11-16 12:50:26');
    expect(html.name).toBe('qixian');
    expect(html.money).toBe(20);
    expect(html.dateTimeRange.join(',')).toBe('2019-11-16 12:50:26,2019-11-16 12:55:26');
    expect(html.dateRange.join(',')).toBe('2019-11-16 12:50:26,2019-11-16 12:55:26');
  });

  it('📅 transformKeySubmitValue ignore empty transform', async () => {
    const dataIn = {
      dataTime: '2019-11-16 12:50:26',
      time: '2019-11-16 12:50:26',
      name: 'qixian',
      money: 20,
      dateTimeRange: ['2019-11-16 12:50:26', '2019-11-16 12:55:26'],
      dateRange: ['2019-11-16 12:50:26', '2019-11-16 12:55:26'],
    };
    const html = transformKeySubmitValue(dataIn, {
      dataTime: undefined,
      time: undefined,
    });
    expect(html).toBe(dataIn);
  });

  it('📅 transformKeySubmitValue ignore React element', async () => {
    const labelInValue = { label: <div>test</div>, value: 'LABEL' };
    const dataIn = {
      dataTime: '2019-11-16 12:50:26',
      time: '2019-11-16 12:50:26',
      tag: labelInValue,
      money: 20,
      dateTimeRange: ['2019-11-16 12:50:26', '2019-11-16 12:55:26'],
      dateRange: ['2019-11-16 12:50:26', '2019-11-16 12:55:26'],
    };
    const html = transformKeySubmitValue(dataIn, {
      dataTime: () => ['new-dataTime'],
      time: undefined,
    });
    expect(html['new-dataTime']).toBe('2019-11-16 12:50:26');
    expect(html.tag).not.toBe(labelInValue);
    expect(React.isValidElement(html.tag.label)).toBeTruthy();
  });

  it('📅 transformKeySubmitValue ignore Blob', async () => {
    const file = new Blob(['foo'], { type: 'application/octet-stream' });
    const dataIn = {
      dataTime: '2019-11-16 12:50:26',
      time: '2019-11-16 12:50:26',
      file,
      files: [file],
    };
    const html = transformKeySubmitValue(dataIn, {
      dataTime: () => ['new-dataTime'],
      time: undefined,
    });
    expect(html['new-dataTime']).toBe('2019-11-16 12:50:26');
    expect(html.file).toBe(file);
    expect(html.files[0]).toBe(file);
  });

  it('📅 transformKeySubmitValue ignore null', async () => {
    const dataIn = {
      dataTime: '2019-11-16 12:50:26',
      time: '2019-11-16 12:50:26',
      file: null,
    };
    const html = transformKeySubmitValue(dataIn, {
      dataTime: () => ['new-dataTime'],
      time: undefined,
    });
    expect(html['new-dataTime']).toBe('2019-11-16 12:50:26');
    expect(html.file).toBe(undefined);
  });

  it('📅 isNil', async () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil(0)).toBe(false);
    expect(isNil('')).toBe(false);
    expect(isNil({})).toBe(false);
    expect(isNil(true)).toBe(false);
  });

  it('isUrl', async () => {
    expect(isUrl('https://procomponents.ant.design/components/layout')).toBe(true);
    expect(isUrl('https://procomponents.ant.design/en-US/components/layout#basic-usage')).toBe(
      true,
    );
    expect(isUrl('procomponents.ant.design/en-US/components/layout')).toBe(false);
    expect(isUrl('https:://procomponents.ant.design/en-US/components/layout')).toBe(false);
  });

  it('isDropdownValueType', async () => {
    expect(isDropdownValueType('date')).toBeTruthy();
    expect(isDropdownValueType('dateRange')).toBeFalsy();
    expect(isDropdownValueType('dateTimeRange')).toBeFalsy();
    expect(isDropdownValueType('timeRange')).toBeFalsy();
    expect(isDropdownValueType('select')).toBeTruthy();
  });
  it('LabelIconTip', async () => {
    const html = mount(
      <LabelIconTip
        label="xxx"
        subTitle="xxx"
        tooltip={{
          icon: <CodeFilled />,
        }}
      />,
    );

    act(() => {
      html.find('div').at(0).simulate('mousedown');
      html.find('div').at(0).simulate('mouseleave');
      html.find('div').at(0).simulate('mousemove');
    });

    expect(html.render()).toMatchSnapshot();
  });
});
