import {
  ProForm,
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
} from '@ant-design/pro-components';
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
        style={{
          marginBlockEnd: 16,
        }}
        checked={readonly}
        checkedChildren="编辑"
        unCheckedChildren="只读"
        onChange={setReadonly}
      />
      <ProForm
        readonly={readonly}
        name="validate_other"
        initialValues={{
          name: 'qixian',
          password: '1ixian',
          select: 'china',
          select2: '520000201604258831',
          useMode: { label: '未解决', value: 'open', key: 'open' },
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
        onValuesChange={(_, values) => {
          console.log(values);
        }}
        onFinish={async (value) => console.log(value)}
      >
        <ProFormGroup title="文本类">
          <ProFormText width="md" name="name" label="name" />
          <ProFormText.Password width="md" name="password" label="password" />
        </ProFormGroup>
        <ProFormGroup
          title="选择类"
          collapsible
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
                  label: '目标_target',
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
                  label: '目标_target',
                },
                { value: '520000201604258831', label: 'Patricia Lopez' },
                { value: '520000198509222123', label: 'Jose Martinez' },
                { value: '210000200811194757', label: 'Elizabeth Thomas' },
                { value: '530000198808222758', label: 'Scott Anderson' },
                { value: '500000198703236285', label: 'George Jackson' },
                { value: '610000199906148074', label: 'Linda Hernandez' },
                { value: '150000197210168659', label: 'Sandra Hall' },
                { label: '目标_target' },
              ]);
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
              {
                required: true,
                message: 'Please select your favorite colors!',
                type: 'array',
              },
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
          <ProFormColorPicker label="颜色选择" name="color" />
        </ProFormGroup>
        <ProFormGroup label="数字类">
          <ProFormDigitRange
            label="InputNumberRange"
            name="input-number-range"
            separator="-"
            placeholder={['最小值', '最大值']}
            separatorWidth={60}
          />
          <ProFormDigit
            label="InputNumber"
            name="input-number"
            width="sm"
            min={1}
            max={10}
          />
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
          <ProFormUploadButton name="pic" label="上传" />
          <ProFormUploadDragger name="drag-pic" label="拖拽上传" />
          <ProFormSegmented
            name="segmented"
            label="分段控制器"
            valueEnum={{
              open: '未解决',
              closed: '已解决',
            }}
          />
          <ProFormSegmented
            name="segmented2"
            label="分段控制器-远程数据"
            request={async () => [
              { label: '全部', value: 'all' },
              { label: '未解决', value: 'open' },
              { label: '已解决', value: 'closed' },
              { label: '解决中', value: 'processing' },
            ]}
          />
        </ProFormGroup>
      </ProForm>
    </div>
  );
};

export default Demo;
