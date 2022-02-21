import React, { useEffect, useMemo, useRef } from 'react';
import type { DrawerProps, FormProps } from 'antd';
import { Drawer } from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { createPortal } from 'react-dom';
import omit from 'omit.js';

import type { CommonFormProps } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import { noteOnce } from 'rc-util/lib/warning';

export type DrawerFormProps<T = Record<string, any>> = Omit<FormProps, 'onFinish' | 'title'> &
  CommonFormProps<T> & {
    /**
     * 接受返回一个boolean，返回 true 会关掉这个抽屉
     *
     * @name 表单结束后调用
     */
    onFinish?: (formData: T) => Promise<boolean | void>;

    /** @name 用于触发抽屉打开的 dom */
    trigger?: JSX.Element;

    /** @name 受控的打开关闭 */
    visible?: DrawerProps['visible'];

    /** @name 打开关闭的事件 */
    onVisibleChange?: (visible: boolean) => void;
    /**
     * 不支持 'visible'，请使用全局的 visible
     *
     * @name 抽屉的属性
     */
    drawerProps?: Omit<DrawerProps, 'visible'>;

    /** @name 抽屉的标题 */
    title?: DrawerProps['title'];

    /** @name 抽屉的宽度 */
    width?: DrawerProps['width'];
  };

function DrawerForm<T = Record<string, any>>({
  children,
  trigger,
  onVisibleChange,
  drawerProps,
  onFinish,
  title,
  width,
  ...rest
}: DrawerFormProps<T>) {
  const [visible, setVisible] = useMergedState<boolean>(!!rest.visible, {
    value: rest.visible,
    onChange: onVisibleChange,
  });

  const footerRef = useRef<HTMLDivElement>(null);

  /** Modal dom 解除渲染之后 */
  const [isDestroy, setIsDestroy] = useMergedState<boolean>(false);

  const needRenderForm = useMemo(() => {
    if (drawerProps?.destroyOnClose) {
      return visible;
    }
    return true;
  }, [drawerProps?.destroyOnClose, visible]);

  noteOnce(
    // eslint-disable-next-line @typescript-eslint/dot-notation
    !rest['footer'] || !drawerProps?.footer,
    'DrawerForm 是一个 ProForm 的特殊布局，如果想自定义按钮，请使用 submit.render 自定义。',
  );

  useEffect(() => {
    if (visible && rest.visible) {
      onVisibleChange?.(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  /** 设置 trigger 的情况下，懒渲染优化性能；使之可以直接配合表格操作等场景使用 */
  const isFirstRender = useRef(!drawerProps?.forceRender);

  /** 如果 destroyOnClose ，重置一下表单 */
  useEffect(() => {
    if (visible) {
      isFirstRender.current = false;
    }
  }, [drawerProps?.destroyOnClose, visible]);

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

  return (
    <>
      <Drawer
        title={title}
        width={width || 800}
        {...drawerProps}
        visible={visible}
        onClose={(e) => {
          setVisible(false);
          drawerProps?.onClose?.(e);
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
            formComponentType="DrawerForm"
            layout="vertical"
            {...omit(rest, ['visible'])}
            submitter={
              rest.submitter === false
                ? false
                : {
                    ...rest.submitter,
                    searchConfig: {
                      submitText: '确认',
                      resetText: '取消',
                      ...rest.submitter?.searchConfig,
                    },
                    resetButtonProps: {
                      preventDefault: true,
                      onClick: (e: any) => {
                        setVisible(false);
                        drawerProps?.onClose?.(e);
                      },
                      ...rest.submitter?.resetButtonProps,
                    },
                  }
            }
            onFinish={async (values) => {
              if (!onFinish) {
                return;
              }
              const success = await onFinish(values);
              if (success) {
                setVisible(false);
              }
            }}
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
      </Drawer>
      {triggerDom}
    </>
  );
}

export { DrawerForm };
