/* eslint-disable react/no-array-index-key */
import React, { useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import type { ProFormColumnsType, ProFormProps, StepsFormProps } from '../../index';

import { LabelIconTip, omitUndefined } from '@ant-design/pro-utils';
import { runFunction } from '@ant-design/pro-utils';
import ProForm, { DrawerForm, ModalForm, QueryFilter, LightFilter, StepsForm } from '../../index';
import { renderValueType } from './valueType';
import type { FormSchema, ProFormRenderValueTypeHelpers } from './typing';

export * from './typing';

const FormComments = {
  DrawerForm,
  QueryFilter,
  LightFilter,
  StepForm: StepsForm.StepForm,
  StepsForm,
  ModalForm,
};
const noop: any = () => {};
/**
 * 此组件可以根据 Json Schema 来生成相应的表单,大部分配置与 antd 的 table 列配置相同
 *
 * @see 此组件仍为 beta 版本，api 可能发生变化
 */
function BetaSchemaForm<T, ValueType = 'text'>(props: FormSchema<T, ValueType>) {
  const {
    columns,
    layoutType = 'Form',
    steps = [],
    type = 'form',
    action,
    formRef: propsFormRef,
    ...rest
  } = props;
  const Form = (FormComments[layoutType] || ProForm) as React.FC<ProFormProps<T>>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, forceUpdate] = useState<[]>([]);
  const formRef = useRef<FormInstance | undefined>(props.form);

  const refMap = useMemo(() => {
    const obj = { form: formRef.current };
    Object.defineProperty(obj, 'form', {
      get: () =>
        formRef.current ||
        ({
          getFieldValue: noop,
          getFieldsValue: noop,
          resetFields: noop,
          setFieldsValue: noop,
        } as any),
    });
    return obj;
  }, []);

  useImperativeHandle(propsFormRef, () => refMap.form);

  /**
   * 生成子项，方便被 table 接入
   *
   * @param items
   */
  const genItems: ProFormRenderValueTypeHelpers<T, ValueType>['genItems'] = useCallback(
    (items: ProFormColumnsType<T, ValueType>[]) => {
      return items
        .filter((originItem) => {
          if (originItem.hideInForm && type === 'form') {
            return false;
          }
          return true;
        })
        .sort((a, b) => {
          if (b.order || a.order) {
            return (b.order || 0) - (a.order || 0);
          }
          return (b.index || 0) - (a.index || 0);
        })
        .map((originItem, index) => {
          const title = runFunction(
            originItem.title,
            originItem,
            'form',
            <LabelIconTip
              label={originItem.title}
              tooltip={originItem.tooltip || originItem.tip}
            />,
          );

          const item = omitUndefined({
            title,
            label: title,
            name: originItem.name,
            valueType: runFunction(originItem.valueType, {}),
            key: originItem.key,
            columns: originItem.columns,
            valueEnum: originItem.valueEnum,
            dataIndex: originItem.key || originItem.dataIndex,
            initialValue: originItem.initialValue,
            width: originItem.width,
            index: originItem.index,
            readonly: originItem.readonly,
            colSize: originItem.colSize,
            className: originItem.className,
            tooltip: originItem.tooltip || originItem.tip,
            dependencies: originItem.dependencies,
            proFieldProps: originItem.proFieldProps,
            getFieldProps: originItem.fieldProps
              ? () => runFunction(originItem.fieldProps, refMap.form, originItem)
              : undefined,
            getFormItemProps: originItem.fieldProps
              ? () => runFunction(originItem.formItemProps, refMap.form, originItem)
              : undefined,
            render: originItem.render,
            renderFormItem: originItem.renderFormItem,
            renderText: originItem.renderText,
            request: originItem.request,
            params: originItem.params,
            transform: originItem.transform,
          });

          item.key = item.key || item.dataIndex?.toString() || index;

          return renderValueType(item, {
            action,
            type,
            originItem,
            refMap,
            genItems,
          });
        });
    },
    [action, refMap, type],
  );

  const onCurrentChange: StepsFormProps['onCurrentChange'] = useCallback(
    (current: number) => {
      (rest as StepsFormProps).onCurrentChange?.(current);
      forceUpdate([]);
    },
    [rest],
  );

  const StepsFormDom = useMemo(() => {
    if (layoutType !== 'StepsForm') {
      return;
    }
    return (
      <StepsForm formRef={formRef} {...rest} onCurrentChange={onCurrentChange}>
        {steps?.map((item, index) => (
          <BetaSchemaForm<T, ValueType>
            {...(item as FormSchema<T, ValueType>)}
            key={index}
            layoutType="StepForm"
            columns={columns[index] as ProFormColumnsType<T, ValueType>[]}
          />
        ))}
      </StepsForm>
    );
  }, [columns, layoutType, onCurrentChange, rest, steps]);

  const ItemsDom = useMemo(() => {
    if (layoutType === 'StepsForm') {
      return;
    }
    return genItems(columns as any);
  }, [columns, genItems, layoutType]);

  /** 如果是StepsForm */
  if (layoutType === 'StepsForm') return <>{StepsFormDom}</>;
  /** 如果是行内模式 */
  if (layoutType === 'Embed') return <>{ItemsDom}</>;

  return (
    <Form formRef={formRef} {...rest}>
      {ItemsDom}
    </Form>
  );
}

export default BetaSchemaForm;
