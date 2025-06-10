import type { InternalNamePath, NamePath } from 'antd/lib/form/interface';
import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import get from 'rc-util/lib/utils/get';
import { isNil } from '../isNil';
import type { ProFieldValueType } from '../typing';

dayjs.extend(quarterOfYear);

type DateFormatter =
  | (string & {})
  | 'number'
  | 'string'
  | ((value: dayjs.Dayjs, valueType: string) => string | number)
  | false;

export const dateFormatterMap = {
  time: 'HH:mm:ss',
  timeRange: 'HH:mm:ss',
  date: 'YYYY-MM-DD',
  dateWeek: 'YYYY-wo',
  dateMonth: 'YYYY-MM',
  dateQuarter: 'YYYY-[Q]Q',
  dateYear: 'YYYY',
  dateRange: 'YYYY-MM-DD',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  dateTimeRange: 'YYYY-MM-DD HH:mm:ss',
};
/**
 * 判断是不是一个 object
 * @param  {any} o
 * @returns boolean
 */
function isObject(o: any): boolean {
  return Object.prototype.toString.call(o) === '[object Object]';
}
/**
 * 判断是否是一个的简单的 object
 * @param  {{constructor:any}} o
 * @returns boolean
 */
export function isPlainObject(o: { constructor: any }): boolean {
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

/**
 *  一个比较hack的moment判断工具
 * @param  {any} value
 * @returns boolean
 */
const isMoment = (value: any): boolean => !!value?._isAMomentObject;

/**
 * 根据不同的格式转化 dayjs
 * @param  {dayjs.Dayjs} value
 * @param  {string|((value:dayjs.Dayjs} dateFormatter
 * @param  {string} valueType
 */
export const convertMoment = (
  value: dayjs.Dayjs,
  dateFormatter: DateFormatter,
  valueType: string,
) => {
  if (!dateFormatter) {
    return value;
  }

  if (dayjs.isDayjs(value) || isMoment(value)) {
    if (dateFormatter === 'number') {
      return value.valueOf();
    }
    if (dateFormatter === 'string') {
      return value.format(
        dateFormatterMap[valueType as 'date'] || 'YYYY-MM-DD HH:mm:ss',
      );
    }
    if (typeof dateFormatter === 'string' && dateFormatter !== 'string') {
      return value.format(dateFormatter);
    }
    if (typeof dateFormatter === 'function') {
      return dateFormatter(value, valueType);
    }
  }
  return value;
};

/**
 * 这里主要是来转化一下数据 将 dayjs 转化为 string 将 all 默认删除
 * @param  {T} value
 * @param  {DateFormatter} dateFormatter
 * @param  {Record<string} valueTypeMap
 * @param  {ProFieldValueType;dateFormat:string;}|any>} |{valueType
 * @param  {boolean} omitNil?
 * @param  {NamePath} parentKey?
 */
export const conversionMomentValue = <T extends {} = any>(
  value: T,
  dateFormatter: DateFormatter,
  valueTypeMap: Record<
    string,
    | {
        valueType: ProFieldValueType;
        dateFormat: string;
      }
    | any
  >,
  omitNil?: boolean,
  parentKey?: NamePath,
): T => {
  const tmpValue = {} as Record<string, any> as T;
  if (typeof window === 'undefined') return value;
  // 如果 value 是 string | null | Blob类型 其中之一，直接返回
  // 形如 {key: [File, File]} 的表单字段当进行第二次递归时会导致其直接越过 typeof value !== 'object' 这一判断 https://github.com/ant-design/pro-components/issues/2071
  if (
    typeof value !== 'object' ||
    isNil(value) ||
    value instanceof Blob ||
    Array.isArray(value)
  ) {
    return value;
  }
  Object.keys(value as Record<string, any>).forEach((valueKey) => {
    const namePath: InternalNamePath = parentKey
      ? ([parentKey, valueKey].flat(1) as string[])
      : [valueKey];
    const valueFormatMap = get(valueTypeMap, namePath) || 'text';

    let valueType: ProFieldValueType = 'text';
    let dateFormat: string | undefined;
    if (typeof valueFormatMap === 'string') {
      valueType = valueFormatMap as ProFieldValueType;
    } else if (valueFormatMap) {
      valueType = valueFormatMap.valueType;
      dateFormat = valueFormatMap.dateFormat;
    }
    const itemValue = (value as Record<string, any>)[valueKey];
    if (isNil(itemValue) && omitNil) {
      return;
    }
    // 处理嵌套的情况
    if (
      isPlainObject(itemValue) &&
      // 不是数组
      !Array.isArray(itemValue) &&
      // 不是 dayjs
      !dayjs.isDayjs(itemValue) &&
      // 不是 moment
      !isMoment(itemValue)
    ) {
      (tmpValue as any)[valueKey] = conversionMomentValue(
        itemValue,
        dateFormatter,
        valueTypeMap,
        omitNil,
        namePath,
      );
      return;
    }
    // 处理 FormList 的 value
    if (Array.isArray(itemValue)) {
      (tmpValue as any)[valueKey] = itemValue.map((arrayValue, index) => {
        if (dayjs.isDayjs(arrayValue) || isMoment(arrayValue)) {
          return convertMoment(
            arrayValue,
            dateFormat || dateFormatter,
            valueType,
          );
        }
        return conversionMomentValue(
          arrayValue,
          dateFormatter,
          valueTypeMap,
          omitNil,
          [valueKey, `${index}`].flat(1),
        );
      });
      return;
    }
    (tmpValue as any)[valueKey] = convertMoment(
      itemValue,
      dateFormat || dateFormatter,
      valueType,
    );
  });

  return tmpValue;
};
