import dayjs from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';

import { parseValueToDay } from '../../../utils';
import '../../initDayjs';

dayjs.extend(quarterOfYear);

export type DatePickerReadPicker =
  | 'time'
  | 'date'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year';

function pickFormatTemplate(format: unknown): string {
  if (Array.isArray(format)) {
    const head = format[0];
    return typeof head === 'string' && head ? head : 'YYYY-MM-DD';
  }
  if (typeof format === 'string' && format) {
    return format;
  }
  return 'YYYY-MM-DD';
}

export function formatDate(
  text: any,
  format: any,
  _picker?: DatePickerReadPicker,
) {
  if (text === null || text === undefined || text === '') {
    return '-';
  }

  const parsed = parseValueToDay(text) as
    | dayjs.Dayjs
    | null
    | undefined
    | dayjs.Dayjs[];
  if (Array.isArray(parsed) || !parsed || !parsed.isValid()) {
    return '-';
  }
  if (typeof parsed.format !== 'function') {
    return String(text);
  }

  if (typeof format === 'function') {
    return format(parsed);
  }

  const tpl = pickFormatTemplate(format);
  return parsed.format(tpl);
}
