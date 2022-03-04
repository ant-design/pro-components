import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { DrawerProps, FormProps } from 'antd';
import { Drawer } from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { createPortal } from 'react-dom';

import type { BaseFormProps, CommonFormProps } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import { noteOnce } from 'rc-util/lib/warning';
import { merge } from '@ant-design/pro-utils';

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
  visible: propVisible,
  ...rest
}: DrawerFormProps<T>) {
  noteOnce(
    // eslint-disable-next-line @typescript-eslint/dot-notation
    !rest['footer'] || !drawerProps?.footer,
    'DrawerForm 是一个 ProForm 的特殊布局，如果想自定义按钮，请使用 submit.render 自定义。',
  );

  const [visible, setVisible] = useMergedState<boolean>(!!propVisible, {
    value: propVisible,
    onChange: onVisibleChange,
  });

  const [, forceUpdate] = useState([]);

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
        submitText: '确认',
        resetText: '取消',
      },
      resetButtonProps: {
        preventDefault: true,
        onClick: (e: any) => {
          setVisible(false);
          drawerProps?.onClose?.(e);
        },
      },
    });
  }, [drawerProps, rest.submitter, setVisible]);

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
      <Drawer
        title={title}
        width={width || 800}
        forceRender
        {...drawerProps}
        visible={visible}
        onClose={(e) => {
          setVisible(false);
          drawerProps?.onClose?.(e);
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
          formComponentType="DrawerForm"
          layout="vertical"
          {...rest}
          submitter={submitterConfig}
          onFinish={async (values) => {
            if (!onFinish) {
              return;
            }
            const success = await onFinish(values);
            if (success) {
              setVisible(false);
            }
          }}
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
