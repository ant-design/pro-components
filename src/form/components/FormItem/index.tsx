import { composeRef, getNodeRef, omit, supportRef } from '@rc-component/util';
import type { FormItemProps } from 'antd';
import { Form } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import React, { useContext, useEffect, useMemo } from 'react';
import type { ProFieldValueType } from '../../../utils';
import {
  omitUndefined,
  SearchConvertKeyFn,
  SearchTransformKeyFn,
  useDeepCompareMemo,
  useRefFunction,
} from '../../../utils';
import FieldContext from '../../FieldContext';
import { FormListContext } from '../List';

const FormItemProvide = React.createContext<{
  name?: NamePath;
  label?: React.ReactNode;
}>({});

/**
 * 把value扔给 fieldProps，方便给自定义用
 *
 * @returns
 * @param formFieldProps
 */
const WithValueFomFiledProps = React.forwardRef<
  any,
  Record<string, any> & {
    children?: React.ReactNode;
  }
>((formFieldProps, forwardedRef) => {
  const {
    children: filedChildren,
    onChange,
    onBlur,
    ignoreFormItem: _ignoreFormItem,
    valuePropName = 'value',
    ...restProps
  } = formFieldProps;

  const filedChildrenElementProps = React.isValidElement(filedChildren)
    ? (filedChildren.props as Record<string, any>)
    : undefined;

  const isProFormComponent =
    // @ts-ignore
    filedChildren?.type?.displayName !== 'ProFormComponent';

  const isValidElementForFiledChildren = !React.isValidElement(filedChildren);

  const onChangeMemo = useRefFunction(function (...restParams: any[]): void {
    onChange?.(...restParams);
    if (isProFormComponent) return;
    if (isValidElementForFiledChildren) return undefined;
    filedChildrenElementProps?.onChange?.(...restParams);

    filedChildrenElementProps?.fieldProps?.onChange?.(...restParams);
  });

  const onBlurMemo = useRefFunction(function (...restParams: any[]): void {
    if (isProFormComponent) return;
    if (isValidElementForFiledChildren) return;
    onBlur?.(...restParams);
    filedChildrenElementProps?.onBlur?.(...restParams);
    filedChildrenElementProps?.fieldProps?.onBlur?.(...restParams);
  });

  const childFieldProps = filedChildrenElementProps?.fieldProps;

  const omitOnBlurAndOnChangeProps = useDeepCompareMemo(
    () =>
      omit(
        // @ts-ignore
        childFieldProps || {},
        ['onBlur', 'onChange'],
      ),
    [childFieldProps],
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
      filedChildrenElementProps?.onChange?.(...restParams);
    };
  }, [fieldProps, filedChildren, filedChildrenElementProps, onChange]);

  if (!React.isValidElement(filedChildren)) return <>{filedChildren}</>;

  // restProps 可能来自 LightWrapper 的 cloneElement（light 模式下传入 variant/fieldProps），需保留以覆盖 filedChildren.props，避免内层控件线框双线
  const variantFromRest = restProps.variant;
  const fieldPropsFromRest = restProps.fieldProps;

  // 只有子组件支持 ref 时才注入，与 antd Form.Item 的 supportRef 判断一致，
  // 避免给普通函数组件（如 FieldEditableTable）传 ref 触发警告
  const mergedRef = supportRef(filedChildren)
    ? composeRef(forwardedRef as any, getNodeRef(filedChildren))
    : undefined;

  return React.cloneElement(
    filedChildren,
    omitUndefined({
      ...restProps,
      [valuePropName]: formFieldProps[valuePropName],
      ...filedChildrenElementProps,
      // Form.Item 注入的 itemRef 与 Field 已有的 ref（warpField 传入的 fieldRef）合并，
      // 供 getFieldInstance 取值的同时不破坏用户 fieldRef
      // getNodeRef 兼容 React 18（element.ref）与 React 19（props.ref）
      ref: mergedRef,
      onChange: finalChange,
      // 只有当子组件是 ProFormComponent 时才传递 fieldProps，避免传递给原生 DOM 元素
      ...(!isProFormComponent && fieldProps
        ? {
            fieldProps: {
              ...filedChildrenElementProps?.fieldProps,
              ...fieldPropsFromRest,
              ...fieldProps,
            },
          }
        : {}),
      ...(variantFromRest !== undefined && { variant: variantFromRest }),
      onBlur:
        isProFormComponent &&
        !isValidElementForFiledChildren &&
        typeof onBlur === 'function'
          ? onBlur
          : undefined,
    }),
  );
});
WithValueFomFiledProps.displayName = 'WithValueFomFiledProps';

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
  const getValuePropsFunc =
    convertValue || props.getValueProps
      ? (value: any) => {
          const newValue = convertValue?.(value, props.name!) ?? value;
          if (props.getValueProps) return props.getValueProps(newValue);
          return { [valuePropName || 'value']: newValue };
        }
      : undefined;

  const formDom =
    !addonAfter && !addonBefore ? (
      <Form.Item
        {...props}
        valuePropName={valuePropName}
        getValueProps={getValuePropsFunc}
      >
        {children}
      </Form.Item>
    ) : (
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
              input: React.JSX.Element;
              errorList: React.JSX.Element;
              extra: React.JSX.Element;
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
        getValueProps={getValuePropsFunc}
      >
        {children}
      </Form.Item>
    );

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
   * @param namePath 从根到当前字段的路径（string[]），如 `['user','profile','name']`
   * @param allValues 根级表单对象（与 `transformKeySubmitValue` 中传入的 values 同源引用，提交转换过程中会随其它字段一并变化）
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
  proFormFieldKey?: any;
  fieldProps?: Record<string, any>;
} & WarpFormItemProps;

const ProFormItem: React.FC<ProFormItemProps> = (props) => {
  const {
    valueType,
    transform,
    dataFormat,
    ignoreFormItem,
    children: _unusedChildren,
    fieldProps: _fieldProps,
    // 显式解构 label/tooltip，防止它们从 ...rest 漏入 WarpFormItem 被覆盖
    label,
    tooltip,
    ...rest
  } = props;
  const formListField = useContext(FormListContext);

  // ProFromList 的 filed，里面有name和key
  /** 从 context 中拿到的值 */
  const fieldValueTypeName = useMemo(() => {
    if (props.name === undefined) return props.name;
    if (formListField.listName !== undefined) {
      return [formListField.listName, props.name].flat(1) as string[];
    }
    // 确保返回的是数组格式
    return Array.isArray(props.name) ? props.name : [props.name];
  }, [formListField.listName, props.name]);
  const name = useMemo(() => {
    if (props.name === undefined) return props.name;
    if (formListField.name !== undefined) {
      return [formListField.name, props.name].flat(1) as string[];
    }
    // 确保返回的是数组格式
    return Array.isArray(props.name) ? props.name : [props.name];
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
    setFieldValueType(fieldValueTypeName, {
      valueType: valueType || 'text',
      dateFormat: dataFormat,
      transform,
    });
  }, [
    fieldValueTypeName,
    dataFormat,
    props.name,
    setFieldValueType,
    transform,
    valueType,
  ]);

  const formItemKey = rest.proFormFieldKey || rest.name?.toString();

  // formItem 支持function，如果是function 我就直接不管了
  if (typeof props.children === 'function') {
    return (
      <WarpFormItem {...rest} name={name} key={formItemKey}>
        {props.children}
      </WarpFormItem>
    );
  }

  const children = (
    <WithValueFomFiledProps
      key={formItemKey}
      valuePropName={props.valuePropName}
    >
      {props.children}
    </WithValueFomFiledProps>
  );

  if (ignoreFormItem) {
    return <>{children}</>;
  }

  return (
    <WarpFormItem
      key={formItemKey}
      {...formItemProps}
      {...rest}
      // label/tooltip 已从 props 解构，通过这里显式传入，确保调用方传 undefined 时不被 rest/formItemProps 覆盖
      label={label}
      tooltip={tooltip}
      name={name}
      isListField={formListField.name !== undefined}
    >
      {children}
    </WarpFormItem>
  );
};

export { FormItemProvide };
export default ProFormItem;
