import type { ProFieldFCMode } from '@xxlabs/pro-components';
import { ProField } from '@xxlabs/pro-components';
import { Descriptions, Radio, Space, Switch } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

export default () => {
  const [state, setState] = useState<ProFieldFCMode>('edit');
  const [plain, setPlain] = useState<boolean>(false);
  return (
    <>
      <Space>
        <Radio.Group value={state} onChange={(e) => setState(e.target.value as ProFieldFCMode)}>
          <Radio value="read">只读</Radio>
          <Radio value="edit">编辑</Radio>
        </Radio.Group>
        简约模式
        <Switch checked={plain} onChange={(checked) => setPlain(checked)} />
      </Space>
      <br />
      <br />
      <Descriptions column={2}>
        <Descriptions.Item label="空字符串">
          <ProField mode="read" text="" />
        </Descriptions.Item>
        <Descriptions.Item label="头像">
          <ProField mode="read" text="https://avatars2.githubusercontent.com/u/8186664?s=60&v=4" valueType="avatar" />
        </Descriptions.Item>
        <Descriptions.Item label="文本">
          <ProField
            fieldProps={{
              disabled: true,
            }}
            mode={state}
            plain={plain}
            text="这是一段文本"
            valueType="text"
          />
        </Descriptions.Item>
        <Descriptions.Item label="颜色">
          <ProField mode={state} plain={plain} text="blue" valueType="color" />
        </Descriptions.Item>
        <Descriptions.Item label="颜色禁用">
          <ProField
            fieldProps={{
              disabled: true,
            }}
            mode={state}
            plain={plain}
            text="blue"
            valueType="color"
          />
          <ProField disabled mode="read" text="blue" valueType="color" />
        </Descriptions.Item>
        <Descriptions.Item label="图片">
          <ProField
            mode={state}
            plain={plain}
            text="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            valueType={{
              type: 'image',
              width: 100,
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="金额">
          <ProField
            numberPopoverRender
            fieldProps={{
              precision: 2,
              style: {
                width: 200,
              },
            }}
            mode={state}
            plain={plain}
            text="10000"
            valueType="money"
          />

          <ProField
            fieldProps={{
              value: 2221212.22,
              customSymbol: '💰',
            }}
            label="自定义货币符号"
            mode="read"
            name="amount4"
            valueType="money"
          />
        </Descriptions.Item>
        <Descriptions.Item label="数字">
          <ProField
            fieldProps={{
              min: 1,
              max: 10000,
              precision: 0,
              formatter: null,
            }}
            mode={state}
            plain={plain}
            text="19897979797979"
            valueType="digit"
          />
        </Descriptions.Item>
        <Descriptions.Item label="数字范围">
          <ProField mode={state} plain={plain} text={[123, 456]} valueType="digitRange" />
        </Descriptions.Item>
        <Descriptions.Item label="秒格式化">
          <ProField mode={state} plain={plain} text={2000000} valueType="second" />
        </Descriptions.Item>
        <Descriptions.Item label="百分比">
          <ProField mode={state} plain={plain} text="100" valueType="percent" />
        </Descriptions.Item>
        <Descriptions.Item label="评分">
          <ProField mode={state} plain={plain} text={3.5} valueType="rate" />
        </Descriptions.Item>
        <Descriptions.Item label="slider">
          <ProField mode={state} plain={plain} text="40" valueType="slider" />
        </Descriptions.Item>
        <Descriptions.Item label="选择框">
          <ProField
            mode={state}
            text="open"
            valueEnum={{
              all: { text: '全部', disabled: true, status: 'Default' },
              open: {
                text: '未解决',
                status: 'Error',
              },
              closed: {
                text: '已解决',
                status: 'Success',
              },
              processing: {
                text: '解决中',
                status: 'Processing',
              },
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="多选">
          <ProField
            mode={state}
            text={['open', 'closed']}
            valueEnum={{
              all: { text: '全部', disabled: true, status: 'Default' },
              open: {
                text: '未解决',
                status: 'Error',
              },
              closed: {
                text: '已解决',
                status: 'Success',
              },
              processing: {
                text: '解决中',
                status: 'Processing',
              },
            }}
            valueType="checkbox"
          />
        </Descriptions.Item>
        <Descriptions.Item label="多选 labelInValue">
          <ProField
            mode={state}
            text={[
              {
                value: 'open1',
                label: '打开',
              },
              {
                value: 'closed2',
                label: '关闭',
              },
            ]}
            valueEnum={{
              all: { text: '全部', disabled: true, status: 'Default' },
              open: {
                text: '未解决',
                status: 'Error',
              },
              closed: {
                text: '已解决',
                status: 'Success',
              },
              processing: {
                text: '解决中',
                status: 'Processing',
              },
            }}
            valueType="checkbox"
          />
        </Descriptions.Item>
        <Descriptions.Item label="单选">
          <ProField
            fieldProps={{
              layout: 'horizontal',
            }}
            mode={state}
            text="open"
            valueEnum={{
              all: { text: '全部', disabled: true, status: 'Default' },
              open: {
                text: '未解决',
                status: 'Error',
              },
              closed: {
                text: '已解决',
                status: 'Success',
              },
              processing: {
                text: '解决中',
                status: 'Processing',
              },
            }}
            valueType="radio"
          />
        </Descriptions.Item>
        <Descriptions.Item label="单选按钮">
          <ProField
            mode={state}
            text="open"
            valueEnum={{
              all: { text: '全部', disabled: true, status: 'Default' },
              open: {
                text: '未解决',
                status: 'Error',
              },
              closed: {
                text: '已解决',
                status: 'Success',
              },
              processing: {
                text: '解决中',
                status: 'Processing',
              },
            }}
            valueType="radioButton"
          />
        </Descriptions.Item>
        <Descriptions.Item label="远程选择框">
          <ProField
            mode={state}
            params={{
              name: 'test',
            }}
            request={async () => {
              return [
                { label: '全部', value: 'all' },
                { label: '未解决', value: 'open' },
                { label: '已解决', value: 'closed' },
                { label: '解决中', value: 'processing' },
                {
                  label: '特殊选项',
                  value: 'optGroup',
                  optionType: 'optGroup',
                  options: [
                    { label: '不解决', value: 'no' },
                    { label: '已废弃', value: 'clear' },
                  ],
                },
              ];
            }}
            text="open"
            valueType="select"
          />
        </Descriptions.Item>
        <Descriptions.Item label="远程级联框">
          <ProField
            mode={state}
            params={{
              name: 'test',
            }}
            request={async () => {
              return [
                {
                  value: 'zhejiang',
                  label: 'Zhejiang',
                  children: [
                    {
                      value: 'hangzhou',
                      label: 'Hangzhou',
                      children: [
                        {
                          value: 'xihu',
                          label: 'West Lake',
                        },
                      ],
                    },
                  ],
                },
                {
                  value: 'jiangsu',
                  label: 'Jiangsu',
                  children: [
                    {
                      value: 'nanjing',
                      label: 'Nanjing',
                      children: [
                        {
                          value: 'zhonghuamen',
                          label: 'Zhong Hua Men',
                        },
                      ],
                    },
                  ],
                },
              ];
            }}
            valueType="cascader"
          />
        </Descriptions.Item>
        <Descriptions.Item label="进度条">
          <ProField mode={state} plain={plain} text="40" valueType="progress" />
        </Descriptions.Item>
        <Descriptions.Item label="进度条">
          <ProField mode={state} plain={plain} text="40%" valueType="progress" />
        </Descriptions.Item>
        <Descriptions.Item label="进度条">
          <ProField mode={state} plain={plain} text="love" valueType="progress" />
        </Descriptions.Item>
        <Descriptions.Item label="百分比空值">
          <ProField mode="read" valueType="percent" />
        </Descriptions.Item>
        <Descriptions.Item label="百分比">
          <Space>
            <ProField
              mode="read"
              text={10}
              valueType={{
                type: 'percent',
                showSymbol: (text: number) => {
                  if (text < 0) {
                    return true;
                  }
                  return false;
                },
                showColor: true,
              }}
            />
            <ProField
              mode="read"
              text={0}
              valueType={{
                type: 'percent',
                showSymbol: true,
                showColor: true,
              }}
            />
            <ProField
              mode="read"
              text={-10}
              valueType={{
                type: 'percent',
                showSymbol: true,
                showColor: true,
              }}
            />
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="日期时间">
          <ProField mode={state} plain={plain} text={dayjs('2019-11-16 12:50:26').valueOf()} valueType="dateTime" />
        </Descriptions.Item>
        <Descriptions.Item label="相对于当前时间">
          <Space>
            <ProField mode={state} plain={plain} text={dayjs('2019-11-16 12:50:26').valueOf()} valueType="fromNow" />
            <ProField mode={state} plain={plain} text={dayjs('2020-11-16 12:50:26').valueOf()} valueType="fromNow" />
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="日期">
          <ProField mode={state} plain={plain} text={dayjs('2019-11-16 12:50:26').valueOf()} valueType="date" />
        </Descriptions.Item>
        <Descriptions.Item label="日期区间">
          <ProField
            mode={state}
            plain={plain}
            text={[dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(), dayjs('2019-11-16 12:50:26').valueOf()]}
            valueType="dateRange"
          />
        </Descriptions.Item>
        <Descriptions.Item label="日期时间区间">
          <ProField
            mode={state}
            plain={plain}
            text={[dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(), dayjs('2019-11-16 12:50:26').valueOf()]}
            valueType="dateTimeRange"
          />
        </Descriptions.Item>
        <Descriptions.Item label="时间">
          <ProField mode={state} plain={plain} text={dayjs('2019-11-16 12:50:26').valueOf()} valueType="time" />
        </Descriptions.Item>
        <Descriptions.Item label="时间区间">
          <ProField
            mode={state}
            plain={plain}
            text={[dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(), dayjs('2019-11-16 12:50:26').valueOf()]}
            valueType="timeRange"
          />
        </Descriptions.Item>
        <Descriptions.Item label="密码">
          <ProField mode={state} plain={plain} text="password" valueType="password" />
        </Descriptions.Item>
        <Descriptions.Item label="代码块">
          <ProField
            mode={state}
            plain={plain}
            text={`
yarn run v1.22.0            
$ eslint --format=pretty ./packages
Done in 9.70s.
          `}
            valueType="code"
          />
        </Descriptions.Item>
        <Descriptions.Item label="JSON 代码块">
          <ProField
            mode={state}
            plain={plain}
            text={`{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "node",
    "jsx": "preserve",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,

    "declaration": true,
    "skipLibCheck": true
  },
  "include": ["**/src", "**/docs", "scripts", "**/demo", ".eslintrc.js"]
}
`}
            valueType="jsonCode"
          />
        </Descriptions.Item>
      </Descriptions>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProField 基础测试 Props 说明：</h4>
        <ul>
          <li>
            <strong>text</strong>: 显示的文本内容
          </li>
          <li>
            <strong>mode</strong>: 显示模式，'read' 表示只读，'edit' 表示编辑
          </li>
          <li>
            <strong>valueType</strong>: 值类型，决定如何渲染内容
          </li>
          <li>
            <strong>plain</strong>: 是否使用简约模式
          </li>
          <li>
            <strong>fieldProps</strong>: 字段属性配置
          </li>
          <li>
            <strong>disabled</strong>: 是否禁用
          </li>
        </ul>
        <h4>Radio.Group 配置：</h4>
        <ul>
          <li>
            <strong>onChange</strong>: 值变化回调函数
          </li>
          <li>
            <strong>value</strong>: 当前选中的值
          </li>
          <li>
            <strong>模式切换</strong>: 用于切换 ProField 的显示模式
          </li>
        </ul>
        <h4>Switch 配置：</h4>
        <ul>
          <li>
            <strong>checked</strong>: 是否选中
          </li>
          <li>
            <strong>onChange</strong>: 值变化回调函数
          </li>
          <li>
            <strong>简约模式</strong>: 控制是否使用简约模式
          </li>
        </ul>
        <h4>Descriptions 配置：</h4>
        <ul>
          <li>
            <strong>column</strong>: 列数配置
          </li>
          <li>
            <strong>内容展示</strong>: 用于展示各种 ProField 组件
          </li>
        </ul>
        <h4>支持的 valueType 类型：</h4>
        <ul>
          <li>
            <strong>text</strong>: 文本类型
          </li>
          <li>
            <strong>avatar</strong>: 头像类型
          </li>
          <li>
            <strong>color</strong>: 颜色类型
          </li>
          <li>
            <strong>image</strong>: 图片类型
          </li>
          <li>
            <strong>money</strong>: 金额类型
          </li>
          <li>
            <strong>digit</strong>: 数字类型
          </li>
          <li>
            <strong>date</strong>: 日期类型
          </li>
          <li>
            <strong>dateRange</strong>: 日期区间类型
          </li>
          <li>
            <strong>dateTimeRange</strong>: 日期时间区间类型
          </li>
          <li>
            <strong>time</strong>: 时间类型
          </li>
          <li>
            <strong>timeRange</strong>: 时间区间类型
          </li>
          <li>
            <strong>password</strong>: 密码类型
          </li>
          <li>
            <strong>code</strong>: 代码块类型
          </li>
          <li>
            <strong>jsonCode</strong>: JSON 代码块类型
          </li>
        </ul>
        <h4>fieldProps 配置：</h4>
        <ul>
          <li>
            <strong>disabled</strong>: 是否禁用字段
          </li>
          <li>
            <strong>precision</strong>: 数字精度
          </li>
          <li>
            <strong>style</strong>: 样式配置
          </li>
          <li>
            <strong>customSymbol</strong>: 自定义货币符号
          </li>
          <li>
            <strong>width</strong>: 图片宽度
          </li>
        </ul>
        <h4>显示模式特点：</h4>
        <ul>
          <li>
            <strong>只读模式</strong>: 仅显示内容，不可编辑
          </li>
          <li>
            <strong>编辑模式</strong>: 可以编辑内容
          </li>
          <li>
            <strong>简约模式</strong>: 使用简约的显示样式
          </li>
          <li>
            <strong>动态切换</strong>: 支持动态切换显示模式
          </li>
        </ul>
        <h4>布局特点：</h4>
        <ul>
          <li>
            <strong>控制区域</strong>: 顶部显示模式切换控制
          </li>
          <li>
            <strong>展示区域</strong>: 使用 Descriptions 展示各种字段类型
          </li>
          <li>
            <strong>响应式设计</strong>: 自动适配不同屏幕尺寸
          </li>
          <li>
            <strong>网格布局</strong>: 使用网格布局展示多个字段
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>字段测试</strong>: 测试各种字段类型的显示效果
          </li>
          <li>
            <strong>模式切换</strong>: 测试只读和编辑模式的切换
          </li>
          <li>
            <strong>样式测试</strong>: 测试简约模式和普通模式的样式差异
          </li>
          <li>
            <strong>功能验证</strong>: 验证各种字段类型的功能
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>类型选择</strong>: 根据数据类型选择合适的 valueType
          </li>
          <li>
            <strong>模式设计</strong>: 合理设计只读和编辑模式
          </li>
          <li>
            <strong>样式配置</strong>: 根据需求配置合适的样式
          </li>
          <li>
            <strong>用户体验</strong>: 提供清晰的模式切换和内容展示
          </li>
        </ul>
      </div>
    </>
  );
};
