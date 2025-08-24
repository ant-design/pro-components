import type { ProFieldFCMode } from '@ant-design/pro-components';
import { ProField } from '@ant-design/pro-components';
import { Descriptions, Radio, Space, Switch } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

export default () => {
  const [state, setState] = useState<ProFieldFCMode>('edit');
  const [plain, setPlain] = useState<boolean>(false);
  return (
    <>
      <Space>
        <Radio.Group
          onChange={(e) => setState(e.target.value as ProFieldFCMode)}
          value={state}
        >
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
          <ProField text="" mode="read" />
        </Descriptions.Item>
        <Descriptions.Item label="头像">
          <ProField
            text="https://avatars2.githubusercontent.com/u/8186664?s=60&v=4"
            mode="read"
            valueType="avatar"
          />
        </Descriptions.Item>
        <Descriptions.Item label="文本">
          <ProField
            text="这是一段文本"
            fieldProps={{
              disabled: true,
            }}
            valueType="text"
            mode={state}
            plain={plain}
          />
        </Descriptions.Item>
        <Descriptions.Item label="颜色">
          <ProField text="blue" valueType="color" mode={state} plain={plain} />
        </Descriptions.Item>
        <Descriptions.Item label="颜色禁用">
          <ProField
            text="blue"
            valueType="color"
            fieldProps={{
              disabled: true,
            }}
            mode={state}
            plain={plain}
          />
          <ProField text="blue" valueType="color" disabled mode="read" />
        </Descriptions.Item>
        <Descriptions.Item label="图片">
          <ProField
            text="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            valueType={{
              type: 'image',
              width: 100,
            }}
            mode={state}
            plain={plain}
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
            text="10000"
            valueType="money"
            mode={state}
            plain={plain}
          />

          <ProField
            valueType="money"
            label="自定义货币符号"
            name="amount4"
            fieldProps={{
              value: 2221212.22,
              customSymbol: '💰',
            }}
            mode="read"
          />
        </Descriptions.Item>
        <Descriptions.Item label="数字">
          <ProField
            text="19897979797979"
            valueType="digit"
            fieldProps={{
              min: 1,
              max: 10000,
              precision: 0,
              formatter: null,
            }}
            mode={state}
            plain={plain}
          />
        </Descriptions.Item>
        <Descriptions.Item label="数字范围">
          <ProField
            text={[123, 456]}
            valueType="digitRange"
            mode={state}
            plain={plain}
          />
        </Descriptions.Item>
        <Descriptions.Item label="秒格式化">
          <ProField
            text={2000000}
            valueType="second"
            mode={state}
            plain={plain}
          />
        </Descriptions.Item>
        <Descriptions.Item label="百分比">
          <ProField text="100" valueType="percent" mode={state} plain={plain} />
        </Descriptions.Item>
        <Descriptions.Item label="评分">
          <ProField text={3.5} valueType="rate" mode={state} plain={plain} />
        </Descriptions.Item>
        <Descriptions.Item label="slider">
          <ProField text="40" valueType="slider" mode={state} plain={plain} />
        </Descriptions.Item>
        <Descriptions.Item label="选择框">
          <ProField
            text="open"
            mode={state}
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
            text={['open', 'closed']}
            mode={state}
            valueType="checkbox"
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
        <Descriptions.Item label="多选 labelInValue">
          <ProField
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
            mode={state}
            valueType="checkbox"
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
        <Descriptions.Item label="单选">
          <ProField
            text="open"
            mode={state}
            valueType="radio"
            fieldProps={{
              layout: 'horizontal',
            }}
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
        <Descriptions.Item label="单选按钮">
          <ProField
            text="open"
            mode={state}
            valueType="radioButton"
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
        <Descriptions.Item label="远程选择框">
          <ProField
            text="open"
            mode={state}
            params={{
              name: 'test',
            }}
            valueType="select"
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
          />
        </Descriptions.Item>
        <Descriptions.Item label="远程级联框">
          <ProField
            mode={state}
            params={{
              name: 'test',
            }}
            valueType="cascader"
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
          />
        </Descriptions.Item>
        <Descriptions.Item label="进度条">
          <ProField text="40" valueType="progress" mode={state} plain={plain} />
        </Descriptions.Item>
        <Descriptions.Item label="进度条">
          <ProField
            text="40%"
            valueType="progress"
            mode={state}
            plain={plain}
          />
        </Descriptions.Item>
        <Descriptions.Item label="进度条">
          <ProField
            text="love"
            valueType="progress"
            mode={state}
            plain={plain}
          />
        </Descriptions.Item>
        <Descriptions.Item label="百分比空值">
          <ProField valueType="percent" mode="read" />
        </Descriptions.Item>
        <Descriptions.Item label="百分比">
          <Space>
            <ProField
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
              mode="read"
            />
            <ProField
              text={0}
              valueType={{
                type: 'percent',
                showSymbol: true,
                showColor: true,
              }}
              mode="read"
            />
            <ProField
              text={-10}
              valueType={{
                type: 'percent',
                showSymbol: true,
                showColor: true,
              }}
              mode="read"
            />
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="日期时间">
          <ProField
            text={dayjs('2019-11-16 12:50:26').valueOf()}
            valueType="dateTime"
            mode={state}
            plain={plain}
          />
        </Descriptions.Item>
        <Descriptions.Item label="相对于当前时间">
          <Space>
            <ProField
              text={dayjs('2019-11-16 12:50:26').valueOf()}
              valueType="fromNow"
              mode={state}
              plain={plain}
            />
            <ProField
              text={dayjs('2020-11-16 12:50:26').valueOf()}
              valueType="fromNow"
              mode={state}
              plain={plain}
            />
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="日期">
          <ProField
            text={dayjs('2019-11-16 12:50:26').valueOf()}
            valueType="date"
            mode={state}
            plain={plain}
          />
        </Descriptions.Item>
        <Descriptions.Item label="日期区间">
          <ProField
            text={[
              dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(),
              dayjs('2019-11-16 12:50:26').valueOf(),
            ]}
            plain={plain}
            valueType="dateRange"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="日期时间区间">
          <ProField
            text={[
              dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(),
              dayjs('2019-11-16 12:50:26').valueOf(),
            ]}
            plain={plain}
            valueType="dateTimeRange"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="时间">
          <ProField
            text={dayjs('2019-11-16 12:50:26').valueOf()}
            plain={plain}
            valueType="time"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="时间区间">
          <ProField
            text={[
              dayjs('2019-11-16 12:50:26').add(-1, 'd').valueOf(),
              dayjs('2019-11-16 12:50:26').valueOf(),
            ]}
            plain={plain}
            valueType="timeRange"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="密码">
          <ProField
            text="password"
            plain={plain}
            valueType="password"
            mode={state}
          />
        </Descriptions.Item>
        <Descriptions.Item label="代码块">
          <ProField
            text={`
yarn run v1.22.0            
$ eslint --format=pretty ./packages
Done in 9.70s.
          `}
            valueType="code"
            mode={state}
            plain={plain}
          />
        </Descriptions.Item>
        <Descriptions.Item label="JSON 代码块">
          <ProField
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
            mode={state}
            plain={plain}
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
