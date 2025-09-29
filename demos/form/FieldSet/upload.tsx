import { ProForm, ProFormUploadButton, ProFormUploadDragger } from '@xxlabs/pro-components';

export default () => {
  return (
    <ProForm>
      <ProFormUploadButton
        action="/upload.do"
        extra="extra"
        fieldProps={{
          name: 'file',
        }}
        label="Upload"
        max={2}
        name="upload"
        title="上传按钮的文本变啦"
      />
      <ProFormUploadButton
        action="/upload.do"
        extra="extra"
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
        }}
        label="Upload"
        max={2}
        name="upload"
      />
      <ProFormUploadDragger label="Dragger" max={4} name="dragger" />
    </ProForm>
  );
};
