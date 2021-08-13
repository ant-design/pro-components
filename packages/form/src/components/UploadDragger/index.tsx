import React, { useContext } from 'react';
import { Upload, ConfigProvider } from 'antd';
import type { DraggerProps, UploadProps } from 'antd/lib/upload';
import { InboxOutlined } from '@ant-design/icons';
import type { ProFormFieldItemProps } from '../../interface';
import createField from '../../BaseForm/createField';

export type ProFormDraggerProps = ProFormFieldItemProps<DraggerProps> & {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  action?: UploadProps['action'];
  accept?: UploadProps['accept'];
  description?: React.ReactNode;
  /** 最大文件个数 */
  max?: number;
  value?: UploadProps['fileList'];
  onChange?: UploadProps['onChange'];
};

/**
 * 拖动上传组件
 *
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
      proFieldProps,
    },
    ref: any,
  ) => {
    const context = useContext(ConfigProvider.ConfigContext);
    const baseClassName = context.getPrefixCls('upload');
    // 如果配置了 max ，并且 超过了文件列表的大小，就不展示按钮
    const showUploadButton =
      (max === undefined || !value || value?.length < max) && proFieldProps?.mode !== 'read';
    return (
      <Upload.Dragger
        // @ts-ignore
        ref={ref}
        name="files"
        action={action}
        accept={accept}
        fileList={value}
        {...fieldProps}
        onChange={(info) => {
          onChange?.(info);
          if (fieldProps?.onChange) {
            fieldProps?.onChange(info);
          }
        }}
        style={{ ...fieldProps?.style, display: !showUploadButton ? 'none' : undefined }}
      >
        <p className={`${baseClassName}-drag-icon`}>{icon}</p>
        <p className={`${baseClassName}-text`}>{title}</p>
        <p className={`${baseClassName}-hint`}>{description}</p>
        {children ? (
          <div
            className={`${baseClassName}-extra`}
            style={{
              padding: 16,
            }}
          >
            {children}
          </div>
        ) : null}
      </Upload.Dragger>
    );
  },
);

export default createField<ProFormDraggerProps>(ProFormUploadDragger, {
  getValueFromEvent: (value: { fileList: UploadProps['fileList'] }) => value.fileList,
});
