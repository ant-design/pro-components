import type { SearchTransformKeyFn } from '../typing';
import get from 'rc-util/lib/utils/get';
import namePathSet from 'rc-util/lib/utils/set';

const transformKeySubmitValue = <T = any>(
  values: T,
  dataFormatMap: Record<string, SearchTransformKeyFn | undefined>,
  parentsKey?: React.Key,
) => {
  if (Object.keys(dataFormatMap).length < 1) {
    return values;
  }

  let result = {} as T;

  Object.keys(values).forEach((entryKey) => {
    const key = parentsKey ? [parentsKey, entryKey] : [entryKey];
    const itemValue = values[entryKey];
    if (typeof itemValue === 'object' && !Array.isArray(itemValue)) {
      result = namePathSet(
        result,
        [entryKey],
        transformKeySubmitValue(itemValue, dataFormatMap, entryKey),
      );
      return;
    }
    const transformFunction = get(dataFormatMap, key);
    const tempKey =
      typeof transformFunction === 'function'
        ? transformFunction?.(itemValue, entryKey, values)
        : entryKey;
    // { [key:string]:any } 数组也能通过编译
    if (Array.isArray(tempKey)) {
      result = namePathSet(result, tempKey, itemValue);
      return;
    }
    if (typeof tempKey === 'object') {
      result = { ...result, ...tempKey };
    } else if (tempKey) {
      result = namePathSet(result, [tempKey], itemValue);
    }
  });
  return result;
};

export default transformKeySubmitValue;
