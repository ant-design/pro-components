import type { ProSchemaRenderValueTypeFunction } from '../typing';

export const ignore: ProSchemaRenderValueTypeFunction = (item) => {
  // 几种特殊的 value 不处理
  if (
    item.valueType &&
    typeof item.valueType === 'string' &&
    ['index', 'indexBorder', 'option'].includes(item?.valueType)
  ) {
    return null;
  }
  return true;
};
