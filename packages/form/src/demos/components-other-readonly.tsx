import React from 'react';
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
  ProFormFieldSet,
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
        'select-multiple': ['red', 'green'],
        useMode: 'all',
        switch: true,
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
        name: '蚂蚁金服有限公司',
        radio: 'a',
        list: ['1', '2', '3'],
        select: 'china',
        'radio-button': 'a',
        date: Date.now(),
        dateWeek: Date.now(),
        dateMonth: Date.now(),
        dateQuarter: Date.now(),
        dateYear: Date.now(),
        dateTime: Date.now(),
        dateTimeRange: [Date.now(), Date.now() - 1000 * 60 * 60 * 24],
        dateRange: [Date.now(), Date.now() - 1000 * 60 * 60 * 24],
        dragger: [
          {
            uid: '1',
            name: 'xxx.png',
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: 'https://gw.alipayobjects.com/zos/antfincdn/7%24YOiS6YIm/huaban.png',
          },
          {
            uid: '2',
            name: 'yyy.png',
            status: 'done',
            url: 'https://gw.alipayobjects.com/zos/antfincdn/7%24YOiS6YIm/huaban.png',
          },
          {
            uid: '3',
            name: 'zzz.png',
            status: 'error',
            response: 'Server Error 500', // custom error message to show
            url: 'https://gw.alipayobjects.com/zos/antfincdn/7%24YOiS6YIm/huaban.png',
          },
        ],
        upload: [
          {
            uid: '1',
            name: 'xxx.png',
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: 'https://gw.alipayobjects.com/zos/antfincdn/7%24YOiS6YIm/huaban.png',
          },
          {
            uid: '2',
            name: 'yyy.png',
            status: 'done',
            url: 'https://gw.alipayobjects.com/zos/antfincdn/7%24YOiS6YIm/huaban.png',
          },
          {
            uid: '3',
            name: 'zzz.png',
            status: 'error',
            response: 'Server Error 500', // custom error message to show
            url: 'https://gw.alipayobjects.com/zos/antfincdn/7%24YOiS6YIm/huaban.png',
          },
        ],
      }}
      onValuesChange={(_, values) => {
        console.log(values);
      }}
      onFinish={async (value) => console.log(value)}
    >
      <ProFormText readonly width="md" name="name" label="name" />
      <ProFormSelect
        name="select"
        readonly
        label="Select"
        valueEnum={{
          china: 'China',
          usa: 'U.S.A',
        }}
        placeholder="Please select a country"
        rules={[{ required: true, message: 'Please select your country!' }]}
      />
      <ProFormSelect
        width="md"
        readonly
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
        readonly
        valueEnum={{
          red: 'Red',
          green: 'Green',
          blue: 'Blue',
        }}
        fieldProps={{
          mode: 'multiple',
        }}
        placeholder="Please select favorite colors"
        rules={[{ required: true, message: 'Please select your favorite colors!', type: 'array' }]}
      />
      <ProFormDigit readonly label="InputNumber" name="input-number" min={1} max={10} />
      <ProFormSwitch
        readonly
        name="switch"
        label="Switch"
        unCheckedChildren="不同意"
        checkedChildren="同意"
      />
      <ProFormSlider
        readonly
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
        name="radio"
        readonly
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
        readonly
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
        readonly
        label="Checkbox.Group"
        options={['A', 'B', 'C', 'D', 'E', 'F']}
      />
      <ProFormRate readonly name="rate" label="Rate" />
      <ProFormUploadButton
        name="upload"
        label="Upload"
        readonly
        max={2}
        action="/upload.do"
        extra="longgggggggggggggggggggggggggggggggggg"
      />
      <ProFormFieldSet
        name="list"
        label="组件列表"
        readonly
        transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
      >
        <ProFormText width="md" readonly />
        -
        <ProFormText width="md" readonly />
        -
        <ProFormText width="md" readonly />
      </ProFormFieldSet>
      <ProForm.Group title="日期相关分组">
        <ProFormDatePicker readonly name="date" label="日期" />
        <ProFormDatePicker.Week readonly name="dateWeek" label="周" />
        <ProFormDatePicker.Month readonly name="dateMonth" label="月" />
        <ProFormDatePicker.Quarter readonly name="dateQuarter" label="季度" />
        <ProFormDatePicker.Year readonly name="dateYear" label="年" />
        <ProFormDateTimePicker readonly name="dateTime" label="日期时间" />
        <ProFormDateRangePicker readonly name="dateRange" label="日期区间" />
        <ProFormDateTimeRangePicker readonly name="dateTimeRange" label="日期时间区间" />
      </ProForm.Group>
      <ProFormUploadDragger readonly max={4} label="Dragger" name="dragger" />
    </ProForm>
  </div>
);

export default Demo;
