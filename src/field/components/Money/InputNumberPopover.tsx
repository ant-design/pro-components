import { useControlledState } from '@rc-component/util';
import type { InputNumberProps } from 'antd';
import { InputNumber, Popover } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export type InputNumberPopoverProps = InputNumberProps & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentRender?: (props: InputNumberProps) => React.ReactNode;
  numberFormatOptions?: any;
  numberPopoverRender?: any;
};

const InputNumberPopover = React.forwardRef<any, InputNumberPopoverProps>(
  function InputNumberPopoverInner(
    {
      contentRender: content,
      numberFormatOptions,
      numberPopoverRender,
      open,
      onOpenChange,
      ...rest
    },
    ref,
  ) {
    const [value, setValueInner] = useControlledState<any>(
      () => rest.defaultValue,
      rest.value,
    );

    // 使用本地状态管理 Popover 显示，同时支持受控模式
    const [localOpen, setLocalOpen] = useState(open ?? false);

    // 跟踪组件挂载状态，防止在卸载后执行状态更新
    const mountedRef = useRef(true);
    useEffect(() => {
      mountedRef.current = true;
      return () => {
        mountedRef.current = false;
      };
    }, []);

    // 同步外部 open 属性到本地状态，支持受控模式
    useEffect(() => {
      if (open !== undefined) {
        setLocalOpen(open);
      }
    }, [open]);

    const onChange = useCallback(
      (updater: any | ((prev: any) => any)) => {
        setValueInner((prev: any) => {
          const next =
            typeof updater === 'function'
              ? (updater as (p: any) => any)(prev)
              : updater;
          rest.onChange?.(next);
          return next;
        });
      },
      [rest.onChange, setValueInner],
    );

    // 优化的 onOpenChange 处理器
    const handleOpenChange = useCallback(
      (visible: boolean) => {
        // 通知父组件状态变化
        onOpenChange?.(visible);

        // 如果是受控模式（传入了 open prop），不更新本地状态
        if (open === undefined) {
          // 使用 queueMicrotask 延迟状态更新，避免在渲染期间触发 flushSync
          queueMicrotask(() => {
            // 检查组件是否仍然挂载，避免在卸载后更新状态
            if (mountedRef.current) {
              setLocalOpen(visible);
            }
          });
        }
      },
      [open, onOpenChange],
    );

    /**
     * 如果content 存在要根据 content 渲染一下
     */
    const dom = content?.({
      ...rest,
      value,
    });

    // 没有 dom 时不显示 Popover
    if (!dom) {
      return (
        <InputNumber ref={ref} {...rest} value={value} onChange={onChange} />
      );
    }

    return (
      <Popover
        placement="topLeft"
        open={localOpen}
        onOpenChange={handleOpenChange}
        trigger={['focus', 'click']}
        content={dom}
        getPopupContainer={(triggerNode) => {
          return triggerNode?.parentElement || document.body;
        }}
      >
        <InputNumber ref={ref} {...rest} value={value} onChange={onChange} />
      </Popover>
    );
  },
) as React.ForwardRefExoticComponent<
  InputNumberPopoverProps & React.RefAttributes<any>
>;
export default InputNumberPopover;
