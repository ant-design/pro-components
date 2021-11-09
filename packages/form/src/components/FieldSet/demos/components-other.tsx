import React from 'react';
import ProForm, {
  ProFormSwitch,
  ProFormText,
  ProFormRadio,
  ProFormCheckbox,
  ProFormRate,
  ProFormSelect,
  ProFormDigit,
  ProFormSlider,
  ProFormGroup,
} from '@ant-design/pro-form';
import Mock from 'mockjs';

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Demo = () => (
  <div
    style={{
      padding: 24,
    }}
  >
    <ProForm
      name="validate_other"
      initialValues={{
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
        name: 'qixian',
        radio: 'a',
        'radio-button': 'a',
      }}
      onValuesChange={(_, values) => {
        console.log(values);
      }}
      onFinish={async (value) => console.log(value)}
    >
      <ProFormGroup label="文本类">
        <ProFormText width="md" name="name" label="name" />
        <ProFormText.Password width="md" name="password" label="password" />
      </ProFormGroup>
      <ProFormGroup
        label="选择类"
        style={{
          gap: '0 32px',
        }}
      >
        <ProFormSelect
          name="select"
          label="Select"
          valueEnum={{
            china: 'China',
            usa: 'U.S.A',
          }}
          placeholder="Please select a country"
          rules={[{ required: true, message: 'Please select your country!' }]}
        />
        <ProFormSelect
          name="select2"
          label="支持搜索查询的 Select"
          showSearch
          debounceTime={300}
          request={async ({ keyWords }) => {
            await waitTime(1000);
            return Mock.mock({
              'data|1-10': [
                {
                  value: '@id',
                  label: '@name',
                },
              ],
            }).data.concat({
              value: keyWords,
              label: '目标_target',
            });
          }}
          placeholder="Please select a country"
          rules={[{ required: true, message: 'Please select your country!' }]}
        />
        <ProFormSelect
          width="md"
          fieldProps={{
            labelInValue: true,
          }}
          request={async () => [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ]}
          name="useMode"
          label="合同约定生效方式"
        />
        <ProFormSelect
          name="select-multiple"
          label="Select[multiple]"
          valueEnum={{
            red: 'Red',
            green: 'Green',
            blue: 'Blue',
          }}
          fieldProps={{
            mode: 'multiple',
          }}
          placeholder="Please select favorite colors"
          rules={[
            { required: true, message: 'Please select your favorite colors!', type: 'array' },
          ]}
        />

        <ProFormRadio.Group
          name="radio"
          label="Radio.Group"
          options={[
            {
              label: 'item 1',
              value: 'a',
            },
            {
              label: 'item 2',
              value: 'b',
            },
            {
              label: 'item 3',
              value: 'c',
            },
          ]}
        />
        <ProFormRadio.Group
          name="radio-vertical"
          layout="vertical"
          label="Radio.Group"
          options={[
            {
              label: 'item 1',
              value: 'a',
            },
            {
              label: 'item 2',
              value: 'b',
            },
            {
              label: 'item 3',
              value: 'c',
            },
          ]}
        />
        <ProFormRadio.Group
          name="radio-button"
          label="Radio.Button"
          radioType="button"
          options={[
            {
              label: 'item 1',
              value: 'a',
            },
            {
              label: 'item 2',
              value: 'b',
            },
            {
              label: 'item 3',
              value: 'c',
            },
          ]}
        />
        <ProFormCheckbox.Group
          name="checkbox-group"
          label="Checkbox.Group"
          options={['A', 'B', 'C', 'D', 'E', 'F']}
        />
      </ProFormGroup>
      <ProFormGroup label="数字类">
        <ProFormDigit label="InputNumber" name="input-number" width="sm" min={1} max={10} />
        <ProFormSwitch name="switch" label="Switch" />
        <ProFormSlider
          name="slider"
          label="Slider"
          width="lg"
          marks={{
            0: 'A',
            20: 'B',
            40: 'C',
            60: 'D',
            80: 'E',
            100: 'F',
          }}
        />
        <ProFormRate name="rate" label="Rate" />
      </ProFormGroup>
    </ProForm>
  </div>
);

export default Demo;
