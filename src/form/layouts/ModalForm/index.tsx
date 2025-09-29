﻿import { useMergedState, warning } from '@rc-component/util';
import type { FormProps, ModalProps } from 'antd';
import { ConfigProvider, Modal } from 'antd';
import { merge } from 'lodash-es';
import type { JSX } from 'react';
import React, { useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { CommonFormProps, ProFormInstance } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import type { SubmitterProps } from '../../BaseForm/Submitter';

const { noteOnce } = warning;

export type ModalFormProps<T = Record<string, any>, U = Record<string, any>> = Omit<
  FormProps<T>,
  'onFinish' | 'title'
> &
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

    /** @name 用于触发抽屉打开的 dom */
    trigger?: JSX.Element;

    /** @name 受控的打开关闭 */
    open?: ModalProps['open'];

    /** @name 打开关闭的事件 */
    onOpenChange?: (open: boolean) => void;

    /** @name 弹框的属性 */
    modalProps?: Omit<ModalProps, 'open'>;

    /** @name 弹框的标题 */
    title?: ModalProps['title'];

    /** @name 弹框的宽度 */
    width?: ModalProps['width'];
  };

function ModalForm<T = Record<string, any>, U = Record<string, any>>({
  children,
  trigger,
  onOpenChange,
  modalProps,
  onFinish,
  submitTimeout,
  title,
  width,
  open: propsOpen,
  ...rest
}: ModalFormProps<T, U>) {
  noteOnce(
    !(rest as any)['footer'] || !modalProps?.footer,
    'ModalForm 是一个 ProForm 的特殊布局，如果想自定义按钮，请使用 submit.render 自定义。',
  );

  const context = useContext(ConfigProvider.ConfigContext);

  const [, forceUpdate] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useMergedState<boolean>(false, {
    value: propsOpen,
    onChange: onOpenChange,
  });

  const footerRef = useRef<HTMLDivElement | null>(null);

  const footerDomRef: React.RefCallback<HTMLDivElement> = useCallback((element) => {
    if (footerRef.current === null && element) {
      forceUpdate([]);
    }
    footerRef.current = element;
  }, []);

  const formRef = useRef<ProFormInstance>(undefined);

  const resetFields = useCallback(() => {
    const form = rest.form ?? rest.formRef?.current ?? formRef.current;
    // 重置表单
    if (form && modalProps?.destroyOnHidden) {
      form.resetFields();
    }
  }, [modalProps?.destroyOnHidden, rest.form, rest.formRef]);

  useImperativeHandle(
    rest.formRef,
    () => {
      return formRef.current;
    },
    [formRef.current],
  );

  useEffect(() => {
    if (propsOpen) {
      onOpenChange?.(true);
    }
  }, [propsOpen]);

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
          submitText: modalProps?.okText ?? context.locale?.Modal?.okText ?? '确认',
          resetText: modalProps?.cancelText ?? context.locale?.Modal?.cancelText ?? '取消',
        },
        resetButtonProps: {
          preventDefault: true,
          disabled: submitTimeout && loading,
          onClick: (e: any) => {
            setOpen(false);
            modalProps?.onCancel?.(e);
          },
        },
      } as SubmitterProps,
      rest.submitter ?? {},
    );
  }, [
    context.locale?.Modal?.cancelText,
    context.locale?.Modal?.okText,
    modalProps,
    rest.submitter,
    setOpen,
    loading,
    submitTimeout,
  ]);

  const contentRender = useCallback((formDom: any, submitter: any) => {
    return (
      <>
        {formDom}
        {footerRef.current && submitter ? (
          <React.Fragment key="submitter">{createPortal(submitter, footerRef.current)}</React.Fragment>
        ) : (
          submitter
        )}
      </>
    );
  }, []);

  const onFinishHandle = useCallback(
    async (values: T) => {
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
    },
    [onFinish, setOpen, submitTimeout],
  );

  return (
    <>
      <Modal
        title={title}
        width={width || 800}
        {...modalProps}
        afterClose={() => {
          // 确保在关闭时立即重置表单
          if (modalProps?.destroyOnHidden) {
            resetFields();
          }
          if (open) {
            setOpen(false);
          }
          modalProps?.afterClose?.();
        }}
        footer={
          rest.submitter !== false ? (
            <div
              ref={footerDomRef}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            />
          ) : null
        }
        open={open}
        onCancel={(e) => {
          // 提交表单loading时，阻止弹框关闭
          if (submitTimeout && loading) return;
          setOpen(false);
          modalProps?.onCancel?.(e);
        }}
      >
        <BaseForm<T, U>
          formComponentType="ModalForm"
          layout="vertical"
          {...rest}
          contentRender={contentRender}
          formRef={formRef}
          submitter={submitterConfig}
          onFinish={async (values) => {
            const result = await onFinishHandle(values);
            // fix: #6006 如果 result 为 true,那么必然会触发弹窗关闭，我们无需在 此处重置表单，只需在弹窗关闭时重置即可
            return result;
          }}
          onInit={(_, form) => {
            if (rest.formRef) {
              (rest.formRef as React.RefObject<ProFormInstance<T>>).current = form;
            }
            rest?.onInit?.(_, form);
            formRef.current = form;
          }}
        >
          {children}
        </BaseForm>
      </Modal>
      {triggerDom}
    </>
  );
}

export { ModalForm };
