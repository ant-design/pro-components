import React, { useContext, useEffect, useMemo } from 'react';
import type { FormItemProps } from 'antd';
import { Form } from 'antd';
import { FormListContext } from '../List';
import FieldContext from '../../FieldContext';
import type { SearchTransformKeyFn } from '@ant-design/pro-utils';

const ProFormItem: React.FC<
  FormItemProps & {
    ignoreFormItem?: boolean;
    valueType?: any;
    /** @name 提交时转化值，一般用于数组类型 */
    transform?: SearchTransformKeyFn;
    dataFormat?: string;
  }
> = (props) => {
  const { valueType, transform, dataFormat, ignoreFormItem, ...rest } = props;
  const formListField = useContext(FormListContext);

  // ProFromList 的 filed，里面有name和key
  /** 从 context 中拿到的值 */
  const name = useMemo(() => {
    if (formListField.name !== undefined) {
      return [formListField.name, props.name].flat(1) as string[];
    }
    return props.name as string[];
  }, [formListField.name, props.name]);

  /** 从 context 中拿到的值 */
  const { setFieldValueType } = React.useContext(FieldContext);

  useEffect(() => {
    // 如果 setFieldValueType 和 props.name 不存在不存入
    if (!setFieldValueType || !props.name) {
      return;
    }
    // Field.type === 'ProField' 时 props 里面是有 valueType 的，所以要设置一下
    // 写一个 ts 比较麻烦，用 any 顶一下
    setFieldValueType(
      [formListField.listName, name].flat(1).filter((itemName) => itemName !== undefined),
      {
        valueType: valueType || 'text',
        dateFormat: dataFormat,
        transform,
      },
    );
  }, [
    formListField.listName,
    name,
    dataFormat,
    props.name,
    setFieldValueType,
    transform,
    valueType,
  ]);

  if (ignoreFormItem) {
    return <>{props.children}</>;
  }
  return (
    <Form.Item {...rest} name={name}>
      {props.children}
    </Form.Item>
  );
};

export default ProFormItem;
