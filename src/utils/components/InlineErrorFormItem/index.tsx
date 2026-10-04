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

/**
 * 生成 Form.Item 的 shouldUpdate 函数，用于精确控制字段级更新。
 * 提取为共享函数，避免 InternalFormItemFunction 和默认分支重复定义。
 */
const createShouldUpdate = (name: NamePath) => {
  return (prev: any, next: any) => {
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
    } catch (_error) {
      return true;
    }
  };
};

/**
 * 读取 Form.Item 校验状态并渲染 Popover 错误层。
 *
 * antd 6 通过 FormItemInputContext 把 { status, errors, warnings } 注入到
 * Form.Item 的 children 树（`Form.Item.useStatus` 的数据源），
 * 这里借助该公开 API 获取校验消息，替代旧版 `_internalItemRender` 私有渲染
 * （#9709/#8942/#9066/#9153）：私有渲染会整体跳过 additionalDom
 * （错误提示 + extra + minHeight 占位），导致高度抖动、错误丢失。
 */
const InlineErrorFormItemPopover: React.FC<{
  popoverProps?: PopoverProps;
  input: React.ReactNode;
}> = ({ popoverProps, input }) => {
  const { status, errors = [], warnings = [] } = Form.Item.useStatus();
  const [open, setOpen] = useState<boolean | undefined>(false);
  // 校验中保持上一次的消息，避免 loading 抖动
  const [messages, setMessages] = useState<{
    errors: React.ReactNode[];
    warnings: React.ReactNode[];
  }>({ errors: [], warnings: [] });
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls();

  const token = theme.useToken();
  const { wrapSSR, hashId } = useStyle(`${prefixCls}-form-item-with-help`);
  useEffect(() => {
    if (status !== 'validating') {
      setMessages({ errors, warnings });
    }
  }, [status, errors, warnings]);

  const loading = status === 'validating';
  const displayedMessages = loading ? messages : { errors, warnings };
  const hasMessages =
    (displayedMessages.errors?.length ?? 0) +
      (displayedMessages.warnings?.length ?? 0) >=
    1;

  // 错误消失时重置 open 状态，确保下次错误能正常弹出
  const prevHasMessages = React.useRef(false);
  useEffect(() => {
    if (!hasMessages && prevHasMessages.current) {
      setOpen(false);
    }
    prevHasMessages.current = hasMessages;
  }, [hasMessages]);

  const renderMessageContent = () => (
    <>
      {displayedMessages.errors?.map((error, index) => (
        <div
          key={`error-${index}`}
          className={clsx(`${prefixCls}-form-item-explain-error`, hashId)}
        >
          {error}
        </div>
      ))}
      {displayedMessages.warnings?.map((warning, index) => (
        <div
          key={`warning-${index}`}
          className={clsx(`${prefixCls}-form-item-explain-warning`, hashId)}
        >
          {warning}
        </div>
      ))}
    </>
  );

  // 无错误时禁用 Popover，避免空内容弹出
  if (!hasMessages) {
    return <>{input}</>;
  }

  // 只有自定义组件（非原生 DOM 元素）才需要包装，确保 rc-trigger 事件正确注入
  const shouldWrap = React.isValidElement(input) && typeof input.type !== 'string';

  return (
    <>
      {/* 不能把 Fragment 作为 Popover 的直接 child：rc-trigger 会向 child 注入
          onKeyDown 等事件，Fragment 无法承接，触发
          "Invalid prop `onKeyDown` supplied to `React.Fragment`"（#9153）。
          这里以 input 本体作为 trigger。 */}
      <Popover
        key="popover"
        defaultOpen={true}
        trigger={popoverProps?.trigger || ['hover']}
        placement={popoverProps?.placement || 'topLeft'}
        getPopupContainer={popoverProps?.getPopupContainer}
        getTooltipContainer={popoverProps?.getTooltipContainer}
        content={wrapSSR(
          <div
            className={clsx(`${prefixCls}-form-item`, hashId, token.hashId)}
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
              {renderMessageContent()}
            </div>
          </div>,
        )}
        {...popoverProps}
      >
        {shouldWrap ? (
          <span style={{ display: 'inline-block', width: '100%' }}>{input}</span>
        ) : (
          input
        )}
      </Popover>
    </>
  );
};

/**
 * Form.Item 的 children 壳层：接收 Form.Item cloneElement 注入的控制属性
 * （value/onChange/id/ref 等）透传给真正的字段组件，
 * 同时在校验子树内通过 Form.Item.useStatus 读取消息驱动 Popover。
 * extra 由 Form.Item 原生 additionalDom 渲染，无需在此处理。
 */
const InlineErrorPopoverShell = React.forwardRef<
  any,
  {
    popoverProps?: PopoverProps;
    children?: React.ReactNode;
  } & Record<string, any>
>(({ popoverProps, children, ...controlProps }, ref) => {
  const fieldChild = React.isValidElement(children)
    ? React.cloneElement(children, {
        ...controlProps,
        ...(ref ? { ref } : {}),
      } as any)
    : children;

  return (
    <InlineErrorFormItemPopover popoverProps={popoverProps} input={fieldChild} />
  );
});
InlineErrorPopoverShell.displayName = 'InlineErrorPopoverShell';

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
      // help="" 占位：popover 模式下原生 explain 只渲染空内容，错误由气泡接管；
      // 同时 additionalDom 常驻，校验出现/消失时高度稳定（#9709/#8942）
      help=""
      shouldUpdate={createShouldUpdate(name)}
      {...rest}
      style={{
        ...FIX_INLINE_STYLE,
        ...rest?.style,
      }}
    >
      <InlineErrorPopoverShell popoverProps={popoverProps}>
        {children}
      </InlineErrorPopoverShell>
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
      shouldUpdate={name ? createShouldUpdate(name) : undefined}
      {...rest}
      style={{ ...FIX_INLINE_STYLE, ...rest.style }}
      name={name}
    >
      {children}
    </Form.Item>
  );
};
