import { SmileOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormCheckbox,
  ProFormField,
  ProFormRadio,
  ProFormSlider,
  ProFormSwitch,
  ProFormUploadButton,
  ProFormUploadDragger,
} from '@xxlabs/pro-components';
import { Button, Input } from 'antd';
import { useRef } from 'react';

const Demo = () => {
  const formRef = useRef(undefined);
  return (
    <ProForm
      formRef={formRef}
      initialValues={{
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
        range: 5,
        name: 'qixian',
      }}
      name="validate_other"
      onFinish={async (value) => console.log(value)}
    >
      <ProFormUploadButton
        action="/upload.do"
        extra="longgggggggggggggggggggggggggggggggggg"
        icon={<SmileOutlined />}
        label="Upload"
        name="upload"
        title="点击上传"
      />
      <ProFormRadio name="test" />
      <ProFormCheckbox name="test2" />
      <ProFormSwitch label="是否打开" width="lg" />
      <ProFormUploadDragger
        description="支持 text"
        fieldProps={{
          showUploadList: true,
        }}
        icon={<SmileOutlined />}
        label="Dragger"
        name="dragger"
        title="拖动上传"
      />
      <ProFormSlider label="范围" name="range" />
      <ProFormField>test</ProFormField>
      <ProFormField>
        <Input />
      </ProFormField>
      <ProForm.Item>
        <Button>查看记录数</Button>
        <span>共有200条</span>
      </ProForm.Item>
    </ProForm>
  );
};

export default Demo;
