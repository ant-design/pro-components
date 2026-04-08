import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import React from 'react';
import ProForm, { ProFormField } from '../form';
import { proTheme } from '../provider';
import type { ProCoreActionType, UseEditableMapUtilType } from '../utils';
import type { ProFieldValueTypeInput } from '../utils/typing';
import {
  InlineErrorFormItem,
  getFieldPropsOrFormItemProps,
} from '../utils';
import type { ProDescriptionsItemProps } from './typing';

/**
 * Descriptions 单列：只读 / 可编辑下的 ProFormField 渲染
 */
export const FieldRender: React.FC<
  Omit<ProDescriptionsItemProps<any>, 'valueType'> & {
    text: any;
    valueType: ProFieldValueTypeInput;
    entity: any;
    action: ProCoreActionType<any>;
    index: number;
    editableUtils?: UseEditableMapUtilType;
    emptyText?: React.ReactNode;
  }
> = (props) => {
  const {
    valueEnum,
    action,
    index,
    text,
    entity,
    mode,
    render,
    editableUtils,
    valueType,
    plain,
    dataIndex,
    request,
    formItemRender,
    params,
    emptyText,
  } = props;
  const form = ProForm.useFormInstance();

  const { token } = proTheme.useToken?.();

  const fieldConfig = {
    text,
    valueEnum,
    mode: mode || 'read',
    proFieldProps: {
      emptyText,
      render: render
        ? (finText: string) => {
            return render?.(finText, entity, index, action, {
              ...props,
              type: 'descriptions',
            });
          }
        : undefined,
    },
    ignoreFormItem: true,
    valueType,
    request,
    params,
    plain,
  };

  if (mode === 'read' || !mode || valueType === 'option') {
    const fieldProps = getFieldPropsOrFormItemProps(
      props.fieldProps,
      undefined,
      {
        ...props,
        rowKey: dataIndex,
        isEditable: false,
      },
    );
    return (
      <ProFormField name={dataIndex} {...fieldConfig} fieldProps={fieldProps} />
    );
  }

  const renderDom = () => {
    const formItemProps = getFieldPropsOrFormItemProps(
      props.formItemProps,
      form as FormInstance<any>,
      {
        ...props,
        rowKey: dataIndex,
        isEditable: true,
      },
    );
    const fieldProps = getFieldPropsOrFormItemProps(
      props.fieldProps,
      form as FormInstance<any>,
      {
        ...props,
        rowKey: dataIndex,
        isEditable: true,
      },
    );

    return (
      <div
        style={{ display: 'flex', gap: token.marginXS, alignItems: 'baseline' }}
      >
        <InlineErrorFormItem
          name={dataIndex}
          {...formItemProps}
          style={{
            margin: 0,
            ...(formItemProps?.style || {}),
          }}
          initialValue={text || formItemProps?.initialValue}
        >
          <ProFormField
            {...fieldConfig}
            proFieldProps={{ ...fieldConfig.proFieldProps }}
            formItemRender={
              formItemRender
                ? () =>
                    formItemRender?.(
                      {
                        ...props,
                        type: 'descriptions',
                      },
                      {
                        isEditable: true,
                        recordKey: dataIndex as React.Key,
                        record: form.getFieldValue(
                          [dataIndex].flat(1) as (string | number)[],
                        ),
                        defaultRender: () => (
                          <ProFormField
                            {...fieldConfig}
                            fieldProps={fieldProps}
                          />
                        ),
                        type: 'descriptions',
                      },
                      form as FormInstance<any>,
                    )
                : undefined
            }
            fieldProps={fieldProps}
          />
        </InlineErrorFormItem>
        <div
          style={{
            display: 'flex',
            maxHeight: token.controlHeight,
            alignItems: 'center',
            gap: token.marginXS,
          }}
        >
          {editableUtils?.actionRender?.((dataIndex as React.Key) || index, {
            cancelText: <CloseOutlined />,
            saveText: <CheckOutlined />,
            deleteText: false,
          })}
        </div>
      </div>
    ) as React.ReactNode;
  };

  return (
    <div
      style={{
        marginTop: -5,
        marginBottom: -5,
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
      }}
    >
      {renderDom()}
    </div>
  );
};
