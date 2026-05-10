import type { Dayjs } from 'dayjs';

import { parseValueToDay } from '../../../utils/parseValueToMoment';

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

export function formatDate(text: any, format: any) {
  if (text === null || text === undefined || text === '') {
    return '-';
  }

  const parsed = parseValueToDay(text) as Dayjs | null | undefined | Dayjs[];
  if (Array.isArray(parsed) || !parsed || !parsed.isValid()) {
    return '-';
  }
  if (typeof parsed.format !== 'function') {
    return String(text);
  }

  if (typeof format === 'function') {
    return format(parsed);
  }

  return parsed.format(pickFormatTemplate(format));
}
