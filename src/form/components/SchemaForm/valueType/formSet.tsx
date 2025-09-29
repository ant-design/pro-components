import ProFormFieldSet from '../../FieldSet';
import type { ProSchemaRenderValueTypeFunction } from '../typing';

export const formSet: ProSchemaRenderValueTypeFunction = (item, { genItems }) => {
  if (item.valueType === 'formSet' && item.dataIndex) {
    if (!item.columns || !Array.isArray(item.columns)) return null;
    return (
      <ProFormFieldSet
        {...item.getFormItemProps?.()}
        key={item.key}
        colProps={item.colProps}
        initialValue={item.initialValue}
        label={item.label}
        name={item.dataIndex}
        rowProps={item.rowProps}
        {...item.getFieldProps?.()}
      >
        {genItems(item.columns)}
      </ProFormFieldSet>
    );
  }

  return true;
};
