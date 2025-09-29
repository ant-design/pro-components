import { get } from '@rc-component/util';
import { Form } from 'antd';
import type { AnyObject } from 'antd/es/_util/type';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ProFieldEmptyText } from '../../field';
import type { ProFormFieldProps } from '../../form';
import { FieldContext, ProForm, ProFormField } from '../../form';
import type { ProFieldValueType, ProSchemaComponentTypes, UseEditableUtilType } from '../../utils';
import { getFieldPropsOrFormItemProps, InlineErrorFormItem, runFunction } from '../../utils';
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

const CellRenderFromItem = <T extends AnyObject>(props: CellRenderFromItemProps<T>) => {
  const formContext = useContext(FieldContext);

  const { columnProps, prefixName, text, counter, rowData, index, recordKey, subName, proFieldProps, editableUtils } =
    props;

  const editableForm = ProForm.useFormInstance();

  const key = recordKey || index;
  const realIndex = useMemo(() => editableUtils?.getRealIndex?.(rowData!) ?? index, [editableUtils, index, rowData]);
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
    const value = spellNamePath(
      prefixName,
      prefixName ? subName : [],
      prefixName ? realIndex : key,
      columnProps?.key ?? columnProps?.dataIndex ?? index,
    );
    if (value.join('-') !== formItemName.join('-')) setName(value);
  }, [columnProps?.dataIndex, columnProps?.key, index, recordKey, prefixName, key, subName, formItemName, realIndex]);

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

  const InlineItem = useCallback<React.FC<any>>(
    ({ children, ...restProps }) => (
      <InlineErrorFormItem
        key={key}
        errorType="popover"
        name={formItemName}
        popoverProps={{
          getPopupContainer: formContext.getPopupContainer || (() => counter.rootDomRef.current || document.body),
        }}
        {...restProps}
      >
        {children}
      </InlineErrorFormItem>
    ),

    [key, formItemName],
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

    formItemProps.initialValue = (prefixName ? null : text) ?? formItemProps?.initialValue ?? columnProps?.initialValue;
    let fieldDom: React.ReactNode = (
      <ProFormField
        key={formItemName.join('-')}
        cacheForSwr
        ignoreFormItem
        fieldProps={getFieldPropsOrFormItemProps(columnProps?.fieldProps, ...needProps)}
        name={formItemName}
        proFormFieldKey={key}
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

    return (
      <InlineItem key={formItemName.join('-')} {...formItemProps}>
        {fieldDom}
      </InlineItem>
    );
  }, [
    columnProps,
    needProps,
    prefixName,
    text,
    key,
    formItemName,
    proFieldProps,
    InlineItem,
    index,
    recordKey,
    rowData,
    editableForm,
    props.editableUtils,
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
          try {
            return JSON.stringify(get(pre, shouldName)) !== JSON.stringify(get(next, shouldName));
          } catch (error) {
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
function cellRenderToFromItem<T extends AnyObject>(config: CellRenderFromItemProps<T>): React.ReactNode {
  const { text, valueType, rowData, columnProps, index } = config;

  // 如果 valueType === text ，没必要多走一次 render
  if (
    (!valueType || ['textarea', 'text'].includes(valueType.toString())) &&
    // valueEnum 存在说明是个select
    !columnProps?.valueEnum &&
    config.mode === 'read'
  ) {
    // 如果是''、null、undefined 显示columnEmptyText
    return SHOW_EMPTY_TEXT_LIST.includes(text as any) ? config.columnEmptyText : text;
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
    originDependencies: columnProps?.dependencies ? [columnProps?.dependencies] : undefined,
    params: runFunction(columnProps?.params, rowData, columnProps),
    readonly: columnProps?.readonly,
    text: valueType === 'index' || valueType === 'indexBorder' ? config.index : text,
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
        ignoreFormItem
        fieldProps={getFieldPropsOrFormItemProps(columnProps?.fieldProps, null, columnProps)}
        mode="read"
        {...proFieldProps}
      />
    );
  }
  return <CellRenderFromItem<T> key={config.recordKey} {...config} proFieldProps={proFieldProps} />;
}

export default cellRenderToFromItem;
