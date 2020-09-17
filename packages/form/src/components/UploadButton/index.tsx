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
  max?: number;
  value?: UploadProps['fileList'];
  onChange?: UploadProps['onChange'];
};

/**
 * 上传按钮组件
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
    onChange,
  },
  ref,
) => {
  // 如果配置了 max ，并且 超过了文件列表的大小，就不展示按钮
  const showUploadButton = max === undefined || !value || value?.length < max;
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
        <Button>
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
