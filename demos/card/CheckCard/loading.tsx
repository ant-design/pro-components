import { CheckCard } from '@ant-design/pro-components';

export default () => (
    <div style={{ padding: 24 }}>

  <>
    <CheckCard loading />

    <div
      style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '6px',
      }}
    >
      <h4>CheckCard Loading Props 说明：</h4>
      <ul>
        <li>
          <strong>loading</strong>: 是否显示加载状态，布尔值
        </li>
      </ul>
      <h4>Loading 状态特点：</h4>
      <ul>
        <li>
          <strong>骨架屏</strong>: 显示骨架屏效果，模拟内容加载
        </li>
        <li>
          <strong>禁用交互</strong>: 加载状态下卡片不可点击
        </li>
        <li>
          <strong>视觉反馈</strong>: 提供明确的加载状态指示
        </li>
        <li>
          <strong>自动布局</strong>: 保持与正常状态相同的布局结构
        </li>
      </ul>
      <h4>使用场景：</h4>
      <ul>
        <li>
          <strong>数据加载</strong>: 异步获取卡片数据时显示
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
      <h4>与其他属性的组合：</h4>
      <ul>
        <li>
          <strong>loading + title</strong>: 加载状态下仍可显示标题
        </li>
        <li>
          <strong>loading + avatar</strong>: 头像区域显示骨架屏
        </li>
        <li>
          <strong>loading + description</strong>: 描述区域显示骨架屏
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
      </ul>
    </div>
  </>

    </div>
  );
