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
    // ProForm 基础表单，暂无特殊属性
    onFinish?: (formData: Store) => Promise<void>;

    trigger?: React.ReactNode;

    /**
     * 受控的打开关闭
     */
    visible?: ModalProps['visible'];
    onVisibleChange?: (visible: boolean) => void;

    /**
     * 弹框的属性
     */
    modalProps?: ModalProps;
  };

const ModalForm: React.FC<ModalFormProps> = ({
  children,
  trigger,
  onVisibleChange,
  modalProps,
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
        submitter={{
          searchConfig: {
            submitText: modalProps?.okText || context.locale?.Modal?.okText || '确认',
            resetText: modalProps?.cancelText || context.locale?.Modal?.cancelText || '取消',
          },
          resetButtonProps: {
            onClick: () => setVisible(false),
          },
        }}
        {...omit(rest, ['visible'])}
        contentRender={(item, submitter) => {
          return (
            <Modal
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
