import { omit } from '@rc-component/util';
import type { PopoverProps } from 'antd';
import { Form, type InputProps, Popover } from 'antd';
import type { InputRef, PasswordProps } from 'antd/es/input';
import React, { useState } from 'react';
import { FieldPassword } from '../../../field';
import { ProConfigProvider } from '../../../provider';
import { useMountMergeState } from '../../../utils';
import type { ProFormFieldItemProps } from '../../typing';
import ProField from '../Field';

const valueType = 'text' as const;
/**
 * 文本组件
 *
 * @param
 */
const ProFormText: React.FC<ProFormFieldItemProps<InputProps, InputRef>> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormFieldItemProps<InputProps, InputRef>) => {
  return (
    <ProField
      fieldConfig={
        {
          valueType,
        } as const
      }
      fieldProps={fieldProps}
      proFieldProps={proFieldProps}
      valueType={valueType}
      {...rest}
    />
  );
};

export type PasswordStatus = 'ok' | 'pass' | 'poor' | undefined;

export type PassWordStrengthProps = {
  statusRender?: (value?: string) => React.ReactNode;
  popoverProps?: PopoverProps;
  strengthText?: React.ReactNode;
};

const PassWordStrength: React.FC<
  PassWordStrengthProps & {
    name?: string[];
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
  }
> = (props) => {
  const [open, setOpen] = useMountMergeState<boolean>(props.open || false, {
    value: props.open,
    onChange: props.onOpenChange,
  });
  return (
    <Form.Item noStyle shouldUpdate>
      {(form) => {
        const value = form.getFieldValue(props.name || []) as string;
        return (
          <Popover
            content={
              <div
                style={{
                  padding: '4px 0',
                }}
              >
                {props.statusRender?.(value)}
                {props.strengthText ? (
                  <div
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <span>{props.strengthText}</span>
                  </div>
                ) : null}
              </div>
            }
            getPopupContainer={(node) => {
              if (node && node.parentNode) {
                return node.parentNode as HTMLElement;
              }
              return node;
            }}
            overlayStyle={{
              width: 240,
            }}
            placement="rightTop"
            onOpenChange={(e) => setOpen(e)}
            {...props.popoverProps}
            open={open}
          >
            {props.children}
          </Popover>
        );
      }}
    </Form.Item>
  );
};

const Password: React.FC<ProFormFieldItemProps<PasswordProps & PassWordStrengthProps, InputRef>> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormFieldItemProps<PasswordProps & PassWordStrengthProps, InputRef>) => {
  const [open, setOpen] = useState<boolean>(false);

  if (fieldProps?.statusRender && rest.name) {
    return (
      <ProConfigProvider
        valueTypeMap={{
          password: {
            render: (text, props) => <FieldPassword {...props} text={text} />,
            formItemRender: (text, props) => <FieldPassword {...props} text={text} />,
          },
        }}
      >
        <PassWordStrength
          name={rest.name}
          open={open}
          popoverProps={fieldProps?.popoverProps}
          statusRender={fieldProps?.statusRender}
          strengthText={fieldProps?.strengthText}
          onOpenChange={setOpen}
        >
          <div>
            <ProField
              fieldConfig={
                {
                  valueType,
                } as const
              }
              fieldProps={{
                ...omit(fieldProps, ['statusRender', 'popoverProps', 'strengthText']),
                onBlur: (e: any) => {
                  fieldProps?.onBlur?.(e);
                  setOpen(false);
                },
                onClick: (e: any) => {
                  fieldProps?.onClick?.(e);
                  setOpen(true);
                },
              }}
              proFieldProps={proFieldProps}
              valueType="password"
              {...rest}
            />
          </div>
        </PassWordStrength>
      </ProConfigProvider>
    );
  }

  return (
    <ProConfigProvider
      valueTypeMap={{
        password: {
          render: (text, props) => <FieldPassword {...props} text={text} />,
          formItemRender: (text, props) => <FieldPassword {...props} text={text} />,
        },
      }}
    >
      <ProField
        fieldConfig={
          {
            valueType,
          } as const
        }
        fieldProps={fieldProps}
        proFieldProps={proFieldProps}
        valueType="password"
        {...rest}
      />
    </ProConfigProvider>
  );
};

const WrappedProFormText: typeof ProFormText & {
  Password: typeof Password;
} = ProFormText as any;

WrappedProFormText.Password = Password;

// @ts-ignore

WrappedProFormText.displayName = 'ProFormComponent';

export default WrappedProFormText;
