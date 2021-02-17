import React, { useEffect, useContext, useMemo } from 'react';
import type { FormItemProps } from 'antd';
import { Form, ConfigProvider } from 'antd';
import type { ProFieldValueType, SearchTransformKeyFn } from '@ant-design/pro-utils';
import { omitUndefined } from '@ant-design/pro-utils';
import { pickProFormItemProps } from '@ant-design/pro-utils';
import classnames from 'classnames';
import { noteOnce } from 'rc-util/lib/warning';
import FieldContext from '../FieldContext';
import LightWrapper from './LightWrapper';
import type { ProFormItemProps } from '../interface';
import { FormListContext } from '../components/List';

export type ProFormItemCreateConfig = {
  /** 自定义类型 */
  valueType?: ProFieldValueType;
  /** 自定义 lightMode */
  customLightMode?: boolean;
  /** Light mode 自定义的 label 模式 */
  lightFilterLabelFormatter?: (value: any) => string;
} & FormItemProps;

const WIDTH_SIZE_ENUM = {
  // 适用于短数字，短文本或者选项
  xs: 104,
  s: 216,
  // 适用于较短字段录入、如姓名、电话、ID 等。
  sm: 216,
  m: 328,
  // 标准宽度，适用于大部分字段长度。
  md: 328,
  l: 440,
  // 适用于较长字段录入，如长网址、标签组、文件路径等。
  lg: 440,
  // 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
  xl: 552,
};

type ProFormComponent<P, Extends> = React.ComponentType<Omit<P & Extends, 'proFieldProps'>>;

// 给控件扩展的通用的属性
export type ExtendsProps = {
  secondary?: boolean;
  allowClear?: boolean;
  bordered?: boolean;
  colSize?: number;
  /**
   * 需要与 request 配合使用
   *
   * @name 网络请求用的输出，会触发reload
   */
  params?: any;

  /** @name 需要放在formItem 时使用 */
  ignoreFormItem?: boolean;

  /**
   * 实验性质，可能 api 会有改动，谨慎使用
   *
   * @name 只读模式
   */
  readonly?: boolean;

  /** @name 提交时转化值，一般用于数组类型 */
  transform?: SearchTransformKeyFn;

  /**
   * 给 protable 开的口子
   *
   * @name 自定义的 formItemProps
   */
  formItemProps?: FormItemProps;
};

/**
 * 这个方法的主要作用的帮助 Field 增加 FormItem 同时也会处理 lightFilter
 *
 * @param Field
 * @param config
 */
function createField<P extends ProFormItemProps = any>(
  Field: React.ComponentType<P> | React.ForwardRefExoticComponent<P>,
  config?: ProFormItemCreateConfig,
): ProFormComponent<P, ExtendsProps> {
  const FieldWithContext: React.FC<P> = (props: P & ExtendsProps) => {
    const size = useContext(ConfigProvider.SizeContext);
    const {
      label,
      tooltip,
      placeholder,
      width,
      proFieldProps,
      bordered,
      messageVariables,
      ignoreFormItem,
      transform,
      readonly,
      allowClear,
      colSize,
      formItemProps: propsFormItemProps,
      ...rest
    } = props;
    const {
      valueType,
      customLightMode,
      lightFilterLabelFormatter,
      valuePropName = 'value',
      ...defaultFormItemProps
    } = config || {};

    // ProFromList 的 filed，里面有name和key
    const formListField = useContext(FormListContext);

    /** 从 context 中拿到的值 */
    const { fieldProps, formItemProps, setFieldValueType } = React.useContext(FieldContext);

    // restFormItemProps is user props pass to Form.Item
    const restFormItemProps = pickProFormItemProps(rest);

    const formNeedProps = {
      value: (rest as any).value,
      onChange: (rest as any).onChange,
    };
    const realFieldProps = {
      ...(ignoreFormItem ? formNeedProps : {}),
      disabled: props.disabled,
      ...(fieldProps || {}),
      ...(rest.fieldProps || {}),
      style: {
        // 有些组件是不需要自带的 width
        ...rest.fieldProps?.style,
        ...fieldProps?.style,
      },
    } as any;

    const otherProps = {
      messageVariables,
      ...defaultFormItemProps,
      ...formItemProps,
      ...restFormItemProps,
      ...propsFormItemProps,
    };

    const name = useMemo(() => {
      if (ignoreFormItem) {
        return [];
      }
      if (formListField.name !== undefined) {
        return [formListField.name, otherProps.name].flat(1) as string[];
      }
      return otherProps.name as string[];
    }, [formListField.name, otherProps.name]);

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
          valueType: valueType || (rest as any).valueType || 'text',
          transform,
        },
      );
    }, [name, transform, valueType]);

    noteOnce(
      // eslint-disable-next-line @typescript-eslint/dot-notation
      !rest['defaultValue'],
      '请不要在 Form 中使用 defaultXXX。如果需要默认值请使用 initialValues 和 initialValue。',
    );

    const field = (
      <Field
        // ProXxx 上面的 props 透传给 FieldProps，可能包含 Field 自定义的 props，
        // 比如 ProFormSelect 的 request
        {...(rest as P)}
        fieldProps={omitUndefined({
          allowClear,
          ...realFieldProps,
          style: omitUndefined({
            width: typeof width === 'number' ? width : undefined,
            ...realFieldProps?.style,
          }),
          className: classnames(realFieldProps?.className, {
            [`pro-field-${width}`]: width && WIDTH_SIZE_ENUM[width],
          }),
        })}
        proFieldProps={omitUndefined({
          mode: readonly ? 'read' : 'edit',
          params: rest.params,
          proFieldKey: otherProps?.name,
          ...proFieldProps,
        })}
      />
    );

    /** 被放到 FormSet 的时候 */
    if (ignoreFormItem) {
      return field;
    }
    return (
      <Form.Item
        // 全局的提供一个 tip 功能，可以减少代码量
        // 轻量模式下不通过 FormItem 显示 label
        label={label && proFieldProps?.light !== true ? label : undefined}
        tooltip={proFieldProps?.light !== true && tooltip}
        valuePropName={valuePropName}
        {...otherProps}
        name={name}
        messageVariables={{
          label: label as string,
          ...otherProps?.messageVariables,
        }}
      >
        <LightWrapper
          {...realFieldProps}
          allowClear={allowClear}
          bordered={bordered}
          size={size}
          light={proFieldProps?.light}
          customLightMode={customLightMode}
          label={label}
          labelFormatter={lightFilterLabelFormatter}
          valuePropName={valuePropName}
        >
          {field}
        </LightWrapper>
      </Form.Item>
    );
  };
  return FieldWithContext as ProFormComponent<P, ExtendsProps>;
}

export default createField;
