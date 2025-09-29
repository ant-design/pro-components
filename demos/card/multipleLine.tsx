import { ProCard } from '@xxlabs/pro-components';

export default () => {
  return (
    <>
      <ProCard wrap gutter={[16, 16]} style={{ marginBlockStart: 8 }} title="Wrap">
        <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }} layout="center" variant="outlined">
          Col
        </ProCard>
        <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }} layout="center" variant="outlined">
          Col
        </ProCard>
        <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }} layout="center" variant="outlined">
          Col
        </ProCard>
        <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }} variant="outlined">
          Col
        </ProCard>
      </ProCard>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProCard 多行布局 Props 说明：</h4>
        <ul>
          <li>
            <strong>gutter</strong>: 间距设置，[16, 16] 表示水平和垂直间距都是 16px
          </li>
          <li>
            <strong>wrap</strong>: 是否允许换行，布尔值
          </li>
          <li>
            <strong>title</strong>: 卡片标题
          </li>
          <li>
            <strong>style</strong>: 卡片样式对象
          </li>
        </ul>
        <h4>子卡片配置：</h4>
        <ul>
          <li>
            <strong>colSpan</strong>: 响应式栅格列数配置对象
          </li>
          <li>
            <strong>layout</strong>: 布局方式，'center' 表示居中对齐
          </li>
          <li>
            <strong>variant</strong>: 卡片变体样式，'outlined' 表示带边框
          </li>
        </ul>
        <h4>响应式 ColSpan 配置：</h4>
        <ul>
          <li>
            <strong>xs</strong>: 超小屏幕 (&lt;576px)，占 24 列（全宽）
          </li>
          <li>
            <strong>sm</strong>: 小屏幕 (≥576px)，占 12 列（半宽）
          </li>
          <li>
            <strong>md</strong>: 中等屏幕 (≥768px)，占 12 列（半宽）
          </li>
          <li>
            <strong>lg</strong>: 大屏幕 (≥992px)，占 12 列（半宽）
          </li>
          <li>
            <strong>xl</strong>: 超大屏幕 (≥1200px)，占 12 列（半宽）
          </li>
        </ul>
        <h4>Wrap 换行特点：</h4>
        <ul>
          <li>
            <strong>自动换行</strong>: 当子卡片总宽度超过容器宽度时自动换行
          </li>
          <li>
            <strong>响应式换行</strong>: 在不同屏幕尺寸下自动调整换行
          </li>
          <li>
            <strong>间距保持</strong>: 换行后保持设定的间距
          </li>
        </ul>
        <h4>布局效果：</h4>
        <ul>
          <li>
            <strong>小屏幕</strong>: 每个卡片占满宽度，垂直排列
          </li>
          <li>
            <strong>大屏幕</strong>: 每行显示两个卡片，水平排列
          </li>
          <li>
            <strong>自动换行</strong>: 超出容器宽度的卡片自动换到下一行
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>响应式布局</strong>: 构建响应式的卡片网格
          </li>
          <li>
            <strong>产品展示</strong>: 展示产品列表或卡片
          </li>
          <li>
            <strong>数据展示</strong>: 展示多个数据卡片
          </li>
          <li>
            <strong>仪表盘</strong>: 构建响应式仪表盘
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>响应式设计</strong>: 确保在不同屏幕尺寸下都有良好的显示效果
          </li>
          <li>
            <strong>间距合理</strong>: 设置合适的间距，避免过于拥挤或稀疏
          </li>
          <li>
            <strong>内容一致</strong>: 确保子卡片的内容高度相对一致
          </li>
        </ul>
      </div>
    </>
  );
};
