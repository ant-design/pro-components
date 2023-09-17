import {
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDateTimePicker,
  ProFormDateTimeRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormFieldSet,
  ProFormList,
  ProFormRadio,
  ProFormRate,
  ProFormSelect,
  ProFormSlider,
  ProFormSwitch,
  ProFormText,
  ProFormTimePicker,
  ProFormUploadButton,
  ProFormUploadDragger,
} from '@ant-design/pro-components';

const options = [
  {
    id: 1,
    label: '测试测试1',
    value: 1,
  },
  {
    id: 2,
    label: '测试测试2',
    value: 2,
  },
  {
    id: 3,
    label: '测试测试3',
    value: 3,
  },
  {
    id: 4,
    label: '测试测试4',
    value: 4,
  },
  {
    id: 5,
    label: '测试测试5',
    value: 5,
  },
  {
    id: 6,
    label: '测试测试6',
    value: 6,
  },
  {
    id: 7,
    label: '测试测试7',
    value: 7,
  },
  {
    id: 8,
    label: '测试测试8',
    value: 8,
  },
  {
    id: 9,
    label: '测试测试9',
    value: 9,
  },
  {
    id: 10,
    label: '测试测试10',
    value: 10,
  },
  {
    id: 11,
    label: '测试测试11',
    value: 11,
  },
  {
    id: 12,
    label: '测试测试12',
    value: 12,
  },
];

const Demo = () => (
  <div
    style={{
      padding: 24,
    }}
  >
    <ProForm
      readonly
      name="validate_other"
      initialValues={{
        'select-multiple': ['red', 'green'],
        'select-multiple2': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
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
        date: Date.now(),
        dateWeek: Date.now(),
        dateMonth: Date.now(),
        dateQuarter: Date.now(),
        dateYear: Date.now(),
        dateTime: Date.now(),
        time: '00:01:05',
        timeRange: ['05:00:00', '11:00:00'],
        dateTimeRange: [Date.now(), Date.now() - 1000 * 60 * 60 * 24],
        dateRange: [Date.now(), Date.now() - 1000 * 60 * 60 * 24],
      }}
      onValuesChange={(_, values) => {
        console.log(values);
      }}
      onFinish={async (value) => console.log(value)}
    >
      <ProForm.Group title="基础数据">
        <ProFormText
          width="md"
          name="name"
          label="name"
          fieldProps={{
            prefix: 'prefix',
            suffix: 'suffix',
          }}
        />
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
          width="md"
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
        <ProFormSelect
          name="select-multiple2"
          label="Select[multiple]"
          options={options}
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
        <ProFormDigit
          label="InputNumber"
          name="input-number"
          min={1}
          max={10}
        />
        <ProFormSwitch
          name="switch"
          label="Switch"
          unCheckedChildren="不同意"
          checkedChildren="同意"
        />
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
      </ProForm.Group>
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
      <ProForm.Group>
        <ProFormText hidden label="text1" />
        <ProFormText label="text2" />
      </ProForm.Group>
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
      <ProFormRate name="rate" label="Rate" />
      <ProFormUploadButton
        name="upload"
        label="Upload"
        max={2}
        action="/upload.do"
        extra="longgggggggggggggggggggggggggggggggggg"
      />
      <ProFormList
        name="textList"
        label="地址列表"
        initialValue={[
          {
            name: '张三',
            addr: '地址1',
          },
          {
            name: '李四',
            addr: '地址2',
          },
        ]}
      >
        <ProFormText name="name" label="姓名" />
        <ProFormText name="addr" label="地址" />
      </ProFormList>
      <ProFormFieldSet
        name="list"
        label="组件列表"
        transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
      >
        <ProFormText width="md" />
        -
        <ProFormText width="md" />
        -
        <ProFormText width="md" />
      </ProFormFieldSet>
      <ProFormUploadDragger max={4} label="Dragger" name="dragger" />

      <ProForm.Group title="日期相关分组">
        <ProFormDatePicker name="date" label="日期" />
        <ProFormDatePicker
          name="date"
          fieldProps={{
            format: 'YY-MM',
          }}
          label="年月"
        />
        <ProFormTimePicker name="time" label="时间" />
        <ProFormTimePicker.RangePicker name="timeRange" label="时间区间" />
        <ProFormDatePicker.Week name="dateWeek" label="周" />
        <ProFormDatePicker.Month name="dateMonth" label="月" />
        <ProFormDatePicker.Quarter name="dateQuarter" label="季度" />
        <ProFormDatePicker.Year name="dateYear" label="年" />
        <ProFormDateTimePicker
          name="dateTime"
          label="日期时间"
          fieldProps={{
            format: (value) => value.format('YYYY-MM-DD'),
          }}
        />
        <ProFormDateRangePicker name="dateRange" label="日期区间" />
        <ProFormDateTimeRangePicker name="dateTimeRange" label="日期时间区间" />
      </ProForm.Group>
      <ProForm.Group title="其他相关分组">
        <ProForm.Item label="互相依赖的表单">
          <ProFormDependency name={['list']}>
            {({ list }) => {
              return <div>{JSON.stringify(list, null, 2)}</div>;
            }}
          </ProFormDependency>
        </ProForm.Item>
        <ProFormFieldSet name="list" label="组件列表">
          <ProFormText width="md" />
          <ProFormSelect
            width="md"
            request={async () => [
              { label: '全部', value: 'all' },
              { label: '未解决', value: 'open' },
              { label: '已解决', value: 'closed' },
              { label: '解决中', value: 'processing' },
            ]}
            name="useMode"
            label="合同约定生效方式"
          />
          <ProFormText width="md" />
        </ProFormFieldSet>

        <ProFormFieldSet
          name="list"
          label="组件列表- Input.Group"
          type="group"
          rules={[
            {
              validator: (_, value) => {
                const [name, name1, name2] = value || [];
                if (!name) {
                  throw new Error('第一个值不能为空');
                }
                if (!name1) {
                  throw new Error('第二个值不能为空');
                }
                if (!name2) {
                  throw new Error('第三个值不能为空');
                }
              },
            },
          ]}
          transform={(value: any) => ({
            list: value,
            startTime: value[0],
            endTime: value[1],
          })}
        >
          <ProFormText width="md" />
          <ProFormText width="md" />
          <ProFormText width="md" />
        </ProFormFieldSet>

        <ProFormFieldSet
          name="list"
          label="组件列表"
          transform={(value: any) => ({
            list: value,
            startTime: value[0],
            endTime: value[1],
          })}
        >
          <ProFormText width="md" />
          -
          <ProFormText width="md" />
          -
          <ProFormText width="md" />
        </ProFormFieldSet>
      </ProForm.Group>
    </ProForm>
  </div>
);

export default Demo;
