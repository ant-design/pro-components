import React, { useContext, useImperativeHandle, useRef } from 'react';
import { Modal, ConfigProvider } from 'antd';
import { FormInstance, FormProps } from 'antd/lib/form';
import { ModalProps } from 'antd/lib/modal';
import { Store } from 'antd/lib/form/interface';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import omit from 'omit.js';

import BaseForm, { CommonFormProps } from '../../BaseForm';
import { createPortal } from 'react-dom';

export type ModalFormProps = Omit<FormProps, 'onFinish'> &
  CommonFormProps & {
    /**
     * @name 表单结束后调用
     * @description  接受返回一个boolean，返回 true 会关掉这个弹窗
     */
    onFinish?: (formData: Store) => Promise<boolean | void>;

    /**
     * @name 用于触发抽屉打开的 dom
     */
    trigger?: JSX.Element;

    /**
     * @name 受控的打开关闭
     */
    visible?: ModalProps['visible'];

    /**
     * @name 打开关闭的事件
     */
    onVisibleChange?: (visible: boolean) => void;

    /**
     * @name 弹框的属性
     * @description 不支持 'visible'，请使用全局的 visible
     */
    modalProps?: Omit<ModalProps, 'visible'>;

    /**
     * @name 弹框的标题
     */
    title?: ModalProps['title'];

    /**
     * @name 弹框的宽度
     */
    width?: ModalProps['width'];
  };

const ModalForm: React.FC<ModalFormProps> = ({
  children,
  trigger,
  onVisibleChange,
  modalProps,
  onFinish,
  title,
  width,
  ...rest
}) => {
  const [visible, setVisible] = useMergedState<boolean>(!!rest.visible, {
    value: rest.visible,
    onChange: onVisibleChange,
  });
  const context = useContext(ConfigProvider.ConfigContext);
  /**
   * 同步 props 和 本地的 ref
   */
  const formRef = useRef<FormInstance>();
  useImperativeHandle(rest.formRef, () => formRef.current, [formRef.current]);

  return (
    <>
      {createPortal(
        <div>
          <BaseForm
            layout="vertical"
            {...omit(rest, ['visible'])}
            formRef={formRef}
            onFinish={async (values) => {
              if (!onFinish) {
                return;
              }
              const success = await onFinish(values);
              if (success) {
                formRef.current?.resetFields();
                setVisible(false);
              }
            }}
            submitter={{
              searchConfig: {
                submitText: modalProps?.okText || context.locale?.Modal?.okText || '确认',
                resetText: modalProps?.cancelText || context.locale?.Modal?.cancelText || '取消',
              },
              submitButtonProps: {
                type: modalProps?.okType as 'text',
              },
              resetButtonProps: {
                onClick: (e) => {
                  modalProps?.onCancel?.(e);
                  setVisible(false);
                },
              },
              ...rest.submitter,
            }}
            contentRender={(item, submitter) => {
              return (
                <Modal
                  title={title}
                  getContainer={false}
                  width={width || 800}
                  {...modalProps}
                  visible={visible}
                  onCancel={(e) => {
                    setVisible(false);
                    modalProps?.onCancel?.(e);
                  }}
                  footer={submitter}
                >
                  {item}
                </Modal>
              );
            }}
          >
            {children}
          </BaseForm>
        </div>,
        document.body,
      )}
      {trigger &&
        React.cloneElement(trigger, {
          ...trigger.props,
          onClick: (e: any) => {
            setVisible(!visible);
            trigger.props?.onClick?.(e);
          },
        })}
    </>
  );
};

export default ModalForm;
