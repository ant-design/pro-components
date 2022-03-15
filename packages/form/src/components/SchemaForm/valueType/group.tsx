import { ProFormGroup } from '../../../layouts';
import type { ProSchemaRenderValueTypeFunction } from '../typing';

export const group: ProSchemaRenderValueTypeFunction = (item, { genItems }) => {
  if (item.valueType === 'group') {
    if (!item.columns || !Array.isArray(item.columns)) return null;

    return (
      <ProFormGroup
        key={item.key}
        label={item.label}
        colProps={item.colProps}
        rowProps={item.rowProps}
        {...item.getFieldProps?.()}
      >
        {genItems(item.columns)}
      </ProFormGroup>
    );
  }

  return true;
};
