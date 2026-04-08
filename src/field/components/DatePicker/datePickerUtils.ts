import dayjs from 'dayjs';

export function formatDate(text: any, format: any) {
  if (!text) return '-';
  if (typeof format === 'function') {
    return format(dayjs(text));
  }
  return dayjs(text).format(
    (Array.isArray(format) ? format[0] : format) || 'YYYY-MM-DD',
  );
}
