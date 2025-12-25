import { ProCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <>
      <ProCard
        direction="column"
        ghost
        gutter={{
          xs: 8,
          sm: 8,
          md: 8,
          lg: 8,
          xl: 8,
          xxl: 8,
        }}
      >
        <ProCard layout="center" variant="outlined">
          colSpan - 24
        </ProCard>
        <ProCard
          colSpan={{
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12,
            xxl: 24,
          }}
          layout="center"
          variant="outlined"
        >
          colSpan - 12
        </ProCard>
        <ProCard
          colSpan={{
            xs: 24,
            sm: 12,
            md: 8,
            lg: 6,
          }}
          layout="center"
          variant="outlined"
        >
          colSpan - 8
        </ProCard>
        <ProCard colSpan={0} layout="center" variant="outlined">
          colSpan - 0
        </ProCard>
      </ProCard>
      <ProCard gutter={8} title="24 grids" style={{ marginBlockStart: 8 }}>
        <ProCard colSpan={12} layout="center" variant="outlined">
          colSpan-12
        </ProCard>
        <ProCard colSpan={6} layout="center" variant="outlined">
          colSpan-6
        </ProCard>
        <ProCard colSpan={6} layout="center" variant="outlined">
          colSpan-6
        </ProCard>
      </ProCard>
      <ProCard style={{ marginBlockStart: 8 }} gutter={8} ghost>
        <ProCard colSpan="200px" layout="center" variant="outlined">
          colSpan - 200px
        </ProCard>
        <ProCard layout="center" variant="outlined">
          Auto
        </ProCard>
      </ProCard>
      <ProCard style={{ marginBlockStart: 8 }} gutter={8} ghost>
        <ProCard variant="outlined" layout="center">
          Auto
        </ProCard>
        <ProCard colSpan="30%" variant="outlined">
          colSpan - 30%
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
        <h4>ProCard ColSpan 配置 Props 说明：</h4>
        <ul>
          <li>
            <strong>direction</strong>: 排列方向，'column' 表示垂直排列
          </li>
          <li>
            <strong>ghost</strong>: 是否使用幽灵模式，无背景和边框
          </li>
          <li>
            <strong>gutter</strong>: 间距设置，支持响应式配置
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
            <strong>colSpan</strong>: 列跨度，支持多种配置方式
          </li>
          <li>
            <strong>layout</strong>: 布局方式，'center' 表示居中对齐
          </li>
          <li>
            <strong>variant</strong>: 卡片变体样式，'outlined' 表示带边框
          </li>
        </ul>
        <h4>ColSpan 配置方式：</h4>
        <ul>
          <li>
            <strong>数字值</strong>: colSpan={12} 使用 24 栅格系统
          </li>
          <li>
            <strong>响应式对象</strong>: 根据屏幕尺寸设置不同的列数
          </li>
          <li>
            <strong>像素值</strong>: colSpan="200px" 固定宽度
          </li>
          <li>
            <strong>百分比</strong>: colSpan="30%" 相对宽度
          </li>
          <li>
            <strong>零值</strong>: colSpan={0} 隐藏卡片
          </li>
        </ul>
        <h4>响应式断点配置：</h4>
        <ul>
          <li>
            <strong>xs</strong>: 超小屏幕 (&lt;576px)
          </li>
          <li>
            <strong>sm</strong>: 小屏幕 (≥576px)
          </li>
          <li>
            <strong>md</strong>: 中等屏幕 (≥768px)
          </li>
          <li>
            <strong>lg</strong>: 大屏幕 (≥992px)
          </li>
          <li>
            <strong>xl</strong>: 超大屏幕 (≥1200px)
          </li>
          <li>
            <strong>xxl</strong>: 超超大屏幕 (≥1600px)
          </li>
        </ul>
        <h4>布局特点：</h4>
        <ul>
          <li>
            <strong>24 栅格系统</strong>: 使用数字值时，总列数应该为 24
          </li>
          <li>
            <strong>自动宽度</strong>: 不设置 colSpan 时自动填充剩余空间
          </li>
          <li>
            <strong>固定宽度</strong>: 使用像素值时宽度固定不变
          </li>
          <li>
            <strong>相对宽度</strong>: 使用百分比时宽度随容器变化
          </li>
          <li>
            <strong>隐藏卡片</strong>: colSpan={0} 时卡片完全隐藏
          </li>
        </ul>
        <h4>Ghost 模式特点：</h4>
        <ul>
          <li>
            <strong>无背景</strong>: 卡片没有背景色
          </li>
          <li>
            <strong>无边框</strong>: 卡片没有边框
          </li>
          <li>
            <strong>透明效果</strong>: 适合作为布局容器
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>响应式布局</strong>: 构建响应式的卡片网格
          </li>
          <li>
            <strong>固定布局</strong>: 使用固定宽度构建布局
          </li>
          <li>
            <strong>弹性布局</strong>: 使用百分比构建弹性布局
          </li>
          <li>
            <strong>条件显示</strong>: 使用 colSpan={0} 条件隐藏卡片
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>栅格计算</strong>: 使用数字值时确保总列数为 24
          </li>
          <li>
            <strong>响应式设计</strong>: 在不同断点下测试布局效果
          </li>
          <li>
            <strong>混合使用</strong>: 结合多种配置方式构建复杂布局
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
