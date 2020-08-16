import React from 'react';
import { Form, Upload, Button } from 'antd';
import { UploadProps } from 'antd/lib/upload';
import { InboxOutlined } from '@ant-design/icons';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

export type ProFormDraggerProps = ProFormItemProps<UploadProps> & {
  value?: UploadProps['fileList'];
  icon?: React.ReactNode;
  title?: React.ReactNode;
  listType?: UploadProps['listType'];
};

/**
 * 上传按钮组件
 * @param
 */
const ProFormUploadDragger: React.ForwardRefRenderFunction<any, ProFormDraggerProps> = (
  {
    value,
    fieldProps,
    name,
    listType,
    title = '单击上传',
    icon = <InboxOutlined />,
    label,
    ...restProps
  },
  ref,
) => {
  return (
    <Form.Item>
      <Form.Item valuePropName="fileList" {...restProps} noStyle>
        <Upload ref={ref} name="fileList" listType={listType} {...fieldProps}>
          <Button>
            {icon}
            {title}
          </Button>
        </Upload>
      </Form.Item>
    </Form.Item>
  );
};

export default createField<ProFormDraggerProps>(React.forwardRef(ProFormUploadDragger));
