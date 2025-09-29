import {
  ProForm,
  ProFormCascader,
  ProFormCheckbox,
  ProFormColorPicker,
  ProFormDigit,
  ProFormDigitRange,
  ProFormGroup,
  ProFormRadio,
  ProFormRate,
  ProFormSegmented,
  ProFormSelect,
  ProFormSlider,
  ProFormSwitch,
  ProFormText,
  ProFormUploadButton,
  ProFormUploadDragger,
} from '@xxlabs/pro-components';
import { Switch } from 'antd';
import Mock from 'mockjs';
import { useState } from 'react';

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Demo = () => {
  const [readonly, setReadonly] = useState(false);
  return (
    <div
      style={{
        padding: 24,
      }}
    >
      <Switch
        checked={readonly}
        checkedChildren="Edit"
        style={{
          marginBlockEnd: 16,
        }}
        unCheckedChildren="Read Only"
        onChange={setReadonly}
      />
      <ProForm
        initialValues={{
          name: 'qixian',
          password: '1ixian',
          select: 'china',
          select2: '520000201604258831',
          useMode: { label: 'Unresolved', value: 'open', key: 'open' },
          'select-multiple': ['green', 'blue'],
          radio: 'a',
          'radio-vertical': 'b',
          'radio-button': 'b',
          'checkbox-group': ['A', 'B', 'C'],
          'input-number-range': [2, 4],
          'input-number': 3,
          switch: true,
          slider: 66,
          rate: 3.5,
          segmented: 'open',
          segmented2: 'open',
        }}
        name="validate_other"
        readonly={readonly}
        onFinish={async (value) => console.log(value)}
        onValuesChange={(_, values) => {
          console.log(values);
        }}
      >
        <ProFormGroup title="Text Types">
          <ProFormText label="Name" name="name" width="md" />
          <ProFormText.Password label="Password" name="password" width="md" />
        </ProFormGroup>
        <ProFormGroup
          collapsible
          style={{
            gap: '0 32px',
          }}
          title="Selection Types"
        >
          <ProFormSelect
            label="Select"
            name="select"
            placeholder="Please select a country"
            rules={[{ required: true, message: 'Please select your country!' }]}
            valueEnum={{
              china: 'China',
              usa: 'U.S.A',
            }}
          />
          <ProFormSelect
            showSearch
            debounceTime={300}
            label="Select with Search"
            name="select2"
            placeholder="Please select a country"
            request={async ({ keyWords }) => {
              await waitTime(100);
              console.log(
                Mock.mock({
                  'data|1-10': [
                    {
                      value: '@id',
                      label: '@name',
                    },
                  ],
                }).data.concat({
                  value: keyWords,
                  label: 'Target',
                }),
              );
              return Mock.mock({
                'data|1-10': [
                  {
                    value: '@id',
                    label: '@name',
                  },
                ],
              }).data.concat([
                {
                  value: keyWords,
                  label: 'Target',
                },
                { value: '520000201604258831', label: 'Patricia Lopez' },
                { value: '520000198509222123', label: 'Jose Martinez' },
                { value: '210000200811194757', label: 'Elizabeth Thomas' },
                { value: '530000198808222758', label: 'Scott Anderson' },
                { value: '500000198703236285', label: 'George Jackson' },
                { value: '610000199906148074', label: 'Linda Hernandez' },
                { value: '150000197210168659', label: 'Sandra Hall' },
                { label: 'Target' },
              ]);
            }}
            rules={[{ required: true, message: 'Please select your country!' }]}
          />
          <ProFormSelect
            fieldProps={{
              labelInValue: true,
            }}
            label="Contract Agreed Effective Method"
            name="useMode"
            request={async () => [
              { label: 'All', value: 'all' },
              { label: 'Unresolved', value: 'open' },
              { label: 'Resolved', value: 'closed' },
              { label: 'In Progress', value: 'processing' },
            ]}
            width="md"
          />
          <ProFormSelect
            fieldProps={{
              mode: 'multiple',
            }}
            label="Select[multiple]"
            name="select-multiple"
            placeholder="Please select favorite colors"
            rules={[
              {
                required: true,
                message: 'Please select your favorite colors!',
                type: 'array',
              },
            ]}
            valueEnum={{
              red: 'Red',
              green: 'Green',
              blue: 'Blue',
            }}
          />
          <ProFormCascader
            fieldProps={{
              changeOnSelect: true,
            }}
            label="Address"
            name="area"
            request={async () => [
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                      {
                        value: 'xihu',
                        label: 'West Lake',
                      },
                    ],
                  },
                ],
              },
              {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                  {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                      {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                      },
                    ],
                  },
                ],
              },
            ]}
          />

          <ProFormRadio.Group
            label="Radio.Group"
            name="radio"
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
            label="Radio.Group"
            layout="vertical"
            name="radio-vertical"
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
            label="Radio.Button"
            name="radio-button"
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
            radioType="button"
          />
          <ProFormCheckbox.Group
            label="Checkbox.Group"
            name="checkbox-group"
            options={['A', 'B', 'C', 'D', 'E', 'F']}
          />
          <ProFormColorPicker label="Color Picker" name="color" />
        </ProFormGroup>
        <ProFormGroup label="Number Types">
          <ProFormDigitRange
            label="InputNumberRange"
            name="input-number-range"
            placeholder={['Min', 'Max']}
            separator="-"
            separatorWidth={60}
          />
          <ProFormDigit label="InputNumber" max={10} min={1} name="input-number" width="sm" />
          <ProFormSwitch label="Switch" name="switch" />
          <ProFormSlider
            label="Slider"
            marks={{
              0: 'A',
              20: 'B',
              40: 'C',
              60: 'D',
              80: 'E',
              100: 'F',
            }}
            name="slider"
            width="lg"
          />
          <ProFormRate label="Rate" name="rate" />
          <ProFormUploadButton label="Upload" name="pic" />
          <ProFormUploadDragger label="Drag and Drop Upload" name="drag-pic" />
          <ProFormSegmented
            label="Segmented Control"
            name="segmented"
            valueEnum={{
              open: 'Unresolved',
              closed: 'Resolved',
            }}
          />
          <ProFormSegmented
            label="Segmented Control - Remote Data"
            name="segmented2"
            request={async () => [
              { label: 'All', value: 'all' },
              { label: 'Unresolved', value: 'open' },
              { label: 'Resolved', value: 'closed' },
              { label: 'In Progress', value: 'processing' },
            ]}
          />
        </ProFormGroup>
      </ProForm>
    </div>
  );
};

export default Demo;
