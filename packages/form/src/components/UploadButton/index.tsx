import React from 'react';
import type { UploadProps, ButtonProps } from 'antd';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { ProFormItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

export type ProFormDraggerProps = ProFormItemProps<UploadProps> & {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  listType?: UploadProps['listType'];
  action?: UploadProps['action'];
  accept?: UploadProps['accept'];
  max?: number;
  value?: UploadProps['fileList'];
  onChange?: UploadProps['onChange'];
  buttonProps?: ButtonProps;
  disabled?: ButtonProps['disabled'];
};

/**
 * 上传按钮组件
 *
 * @param
 */
const ProFormUploadButton: React.ForwardRefRenderFunction<any, ProFormDraggerProps> = (
  {
    fieldProps,
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
  },
  ref,
) => {
  // 如果配置了 max ，并且 超过了文件列表的大小，就不展示按钮
  const showUploadButton =
    (max === undefined || !value || value?.length < max) && proFieldProps?.mode !== 'read';
  return (
    <Upload
      action={action}
      accept={accept}
      ref={ref}
      name="fileList"
      listType={listType || 'picture'}
      fileList={value}
      {...fieldProps}
      onChange={(info) => {
        if (onChange) {
          onChange(info);
        }
        if (fieldProps?.onChange) {
          fieldProps?.onChange(info);
        }
      }}
    >
      {showUploadButton && (
        <Button disabled={disabled || fieldProps?.disabled} {...buttonProps}>
          {icon}
          {title}
        </Button>
      )}
    </Upload>
  );
};

export default createField<ProFormDraggerProps>(React.forwardRef(ProFormUploadButton), {
  getValueFromEvent: (value: { fileList: UploadProps['fileList'] }) => value.fileList,
});
