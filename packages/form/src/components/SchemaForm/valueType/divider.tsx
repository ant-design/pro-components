import { Divider } from 'antd';
import type { ProSchemaRenderValueTypeFunction } from '../typing';

export const divider: ProSchemaRenderValueTypeFunction = (item) => {
  /** 分割线 */
  if (item.valueType === 'divider') {
    return <Divider {...item.getFieldProps?.()} key={item.key} />;
  }

  return true;
};
