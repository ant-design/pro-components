import { Form } from 'antd';
import React from 'react';
import ProFormItem from '../FormItem';

interface ControlPropsType {
  id: string;
  value: any;
  onChange: (value: any, ...args: any[]) => void;
}

export type WithControlPropsType<T = object> = T & Partial<ControlPropsType>;

interface ControlModelType {
  value: any;
  onChange: (value: any) => void;
}
interface FormControlProps {
  valuePropName?: string;
  trigger?: string;
}
interface FormControlMultiProps extends FormControlProps {
  name: string;
}
type GetArrayFieldType<T extends readonly { name: string }[]> =
  T[number]['name'];

function getControlConfigProps(props = {} as any): {
  valuePropName: string;
  trigger: string;
  name: string;
} {
  const valuePropName = props.valuePropName || 'value';
  const trigger = props.trigger || 'onChange';
  const name = props.name;
  return {
    valuePropName,
    trigger,
    name,
  };
}

export function useControlModel<T extends FormControlProps>(
  { value, onChange, id }: WithControlPropsType,
  model?: T,
): ControlModelType;
export function useControlModel<const T extends readonly string[]>(
  { value, onChange, id }: WithControlPropsType,
  model?: T,
): { [P in T[number]]: ControlModelType };
export function useControlModel<
  const T extends readonly FormControlMultiProps[],
>(
  { value, onChange, id }: WithControlPropsType,
  model?: T,
): { [P in GetArrayFieldType<T>]: ControlModelType };
export function useControlModel<
  T extends
    | FormControlProps
    | (string | FormControlMultiProps)[] = FormControlProps,
>({ value, onChange }: WithControlPropsType, model?: T): unknown {
  if (!Array.isArray(model)) {
    const p = getControlConfigProps(model);
    return {
      [p.valuePropName]: value,
      [p.trigger]: (e: any) => {
        onChange?.(e?.target ? e.target[p.valuePropName] : e);
      },
    };
  }

  return model.reduce((acc, k) => {
    const p = getControlConfigProps(k);
    const name = p.name || (k as string);
    acc[name] = {
      [p.valuePropName]: value?.[name],
      [p.trigger]: (v: any) => {
        onChange?.({
          ...value,
          [name]: v?.target ? v.target[p.valuePropName] : v,
        });
      },
    };
    return acc;
  }, {} as Record<string, unknown>) as unknown;
}

export type FormControlFC<P> = (
  props: WithControlPropsType<P>,
) => React.ReactNode;

type FormControlInjectProps = ReturnType<typeof Form.Item.useStatus> & {
  id: string;
  value: any;
  onChange: (value: any) => void;
  [x: string]: any;
};

/**
 * 用在 ProForm.Item 或 Form.Item 于 表单项之间的，用于劫持渲染的函数
 * ``` tsx
 * <Form.Item name='name' label='名称'>
 *   <FormControlRender>
 *   {
 *     formItemProps => (
 *       <div>
 *         <span>prefix</span>
 *         <Input {...formItemProps} />
 *       </div>
 *     )
 *   }
 *   </FormControlRender>
 * </Form.Item>
 * ```
 */
export function FormControlRender(
  props: WithControlPropsType<{
    children: (props: FormControlInjectProps) => React.ReactElement;
  }>,
) {
  const { children, ...restProps } = props;
  const { status, errors, warnings } = Form.Item.useStatus();
  return children({
    status,
    errors,
    warnings,
    ...(restProps as ControlPropsType),
  });
}

/**
 * 提取props中的 value 和 onChange 属性
 */
export function pickControlProps(props: FormControlInjectProps) {
  return {
    value: props.value,
    onChange: (value: any) =>
      props.onChange(value?.target ? value.target.value : value),
  };
}

/**
 * 提取props中的 value、onChange 和 id 属性
 */
export function pickControlPropsWithId(props: FormControlInjectProps) {
  return {
    ...pickControlProps(props),
    id: props.id,
  };
}

/**
 * 用于包裹ProForm.Item Form.Item，使其可以使用render props的形式
 * @description 用法
 * const FormItem = withFormItemRender(用于包裹ProForm.Item)
 * ``` tsx
 * <FormItem name='name' label='名称'>
 *   {
 *     formItemProps => (
 *       <div>
 *         <span>prefix</span>
 *         <Input {...formItemProps} />
 *       </div>
 *     )
 *   }
 * </FormItem>
 * ```
 */
export function withFormItemRender<T extends React.FC<any>>(
  Comp: T,
): React.FC<
  Omit<React.ComponentProps<T>, 'children'> & {
    children: (formItemProps: FormControlInjectProps) => React.ReactNode;
  }
> {
  return function (props: React.PropsWithChildren<any>) {
    const { children, ...restProps } = props;

    return (
      <Comp {...restProps}>
        <FormControlRender>{children}</FormControlRender>
      </Comp>
    );
  };
}

/**
 * 用 withFormItemRender 加工Form.Item，使其拥有render props能力，同时暴露出 status 属性方便自定义组件校验使用
 *
 * ``` tsx
 *   <FormItemRender name='name' label='名称'>
 *   {
 *     formItemProps => (
 *       <div>
 *         <h3>prefix</h3>
 *         <textarea {...formItemProps} style={{ borderColor: formItemProps.status === 'error' ? 'red' : undefined }} />
 *       </div>
 *     )
 *   }
 *   </FormItemRender>
 * ```
 */
export const FormItemRender = withFormItemRender(Form.Item);

/**
 * 用 withFormItemRender 加工 ProForm.Item，使其拥有render props能力，同时暴露出 status 属性方便自定义组件校验使用
 * ``` tsx
 *   <ProFormItemRender name='name' label='名称'>
 *   {
 *     formItemProps => (
 *       <div>
 *         <h3>prefix</h3>
 *         <textarea {...formItemProps} style={{ borderColor: formItemProps.status === 'error' ? 'red' : undefined }} />
 *       </div>
 *     )
 *   }
 *   </ProFormItemRender>
 * ```
 */
export const ProFormItemRender = withFormItemRender(ProFormItem);
