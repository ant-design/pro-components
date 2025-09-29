import { ProFormSelect } from '@xxlabs/pro-components';

export default function App() {
  return (
    <div>
      <ProFormSelect
        allowClear
        secondary
        fieldProps={{
          fieldNames: {
            value: 'v',
            label: 'l',
            options: 'options',
          },
          showSearch: true, // 使单选模式可搜索
          autoClearSearchValue: true,
        }}
        mode="tags"
        name="name"
        options={
          [
            {
              v: 'v1',
              l: 'l1',
            },
            {
              v: 'v2',
              l: 'l3',
            },
            {
              v: 'v4',
              l: 'l5',
            },
          ] as any
        }
        placeholder="请输入搜索关键字"
        width={330}
      />

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProFormSelect 搜索值自动清除 Props 说明：</h4>
        <ul>
          <li>
            <strong>name</strong>: 字段名
          </li>
          <li>
            <strong>placeholder</strong>: 占位符文本
          </li>
          <li>
            <strong>allowClear</strong>: 是否允许清除
          </li>
          <li>
            <strong>width</strong>: 控件宽度
          </li>
          <li>
            <strong>secondary</strong>: 是否使用次要样式
          </li>
          <li>
            <strong>mode</strong>: 选择模式，'tags' 表示标签模式
          </li>
          <li>
            <strong>options</strong>: 选项数组
          </li>
          <li>
            <strong>fieldProps</strong>: 字段属性配置
          </li>
        </ul>
        <h4>fieldProps 配置：</h4>
        <ul>
          <li>
            <strong>fieldNames</strong>: 字段名映射配置
          </li>
          <li>
            <strong>showSearch</strong>: 是否显示搜索功能
          </li>
          <li>
            <strong>autoClearSearchValue</strong>: 是否自动清除搜索值
          </li>
        </ul>
        <h4>fieldNames 配置：</h4>
        <ul>
          <li>
            <strong>value</strong>: 值字段名
          </li>
          <li>
            <strong>label</strong>: 标签字段名
          </li>
          <li>
            <strong>options</strong>: 选项字段名
          </li>
          <li>
            <strong>字段映射</strong>: 将自定义字段名映射为标准字段名
          </li>
        </ul>
        <h4>选项配置：</h4>
        <ul>
          <li>
            <strong>v</strong>: 选项值
          </li>
          <li>
            <strong>l</strong>: 选项标签
          </li>
          <li>
            <strong>自定义字段</strong>: 使用自定义字段名结构
          </li>
        </ul>
        <h4>搜索功能特点：</h4>
        <ul>
          <li>
            <strong>搜索输入</strong>: 支持输入关键字进行搜索
          </li>
          <li>
            <strong>自动清除</strong>: 选择后自动清除搜索框的值
          </li>
          <li>
            <strong>标签模式</strong>: 支持多选标签模式
          </li>
          <li>
            <strong>字段映射</strong>: 支持自定义字段名映射
          </li>
        </ul>
        <h4>布局特点：</h4>
        <ul>
          <li>
            <strong>固定宽度</strong>: 使用固定宽度 330px
          </li>
          <li>
            <strong>次要样式</strong>: 使用次要样式显示
          </li>
          <li>
            <strong>响应式设计</strong>: 自动适配不同屏幕尺寸
          </li>
          <li>
            <strong>清晰布局</strong>: 提供清晰的输入和选择界面
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>多选搜索</strong>: 需要多选和搜索功能的场景
          </li>
          <li>
            <strong>自定义字段</strong>: 使用自定义字段名结构的场景
          </li>
          <li>
            <strong>自动清除</strong>: 需要选择后自动清除搜索值的场景
          </li>
          <li>
            <strong>标签选择</strong>: 需要标签形式多选的场景
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>字段映射</strong>: 合理配置字段名映射关系
          </li>
          <li>
            <strong>搜索配置</strong>: 根据需求配置搜索功能
          </li>
          <li>
            <strong>自动清除</strong>: 合理使用自动清除功能
          </li>
          <li>
            <strong>用户体验</strong>: 提供清晰的搜索和选择体验
          </li>
        </ul>
      </div>
    </div>
  );
}
