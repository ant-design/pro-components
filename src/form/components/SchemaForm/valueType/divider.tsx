import { Divider } from 'antd';
import type { ItemType } from '../typing';

export const divider = <DataType, ValueType = 'divider'>(
  item: ItemType<DataType, ValueType>,
) => {
  /** 分割线 */
  if (item.valueType === 'divider') {
    return <Divider {...item.getFieldProps?.()} key={item.key} />;
  }

  return true;
};
