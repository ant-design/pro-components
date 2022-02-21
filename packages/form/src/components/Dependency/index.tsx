import { Form } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import type { FormInstance, FormItemProps } from 'antd';
import set from 'rc-util/lib/utils/set';
import get from 'rc-util/lib/utils/get';
import { useContext, useMemo } from 'react';
import { FormListContext } from '../List';
import { ProFormContext, isDeepEqualReact } from '@ant-design/pro-utils';

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
  name: names,
  children,
  ignoreFormListField,
  ...rest
}) => {
  const context = useContext(ProFormContext);
  // ProFromList 的 field，里面有name和key
  const formListField = useContext(FormListContext);

  // flatten each name into an (string | number)[]
  const flattenNames = useMemo(() => {
    return names.map((itemName: NamePath) => {
      const name = [itemName];

      // ignoreFormListField为 true 或 formListField.name === undefined 时
      // 应从全局取值，要将 names 中各项的路径前缀(formListField.listName)忽略
      if (
        !ignoreFormListField &&
        formListField.name !== undefined &&
        formListField.listName?.length
      ) {
        name.unshift(formListField.listName);
      }

      return name.flat(1);
    });
  }, [formListField.listName, formListField.name, ignoreFormListField, names]);

  return (
    <Form.Item
      {...rest}
      noStyle
      shouldUpdate={(prevValues, nextValues, info) => {
        if (typeof rest.shouldUpdate === 'boolean') {
          return rest.shouldUpdate;
        } else if (typeof rest.shouldUpdate === 'function') {
          return rest.shouldUpdate?.(prevValues, nextValues, info);
        }

        return flattenNames.some((name) => {
          return !isDeepEqualReact(get(prevValues, name), get(nextValues, name));
        });
      }}
    >
      {(form: FormInstance) => {
        let values: Record<string, any> = {};
        for (let i = 0; i < names.length; i++) {
          const pathToGet = flattenNames[i],
            pathToSet = names[i];

          const value = context.getFieldFormatValue?.(pathToGet) ?? form.getFieldValue(pathToGet);
          values = set(values, Array.isArray(pathToSet) ? pathToSet : [pathToSet], value, false);
        }
        return children?.(values, form);
      }}
    </Form.Item>
  );
};

export default ProFormDependency;
