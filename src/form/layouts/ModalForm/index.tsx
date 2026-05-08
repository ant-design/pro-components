import { warning } from '@rc-component/util';
import type { FormProps, ModalProps } from 'antd';
import { ConfigProvider, Modal } from 'antd';
import React, { useContext, useRef } from 'react';
import type { CommonFormProps, ProFormInstance } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import { useOverlayForm } from '../_shared/useOverlayForm';

const { noteOnce } = warning;

export type ModalFormProps<
  T = Record<string, any>,
  U = Record<string, any>,
> = Omit<FormProps<T>, 'onFinish' | 'title'> &
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
    trigger?: React.JSX.Element;

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
    !(rest as any).footer || !modalProps?.footer,
    'ModalForm 是一个 ProForm 的特殊布局，如果想自定义按钮，请使用 submit.render 自定义。',
  );

  const context = useContext(ConfigProvider.ConfigContext);
  const formRef = useRef<ProFormInstance>();

  const {
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
  } = useOverlayForm<T>({
    propsOpen,
    onOpenChange,
    formRef,
    propsFormRef: rest.formRef,
    destroyOnHidden: modalProps?.destroyOnHidden,
    submitTimeout,
    onFinish,
    onCloseExtra: modalProps?.onCancel,
    submitter: rest.submitter,
    searchConfig: {
      submitText: String(
        modalProps?.okText ?? context.locale?.Modal?.okText ?? '确认',
      ),
      resetText: String(
        modalProps?.cancelText ?? context.locale?.Modal?.cancelText ?? '取消',
      ),
    },
    trigger,
  });

  return (
    <>
      <Modal
        title={title}
        width={width || 800}
        {...modalProps}
        open={open}
        onCancel={(e) => {
          // 提交时 loading，阻止关闭
          if (submitTimeout && loading) return;
          setOpen(false);
          modalProps?.onCancel?.(e);
        }}
        afterClose={() => {
          // fix: #6006 destroyOnHidden 时在关闭动画结束后重置，避免在关闭过程中闪烁
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
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            />
          ) : null
        }
      >
        <BaseForm<T, U>
          formComponentType="ModalForm"
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
            // fix: #6006 result 为 true 时弹窗关闭由 onFinishHandle 内部处理，
            // 无需在此重置，等 afterClose 触发时再重置
            return onFinishHandle(values);
          }}
          contentRender={contentRender}
        >
          {children}
        </BaseForm>
      </Modal>
      {triggerDom}
    </>
  );
}

export { ModalForm };
