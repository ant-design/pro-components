import dayjs from 'dayjs';
import isNil from '../isNil';

type DateValue = dayjs.Dayjs | dayjs.Dayjs[] | string | string[] | number | number[];

const parseValueToDay = (
  value: DateValue,
  formatter?: string,
): dayjs.Dayjs | dayjs.Dayjs[] | null | undefined => {
  if (isNil(value) || dayjs.isDayjs(value)) {
    return value as dayjs.Dayjs | null | undefined;
  }
  if (Array.isArray(value)) {
    return (value as any[]).map((v) => parseValueToDay(v, formatter) as dayjs.Dayjs);
  }
  if (typeof value === 'number') return dayjs(value);
  return dayjs(value, formatter);
};

export default parseValueToDay;
