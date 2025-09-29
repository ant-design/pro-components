import { ProFormList } from '../../List';
import type { ProSchemaRenderValueTypeFunction } from '../typing';

export const formList: ProSchemaRenderValueTypeFunction = (item, { genItems }) => {
  if (item.valueType === 'formList' && item.dataIndex) {
    if (!item.columns || !Array.isArray(item.columns)) return null;
    return (
      <ProFormList
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
      </ProFormList>
    );
  }

  return true;
};
