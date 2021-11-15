import React, { useContext, useEffect, useMemo } from 'react';
import type { FormItemProps } from 'antd';
import { ConfigProvider, Form } from 'antd';
import { FormListContext } from '../List';
import FieldContext from '../../FieldContext';
import type { SearchTransformKeyFn, ProSchemaValueType } from '@ant-design/pro-utils';
import { isDropdownValueType, omitUndefined } from '@ant-design/pro-utils';
import type { LightWrapperProps } from '../../BaseForm/LightWrapper';
import LightWrapper from '../../BaseForm/LightWrapper';
import type { NamePath } from 'antd/lib/form/interface';

const FormItemProvide = React.createContext<{
  name?: NamePath;
  label?: React.ReactNode;
}>({});

/**
 * 把value扔给 fieldProps，方便给自定义用
 *
 * @param param0
 * @returns
 */
const WithValueFomFiledProps: React.FC<Record<string, any>> = (formFieldProps) => {
  const {
    children: filedChildren,
    value,
    onChange,
    onBlur,
    ignoreFormItem,
    valuePropName = 'value',
    ...restProps
  } = formFieldProps;

  const fieldProps = useMemo(() => {
    // @ts-ignore
    if (filedChildren?.type?.displayName !== 'ProFormComponent') return undefined;
    if (!React.isValidElement(filedChildren)) return undefined;

    return omitUndefined({
      id: restProps.id,
      // 优先使用 children.props.fieldProps，
      // 比如 LightFilter 中可能需要通过 fieldProps 覆盖 Form.Item 默认的 onChange
      [valuePropName]: formFieldProps[valuePropName],
      ...(filedChildren?.props?.fieldProps || {}),
      onBlur: (...restParams: any[]) => {
        onBlur?.(...restParams);
        filedChildren?.props?.onBlur?.(...restParams);
        filedChildren?.props?.fieldProps?.onBlur?.(...restParams);
      },
      // 这个 onChange 是 Form.Item 添加上的，
      // 要通过 fieldProps 透传给 ProField 调用
      onChange: (...restParams: any[]) => {
        onChange?.(...restParams);
        filedChildren?.props?.onChange?.(...restParams);
        filedChildren?.props?.fieldProps?.onChange?.(...restParams);
      },
    });
  }, [filedChildren, formFieldProps, onBlur, onChange, restProps.id, valuePropName]);

  if (!React.isValidElement(filedChildren)) return filedChildren as JSX.Element;

  const finalChange = fieldProps
    ? undefined
    : (...restParams: any[]) => {
        onChange?.(...restParams);
        filedChildren?.props?.onChange?.(...restParams);
      };

  return React.cloneElement(
    filedChildren,
    omitUndefined({
      ...restProps,
      value,
      ...filedChildren.props,
      onChange: finalChange,
      fieldProps,
    }),
  );
};

type WarpFormItemProps = {
  /** @name 前置的dom * */
  addonBefore?: React.ReactNode;
  /** @name 后置的dom * */
  addonAfter?: React.ReactNode;
};

/**
 * 支持了一下前置 dom 和后置的 dom 同时包一个provide
 *
 * @param WarpFormItemProps
 * @returns
 */
const WarpFormItem: React.FC<FormItemProps & WarpFormItemProps> = ({
  children,
  addonAfter,
  addonBefore,
  ...props
}) => {
  const formDom = useMemo(() => {
    if (!addonAfter && !addonBefore) return <Form.Item {...props}>{children}</Form.Item>;
    return (
      <Form.Item {...props} rules={undefined} name={undefined}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {addonBefore ? <div style={{ marginRight: 8 }}>{addonBefore}</div> : null}
          <div style={{ flex: 1 }}>
            <Form.Item {...props} noStyle>
              {children}
            </Form.Item>
          </div>
          {addonAfter ? <div style={{ marginLeft: 8 }}>{addonAfter}</div> : null}
        </div>
      </Form.Item>
    );
  }, [addonAfter, addonBefore, children, props]);

  return (
    <FormItemProvide.Provider
      value={{
        name: props.name,
        label: props.label,
      }}
    >
      {formDom}
    </FormItemProvide.Provider>
  );
};

type ProFormItemProps = FormItemProps & {
  ignoreFormItem?: boolean;
  valueType?: ProSchemaValueType<'text'>;
  /** @name 提交时转化值，一般用于数组类型 */
  transform?: SearchTransformKeyFn;
  dataFormat?: string;
  lightProps?: LightWrapperProps;
} & WarpFormItemProps;

const ProFormItem: React.FC<ProFormItemProps> = (props) => {
  /** 从 context 中拿到的值 */
  const size = useContext(ConfigProvider.SizeContext);
  const { valueType, transform, dataFormat, ignoreFormItem, lightProps = {}, ...rest } = props;
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
  const { setFieldValueType, formItemProps } = React.useContext(FieldContext);

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

  const isDropdown =
    React.isValidElement(props.children) &&
    isDropdownValueType(valueType || props.children.props.valueType);

  const noLightFormItem = useMemo(() => {
    if (!lightProps.light || lightProps.customLightMode || isDropdown) {
      return true;
    }
    return false;
  }, [lightProps.customLightMode, isDropdown, lightProps.light]);

  if (typeof props.children === 'function') {
    return (
      <WarpFormItem {...rest} name={name}>
        {props.children}
      </WarpFormItem>
    );
  }

  // formItem 支持function，如果是function 我就直接不管了
  const children = (
    <WithValueFomFiledProps key={rest.name?.toString()} valuePropName={props.valuePropName}>
      {props.children}
    </WithValueFomFiledProps>
  );
  const lightDom = noLightFormItem ? (
    children
  ) : (
    <LightWrapper {...lightProps} key={rest.name?.toString()} size={size}>
      {children}
    </LightWrapper>
  );

  // 这里控制是否需要 LightWrapper，为了提升一点点性能
  if (ignoreFormItem) {
    return <>{lightDom}</>;
  }

  return (
    <WarpFormItem {...formItemProps} {...rest} name={name}>
      {lightDom}
    </WarpFormItem>
  );
};

export type { ProFormItemProps };
export { FormItemProvide };
export default ProFormItem;
