import type { ProFieldFCMode } from '@ant-design/pro-components';
import { ProField } from '@ant-design/pro-components';
import { Descriptions, Segmented, Space } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const DEMO_TIMESTAMP = dayjs('2024-01-15 10:30:00').valueOf();

const statusEnum = {
  all: { text: '全部', disabled: true, status: 'Default' },
  open: { text: '待处理', status: 'Error' },
  closed: { text: '已完成', status: 'Success' },
  processing: { text: '进行中', status: 'Processing' },
};

/** 简化的受控 ProField 包装 */
const DemoField: React.FC<{
  label: string;
  initialValue: any;
  mode: ProFieldFCMode;
  valueType?: any;
  [key: string]: any;
}> = ({ label, initialValue, mode, ...rest }) => {
  const [val, setVal] = useState(initialValue);
  return (
    <Descriptions.Item label={label}>
      <ProField
        text={val}
        value={val}
        onChange={setVal}
        mode={mode}
        {...rest}
      />
    </Descriptions.Item>
  );
};

const Demo = () => {
  const [state, setState] = useState<ProFieldFCMode>('read');
  return (
    <>
      <div style={{ marginBlockEnd: 16 }}>
        <span>模式：</span>
        <Segmented
          value={state}
          onChange={(v) => setState(v as ProFieldFCMode)}
          options={[
            { label: '只读 read', value: 'read' },
            { label: '编辑 edit', value: 'edit' },
          ]}
        />
      </div>

      <Descriptions column={2} title="文本与展示类">
        <Descriptions.Item label="空字符串">
          <ProField text="" mode="read" />
        </Descriptions.Item>
        <DemoField
          label="文本 text"
          initialValue="用户认证服务"
          valueType="text"
          mode={state}
        />
        <DemoField
          label="文本域 textarea"
          initialValue="核心服务，承载全站用户登录与鉴权，高峰期需要关注性能指标"
          valueType="textarea"
          mode={state}
        />
        <DemoField
          label="密码 password"
          initialValue="pro-components"
          valueType="password"
          mode={state}
        />
        <Descriptions.Item label="头像 avatar">
          <ProField
            text="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
            mode="read"
            valueType="avatar"
          />
        </Descriptions.Item>
        <DemoField
          label="图片 image"
          initialValue="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          valueType="image"
          mode={state}
        />
      </Descriptions>

      <Descriptions column={2} title="数值类">
        <DemoField
          label="金额 money"
          initialValue={128000}
          valueType="money"
          mode={state}
        />
        <DemoField
          label="数字 digit"
          initialValue={1234567}
          valueType="digit"
          mode={state}
        />
        <DemoField
          label="数字范围 digitRange"
          initialValue={[1000, 5000]}
          valueType="digitRange"
          mode={state}
        />
        <DemoField
          label="秒格式化 second"
          initialValue={86400}
          valueType="second"
          mode={state}
        />
        <DemoField
          label="百分比 percent"
          initialValue={99.5}
          valueType="percent"
          mode={state}
        />
        <Descriptions.Item label="百分比（带颜色）">
          <Space>
            <ProField
              text={15}
              valueType={{ type: 'percent', showSymbol: true, showColor: true }}
              mode="read"
            />
            <ProField
              text={0}
              valueType={{ type: 'percent', showSymbol: true, showColor: true }}
              mode="read"
            />
            <ProField
              text={-8}
              valueType={{ type: 'percent', showSymbol: true, showColor: true }}
              mode="read"
            />
          </Space>
        </Descriptions.Item>
        <DemoField
          label="进度条 progress"
          initialValue={75}
          valueType="progress"
          mode={state}
        />
        <DemoField
          label="评分 rate"
          initialValue={4}
          valueType="rate"
          mode={state}
        />
        <DemoField
          label="滑动条 slider"
          initialValue={60}
          valueType="slider"
          mode={state}
        />
      </Descriptions>

      <Descriptions column={2} title="枚举选择类">
        <DemoField
          label="选择框 select"
          initialValue="open"
          mode={state}
          valueEnum={statusEnum}
        />
        <DemoField
          label="单选 radio"
          initialValue="open"
          mode={state}
          valueType="radio"
          valueEnum={statusEnum}
        />
        <DemoField
          label="单选按钮 radioButton"
          initialValue="open"
          mode={state}
          valueType="radioButton"
          valueEnum={statusEnum}
        />
        <DemoField
          label="多选 checkbox"
          initialValue={['open', 'processing']}
          mode={state}
          valueType="checkbox"
          valueEnum={statusEnum}
        />
        <DemoField
          label="开关 switch"
          initialValue={true}
          mode={state}
          valueType="switch"
        />
        <DemoField
          label="分段选择 segmented"
          initialValue="open"
          mode={state}
          valueType="segmented"
          valueEnum={statusEnum}
        />
        <DemoField
          label="远程选择框 select(request)"
          initialValue="open"
          mode={state}
          valueType="select"
          request={async () => [
            { label: '全部', value: 'all' },
            { label: '待处理', value: 'open' },
            { label: '已完成', value: 'closed' },
            { label: '进行中', value: 'processing' },
          ]}
        />
        <DemoField
          label="级联选择 cascader"
          initialValue={['zhejiang', 'hangzhou', 'xihu']}
          mode={state}
          valueType="cascader"
          fieldProps={{
            fieldNames: { label: 'name' },
          }}
          request={async () => [
            {
              value: 'zhejiang',
              name: '浙江省',
              children: [
                {
                  value: 'hangzhou',
                  name: '杭州市',
                  children: [{ value: 'xihu', name: '西湖区' }],
                },
              ],
            },
            {
              value: 'jiangsu',
              name: '江苏省',
              children: [
                {
                  value: 'nanjing',
                  name: '南京市',
                  children: [{ value: 'gulou', name: '鼓楼区' }],
                },
              ],
            },
          ]}
        />
        <DemoField
          label="树形选择 treeSelect"
          initialValue="tech-fe"
          mode={state}
          valueType="treeSelect"
          fieldProps={{
            options: [
              {
                label: '技术研发部',
                value: 'tech',
                children: [
                  { label: '前端开发组', value: 'tech-fe' },
                  { label: '后端开发组', value: 'tech-be' },
                ],
              },
              {
                label: '产品设计部',
                value: 'product',
                children: [
                  { label: '产品策划组', value: 'product-pm' },
                  { label: 'UX 设计组', value: 'product-ux' },
                ],
              },
            ],
          }}
        />
        <DemoField
          label="颜色选择 color"
          initialValue="#1677FF"
          mode={state}
          valueType="color"
        />
      </Descriptions>

      <Descriptions column={2} title="日期时间类">
        <DemoField
          label="日期 date"
          initialValue={DEMO_TIMESTAMP}
          mode={state}
          valueType="date"
        />
        <DemoField
          label="日期时间 dateTime"
          initialValue={DEMO_TIMESTAMP}
          mode={state}
          valueType="dateTime"
        />
        <DemoField
          label="周 dateWeek"
          initialValue={DEMO_TIMESTAMP}
          mode={state}
          valueType="dateWeek"
        />
        <DemoField
          label="月 dateMonth"
          initialValue={DEMO_TIMESTAMP}
          mode={state}
          valueType="dateMonth"
        />
        <DemoField
          label="季度 dateQuarter"
          initialValue={DEMO_TIMESTAMP}
          mode={state}
          valueType="dateQuarter"
        />
        <DemoField
          label="年 dateYear"
          initialValue={DEMO_TIMESTAMP}
          mode={state}
          valueType="dateYear"
        />
        <DemoField
          label="时间 time"
          initialValue={DEMO_TIMESTAMP}
          mode={state}
          valueType="time"
        />
        <DemoField
          label="相对时间 fromNow"
          initialValue={DEMO_TIMESTAMP}
          mode={state}
          valueType="fromNow"
        />
      </Descriptions>

      <Descriptions column={2} title="日期范围类">
        <DemoField
          label="日期范围 dateRange"
          initialValue={[
            dayjs('2024-01-01').valueOf(),
            dayjs('2024-01-31').valueOf(),
          ]}
          mode={state}
          valueType="dateRange"
        />
        <DemoField
          label="日期时间范围 dateTimeRange"
          initialValue={[
            dayjs('2024-01-01 09:00:00').valueOf(),
            dayjs('2024-01-31 18:00:00').valueOf(),
          ]}
          mode={state}
          valueType="dateTimeRange"
        />
        <DemoField
          label="时间范围 timeRange"
          initialValue={[
            dayjs('2024-01-01 09:00:00').valueOf(),
            dayjs('2024-01-01 18:00:00').valueOf(),
          ]}
          mode={state}
          valueType="timeRange"
        />
        <DemoField
          label="周范围 dateWeekRange"
          initialValue={[
            dayjs('2024-01-01').valueOf(),
            dayjs('2024-01-14').valueOf(),
          ]}
          mode={state}
          valueType="dateWeekRange"
        />
        <DemoField
          label="月范围 dateMonthRange"
          initialValue={[
            dayjs('2024-01-01').valueOf(),
            dayjs('2024-06-30').valueOf(),
          ]}
          mode={state}
          valueType="dateMonthRange"
        />
        <DemoField
          label="季度范围 dateQuarterRange"
          initialValue={[
            dayjs('2024-01-01').valueOf(),
            dayjs('2024-09-30').valueOf(),
          ]}
          mode={state}
          valueType="dateQuarterRange"
        />
        <DemoField
          label="年范围 dateYearRange"
          initialValue={[
            dayjs('2023-01-01').valueOf(),
            dayjs('2025-12-31').valueOf(),
          ]}
          mode={state}
          valueType="dateYearRange"
        />
      </Descriptions>

      <Descriptions column={2} title="代码类">
        <DemoField
          label="代码块 code"
          initialValue={`pnpm install
pnpm run build
pnpm run deploy --env production`}
          mode={state}
          valueType="code"
        />
        <DemoField
          label="JSON 代码块 jsonCode"
          initialValue={`{
  "service": "user-auth",
  "port": 8080,
  "replicas": 3
}`}
          mode={state}
          valueType="jsonCode"
        />
      </Descriptions>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
