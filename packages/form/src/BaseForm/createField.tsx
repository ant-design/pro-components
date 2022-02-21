import React, { useMemo, useContext, useCallback, useState, useEffect, useRef } from 'react';
import {
  pickProFormItemProps,
  omitUndefined,
  usePrevious,
  isDeepEqualReact,
  useLatest,
} from '@ant-design/pro-utils';
import classnames from 'classnames';
import { noteOnce } from 'rc-util/lib/warning';
import { stringify } from 'use-json-comparison';
import FieldContext from '../FieldContext';
import type { ExtendsProps, ProFormFieldItemProps, ProFormItemCreateConfig } from '../interface';
import { ProFormItem, ProFormDependency } from '../components';
import { FieldContext as RcFieldContext } from 'rc-field-form';

export const TYPE = Symbol('ProFormComponent');

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

const ignoreWidthValueType = ['switch', 'radioButton', 'radio', 'rate'];

type ProFormComponent<P, Extends> = React.ComponentType<P & Extends>;

/** 处理fieldProps和formItemProps为function时传进来的方法, 目前只在SchemaForm时可能会有 */
type FunctionFieldProps = {
  getFormItemProps?: () => Record<string, any>;
  getFieldProps?: () => Record<string, any>;
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
): ProFormComponent<P, ExtendsProps & FunctionFieldProps> {
  // 标记是否是 ProForm 的组件
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  Field.displayName = 'ProFormComponent';

  const FieldWithContext: React.FC<P & ExtendsProps & FunctionFieldProps> = (props) => {
    const {
      valueType,
      customLightMode,
      lightFilterLabelFormatter,
      valuePropName = 'value',
      ignoreWidth,
      defaultProps,
      ...defaultFormItemProps
    } = { ...props?.filedConfig, ...config } || {};

    const {
      label,
      tooltip,
      placeholder,
      width,
      bordered,
      messageVariables,
      ignoreFormItem,
      transform,
      convertValue,
      readonly,
      allowClear,
      colSize,
      getFormItemProps,
      getFieldProps,
      filedConfig,
      cacheForSwr,
      proFieldProps,
      ...rest
    } = { ...defaultProps, ...props };

    const restRef = useLatest(rest);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, forceUpdate] = useState<[]>();

    /**
     * 用于判断是否要重置shouldRender
     */
    const isUpdate = useRef<boolean>(false);
    const shouldRender = useRef<boolean>(true);

    // onChange触发fieldProps,formItemProps重新执行
    const [onlyChange, forceUpdateByOnChange] = useState<[]>();

    /** 从 context 中拿到的值 */
    const fieldContextValue = React.useContext(FieldContext);

    const fieldProps = useMemo(
      () => {
        const newFieldProps = {
          ...(ignoreFormItem ? omitUndefined({ value: rest.value }) : {}),
          placeholder,
          disabled: props.disabled,
          ...fieldContextValue.fieldProps,
          ...(rest.fieldProps as any),
          // 支持未传递getFieldProps的情况
          ...getFieldProps?.(),
        };

        newFieldProps.style = omitUndefined(newFieldProps?.style);
        return newFieldProps;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        ignoreFormItem,
        fieldContextValue.fieldProps,
        getFieldProps,
        placeholder,
        props.disabled,
        rest.fieldProps,
        rest.value,
        rest.dependenciesValues,
      ],
    );

    // restFormItemProps is user props pass to Form.Item
    const restFormItemProps = pickProFormItemProps(rest);

    const formItemProps = useMemo(
      () => ({
        ...fieldContextValue.formItemProps,
        // 支持未传递getFormItemProps的情况
        ...restFormItemProps,
        ...(rest.formItemProps as any),
        ...getFormItemProps?.(),
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        fieldContextValue.formItemProps,
        getFormItemProps,
        onlyChange,
        restFormItemProps,
        rest.dependenciesValues,
      ],
    );

    // 支持测试用例 renderFormItem support return false
    useEffect(() => {
      if (
        shouldRender.current === false &&
        // 借助 dependenciesValues 重新执行renderFormItem
        (rest.renderFormItem || rest.dependenciesValues)
      ) {
        if (isUpdate.current === true) {
          shouldRender.current = true;
          forceUpdate([]);
        } else {
          isUpdate.current = true;
        }
      }
    }, [rest.dependenciesValues, rest.renderFormItem]);

    const otherProps = useMemo(
      () => ({
        messageVariables,
        ...defaultFormItemProps,
        ...formItemProps,
      }),
      [defaultFormItemProps, formItemProps, messageVariables],
    );

    noteOnce(
      // eslint-disable-next-line @typescript-eslint/dot-notation
      !rest['defaultValue'],
      '请不要在 Form 中使用 defaultXXX。如果需要默认值请使用 initialValues 和 initialValue。',
    );

    const propsValueType = useMemo(() => rest.valueType, [rest.valueType]);

    const { prefixName } = useContext(RcFieldContext);
    const proFieldKey = useMemo(() => {
      /** 如果没有cacheForSwr，默认关掉缓存 只有table中默认打开，form中打开问题还挺多的，有些场景name 会相同 */
      if (!cacheForSwr) return undefined;
      let name = otherProps?.name;
      if (Array.isArray(name)) name = name.join('_');
      if (Array.isArray(prefixName) && name) name = `${prefixName.join('.')}.${name}`;
      return name && `form-field-${name}`;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stringify(otherProps?.name), prefixName]);

    const prefRest = usePrevious(rest);

    const onChange = useCallback(
      (...restParams) => {
        if (getFormItemProps || getFieldProps) {
          forceUpdateByOnChange([]);
        } else if (rest.renderFormItem) {
          forceUpdate([]);
        }
        fieldProps?.onChange?.(...restParams);
      },
      [getFieldProps, getFormItemProps, fieldProps, rest.renderFormItem],
    );

    const renderFormItem = useCallback(
      (...args: any) => {
        const renderDom = restRef.current.renderFormItem(...args);

        // 支持renderFormItem返回false||null||undefined后渲染组件
        if (
          (renderDom === false || renderDom === null || renderDom === undefined) &&
          shouldRender.current === true
        ) {
          shouldRender.current = false;
          isUpdate.current = false;
          // 由于renderFormItem可能会触发setState的执行，所以合适的时机执行
          requestAnimationFrame(() => forceUpdate([]));
        } else {
          isUpdate.current = true;
        }

        return renderDom;
      },
      [restRef],
    );

    const fieldPropsStyle = useMemo(
      () => {
        const newStyle = {
          ...fieldProps?.style,
        };
        if (newStyle.width !== undefined && propsValueType === 'switch') {
          Reflect.deleteProperty(newStyle, 'width');
        }
        return newStyle;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [stringify(fieldProps?.style), propsValueType],
    );

    const style = useMemo(() => {
      return omitUndefined({
        width: width && !WIDTH_SIZE_ENUM[width] ? width : undefined,
        ...fieldPropsStyle,
      });
    }, [fieldPropsStyle, width]);

    const className = useMemo(() => {
      return (
        classnames(fieldProps?.className, {
          'pro-field': width && WIDTH_SIZE_ENUM[width],
          [`pro-field-${width}`]:
            width &&
            // 有些 valueType 不需要宽度
            !ignoreWidthValueType.includes(propsValueType as 'text') &&
            !ignoreWidth &&
            WIDTH_SIZE_ENUM[width],
        }) || undefined
      );
    }, [ignoreWidth, propsValueType, fieldProps?.className, width]);

    const fieldProFieldProps = useMemo(() => {
      return omitUndefined({
        mode: rest?.mode,
        readonly,
        params: rest.params,
        proFieldKey: proFieldKey,
        ...proFieldProps,
      });
    }, [proFieldKey, readonly, rest?.mode, rest.params, proFieldProps]);

    const fieldFieldProps = useMemo(() => {
      return {
        onChange,
        allowClear,
        ...fieldProps,
        style,
        className,
      };
    }, [allowClear, className, onChange, fieldProps, style]);

    const field = useMemo(() => {
      return (
        <Field
          // @ts-ignore
          key={props.proFormFieldKey || props.name}
          // ProXxx 上面的 props 透传给 FieldProps，可能包含 Field 自定义的 props，
          // 比如 ProFormSelect 的 request
          {...(rest as P)}
          renderFormItem={rest.renderFormItem ? renderFormItem : undefined}
          fieldProps={fieldFieldProps}
          proFieldProps={fieldProFieldProps}
        />
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      renderFormItem,
      fieldProFieldProps,
      fieldFieldProps,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isDeepEqualReact(prefRest, rest, [
        'onChange',
        'onBlur',
        'onFocus',
        'record',
        'renderFormItem',
      ])
        ? undefined
        : {},
    ]);

    // 使用useMemo包裹避免不必要的re-render
    const FormItem = useMemo(() => {
      return (
        <ProFormItem
          // 全局的提供一个 tip 功能，可以减少代码量
          // 轻量模式下不通过 FormItem 显示 label
          label={label && proFieldProps?.light !== true ? label : undefined}
          tooltip={proFieldProps?.light !== true && tooltip}
          valuePropName={valuePropName}
          // @ts-ignore
          key={props.proFormFieldKey || otherProps.name?.toString()}
          // @ts-ignore
          {...otherProps}
          ignoreFormItem={ignoreFormItem}
          transform={transform}
          dataFormat={fieldProps?.format}
          valueType={valueType || propsValueType}
          messageVariables={{
            label: (label as string) || '',
            ...otherProps?.messageVariables,
          }}
          convertValue={convertValue}
          lightProps={omitUndefined({
            ...fieldProps,
            valueType: valueType || propsValueType,
            bordered,
            allowClear: field?.props?.allowClear ?? allowClear,
            light: proFieldProps?.light,
            label,
            customLightMode,
            labelFormatter: lightFilterLabelFormatter,
            valuePropName,
            footerRender: field?.props?.footerRender,
            // 使用用户的配置覆盖默认的配置
            ...rest.lightProps,
            ...otherProps.lightProps,
          })}
        >
          {field}
        </ProFormItem>
      );
    }, [
      label,
      proFieldProps?.light,
      tooltip,
      valuePropName,
      props.proFormFieldKey,
      otherProps,
      ignoreFormItem,
      transform,
      fieldProps,
      valueType,
      propsValueType,
      convertValue,
      bordered,
      field,
      allowClear,
      customLightMode,
      lightFilterLabelFormatter,
      rest.lightProps,
    ]);

    return shouldRender.current ? FormItem : null;
  };

  // 标记是否是 proform 的组件
  FieldWithContext.displayName = 'ProFormComponent';

  const DependencyWrapper: React.FC<P & ExtendsProps & FunctionFieldProps> = (props) => {
    const { dependencies } = props;
    return dependencies ? (
      <ProFormDependency name={dependencies}>
        {(values) => {
          return (
            <FieldWithContext dependenciesValues={values} dependencies={dependencies} {...props} />
          );
        }}
      </ProFormDependency>
    ) : (
      <FieldWithContext dependencies={dependencies} {...props} />
    );
  };

  return DependencyWrapper;
}

export { createField };
