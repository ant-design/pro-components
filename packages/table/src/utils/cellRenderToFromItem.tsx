import React from 'react';
import { Form } from 'antd';
import type { FormInstance, FormItemProps } from 'antd';
import type { useContainer } from '../container';
import type { ProFormFieldProps } from '@ant-design/pro-form';
import { ProFormField } from '@ant-design/pro-form';
import type { ProFieldEmptyText } from '@ant-design/pro-field';
import type { ProFieldValueType, ProSchemaComponentTypes } from '@ant-design/pro-utils';
import { runFunction, isDeepEqualReact } from '@ant-design/pro-utils';
import { getFieldPropsOrFormItemProps, InlineErrorFormItem } from '@ant-design/pro-utils';
import type { ProColumnType } from '../index';
import get from 'rc-util/lib/utils/get';

const SHOW_EMPTY_TEXT_LIST = ['', null, undefined];

/**
 * 拼接用于编辑的 key
 *
 * @param base 基本的 key
 * @param dataIndex 需要拼接的key
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

type RenderToFromItemProps<T> = {
  text: string | number | React.ReactText[];
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
  prefixName?: string;
  counter: ReturnType<typeof useContainer>;
};

class CellRenderFromItem<T> extends React.Component<
  {
    config: RenderToFromItemProps<T>;
    proFieldProps: ProFormFieldProps;
  },
  {
    name: React.Key[];
    rowName: React.Key[];
  }
> {
  state = {
    name: [],
    rowName: [],
  };
  functionKeys = ['onChange', 'counter', 'render', 'tableColumn'];
  componentDidMount() {
    const { config } = this.props;
    const { columnProps, prefixName } = config;
    const name = spellNamePath(
      prefixName,
      prefixName ? config.index : config.recordKey ?? config.index,
      columnProps?.key ?? columnProps?.dataIndex ?? config.index,
    );
    this.setState({
      name,
      rowName: name.slice(0, -1),
    });
  }
  componentDidUpdate() {
    const { config } = this.props;
    const { columnProps, prefixName } = config;
    const name = spellNamePath(
      prefixName,
      prefixName ? config.index : config.recordKey ?? config.index,
      columnProps?.key ?? columnProps?.dataIndex ?? config.index,
    );

    if (name.toString() !== this.state.name.toString()) {
      this.setState({
        name,
        rowName: name.slice(0, -1),
      });
    }
  }
  generateFormItem = () => {
    const { config, proFieldProps } = this.props;
    const { text, columnProps, counter, rowData = {} } = config;

    /** 获取 formItemProps Props */
    const formItemProps = getFieldPropsOrFormItemProps(
      columnProps?.formItemProps,
      counter.editableForm as FormInstance,
      {
        rowKey: this.state.rowName,
        rowIndex: config.index,
        ...columnProps,
        isEditable: true,
      },
    ) as FormItemProps;

    const messageVariables = {
      label: (columnProps?.title as string) || '此项',
      type: (columnProps?.valueType as string) || '文本',
      ...formItemProps?.messageVariables,
    };
    const inputDom = (
      <ProFormField
        cacheForSwr
        key={config.recordKey || config.index}
        name={this.state.name}
        // @ts-ignore
        proFormFieldKey={config.recordKey || config.index}
        ignoreFormItem
        fieldProps={getFieldPropsOrFormItemProps(
          columnProps?.fieldProps,
          counter?.editableForm as FormInstance,
          {
            ...columnProps,
            rowKey: this.state.rowName,
            rowIndex: config.index,
            isEditable: true,
          },
        )}
        {...proFieldProps}
      />
    );

    /** 如果没有自定义直接返回 */
    if (!columnProps?.renderFormItem) {
      const dom = (
        <InlineErrorFormItem
          key={config.recordKey || config.index}
          errorType="popover"
          name={this.state.name}
          {...formItemProps}
          messageVariables={messageVariables}
          initialValue={text ?? formItemProps?.initialValue ?? columnProps?.initialValue}
        >
          {inputDom}
        </InlineErrorFormItem>
      );
      return dom;
    }
    /** RenderFormItem 需要被自定义的时候执行，defaultRender 比较麻烦所以这里多包一点 */
    const renderDom = columnProps.renderFormItem?.(
      {
        ...columnProps,
        index: config.index,
        isEditable: true,
        type: 'table',
      },
      {
        defaultRender: () => {
          return (
            <InlineErrorFormItem
              key={config.recordKey || config.index}
              errorType="popover"
              name={this.state.name}
              {...formItemProps}
              messageVariables={messageVariables}
              initialValue={text ?? formItemProps?.initialValue ?? columnProps?.initialValue}
            >
              {inputDom}
            </InlineErrorFormItem>
          );
        },
        type: 'form',
        recordKey: config.recordKey,
        record: {
          ...rowData,
          ...counter?.editableForm?.getFieldValue([config.recordKey || config.index]),
        },
        isEditable: true,
      },
      counter?.editableForm as any,
    );

    return (
      <InlineErrorFormItem
        errorType="popover"
        key={config.recordKey || config.index}
        name={this.state.name}
        {...formItemProps}
        initialValue={text ?? formItemProps?.initialValue ?? columnProps?.initialValue}
        messageVariables={messageVariables}
      >
        {renderDom}
      </InlineErrorFormItem>
    );
  };

  shouldComponentUpdate(
    nextProps: {
      config: RenderToFromItemProps<T>;
      proFieldProps: ProFormFieldProps;
    },
    nextState: any,
  ) {
    return (
      !isDeepEqualReact(nextProps.proFieldProps, this.props.proFieldProps, this.functionKeys) ||
      !isDeepEqualReact(nextProps.config, this.props.config, this.functionKeys) ||
      !isDeepEqualReact(nextState, this.state)
    );
  }

  render(): React.ReactNode {
    if (this.state.name.length === 0) {
      return null;
    }
    const { config } = this.props;
    const { columnProps } = config;
    if (
      typeof columnProps?.renderFormItem === 'function' ||
      typeof columnProps?.fieldProps === 'function' ||
      typeof columnProps?.formItemProps === 'function'
    ) {
      return (
        <Form.Item
          key={config.recordKey || config.index}
          shouldUpdate={(pre, next) => {
            return isDeepEqualReact(get(pre, this.state.rowName), get(next, this.state.rowName));
          }}
          noStyle
        >
          {() => this.generateFormItem()}
        </Form.Item>
      );
    }
    return this.generateFormItem();
  }
}

/**
 * 根据不同的类型来转化数值
 *
 * @param text
 * @param valueType
 */
function cellRenderToFromItem<T>(config: RenderToFromItemProps<T>): React.ReactNode {
  const { text, valueType, rowData, columnProps } = config;

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
    });
  }

  const columnKey = columnProps?.key || columnProps?.dataIndex?.toString();

  /** 生成公用的 proField dom 配置 */
  const proFieldProps: ProFormFieldProps = {
    valueEnum: runFunction<[T | undefined]>(columnProps?.valueEnum, rowData),
    request: columnProps?.request,
    params: runFunction(columnProps?.params, rowData, columnProps),
    readonly: columnProps?.readonly,
    text: valueType === 'index' || valueType === 'indexBorder' ? config.index : text,
    mode: config.mode,
    renderFormItem: undefined,
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
        fieldProps={getFieldPropsOrFormItemProps(columnProps?.fieldProps, null, columnProps)}
        {...proFieldProps}
      />
    );
  }
  return (
    <CellRenderFromItem key={config.recordKey} config={config} proFieldProps={proFieldProps} />
  );
}

export default cellRenderToFromItem;
