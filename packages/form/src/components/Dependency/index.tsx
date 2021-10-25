import { Form } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import type { FormInstance, FormItemProps } from 'antd';
import get from 'rc-util/lib/utils/get';
import { useContext, useMemo } from 'react';
import set from 'rc-util/lib/utils/set';
import { FormListContext } from '../List';
import { ProFormContext, merge } from '@ant-design/pro-utils';

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
        let finalNames = names;

        // ignoreFormListField 为 true 时，应从全局取值，要将 names 中各项的路径前缀(formListField.listName)剥离掉
        if (
          ignoreFormListField &&
          Array.isArray(formListField.listName) &&
          formListField.listName.length > 0
        ) {
          finalNames = names.map((nameItem) =>
            Array.isArray(nameItem) ? nameItem.slice(formListField.listName.length) : nameItem,
          );
        }

        return finalNames.some((nameItem) => {
          const arrayName = Array.isArray(nameItem) ? nameItem : [nameItem];
          return get(prevValues, arrayName) !== get(nextValues, arrayName);
        });
      }}
    >
      {(form: FormInstance) => {
        // 不在 FormList 中时，返回声明的全局依赖值
        if (formListField.name === undefined) {
          const values = names.reduce((pre, next) => {
            const value = context?.getFieldsFormatValue?.([next]);
            const noFormatValue = form.getFieldsValue([next]);
            return merge({}, pre, noFormatValue, value);
          }, {});
          return children?.({ ...values }, form as FormInstance<any>);
        }
        // 在 FormList 中时
        // ignoreFormListField === true 时取全局依赖值
        if (ignoreFormListField) {
          const nameValues = name.reduce((pre, namePath) => {
            const finalNamePath = [namePath].flat(1);
            const fieldValue = form.getFieldValue(finalNamePath);
            return set(pre, [namePath].flat(1), fieldValue, false);
          }, {});
          return children?.({ ...nameValues }, form as FormInstance<any>);
        }

        // ignoreFormListField === false 时，取局部依赖值
        const nameValues = name.reduce((pre, namePath) => {
          const finalNamePath = [formListField.listName, namePath].flat(1);
          const fieldValue = form.getFieldValue(finalNamePath);
          return set(pre, [namePath].flat(1), fieldValue, false);
        }, {});
        return children?.({ ...nameValues }, form as FormInstance<any>);
      }}
    </Form.Item>
  );
};

export default ProFormDependency;
