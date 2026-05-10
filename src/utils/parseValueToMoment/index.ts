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
  formatter?: string,
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
    const parsed = formatter ? dayjs(value, formatter) : dayjs(value);
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

  const fallback = formatter
    ? dayjs(value as any, formatter)
    : dayjs(value as any);
  return fallback.isValid() ? fallback : null;
};
