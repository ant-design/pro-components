import React from 'react';
import { Upload } from 'antd';
import { DraggerProps, UploadProps } from 'antd/lib/upload';
import { InboxOutlined } from '@ant-design/icons';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

export type ProFormDraggerProps = ProFormItemProps<DraggerProps> & {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  action?: UploadProps['action'];
  accept?: UploadProps['accept'];
  description?: React.ReactNode;
  /**
   * 最大文件个数
   */
  max?: number;
  value?: UploadProps['fileList'];
  onChange?: UploadProps['onChange'];
};

/**
 * 拖动上传组件
 * @param
 */
const ProFormUploadDragger: React.FC<ProFormDraggerProps> = React.forwardRef(
  (
    {
      fieldProps,
      title = '单击或拖动文件到此区域进行上传',
      icon = <InboxOutlined />,
      description = '支持单次或批量上传',
      action,
      accept,
      onChange,
      value,
      children,
      max,
    },
    ref: any,
  ) => {
    // 如果配置了 max ，并且 超过了文件列表的大小，就不展示按钮
    const showUploadButton = max === undefined || !value || value?.length < max;
    return (
      <Upload.Dragger
        // @ts-ignore
        ref={ref}
        name="files"
        action={action}
        accept={accept}
        onChange={(info) => {
          if (onChange) {
            onChange(info);
          }
          if (fieldProps?.onChange) {
            fieldProps?.onChange(info);
          }
        }}
        fileList={value}
        {...fieldProps}
        style={{ ...fieldProps?.style, display: !showUploadButton ? 'none' : undefined }}
      >
        <p className="ant-upload-drag-icon">{icon}</p>
        <p className="ant-upload-text">{title}</p>
        <p className="ant-upload-hint">{description}</p>
        {children}
      </Upload.Dragger>
    );
  },
);

export default createField<ProFormDraggerProps>(ProFormUploadDragger, {
  getValueFromEvent: (value: { fileList: UploadProps['fileList'] }) => value.fileList,
});
