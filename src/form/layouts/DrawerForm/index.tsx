import { merge, useControlledState, warning } from '@rc-component/util';
import type { DrawerProps, FormProps } from 'antd';
import { ConfigProvider, Drawer } from 'antd';
import React, {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useRefFunction } from '../../../utils';
import type { CommonFormProps, ProFormInstance } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import { SubmitterProps } from '../../BaseForm/Submitter';

const { noteOnce } = warning;

export type DrawerFormProps<
  T = Record<string, any>,
  U = Record<string, any>,
> = Omit<FormProps, 'onFinish' | 'title'> &
  CommonFormProps<T, U> & {
    /**
     * 接收任意值，返回 真值 会关掉这个抽屉
     *
     * @name 表单结束后调用
     *
     * @example 结束后关闭抽屉
     * onFinish: async ()=> {await save(); return true}
     *
     * @example 结束后不关闭抽屉
     * onFinish: async ()=> {await save(); return false}
     */
    onFinish?: (formData: T) => Promise<any>;

    /** @name 提交数据时，禁用取消按钮的超时时间（毫秒）。 */
    submitTimeout?: number;

    /** @name 用于触发抽屉打开的 dom ，只能设置一个*/
    trigger?: React.JSX.Element;

    /** @name 受控的打开关闭 */
    open?: DrawerProps['open'];

    /** @name 打开关闭的事件 */
    onOpenChange?: (open: boolean) => void;

    /** @name antd的Drawer组件[props](https://ant-design.antgroup.com/components/drawer#api) */
    drawerProps?: Omit<DrawerProps, 'open'>;
  };

function DrawerForm<T = Record<string, any>, U = Record<string, any>>({
  children,
  trigger,
  drawerProps,
  onFinish,
  submitTimeout,
  onOpenChange,
  open: propsOpen,
  ...rest
}: DrawerFormProps<T, U>) {
  noteOnce(
    !(rest as any).footer || !drawerProps?.footer,
    'DrawerForm 是一个 ProForm 的特殊布局，如果想自定义按钮，请使用 submit.render 自定义。',
  );

  const context = useContext(ConfigProvider.ConfigContext);

  const [, forceUpdate] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpenInner] = useControlledState<boolean>(
    !!propsOpen,
    propsOpen,
  );

  /**
   * 使用 useRefFunction 包装回调，确保引用稳定
   */
  const onOpenChangeCallback = useRefFunction((o: boolean) => {
    onOpenChange?.(o);
  });

  /**
   * 使用 queueMicrotask 延迟回调调用，避免在渲染阶段调用外部回调导致的 React 警告
   * "Cannot update a component while rendering a different component"
   */
  const setOpen = useCallback(
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
    [onOpenChangeCallback],
  );

  const footerRef = useRef<HTMLDivElement | null>(null);

  const footerDomRef: React.RefCallback<HTMLDivElement> = useCallback(
    (element) => {
      if (footerRef.current === null && element) {
        forceUpdate([]);
      }
      footerRef.current = element;
    },
    [],
  );

  const formRef = useRef<ProFormInstance>();

  const resetFields = useCallback(() => {
    const form = rest.formRef?.current ?? rest.form ?? formRef.current;
    // 重置表单
    // issue: 8858 form.resetFields is not a function
    if (
      form &&
      drawerProps?.destroyOnHidden &&
      typeof form.resetFields === 'function'
    ) {
      form.resetFields();
    }
  }, [drawerProps?.destroyOnHidden, rest.form, rest.formRef]);

  useEffect(() => {
    if (open && propsOpen) {
      onOpenChange?.(true);
    }
  }, [propsOpen, open]);

  useImperativeHandle(
    rest.formRef,
    () => {
      return formRef.current;
    },
    [formRef.current],
  );

  const triggerDom = useMemo(() => {
    if (!trigger) {
      return null;
    }

    return React.cloneElement(trigger, {
      key: 'trigger',
      ...trigger.props,
      onClick: async (e: any) => {
        setOpen(!open);
        trigger.props?.onClick?.(e);
      },
    });
  }, [setOpen, trigger, open]);

  const submitterConfig = useMemo(() => {
    if (rest.submitter === false) {
      return false;
    }

    return merge(
      {
        searchConfig: {
          submitText: context.locale?.Modal?.okText ?? '确认',
          resetText: context.locale?.Modal?.cancelText ?? '取消',
        },
        resetButtonProps: {
          preventDefault: true,
          disabled: submitTimeout && loading,
          onClick: (e: any) => {
            setOpen(false);
            drawerProps?.onClose?.(e);
          },
        },
      } as SubmitterProps,
      rest.submitter ?? {},
    );
  }, [
    rest.submitter,
    context.locale?.Modal?.okText,
    context.locale?.Modal?.cancelText,
    submitTimeout,
    loading,
    setOpen,
    drawerProps,
  ]);

  const contentRender = useCallback((formDom: any, submitter: any) => {
    return (
      <>
        {formDom}
        {footerRef.current && submitter ? (
          <React.Fragment key="submitter">
            {createPortal(submitter, footerRef.current)}
          </React.Fragment>
        ) : (
          submitter
        )}
      </>
    );
  }, []);

  const onFinishHandle = useRefFunction(async (values: T) => {
    const response = onFinish?.(values);
    if (submitTimeout && response instanceof Promise) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), submitTimeout);
      try {
        const result = await response;
        clearTimeout(timer);
        setLoading(false);
        // 返回真值，关闭弹框
        if (result) {
          setOpen(false);
        }
        return result;
      } catch (error) {
        clearTimeout(timer);
        setLoading(false);
        throw error;
      }
    } else if (submitTimeout) {
      // 如果 submitTimeout 存在但 response 不是 Promise，也要设置 loading
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), submitTimeout);
      try {
        const result = await response;
        clearTimeout(timer);
        setLoading(false);
        // 返回真值，关闭弹框
        if (result) {
          setOpen(false);
        }
        return result;
      } catch (error) {
        clearTimeout(timer);
        setLoading(false);
        throw error;
      }
    }
    const result = await response;
    // 返回真值，关闭弹框
    if (result) {
      setOpen(false);
    }
    return result;
  });

  return (
    <>
      <Drawer
        {...drawerProps}
        open={open}
        afterOpenChange={(open) => {
          if (!open && drawerProps?.destroyOnHidden) {
            resetFields();
          }
          drawerProps?.afterOpenChange?.(open);
          onOpenChange?.(open);
        }}
        onClose={(e) => {
          // 提交表单loading时，阻止弹框关闭
          if (submitTimeout && loading) return;
          setOpen(false);
          drawerProps?.onClose?.(e);
        }}
        footer={
          rest.submitter !== false && (
            <div
              ref={footerDomRef}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            />
          )
        }
      >
        <BaseForm<T, U>
          formComponentType="DrawerForm"
          layout="vertical"
          {...rest}
          formRef={formRef}
          onInit={(_, form) => {
            if (rest.formRef) {
              (
                rest.formRef as React.MutableRefObject<ProFormInstance<T>>
              ).current = form;
            }
            rest?.onInit?.(_, form);
            formRef.current = form;
          }}
          submitter={submitterConfig}
          onFinish={async (values) => {
            const result = await onFinishHandle(values);
            // fix: #6006 如果 result 为 true,那么必然会触发抽屉关闭，我们无需在 此处重置表单，只需在抽屉关闭时重置即可
            return result;
          }}
          contentRender={contentRender}
        >
          {children}
        </BaseForm>
      </Drawer>
      {triggerDom}
    </>
  );
}

export { DrawerForm };
