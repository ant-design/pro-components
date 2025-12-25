import { ProCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <>
      <ProCard loading style={{ maxWidth: 300 }}>
        Content
      </ProCard>

      <ProCard
        loading
        style={{ maxWidth: 300, marginBlockStart: 16 }}
        layout="center"
      >
        Content
      </ProCard>

      <ProCard
        title="Custom Loading"
        extra="extra"
        loading={<div>Loading</div>}
        style={{ maxWidth: 300, marginBlockStart: 16 }}
      >
        Content
      </ProCard>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProCard Loading Props 说明：</h4>
        <ul>
          <li>
            <strong>loading</strong>: 加载状态，可以是布尔值或 React 节点
          </li>
          <li>
            <strong>title</strong>: 卡片标题
          </li>
          <li>
            <strong>extra</strong>: 卡片右上角额外内容
          </li>
          <li>
            <strong>layout</strong>: 布局方式，'center' 表示居中对齐
          </li>
          <li>
            <strong>style</strong>: 卡片样式对象
          </li>
          <li>
            <strong>children</strong>: 卡片内容
          </li>
        </ul>
        <h4>Loading 使用方式：</h4>
        <ul>
          <li>
            <strong>布尔值</strong>: loading={true} 使用默认的骨架屏效果
          </li>
          <li>
            <strong>React 节点</strong>: loading={'{'}{' '}
            &lt;div&gt;Loading&lt;/div&gt; {'}'} 使用自定义加载内容
          </li>
        </ul>
        <h4>默认 Loading 效果：</h4>
        <ul>
          <li>
            <strong>骨架屏</strong>: 显示骨架屏效果，模拟内容加载
          </li>
          <li>
            <strong>禁用交互</strong>: 加载状态下卡片不可交互
          </li>
          <li>
            <strong>视觉反馈</strong>: 提供明确的加载状态指示
          </li>
        </ul>
        <h4>自定义 Loading：</h4>
        <ul>
          <li>
            <strong>自定义内容</strong>: 可以传入任何 React 节点作为加载内容
          </li>
          <li>
            <strong>样式控制</strong>: 完全控制加载内容的样式和布局
          </li>
          <li>
            <strong>品牌一致性</strong>: 使用符合品牌风格的加载内容
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>数据加载</strong>: 异步获取数据时显示
          </li>
          <li>
            <strong>网络请求</strong>: 等待 API 响应时显示
          </li>
          <li>
            <strong>初始化</strong>: 组件初始化过程中显示
          </li>
          <li>
            <strong>状态切换</strong>: 从一种状态切换到另一种状态时显示
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>合理时机</strong>: 在真正需要加载时使用，避免过度使用
          </li>
          <li>
            <strong>用户体验</strong>: 提供清晰的加载状态反馈
          </li>
          <li>
            <strong>性能考虑</strong>: 避免不必要的加载状态切换
          </li>
          <li>
            <strong>自定义设计</strong>: 根据业务需求设计合适的加载内容
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
