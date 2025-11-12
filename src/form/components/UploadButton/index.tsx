import { UploadOutlined } from '@ant-design/icons';
import type {
  ButtonProps,
  GetProp,
  ImageProps,
  UploadFile,
  UploadProps,
} from 'antd';
import { Button, Image, Upload } from 'antd';
import React, { useContext, useMemo, useState } from 'react';
import { EditOrReadOnlyContext } from '../../BaseForm/EditOrReadOnlyContext';
import type { ProFormFieldItemProps } from '../../typing';
import warpField from '../FormItem/warpField';

type PickUploadProps = Pick<
  UploadProps<any>,
  'listType' | 'action' | 'accept' | 'fileList' | 'onChange'
>;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
export type ProFormUploadButtonProps = ProFormFieldItemProps<
  UploadProps<any>,
  HTMLElement
> & {
  /**
   * @name  上传文件的图标
   * @default UploadOutlined
   *
   * @example 改成笑脸图标  icon={<SmileOutlined/>}
   */
  icon?: React.ReactNode;
  /**
   * @name 按钮文字
   * @default 单击上传
   *
   * @example  title="上传"
   * @example  title={<div>上传</div>}
   */
  title?: React.ReactNode;
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
  /**
   * @name 上传按钮的配置
   *
   * @example 按钮修改为主色 buttonProps={{ type:"primary" }}
   */
  buttonProps?: ButtonProps;

  /**
   * @name 是否禁用按钮
   * @example  disabled={true}
   */
  disabled?: ButtonProps['disabled'];
  /**
   * @name 图片预览组件的配置
   * @example imageProps={{ preview: { toolbarRender: () => null } }}
   */
  imageProps?: Omit<ImageProps, 'src'>;
} & PickUploadProps;
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
/**
 * 上传按钮组件
 *
 * @param
 */
const BaseProFormUploadButton: React.FC<ProFormUploadButtonProps> =
  React.forwardRef(
    (
      {
        fieldProps,
        action,
        accept,
        listType,
        title = '单击上传',
        max,
        icon = <UploadOutlined />,
        buttonProps,
        disabled,
        proFieldProps,
        imageProps,
        ...restProps
      },
      ref,
    ) => {
      const [previewOpen, setPreviewOpen] = useState(false);
      const [previewImage, setPreviewImage] = useState('');
      const value = useMemo(() => {
        return restProps.fileList ?? restProps.value;
      }, [restProps.fileList, restProps.value]);
      const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
      };
      const modeContext = useContext(EditOrReadOnlyContext);
      const mode = proFieldProps?.mode || modeContext.mode || 'edit';

      // 如果配置了 max ，并且 超过了文件列表的大小，就不展示按钮
      const showUploadButton =
        (max === undefined || !value || value?.length < max) && mode !== 'read';
      const isPictureCard =
        (listType ?? fieldProps?.listType) === 'picture-card';
      return (
        <>
          <Upload
            action={action}
            accept={accept}
            ref={ref}
            listType={listType || 'picture'}
            fileList={value}
            onPreview={handlePreview}
            {...fieldProps}
            name={fieldProps?.name ?? 'file'}
            onChange={(info) => {
              fieldProps?.onChange?.(info);
            }}
          >
            {showUploadButton &&
              (isPictureCard ? (
                <span>
                  {icon} {title}
                </span>
              ) : (
                <Button
                  disabled={disabled || fieldProps?.disabled}
                  {...buttonProps}
                >
                  {icon}
                  {title}
                </Button>
              ))}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: 'none' }}
              {...imageProps}
              preview={{
                open: previewOpen,
                onOpenChange: (open: boolean) => setPreviewOpen(open),
                afterOpenChange: (open: boolean) =>
                  !open && setPreviewImage(''),
                ...((imageProps?.preview as any) || {}),
              }}
              src={previewImage}
            />
          )}
        </>
      );
    },
  );

const ProFormUploadButton = warpField<ProFormUploadButtonProps>?.(
  BaseProFormUploadButton,
  {
    getValueFromEvent: (value: { fileList: UploadProps['fileList'] }) =>
      value.fileList,
  },
) as typeof BaseProFormUploadButton;

export default ProFormUploadButton;
