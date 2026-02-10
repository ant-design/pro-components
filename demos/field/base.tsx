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
        <Descriptions.Item label="文本 text">
          <ProField text="用户认证服务" valueType="text" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="文本域 textarea">
          <ProField
            text="核心服务，承载全站用户登录与鉴权，高峰期需要关注性能指标"
            valueType="textarea"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="密码 password">
          <ProField text="pro-components" valueType="password" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="头像 avatar">
          <ProField
            text="https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg"
            mode="read"
            valueType="avatar"
          />
        </Descriptions.Item>
        <Descriptions.Item label="图片 image">
          <ProField
            text="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            valueType="image"
            mode={state}
          />
        </Descriptions.Item>
      </Descriptions>

      <Descriptions column={2} title="数值类">
        <Descriptions.Item label="金额 money">
          <ProField text="128000" valueType="money" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="数字 digit">
          <ProField text="1234567" valueType="digit" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="数字范围 digitRange">
          <ProField text={[1000, 5000]} valueType="digitRange" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="秒格式化 second">
          <ProField text={86400} valueType="second" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="百分比 percent">
          <ProField text="99.5" valueType="percent" mode={state} />
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
          <ProField text="75" valueType="progress" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="评分 rate">
          <ProField text={4} valueType="rate" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="滑动条 slider">
          <ProField text="60" valueType="slider" mode={state} />
        </Descriptions.Item>
      </Descriptions>

      <Descriptions column={2} title="枚举选择类">
        <Descriptions.Item label="选择框 select">
          <ProField text="open" mode={state} valueEnum={statusEnum} />
        </Descriptions.Item>
        <Descriptions.Item label="单选 radio">
          <ProField
            text="open"
            mode={state}
            valueType="radio"
            valueEnum={statusEnum}
          />
        </Descriptions.Item>
        <Descriptions.Item label="单选按钮 radioButton">
          <ProField
            text="open"
            mode={state}
            valueType="radioButton"
            valueEnum={statusEnum}
          />
        </Descriptions.Item>
        <Descriptions.Item label="多选 checkbox">
          <ProField
            text={['open', 'processing']}
            mode={state}
            valueType="checkbox"
            valueEnum={statusEnum}
          />
        </Descriptions.Item>
        <Descriptions.Item label="开关 switch">
          <ProField text={true} mode={state} valueType="switch" />
        </Descriptions.Item>
        <Descriptions.Item label="分段选择 segmented">
          <ProField
            text="open"
            mode={state}
            valueType="segmented"
            valueEnum={statusEnum}
          />
        </Descriptions.Item>
        <Descriptions.Item label="远程选择框 select(request)">
          <ProField
            text="open"
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
          <ProField
            text={['zhejiang', 'hangzhou', 'xihu']}
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
          <ProField
            text="tech-fe"
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
          <ProField text="#1677FF" valueType="color" mode={state} />
        </Descriptions.Item>
      </Descriptions>

      <Descriptions column={2} title="日期时间类">
        <Descriptions.Item label="日期 date">
          <ProField text={DEMO_TIMESTAMP} valueType="date" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="日期时间 dateTime">
          <ProField text={DEMO_TIMESTAMP} valueType="dateTime" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="周 dateWeek">
          <ProField text={DEMO_TIMESTAMP} valueType="dateWeek" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="月 dateMonth">
          <ProField text={DEMO_TIMESTAMP} valueType="dateMonth" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="季度 dateQuarter">
          <ProField
            text={DEMO_TIMESTAMP}
            valueType="dateQuarter"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="年 dateYear">
          <ProField text={DEMO_TIMESTAMP} valueType="dateYear" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="时间 time">
          <ProField text={DEMO_TIMESTAMP} valueType="time" mode={state} />
        </Descriptions.Item>
        <Descriptions.Item label="相对时间 fromNow">
          <ProField text={DEMO_TIMESTAMP} valueType="fromNow" mode={state} />
        </Descriptions.Item>
      </Descriptions>

      <Descriptions column={2} title="日期范围类">
        <Descriptions.Item label="日期范围 dateRange">
          <ProField
            text={[
              dayjs('2024-01-01').valueOf(),
              dayjs('2024-01-31').valueOf(),
            ]}
            valueType="dateRange"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="日期时间范围 dateTimeRange">
          <ProField
            text={[
              dayjs('2024-01-01 09:00:00').valueOf(),
              dayjs('2024-01-31 18:00:00').valueOf(),
            ]}
            valueType="dateTimeRange"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="时间范围 timeRange">
          <ProField
            text={[
              dayjs('2024-01-01 09:00:00').valueOf(),
              dayjs('2024-01-01 18:00:00').valueOf(),
            ]}
            valueType="timeRange"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="周范围 dateWeekRange">
          <ProField
            text={[
              dayjs('2024-01-01').valueOf(),
              dayjs('2024-01-14').valueOf(),
            ]}
            valueType="dateWeekRange"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="月范围 dateMonthRange">
          <ProField
            text={[
              dayjs('2024-01-01').valueOf(),
              dayjs('2024-06-30').valueOf(),
            ]}
            valueType="dateMonthRange"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="季度范围 dateQuarterRange">
          <ProField
            text={[
              dayjs('2024-01-01').valueOf(),
              dayjs('2024-09-30').valueOf(),
            ]}
            valueType="dateQuarterRange"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="年范围 dateYearRange">
          <ProField
            text={[
              dayjs('2023-01-01').valueOf(),
              dayjs('2025-12-31').valueOf(),
            ]}
            valueType="dateYearRange"
            mode={state}
          />
        </Descriptions.Item>
      </Descriptions>

      <Descriptions column={2} title="代码类">
        <Descriptions.Item label="代码块 code">
          <ProField
            text={`pnpm install
pnpm run build
pnpm run deploy --env production`}
            valueType="code"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="JSON 代码块 jsonCode">
          <ProField
            text={`{
  "service": "user-auth",
  "port": 8080,
  "replicas": 3
}`}
            valueType="jsonCode"
            mode={state}
          />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
