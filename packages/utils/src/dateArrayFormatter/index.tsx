import type { Moment } from 'moment';
import moment from 'moment';

type FormatType = ((moment: Moment) => string) | string;

const formatString = (endText: any, format: FormatType) => {
  if (typeof format === 'function') {
    return format(moment(endText));
  }
  return moment(endText).format(format);
};

/**
 * 格式化区域日期
 *
 * @param value
 */
const dateArrayFormatter = (value: any[], format: FormatType | FormatType[]) => {
  const [startText, endText] = Array.isArray(value) ? value : [];

  let formatFirst: FormatType;
  let formatEnd: FormatType;

  if (Array.isArray(format)) {
    formatFirst = format[0];
    formatEnd = format[1];
  } else {
    formatFirst = format;
    formatEnd = format;
  }

  // activePickerIndex for https://github.com/ant-design/ant-design/issues/22158
  const parsedStartText: string = startText ? formatString(startText, formatFirst) : '';
  const parsedEndText: string = endText ? formatString(endText, formatEnd) : '';
  const valueStr: string =
    parsedStartText && parsedEndText ? `${parsedStartText} ~ ${parsedEndText}` : '';

  return valueStr;
};

export default dateArrayFormatter;
