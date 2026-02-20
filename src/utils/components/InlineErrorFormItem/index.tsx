import { LoadingOutlined } from '@ant-design/icons';
import type { NamePath } from '@rc-component/form/es/interface';
import { get } from '@rc-component/util';
import type { FormItemProps, PopoverProps } from 'antd';
import { ConfigProvider, Form, Popover, theme } from 'antd';
import { clsx } from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import { useStyle } from './style';

interface InlineErrorFormItemProps extends FormItemProps {
  errorType?: 'popover' | 'default';
  popoverProps?: PopoverProps;
  children: any;
}

interface InternalProps extends InlineErrorFormItemProps {
  name: NamePath;
  rules: FormItemProps['rules'];
  children: any;
}

const FIX_INLINE_STYLE = {
  marginBlockStart: -5,
  marginBlockEnd: -5,
  marginInlineStart: 0,
  marginInlineEnd: 0,
};

const InlineErrorFormItemPopover: React.FC<{
  inputProps: any;
  input: JSX.Element;
  errorList: JSX.Element;
  extra: JSX.Element;
  popoverProps?: PopoverProps;
}> = ({ inputProps, input, extra, errorList, popoverProps }) => {
  const [open, setOpen] = useState<boolean | undefined>(false);
  const [errorStringList, setErrorList] = useState<string[]>([]);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls();

  const token = theme.useToken();
  const { wrapSSR, hashId } = useStyle(`${prefixCls}-form-item-with-help`);
  useEffect(() => {
    if (inputProps.validateStatus !== 'validating') {
      setErrorList(inputProps.errors);
    }
  }, [inputProps.errors, inputProps.validateStatus]);

  const loading = inputProps.validateStatus === 'validating';

  return (
    <Popover
      key="popover"
      open={errorStringList.length < 1 ? false : open}
      onOpenChange={(changeOpen: boolean) => {
        if (changeOpen === open) return;
        setOpen(changeOpen);
      }}
      trigger={popoverProps?.trigger || ['click']}
      placement={popoverProps?.placement || 'topLeft'}
      getPopupContainer={popoverProps?.getPopupContainer}
      getTooltipContainer={popoverProps?.getTooltipContainer}
      content={wrapSSR(
        <div
          className={clsx(
            `${prefixCls}-form-item`,
            hashId,
            token.hashId,
          )}
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          <div
            className={clsx(
              `${prefixCls}-form-item-with-help`,
              hashId,
              token.hashId,
            )}
          >
            {loading ? <LoadingOutlined /> : null}
            {errorList}
          </div>
        </div>,
      )}
      {...popoverProps}
    >
      <>
        {input}
        {extra}
      </>
    </Popover>
  );
};

const InternalFormItemFunction: React.FC<InternalProps & FormItemProps> = ({
  rules,
  name,
  children,
  popoverProps,
  ...rest
}) => {
  return (
    <Form.Item
      name={name}
      rules={rules}
      hasFeedback={false}
      shouldUpdate={(prev, next) => {
        if (prev === next) return false;
        const shouldName = [name].flat(1);
        if (shouldName.length > 1) {
          shouldName.pop();
        }
        try {
          return (
            JSON.stringify(get(prev, shouldName)) !==
            JSON.stringify(get(next, shouldName))
          );
        } catch (error) {
          return true;
        }
      }}
      // @ts-ignore
      _internalItemRender={{
        mark: 'pro_table_render',
        render: (
          inputProps: FormItemProps & {
            errors: any[];
          },
          doms: {
            input: JSX.Element;
            errorList: JSX.Element;
            extra: JSX.Element;
          },
        ) => (
          <InlineErrorFormItemPopover
            inputProps={inputProps}
            popoverProps={popoverProps}
            {...doms}
          />
        ),
      }}
      {...rest}
      style={{
        ...FIX_INLINE_STYLE,
        ...rest?.style,
      }}
    >
      {children}
    </Form.Item>
  );
};

export const InlineErrorFormItem = (props: InlineErrorFormItemProps) => {
  const { errorType, rules, name, popoverProps, children, ...rest } = props;

  if (name && rules?.length && errorType === 'popover') {
    return (
      <InternalFormItemFunction
        name={name}
        rules={rules!}
        popoverProps={popoverProps}
        {...rest}
      >
        {children}
      </InternalFormItemFunction>
    );
  }
  return (
    <Form.Item
      rules={rules}
      shouldUpdate={
        name
          ? (prev, next) => {
              if (prev === next) return false;
              const shouldName = [name].flat(1);
              if (shouldName.length > 1) {
                shouldName.pop();
              }
              try {
                return (
                  JSON.stringify(get(prev, shouldName)) !==
                  JSON.stringify(get(next, shouldName))
                );
              } catch (error) {
                return true;
              }
            }
          : undefined
      }
      {...rest}
      style={{ ...FIX_INLINE_STYLE, ...rest.style }}
      name={name}
    >
      {children}
    </Form.Item>
  );
};
