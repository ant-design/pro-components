import { noteOnce } from 'rc-util/lib/warning';
import ProFormDependency from '../../Dependency';
import type { ItemType, ProFormRenderValueTypeHelpers } from '../typing';

export const dependency = <DataType, ValueType>(
  item: ItemType<DataType, ValueType>,
  helpers: ProFormRenderValueTypeHelpers<DataType, ValueType>,
) => {
  /** ProFormDependency */
  if (item.valueType === 'dependency') {
    const fieldProps = item.getFieldProps?.();
    noteOnce(
      Array.isArray(item.name ?? fieldProps?.name),
      'SchemaForm: fieldProps.name should be NamePath[] when valueType is "dependency"',
    );
    noteOnce(
      typeof item.columns === 'function',
      'SchemaForm: columns should be a function when valueType is "dependency"',
    );

    if (!Array.isArray(item.name ?? fieldProps?.name)) return null;

    return (
      <ProFormDependency name={item.name} {...fieldProps} key={item.key}>
        {(values: any) => {
          if (!item.columns || typeof item.columns !== 'function') return null;
          return helpers.genItems(item.columns(values));
        }}
      </ProFormDependency>
    );
  }

  return true;
};
