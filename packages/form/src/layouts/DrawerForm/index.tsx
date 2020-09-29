import React from 'react';
import { Drawer } from 'antd';
import { FormProps } from 'antd/lib/form';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { DrawerProps } from 'antd/lib/drawer';

import BaseForm, { CommonFormProps } from '../../BaseForm';

export type DrawerFormProps = Omit<FormProps, 'onFinish'> &
  CommonFormProps & {
    // ProForm 基础表单，暂无特殊属性
    onFinish?: (formData: any) => Promise<void>;

    trigger?: React.ReactNode;

    /**
     * 受控的打开关闭
     */
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;

    drawerProps?: DrawerProps;
  };

const DrawerForm: React.FC<DrawerFormProps> = ({
  children,
  trigger,
  onVisibleChange,
  drawerProps,
  ...rest
}) => {
  const [visible, setVisible] = useMergedState<boolean>(!!rest.visible, {
    value: rest.visible,
    onChange: onVisibleChange,
  });

  return (
    <>
      <BaseForm
        layout="vertical"
        submitter={{
          searchConfig: {
            submitText: '确认',
            resetText: '取消',
          },
          resetButtonProps: {
            onClick: () => setVisible(false),
          },
        }}
        {...rest}
        contentRender={(item, submitter) => {
          return (
            <Drawer
              getContainer={false}
              width={800}
              {...drawerProps}
              visible={visible}
              onClose={(e) => {
                setVisible(false);
                drawerProps?.onClose?.(e);
              }}
              footer={submitter}
            >
              {item}
            </Drawer>
          );
        }}
      >
        {children}
      </BaseForm>
      {trigger && <div onClick={() => setVisible(!visible)}>{trigger}</div>}
    </>
  );
};

export default DrawerForm;
