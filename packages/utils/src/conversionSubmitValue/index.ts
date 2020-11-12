import moment from 'moment';
import get from 'rc-util/lib/utils/get';
import isNil from '../isNil';

type DateFormatter = 'number' | 'string' | false;

const dateFormatterMap = {
  time: 'HH:mm:ss',
  timeRange: 'HH:mm:ss',
  date: 'YYYY-MM-DD',
  dateWeek: 'YYYY-wo',
  dateMonth: 'YYYY-MM',
  dateQuarter: 'YYYY-QQ',
  dateYear: 'YYYY',
  dateRange: 'YYYY-MM-DD',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  dateTimeRange: 'YYYY-MM-DD HH:mm:ss',
};

function isObject(o: any) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

export function isPlainObject(o: { constructor: any }) {
  if (isObject(o) === false) return false;

  // If has modified constructor
  const ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  const prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

const convertMoment = (value: moment.Moment, dateFormatter: DateFormatter, valueType: string) => {
  if (moment.isMoment(value)) {
    if (dateFormatter === 'number') {
      return value.valueOf();
    }
    return value.format(dateFormatterMap[valueType] || 'YYYY-MM-DD HH:mm:ss');
  }
  return value;
};

/**
 * 根据不同的格式转化 moment
 * @param value
 * @param dateFormatter
 * @param valueType
 */
const conversionMoment = (
  value: moment.Moment | moment.Moment[],
  dateFormatter: DateFormatter,
  valueType: string,
) => {
  if (!dateFormatter) {
    return value;
  }
  if (!Array.isArray(value)) {
    return convertMoment(value, dateFormatter, valueType);
  }
  return value.map((item) => convertMoment(item, dateFormatter, valueType));
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
  dateFormatter: DateFormatter,
  valueTypeMap: {
    [key: string]: any;
  },
  parentKey?: string,
): T => {
  const tmpValue = {} as T;

  Object.keys(value).forEach((key) => {
    const namePath = parentKey ? [parentKey, key] : [key];
    const valueType = get(valueTypeMap, namePath) || 'text';
    const itemValue = value[key];
    if (isNil(itemValue)) {
      return;
    }
    if (isPlainObject(itemValue)) {
      tmpValue[key] = conversionSubmitValue(itemValue, dateFormatter, valueTypeMap, key);
      return;
    }
    // 都没命中，原样返回
    tmpValue[key] = conversionMoment(itemValue, dateFormatter, valueType);
  });
  return tmpValue;
};

export default conversionSubmitValue;
