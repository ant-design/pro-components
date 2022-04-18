import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { DrawerProps, FormProps } from 'antd';
import { ConfigProvider } from 'antd';
import { Drawer } from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { createPortal } from 'react-dom';

import type { CommonFormProps } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import { noteOnce } from 'rc-util/lib/warning';
import merge from 'lodash/merge';

export type DrawerFormProps<T = Record<string, any>> = Omit<FormProps, 'onFinish' | 'title'> &
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

    /** @name 用于触发抽屉打开的 dom ，只能设置一个*/
    trigger?: JSX.Element;

    /** @name 受控的打开关闭 */
    visible?: DrawerProps['visible'];

    /**
     * @name 打开关闭的事件 */
    onVisibleChange?: (visible: boolean) => void;
    /**
     * 不支持 'visible'，请使用全局的 visible
     *
     * @name 抽屉的配置
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
  visible: propVisible,
  ...rest
}: DrawerFormProps<T>) {
  noteOnce(
    // eslint-disable-next-line @typescript-eslint/dot-notation
    !rest['footer'] || !drawerProps?.footer,
    'DrawerForm 是一个 ProForm 的特殊布局，如果想自定义按钮，请使用 submit.render 自定义。',
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
          submitText: context.locale?.Modal?.okText ?? '确认',
          resetText: context.locale?.Modal?.cancelText ?? '取消',
        },
        resetButtonProps: {
          preventDefault: true,
          // 提交表单loading时，不可关闭弹框
          disabled: loading,
          onClick: (e: any) => {
            setVisible(false);
            drawerProps?.onClose?.(e);
          },
        },
      },
      rest.submitter,
    );
  }, [
    context.locale?.Modal?.cancelText,
    context.locale?.Modal?.okText,
    drawerProps,
    rest.submitter,
    setVisible,
    loading,
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
    async (values) => {
      const response = onFinish?.(values);

      if (response instanceof Promise) {
        setLoading(true);
        response.finally(() => setLoading(false));
        // 5秒超时，解除loading
        setTimeout(() => setLoading(false), 5000);
      }
      return (await response) && setVisible(false);
    },
    [onFinish, setVisible],
  );

  return (
    <>
      <Drawer
        title={title}
        width={width || 800}
        {...drawerProps}
        visible={visible}
        onClose={(e) => {
          // 提交表单loading时，不可关闭弹框
          if (loading) return;
          setVisible(false);
          drawerProps?.onClose?.(e);
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
          formComponentType="DrawerForm"
          layout="vertical"
          {...rest}
          submitter={submitterConfig}
          onFinish={onFinishHandle}
          contentRender={contentRender}
        >
          {children}
        </BaseForm>
      </Drawer>
      {triggerDom}
    </>
  );
}

export { DrawerForm };
