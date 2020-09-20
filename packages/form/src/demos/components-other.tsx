import React from 'react';

import { Form, Radio } from 'antd';
import ProForm, {
  ProFormSwitch,
  ProFormText,
  ProFormRadio,
  ProFormCheckbox,
  ProFormRate,
  ProFormDatePicker,
  ProFormSelect,
  ProFormDigit,
  ProFormDateTimePicker,
  ProFormSlider,
  ProFormDateTimeRangePicker,
  ProFormDateRangePicker,
  ProFormUploadButton,
  ProFormUploadDragger,
} from '@ant-design/pro-form';

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
      }}
      onValuesChange={(_, values) => {
        console.log(values);
      }}
      onFinish={(value) => console.log(value)}
    >
      <ProFormText name="name" label="name" />
      <ProFormSelect
        name="select"
        label="Select"
        hasFeedback
        valueEnum={{
          china: 'China',
          usa: 'U.S.A',
        }}
        placeholder="Please select a country"
        rules={[{ required: true, message: 'Please select your country!' }]}
      />
      <ProFormSelect
        hasFeedback
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
        hasFeedback
        valueEnum={{
          red: 'Red',
          green: 'Green',
          blue: 'Blue',
        }}
        mode="multiple"
        placeholder="Please select favourite colors"
        rules={[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]}
      />
      <ProFormDigit label="InputNumber" name="input-number" min={1} max={10} />
      <ProFormSwitch name="switch" label="Switch" />
      <ProFormSlider
        name="slider"
        label="Slider"
        marks={{
          0: 'A',
          20: 'B',
          40: 'C',
          60: 'D',
          80: 'E',
          100: 'F',
        }}
      />
      <ProFormRadio.Group
        name="radio-group"
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
      <Form.Item name="radio-button" label="Radio.Button">
        <Radio.Group>
          <Radio.Button value="a">item 1</Radio.Button>
          <Radio.Button value="b">item 2</Radio.Button>
          <Radio.Button value="c">item 3</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <ProFormCheckbox.Group
        name="checkbox-group"
        label="Checkbox.Group"
        options={['A', 'B', 'C', 'D', 'E', 'F']}
      />
      <ProFormRate name="rate" label="Rate" />
      <ProFormUploadButton
        name="upload"
        label="Upload"
        max={2}
        action="/upload.do"
        extra="longgggggggggggggggggggggggggggggggggg"
      />
      <ProForm.Group title="日期相关分组">
        <ProFormDatePicker name="date" label="日期" />
        <ProFormDatePicker.Week name="dateWeek" label="周" />
        <ProFormDatePicker.Month name="dateMonth" label="月" />
        <ProFormDatePicker.Quarter name="dateQuarter" label="季度" />
        <ProFormDatePicker.Year name="dateYear" label="年" />
        <ProFormDateTimePicker name="dateTime" label="日期时间" />
        <ProFormDateRangePicker name="dateRange" label="日期区间" />
        <ProFormDateTimeRangePicker name="dateTimeRange" label="日期时间区间" />
      </ProForm.Group>
      <ProFormUploadDragger max={4} label="Dragger" name="dragger" />
    </ProForm>
  </div>
);

export default Demo;
