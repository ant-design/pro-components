import React, { useEffect } from 'react';
import {
  conversionSubmitValue,
  parseValueToMoment,
  transformKeySubmitValue,
  isNil,
  InlineErrorFormItem,
  useDebounceFn,
  pickProProps,
  DropdownFooter,
} from '@ant-design/pro-utils';
import { mount } from 'enzyme';
import { Form, Input } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';
import { act } from 'react-dom/test-utils';
import { waitTime, waitForComponentToPaint } from '../util';

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
    const html = mount(
      <Form>
        <InlineErrorFormItem
          rules={[
            {
              required: true,
            },
          ]}
          trigger="click"
          name="title"
        >
          <Input id="test" />
        </InlineErrorFormItem>
      </Form>,
    );
    act(() => {
      html.find('Input#test').simulate('change', {
        target: {
          value: '',
        },
      });
    });
    await waitForComponentToPaint(html, 100);
    act(() => {
      html.find('div.ant-form-item-has-error input').simulate('click');
    });
    await waitForComponentToPaint(html, 100);
    expect(html.find('div.ant-form-item-explain').exists()).toBeTruthy();
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
    expect(html['tag']).not.toBe(labelInValue);
    expect(html.tag.label).toBe(labelInValue.label);
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
    expect(html['file']).toBe(file);
    expect(html.files[0]).toBe(file);
  });

  it('📅 isNil', async () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil(0)).toBe(false);
    expect(isNil('')).toBe(false);
    expect(isNil({})).toBe(false);
    expect(isNil(true)).toBe(false);
  });
});
