import * as React from 'react';
import { Key, GetRowKey } from 'antd/es/table/interface';

interface MapCache<RecordType> {
  data?: RecordType[];
  childrenColumnName?: string;
  kvMap?: Map<Key, RecordType>;
  getRowKey?: Function;
}

export function findAllChildrenKeys<RecordType>(
  data: RecordType[],
  getRowKey: GetRowKey<RecordType>,
  childrenColumnName: string,
): Key[] {
  const keys: Key[] = [];

  function dig(list: RecordType[]) {
    if (!Array.isArray(list)) {
      return;
    }
    (list || []).forEach((item, index) => {
      keys.push(getRowKey(item, index));

      dig((item as any)[childrenColumnName]);
    });
  }

  dig(data);

  return keys;
}

export default function useLazyKVMap<RecordType>(
  data: RecordType[],
  childrenColumnName: string,
  getRowKey: GetRowKey<RecordType>,
) {
  const mapCacheRef = React.useRef<MapCache<RecordType>>({});

  function getRecordByKey(key: Key): RecordType {
    if (
      !mapCacheRef.current ||
      mapCacheRef.current.data !== data ||
      mapCacheRef.current.childrenColumnName !== childrenColumnName ||
      mapCacheRef.current.getRowKey !== getRowKey
    ) {
      const kvMap = new Map<Key, RecordType>();

      /* eslint-disable no-inner-declarations */
      function dig(records: RecordType[]) {
        records.forEach((record, index) => {
          const rowKey = getRowKey(record, index);
          kvMap.set(rowKey, record);
        });
      }
      /* eslint-enable */

      dig(data);

      mapCacheRef.current = {
        data,
        childrenColumnName,
        kvMap,
        getRowKey,
      };
    }

    return mapCacheRef.current.kvMap!.get(key)!;
  }

  return [getRecordByKey];
}
