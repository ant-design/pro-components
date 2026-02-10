import type { ProFieldFCMode } from '@ant-design/pro-components';
import { ProField } from '@ant-design/pro-components';
import { Descriptions, Segmented, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';

const DEMO_TIMESTAMP = dayjs('2024-01-15 10:30:00').valueOf();

const statusEnum = {
  all: { text: '全部', disabled: true, status: 'Default' },
  open: { text: '待处理', status: 'Error' },
  closed: { text: '已完成', status: 'Success' },
  processing: { text: '进行中', status: 'Processing' },
};

/** 受控 ProField，同时传 text + value 确保 read/edit 模式都有值 */
const DemoField: React.FC<{
  initialValue: any;
  mode: ProFieldFCMode;
  valueType?: any;
  [key: string]: any;
}> = ({ initialValue, mode, ...rest }) => {
  const [val, setVal] = useState(initialValue);
  return (
    <ProField text={val} value={val} onChange={setVal} mode={mode} {...rest} />
  );
};

const Demo = () => {
  const [state, setState] = useState<ProFieldFCMode>('read');
  return (
    <div
      style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}
    >
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
        <Descriptions.Item label="文本 text">
          <DemoField
            initialValue="用户认证服务"
            valueType="text"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="文本域 textarea">
          <DemoField
            initialValue="核心服务，承载全站用户登录与鉴权，高峰期需要关注性能指标"
            valueType="textarea"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="密码 password">
          <DemoField
            initialValue="pro-components"
            valueType="password"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="头像 avatar">
          <ProField
            text="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
            mode="read"
            valueType="avatar"
          />
        </Descriptions.Item>
        <Descriptions.Item label="图片 image">
          <DemoField
            initialValue="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            valueType="image"
            mode={state}
          />
        </Descriptions.Item>
      </Descriptions>

      <Descriptions column={2} title="数值类">
        <Descriptions.Item label="金额 money">
          <DemoField initialValue={128000} valueType="money" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="数字 digit">
          <DemoField initialValue={1234567} valueType="digit" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="数字范围 digitRange">
          <DemoField
            initialValue={[1000, 5000]}
            valueType="digitRange"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="秒格式化 second">
          <DemoField initialValue={86400} valueType="second" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="百分比 percent">
          <DemoField initialValue={99.5} valueType="percent" mode={state} />
        </Descriptions.Item>
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
        <Descriptions.Item label="进度条 progress">
          <DemoField initialValue={75} valueType="progress" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="评分 rate">
          <DemoField initialValue={4} valueType="rate" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="滑动条 slider">
          <DemoField initialValue={60} valueType="slider" mode={state} />
        </Descriptions.Item>
      </Descriptions>

      <Descriptions column={2} title="枚举选择类">
        <Descriptions.Item label="选择框 select">
          <DemoField initialValue="open" mode={state} valueEnum={statusEnum} />
        </Descriptions.Item>
        <Descriptions.Item label="单选 radio">
          <DemoField
            initialValue="open"
            mode={state}
            valueType="radio"
            valueEnum={statusEnum}
          />
        </Descriptions.Item>
        <Descriptions.Item label="单选按钮 radioButton">
          <DemoField
            initialValue="open"
            mode={state}
            valueType="radioButton"
            valueEnum={statusEnum}
          />
        </Descriptions.Item>
        <Descriptions.Item label="多选 checkbox">
          <DemoField
            initialValue={['open', 'processing']}
            mode={state}
            valueType="checkbox"
            valueEnum={statusEnum}
          />
        </Descriptions.Item>
        <Descriptions.Item label="开关 switch">
          <DemoField initialValue={true} mode={state} valueType="switch" />
        </Descriptions.Item>
        <Descriptions.Item label="分段选择 segmented">
          <DemoField
            initialValue="open"
            mode={state}
            valueType="segmented"
            valueEnum={statusEnum}
          />
        </Descriptions.Item>
        <Descriptions.Item label="远程选择框 select(request)">
          <DemoField
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
        </Descriptions.Item>
        <Descriptions.Item label="级联选择 cascader">
          <DemoField
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
        </Descriptions.Item>
        <Descriptions.Item label="树形选择 treeSelect">
          <DemoField
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
        </Descriptions.Item>
        <Descriptions.Item label="颜色选择 color">
          <DemoField initialValue="#1677FF" mode={state} valueType="color" />
        </Descriptions.Item>
      </Descriptions>

      <Descriptions column={2} title="日期时间类">
        <Descriptions.Item label="日期 date">
          <DemoField
            initialValue={DEMO_TIMESTAMP}
            mode={state}
            valueType="date"
          />
        </Descriptions.Item>
        <Descriptions.Item label="日期时间 dateTime">
          <DemoField
            initialValue={DEMO_TIMESTAMP}
            mode={state}
            valueType="dateTime"
          />
        </Descriptions.Item>
        <Descriptions.Item label="周 dateWeek">
          <DemoField
            initialValue={DEMO_TIMESTAMP}
            mode={state}
            valueType="dateWeek"
          />
        </Descriptions.Item>
        <Descriptions.Item label="月 dateMonth">
          <DemoField
            initialValue={DEMO_TIMESTAMP}
            mode={state}
            valueType="dateMonth"
          />
        </Descriptions.Item>
        <Descriptions.Item label="季度 dateQuarter">
          <DemoField
            initialValue={DEMO_TIMESTAMP}
            mode={state}
            valueType="dateQuarter"
          />
        </Descriptions.Item>
        <Descriptions.Item label="年 dateYear">
          <DemoField
            initialValue={DEMO_TIMESTAMP}
            mode={state}
            valueType="dateYear"
          />
        </Descriptions.Item>
        <Descriptions.Item label="时间 time">
          <DemoField
            initialValue={DEMO_TIMESTAMP}
            mode={state}
            valueType="time"
          />
        </Descriptions.Item>
        <Descriptions.Item label="相对时间 fromNow">
          <DemoField
            initialValue={DEMO_TIMESTAMP}
            mode={state}
            valueType="fromNow"
          />
        </Descriptions.Item>
      </Descriptions>

      <Descriptions column={2} title="日期范围类">
        <Descriptions.Item label="日期范围 dateRange">
          <DemoField
            initialValue={[
              dayjs('2024-01-01').valueOf(),
              dayjs('2024-01-31').valueOf(),
            ]}
            mode={state}
            valueType="dateRange"
          />
        </Descriptions.Item>
        <Descriptions.Item label="日期时间范围 dateTimeRange">
          <DemoField
            initialValue={[
              dayjs('2024-01-01 09:00:00').valueOf(),
              dayjs('2024-01-31 18:00:00').valueOf(),
            ]}
            mode={state}
            valueType="dateTimeRange"
          />
        </Descriptions.Item>
        <Descriptions.Item label="时间范围 timeRange">
          <DemoField
            initialValue={[
              dayjs('2024-01-01 09:00:00').valueOf(),
              dayjs('2024-01-01 18:00:00').valueOf(),
            ]}
            mode={state}
            valueType="timeRange"
          />
        </Descriptions.Item>
        <Descriptions.Item label="周范围 dateWeekRange">
          <DemoField
            initialValue={[
              dayjs('2024-01-01').valueOf(),
              dayjs('2024-01-14').valueOf(),
            ]}
            mode={state}
            valueType="dateWeekRange"
          />
        </Descriptions.Item>
        <Descriptions.Item label="月范围 dateMonthRange">
          <DemoField
            initialValue={[
              dayjs('2024-01-01').valueOf(),
              dayjs('2024-06-30').valueOf(),
            ]}
            mode={state}
            valueType="dateMonthRange"
          />
        </Descriptions.Item>
        <Descriptions.Item label="季度范围 dateQuarterRange">
          <DemoField
            initialValue={[
              dayjs('2024-01-01').valueOf(),
              dayjs('2024-09-30').valueOf(),
            ]}
            mode={state}
            valueType="dateQuarterRange"
          />
        </Descriptions.Item>
        <Descriptions.Item label="年范围 dateYearRange">
          <DemoField
            initialValue={[
              dayjs('2023-01-01').valueOf(),
              dayjs('2025-12-31').valueOf(),
            ]}
            mode={state}
            valueType="dateYearRange"
          />
        </Descriptions.Item>
      </Descriptions>

      <Descriptions column={2} title="代码类">
        <Descriptions.Item label="代码块 code">
          <DemoField
            initialValue={`pnpm install
pnpm run build
pnpm run deploy --env production`}
            mode={state}
            valueType="code"
          />
        </Descriptions.Item>
        <Descriptions.Item label="JSON 代码块 jsonCode">
          <DemoField
            initialValue={`{
  "service": "user-auth",
  "port": 8080,
  "replicas": 3
}`}
            mode={state}
            valueType="jsonCode"
          />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
