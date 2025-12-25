import {
  ProForm,
  ProFormUploadButton,
  ProFormUploadDragger,
} from '@ant-design/pro-components';

export default () => {
  return (
    <div style={{ padding: 24 }}>

    <ProForm>
      <ProFormUploadButton
        title="上传按钮的文本变啦"
        name="upload"
        label="Upload"
        max={2}
        fieldProps={{
          name: 'file',
        }}
        action="/upload.do"
        extra="extra"
      />
      <ProFormUploadButton
        name="upload"
        label="Upload"
        max={2}
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
        }}
        action="/upload.do"
        extra="extra"
      />
      <ProFormUploadDragger max={4} label="Dragger" name="dragger" />
    </ProForm>
  
    </div>
  );
};
