import React from 'react';
import { Form, Upload } from 'antd';
import { DraggerProps } from 'antd/lib/upload';
import { InboxOutlined } from '@ant-design/icons';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

export type ProFormDraggerProps = ProFormItemProps<DraggerProps> & {
  value?: DraggerProps['fileList'];
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

/**
 * 拖动上传组件
 * @param
 */
const ProFormUploadDragger: React.ForwardRefRenderFunction<any, ProFormDraggerProps> = (
  {
    value,
    fieldProps,
    title = '单击或拖动文件到此区域进行上传',
    icon = <InboxOutlined />,
    description = '支持单次或批量上传',
    label,
    children,
    ...restProps
  },
  ref,
) => {
  return (
    <Form.Item {...restProps}>
      <Form.Item name={restProps.name} valuePropName="fileList" noStyle>
        <Upload.Dragger name="files" {...fieldProps} ref={ref}>
          <p className="ant-upload-drag-icon">{icon}</p>
          <p className="ant-upload-text">{title}</p>
          <p className="ant-upload-hint">{description}</p>
          {children}
        </Upload.Dragger>
      </Form.Item>
    </Form.Item>
  );
};

export default createField<ProFormDraggerProps>(React.forwardRef(ProFormUploadDragger));
