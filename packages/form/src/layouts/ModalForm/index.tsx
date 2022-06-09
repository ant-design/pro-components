import type { FormProps, ModalProps } from 'antd';
import { ConfigProvider, Modal } from 'antd';
import merge from 'lodash/merge';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { noteOnce } from 'rc-util/lib/warning';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { CommonFormProps, ProFormInstance } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';

export type ModalFormProps<T = Record<string, any>> = Omit<FormProps<T>, 'onFinish' | 'title'> &
  CommonFormProps<T> & {
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
    visible?: ModalProps['visible'];

    /** @name 打开关闭的事件 */
    onVisibleChange?: (visible: boolean) => void;

    /**
     * 不支持 'visible'，请使用全局的 visible
     *
     * @name 弹框的属性
     */
    modalProps?: Omit<ModalProps, 'visible'>;

    /** @name 弹框的标题 */
    title?: ModalProps['title'];

    /** @name 弹框的宽度 */
    width?: ModalProps['width'];
  };

function ModalForm<T = Record<string, any>>({
  children,
  trigger,
  onVisibleChange,
  modalProps,
  onFinish,
  submitTimeout,
  title,
  width,
  visible: propVisible,
  ...rest
}: ModalFormProps<T>) {
  noteOnce(
    // eslint-disable-next-line @typescript-eslint/dot-notation
    !rest['footer'] || !modalProps?.footer,
    'ModalForm 是一个 ProForm 的特殊布局，如果想自定义按钮，请使用 submit.render 自定义。',
  );

  const context = useContext(ConfigProvider.ConfigContext);

  const [, forceUpdate] = useState([]);
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useMergedState<boolean>(!!propVisible, {
    value: propVisible,
    onChange: onVisibleChange,
  });

  const footerRef = useRef<HTMLDivElement | null>(null);

  const footerDomRef: React.RefCallback<HTMLDivElement> = useCallback((element) => {
    if (footerRef.current === null && element) {
      forceUpdate([]);
    }
    footerRef.current = element;
  }, []);

  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (visible && propVisible) {
      onVisibleChange?.(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propVisible, visible]);

  const triggerDom = useMemo(() => {
    if (!trigger) {
      return null;
    }

    return React.cloneElement(trigger, {
      key: 'trigger',
      ...trigger.props,
      onClick: async (e: any) => {
        setVisible(!visible);
        trigger.props?.onClick?.(e);
      },
    });
  }, [setVisible, trigger, visible]);

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
          // 提交表单loading时，不可关闭弹框
          disabled: submitTimeout ? loading : undefined,
          onClick: (e: any) => {
            setVisible(false);
            modalProps?.onCancel?.(e);
          },
        },
      },
      rest.submitter,
    );
  }, [
    context.locale?.Modal?.cancelText,
    context.locale?.Modal?.okText,
    modalProps,
    rest.submitter,
    setVisible,
    loading,
    submitTimeout,
  ]);

  const contentRender = useCallback((formDom: any, submitter: any) => {
    return (
      <>
        {formDom}
        {footerRef.current && submitter ? createPortal(submitter, footerRef.current) : submitter}
      </>
    );
  }, []);

  const onFinishHandle = useCallback(
    async (values: T) => {
      const response = onFinish?.(values);

      if (submitTimeout && response instanceof Promise) {
        setLoading(true);

        const timer = setTimeout(() => setLoading(false), submitTimeout);
        response.finally(() => {
          clearTimeout(timer);
          setLoading(false);
        });
      }
      const result = await response;
      // 返回真值，关闭弹框
      if (result) {
        setVisible(false);
      }
      return result;
    },
    [onFinish, setVisible, submitTimeout],
  );

  return (
    <>
      <Modal
        title={title}
        width={width || 800}
        {...modalProps}
        visible={visible}
        onCancel={(e) => {
          // 提交表单loading时，阻止弹框关闭
          if (submitTimeout && loading) return;
          setVisible(false);
          modalProps?.onCancel?.(e);
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
        <BaseForm
          formComponentType="ModalForm"
          layout="vertical"
          formRef={formRef}
          {...rest}
          submitter={submitterConfig}
          onFinish={async (values) => {
            const result = await onFinishHandle(values);
            const form = rest.formRef?.current ?? formRef.current;
            // 返回真值，重置表单
            if (result && form) {
              form.resetFields();
            }
            return result;
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
