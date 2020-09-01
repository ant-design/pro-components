import moment, { Moment } from 'moment';

const dateFormatterMap = {
  time: 'HH:mm:ss',
  timeRange: 'HH:mm:ss',
  date: 'YYYY-MM-DD',
  dateRange: 'YYYY-MM-DD',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  dateTimeRange: 'YYYY-MM-DD HH:mm:ss',
};

/**
 * 根据不同的格式转化 moment
 * @param value
 * @param dateFormatter
 * @param valueType
 */
const conversionMoment = (
  value: moment.Moment | moment.Moment[],
  dateFormatter: 'number' | 'string' | false,
  valueType: string = 'dateTime',
) => {
  if (!dateFormatter) {
    return value;
  }
  if (moment.isMoment(value) && !Array.isArray(value)) {
    if (dateFormatter === 'number') {
      return value.valueOf();
    }
    return value.format(dateFormatterMap[valueType] || 'YYYY-MM-DD HH:mm:ss');
  }
  if (Array.isArray(value)) {
    return (value as moment.Moment[]).map((item) => {
      if (moment.isMoment(item)) {
        if (dateFormatter === 'number') {
          return item.valueOf();
        }
        return item.format(dateFormatterMap[valueType] || 'YYYY-MM-DD HH:mm:ss');
      }
      return item;
    });
  }
  return value;
};

/**
 * 这里主要是来转化一下数据
 * 将 moment 转化为 string
 * 将 all 默认删除
 * @param value
 * @param dateFormatter
 * @param proColumnsMap
 */
const conversionSubmitValue = <T = any>(
  value: T,
  dateFormatter: 'number' | 'string' | false,
  valueTypeMap: {
    [key: string]: string;
  },
): T => {
  const tmpValue = {};

  Object.keys(value).forEach((key) => {
    const valueType = valueTypeMap[key] || 'text';
    const itemValue = value[key];
    if (itemValue === undefined || itemValue === null) {
      return;
    }
    // 都没命中，原样返回
    tmpValue[key] = conversionMoment(itemValue, dateFormatter, valueType);
  });
  return tmpValue as T;
};

export default conversionSubmitValue;
