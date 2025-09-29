import { SmileOutlined } from '@ant-design/icons';
import {
  LightWrapper,
  ProForm,
  ProFormCheckbox,
  ProFormField,
  ProFormRadio,
  ProFormSlider,
  ProFormSwitch,
  ProFormText,
  ProFormUploadButton,
  ProFormUploadDragger,
  StepsForm,
} from '@xxlabs/pro-components';
import { ConfigProvider, Input } from 'antd';
import enUS from 'antd/es/locale/en_US';

export default () => (
  <ConfigProvider locale={enUS}>
    <StepsForm>
      <StepsForm.StepForm title="新建">
        <ProFormText name="name" />
      </StepsForm.StepForm>
    </StepsForm>

    <ProForm
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
      <LightWrapper valuePropName="value">test</LightWrapper>
      <LightWrapper valuePropName="value">test</LightWrapper>
      <ProFormSlider label="范围" name="range" />
      <ProFormField>test</ProFormField>
      <ProFormField>
        <Input />
      </ProFormField>
    </ProForm>
  </ConfigProvider>
);
