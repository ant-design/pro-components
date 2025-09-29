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
} from '@xxlabs/pro-components';

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
        list2: ['1', '2', '5', '5'],
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
      name="validate_other"
      onFinish={async (value) => console.log(value)}
      onValuesChange={(_, values) => {
        console.log(values);
      }}
    >
      <ProForm.Group title="基础数据">
        <ProFormText
          fieldProps={{
            prefix: 'prefix',
            suffix: 'suffix',
          }}
          label="name"
          name="name"
          width="md"
        />
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
          label="合同约定生效方式"
          name="useMode"
          request={async () => [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
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
        <ProFormSelect
          fieldProps={{
            mode: 'multiple',
          }}
          label="Select[multiple]"
          name="select-multiple2"
          options={options}
          placeholder="Please select favorite colors"
          rules={[
            {
              required: true,
              message: 'Please select your favorite colors!',
              type: 'array',
            },
          ]}
        />
        <ProFormDigit label="InputNumber" max={10} min={1} name="input-number" />
        <ProFormSwitch checkedChildren="同意" label="Switch" name="switch" unCheckedChildren="不同意" />
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
        />
      </ProForm.Group>
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
      <ProForm.Group>
        <ProFormText hidden label="text1" />
        <ProFormText label="text2" />
      </ProForm.Group>
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
      <ProFormCheckbox.Group label="Checkbox.Group" name="checkbox-group" options={['A', 'B', 'C', 'D', 'E', 'F']} />
      <ProFormRate label="Rate" name="rate" />
      <ProFormUploadButton
        action="/upload.do"
        extra="longgggggggggggggggggggggggggggggggggg"
        label="Upload"
        max={2}
        name="upload"
      />
      <ProFormList
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
        label="地址列表"
        name="textList"
      >
        <ProFormText label="姓名" name="name" />
        <ProFormText label="地址" name="addr" />
      </ProFormList>
      <ProFormFieldSet
        label="组件列表"
        name="list"
        transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
      >
        <ProFormText width="md" />
        -
        <ProFormText width="md" />
        -
        <ProFormText width="md" />
      </ProFormFieldSet>

      <ProFormFieldSet
        label="组件列表自动增加"
        name="list2"
        transform={(value: any) => ({ startTime: value[0], endTime: value[1] })}
      >
        {(value) => {
          return value?.map((e, index) => {
            return (
              <ProFormText
                key={index}
                fieldProps={{
                  value: e,
                }}
                width="md"
              />
            );
          });
        }}
      </ProFormFieldSet>
      <ProFormUploadDragger label="Dragger" max={4} name="dragger" />

      <ProForm.Group title="日期相关分组">
        <ProFormDatePicker label="日期" name="date" />
        <ProFormDatePicker
          fieldProps={{
            format: 'YY-MM',
          }}
          label="年月"
          name="date"
        />
        <ProFormTimePicker label="时间" name="time" />
        <ProFormTimePicker.RangePicker label="时间区间" name="timeRange" />
        <ProFormDatePicker.Week label="周" name="dateWeek" />
        <ProFormDatePicker.Month label="月" name="dateMonth" />
        <ProFormDatePicker.Quarter label="季度" name="dateQuarter" />
        <ProFormDatePicker.Year label="年" name="dateYear" />
        <ProFormDateTimePicker
          fieldProps={{
            format: (value) => value.format('YYYY-MM-DD'),
          }}
          label="日期时间"
          name="dateTime"
        />
        <ProFormDateRangePicker label="日期区间" name="dateRange" />
        <ProFormDateTimeRangePicker label="日期时间区间" name="dateTimeRange" />
      </ProForm.Group>
      <ProForm.Group title="其他相关分组">
        <ProForm.Item label="互相依赖的表单">
          <ProFormDependency name={['list']}>
            {({ list }) => {
              return <div>{JSON.stringify(list, null, 2)}</div>;
            }}
          </ProFormDependency>
        </ProForm.Item>
        <ProFormFieldSet label="组件列表" name="list">
          <ProFormText width="md" />
          <ProFormSelect
            label="合同约定生效方式"
            name="useMode"
            request={async () => [
              { label: '全部', value: 'all' },
              { label: '未解决', value: 'open' },
              { label: '已解决', value: 'closed' },
              { label: '解决中', value: 'processing' },
            ]}
            width="md"
          />
          <ProFormText width="md" />
        </ProFormFieldSet>

        <ProFormFieldSet
          label="组件列表- Input.Group"
          name="list"
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
          type="group"
        >
          <ProFormText width="md" />
          <ProFormText width="md" />
          <ProFormText width="md" />
        </ProFormFieldSet>

        <ProFormFieldSet
          label="组件列表"
          name="list"
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
