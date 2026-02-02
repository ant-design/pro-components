import { ProDescriptions } from '@ant-design/pro-components';

import { FIXED_BASE_DATE } from '../mockData';

const Demo = () => {
  return (
    <>
      <ProDescriptions
        column={2}
        title="高级定义列表"
        tooltip="包含了从服务器请求，columns等功能"
      >
        <ProDescriptions.Item
          label="日期"
          fieldProps={{
            format: 'YYYY.MM.DD',
          }}
          valueType="date"
        >
          {FIXED_BASE_DATE.valueOf()}
        </ProDescriptions.Item>
        <ProDescriptions.Item
          label="日期区间"
          fieldProps={{
            format: 'YYYY.MM.DD HH:mm:ss',
          }}
          valueType="dateTimeRange"
        >
          {[FIXED_BASE_DATE.add(-1, 'd').valueOf(), FIXED_BASE_DATE.valueOf()]}
        </ProDescriptions.Item>
        <ProDescriptions.Item
          label="时间"
          fieldProps={{
            format: 'YYYY.MM.DD',
          }}
          valueType="time"
        >
          {FIXED_BASE_DATE.valueOf()}
        </ProDescriptions.Item>

        <ProDescriptions.Item
          label="时间日期"
          fieldProps={{
            format: 'YYYY.MM.DD HH:mm:ss',
          }}
          valueType="dateTime"
        >
          {FIXED_BASE_DATE.valueOf()}
        </ProDescriptions.Item>

        <ProDescriptions.Item
          label="更新时间"
          fieldProps={{
            format: 'YYYY.MM.DD',
          }}
          valueType="fromNow"
        >
          {FIXED_BASE_DATE.add(-1, 'month').valueOf()}
        </ProDescriptions.Item>
      </ProDescriptions>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProDescriptions 格式化配置 Props 说明：</h4>
        <ul>
          <li>
            <strong>column</strong>: 列数，设置为 2 表示每行显示 2 列
          </li>
          <li>
            <strong>title</strong>: 描述列表标题
          </li>
          <li>
            <strong>tooltip</strong>: 标题提示信息
          </li>
        </ul>
        <h4>ProDescriptions.Item 配置：</h4>
        <ul>
          <li>
            <strong>label</strong>: 标签文本
          </li>
          <li>
            <strong>valueType</strong>: 值类型，决定如何渲染数据
          </li>
          <li>
            <strong>fieldProps</strong>: 字段属性配置
          </li>
          <li>
            <strong>children</strong>: 数据内容
          </li>
        </ul>
        <h4>FieldProps 格式化配置：</h4>
        <ul>
          <li>
            <strong>format</strong>: 格式化字符串，定义显示格式
          </li>
          <li>
            <strong>自定义格式</strong>: 支持 dayjs 的所有格式化选项
          </li>
        </ul>
        <h4>ValueType 日期时间类型：</h4>
        <ul>
          <li>
            <strong>date</strong>: 日期格式，显示年月日
          </li>
          <li>
            <strong>dateTime</strong>: 日期时间格式，显示年月日时分秒
          </li>
          <li>
            <strong>dateTimeRange</strong>: 日期时间区间格式
          </li>
          <li>
            <strong>time</strong>: 时间格式，显示时分秒
          </li>
          <li>
            <strong>fromNow</strong>: 相对时间格式，显示多久之前
          </li>
        </ul>
        <h4>格式化字符串说明：</h4>
        <ul>
          <li>
            <strong>YYYY</strong>: 四位年份
          </li>
          <li>
            <strong>MM</strong>: 两位月份
          </li>
          <li>
            <strong>DD</strong>: 两位日期
          </li>
          <li>
            <strong>HH</strong>: 24小时制小时
          </li>
          <li>
            <strong>mm</strong>: 分钟
          </li>
          <li>
            <strong>ss</strong>: 秒
          </li>
        </ul>
        <h4>数据格式：</h4>
        <ul>
          <li>
            <strong>时间戳</strong>: 使用 dayjs().valueOf() 获取时间戳
          </li>
          <li>
            <strong>数组格式</strong>: 日期区间使用数组 [start, end]
          </li>
          <li>
            <strong>相对时间</strong>: fromNow 类型支持相对时间计算
          </li>
        </ul>
        <h4>Dayjs 操作：</h4>
        <ul>
          <li>
            <strong>add</strong>: 添加时间，如 add(-1, 'month') 表示一个月前
          </li>
          <li>
            <strong>valueOf</strong>: 获取时间戳
          </li>
          <li>
            <strong>格式化</strong>: 通过 format 方法格式化时间
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>日期展示</strong>: 展示各种格式的日期时间
          </li>
          <li>
            <strong>时间区间</strong>: 展示时间范围
          </li>
          <li>
            <strong>相对时间</strong>: 展示相对时间，如"一个月前"
          </li>
          <li>
            <strong>格式化定制</strong>: 根据需求定制显示格式
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>格式统一</strong>: 在项目中保持日期格式的一致性
          </li>
          <li>
            <strong>用户友好</strong>: 选择用户容易理解的格式
          </li>
          <li>
            <strong>国际化</strong>: 考虑不同地区的日期格式习惯
          </li>
          <li>
            <strong>性能考虑</strong>: 避免频繁的时间格式化操作
          </li>
        </ul>
      </div>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
