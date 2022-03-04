import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Modal, ConfigProvider } from 'antd';
import type { ModalProps, FormProps } from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { createPortal } from 'react-dom';

import type { BaseFormProps, CommonFormProps } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import { noteOnce } from 'rc-util/lib/warning';
import { merge } from '@ant-design/pro-utils';

export type ModalFormProps<T = Record<string, any>> = Omit<FormProps<T>, 'onFinish' | 'title'> &
  CommonFormProps<T> & {
    /**
     * 接受返回一个boolean，返回 true 会关掉这个弹窗
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

  const footerMount: React.RefCallback<HTMLDivElement> = (element) => {
    if (element && footerRef.current === null) {
      footerRef.current = element;
      forceUpdate([]);
    } else if (element !== null) {
      footerRef.current = null;
    }
  };

  useEffect(() => {
    if (visible && propVisible) {
      onVisibleChange?.(true);
    }
  }, [onVisibleChange, propVisible, visible]);

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

  const submitterConfig: BaseFormProps['submitter'] = useMemo(() => {
    if (rest.submitter === false) {
      return false;
    }
    return merge(rest.submitter, {
      searchConfig: {
        submitText: modalProps?.okText || context.locale?.Modal?.okText || '确认',
        resetText: modalProps?.cancelText || context.locale?.Modal?.cancelText || '取消',
      },
      resetButtonProps: {
        preventDefault: true,
        onClick: (e: any) => {
          setVisible(false);
          modalProps?.onCancel?.(e);
        },
      },
    });
  }, [
    context.locale?.Modal?.cancelText,
    context.locale?.Modal?.okText,
    modalProps,
    rest.submitter,
    setVisible,
  ]);

  const contentRender: BaseFormProps['contentRender'] = (formDom, submitter) => {
    return (
      <>
        {formDom}
        {footerRef.current && submitter ? createPortal(submitter, footerRef.current) : submitter}
      </>
    );
  };

  return (
    <>
      <Modal
        title={title}
        width={width || 800}
        forceRender
        {...modalProps}
        visible={visible}
        onCancel={(e) => {
          setVisible(false);
          modalProps?.onCancel?.(e);
        }}
        footer={
          rest.submitter !== false && (
            <div
              ref={footerMount}
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
          onFinish={async (values) => {
            if (!onFinish) {
              return;
            }
            const success = await onFinish(values);
            if (success) {
              setVisible(false);
            }
          }}
          submitter={submitterConfig}
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
