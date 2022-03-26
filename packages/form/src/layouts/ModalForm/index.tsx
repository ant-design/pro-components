import React, { useContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Modal, ConfigProvider } from 'antd';
import type { ModalProps, FormProps } from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { createPortal } from 'react-dom';

import type { CommonFormProps } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import { noteOnce } from 'rc-util/lib/warning';
import merge from 'lodash/merge';

export type ModalFormProps<T = Record<string, any>> = Omit<FormProps<T>, 'onFinish' | 'title'> &
  CommonFormProps<T> & {
    /**
     * 接收任意值，返回 真值 会关掉这个弹窗
     *
     * @name 表单结束后调用
     */
    onFinish?: (formData: T) => Promise<boolean | void>;

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
  ]);

  const contentRender = useCallback((formDom: any, submitter: any) => {
    return (
      <>
        {formDom}
        {footerRef.current && submitter ? createPortal(submitter, footerRef.current) : submitter}
      </>
    );
  }, []);

  return (
    <>
      <Modal
        title={title}
        width={width || 800}
        {...modalProps}
        visible={visible}
        onCancel={(e) => {
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
          {...rest}
          submitter={submitterConfig}
          onFinish={async (values) => (await onFinish?.(values)) && setVisible(false)}
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
