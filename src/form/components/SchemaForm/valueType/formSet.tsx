import ProFormFieldSet from '../../FieldSet';
import type { ProSchemaRenderValueTypeFunction } from '../typing';

export const formSet: ProSchemaRenderValueTypeFunction = (
  item,
  { genItems },
) => {
  if (item.valueType === 'formSet' && item.dataIndex) {
    if (!item.columns || !Array.isArray(item.columns)) return null;
    return (
      <ProFormFieldSet
        {...item.getFormItemProps?.()}
        key={item.key}
        initialValue={item.initialValue}
        name={item.dataIndex}
        label={item.label}
        colProps={item.colProps}
        rowProps={item.rowProps}
        {...item.getFieldProps?.()}
      >
        {genItems(item.columns)}
      </ProFormFieldSet>
    );
  }

  return true;
};
