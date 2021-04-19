import type { FormInstance } from 'antd';
import { runFunction } from '../runFunction';

/**
 * 因为 fieldProps 支持了 function 所以新增了这个方法
 *
 * @param fieldProps
 * @param form
 */
const getFieldPropsOrFormItemProps = (
  fieldProps: any,
  form?: FormInstance<any> | null,
  extraProps?: any,
): Record<string, any> & {
  onChange: any;
  colSize: number;
} => {
  if (form === undefined) {
    return fieldProps as any;
  }
  return runFunction(fieldProps, form, extraProps);
};

export default getFieldPropsOrFormItemProps;
