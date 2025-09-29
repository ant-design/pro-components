import { ProCard } from '@xxlabs/pro-components';

export default () => {
  return (
    <>
      <ProCard
        tabs={{
          type: 'card',
          items: [
            {
              key: 'tab1',
              label: 'Product One',
              children: 'Content One',
            },
            {
              key: 'tab2',
              label: 'Product Two',
              children: 'Content Two',
            },
          ],
        }}
      />

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProCard Tabs Card 类型 Props 说明：</h4>
        <ul>
          <li>
            <strong>tabs.type</strong>: 标签页类型，'card' 表示卡片式标签页
          </li>
          <li>
            <strong>tabs.items</strong>: 标签页配置数组
          </li>
        </ul>
        <h4>Tab Item 配置：</h4>
        <ul>
          <li>
            <strong>key</strong>: 标签页的唯一标识
          </li>
          <li>
            <strong>label</strong>: 标签页标题
          </li>
          <li>
            <strong>children</strong>: 标签页内容
          </li>
        </ul>
        <h4>Card 类型特点：</h4>
        <ul>
          <li>
            <strong>卡片样式</strong>: 标签页以卡片形式显示
          </li>
          <li>
            <strong>视觉分离</strong>: 每个标签页都有独立的卡片边框
          </li>
          <li>
            <strong>突出显示</strong>: 当前选中的标签页更加突出
          </li>
        </ul>
        <h4>与其他类型的区别：</h4>
        <ul>
          <li>
            <strong>line 类型</strong>: 默认类型，使用下划线标识当前标签
          </li>
          <li>
            <strong>card 类型</strong>: 使用卡片样式，视觉分离更明显
          </li>
          <li>
            <strong>editable-card 类型</strong>: 可编辑的卡片式标签页
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>产品展示</strong>: 展示不同产品的详细信息
          </li>
          <li>
            <strong>功能模块</strong>: 展示不同的功能模块
          </li>
          <li>
            <strong>内容分类</strong>: 对内容进行分类展示
          </li>
          <li>
            <strong>设置页面</strong>: 不同设置选项的展示
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>标签清晰</strong>: 确保标签标题清晰易懂
          </li>
          <li>
            <strong>内容相关</strong>: 确保标签页内容与标题相关
          </li>
          <li>
            <strong>数量控制</strong>: 避免过多的标签页影响用户体验
          </li>
        </ul>
      </div>
    </>
  );
};
