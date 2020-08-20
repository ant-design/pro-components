import React, { useRef } from 'react';

import { SmileOutlined } from '@ant-design/icons';
import ProForm, { ProFormUploadButton, ProFormUploadDragger } from '@ant-design/pro-form';

const Demo = () => {
  const formRef = useRef();
  return (
    <ProForm
      name="validate_other"
      initialValues={{
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
        name: 'qixian',
      }}
      // @ts-expect-error
      formRef={formRef}
      onFinish={(value) => console.log(value)}
    >
      <ProFormUploadButton
        name="upload"
        icon={<SmileOutlined />}
        label="Upload"
        title="点击上传"
        action="/upload.do"
        extra="longgggggggggggggggggggggggggggggggggg"
      />
      <ProFormUploadDragger
        title="拖动上传"
        icon={<SmileOutlined />}
        description="支持 text"
        label="Dragger"
        name="dragger"
      />
    </ProForm>
  );
};

export default Demo;
