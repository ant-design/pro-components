import { CodeFilled } from '@ant-design/icons';
import {
  compareVersions,
  conversionSubmitValue,
  dateArrayFormatter,
  DropdownFooter,
  InlineErrorFormItem,
  isDeepEqualReact,
  isDropdownValueType,
  isNil,
  isUrl,
  LabelIconTip,
  lighten,
  menuOverlayCompatible,
  merge,
  nanoid,
  openVisibleCompatible,
  parseValueToDay,
  pickProProps,
  setAlpha,
  transformKeySubmitValue,
  useDebounceFn,
  useDebounceValue,
} from '@ant-design/pro-utils';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { Form, Input } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

describe('utils', () => {
  beforeEach(() => {
    delete process.env.ANTD_VERSION;
  });
  afterEach(() => {
    delete process.env.ANTD_VERSION;
  });

  it('lighten', () => {
    const color = lighten('#000', 50);
    expect(color).toBe('#808080');
  });

  it('compareVersions', () => {
    expect(compareVersions('2.0.0', '1.0.0')).toBe(1);
    expect(compareVersions('1.0.0', '2.0.0')).toBe(-1);
    expect(compareVersions('1.0.0', '1.0.0')).toBe(0);
    expect(compareVersions('1.0.0', '1.0.0-beta.6')).toBe(1);
  });

  it('openVisibleCompatible', () => {
    expect(openVisibleCompatible(true).open).toBeTruthy();
    expect(openVisibleCompatible(true).visible === undefined).toBeTruthy();
    process.env.ANTD_VERSION = '4.20.0';
    expect(openVisibleCompatible(true).visible).toBeTruthy();
    expect(openVisibleCompatible(true).open === undefined).toBeTruthy();
  });

  it('menuOverlayCompatible', () => {
    expect(menuOverlayCompatible({ items: [] }).menu).toBeTruthy();
    process.env.ANTD_VERSION = '4.20.0';
    expect(menuOverlayCompatible({ items: [] }).overlay).toBeTruthy();
  });

  it('setAlpha', () => {
    const color = setAlpha('#fff', 0.5);
    expect(color).toBe('rgba(255, 255, 255, 0.5)');
  });

  it('📅 useDebounceValue', async () => {
    jest.useFakeTimers();
    const App = (props: { deps: string[] }) => {
      const value = useDebounceValue(props.deps?.[0], 200, props.deps);

      return <>{value}</>;
    };

    const html = render(<App deps={['name']} />);

    await html.findByText('name');

    expect(html.baseElement?.textContent).toEqual('name');

    act(() => {
      html.rerender(<App deps={['string']} />);
    });

    await html.findByText('name');

    expect(html.baseElement?.textContent).toEqual('name');

    await html.findByText('string');

    await act(() => {
      return jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(html.baseElement?.textContent).toEqual('string');
    });
  });

  it('📅 dateArrayFormatter', async () => {
    const dateArrayString = dateArrayFormatter(
      [dayjs('2020-01-01'), dayjs('2020-01-01')],
      ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD'],
    );

    expect(dateArrayString).toEqual('2020-01-01 00:00:00 ~ 2020-01-01');
  });
  it('📅 dateArrayFormatter support function', async () => {
    const dateArrayString = dateArrayFormatter(
      [dayjs('2020-01-01'), dayjs('2020-01-01')],
      ['YYYY-MM-DD HH:mm:ss', (value: Dayjs) => value.format('YYYY-MM')],
    );

    expect(dateArrayString).toEqual('2020-01-01 00:00:00 ~ 2020-01');
  });

  it('📅 dateArrayFormatter support moment function', async () => {
    const dateArrayString = dateArrayFormatter(
      [moment('2020-01-01'), moment('2020-01-01')],
      ['YYYY-MM-DD HH:mm:ss', (value: Dayjs) => value.format('YYYY-MM')],
    );

    expect(dateArrayString).toEqual('2020-01-01 00:00:00 ~ 2020-01');
  });

  it('📅 useDebounceValue without deps', async () => {
    jest.useFakeTimers();

    const App = (props: { deps: string[] }) => {
      const [, forceUpdate] = useState([]);
      const value = useDebounceValue(props.deps?.[0]);

      useEffect(() => {
        setTimeout(() => {
          forceUpdate([]);
        }, 1000);
      }, []);

      return <>{value}</>;
    };

    const html = render(<App deps={['name']} />);

    await html.findByText('name');

    expect(html.baseElement?.textContent).toEqual('name');

    act(() => {
      html.rerender(<App deps={['string']} />);
    });

    await html.findByText('name');

    expect(html.baseElement?.textContent).toEqual('name');

    await act(() => {
      return jest.runAllTimers();
    });

    await waitFor(() => {
      expect(html.baseElement?.textContent).toEqual('string');
    });

    jest.useRealTimers();
  });

  it('📅 useDebounceFn', async () => {
    pickProProps({
      fieldProps: {
        name: 'string',
      },
    });

    jest.useFakeTimers();
    const fn = jest.fn();
    const App = ({ wait }: { wait?: number }) => {
      const fetchData = useDebounceFn(async () => fn(), wait);
      useEffect(() => {
        fetchData.run();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return (
        <div
          id="test"
          onClick={() => {
            fetchData.run();
            fetchData.run();
          }}
        >
          test
        </div>
      );
    };
    const html = render(<App />);

    await html.findByText('test');

    expect(fn).toBeCalledTimes(1);

    // wait === undefined
    act(() => {
      html.baseElement.querySelector<HTMLDivElement>('#test')?.click();
    });

    expect(fn).toBeCalledTimes(3);

    act(() => {
      html.rerender(<App wait={80} />);
    });

    await act(() => {
      return jest.runOnlyPendingTimers();
    });

    act(() => {
      html.baseElement.querySelector<HTMLDivElement>('#test')?.click();
    });

    await act(() => {
      return jest.runOnlyPendingTimers();
    });

    await html.findByText('test');

    await act(() => {
      expect(fn).toBeCalledTimes(4);
    });

    act(() => {
      html.rerender(<App wait={0} />);
    });

    act(() => {
      html.baseElement.querySelector<HTMLDivElement>('#test')?.click();
    });

    await act(() => {
      expect(fn).toBeCalledTimes(6);
    });

    // wait === 100 but callback is cancelled

    act(() => {
      html.rerender(<App wait={100} />);
    });

    act(() => {
      html.baseElement.querySelector<HTMLDivElement>('#test')?.click();
    });

    await act(() => {
      return jest.runOnlyPendingTimers();
    });

    html.unmount();

    expect(fn).toBeCalledTimes(7);

    jest.useRealTimers();
  });

  it('📅 useDebounceFn execution has errors', async () => {
    pickProProps({
      fieldProps: {
        name: 'string',
      },
    });

    jest.useFakeTimers();

    const error = new Error('debounce error');
    const catchFn = jest.fn();
    const App = ({ wait }: { wait?: number }) => {
      const fetchData = useDebounceFn(async () => {
        throw error;
      }, wait);

      useEffect(() => {
        fetchData.run().catch(catchFn);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return <div />;
    };

    render(<App />);

    await waitFor(() => {
      expect(catchFn).toBeCalledWith(error);
    });

    jest.useRealTimers();
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

  it('📅 merge values not change null', () => {
    const html = merge<{
      status: null;
    }>({}, { status: null });
    expect(html.status).toEqual(null);
  });

  it('📅 conversionSubmitValue string', async () => {
    const html = conversionSubmitValue(
      {
        dataTime: dayjs('2019-11-16 12:50:26'),
        time: dayjs('2019-11-16 12:50:26'),
        name: 'qixian',
        money: 20,
        dateTimeRange: [
          dayjs('2019-11-16 12:50:26'),
          dayjs('2019-11-16 12:50:26'),
        ],
        dateRange: [dayjs('2019-11-16 12:50:26'), dayjs('2019-11-16 12:50:26')],
        timeRange: [dayjs('2019-11-16 12:50:26'), dayjs('2019-11-16 12:50:26')],
        timeRange2: [
          dayjs('2019-11-16 12:50:26'),
          dayjs('2019-11-16 12:50:26'),
        ],
        dateQuarter: dayjs('2019-11-16 12:50:26'),
      },
      'string',
      {
        dataTime: 'dataTime',
        time: 'time',
        name: 'text',
        dateRange: 'dateRange',
        timeRange: 'timeRange',
        dateQuarter: 'dateQuarter',
      },
    );
    expect(html.dataTime).toBe('2019-11-16 12:50:26');
    expect(html.time).toBe('12:50:26');
    expect(html.name).toBe('qixian');
    expect(html.money).toBe(20);
    expect(html.dateTimeRange.join(',')).toBe(
      '2019-11-16 12:50:26,2019-11-16 12:50:26',
    );
    expect(html.dateRange.join(',')).toBe('2019-11-16,2019-11-16');
    expect(html.timeRange2.join(',')).toBe(
      '2019-11-16 12:50:26,2019-11-16 12:50:26',
    );
    expect(html.dateQuarter).toBe('2019-Q4');
  });

  it('📅 conversionSubmitValue string', async () => {
    const html = conversionSubmitValue(
      {
        dataTime: dayjs('2019-11-16 12:50:26'),
        time: dayjs('2019-11-16 12:50:26'),
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
          dataTime: dayjs('2019-11-16 12:50:26'),
          dateTimeRange: [
            dayjs('2019-11-16 12:50:26'),
            dayjs('2019-11-16 12:50:26'),
          ],
          dateRange: [
            dayjs('2019-11-16 12:50:26'),
            dayjs('2019-11-16 12:50:26'),
          ],
          timeRange: [
            dayjs('2019-11-16 12:50:26'),
            dayjs('2019-11-16 12:50:26'),
          ],
          timeRange2: [
            dayjs('2019-11-16 12:50:26'),
            dayjs('2019-11-16 12:50:26'),
          ],
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
    expect(html.date.dateTimeRange.join(',')).toBe(
      '2019-11-16 12:50:26,2019-11-16 12:50:26',
    );
    expect(html.date.dateRange.join(',')).toBe('2019-11-16,2019-11-16');
    expect(html.date.timeRange2.join(',')).toBe(
      '2019-11-16 12:50:26,2019-11-16 12:50:26',
    );
  });

  it('📅 conversionSubmitValue number', async () => {
    const html = conversionSubmitValue(
      {
        dataTime: dayjs('2019-11-16 12:50:26'),
        time: dayjs('2019-11-16 12:50:26'),
        name: 'qixian',
        money: 20,
        dateTimeRange: [
          dayjs('2019-11-16 12:50:26'),
          dayjs('2019-11-16 12:50:26'),
        ],
        dateRange: [dayjs('2019-11-16 12:50:26'), dayjs('2019-11-16 12:50:26')],
        timeRange: [dayjs('2019-11-16 12:50:26'), dayjs('2019-11-16 12:50:26')],
        timeRange2: [
          dayjs('2019-11-16 12:50:26'),
          dayjs('2019-11-16 12:50:26'),
        ],
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

  it('📅 conversionSubmitValue dayjs', async () => {
    const html = conversionSubmitValue(
      {
        dataTime: dayjs('2019-11-16 12:50:26'),
        time: dayjs('2019-11-16 12:50:26'),
        name: 'qixian',
        money: 20,
        dateTimeRange: [
          dayjs('2019-11-16 12:50:26'),
          dayjs('2019-11-16 12:50:26'),
        ],
        dateRange: [dayjs('2019-11-16 12:50:26'), dayjs('2019-11-16 12:50:26')],
        timeRange: [dayjs('2019-11-16 12:50:26'), dayjs('2019-11-16 12:50:26')],
        timeRange2: [
          dayjs('2019-11-16 12:50:26'),
          dayjs('2019-11-16 12:50:26'),
        ],
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

  it('📅 parseValueToMoment dayjs', async () => {
    const html = parseValueToDay(
      ['2019-11-16 12:50:26', '2019-11-16 12:50:26'],
      'YYYY-MM-DD',
    );
    expect((html as Dayjs[]).map((item) => item.valueOf()).join(',')).toBe(
      '1573862400000,1573862400000',
    );
  });

  it('📅 parseValueToMoment moment to dayjs', async () => {
    const html = parseValueToDay(
      [moment(1573862400000), moment(1573862400000)] as any[],
      'YYYY-MM-DD',
    );
    expect((html as Dayjs[]).map((item) => item.valueOf()).join(',')).toBe(
      '1573862400000,1573862400000',
    );
  });

  it('📅 DropdownFooter click', async () => {
    const html = render(
      <DropdownFooter>
        <Input id="test" />
      </DropdownFooter>,
    );
    act(() => {
      html.baseElement
        .querySelector<HTMLDivElement>('.ant-pro-core-dropdown-footer')
        ?.click();
    });
    expect(
      !!html.baseElement.querySelector<HTMLDivElement>(
        '.ant-pro-core-dropdown-footer',
      ),
    ).toBeTruthy();
  });

  it('📅 InlineErrorFormItem onValuesChange', async () => {
    const ruleMessage = {
      required: '必填项',
      min: '最小长度为12',
      numberRequired: '必须包含数字',
      alphaRequired: '必须包含字母',
    };
    const html = render(
      <Form>
        <span>text</span>
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
          <Input id="test" role="test_input" />
        </InlineErrorFormItem>
      </Form>,
    );

    await html.findByText('text');

    await act(async () => {
      (await html.findByRole('test_input')).focus();
    });

    await waitFor(() => {
      expect(!!html.baseElement.querySelector('div.ant-popover')).toBeFalsy();
    });

    await act(async () => {
      const dom = await html.findByRole('test_input');
      fireEvent.change(dom!, {
        target: {
          value: '1',
        },
      });
    });

    await waitFor(() => {
      expect(!!html.baseElement.querySelector('div.ant-popover')).toBeTruthy();
    });
    const li = html.baseElement.querySelectorAll(
      'div.ant-popover .ant-popover-inner-content div.ant-form-item-explain-error',
    );
    expect(li.length > 0).toBeTruthy();
    expect(li[0].textContent).toBe(ruleMessage.min);
    expect(li[1].textContent).toBe(ruleMessage.alphaRequired);
    await act(async () => {
      const dom = await html.findByRole('test_input');
      fireEvent.change(dom!, {
        target: {
          value: '12345678901AB',
        },
      });
    });

    await waitFor(() => {
      return html.findAllByDisplayValue('12345678901AB');
    });

    await act(async () => {
      const dom = await html.findByRole('test_input');
      fireEvent.change(dom!, {
        target: {
          value: '.',
        },
      });
    });
    await waitFor(() => {
      expect(
        html.baseElement.querySelectorAll('div.ant-popover.ant-popover-hidden')
          .length > 0,
      ).toBeFalsy();
    });

    await act(async () => {
      const dom = await html.findByRole('test_input');
      fireEvent.change(dom!, {
        target: {
          value: '',
        },
      });
    });
    await waitFor(() => {
      expect(
        html.baseElement.querySelectorAll('div.ant-popover.ant-popover-hidden')
          .length > 0,
      ).toBeFalsy();
    });
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
        dateRange2: ['2019-11-16 12:50:26', '2019-11-16 12:55:26'],
      },
      {
        dataTime: () => 'new-dataTime',
        time: () => 'new-time',
        name: () => 'new-name',
        money: () => 'new-money',
        // @ts-ignore
        dateRange2: [
          (itemValue, _, tempValues) => tempValues,
          () => 'dateRange',
        ],
      },
    );
    const htmlKeys = Object.keys(html).sort();
    expect(htmlKeys).toEqual(
      [
        'new-dataTime',
        'new-time',
        'dateRange2',
        'new-name',
        'new-money',
        'dateTimeRange',
        'dateRange',
      ].sort(),
    );
    expect(htmlKeys).not.toEqual(
      [
        'dataTime',
        'time',
        'name',
        'dateRange2',
        'money',
        'dateTimeRange',
        'dateRange',
      ].sort(),
    );
    expect((html as any)['new-dataTime']).toBe('2019-11-16 12:50:26');
    expect((html as any)['new-time']).toBe('2019-11-16 12:50:26');
    expect((html as any)['new-name']).toBe('qixian');
    expect((html as any)['new-money']).toBe(20);
    expect(html.dateTimeRange.join(',')).toBe(
      '2019-11-16 12:50:26,2019-11-16 12:55:26',
    );
    expect(html.dateRange.join(',')).toBe(
      '2019-11-16 12:50:26,2019-11-16 12:55:26',
    );
  });

  it('📅 transformKeySubmitValue will return file', async () => {
    //@ts-expect-error
    const html = transformKeySubmitValue(false, {
      dataTime: () => 'new-dataTime',
      time: () => 'new-time',
      name: () => 'new-name',
      money: () => 'new-money',
    });
    expect(html).toBeFalsy();
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
      [
        'dataTime',
        'time',
        'name',
        'money',
        'dateTimeRange',
        'dateRange',
      ].sort(),
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
        d: new Map(),
        e: new Set(),
        f: document.createElement('div'),
        c: new RegExp('/'),
        g: React.createElement('a', {}),
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

  it('📅 transformKeySubmitValue for array', async () => {
    const html = transformKeySubmitValue(
      [
        {
          name: 1,
        },
        {
          name: 2,
        },
        {
          f: [1, 2, 4],
        },
      ],
      {
        1: {
          name: (e: string) => {
            return {
              name: 2,
              name2: `qixian_${e}`,
            };
          },
        },
      },
    );

    //@ts-expect-error
    expect(html[1].name2).toBe('qixian_2');
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
      [
        'dateRange',
        'dateTimeRange',
        'money',
        'name',
        'new-dataTime',
        'new-time',
      ].sort(),
    );
    expect(html['new-dataTime']).toBe('2019-11-16 12:50:26');
    expect(html['new-time']).toBe('2019-11-16 12:50:26');
    expect(html.name).toBe('qixian');
    expect(html.money).toBe(20);
    expect(html.dateTimeRange.join(',')).toBe(
      '2019-11-16 12:50:26,2019-11-16 12:55:26',
    );
    expect(html.dateRange.join(',')).toBe(
      '2019-11-16 12:50:26,2019-11-16 12:55:26',
    );
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

  it('🪓 isUrl', async () => {
    expect(isUrl('https://procomponents.ant.design/components/layout')).toBe(
      true,
    );
    expect(
      isUrl(
        'https://procomponents.ant.design/en-US/components/layout#basic-usage',
      ),
    ).toBe(true);
    expect(isUrl('procomponents.ant.design/en-US/components/layout')).toBe(
      false,
    );
    expect(
      isUrl('https:://procomponents.ant.design/en-US/components/layout'),
    ).toBe(false);
  });

  it('🪓 isDropdownValueType', async () => {
    expect(isDropdownValueType('date')).toBeTruthy();
    expect(isDropdownValueType('dateRange')).toBeFalsy();
    expect(isDropdownValueType('dateTimeRange')).toBeFalsy();
    expect(isDropdownValueType('timeRange')).toBeFalsy();
    expect(isDropdownValueType('select')).toBeTruthy();
  });

  it('🪓 LabelIconTip', async () => {
    const html = render(
      <LabelIconTip
        label="xxx"
        subTitle="xxx"
        tooltip={{
          icon: <CodeFilled />,
          overlay: 'tetx',
        }}
      />,
    );

    act(() => {
      const dom = html.baseElement.querySelector('div.ant-pro-core-label-tip');
      fireEvent.mouseDown(dom!);
      fireEvent.mouseLeave(dom!);
      fireEvent.mouseMove(dom!);
    });

    await html.findAllByText('xxx');

    expect(html.asFragment()).toMatchSnapshot();
  });

  it('🪓 isDeepEqualReact', async () => {
    const CustomComponent: React.FC<any> = () => {
      return <div />;
    };

    class Deep {
      constructor() {
        return;
      }
      a() {}
      b() {}
    }

    const DeepComponent = () => {
      const a = (
        <CustomComponent
          array={[
            1,
            2,
            3,
            4,
            { deep: true, nested: { deep: true, ignoreKey: false } },
          ]}
          map={
            new Map([
              ['key', 'value'],
              ['key2', 'value2'],
              ['key3', 'value3'],
            ])
          }
          set={new Set([1, 2, 3, 4, 5])}
          regexp={new RegExp('test', 'ig')}
          arrayBuffer={new Int8Array([1, 2, 3, 4, 5])}
          string="compare"
          number={0}
          null={null}
          nan={NaN}
          class={Deep}
          classInstance={new Deep()}
          className="class-name"
        />
      );

      const b = (
        <CustomComponent
          array={[
            1,
            2,
            3,
            4,
            { deep: true, nested: { deep: true, ignoreKey: true } },
          ]}
          map={
            new Map([
              ['key', 'value'],
              ['key2', 'value2'],
              ['key3', 'value3'],
            ])
          }
          set={new Set([1, 2, 3, 4, 5])}
          regexp={new RegExp('test', 'ig')}
          arrayBuffer={new Int8Array([1, 2, 3, 4, 5])}
          string="compare"
          number={0}
          null={null}
          nan={NaN}
          class={Deep}
          classInstance={new Deep()}
          className="class-name"
        />
      );

      return (
        <>
          <span>{isDeepEqualReact(a, b, ['ignoreKey']) ? 'Equal' : 'No'}</span>
          <CustomComponent a={a} b={b} />
        </>
      );
    };
    const html = render(<DeepComponent />);

    await html.findAllByText('Equal');
  });

  it('🪓 nanoid', () => {
    window.crypto.randomUUID = jest.fn(() => '1234567890abcdef');

    const id = nanoid();

    expect(id).toBe('1234567890abcdef');
  });
});
