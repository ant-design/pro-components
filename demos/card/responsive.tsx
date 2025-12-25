import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard style={{ marginBlockStart: 8 }} gutter={8} title="24 Grid">
        <ProCard
          colSpan={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }}
          layout="center"
          variant="outlined"
        >
          Col
        </ProCard>
        <ProCard
          colSpan={{ xs: 20, sm: 16, md: 12, lg: 8, xl: 4 }}
          layout="center"
          variant="outlined"
        >
          Col
        </ProCard>
        <ProCard
          colSpan={{ xs: 2, sm: 4, md: 6, lg: 8, xl: 10 }}
          layout="center"
          variant="outlined"
        >
          Col
        </ProCard>
      </ProCard>
      <ProCard
        style={{ marginBlockStart: 8 }}
        gutter={8}
        title="Specified Width px"
      >
        <ProCard
          colSpan={{
            xs: '50px',
            sm: '100px',
            md: '200px',
            lg: '300px',
            xl: '400px',
          }}
          layout="center"
          variant="outlined"
        >
          Col
        </ProCard>
        <ProCard layout="center" variant="outlined">
          Auto
        </ProCard>
      </ProCard>

      <ProCard
        style={{ marginBlockStart: 8 }}
        gutter={8}
        title="Specified Width Percentage"
      >
        <ProCard layout="center" variant="outlined">
          Auto
        </ProCard>
        <ProCard
          layout="center"
          colSpan={{
            xs: '10%',
            sm: '20%',
            md: '30%',
            lg: '40%',
            xl: '50%',
          }}
          variant="outlined"
        >
          Col - Percentage
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
        <h4>ProCard 响应式布局 Props 说明：</h4>
        <ul>
          <li>
            <strong>gutter</strong>: 间距设置，数字值表示统一的间距
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
            <strong>colSpan</strong>: 响应式栅格列数配置，支持多种格式
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
            <strong>数字值</strong>: 如 {'{'} xs: 2, sm: 4 {'}'}，使用 24
            栅格系统
          </li>
          <li>
            <strong>像素值</strong>: 如 {'{'} xs: '50px', sm: '100px' {'}'}{' '}
            ，固定宽度
          </li>
          <li>
            <strong>百分比</strong>: 如 {'{'} xs: '10%', sm: '20%' {'}'}
            ，相对宽度
          </li>
        </ul>
        <h4>响应式断点：</h4>
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
        </ul>
        <h4>布局特点：</h4>
        <ul>
          <li>
            <strong>24 栅格系统</strong>: 使用数字值时，总列数应该为 24
          </li>
          <li>
            <strong>固定宽度</strong>: 使用像素值时，卡片宽度固定不变
          </li>
          <li>
            <strong>相对宽度</strong>: 使用百分比时，卡片宽度随容器变化
          </li>
          <li>
            <strong>自动宽度</strong>: 不设置 colSpan 时，卡片自动填充剩余空间
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>栅格布局</strong>: 使用数字值构建响应式栅格
          </li>
          <li>
            <strong>固定布局</strong>: 使用像素值构建固定宽度的布局
          </li>
          <li>
            <strong>弹性布局</strong>: 使用百分比构建弹性布局
          </li>
          <li>
            <strong>混合布局</strong>: 结合多种配置方式构建复杂布局
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
            <strong>性能考虑</strong>: 避免过于复杂的响应式配置
          </li>
        </ul>
      </div>
    </>
  );
};
