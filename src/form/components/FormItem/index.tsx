import { composeRef, getNodeRef, omit, supportRef } from '@rc-component/util';
import type { FormItemProps } from 'antd';
import { Form } from 'antd';
import React, { useContext, useEffect, useMemo } from 'react';
import {
  omitUndefined,
  ProFormContext,
  useDeepCompareMemo,
  useRefFunction,
} from '../../../utils';
import type { NamePath } from '../../../utils/antdTypes';
import FieldContext from '../../FieldContext';
import { FormListContext } from '../List/FormListContext';
import type { ProFormItemHelpFunction, ProFormItemProps } from './typing';

export type { ProFormItemHelpFunction, ProFormItemProps } from './typing';

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

/**
 * 读取 Form.Item 校验消息的桥接组件。
 *
 * antd 6 会把 { status, errors, warnings } 通过 FormItemInputContext 注入到
 * Form.Item 的 children 树中（`Form.Item.useStatus` 的数据源），
 * 函数式 help 借助这个公开 API 拿到校验消息，
 * 替代旧版 `_internalItemRender` 私有渲染（#9709/#8942/#9066）：
 * 私有渲染会整体跳过 additionalDom（错误提示 + extra + minHeight 占位），
 * 导致校验时高度抖动、错误信息丢失。
 */
const FieldHelpMessages: React.FC<{
  help: ProFormItemHelpFunction;
}> = ({ help }) => {
  const { errors = [], warnings = [] } = Form.Item.useStatus();
  // help="" 使原生 explain 只渲染空内容（高度 0），错误显示由此处接管，
  // additionalDom 常驻保证校验出现/消失时高度稳定（#9709/#8942）
  return <div>{help({ errors, warnings })}</div>;
};

interface FormItemChildrenShellProps {
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  addonWarpStyle?: React.CSSProperties;
  help?: ProFormItemHelpFunction;
  children?: React.ReactNode;
}

/**
 * Form.Item 的 children 壳层：
 * 1. addonBefore/addonAfter 与控件一起进入 Form.Item 标准 children 插槽，
 *    错误提示 / extra / minHeight 占位由 antd 原生 additionalDom 管理，
 *    校验出现与消失时高度稳定（#9709/#8942）；
 * 2. Form.Item 通过 cloneElement 注入的控制属性（value/onChange/id/ref 等）
 *    由这里透传给内部真正的字段组件。
 */
const FormItemChildrenShell = React.forwardRef<
  any,
  FormItemChildrenShellProps & Record<string, any>
>(
  (
    {
      addonBefore,
      addonAfter,
      addonWarpStyle,
      help: helpFn,
      children,
      ...controlProps
    },
    ref,
  ) => {
    // 只有子组件支持 ref 时才注入（与 antd Form.Item 的 supportRef 判断一致），
    // 避免给普通函数组件传 ref 触发警告
    const mergedRef =
      ref && supportRef(children as React.ReactElement) ? ref : undefined;

    // 与 antd Form.Item 的 cloneElement 语义保持一致：
    // 控制属性直接覆盖（包括 value: undefined 的受控清空），
    // ref 仅在子组件支持时注入
    const fieldChild = React.isValidElement(children)
      ? React.cloneElement(children, {
          ...controlProps,
          ...(mergedRef ? { ref: mergedRef } : {}),
        } as any)
      : children;

    return (
      <>
        {addonBefore || addonAfter ? (
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
            {/*
             * flex:1 包住「控件 + addonAfter」，保证 Text/Select 可收缩，
             * 同时单位/按钮紧跟控件，避免 Digit 固定宽度时把 addon 顶到行尾。
             */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {fieldChild}
              {addonAfter ? (
                <div style={{ marginInlineStart: 8, flexShrink: 0 }}>
                  {addonAfter}
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          fieldChild
        )}
        {helpFn ? <FieldHelpMessages help={helpFn} /> : null}
      </>
    );
  },
);
FormItemChildrenShell.displayName = 'FormItemChildrenShell';

/**
 * 支持了一下前置 dom 和后置的 dom 同时包一个provide
 *
 * @param WarpFormItemProps
 * @returns
 */
const WarpFormItem: React.FC<ProFormItemProps> = ({
  children,
  addonAfter,
  addonBefore,
  valuePropName,
  addonWarpStyle,
  convertValue,
  help,
  ...props
}) => {
  /** #9120:convertValue 第三个参数(entity)需要整表数据 */
  const proFormContext = React.useContext(ProFormContext);
  const convertValueTypeRef = React.useRef<{
    source: string;
    target: string;
  }>();
  const getValueType = (value: any) => {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  };
  const getValuePropsFunc =
    convertValue || props.getValueProps
      ? (value: any) => {
          const valueType = getValueType(value);
          const cachedTypes = convertValueTypeRef.current;
          const shouldReuseComponentValue =
            cachedTypes &&
            cachedTypes.source !== cachedTypes.target &&
            valueType === cachedTypes.target;
          let entity: Record<string, any> | undefined;
          try {
            // #9120 entity:整表数据(true: 包含未注册 Form.Item 的字段,
            // 如通过 initialValues/setFieldsValue 写入的 startDate)。
            // ProFormContext.formRef 是 BaseForm 内部维护的实时 form 实例,
            // 挂载即可用,无时序问题
            const instance = proFormContext?.formRef?.current as any;
            entity = instance?.getFieldsValue?.(true);
          } catch {
            entity = undefined;
          }
          const newValue = shouldReuseComponentValue
            ? value
            : (convertValue?.(value, props.name!, entity) ?? value);
          if (convertValue && !shouldReuseComponentValue) {
            convertValueTypeRef.current = {
              source: valueType,
              target: getValueType(newValue),
            };
          }
          if (props.getValueProps) return props.getValueProps(newValue);
          return { [valuePropName || 'value']: newValue };
        }
      : undefined;

  const isFunctionHelp = typeof help === 'function';
  // render-prop children（函数）必须直接交给 Form.Item，
  // 由 rc-form 以 (control, meta, context) 调用，不能经过壳层包装
  const isRenderPropsChildren = typeof children === 'function';

  // 函数式 help：help="" 让 additionalDom 常驻（保持高度占位），
  // 具体内容由 children 内的 FieldHelpMessages 渲染。
  // 注意不能用 ReactNode help 替换原生 ErrorList——help 优先级高于 errors，
  // 会吞掉用户未自定义时的默认错误提示。
  const formDom = (
    <Form.Item
      {...props}
      help={isFunctionHelp ? '' : help}
      valuePropName={valuePropName}
      getValueProps={getValuePropsFunc}
    >
      {isRenderPropsChildren ? (
        (children as any)
      ) : (
        <FormItemChildrenShell
          addonBefore={addonBefore}
          addonAfter={addonAfter}
          addonWarpStyle={addonWarpStyle}
          help={isFunctionHelp ? (help as ProFormItemHelpFunction) : undefined}
        >
          {children}
        </FormItemChildrenShell>
      )}
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
      // render-prop 场景用户已传入 [index, 'a'] 时不再重复拼 listName 的行索引，
      // 否则 transform/valueType 会注册到 items.0.0.a 的错误路径（#9129/#9238）
      const nameArray = Array.isArray(props.name) ? props.name : [props.name];
      const [firstSegment] = nameArray;
      if (firstSegment === formListField.name) {
        // 用户 name 已带行索引：listName 去掉末尾的行索引后拼接
        const listNameArray = Array.isArray(formListField.listName)
          ? formListField.listName
          : [formListField.listName];
        return [...listNameArray.slice(0, -1), ...nameArray] as string[];
      }
      return [formListField.listName, props.name].flat(1) as string[];
    }
    // 确保返回的是数组格式
    return Array.isArray(props.name) ? props.name : [props.name];
  }, [formListField.listName, formListField.name, props.name]);
  const name = useMemo(() => {
    if (props.name === undefined) return props.name;
    if (formListField.name !== undefined) {
      // antd 的 Form.List 会自动给内部字段的 name 追加列表前缀，
      // 字段 name 应当是「相对列表」的路径。静态 children（name="answer"）需要
      // 手动补上行索引；render-prop 场景用户已按 antd 惯例传入 [index, 'answer']，
      // 不再重复补索引，否则会生成 items.0.0.answer 的双重索引（#9129/#9238）。
      const [firstSegment] = Array.isArray(props.name)
        ? props.name
        : [props.name];
      if (firstSegment === formListField.name) {
        return Array.isArray(props.name) ? props.name : [props.name];
      }
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
      convertValue: rest.convertValue,
      transform,
    });
  }, [
    fieldValueTypeName,
    dataFormat,
    props.name,
    setFieldValueType,
    transform,
    rest.convertValue,
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
