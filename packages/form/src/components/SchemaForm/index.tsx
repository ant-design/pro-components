/* eslint-disable react/no-array-index-key */
import React, { useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type { FormInstance, FormProps } from 'antd';

import {
  LabelIconTip,
  omitUndefined,
  useLatest,
  runFunction,
  convertInitialValue,
} from '@ant-design/pro-utils';
import { renderValueType } from './valueType';
import type { FormSchema, ProFormColumnsType, ProFormRenderValueTypeHelpers } from './typing';
import omit from 'omit.js';
import type { ProFormProps, StepsFormProps } from '../../layouts';
import { DrawerForm } from '../../layouts/DrawerForm';
import { QueryFilter } from '../../layouts/QueryFilter';
import { LightFilter } from '../../layouts/LightFilter';
import { StepsForm } from '../../layouts/StepsForm';
import { ModalForm } from '../../layouts/ModalForm';
import { ProForm } from '../../layouts/ProForm';

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
  const { columns, layoutType = 'Form', steps = [], type = 'form', action, ...restProps } = props;

  const Form = (FormComments[layoutType] || ProForm) as React.FC<ProFormProps<T>>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, forceUpdate] = useState<[]>([]);
  const [columnsChange, forceUpdateColumns] = useState<[]>([]);

  const propsRef = useLatest(props);

  const formRef = useRef<FormInstance | undefined>(props.form);
  const oldValuesRef = useRef<T>();

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

  useImperativeHandle((restProps as ProFormProps<T>).formRef, () => refMap.form);

  const rest = useMemo(() => {
    return omit(restProps, ['shouldUpdate', 'formRef'] as any);
  }, [restProps]);

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
          // 如果指定了 dateFormatter 并且传入的 initialValue 是合法的日期。则也对 initialValue 进行转换
          let initialValue = originItem.initialValue;
          initialValue = convertInitialValue(
            initialValue,
            props.dateFormatter || false,
            (originItem.valueType as string) || 'text',
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
            initialValue,
            width: originItem.width,
            index: originItem.index,
            readonly: originItem.readonly,
            colSize: originItem.colSize,
            className: originItem.className,
            tooltip: originItem.tooltip || originItem.tip,
            dependencies: originItem.dependencies,
            proFieldProps: originItem.proFieldProps,
            fieldProps: originItem.fieldProps
              ? runFunction(originItem.fieldProps, refMap.form, originItem)
              : undefined,
            formItemProps: originItem.formItemProps
              ? runFunction(originItem.formItemProps, refMap.form, originItem)
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
        })
        .filter((field) => {
          return Boolean(field);
        });
    },
    [action, props.dateFormatter, refMap, type],
  );

  /**
   * fixed StepsForm toggle step causing formRef to update
   */
  const onCurrentChange: StepsFormProps<T>['onCurrentChange'] = useCallback(
    (current: number) => {
      (propsRef.current as StepsFormProps<T>).onCurrentChange?.(current);
      forceUpdate([]);
    },
    [propsRef],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, genItems, layoutType, columnsChange]);

  const onValuesChange: FormProps<T>['onValuesChange'] = useCallback(
    (changedValues, values) => {
      const { shouldUpdate = true, onValuesChange: propsOnValuesChange } = propsRef.current;
      if (
        shouldUpdate === true ||
        (typeof shouldUpdate === 'function' && shouldUpdate(values, oldValuesRef.current))
      ) {
        forceUpdateColumns([]);
      }
      oldValuesRef.current = values;
      propsOnValuesChange?.(changedValues, values);
    },
    [propsRef],
  );

  /** 如果是StepsForm */
  if (layoutType === 'StepsForm') return <>{StepsFormDom}</>;
  /** 如果是行内模式 */
  if (layoutType === 'Embed') return <>{ItemsDom}</>;

  return (
    <Form onValuesChange={onValuesChange} formRef={formRef} {...rest}>
      {ItemsDom}
    </Form>
  );
}

export default BetaSchemaForm;
