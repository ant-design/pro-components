import React, { useRef } from 'react';
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
import { runFunction } from '@ant-design/pro-utils';
import omit from 'omit.js';
import ProForm, { DrawerForm, QueryFilter, LightFilter, StepsForm } from '../../index';
import { useForm } from 'antd/lib/form/Form';
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
export type LayoutType =
  | 'ProForm'
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
    layoutType?: LayoutType;
  };

export type FormFieldType = 'group' | 'formList' | 'formSet';

export type ProfFormColumnsType<T = any, ValueType = FormFieldType> = ProSchema<
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
    columns?: ProfFormColumnsType<T, ValueType>[];
  },
  ProSchemaComponentTypes,
  ValueType
>;

export type FormSchema<T = Record<string, any>> = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  columns: ProfFormColumnsType<T>[];
  action?: ProCoreActionType;
} & Omit<FormProps<T>, 'onFinish'> &
  ProFormPropsType<T>;

const FormComments = {
  DrawerForm,
  QueryFilter,
  LightFilter,
  StepsForm,
};

function SchemaForm<T>(props: FormSchema<T>) {
  const { columns, layoutType = 'ProForm', action, ...rest } = props;
  const Form = (FormComments[layoutType] || ProForm) as React.FC<ProFormProps<T>>;
  const [form] = useForm();
  const formRef = useRef<FormInstance>(form);

  /**
   * 生成子项，方便被 table 接入
   *
   * @param items
   */
  const genItems = (items: FormSchema<T>['columns']) =>
    items.map((item, index) => {
      // 几种特殊的 value 不处理
      if (
        item.valueType &&
        typeof item.valueType === 'string' &&
        ['index', 'indexBorder', 'options'].includes(item.valueType)
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
            {genItems(item.columns)}
          </ProFormFieldSet>
        );
      }
      /** 公用的 类型 props */
      const formFieldProps: ProFormFieldProps = {
        key,
        name: item.dataIndex,
        label: item.title,
        ...omit(item, ['dataIndex', 'width', 'render', 'renderFormItem']),
        width: item.width as 'lg',
        formItemProps: runFunction(item.formItemProps, formRef.current, item),
        fieldProps: runFunction(item.fieldProps, formRef.current, item),
        render: item?.render
          ? (dom, entity, renderIndex) =>
              item?.render?.(dom, entity, renderIndex, action, {
                type: 'form',
                ...item,
              })
          : undefined,
      };
      return (
        <ProFormField
          {...formFieldProps}
          renderFormItem={
            item?.renderFormItem
              ? (_, config) => {
                  const defaultRender = () => {
                    return <ProFormField {...formFieldProps} />;
                  };
                  return item?.renderFormItem?.(
                    {
                      type: 'form',
                      ...item,
                    },
                    {
                      ...config,
                      defaultRender,
                      type: 'form',
                    },
                    formRef.current,
                  );
                }
              : undefined
          }
        />
      );
    });

  return (
    <Form formRef={formRef} {...rest}>
      {genItems(columns)}
    </Form>
  );
}

export default SchemaForm;
