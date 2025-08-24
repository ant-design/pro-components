import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard
        title="Title"
        extra="extra"
        layout="center"
        direction="column"
        style={{ maxWidth: 300, height: 200 }}
      >
        <div>123</div>
        <div>456</div>
      </ProCard>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProCard Layout Props 说明：</h4>
        <ul>
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
            <strong>direction</strong>: 排列方向，'column' 表示垂直排列
          </li>
          <li>
            <strong>style</strong>: 卡片样式对象，设置尺寸
          </li>
          <li>
            <strong>children</strong>: 卡片内容
          </li>
        </ul>
        <h4>Layout 布局方式：</h4>
        <ul>
          <li>
            <strong>default</strong>: 默认布局，左对齐
          </li>
          <li>
            <strong>center</strong>: 居中对齐
          </li>
          <li>
            <strong>right</strong>: 右对齐
          </li>
        </ul>
        <h4>Direction 排列方向：</h4>
        <ul>
          <li>
            <strong>row</strong>: 水平排列（默认）
          </li>
          <li>
            <strong>column</strong>: 垂直排列
          </li>
        </ul>
        <h4>样式配置：</h4>
        <ul>
          <li>
            <strong>maxWidth</strong>: 设置最大宽度，避免在大屏幕上过宽
          </li>
          <li>
            <strong>height</strong>: 设置固定高度，确保一致的视觉效果
          </li>
        </ul>
        <h4>布局效果：</h4>
        <ul>
          <li>
            <strong>居中对齐</strong>: 内容在卡片中居中对齐
          </li>
          <li>
            <strong>垂直排列</strong>: 子元素垂直堆叠排列
          </li>
          <li>
            <strong>固定尺寸</strong>: 卡片有固定的宽度和高度
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>信息展示</strong>: 居中展示重要信息
          </li>
          <li>
            <strong>状态卡片</strong>: 展示状态或统计信息
          </li>
          <li>
            <strong>操作面板</strong>: 构建操作按钮面板
          </li>
          <li>
            <strong>仪表盘</strong>: 构建数据仪表盘组件
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>内容简洁</strong>: 居中对齐适合简洁的内容
          </li>
          <li>
            <strong>尺寸合理</strong>: 设置合适的尺寸，避免内容溢出
          </li>
          <li>
            <strong>视觉平衡</strong>: 确保整体布局的视觉平衡
          </li>
        </ul>
      </div>
    </>
  );
};
