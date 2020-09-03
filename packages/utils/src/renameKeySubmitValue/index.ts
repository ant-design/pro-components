import { ProColumnType } from '@ant-design/pro-table';

const renameKeySubmitValue = <T = any>(
  values: T,
  renameMap: { [key: string]: ProColumnType['renameKey'] },
) => {
  const result = {} as T;
  Object.keys(values).forEach((key) => {
    const renameKey = renameMap[key];
    if (renameKey) {
      // 如果是['startTime','endTime']的情况
      if (Array.isArray(renameKey) && renameKey.length === 2 && Array.isArray(values[key])) {
        renameKey.forEach((rKey, rInx) => {
          result[rKey] = values[key][rInx];
        });
      } else {
        // 如果是['renameKey']或者'renameKey'的情况
        const finalKey = (Array.isArray(renameKey) && renameKey.length === 1
          ? renameKey[0]
          : renameKey) as string;
        result[finalKey] = values[key];
      }
    } else {
      result[key] = values[key];
    }
  });
  return result;
};

export default renameKeySubmitValue;
