import { useMemo, useRef, useEffect } from 'react';
import type { Key } from 'react';
import type { GetRowKey } from './types';

/**
 * 懒加载的键值映射 Hook
 * 用于根据 key 快速查找对应的 record，支持树形结构
 */
function useLazyKVMap<RecordType>(
  data: readonly RecordType[],
  childrenColumnName: string,
  getRowKey: GetRowKey<RecordType>,
): [(key: Key) => RecordType] {
  const cacheRef = useRef<Map<Key, RecordType>>(new Map());

  const getRecordByKey = useMemo(
    () => (key: Key): RecordType => {
      // 先从缓存中查找
      if (cacheRef.current.has(key)) {
        return cacheRef.current.get(key)!;
      }

      // 递归查找函数
      const findRecord = (
        records: readonly RecordType[],
      ): RecordType | null => {
        for (let i = 0; i < records.length; i++) {
          const record = records[i];
          const recordKey = getRowKey(record, i);

          if (recordKey === key) {
            cacheRef.current.set(key, record);
            return record;
          }

          // 如果有子节点，递归查找
          const children = (record as any)[childrenColumnName] as
            | RecordType[]
            | undefined;
          if (children && Array.isArray(children) && children.length > 0) {
            const found = findRecord(children);
            if (found) {
              return found;
            }
          }
        }
        return null;
      };

      const found = findRecord(data);
      if (!found) {
        throw new Error(`Record with key "${key}" not found`);
      }

      return found;
    },
    [data, childrenColumnName, getRowKey],
  );

  // 当数据变化时，清空缓存
  useEffect(() => {
    cacheRef.current.clear();
  }, [data]);

  return [getRecordByKey];
}

export default useLazyKVMap;

