import React, { useMemo } from 'react';
import type { UploadProps, ButtonProps } from 'antd';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { ProFormFieldItemProps } from '../../interface';
import { createField } from '../../BaseForm/createField';

export type ProFormDraggerProps = ProFormFieldItemProps<UploadProps> & {
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
} & Pick<UploadProps, 'name' | 'listType' | 'action' | 'accept' | 'fileList' | 'onChange'>;

/**
 * 上传按钮组件
 *
 * @param
 */
const BaseProFormUploadButton: React.ForwardRefRenderFunction<any, ProFormDraggerProps> = (
  {
    fieldProps,
    name,
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

  // 如果配置了 max ，并且 超过了文件列表的大小，就不展示按钮
  const showUploadButton =
    (max === undefined || !value || value?.length < max) && proFieldProps?.mode !== 'read';

  const isPictureCard = (listType ?? fieldProps?.listType) === 'picture-card';
  return (
    <Upload
      action={action}
      accept={accept}
      ref={ref}
      // 'fileList' 改成和 ant.design 文档中 Update 组件 默认 file字段一样
      name={name || 'file'}
      listType={listType || 'picture'}
      fileList={value}
      {...fieldProps}
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

const ProFormUploadButton = createField<ProFormDraggerProps>(
  React.forwardRef(BaseProFormUploadButton),
  {
    getValueFromEvent: (value: { fileList: UploadProps['fileList'] }) => value.fileList,
  },
) as typeof BaseProFormUploadButton;

export default ProFormUploadButton;
