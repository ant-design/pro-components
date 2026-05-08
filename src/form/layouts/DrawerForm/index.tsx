import { warning } from '@rc-component/util';
import type { DrawerProps, FormProps } from 'antd';
import { ConfigProvider, Drawer } from 'antd';
import { clsx } from 'clsx';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { isBrowser, omitUndefined, useRefFunction } from '../../../utils';
import type { CommonFormProps, ProFormInstance } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import { useOverlayForm } from '../_shared/useOverlayForm';
import { useStyle } from './style';

const { noteOnce } = warning;

export type CustomizeResizeType = {
  onResize?: () => void;
  maxWidth?: DrawerProps['size'];
  minWidth?: DrawerProps['size'];
};

export type DrawerFormProps<
  T = Record<string, any>,
  U = Record<string, any>,
> = Omit<FormProps, 'onFinish' | 'title'> &
  CommonFormProps<T, U> & {
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

    /** @name 提交数据时，禁用取消按钮的超时时间（毫秒）。 */
    submitTimeout?: number;

    /** @name 用于触发抽屉打开的 dom ，只能设置一个*/
    trigger?: React.JSX.Element;

    /** @name 受控的打开关闭 */
    open?: DrawerProps['open'];

    /** @name 打开关闭的事件 */
    onOpenChange?: (open: boolean) => void;

    /** @name 抽屉的配置 */
    drawerProps?: Omit<DrawerProps, 'open'>;

    /** @name 抽屉的标题 */
    title?: DrawerProps['title'];

    /** @name 抽屉的宽度 */
    width?: DrawerProps['size'];

    /**
     *
     * @name draggableDrawer
     */
    resize?: CustomizeResizeType | boolean;
  };

function DrawerForm<T = Record<string, any>, U = Record<string, any>>({
  children,
  trigger,
  drawerProps,
  onFinish,
  submitTimeout,
  title,
  width,
  resize,
  onOpenChange,
  open: propsOpen,
  ...rest
}: DrawerFormProps<T, U>) {
  noteOnce(
    !(rest as any).footer || !drawerProps?.footer,
    'DrawerForm 是一个 ProForm 的特殊布局，如果想自定义按钮，请使用 submit.render 自定义。',
  );

  const resizeInfo: CustomizeResizeType = React.useMemo(() => {
    const defaultResize: CustomizeResizeType = {
      onResize: () => {},
      maxWidth: isBrowser() ? window.innerWidth * 0.8 : undefined,
      minWidth: 300,
    };
    if (typeof resize === 'boolean') {
      return resize ? defaultResize : {};
    }
    return omitUndefined({
      onResize: resize?.onResize ?? defaultResize.onResize,
      maxWidth: resize?.maxWidth ?? defaultResize.maxWidth,
      minWidth: resize?.minWidth ?? defaultResize.minWidth,
    });
  }, [resize]);

  const context = useContext(ConfigProvider.ConfigContext);
  const baseClassName = context.getPrefixCls('pro-form-drawer');
  const { wrapSSR, hashId } = useStyle(baseClassName);
  const getCls = (className: string) => `${baseClassName}-${className}`;

  const [drawerWidth, setDrawerWidth] = useState<DrawerProps['size']>(
    width ? width : resize ? resizeInfo?.minWidth : 800,
  );

  const formRef = useRef<ProFormInstance>();

  const {
    open,
    setOpen,
    loading,
    footerDomRef,
    footerRef,
    triggerDom,
    submitterConfig,
    contentRender,
    onFinishHandle,
    resetFields,
  } = useOverlayForm<T>({
    propsOpen,
    onOpenChange,
    formRef,
    propsFormRef: rest.formRef,
    destroyOnHidden: drawerProps?.destroyOnHidden,
    submitTimeout,
    onFinish,
    onCloseExtra: drawerProps?.onClose,
    submitter: rest.submitter,
    searchConfig: {
      submitText: context.locale?.Modal?.okText ?? '确认',
      resetText: context.locale?.Modal?.cancelText ?? '取消',
    },
    trigger,
  });

  const cbHandleMouseMove = useCallback(
    (e: MouseEvent) => {
      const offsetRight =
        (document.body.offsetWidth || 1000) -
        (e.clientX - document.body.offsetLeft);
      const minWidth = resizeInfo?.minWidth ?? (width || 800);
      const maxWidth = resizeInfo?.maxWidth ?? window.innerWidth * 0.8;

      if (offsetRight < (minWidth as number)) {
        setDrawerWidth(minWidth);
        return;
      }
      if (offsetRight > (maxWidth as number)) {
        setDrawerWidth(maxWidth);
        return;
      }
      setDrawerWidth(offsetRight);
    },
    [resizeInfo?.maxWidth, resizeInfo?.minWidth, width],
  );

  const cbHandleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', cbHandleMouseMove);
    document.removeEventListener('mouseup', cbHandleMouseUp);
  }, [cbHandleMouseMove]);

  return wrapSSR(
    <>
      <Drawer
        {...drawerProps}
        destroyOnHidden={drawerProps?.destroyOnHidden}
        title={title}
        size={
          typeof drawerWidth === 'number' ? drawerWidth : (drawerWidth as any)
        }
        open={open}
        afterOpenChange={(nextOpen) => {
          // fix: #6006 destroyOnHidden 时在抽屉关闭后重置，避免关闭过程中闪烁
          if (!nextOpen && drawerProps?.destroyOnHidden) {
            resetFields();
          }
          drawerProps?.afterOpenChange?.(nextOpen);
        }}
        onClose={(e) => {
          // 提交时 loading，阻止关闭
          if (submitTimeout && loading) return;
          setOpen(false);
          drawerProps?.onClose?.(e);
        }}
        footer={
          rest.submitter !== false && (
            <div
              ref={footerDomRef}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            />
          )
        }
      >
        {resize ? (
          <div
            className={clsx(getCls('sidebar-dragger'), hashId, {
              [getCls('sidebar-dragger-min-disabled')]:
                drawerWidth === resizeInfo?.minWidth,
              [getCls('sidebar-dragger-max-disabled')]:
                drawerWidth === resizeInfo?.maxWidth,
            })}
            onMouseDown={(e) => {
              resizeInfo?.onResize?.();
              e.stopPropagation();
              e.preventDefault();
              document.addEventListener('mousemove', cbHandleMouseMove);
              document.addEventListener('mouseup', cbHandleMouseUp);
            }}
          />
        ) : null}
        <BaseForm<T, U>
          formComponentType="DrawerForm"
          layout="vertical"
          {...rest}
          formRef={formRef}
          onInit={(_, form) => {
            if (rest.formRef) {
              (
                rest.formRef as React.MutableRefObject<ProFormInstance<T>>
              ).current = form;
            }
            rest?.onInit?.(_, form);
            formRef.current = form;
          }}
          submitter={submitterConfig}
          onFinish={async (values) => {
            // fix: #6006 result 为 true 时抽屉关闭由 onFinishHandle 内部处理，
            // 无需在此重置，等 afterOpenChange 触发时再重置
            return onFinishHandle(values);
          }}
          contentRender={contentRender}
        >
          {children}
        </BaseForm>
      </Drawer>
      {triggerDom}
    </>,
  );
}

export { DrawerForm };
