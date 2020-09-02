import React from 'react';
import { Upload, Button } from 'antd';
import { UploadProps } from 'antd/lib/upload';
import { UploadOutlined } from '@ant-design/icons';
import { ProFormItemProps } from '../../interface';
import { createField } from '../../BaseForm';

export type ProFormDraggerProps = ProFormItemProps<UploadProps> & {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  listType?: UploadProps['listType'];
  action?: UploadProps['action'];
  accept?: UploadProps['accept'];
};

/**
 * 上传按钮组件
 * @param
 */
const ProFormUploadButton: React.ForwardRefRenderFunction<any, ProFormDraggerProps> = (
  { fieldProps, action, accept, listType, title = '单击上传', icon = <UploadOutlined /> },
  ref,
) => (
  <Upload
    action={action}
    accept={accept}
    ref={ref}
    name="fileList"
    listType={listType || 'picture'}
    {...fieldProps}
  >
    <Button>
      {icon}
      {title}
    </Button>
  </Upload>
);

export default createField<ProFormDraggerProps>(React.forwardRef(ProFormUploadButton), {
  valuePropName: 'files',
  getValueFromEvent: (value: { fileList: UploadProps['fileList'] }) => value.fileList,
});
