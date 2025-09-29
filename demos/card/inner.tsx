import { ProCard } from '@xxlabs/pro-components';

export default () => {
  return (
    <>
      <ProCard headerBordered gutter={16} title="Horizontal Inner Card" variant="outlined">
        <ProCard title="Inner Card Title" type="inner" variant="outlined">
          Inner Card Content
        </ProCard>
        <ProCard title="Inner Card Title" type="inner" variant="outlined">
          Inner Card Content
        </ProCard>
      </ProCard>

      <ProCard
        headerBordered
        direction="column"
        gutter={[0, 16]}
        style={{ marginBlockStart: 8 }}
        title="Vertical Inner Card"
        variant="outlined"
      >
        <ProCard title="Inner Card Title" type="inner" variant="outlined">
          Inner Card Content
        </ProCard>
        <ProCard title="Inner Card Title" type="inner" variant="outlined">
          Inner Card Content
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
        <h4>ProCard Inner 类型 Props 说明：</h4>
        <ul>
          <li>
            <strong>title</strong>: 卡片标题
          </li>
          <li>
            <strong>type</strong>: 卡片类型，'inner' 表示内部卡片
          </li>
          <li>
            <strong>variant</strong>: 卡片变体样式，'outlined' 表示带边框
          </li>
          <li>
            <strong>headerBordered</strong>: 是否显示头部边框
          </li>
          <li>
            <strong>gutter</strong>: 间距设置，可以是数字或数组
          </li>
          <li>
            <strong>direction</strong>: 排列方向，'column' 表示垂直排列
          </li>
        </ul>
        <h4>Type="inner" 特点：</h4>
        <ul>
          <li>
            <strong>内部卡片</strong>: 作为其他卡片的子卡片使用
          </li>
          <li>
            <strong>视觉层次</strong>: 与父卡片形成视觉层次关系
          </li>
          <li>
            <strong>样式适配</strong>: 样式会自动适配父卡片的主题
          </li>
        </ul>
        <h4>Gutter 间距配置：</h4>
        <ul>
          <li>
            <strong>数字值</strong>: 如 gutter={16}，设置统一的间距
          </li>
          <li>
            <strong>数组值</strong>: 如 gutter={[0, 16]}，分别设置水平和垂直间距
          </li>
          <li>
            <strong>响应式</strong>: 间距会根据屏幕尺寸自动调整
          </li>
        </ul>
        <h4>Direction 方向配置：</h4>
        <ul>
          <li>
            <strong>row</strong>: 水平排列（默认）
          </li>
          <li>
            <strong>column</strong>: 垂直排列
          </li>
        </ul>
        <h4>布局效果：</h4>
        <ul>
          <li>
            <strong>水平布局</strong>: 内部卡片水平排列，适合并排展示
          </li>
          <li>
            <strong>垂直布局</strong>: 内部卡片垂直排列，适合堆叠展示
          </li>
          <li>
            <strong>间距控制</strong>: 通过 gutter 控制卡片之间的间距
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>分组展示</strong>: 将相关内容分组展示
          </li>
          <li>
            <strong>详细信息</strong>: 在父卡片中展示详细信息
          </li>
          <li>
            <strong>配置面板</strong>: 构建复杂的配置面板
          </li>
          <li>
            <strong>仪表盘</strong>: 构建数据仪表盘
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>层次清晰</strong>: 确保父子卡片的层次关系清晰
          </li>
          <li>
            <strong>内容相关</strong>: 内部卡片的内容应该与父卡片相关
          </li>
          <li>
            <strong>间距合理</strong>: 设置合适的间距，避免过于拥挤或稀疏
          </li>
        </ul>
      </div>
    </>
  );
};
