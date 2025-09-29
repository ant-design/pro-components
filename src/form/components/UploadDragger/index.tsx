import { InboxOutlined } from '@ant-design/icons';
import { ConfigProvider, Upload } from 'antd';
import type { DraggerProps, UploadProps } from 'antd/es/upload';
import React, { useContext } from 'react';
import { EditOrReadOnlyContext } from '../../BaseForm/EditOrReadOnlyContext';
import type { ProFormFieldItemProps } from '../../typing';
import warpField from '../FormItem/warpField';

export type ProFormUploadDraggerProps = ProFormFieldItemProps<DraggerProps> & {
  /**
   * @name  上传文件块的图标
   * @default UploadOutlined
   *
   * @example 改成笑脸图标  icon={<SmileOutlined/>}
   */
  icon?: React.ReactNode;
  /**
   * @name 上传文件块的标题
   * @default 单击或拖动文件到此区域进行上传
   *
   * @example  title="上传"
   * @example  title={<div>上传</div>}
   */
  title?: React.ReactNode;
  /**
   * @name 上传文件块的说明，比标题小一点，但是字数可以更多
   * @default 支持单次或批量上传
   *
   * @example  description="支持xxx文件"
   * @example  description={<div>支持xxx文件</div>}
   */
  description?: React.ReactNode;
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
  onChange?: UploadProps['onChange'];
  action?: UploadProps['action'];
  accept?: UploadProps['accept'];
};

/**
 * 拖动上传组件
 *
 * @param
 */
const BaseProFormUploadDragger: React.FC<ProFormUploadDraggerProps> = ({
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
  ref,
}) => {
  const context = useContext(ConfigProvider.ConfigContext);
  const modeContext = useContext(EditOrReadOnlyContext);
  const mode = proFieldProps?.mode || modeContext.mode || 'edit';

  const baseClassName = context.getPrefixCls('upload');
  // 如果配置了 max ，并且 超过了文件列表的大小，就不展示按钮
  const showUploadButton =
    (max === undefined || !value || value?.length < max) && mode !== 'read' && proFieldProps?.readonly !== true;
  return (
    <Upload.Dragger
      // @ts-ignore
      ref={ref}
      accept={accept}
      action={action}
      fileList={value}
      name="files"
      {...fieldProps}
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        ...fieldProps?.style,
        display: !showUploadButton ? 'none' : fieldProps?.style?.display || 'flex',
      }}
      onChange={(info) => {
        onChange?.(info);
        if (fieldProps?.onChange) {
          fieldProps?.onChange(info);
        }
      }}
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
};

const ProFormUploadDragger = warpField<ProFormUploadDraggerProps>?.(BaseProFormUploadDragger, {
  getValueFromEvent: (value: { fileList: UploadProps['fileList'] }) => value.fileList,
});

export default ProFormUploadDragger;
