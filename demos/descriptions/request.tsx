import type { ProDescriptionsActionType } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

const Demo = () => {
  const actionRef = useRef<ProDescriptionsActionType>();
  return (
    <>
      <ProDescriptions
        actionRef={actionRef}
        title="高级定义列表 request"
        request={async () => {
          return Promise.resolve({
            success: true,
            data: { id: '这是一段文本', date: '20200730', money: '12121' },
          });
        }}
        extra={<Button type="link">修改</Button>}
      >
        <ProDescriptions.Item dataIndex="id" />
        <ProDescriptions.Item dataIndex="date" label="日期" valueType="date" />
        <ProDescriptions.Item
          label="money"
          dataIndex="money"
          valueType="money"
        />
        <ProDescriptions.Item label="文本" valueType="option">
          <Button
            type="primary"
            onClick={() => {
              actionRef.current?.reload();
            }}
            key="reload"
          >
            刷新
          </Button>
          <Button key="rest">重置</Button>
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
        <h4>ProDescriptions Request 请求 Props 说明：</h4>
        <ul>
          <li>
            <strong>actionRef</strong>: 操作引用，用于调用组件方法
          </li>
          <li>
            <strong>title</strong>: 描述列表标题
          </li>
          <li>
            <strong>request</strong>: 异步请求函数，返回数据
          </li>
          <li>
            <strong>extra</strong>: 右上角额外内容
          </li>
        </ul>
        <h4>Request 请求配置：</h4>
        <ul>
          <li>
            <strong>异步函数</strong>: 返回 Promise 对象
          </li>
          <li>
            <strong>数据格式</strong>: &#123; success: boolean, data: object
            &#125;
          </li>
          <li>
            <strong>自动加载</strong>: 组件挂载时自动请求数据
          </li>
          <li>
            <strong>错误处理</strong>: 自动处理请求错误
          </li>
        </ul>
        <h4>ProDescriptions.Item 配置：</h4>
        <ul>
          <li>
            <strong>dataIndex</strong>: 数据字段名，自动绑定到 request
            返回的数据
          </li>
          <li>
            <strong>label</strong>: 标签文本
          </li>
          <li>
            <strong>valueType</strong>: 值类型，决定如何渲染数据
          </li>
          <li>
            <strong>children</strong>: 自定义内容，如操作按钮
          </li>
        </ul>
        <h4>ActionRef 操作方法：</h4>
        <ul>
          <li>
            <strong>reload</strong>: 重新加载数据
          </li>
          <li>
            <strong>reset</strong>: 重置数据
          </li>
          <li>
            <strong>clearSelected</strong>: 清除选中状态
          </li>
        </ul>
        <h4>ValueType 类型：</h4>
        <ul>
          <li>
            <strong>date</strong>: 日期格式，自动格式化显示
          </li>
          <li>
            <strong>money</strong>: 金额格式，自动添加货币符号
          </li>
          <li>
            <strong>option</strong>: 操作按钮，支持自定义组件
          </li>
        </ul>
        <h4>Extra 额外内容：</h4>
        <ul>
          <li>
            <strong>React 节点</strong>: 支持任何 React 组件
          </li>
          <li>
            <strong>操作按钮</strong>: 常用于添加操作按钮
          </li>
          <li>
            <strong>样式控制</strong>: 可以自定义样式和交互
          </li>
        </ul>
        <h4>数据绑定特点：</h4>
        <ul>
          <li>
            <strong>自动绑定</strong>: 通过 dataIndex 自动绑定数据
          </li>
          <li>
            <strong>类型安全</strong>: 提供完整的类型检查
          </li>
          <li>
            <strong>响应式更新</strong>: 数据变化时自动更新显示
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>数据展示</strong>: 从 API 获取数据并展示
          </li>
          <li>
            <strong>动态刷新</strong>: 通过按钮刷新数据
          </li>
          <li>
            <strong>操作控制</strong>: 通过 actionRef 控制组件行为
          </li>
          <li>
            <strong>用户交互</strong>: 提供用户操作界面
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>错误处理</strong>: 在 request 中处理请求错误
          </li>
          <li>
            <strong>加载状态</strong>: 提供加载状态反馈
          </li>
          <li>
            <strong>数据验证</strong>: 验证返回数据的格式
          </li>
          <li>
            <strong>用户体验</strong>: 提供清晰的操作反馈
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
