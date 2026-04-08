export type Value = string | number | undefined | null;

export type ValuePair = Value[];

export type FieldDigitRangeProps = {
  text: ValuePair;
  placeholder?: string | string[];
  separator?: string;
  separatorWidth?: number;
};
