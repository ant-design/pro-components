import { Form } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import type { FormInstance, FormItemProps } from 'antd';
import get from 'rc-util/lib/utils/get';
import { useCallback, useContext, useMemo } from 'react';
import set from 'rc-util/lib/utils/set';
import { FormListContext } from '../List';
import { ProFormContext } from '@ant-design/pro-utils';

declare type RenderChildren<Values = any> = (
  values: Record<string, any>,
  form: FormInstance<Values>,
) => React.ReactNode;

export type ProFormDependencyProps = Omit<
  FormItemProps<any>,
  'name' | 'noStyle' | 'children' | 'label'
> & {
  name: NamePath[];
  ignoreFormListField?: boolean;
  children: RenderChildren;
};

const ProFormDependency: React.FC<ProFormDependencyProps> = ({
  name,
  children,
  ignoreFormListField,
  ...rest
}) => {
  const context = useContext(ProFormContext);
  // ProFromList 的 filed，里面有name和key
  const formListField = useContext(FormListContext);
  /**
   * 处理放到 Form.List 的情况
   *
   * @param itemName
   */
  const getNamePath = useCallback(
    (itemName: NamePath) => {
      if (formListField.name === undefined || ignoreFormListField) {
        return [itemName].flat(1) as string[];
      }
      return [formListField.listName, itemName].flat(2) as string[];
    },
    [formListField.listName, formListField.name, ignoreFormListField],
  );

  const names = useMemo(() => {
    if (formListField.name === undefined) {
      return name;
    }
    return name.map((itemName: NamePath) => {
      return [formListField.listName, itemName].flat(1) as string[];
    });
  }, [formListField.listName, formListField.name, name]);

  return (
    <Form.Item
      {...rest}
      noStyle
      shouldUpdate={(prevValues, nextValues) => {
        return names.some((nameItem) => {
          const arrayName = Array.isArray(nameItem) ? nameItem : [nameItem];
          return get(prevValues, arrayName) !== get(nextValues, arrayName);
        });
      }}
    >
      {(form) => {
        const values = names.reduce((pre, next) => {
          const value = context?.getFieldsFormatValue?.([next].flat(1));
          const noFormatValue = form.getFieldsValue([next].flat(1));
          return {
            ...pre,
            ...noFormatValue,
            ...value,
          };
        }, {});
        return children?.({ ...values }, form as FormInstance<any>);
      }}
    </Form.Item>
  );
};

export default ProFormDependency;
