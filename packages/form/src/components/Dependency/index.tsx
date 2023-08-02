import { isDeepEqualReact, merge, ProFormContext } from '@ant-design/pro-utils';
import type { FormItemProps } from 'antd';
import { Form } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import get from 'rc-util/lib/utils/get';
import set from 'rc-util/lib/utils/set';
import { useContext, useMemo } from 'react';
import type { ProFormInstance } from '../../BaseForm';
import { FormListContext } from '../List';

declare type RenderChildren<Values = any> = (
  values: Record<string, any>,
  form: ProFormInstance<Values>,
) => React.ReactNode;

export type ProFormDependencyProps<T = Record<string, any>> = Omit<
  FormItemProps<any>,
  'name' | 'noStyle' | 'children' | 'label'
> & {
  name: NamePath[];
  originDependencies?: NamePath[];
  ignoreFormListField?: boolean;
  children: RenderChildren<T>;
};

const ProFormDependency = <T,>({
  name: nameList,
  originDependencies = nameList,
  children,
  ignoreFormListField,
  ...rest
}: ProFormDependencyProps<T>) => {
  const context = useContext(ProFormContext);
  // ProFromList 的 field，里面有name和key
  const formListField = useContext(FormListContext);

  // flatten each name into an (string | number)[]
  const flattenNames = useMemo(() => {
    return nameList.map((itemName: NamePath) => {
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
  }, [
    formListField.listName,
    formListField.name,
    ignoreFormListField,
    nameList?.toString(),
  ]);

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
          return !isDeepEqualReact(
            get(prevValues, name),
            get(nextValues, name),
          );
        });
      }}
    >
      {(form) => {
        let values: Record<string, any> = {};
        for (let i = 0; i < nameList.length; i++) {
          const itemName = flattenNames[i],
            itemOriginName = originDependencies[i];
          const finalName = [itemOriginName].flat(1);
          let value = context.getFieldFormatValueObject?.(itemName);
          if (value && Object.keys(value).length) {
            // transform 会生成多余的value，这里需要注入一下
            values = merge({}, values, value);
            if (get(value, itemName)) {
              values = set(values, finalName, get(value, itemName), false);
            }
          } else {
            value = form.getFieldValue?.(itemName);
            if (typeof value !== 'undefined') {
              values = set(values, finalName, value, false);
            }
          }
        }
        return children?.(values, {
          ...form,
          ...context,
        } as ProFormInstance<any>);
      }}
    </Form.Item>
  );
};

export default ProFormDependency;
