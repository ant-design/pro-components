import type { SearchTransformKeyFn } from '../typing';
import get from 'rc-util/lib/utils/get';
import namePathSet from 'rc-util/lib/utils/set';

export type DataFormatMapType = Record<string, SearchTransformKeyFn | undefined>;

const transformKeySubmitValue = <T = any>(
  values: T,
  dataFormatMap: Record<string, SearchTransformKeyFn | undefined>,
) => {
  if (Object.keys(dataFormatMap).length < 1) {
    return values;
  }
  let finalValues = {} as T;

  const gen = (tempValues: T, parentsKey?: React.Key) => {
    let result = {} as T;
    Object.keys(tempValues).forEach((entryKey) => {
      const key = parentsKey ? [parentsKey, entryKey] : [entryKey];
      const itemValue = tempValues[entryKey];
      if (typeof itemValue === 'object' && !Array.isArray(itemValue)) {
        const genValues = gen(itemValue, entryKey);
        if (Object.keys(genValues).length < 1) {
          return;
        }
        result = namePathSet(result, [entryKey], genValues);
        return;
      }
      const transformFunction = get(dataFormatMap, key);
      const tempKey =
        typeof transformFunction === 'function'
          ? transformFunction?.(itemValue, entryKey, tempValues)
          : entryKey;
      // { [key:string]:any } 数组也能通过编译
      if (Array.isArray(tempKey)) {
        result = namePathSet(result, tempKey, itemValue);
        return;
      }
      if (typeof tempKey === 'object') {
        finalValues = {
          ...finalValues,
          ...tempKey,
        };
      } else if (tempKey) {
        result = namePathSet(result, [tempKey], itemValue);
      }
    });
    return result;
  };

  finalValues = {
    ...gen(values),
    ...finalValues,
  };

  return finalValues;
};

export default transformKeySubmitValue;
