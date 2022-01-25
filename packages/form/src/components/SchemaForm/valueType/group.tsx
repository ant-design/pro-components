import { ProFormGroup } from '@ant-design/pro-form';
import type { ProSchemaRenderValueTypeFunction } from '../typing';

export const group: ProSchemaRenderValueTypeFunction = (item, { genItems }) => {
  if (item.valueType === 'group') {
    if (!item.columns || !Array.isArray(item.columns)) return null;

    return (
      <ProFormGroup key={item.key} label={item.label} {...item.getFieldProps?.()}>
        {genItems(item.columns)}
      </ProFormGroup>
    );
  }

  return true;
};
