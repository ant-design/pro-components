import { conversionSubmitValue } from '@ant-design/pro-utils';
import moment from 'moment';

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
        value: 'dataTime',
        time: 'time',
        name: 'text',
        dateRange: 'dateRange',
        timeRange: 'timeRange',
      },
    );
    expect(html.dataTime).toBe('2016-11-22 07:22:44');
    expect(html.time).toBe('07:22:44');
    expect(html.name).toBe('qixian');
    expect(html.money).toBe(20);
    expect(html.dateTimeRange.join(',')).toBe('2016-11-22 07:22:44,2016-11-22 07:22:44');
    expect(html.dateRange.join(',')).toBe('2016-11-22,2016-11-22');
    expect(html.timeRange2.join(',')).toBe('2016-11-22 07:22:44,2016-11-22 07:22:44');
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
        value: 'dataTime',
        time: 'time',
        name: 'text',
        dateRange: 'dateRange',
        timeRange: 'timeRange',
      },
    );
    expect(html.dataTime).toBe(1479799364000);
    expect(html.time).toBe(1479799364000);
    expect(html.name).toBe('qixian');
    expect(html.money).toBe(20);
    expect(html.dateTimeRange.join(',')).toBe('1479799364000,1479799364000');
    expect(html.dateRange.join(',')).toBe('1479799364000,1479799364000');
    expect(html.timeRange2.join(',')).toBe('1479799364000,1479799364000');
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
        value: 'dataTime',
        time: 'time',
        name: 'text',
        dateRange: 'dateRange',
        timeRange: 'timeRange',
      },
    );
    expect(html.dataTime.valueOf()).toBe(1479799364000);
    expect(html.time.valueOf()).toBe(1479799364000);
    expect(html.name).toBe('qixian');
    expect(html.money).toBe(20);

    expect(html.dateTimeRange.map((item) => item.valueOf()).join(',')).toBe(
      '1479799364000,1479799364000',
    );
    expect(html.dateTimeRange.map((item) => item.valueOf()).join(',')).toBe(
      '1479799364000,1479799364000',
    );
    expect(html.dateTimeRange.map((item) => item.valueOf()).join(',')).toBe(
      '1479799364000,1479799364000',
    );
  });
});
