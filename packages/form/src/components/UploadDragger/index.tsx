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
};

/**
 * 拖动上传组件
 * @param
 */
const ProFormUploadDragger: React.ForwardRefRenderFunction<any, ProFormDraggerProps> = ({
  fieldProps,
  title = '单击或拖动文件到此区域进行上传',
  icon = <InboxOutlined />,
  description = '支持单次或批量上传',
  action,
  accept,
  children,
}) => (
  <Upload.Dragger name="files" action={action} accept={accept} {...fieldProps}>
    <p className="ant-upload-drag-icon">{icon}</p>
    <p className="ant-upload-text">{title}</p>
    <p className="ant-upload-hint">{description}</p>
    {children}
  </Upload.Dragger>
);

export default createField<ProFormDraggerProps>(ProFormUploadDragger, {
  valuePropName: 'fileList',
  getValueFromEvent: (value: { fileList: UploadProps['fileList'] }) => value.fileList,
});
