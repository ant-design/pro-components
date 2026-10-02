import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { isNil } from '../isNil';

dayjs.extend(customParseFormat);

type DateValue =
  | dayjs.Dayjs
  | dayjs.Dayjs[]
  | string
  | string[]
  | number
  | number[]
  | Date;

/**
 * 一个比较hack的moment判断工具
 * @param value
 * @returns
 */
const isMoment = (value: any): boolean => !!value?._isAMomentObject;

function hasOwn(source: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(source, key);
}

/**
 * Immer / JSON 后只剩 plain object，但 `$d` / `$isDayjsObject` 仍可还原为合法 Dayjs。
 * 若不处理，`dayjs(plain)` 会按「配置对象」解析导致无效值，进而使 rc-picker 报错。
 */
export function normalizeSerializedDayjsLike(
  value: unknown,
): dayjs.Dayjs | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  const rec = value as Record<string, unknown>;
  if (hasOwn(rec, '$d')) {
    const raw = rec.$d;
    if (isNil(raw) || raw === '') {
      return null;
    }
    const parsed =
      raw instanceof Date ? dayjs(raw) : dayjs(raw as string | number);
    return parsed.isValid() ? parsed : null;
  }
  if (
    rec.$isDayjsObject === true &&
    typeof (value as any).valueOf === 'function'
  ) {
    const ms = Number((value as any).valueOf());
    if (Number.isFinite(ms)) {
      const d = dayjs(ms);
      return d.isValid() ? d : null;
    }
  }
  return null;
}

export const parseValueToDay = (
  value: DateValue,
  formatter?: string | readonly string[],
): dayjs.Dayjs | dayjs.Dayjs[] | null | undefined => {
  if (isNil(value)) {
    return value as null | undefined;
  }
  if (Array.isArray(value)) {
    return (value as any[]).map(
      (v) => parseValueToDay(v, formatter) as dayjs.Dayjs,
    );
  }

  if (isMoment(value)) {
    return dayjs(value as any);
  }

  const serialized = normalizeSerializedDayjsLike(value);
  if (serialized) {
    return serialized;
  }

  if (dayjs.isDayjs(value)) {
    const d = value as dayjs.Dayjs;
    if (typeof d.clone === 'function' && d.isValid()) {
      return d;
    }
    const ms =
      typeof (d as any).valueOf === 'function'
        ? Number((d as any).valueOf())
        : NaN;
    if (Number.isFinite(ms)) {
      const fromMs = dayjs(ms);
      if (fromMs.isValid()) {
        return fromMs;
      }
    }
    return null;
  }

  if (typeof value === 'number') {
    return dayjs(value);
  }
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return dayjs(value);
  }
  if (typeof value === 'string') {
    /**
     * #8810:syncToUrl 回填的时间戳字符串(10 位秒/13 位毫秒)无法按 format 解析,
     * 导致 date 相关 valueType 显示为空。format 解析失败时按位数识别时间戳。
     */
    const parseTimestampString = (
      str: string,
    ): dayjs.Dayjs | null => {
      if (!/^\d+$/.test(str)) return null;
      const ms =
        str.length === 10
          ? Number(str) * 1000
          : str.length === 13
            ? Number(str)
            : null;
      if (ms === null) return null;
      const parsed = dayjs(ms);
      return parsed.isValid() ? parsed : null;
    };

    const formatters =
      typeof formatter === 'string'
        ? [formatter]
        : Array.isArray(formatter)
          ? formatter.filter((item): item is string => typeof item === 'string')
          : [];
    for (const currentFormatter of formatters) {
      const strict = dayjs(value, currentFormatter, true);
      if (strict.isValid()) return strict;
      /**
       * #8863:customParseFormat 对 `MM`/`DD` 等两位占位符要求严格位数,
       * 值为 `23/3/2024` + format `DD/MM/YYYY` 时解析失败。
       * 降级为单位数宽容形式(`M`/`D`/`H`/`m`/`s`)重试一次。
       */
      const lenientFormatter = currentFormatter.replace(
        /(MM|DD|HH|mm|ss)/g,
        (token) => token[0],
      );
      if (lenientFormatter !== currentFormatter) {
        const lenient = dayjs(value, lenientFormatter, true);
        if (lenient.isValid()) {
          return lenient;
        }
      }
    }
    const ts = parseTimestampString(value);
    if (ts) {
      return ts;
    }
    const parsed = dayjs(value);
    return parsed.isValid() ? parsed : null;
  }

  if (value && typeof value === 'object') {
    const ms =
      typeof (value as any).valueOf === 'function'
        ? Number((value as any).valueOf())
        : NaN;
    if (
      Number.isFinite(ms) &&
      ((value as any).$isDayjsObject === true || hasOwn(value as object, '$d'))
    ) {
      const fromMs = dayjs(ms);
      if (fromMs.isValid()) {
        return fromMs;
      }
    }
  }

  const fallbackFormatter: string | string[] | undefined =
    typeof formatter === 'string'
      ? formatter
      : formatter
        ? [...formatter]
        : undefined;
  const fallback = fallbackFormatter
    ? dayjs(value as any, fallbackFormatter)
    : dayjs(value as any);
  return fallback.isValid() ? fallback : null;
};
