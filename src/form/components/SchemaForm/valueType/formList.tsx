import type { FormListFieldData } from 'antd/lib/form/FormList';
import { ProFormList } from '../../List';
import type { ChildrenItemFunction } from '../../List/ListItem';
import type { ProSchemaRenderValueTypeFunction } from '../typing';

export const formList: ProSchemaRenderValueTypeFunction = (
  item,
  { genItems },
) => {
  if (item.valueType === 'formList' && item.dataIndex) {
    const { columns } = item;
    if (!Array.isArray(columns)) return null;

    /**
     * #8561 formList 的子 columns 使用 render-prop 按行求值：
     * genItems 返回的元素在 schema 编译期生成，title / fieldProps / formItemProps
     * 的函数形式在求值时行号尚不存在。改为 children 传函数后，
     * ProFormList 在每一行内重新调用 genItems，将 rowIndex 注入
     * title(schema, type, dom, rowIndex) 的第四个参数。
     */
    const renderChildren: ChildrenItemFunction = (
      field: FormListFieldData,
      index: number,
    ) => {
      return genItems(columns, {
        rowIndex: index,
      }) as React.ReactNode;
    };

    return (
      <ProFormList
        {...item.getFormItemProps?.()}
        key={item.key}
        name={item.dataIndex}
        label={item.label}
        initialValue={item.initialValue}
        colProps={item.colProps}
        rowProps={item.rowProps}
        {...item.getFieldProps?.()}
      >
        {renderChildren}
      </ProFormList>
    );
  }

  return true;
};
