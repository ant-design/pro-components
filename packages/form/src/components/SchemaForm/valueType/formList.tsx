import { ProFormList } from '../../List';
import type { ProSchemaRenderValueTypeFunction } from '../typing';

export const formList: ProSchemaRenderValueTypeFunction = (item, { genItems }) => {
  if (item.valueType === 'formList' && item.dataIndex) {
    if (!item.columns || !Array.isArray(item.columns)) return null;
    return (
      <ProFormList
        key={item.key}
        name={item.dataIndex}
        label={item.label}
        initialValue={item.initialValue}
        colProps={item.colProps}
        rowProps={item.rowProps}
        {...item.getFieldProps?.()}
        isValidateList={(item.getFormItemProps?.() || item.getFieldProps?.())?.rules?.[0]?.required}
        emptyListMessage={
          (item.getFormItemProps?.() || item.getFieldProps?.())?.rules?.[0]?.message
        }
      >
        {genItems(item.columns)}
      </ProFormList>
    );
  }

  return true;
};
