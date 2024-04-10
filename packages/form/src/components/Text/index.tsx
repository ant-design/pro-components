import { useMountMergeState } from '@ant-design/pro-utils';
import { Form, Popover, PopoverProps, type InputProps } from 'antd';
import type { InputRef, PasswordProps } from 'antd/lib/input';
import omit from 'omit.js';
import React, { useState } from 'react';
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
      valueType={valueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType,
        } as const
      }
      proFieldProps={proFieldProps}
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
    <Form.Item shouldUpdate noStyle>
      {(form) => {
        const value = form.getFieldValue(props.name || []) as string;
        return (
          <Popover
            getPopupContainer={(node) => {
              if (node && node.parentNode) {
                return node.parentNode as HTMLElement;
              }
              return node;
            }}
            onOpenChange={(e) => setOpen(e)}
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
            overlayStyle={{
              width: 240,
            }}
            placement="rightTop"
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

const Password: React.FC<
  ProFormFieldItemProps<PasswordProps & PassWordStrengthProps, InputRef>
> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormFieldItemProps<PasswordProps & PassWordStrengthProps, InputRef>) => {
  const [open, setOpen] = useState<boolean>(false);

  if (fieldProps?.statusRender && rest.name) {
    return (
      <PassWordStrength
        name={rest.name}
        statusRender={fieldProps?.statusRender}
        popoverProps={fieldProps?.popoverProps}
        strengthText={fieldProps?.strengthText}
        open={open}
        onOpenChange={setOpen}
      >
        <div>
          <ProField
            valueType="password"
            fieldProps={{
              ...omit(fieldProps, [
                'statusRender',
                'popoverProps',
                'strengthText',
              ]),
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
            filedConfig={
              {
                valueType,
              } as const
            }
            {...rest}
          />
        </div>
      </PassWordStrength>
    );
  }

  return (
    <ProField
      valueType="password"
      fieldProps={fieldProps}
      proFieldProps={proFieldProps}
      filedConfig={
        {
          valueType,
        } as const
      }
      {...rest}
    />
  );
};

const WrappedProFormText: typeof ProFormText & {
  Password: typeof Password;
} = ProFormText as any;

WrappedProFormText.Password = Password;

// @ts-ignore
// eslint-disable-next-line no-param-reassign
WrappedProFormText.displayName = 'ProFormComponent';

export default WrappedProFormText;
