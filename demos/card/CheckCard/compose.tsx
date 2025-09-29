import { CheckCard } from '@xxlabs/pro-components';

export default () => (
  <>
    <h3>只有图片时</h3>
    <CheckCard avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg" />

    <h3>只有图片和描述时</h3>
    <CheckCard
      avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
    />
    <h3>只有标题和描述时</h3>
    <CheckCard description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。" title="示例" />
    <h3>只有标题和图片</h3>
    <CheckCard
      avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
      title="示例"
    />
    <h3>只有标题</h3>
    <CheckCard title="示例" />
    <h3>只有描述时</h3>
    <CheckCard description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。" />

    <div
      style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '6px',
      }}
    >
      <h4>CheckCard 属性组合说明：</h4>
      <ul>
        <li>
          <strong>avatar</strong>: 卡片头像，可以是图片 URL 或 React 节点
        </li>
        <li>
          <strong>title</strong>: 卡片标题，可以是字符串或 React 节点
        </li>
        <li>
          <strong>description</strong>: 卡片描述信息，可以是字符串或 React 节点
        </li>
      </ul>
      <h4>属性组合效果：</h4>
      <ul>
        <li>
          <strong>只有 avatar</strong>: 显示头像，适合图标展示
        </li>
        <li>
          <strong>avatar + description</strong>: 头像和描述组合，适合产品介绍
        </li>
        <li>
          <strong>title + description</strong>: 标题和描述组合，适合内容展示
        </li>
        <li>
          <strong>title + avatar</strong>: 标题和头像组合，适合品牌展示
        </li>
        <li>
          <strong>只有 title</strong>: 仅显示标题，适合简单标识
        </li>
        <li>
          <strong>只有 description</strong>: 仅显示描述，适合说明文字
        </li>
      </ul>
      <h4>布局特点：</h4>
      <ul>
        <li>
          <strong>自适应布局</strong>: 根据提供的属性自动调整布局
        </li>
        <li>
          <strong>内容居中</strong>: 单个属性时内容会自动居中显示
        </li>
        <li>
          <strong>响应式</strong>: 在不同屏幕尺寸下保持良好的显示效果
        </li>
        <li>
          <strong>灵活组合</strong>: 支持任意属性的组合使用
        </li>
      </ul>
      <h4>使用建议：</h4>
      <ul>
        <li>
          <strong>图标卡片</strong>: 使用只有 avatar 的组合
        </li>
        <li>
          <strong>产品卡片</strong>: 使用 avatar + title + description 组合
        </li>
        <li>
          <strong>内容卡片</strong>: 使用 title + description 组合
        </li>
        <li>
          <strong>品牌卡片</strong>: 使用 title + avatar 组合
        </li>
      </ul>
    </div>
  </>
);
