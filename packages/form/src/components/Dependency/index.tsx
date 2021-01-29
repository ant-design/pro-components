import { Form } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import type { FormInstance, FormItemProps } from 'antd';
import get from 'rc-util/lib/utils/get';

declare type RenderChildren<Values = any> = (
  values: Record<string, any>,
  form: FormInstance<Values>,
) => React.ReactNode;

export type ProFormDependencyProps = Omit<
  FormItemProps<any>,
  'name' | 'noStyle' | 'children' | 'label'
> & {
  name: NamePath[];
  children: RenderChildren;
};

const ProFormDependency: React.FC<ProFormDependencyProps> = ({ name, children, ...rest }) => {
  return (
    <Form.Item
      {...rest}
      noStyle
      shouldUpdate={(prevValues, nextValues) => {
        return name.some((nameItem) => {
          const arrayName = Array.isArray(nameItem) ? nameItem : [nameItem];
          return get(prevValues, arrayName) !== get(nextValues, arrayName);
        });
      }}
    >
      {(form) => {
        const values = form.getFieldsValue(name);
        return children?.(values, form as FormInstance<any>);
      }}
    </Form.Item>
  );
};

export default ProFormDependency;
