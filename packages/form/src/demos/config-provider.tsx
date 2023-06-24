import { SmileOutlined } from '@ant-design/icons';
import {
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
} from '@ant-design/pro-components';
import { ConfigProvider, Input } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import { LightWrapper } from '../BaseForm/LightWrapper';

export default () => (
  <ConfigProvider locale={enUS}>
    <StepsForm>
      <StepsForm.StepForm title="新建">
        <ProFormText name="name" />
      </StepsForm.StepForm>
    </StepsForm>

    <ProForm
      name="validate_other"
      initialValues={{
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
        range: 5,
        name: 'qixian',
      }}
      onFinish={async (value) => console.log(value)}
    >
      <ProFormUploadButton
        name="upload"
        icon={<SmileOutlined />}
        label="Upload"
        title="点击上传"
        action="/upload.do"
        extra="longgggggggggggggggggggggggggggggggggg"
      />
      <ProFormRadio name="test" />
      <ProFormCheckbox name="test2" />
      <ProFormSwitch width="lg" label="是否打开" />
      <ProFormUploadDragger
        title="拖动上传"
        icon={<SmileOutlined />}
        description="支持 text"
        label="Dragger"
        name="dragger"
        fieldProps={{
          showUploadList: true,
        }}
      />
      <LightWrapper valuePropName="value">test</LightWrapper>
      <LightWrapper valuePropName="value">test</LightWrapper>
      <ProFormSlider name="range" label="范围" />
      <ProFormField>test</ProFormField>
      <ProFormField>
        <Input />
      </ProFormField>
    </ProForm>
  </ConfigProvider>
);
