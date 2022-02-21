import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { Modal, ConfigProvider } from 'antd';
import type { ModalProps, FormProps } from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import omit from 'omit.js';
import { createPortal } from 'react-dom';

import type { CommonFormProps } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
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

  /** Modal dom 解除渲染之后 */
  const [isDestroy, setIsDestroy] = useMergedState<boolean>(false);

  const needRenderForm = useMemo(() => {
    if (modalProps?.destroyOnClose) {
      return visible;
    }
    return true;
  }, [modalProps?.destroyOnClose, visible]);

  useEffect(() => {
    if (visible && rest.visible) {
      onVisibleChange?.(true);
    }
  }, [rest.visible, visible]);

  const context = useContext(ConfigProvider.ConfigContext);

  noteOnce(
    // eslint-disable-next-line @typescript-eslint/dot-notation
    !rest['footer'] || !modalProps?.footer,
    'ModalForm 是一个 ProForm 的特殊布局，如果想自定义按钮，请使用 submit.render 自定义。',
  );

  const renderSubmitter =
    rest.submitter === false
      ? false
      : {
          ...rest.submitter,
          searchConfig: {
            submitText: modalProps?.okText || context.locale?.Modal?.okText || '确认',
            resetText: modalProps?.cancelText || context.locale?.Modal?.cancelText || '取消',
            ...rest.submitter?.searchConfig,
          },
          submitButtonProps: {
            type: (modalProps?.okType as 'text') || 'primary',
            ...rest.submitter?.submitButtonProps,
          },
          resetButtonProps: {
            preventDefault: true,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
              modalProps?.onCancel?.(e);
              setVisible(false);
            },
            ...rest.submitter?.resetButtonProps,
          },
        };

  const triggerDom = (
    <React.Fragment key="trigger">
      {trigger &&
        React.cloneElement(trigger, {
          ...trigger.props,
          onClick: async (e: any) => {
            setVisible(!visible);
            trigger.props?.onClick?.(e);
          },
        })}
    </React.Fragment>
  );

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setIsDestroy(visible);
      }, 100);
      return;
    }
    setIsDestroy(visible);
  }, [setIsDestroy, visible]);

  const footerRef = useRef<HTMLDivElement>(null);

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
              ref={footerRef}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            />
          )
        }
      >
        {needRenderForm && (
          <BaseForm
            formComponentType="ModalForm"
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
            submitter={renderSubmitter}
            contentRender={(item, submitter) => {
              // 未配置自定义提交按钮，则直接将提交按钮渲染到内容区
              if (rest.submitter === false) {
                return (
                  <>
                    {item}
                    {submitter}
                  </>
                );
              }
              // 如果用户配置了自定义的提交按钮，那么我们等到弹框/抽屉底部区域渲染成功后再将自定义按钮渲染过去
              if (footerRef.current && isDestroy && submitter) {
                return (
                  <>
                    {item}
                    {createPortal(submitter, footerRef.current)}
                  </>
                );
              }
              return item;
            }}
          >
            {children}
          </BaseForm>
        )}
      </Modal>
      {triggerDom}
    </>
  );
}

export { ModalForm };
