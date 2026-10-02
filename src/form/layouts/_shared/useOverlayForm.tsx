import { merge, useControlledState } from '@rc-component/util';
import React, {
  useImperativeHandle,
  useLayoutEffect,
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
  /** form 实例挂载完成回调（传给 BaseForm onInit 中调用），用于缓冲首次 onOpenChange */
  onFormMount: () => void;
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

  /**
   * form 实例是否已挂载（BaseForm onInit 后置 true）。
   * Modal/Drawer 懒渲染下，首次打开时 onOpenChange(true) 会在 children
   * 挂载前触发，此时用户在回调里 setFieldsValue 会静默失败（#8920）。
   */
  const formMountedRef = useRef(false);

  /** form 挂载前缓冲的 open 事件，挂载后 flush */
  const pendingOpenRef = useRef<boolean | null>(null);

  /**
   * 受控模式下缓冲 open=true 会死锁(#9624):
   * 用户依赖 onOpenChange(true) 翻转自己的 state;事件被缓冲时
   * propsOpen 保持 false → Modal 永不渲染 → form 永不挂载 → 事件永不 flush。
   * 受控模式(传了 propsOpen)不缓冲,立即通知;
   * 仅非受控(trigger 自管理状态)时保留 #8920 的缓冲语义。
   */
  const controlledRef = useRef(propsOpen !== undefined);
  useLayoutEffect(() => {
    controlledRef.current = propsOpen !== undefined;
  }, [propsOpen]);

  const onOpenChangeCallback = useRefFunction((nextOpen: boolean) => {
    if (!formMountedRef.current && nextOpen && !controlledRef.current) {
      // form 未挂载且要打开：缓冲事件，等 onFormMount 后再通知，
      // 保证用户回调里 formRef.current 一定可用（#8920）。
      // 注意只缓冲 open=true：受控模式下用户依赖 onOpenChange 翻转 state,
      // 若 open 事件被吞,Modal 永远不打开 → form 永远不挂载 → 死锁(#9624)。
      // 而首次打开前 form 必然未挂载,close 事件无需等待 form。
      pendingOpenRef.current = nextOpen;
      return;
    }
    onOpenChange?.(nextOpen);
  });

  /** form 挂载完成（由 ModalForm/DrawerForm 的 BaseForm onInit 调用） */
  const onFormMount = useRefFunction(() => {
    formMountedRef.current = true;
    const pending = pendingOpenRef.current;
    pendingOpenRef.current = null;
    if (pending !== null) {
      onOpenChange?.(pending);
    }
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
    onFormMount,
  };
}
