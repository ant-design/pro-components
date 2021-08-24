import React, { useState } from 'react';
import type { FormItemProps } from 'antd';
import type { ProFieldValueType, SearchTransformKeyFn } from '@ant-design/pro-utils';
import {
  runFunction,
  pickProFormItemProps,
  omitUndefined,
  useDeepCompareEffect,
} from '@ant-design/pro-utils';
import classnames from 'classnames';
import { noteOnce } from 'rc-util/lib/warning';
import FieldContext from '../FieldContext';
import type { ProFormFieldItemProps } from '../interface';
import ProFormItem from '../components/FormItem';
import type { ProFormInstance } from '.';

export const TYPE = Symbol('ProFormComponent');

export type ProFormItemCreateConfig = {
  /** 自定义类型 */
  valueType?: ProFieldValueType;
  /** 自定义 lightMode */
  customLightMode?: boolean;
  /** Light mode 自定义的 label 模式 */
  lightFilterLabelFormatter?: (value: any) => string;
  /** 默认的props，如果用户设置会被覆盖 */
  defaultProps?: Record<string, any>;
  /** @name 不使用默认的宽度 */
  ignoreWidth?: boolean;
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

type ProFormComponent<P, Extends> = React.ComponentType<P & Extends>;

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
  params?: ((form: ProFormInstance) => Record<string, any>) | Record<string, any>;

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
function createField<P extends ProFormFieldItemProps = any>(
  Field: React.ComponentType<P> | React.ForwardRefExoticComponent<P>,
  config?: ProFormItemCreateConfig,
): ProFormComponent<P, ExtendsProps> {
  // 标记是否是 proform 的组件
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  Field.displayName = 'ProFormComponent';

  const FieldWithContext: React.FC<P> = (props: P & ExtendsProps) => {
    const {
      valueType,
      customLightMode,
      lightFilterLabelFormatter,
      valuePropName = 'value',
      defaultProps,
      ignoreWidth,
      ...defaultFormItemProps
    } = config || {};
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
    } = { ...defaultProps, ...props } as P & ExtendsProps;

    /** 从 context 中拿到的值 */
    const { fieldProps, formItemProps, formRef } = React.useContext(FieldContext);

    // restFormItemProps is user props pass to Form.Item
    const restFormItemProps = pickProFormItemProps(rest);

    const formNeedProps = {
      value: (rest as any).value,
    };
    const realFieldProps = {
      ...(ignoreFormItem ? formNeedProps : {}),
      disabled: props.disabled,
      placeholder,
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

    noteOnce(
      // eslint-disable-next-line @typescript-eslint/dot-notation
      !rest['defaultValue'],
      '请不要在 Form 中使用 defaultXXX。如果需要默认值请使用 initialValues 和 initialValue。',
    );
    const ignoreWidthValueType = ['switch', 'radioButton', 'radio', 'rate'];

    const realFieldPropsStyle = {
      ...realFieldProps?.style,
    };
    if (realFieldPropsStyle.width !== undefined && (rest as any).valueType === 'switch') {
      delete realFieldPropsStyle.width;
    }

    const [params, setParams] = useState(() => runFunction(rest.params, formRef?.current));
    console.log(formRef?.current?.getFieldsValue());
    /** 防止返回值相同也重新更新的问题 */
    useDeepCompareEffect(() => {
      const requestParams = runFunction(rest.params, formRef?.current);
      setParams(requestParams);
    }, [formRef?.current?.getFieldsValue()]);

    const field = (
      <Field
        // ProXxx 上面的 props 透传给 FieldProps，可能包含 Field 自定义的 props，
        // 比如 ProFormSelect 的 request
        {...(rest as P)}
        fieldProps={omitUndefined({
          allowClear,
          ...realFieldProps,
          style: omitUndefined({
            width: width && !WIDTH_SIZE_ENUM[width] ? width : undefined,
            ...realFieldPropsStyle,
          }),
          className:
            classnames(realFieldProps?.className, {
              'pro-field': width && WIDTH_SIZE_ENUM[width],
              [`pro-field-${width}`]:
                width &&
                // 有些 valueType 不需要宽度
                !ignoreWidthValueType.includes((props as any)?.valueType as 'text') &&
                !ignoreWidth &&
                WIDTH_SIZE_ENUM[width],
            }) || undefined,
        })}
        proFieldProps={omitUndefined({
          mode: readonly ? 'read' : 'edit',
          params,
          proFieldKey: `form-field-${otherProps?.name}`,
          ...proFieldProps,
        })}
      />
    );
    return (
      <ProFormItem
        // 全局的提供一个 tip 功能，可以减少代码量
        // 轻量模式下不通过 FormItem 显示 label
        label={label && proFieldProps?.light !== true ? label : undefined}
        tooltip={proFieldProps?.light !== true && tooltip}
        valuePropName={valuePropName}
        key={otherProps.name?.toString()}
        {...otherProps}
        ignoreFormItem={ignoreFormItem}
        transform={transform}
        dataFormat={rest.fieldProps?.format}
        valueType={valueType || (rest as any).valueType}
        messageVariables={{
          label: (label as string) || '',
          ...otherProps?.messageVariables,
        }}
        lightProps={omitUndefined({
          ...realFieldProps,
          bordered,
          allowClear: field?.props?.allowClear ?? allowClear,
          light: proFieldProps?.light,
          label,
          customLightMode,
          labelFormatter: lightFilterLabelFormatter,
          valuePropName,
          footerRender: field?.props?.footerRender,
        })}
      >
        {field}
      </ProFormItem>
    );
  };

  return FieldWithContext as ProFormComponent<P, ExtendsProps>;
}

export default createField;
