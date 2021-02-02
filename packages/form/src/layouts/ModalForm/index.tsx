import React, { useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { Modal, ConfigProvider } from 'antd';
import type { FormInstance, ModalProps, FormProps } from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import omit from 'omit.js';
import { createPortal } from 'react-dom';

import type { CommonFormProps } from '../../BaseForm';
import BaseForm from '../../BaseForm';
import { noteOnce } from 'rc-util/lib/warning';

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
  ...rest
}: ModalFormProps<T>) {
  const [visible, setVisible] = useMergedState<boolean>(!!rest.visible, {
    value: rest.visible,
    onChange: onVisibleChange,
  });

  noteOnce(
    // eslint-disable-next-line @typescript-eslint/dot-notation
    !rest['footer'] || !modalProps?.footer,
    'ModalForm 是一个 ProForm 的特殊布局，如果想自定义按钮，请使用 submit.render 自定义。',
  );

  const context = useContext(ConfigProvider.ConfigContext);

  useEffect(() => {
    if (visible && rest.visible) {
      onVisibleChange?.(true);
    }
  }, [visible]);

  /** 设置 trigger 的情况下，懒渲染优化性能；使之可以直接配合表格操作等场景使用 */
  const isFirstRender = useRef(!modalProps?.forceRender);
  /**
   * IsFirstRender.current 或者 visible 为 true 的时候就渲染 不渲染能会造成一些问题, 比如再次打开值不对了 只有手动配置
   * drawerProps?.destroyOnClose 为 true 的时候才会每次关闭的时候删除 dom
   */
  const shouldRenderFormItems = useMemo(() => {
    if (isFirstRender.current && visible === false) {
      return false;
    }
    if (visible === false && modalProps?.destroyOnClose) {
      return false;
    }
    return true;
  }, [visible, modalProps?.destroyOnClose]);

  /** 同步 props 和 本地的 ref */
  const formRef = useRef<FormInstance>();

  /** 如果 destroyOnClose ，重置一下表单 */
  useEffect(() => {
    if (visible) {
      isFirstRender.current = false;
    }
    if (!visible && modalProps?.destroyOnClose) {
      formRef.current?.resetFields();
    }
  }, [modalProps?.destroyOnClose, visible]);

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
                type: (modalProps?.okType as 'text') || 'primary',
              },
              resetButtonProps: {
                preventDefault: true,
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
                  {shouldRenderFormItems ? item : null}
                </Modal>
              );
            }}
          >
            {children}
          </BaseForm>
        </div>,
        context?.getPopupContainer?.(document.body) || document.body,
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
}

export default ModalForm;
