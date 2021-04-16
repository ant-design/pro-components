import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { FormInstance, FormProps } from 'antd';
import type { DrawerFormProps, QueryFilterProps, ProFormProps, StepFormProps } from '../../index';
import { ProFormFieldSet } from '../../index';
import { ProFormGroup, ProFormField } from '../../index';
import type {
  ProCoreActionType,
  ProSchema,
  ProSchemaComponentTypes,
  SearchTransformKeyFn,
} from '@ant-design/pro-utils';
import { omitUndefined } from '@ant-design/pro-utils';
import { runFunction } from '@ant-design/pro-utils';
import omit from 'omit.js';
import ProForm, { DrawerForm, ModalForm, QueryFilter, LightFilter, StepsForm } from '../../index';
import type { ProFormFieldProps } from '../Field';
import ProFormList from '../List';
import type { NamePath } from 'antd/lib/form/interface';

export type ExtraProColumnType = {
  tooltip?: React.ReactNode;
  key?: React.Key;
  className?: string;
  /**
   * @type auto 使用组件默认的宽度
   * @type xs=104px 适用于短数字、短文本或选项。
   * @type sm=216px 适用于较短字段录入、如姓名、电话、ID 等。
   * @type md=328px 标准宽度，适用于大部分字段长度。
   * @type lg=440px 适用于较长字段录入，如长网址、标签组、文件路径等。
   * @type xl=552px 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
   */
  width?: string | number;

  name?: NamePath;
};

/** ProForm 的特色 layout */
export type ProFormLayoutType =
  | 'Form'
  | 'ModalForm'
  | 'DrawerForm'
  | 'StepsForm'
  | 'LightFilter'
  | 'QueryFilter';

/** ProForm 支持的相关类型 */
export type ProFormPropsType<T> = Omit<DrawerFormProps<T>, 'onFinish'> &
  Omit<QueryFilterProps<T>, 'onFinish'> &
  ProFormProps<T> &
  Omit<StepFormProps<T>, 'onFinish'> & {
    layoutType?: ProFormLayoutType;
  };

export type FormFieldType = 'group' | 'formList' | 'formSet';

export type ProFormColumnsType<T = any, ValueType = 'text'> = ProSchema<
  T,
  ExtraProColumnType & {
    index?: number;
    /**
     * 每个表单占据的格子大小
     *
     * @param 总宽度 = span* colSize
     * @param 默认为 1
     */
    colSize?: number;
    /** 是否只读模式 */
    readonly?: boolean;
    /** 搜索表单的默认值 */
    initialValue?: any;
    /** 转化数据 */
    transform?: SearchTransformKeyFn;
    /** Form 的排序 */
    order?: number;
    /** 嵌套子项 */
    columns?: ProFormColumnsType<T, ValueType | FormFieldType>[];
  },
  ProSchemaComponentTypes,
  ValueType | FormFieldType
>;

export type FormSchema<T = Record<string, any>, ValueType = 'text'> = {
  title?: React.ReactNode | ((type: string) => React.ReactNode);
  description?: React.ReactNode;
  columns: ProFormColumnsType<T, ValueType>[];
  type?: any;
  action?: React.MutableRefObject<ProCoreActionType | undefined>;
} & Omit<FormProps<T>, 'onFinish'> &
  ProFormPropsType<T>;

const FormComments = {
  DrawerForm,
  QueryFilter,
  LightFilter,
  StepsForm,
  ModalForm,
};

/**
 * 此组件可以根据 Json Schema 来生成相应的表单,大部分配置与 antd 的 table 列配置相同
 *
 * @see 此组件仍为 beta 版本，api 可能发生变化
 */
function BetaSchemaForm<T, ValueType = 'text'>(props: FormSchema<T, ValueType>) {
  const { columns, layoutType = 'ProForm', type = 'form', action, ...rest } = props;
  const Form = (FormComments[layoutType] || ProForm) as React.FC<ProFormProps<T>>;
  const [form] = ProForm.useForm();
  const formRef = useRef<FormInstance>(form);
  const [updateTime, updateFormRender] = useState(0);

  /**
   * 生成子项，方便被 table 接入
   *
   * @param items
   */
  const genItems = useCallback(
    (items: FormSchema<T, ValueType>['columns'], update?: number) =>
      items
        .sort((a, b) => {
          if (b.order || a.order) {
            return (b.order || 0) - (a.order || 0);
          }
          return (b.index || 0) - (a.index || 0);
        })
        .map((newItem, index) => {
          const title = runFunction(newItem.title, 'form');
          const item = omitUndefined({
            name: newItem.name,
            valueType: runFunction(newItem.valueType, {}),
            key: newItem.key,
            columns: newItem.columns,
            fieldProps: runFunction(newItem.fieldProps, formRef.current, newItem),
            valueEnum: newItem.valueEnum,
            dataIndex: newItem.key || newItem.dataIndex,
            initialValue: newItem.initialValue,
            formItemProps: runFunction(newItem.formItemProps, formRef.current, newItem),
            width: newItem.width,
            render: newItem.render,
            renderFormItem: newItem.renderFormItem,
            index: newItem.index,
            readonly: newItem.readonly,
            transform: newItem.transform,
            colSize: newItem.colSize,
            className: newItem.className,
            renderText: newItem.renderText,
            request: newItem.request,
            params: newItem.params,
            tooltip: newItem.tooltip || newItem.tip,
            title,
          });
          // 几种特殊的 value 不处理
          if (
            item.valueType &&
            typeof item.valueType === 'string' &&
            ['index', 'indexBorder', 'option'].includes(item.valueType)
          ) {
            return null;
          }
          const key = item.key || item.dataIndex?.toString() || index;

          if (item.valueType === 'group') {
            if (!item.columns) return null;
            return (
              <ProFormGroup key={key} label={item.title} {...item.fieldProps}>
                {genItems(item.columns)}
              </ProFormGroup>
            );
          }

          if (item.valueType === 'formList' && item.dataIndex) {
            if (!item.columns) return null;
            return (
              <ProFormList
                key={key}
                name={item.dataIndex}
                label={item.title}
                initialValue={item.initialValue}
                {...item.fieldProps}
              >
                {genItems(item.columns)}
              </ProFormList>
            );
          }

          if (item.valueType === 'formSet' && item.dataIndex) {
            if (!item.columns) return null;
            return (
              <ProFormFieldSet
                {...item.formItemProps}
                key={key}
                initialValue={item.initialValue}
                name={item.dataIndex}
                label={item.title}
                {...item.fieldProps}
              >
                {genItems(item.columns, update)}
              </ProFormFieldSet>
            );
          }
          /** 公用的 类型 props */
          const formFieldProps: ProFormFieldProps = {
            key,
            name: item.dataIndex,
            label: item.title,
            ...omit(item, [
              'dataIndex',
              'width',
              'render',
              'renderFormItem',
              'renderText',
              'title',
            ]),
            width: item.width as 'md',
            formItemProps: item.formItemProps,
            fieldProps: item.fieldProps,
            render: item?.render
              ? (dom, entity, renderIndex) =>
                  item?.render?.(dom, entity, renderIndex, action?.current, {
                    type,
                    ...item,
                  })
              : undefined,
          };
          const defaultRender = () => {
            return <ProFormField {...formFieldProps} />;
          };

          if (item?.renderFormItem) {
            const formDom = item?.renderFormItem?.(
              {
                type,
                ...item,
              },
              {
                ...item,
                defaultRender,
                type,
              },
              formRef.current,
            );
            if (formDom === false || formDom === undefined || formDom === null) {
              return null;
            }
          }
          return (
            <ProFormField
              {...formFieldProps}
              // eslint-disable-next-line react/no-array-index-key
              key={`${key}-${index}`}
              transform={item.transform}
              renderFormItem={
                item?.renderFormItem
                  ? (_, config) =>
                      item?.renderFormItem?.(
                        {
                          type,
                          ...item,
                        },
                        {
                          ...config,
                          defaultRender,
                          type,
                        },
                        formRef.current,
                      )
                  : undefined
              }
            />
          );
        }),
    [action, type],
  );

  const needRealUpdate = useMemo(() => {
    return columns.some(
      (item) =>
        item.renderFormItem ||
        typeof item.fieldProps === 'function' ||
        typeof item.formItemProps === 'function',
    );
  }, [columns]);

  const domList = useMemo(() => {
    return genItems(columns, updateTime);
  }, [columns, genItems, updateTime]);

  return (
    <Form
      formRef={formRef}
      form={form}
      {...rest}
      onInit={(...restValue) => {
        if (needRealUpdate) {
          updateFormRender(updateTime + 1);
        }
        rest?.onInit?.(...restValue);
      }}
      onValuesChange={(...restValue) => {
        if (needRealUpdate) {
          updateFormRender(updateTime + 1);
        }
        rest?.onValuesChange?.(...restValue);
      }}
    >
      {domList}
    </Form>
  );
}

export default BetaSchemaForm;
