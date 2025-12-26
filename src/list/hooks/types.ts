import type { Key } from 'react';
import type { TableProps } from 'antd';

/**
 * 获取行的 key 的函数类型
 */
export type GetRowKey<RecordType> = (
  record: RecordType,
  index?: number,
) => Key;

/**
 * 表格行选择配置类型
 */
export type TableRowSelection<RecordType> = TableProps<RecordType>['rowSelection'];

