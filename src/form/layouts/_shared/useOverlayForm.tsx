import { merge, useControlledState } from '@rc-component/util';
import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useRefFunction } from '../../../utils';
import type { CommonFormProps, ProFormInstance } from '../../BaseForm';
import type { SubmitterProps } from '../../BaseForm/Submitter';

export type OverlayFormSearchConfig = {
  submitText: string;
  resetText: string;
};

export type UseOverlayFormOptions<T> = {
  /** 受控 open 值（来自 props） */
  propsOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** 内部 formRef（由 hook 创建并管理） */
  formRef: React.MutableRefObject<ProFormInstance | undefined>;
  /** 用户从外部传入的 formRef（用于 useImperativeHandle 暴露） */
  propsFormRef?: React.MutableRefObject<any> | React.RefObject<any>;
  /** 是否在关闭时销毁并重置表单 */
  destroyOnHidden?: boolean;
  /** 提交超时（毫秒），超时期间禁用取消按钮 */
  submitTimeout?: number;
  /** 表单提交回调，返回 truthy 时自动关闭弹层 */
  onFinish?: (values: T) => Promise<any>;
  /** 弹层自身的关闭回调（onCancel / onClose），在取消按钮点击时额外触发 */
  onCloseExtra?: (e: any) => void;
  /** submitter prop，false 表示不渲染 */
  submitter: CommonFormProps['submitter'];
  /** 按钮文案配置 */
  searchConfig: OverlayFormSearchConfig;
  /** 触发打开弹层的 trigger 元素 */
  trigger?: React.JSX.Element;
};

export type UseOverlayFormResult<T> = {
  open: boolean;
  setOpen: (updater: boolean | ((prev: boolean) => boolean)) => void;
  loading: boolean;
  /** ref callback，绑定到弹层 footer 容器的 div 上 */
  footerDomRef: React.RefCallback<HTMLDivElement>;
  /** 实际指向 footer DOM 节点的 ref */
  footerRef: React.MutableRefObject<HTMLDivElement | null>;
  /** clone 后的 trigger，内部已注入 onClick */
  triggerDom: React.ReactElement | null;
  /** 计算好的 submitter 配置，直接传给 BaseForm */
  submitterConfig: CommonFormProps['submitter'];
  /** 传给 BaseForm 的 contentRender */
  contentRender: (formDom: any, submitter: any) => React.ReactElement;
  /** 传给 BaseForm 的 onFinish */
  onFinishHandle: (values: T) => Promise<any>;
  /** 关闭时重置表单，仅在 destroyOnHidden=true 时有效 */
  resetFields: () => void;
};

/**
 * 提取 ModalForm / DrawerForm 共同的弹层表单逻辑：
 * - open 受控状态 + queueMicrotask 通知
 * - footer portal 挂载点管理（footerRef + forceUpdate）
 * - destroyOnHidden 时的 resetFields
 * - submitterConfig 合并（searchConfig + resetButtonProps）
 * - contentRender（formDom + portal 到 footer）
 * - onFinishHandle（submitTimeout 超时保护）
 * - trigger cloneElement
 * - useImperativeHandle 同步 propsFormRef
 */
export function useOverlayForm<T = Record<string, any>>({
  propsOpen,
  onOpenChange,
  formRef,
  propsFormRef,
  destroyOnHidden,
  submitTimeout,
  onFinish,
  onCloseExtra,
  submitter,
  searchConfig,
  trigger,
}: UseOverlayFormOptions<T>): UseOverlayFormResult<T> {
  const [, forceUpdate] = useState<object>({});
  const [loading, setLoading] = useState(false);

  const [open, setOpenInner] = useControlledState<boolean>(false, propsOpen);

  const onOpenChangeCallback = useRefFunction((nextOpen: boolean) => {
    onOpenChange?.(nextOpen);
  });

  /**
   * 包一层 queueMicrotask，防止在渲染阶段同步触发外部 setState，
   * 避免 React "Cannot update a component while rendering a different component" 警告
   */
  const setOpen = useRefFunction(
    (updater: boolean | ((prev: boolean) => boolean)) => {
      setOpenInner((prev) => {
        const next =
          typeof updater === 'function'
            ? (updater as (p: boolean) => boolean)(prev)
            : updater;
        queueMicrotask(() => {
          onOpenChangeCallback(next);
        });
        return next;
      });
    },
  );

  // footer 挂载点
  const footerRef = useRef<HTMLDivElement | null>(null);

  const footerDomRef: React.RefCallback<HTMLDivElement> = useRefFunction(
    (element) => {
      // 第一次拿到 DOM 节点时，触发一次 forceUpdate 让 portal 有机会挂载
      if (footerRef.current === null && element) {
        forceUpdate({});
      }
      footerRef.current = element;
    },
  );

  // 重置表单（仅在 destroyOnHidden 时调用）
  const resetFields = useRefFunction(() => {
    const form = formRef.current;
    if (form && destroyOnHidden && typeof form.resetFields === 'function') {
      form.resetFields();
    }
  });

  /**
   * 将内部 formRef 暴露给调用方传入的 propsFormRef。
   * deps 必须是 []：formRef.current 是 mutable value，变化不会触发更新，
   * 用它做依赖项毫无意义。
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useImperativeHandle(propsFormRef, () => formRef.current, []);

  // 受控 propsOpen=true 时，立即通知外部感知初始打开状态
  useEffect(() => {
    if (propsOpen) {
      onOpenChange?.(true);
    }
    // 只关心 propsOpen 的初始值，不追踪 onOpenChange（引用可能每次变化）
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propsOpen]);

  // trigger 克隆：注入 onClick 以切换 open
  const triggerDom = trigger
    ? React.cloneElement(trigger, {
        key: 'trigger',
        ...trigger.props,
        onClick: async (e: any) => {
          setOpen(!open);
          trigger.props?.onClick?.(e);
        },
      })
    : null;

  const submitterConfig: CommonFormProps['submitter'] =
    submitter === false
      ? false
      : merge(
          {
            searchConfig: {
              submitText: searchConfig.submitText,
              resetText: searchConfig.resetText,
            },
            resetButtonProps: {
              preventDefault: true,
              disabled: submitTimeout ? loading : false,
              onClick: (e: any) => {
                setOpen(false);
                onCloseExtra?.(e);
              },
            },
          } as SubmitterProps,
          submitter ?? {},
        );

  // formDom + portal submitter 到 footer
  const contentRender = useRefFunction(
    (formDom: any, submitterDom: any): React.ReactElement => {
      return (
        <>
          {formDom}
          {footerRef.current && submitterDom ? (
            <React.Fragment key="submitter">
              {createPortal(submitterDom, footerRef.current)}
            </React.Fragment>
          ) : (
            submitterDom
          )}
        </>
      );
    },
  );

  // submitTimeout 超时保护：超时内禁用取消按钮，结果 truthy 时自动关闭
  const onFinishHandle = useRefFunction(async (values: T) => {
    const responsePromise = onFinish?.(values);

    if (submitTimeout) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), submitTimeout);
      try {
        const result = await responsePromise;
        clearTimeout(timer);
        setLoading(false);
        if (result) setOpen(false);
        return result;
      } catch (error) {
        clearTimeout(timer);
        setLoading(false);
        throw error;
      }
    }

    const result = await responsePromise;
    if (result) setOpen(false);
    return result;
  });

  return {
    open,
    setOpen,
    loading,
    footerDomRef,
    footerRef,
    triggerDom,
    submitterConfig,
    contentRender,
    onFinishHandle,
    resetFields,
  };
}
