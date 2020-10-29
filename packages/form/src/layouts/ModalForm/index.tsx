import React, { useContext } from 'react';
import { Modal, ConfigProvider } from 'antd';
import { FormProps } from 'antd/lib/form';
import { ModalProps } from 'antd/lib/modal';
import { Store } from 'antd/lib/form/interface';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import omit from 'omit.js';

import BaseForm, { CommonFormProps } from '../../BaseForm';

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
    trigger?: React.ReactNode;

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
     * @name 抽屉的标题
     */
    title?: ModalProps['title'];
  };

const ModalForm: React.FC<ModalFormProps> = ({
  children,
  trigger,
  onVisibleChange,
  modalProps,
  onFinish,
  title,
  ...rest
}) => {
  const [visible, setVisible] = useMergedState<boolean>(!!rest.visible, {
    value: rest.visible,
    onChange: onVisibleChange,
  });
  const context = useContext(ConfigProvider.ConfigContext);

  return (
    <>
      <BaseForm
        layout="vertical"
        {...omit(rest, ['visible'])}
        onFinish={async (values) => {
          if (!onFinish) {
            return;
          }
          const success = await onFinish(values);
          if (success) {
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
            onClick: () => setVisible(false),
          },
          ...rest.submitter,
        }}
        contentRender={(item, submitter) => {
          return (
            <Modal
              title={title}
              getContainer={false}
              width={800}
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
      {trigger && <div onClick={() => setVisible(!visible)}>{trigger}</div>}
    </>
  );
};

export default ModalForm;
