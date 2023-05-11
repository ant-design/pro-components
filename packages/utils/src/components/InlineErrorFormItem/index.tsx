import { LoadingOutlined } from '@ant-design/icons';
import { openVisibleCompatible } from '../../compareVersions/openVisibleCompatible';
import type { FormItemProps, PopoverProps } from 'antd';
import { ConfigProvider, Form, Popover } from 'antd';
import type { NamePath } from 'rc-field-form/lib/interface';
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

  const { wrapSSR, hashId } = useStyle(`${prefixCls}-form-item-with-help`);

  useEffect(() => {
    if (inputProps.validateStatus !== 'validating') {
      setErrorList(inputProps.errors);
    }
  }, [inputProps.errors, inputProps.validateStatus]);

  const popoverOpenProps = openVisibleCompatible(
    errorStringList.length < 1 ? false : open,
    (changeOpen: boolean) => {
      if (changeOpen === open) return;
      setOpen(changeOpen);
    },
  );

  const loading = inputProps.validateStatus === 'validating';

  return (
    <Popover
      key="popover"
      trigger={popoverProps?.trigger || 'focus'}
      placement={popoverProps?.placement || 'topRight'}
      {...popoverOpenProps}
      getPopupContainer={popoverProps?.getPopupContainer}
      getTooltipContainer={popoverProps?.getTooltipContainer}
      content={wrapSSR(
        <div className={`${prefixCls}-form-item-with-help ${hashId}`}>
          {loading ? <LoadingOutlined /> : null}
          {errorList}
        </div>,
      )}
      {...popoverProps}
    >
      <div>
        {input}
        {extra}
      </div>
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
      preserve={false}
      name={name}
      rules={rules}
      hasFeedback={false}
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
      {...rest}
      style={{ ...FIX_INLINE_STYLE, ...rest.style }}
      name={name}
    >
      {children}
    </Form.Item>
  );
};
