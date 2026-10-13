import { objectToMap } from '../../utils/proFieldParsingText';
import type {
  ProFieldValueEnumType,
  RequestOptionsType,
} from '../../utils/typing';

/** Convert a valueEnum to Select options without importing the Select component. */
export const proFieldParsingValueEnumToArray = (
  valueEnumParams: ProFieldValueEnumType,
): Partial<RequestOptionsType>[] => {
  const enumArray: Partial<
    RequestOptionsType & { text: string; disabled?: boolean }
  >[] = [];
  const valueEnum = objectToMap(valueEnumParams);

  valueEnum.forEach((_, key) => {
    const value = (valueEnum.get(key) || valueEnum.get(`${key}`)) as {
      text: string;
      disabled?: boolean;
    };
    if (!value) return;
    if (typeof value === 'object' && value?.text) {
      enumArray.push({
        text: value.text,
        value: key,
        label: value.text,
        disabled: value.disabled,
      });
      return;
    }
    enumArray.push({ text: value as unknown as string, value: key });
  });
  return enumArray;
};
