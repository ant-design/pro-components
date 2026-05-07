import { get } from '@rc-component/util';
import type { PopoverProps } from 'antd';
import { Form } from 'antd';
import type { AnyObject } from 'antd/lib/_util/type';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ProFieldEmptyText } from '../../field';
import type { ProFormFieldProps } from '../../form';
import { FieldContext, ProForm, ProFormField } from '../../form';
import type {
  ProFieldValueType,
  ProSchemaComponentTypes,
  UseEditableUtilType,
} from '../../utils';
import {
  InlineErrorFormItem,
  getFieldPropsOrFormItemProps,
  runFunction,
} from '../../utils';
import type { ProColumnType } from '../index';
import type { ContainerType } from '../Store/Provide';

const SHOW_EMPTY_TEXT_LIST = ['', null, undefined];

/**
 * 拼接用于编辑的 key
 */
export const spellNamePath = (...rest: any[]): React.Key[] => {
  return rest
    .filter((index) => index !== undefined)
    .map((item) => {
      if (typeof item === 'number') {
        return item.toString();
      }
      return item;
    })
    .flat(1);
};

type CellRenderFromItemProps<T extends AnyObject> = {
  text: string | number | (string | number)[];
  valueType: ProColumnType['valueType'];
  index: number;
  rowData?: T;
  columnEmptyText?: ProFieldEmptyText;
  columnProps?: ProColumnType<T> & {
    entity: T;
  };
  type?: ProSchemaComponentTypes;
  // 行的唯一 key
  recordKey?: React.Key;
  mode: 'edit' | 'read';
  /**
   * If there is, use EditableTable in the Form
   */
  prefixName?: string;
  counter: ReturnType<ContainerType>;
  proFieldProps: ProFormFieldProps;
  subName: string[];
  editableUtils: UseEditableUtilType;
};

const CellRenderFromItem = <T extends AnyObject>(
  props: CellRenderFromItemProps<T>,
) => {
  const formContext = useContext(FieldContext);

  const {
    columnProps,
    prefixName,
    text,
    counter,
    rowData,
    index,
    recordKey,
    subName,
    proFieldProps,
    editableUtils,
  } = props;

  const editableForm = ProForm.useFormInstance();

  const key = recordKey || index;
  const realIndex = useMemo(
    () => editableUtils?.getRealIndex?.(rowData!) ?? index,
    [editableUtils, index, rowData],
  );
  const [formItemName, setName] = useState<React.Key[]>(() =>
    spellNamePath(
      prefixName,
      prefixName ? subName : [],
      prefixName ? realIndex : key,
      columnProps?.key ?? columnProps?.dataIndex ?? index,
    ),
  );

  const rowName = useMemo(() => {
    return formItemName.slice(0, -1);
  }, [formItemName]);

  useEffect(() => {
    const nextName = spellNamePath(
      prefixName,
      prefixName ? subName : [],
      prefixName ? realIndex : key,
      columnProps?.key ?? columnProps?.dataIndex ?? index,
    );
    // 用 functional update 读取最新 prev 值进行比较，避免把 formItemName
    // 加入 deps 导致「state 变 → effect 跑 → setName → state 变」的循环依赖。
    setName((prev) => {
      if (nextName.join('-') !== prev.join('-')) return nextName;
      return prev;
    });
  }, [
    columnProps?.dataIndex,
    columnProps?.key,
    index,
    recordKey,
    prefixName,
    key,
    subName,
    realIndex,
  ]);

  const needProps = useMemo(
    () =>
      [
        editableForm,
        {
          ...columnProps,
          rowKey: rowName,
          rowIndex: index,
          isEditable: true,
        },
      ] as const,
    [columnProps, editableForm, index, rowName],
  );

  const generateFormItem = useCallback(() => {
    const formItemProps = {
      ...getFieldPropsOrFormItemProps(columnProps?.formItemProps, ...needProps),
    };
    formItemProps.messageVariables = {
      label: (columnProps?.title as string) || '此项',
      type: (columnProps?.valueType as string) || '文本',
      ...formItemProps?.messageVariables,
    };

    // 有 prefixName（EditableTable 嵌套场景）时不应强制覆盖 initialValue：
    // 原写法 `(prefixName ? null : text) ?? ...` 中 `??` 不过滤 null，
    // 导致有 prefixName 时 initialValue 被强制设为 null，覆盖了 formItemProps
    // 和 columnProps 中的有效值。
    formItemProps.initialValue = prefixName
      ? (formItemProps?.initialValue ?? columnProps?.initialValue)
      : (text ?? formItemProps?.initialValue ?? columnProps?.initialValue);
    let fieldDom: React.ReactNode = (
      <ProFormField
        cacheForSwr
        key={formItemName.join('-')}
        name={formItemName}
        proFormFieldKey={key}
        ignoreFormItem
        fieldProps={getFieldPropsOrFormItemProps(
          columnProps?.fieldProps,
          ...needProps,
        )}
        {...proFieldProps}
      />
    );
    /**
     * 如果没有自定义直接返回
     */
    if (columnProps?.formItemRender) {
      fieldDom = columnProps.formItemRender(
        {
          ...columnProps,
          index,
          isEditable: true,
          type: 'table',
        },
        {
          defaultRender: () => <>{fieldDom}</>,
          type: 'form',
          recordKey,
          record: {
            ...rowData,
            ...editableForm?.getFieldValue([key]),
          },
          isEditable: true,
        },
        editableForm as any,
        props.editableUtils,
      );
      // 如果需要完全自定义可以不要name
      if (columnProps.ignoreFormItem) return <>{fieldDom}</>;
    }

    // 注意：不能把 InlineErrorFormItem 包装成 useCallback<React.FC> 再作为组件使用。
    // 每次 deps 变化会产生新函数引用，React 会认为是不同组件而 unmount/remount，
    // 导致 Form.Item 内部校验状态丢失。此处直接内联 JSX 是正确做法。
    return (
      <InlineErrorFormItem
        popoverProps={{
          getPopupContainer: (formContext.getPopupContainer as PopoverProps['getPopupContainer']) ||
            (() => (counter.rootDomRef.current || document.body) as HTMLElement),
        }}
        key={formItemName.join('-')}
        errorType="popover"
        name={formItemName}
        {...formItemProps}
      >
        {fieldDom}
      </InlineErrorFormItem>
    );
    // deps 说明：
    // - needProps 已经 memo([columnProps, editableForm, index, rowName])，
    //   因此 columnProps / editableForm / index 的变化都会通过 needProps 触发。
    // - counter.rootDomRef 是 React ref 对象，引用永不变，不需要进 deps。
    // - editableUtils 优先使用解构变量，与 props.editableUtils 引用相同。
  }, [
    columnProps,
    needProps,
    prefixName,
    text,
    key,
    formItemName,
    proFieldProps,
    formContext.getPopupContainer,
    recordKey,
    rowData,
    editableUtils,
  ]);

  if (formItemName.length === 0) return null;

  if (
    typeof columnProps?.formItemRender === 'function' ||
    typeof columnProps?.fieldProps === 'function' ||
    typeof columnProps?.formItemProps === 'function'
  ) {
    return (
      <Form.Item
        noStyle
        shouldUpdate={(pre, next) => {
          if (pre === next) return false;
          const shouldName = [rowName].flat(1) as (string | number | symbol)[];
          // rowName 为空（formItemName 只有一段，无法精确定位行数据）时，
          // 直接返回 true 让 generateFormItem 重新执行，避免用空路径
          // get(values, []) 拿到整个 form values 对象做全量 JSON.stringify。
          if (shouldName.length === 0) return true;
          const prevValue = get(pre, shouldName);
          const nextValue = get(next, shouldName);
          // 先做引用浅比较：相同引用则跳过渲染，性能 O(1)。
          // 只有引用不等时才 fallback 到 JSON.stringify 深比较，
          // 规避循环引用导致的 throw（catch 返回 true = 总是重渲染）。
          if (prevValue === nextValue) return false;
          try {
            return JSON.stringify(prevValue) !== JSON.stringify(nextValue);
          } catch (_error) {
            return true;
          }
        }}
      >
        {() => generateFormItem()}
      </Form.Item>
    );
  }
  return generateFormItem();
};

/**
 * 根据不同的类型来转化数值
 *
 * @param text
 * @param valueType
 */
function cellRenderToFromItem<T extends AnyObject>(
  config: CellRenderFromItemProps<T>,
): React.ReactNode {
  const { text, valueType, rowData, columnProps, index } = config;

  // 如果 valueType === text ，没必要多走一次 render
  if (
    (!valueType || ['textarea', 'text'].includes(valueType.toString())) &&
    // valueEnum 存在说明是个select
    !columnProps?.valueEnum &&
    config.mode === 'read'
  ) {
    // 如果是''、null、undefined 显示columnEmptyText
    return SHOW_EMPTY_TEXT_LIST.includes(text as any)
      ? config.columnEmptyText
      : text;
  }

  if (typeof valueType === 'function' && rowData) {
    // 防止valueType是函数,并且text是''、null、undefined跳过显式设置的columnEmptyText
    return cellRenderToFromItem({
      ...config,
      valueType: valueType(rowData, config.type) || 'text',
    } as any);
  }

  const columnKey = columnProps?.key || columnProps?.dataIndex?.toString();

  const dependencies = columnProps?.dependencies
    ? ([
        config.prefixName,
        config.prefixName ? index?.toString() : config.recordKey?.toString(),
        columnProps?.dependencies,
      ]
        .filter(Boolean)
        .flat(1) as string[])
    : [];
  /**
   * 生成公用的 proField dom 配置
   */
  const proFieldProps: ProFormFieldProps = {
    valueEnum: runFunction<[T | undefined]>(columnProps?.valueEnum, rowData),
    request: columnProps?.request,
    dependencies: columnProps?.dependencies ? [dependencies] : undefined,
    originDependencies: columnProps?.dependencies
      ? [columnProps?.dependencies]
      : undefined,
    params: runFunction(columnProps?.params, rowData, columnProps),
    readonly: columnProps?.readonly,
    text:
      valueType === 'index' || valueType === 'indexBorder'
        ? config.index
        : text,
    mode: config.mode,
    formItemRender: undefined,
    valueType: valueType as ProFieldValueType,
    // @ts-ignore
    record: rowData,
    proFieldProps: {
      emptyText: config.columnEmptyText,
      proFieldKey: columnKey ? `table-field-${columnKey}` : undefined,
    },
  };

  /** 只读模式直接返回就好了，不需要处理 formItem */
  if (config.mode !== 'edit') {
    return (
      <ProFormField
        mode="read"
        ignoreFormItem
        fieldProps={getFieldPropsOrFormItemProps(
          columnProps?.fieldProps,
          null,
          columnProps,
        )}
        {...proFieldProps}
      />
    );
  }
  return (
    <CellRenderFromItem<T>
      key={config.recordKey ?? config.index}
      {...config}
      proFieldProps={proFieldProps}
    />
  );
}

export default cellRenderToFromItem;
