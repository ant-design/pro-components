import { UploadOutlined } from '@ant-design/icons';
import type { ButtonProps, UploadProps } from 'antd';
import { Button, Upload } from 'antd';
import React, { useContext, useMemo } from 'react';
import { createField } from '../../BaseForm/createField';
import { EditOrReadOnlyContext } from '../../BaseForm/EditOrReadOnlyContext';
import type { ProFormFieldItemProps } from '../../typing';

type PickUploadProps = Pick<
  UploadProps<any>,
  'listType' | 'action' | 'accept' | 'fileList' | 'onChange'
>;

export type ProFormUploadButtonProps = ProFormFieldItemProps<
  UploadProps<any>,
  HTMLElement
> & {
  /**
   * @name  上传文件的图标
   * @default UploadOutlined
   *
   * @example 改成笑脸图标  icon={<SmileOutlined/>}
   */
  icon?: React.ReactNode;
  /**
   * @name 按钮文字
   * @default 单击上传
   *
   * @example  title="上传"
   * @example  title={<div>上传</div>}
   */
  title?: React.ReactNode;
  /**
   * @name 最大的文件数量，到达数量之后上传按钮会失效
   *
   * @example max=2
   */
  max?: number;

  /**
   * @name 上传组件的 fileList，为了配合form，改成了这个名字
   * @default []
   *
   * example:value={ [{uid: '-1', name: 'xxx.png', status: 'done', url: 'http://www.baidu.com/xxx.png'}] }
   */
  value?: UploadProps['fileList'];
  /**
   * @name 上传按钮的配置
   *
   * @example 按钮修改为主色 buttonProps={{ type:"primary" }}
   */
  buttonProps?: ButtonProps;

  /**
   * @name 是否禁用按钮
   * @example  disabled={true}
   */
  disabled?: ButtonProps['disabled'];
} & PickUploadProps;

/**
 * 上传按钮组件
 *
 * @param
 */
const BaseProFormUploadButton: React.ForwardRefRenderFunction<
  any,
  ProFormUploadButtonProps
> = (
  {
    fieldProps,
    action,
    accept,
    listType,
    title = '单击上传',
    max,
    icon = <UploadOutlined />,
    buttonProps,
    onChange,
    disabled,
    proFieldProps,
    ...restProps
  },
  ref,
) => {
  const value = useMemo(() => {
    return restProps.fileList ?? restProps.value;
  }, [restProps.fileList, restProps.value]);

  const modeContext = useContext(EditOrReadOnlyContext);
  const mode = proFieldProps?.mode || modeContext.mode || 'edit';

  // 如果配置了 max ，并且 超过了文件列表的大小，就不展示按钮
  const showUploadButton =
    (max === undefined || !value || value?.length < max) && mode !== 'read';

  const isPictureCard = (listType ?? fieldProps?.listType) === 'picture-card';
  return (
    <Upload
      action={action}
      accept={accept}
      ref={ref}
      listType={listType || 'picture'}
      fileList={value}
      {...fieldProps}
      name={fieldProps?.name ?? 'file'}
      onChange={(info) => {
        onChange?.(info);
        fieldProps?.onChange?.(info);
      }}
    >
      {showUploadButton &&
        (isPictureCard ? (
          <span>
            {icon} {title}
          </span>
        ) : (
          <Button disabled={disabled || fieldProps?.disabled} {...buttonProps}>
            {icon}
            {title}
          </Button>
        ))}
    </Upload>
  );
};

const ProFormUploadButton = createField<ProFormUploadButtonProps>(
  React.forwardRef(BaseProFormUploadButton),
  {
    getValueFromEvent: (value: { fileList: UploadProps['fileList'] }) =>
      value.fileList,
  },
) as typeof BaseProFormUploadButton;

export default ProFormUploadButton;
