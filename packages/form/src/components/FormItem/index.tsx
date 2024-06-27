import {
  isDropdownValueType,
  omitUndefined,
  ProFieldValueType,
  SearchConvertKeyFn,
  SearchTransformKeyFn,
  useDeepCompareMemo,
  useRefFunction,
} from '@ant-design/pro-utils';
import type { FormItemProps } from 'antd';
import { ConfigProvider, Form } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import omit from 'omit.js';
import React, { useContext, useEffect, useMemo } from 'react';
import type { LightWrapperProps } from '../../BaseForm';
import { LightWrapper } from '../../BaseForm';
import FieldContext from '../../FieldContext';
import { FormListContext } from '../List';

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
const WithValueFomFiledProps: React.FC<
  Record<string, any> & {
    children?: React.ReactNode;
  }
> = (formFieldProps) => {
  const {
    children: filedChildren,
    onChange,
    onBlur,
    ignoreFormItem,
    valuePropName = 'value',
    ...restProps
  } = formFieldProps;

  const isProFormComponent =
    // @ts-ignore
    filedChildren?.type?.displayName !== 'ProFormComponent';

  const isValidElementForFiledChildren = !React.isValidElement(filedChildren);

  const onChangeMemo = useRefFunction(function (...restParams: any[]): void {
    onChange?.(...restParams);
    if (isProFormComponent) return;
    if (isValidElementForFiledChildren) return undefined;
    filedChildren?.props?.onChange?.(...restParams);

    (filedChildren?.props as Record<string, any>)?.fieldProps?.onChange?.(
      ...restParams,
    );
  });

  const onBlurMemo = useRefFunction(function (...restParams: any[]): void {
    if (isProFormComponent) return;
    if (isValidElementForFiledChildren) return;
    onBlur?.(...restParams);
    filedChildren?.props?.onBlur?.(...restParams);
    (filedChildren?.props as Record<string, any>)?.fieldProps?.onBlur?.(
      ...restParams,
    );
  });

  const omitOnBlurAndOnChangeProps = useDeepCompareMemo(
    () =>
      omit(
        // @ts-ignore
        filedChildren?.props?.fieldProps || {},
        ['onBlur', 'onChange'],
      ),
    [
      omit(
        // @ts-ignore
        filedChildren?.props?.fieldProps || {},
        ['onBlur', 'onChange'],
      ),
    ],
  );
  const propsValuePropName = formFieldProps[valuePropName];

  const fieldProps = useMemo(() => {
    if (isProFormComponent) return undefined;
    if (isValidElementForFiledChildren) return undefined;
    return omitUndefined({
      id: restProps.id,
      // 优先使用 children.props.fieldProps，
      // 比如 LightFilter 中可能需要通过 fieldProps 覆盖 Form.Item 默认的 onChange
      [valuePropName]: propsValuePropName,
      ...omitOnBlurAndOnChangeProps,
      onBlur: onBlurMemo,
      // 这个 onChange 是 Form.Item 添加上的，
      // 要通过 fieldProps 透传给 ProField 调用
      onChange: onChangeMemo,
    });
  }, [
    propsValuePropName,
    omitOnBlurAndOnChangeProps,
    onBlurMemo,
    onChangeMemo,
    restProps.id,
    valuePropName,
  ]);

  const finalChange = useMemo(() => {
    if (fieldProps) return undefined;
    if (!React.isValidElement(filedChildren)) return undefined;
    return (...restParams: any[]) => {
      onChange?.(...restParams);
      filedChildren?.props?.onChange?.(...restParams);
    };
  }, [fieldProps, filedChildren, onChange]);

  if (!React.isValidElement(filedChildren)) return <>{filedChildren}</>;

  return React.cloneElement(
    filedChildren,
    omitUndefined({
      ...restProps,
      [valuePropName]: formFieldProps[valuePropName],
      ...filedChildren.props,
      onChange: finalChange,
      fieldProps,
      onBlur: isProFormComponent && !isValidElementForFiledChildren && onBlur,
    }),
  );
};

type WarpFormItemProps = {
  /** @name 前置的dom * */
  addonBefore?: React.ReactNode;
  /** @name 后置的dom * */
  addonAfter?: React.ReactNode;
  /**
   * 包裹的样式，一般没用
   */
  addonWarpStyle?: React.CSSProperties;
  /**
   * @name 获取时转化值，一般用于将数据格式化为组件接收的格式
   * @param value 字段的值
   * @param namePath 字段的name
   * @returns 字段新的值
   *
   *
   * @example a,b => [a,b]     convertValue: (value,namePath)=> value.split(",")
   * @example string => json   convertValue: (value,namePath)=> JSON.parse(value)
   * @example number => date   convertValue: (value,namePath)=> Dayjs(value)
   * @example YYYY-MM-DD => date   convertValue: (value,namePath)=> Dayjs(value,"YYYY-MM-DD")
   * @example  string => object   convertValue: (value,namePath)=> { return {value,label:value} }
   */
  convertValue?: SearchConvertKeyFn;
  help?:
    | React.ReactNode
    | ((params: {
        errors: React.ReactNode[];
        warnings: React.ReactNode[];
      }) => React.ReactNode);
};

/**
 * 支持了一下前置 dom 和后置的 dom 同时包一个provide
 *
 * @param WarpFormItemProps
 * @returns
 */
const WarpFormItem: React.FC<
  Omit<FormItemProps, 'help'> & WarpFormItemProps
> = ({
  children,
  addonAfter,
  addonBefore,
  valuePropName,
  addonWarpStyle,
  convertValue,
  help,
  ...props
}) => {
  const formDom = useMemo(() => {
    let getValuePropsFunc: any = (value: any) => {
      const newValue = convertValue?.(value, props.name!) ?? value;
      if (props.getValueProps) return props.getValueProps(newValue);
      return {
        [valuePropName || 'value']: newValue,
      };
    };
    if (!convertValue && !props.getValueProps) {
      getValuePropsFunc = undefined;
    }
    if (!addonAfter && !addonBefore) {
      return (
        <Form.Item
          {...props}
          help={typeof help !== 'function' ? help : undefined}
          valuePropName={valuePropName}
          getValueProps={getValuePropsFunc}
          // @ts-ignore
          _internalItemRender={{
            mark: 'pro_table_render',
            render: (
              inputProps: FormItemProps & {
                errors: React.ReactNode[];
                warnings: React.ReactNode[];
              },
              doms: {
                input: JSX.Element;
                errorList: JSX.Element;
                extra: JSX.Element;
              },
            ) => (
              <>
                {doms.input}
                {typeof help === 'function'
                  ? help({
                      errors: inputProps.errors,
                      warnings: inputProps.warnings,
                    })
                  : doms.errorList}
                {doms.extra}
              </>
            ),
          }}
        >
          {children}
        </Form.Item>
      );
    }

    return (
      <Form.Item
        {...props}
        help={typeof help !== 'function' ? help : undefined}
        valuePropName={valuePropName}
        // @ts-ignore
        _internalItemRender={{
          mark: 'pro_table_render',
          render: (
            inputProps: FormItemProps & {
              errors: React.ReactNode[];
              warnings: React.ReactNode[];
            },
            doms: {
              input: JSX.Element;
              errorList: JSX.Element;
              extra: JSX.Element;
            },
          ) => (
            <>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  ...addonWarpStyle,
                }}
              >
                {addonBefore ? (
                  <div style={{ marginInlineEnd: 8 }}>{addonBefore}</div>
                ) : null}
                {doms.input}
                {addonAfter ? (
                  <div style={{ marginInlineStart: 8 }}>{addonAfter}</div>
                ) : null}
              </div>
              {typeof help === 'function'
                ? help({
                    errors: inputProps.errors,
                    warnings: inputProps.warnings,
                  })
                : doms.errorList}
              {doms.extra}
            </>
          ),
        }}
        {...props}
        getValueProps={getValuePropsFunc}
      >
        {children}
      </Form.Item>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addonAfter, addonBefore, children, convertValue?.toString(), props]);

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

export type ProFormItemProps = FormItemProps & {
  ignoreFormItem?: boolean;
  valueType?: ProFieldValueType;
  /**
   * @name 提交时转化值，一般用于将值转化为提交的数据
   * @param value 字段的值
   * @param namePath 字段的name
   * @param allValues 所有的字段
   * @returns 字段新的值，如果返回对象，会和所有值 merge 一次
   *
   * @example {name:[a,b] => {name:a,b }    transform: (value,namePath,allValues)=> value.join(",")
   * @example {name: string => { newName:string }    transform: (value,namePath,allValues)=> { newName:value }
   * @example {name:dayjs} => {name:string transform: (value,namePath,allValues)=> value.format("YYYY-MM-DD")
   * @example {name:dayjs}=> {name:时间戳} transform: (value,namePath,allValues)=> value.valueOf()
   * @example {name:{value,label}} => { name:string} transform: (value,namePath,allValues)=> value.value
   * @example {name:{value,label}} => { valueName,labelName  } transform: (value,namePath,allValues)=> { valueName:value.value, labelName:value.name }
   */
  transform?: SearchTransformKeyFn;
  dataFormat?: string;
  lightProps?: LightWrapperProps;
  proFormFieldKey?: any;
} & WarpFormItemProps;

const ProFormItem: React.FC<ProFormItemProps> = (props) => {
  /** 从 context 中拿到的值 */
  const { componentSize } = ConfigProvider?.useConfig?.() || {
    componentSize: 'middle',
  };
  const size = componentSize;
  const {
    valueType,
    transform,
    dataFormat,
    ignoreFormItem,
    lightProps,
    children: unusedChildren,
    ...rest
  } = props;
  const formListField = useContext(FormListContext);

  // ProFromList 的 filed，里面有name和key
  /** 从 context 中拿到的值 */
  const name = useMemo(() => {
    if (props.name === undefined) return props.name;
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
      [formListField.listName, props.name]
        .flat(1)
        .filter((itemName) => itemName !== undefined),
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
    if (!lightProps?.light || lightProps?.customLightMode || isDropdown) {
      return true;
    }
    return false;
  }, [lightProps?.customLightMode, isDropdown, lightProps?.light]);

  // formItem 支持function，如果是function 我就直接不管了
  if (typeof props.children === 'function') {
    return (
      <WarpFormItem
        {...rest}
        name={name}
        key={rest.proFormFieldKey || rest.name?.toString()}
      >
        {props.children}
      </WarpFormItem>
    );
  }

  const children = (
    <WithValueFomFiledProps
      key={rest.proFormFieldKey || rest.name?.toString()}
      valuePropName={props.valuePropName}
    >
      {props.children}
    </WithValueFomFiledProps>
  );

  const lightDom = noLightFormItem ? (
    children
  ) : (
    <LightWrapper
      {...lightProps}
      key={rest.proFormFieldKey || rest.name?.toString()}
      size={size}
    >
      {children}
    </LightWrapper>
  );
  // 这里控制是否需要 LightWrapper，为了提升一点点性能
  if (ignoreFormItem) {
    return <>{lightDom}</>;
  }

  return (
    <WarpFormItem
      key={rest.proFormFieldKey || rest.name?.toString()}
      {...formItemProps}
      {...rest}
      name={name}
      isListField={formListField.name !== undefined}
    >
      {lightDom}
    </WarpFormItem>
  );
};

export { FormItemProvide };
export default ProFormItem;
