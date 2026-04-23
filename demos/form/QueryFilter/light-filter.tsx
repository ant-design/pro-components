import { LightFilter, lightForm } from '@ant-design/pro-components';
import { Radio, Space, TreeSelect } from 'antd';
import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import dayjs from 'dayjs';
import React from 'react';

/** 树形选择数据 */
const treeData = [
  {
    title: '技术研发部',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: '前端开发组',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: '产品设计部',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: '产品策划组',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'UX 设计组',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: '用户研究组',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

/** 级联区域数据 */
const regionOptions = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖' },
          { value: 'binjiang', label: '滨江' },
        ],
      },
      {
        value: 'ningbo',
        label: '宁波',
        children: [
          { value: 'jiangbei', label: '江北' },
          { value: 'haishu', label: '海曙' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          { value: 'zhonghuamen', label: '中华门' },
          { value: 'xuanwu', label: '玄武' },
        ],
      },
      {
        value: 'suzhou',
        label: '苏州',
        children: [
          { value: 'gusu', label: '姑苏' },
          { value: 'wuzhong', label: '吴中' },
        ],
      },
    ],
  },
];

type LightFilterVariant = 'outlined' | 'filled' | 'borderless';

interface FilterFormValues {
  sex?: { value: string; label: string }[];
  area?: string[];
  region?: string[];
  treeSelect?: string[];
  open?: boolean;
  status?: boolean;
  count?: number;
  range?: [number, number];
  slider?: number;
  name?: string;
  address?: string;
  keyword?: string;
  date?: string;
  dateRange?: [string, string];
  datetime?: string;
  datetimeRange?: [number, number];
  time?: string;
  timeRange?: [number, number];
  nameSet?: [string, string];
}

const defaultDate = dayjs('2024-01-15');
const defaultDateTime = dayjs('2024-01-15 14:30:00');

const Demo = () => {
  const [size, setSize] = React.useState<SizeType>('middle');
  const [variant, setVariant] =
    React.useState<LightFilterVariant>('borderless');

  const initialValues: Partial<FilterFormValues> = {
    keyword: '关键词示例',
    sex: [
      { value: 'man', label: '男' },
      { value: 'woman', label: '女' },
    ],
    area: ['beijing', 'shanghai'],
    region: ['zhejiang', 'hangzhou', 'xihu'],
    treeSelect: ['0-0', '0-1'],
    open: true,
    status: false,
    count: 100,
    range: [20, 80],
    slider: 50,
    address: '北京市朝阳区',
    date: defaultDate.format('YYYY-MM-DD'),
    dateRange: [
      defaultDate.format('YYYY-MM-DD'),
      defaultDate.add(7, 'd').format('YYYY-MM-DD'),
    ],
    datetime: defaultDateTime.format('YYYY-MM-DD HH:mm:ss'),
    datetimeRange: [
      defaultDateTime.add(-1, 'd').valueOf(),
      defaultDateTime.valueOf(),
    ],
    time: defaultDateTime.format('HH:mm:ss'),
    timeRange: [
      defaultDateTime.add(-1, 'h').valueOf(),
      defaultDateTime.valueOf(),
    ],
    nameSet: ['张', '三'],
  };

  return (
    <div>
      <Space wrap size="middle" style={{ marginBottom: 16 }}>
        <Space>
          <span>尺寸：</span>
          <Radio.Group
            value={size}
            onChange={(e) => setSize(e.target.value)}
            optionType="button"
            buttonStyle="solid"
          >
            <Radio.Button value="middle">Middle</Radio.Button>
            <Radio.Button value="small">Small</Radio.Button>
          </Radio.Group>
        </Space>
        <Space>
          <span>边框样式：</span>
          <Radio.Group
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            optionType="button"
            buttonStyle="solid"
          >
            <Radio.Button value="borderless">无边框 (borderless)</Radio.Button>
            <Radio.Button value="outlined">线框 (outlined)</Radio.Button>
            <Radio.Button value="filled">填充 (filled)</Radio.Button>
            <Radio.Button value="underlined">下划线 (underlined)</Radio.Button>
          </Radio.Group>
        </Space>
      </Space>

      <LightFilter<FilterFormValues>
        initialValues={initialValues}
        size={size}
        variant={variant}
        onFinish={async (values) => {
          console.log('筛选提交:', values);
        }}
      >
        <lightForm.select
          name="sex"
          label="性别"
          showSearch
          allowClear={false}
          fieldProps={{ labelInValue: true }}
          valueEnum={{
            man: '男',
            woman: '女',
          }}
        />
        <lightForm.select
          name="area"
          label="地区"
          mode="multiple"
          valueEnum={{
            beijing: '北京',
            shanghai: '上海',
            hangzhou: '杭州',
            guangzhou: '广州',
            shenzhen: '深圳',
            long: '这是一个很长的用来测试溢出的项目',
          }}
        />
        <lightForm.checkboxGroup
          name="checkboxGroup"
          label="标签"
          options={['A', 'B', 'C', 'D', 'E', 'F']}
        />
        <lightForm.treeSelect
          label="树形选择"
          name="treeSelect"
          fieldProps={{
            fieldNames: { label: 'title' },
            treeData,
            treeCheckable: true,
            showCheckedStrategy: TreeSelect.SHOW_PARENT,
            placeholder: '请选择',
          }}
        />
        <lightForm.cascader
          name="region"
          label="区域"
          width="md"
          fieldProps={{
            options: regionOptions,
            placeholder: '请选择省/市/区',
          }}
        />
        <lightForm.switch name="open" label="开关" />
        <lightForm.switch name="status" label="状态" secondary />
        <lightForm.digit name="count" label="数量" min={0} max={9999} />
        <lightForm.slider name="range" label="范围" range />
        <lightForm.slider name="slider" label="滑块" />
        <lightForm.input name="keyword" label="关键词" placeholder="请输入关键词" />
        <lightForm.input
          name="address"
          label="地址"
          secondary
          placeholder="请输入地址"
        />
        <lightForm.date name="date" label="日期" allowClear={false} />
        <lightForm.dateRange name="dateRange" label="日期范围" />
        <lightForm.dateTime name="datetime" label="日期时间" />
        <lightForm.dateTimeRange name="datetimeRange" label="日期时间范围" />
        <lightForm.time name="time" label="时间" />
        <lightForm.timePickerRange name="timeRange" label="时间范围" />
        <lightForm.fieldSet name="nameSet" label="姓名">
          <lightForm.input placeholder="姓" />
          <lightForm.input placeholder="名" />
        </lightForm.fieldSet>
      </LightFilter>
    </div>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
