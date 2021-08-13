import React from 'react';
import type { UploadProps, ButtonProps } from 'antd';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { ProFormFieldItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

export type ProFormDraggerProps = ProFormFieldItemProps<UploadProps> & {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  name?: UploadProps['name'];
  listType?: UploadProps['listType'];
  action?: UploadProps['action'];
  accept?: UploadProps['accept'];
  max?: number;
  value?: UploadProps['fileList'];
  onChange?: UploadProps['onChange'];
  buttonProps?: ButtonProps;
  disabled?: ButtonProps['disabled'];
  fileList?: UploadProps['fileList'];
};

/**
 * 上传按钮组件
 *
 * @param
 */
const ProFormUploadButton: React.ForwardRefRenderFunction<any, ProFormDraggerProps> = (
  {
    fieldProps,
    name,
    action,
    accept,
    listType,
    title = '单击上传',
    max,
    icon = <UploadOutlined />,
    value,
    buttonProps,
    onChange,
    disabled,
    proFieldProps,
    fileList,
  },
  ref,
) => {
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
      fileList={fileList ?? value}
      {...fieldProps}
      onChange={(info) => {
        onChange?.(info);
        if (fieldProps?.onChange) {
          fieldProps?.onChange(info);
        }
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

export default createField<ProFormDraggerProps>(React.forwardRef(ProFormUploadButton), {
  getValueFromEvent: (value: { fileList: UploadProps['fileList'] }) => value.fileList,
});
