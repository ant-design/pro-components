import moment, { Moment } from 'moment';

type DateValue = moment.Moment | moment.Moment[] | string | string[] | number | number[];

const parseValueToMoment = (
  value: DateValue,
  formatter?: string,
): moment.Moment | moment.Moment[] | null | undefined => {
  if (value === null || value === undefined) {
    return value;
  }
  if (Array.isArray(value)) {
    return (value as any[]).map((v) => {
      return parseValueToMoment(v, formatter) as moment.Moment;
    });
  }
  if (moment.isMoment(value)) {
    return value;
  }
  return moment(value, formatter);
};

export default parseValueToMoment;
