import { CheckCard } from '@ant-design/pro-components';
import { Divider } from 'antd';

export default () => (
  <>
    <div style={{ padding: 24 }}>
      <CheckCard.Group
        size="small"
        options={['🍎 Apple', '🍐 Pear', '🍊 Orange']}
      />
      <br />
      <CheckCard.Group
        size="small"
        loading
        options={['🍎 Apple', '🍐 Pear', '🍊 Orange']}
      />
      <br />
      <Divider />
      <CheckCard.Group
        size="small"
        options={[
          {
            title: 'Fruit',
            value: 'Fruit',
            children: [
              {
                title: '🍎 Apple',
                value: 'apple',
              },
              {
                title: '🍐 Pear',
                value: 'pear',
              },
              {
                title: '🍊 Orange',
                value: 'orange',
              },
            ],
          },
        ]}
      />
      <Divider />
      <br />
      <CheckCard.Group defaultValue="A">
        <CheckCard title="🍊 Orange" value="🍊 Orange" />
        <CheckCard title="🍐 Pear" value="🍐 Pear" />
        <CheckCard title="🍎 Apple" value="🍎 Apple" />
      </CheckCard.Group>
      <br />
      <Divider />
      <CheckCard.Group defaultValue="A" loading>
        <CheckCard title="🍊 Orange" value="🍊 Orange" />
        <CheckCard title="🍐 Pear" value="🍐 Pear" />
        <CheckCard title="🍎 Apple" value="🍎 Apple" />
      </CheckCard.Group>
    </div>

    <div
      style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '6px',
      }}
    >
      <h4>CheckCard.Group Options Props 说明：</h4>
      <ul>
        <li>
          <strong>options</strong>: 选项配置，可以是字符串数组或对象数组
        </li>
        <li>
          <strong>size</strong>: 卡片尺寸，可选值：'large' | 'default' | 'small'
        </li>
        <li>
          <strong>loading</strong>: 是否显示加载状态，布尔值
        </li>
        <li>
          <strong>defaultValue</strong>: 默认选中的值
        </li>
      </ul>
      <h4>Options 配置方式：</h4>
      <ul>
        <li>
          <strong>字符串数组</strong>: ['🍎 Apple', '🍐 Pear', '🍊
          Orange']，自动生成 CheckCard
        </li>
        <li>
          <strong>对象数组</strong>: 包含 title、value、children 等属性的对象
        </li>
        <li>
          <strong>子组件方式</strong>: 直接使用 CheckCard 子组件
        </li>
      </ul>
      <h4>Option 对象属性：</h4>
      <ul>
        <li>
          <strong>title</strong>: 选项标题，显示文本
        </li>
        <li>
          <strong>value</strong>: 选项值，用于标识和表单绑定
        </li>
        <li>
          <strong>children</strong>: 子选项数组，支持嵌套结构
        </li>
        <li>
          <strong>description</strong>: 选项描述信息
        </li>
        <li>
          <strong>avatar</strong>: 选项头像
        </li>
      </ul>
      <h4>Loading 状态：</h4>
      <ul>
        <li>
          <strong>loading</strong>: 设置为 true 时显示加载动画
        </li>
        <li>
          <strong>适用场景</strong>: 数据加载中、异步操作等
        </li>
        <li>
          <strong>视觉效果</strong>: 卡片会显示骨架屏或加载动画
        </li>
      </ul>
      <h4>使用建议：</h4>
      <ul>
        <li>
          <strong>简单选项</strong>: 使用字符串数组或简单对象数组
        </li>
        <li>
          <strong>复杂选项</strong>: 使用 CheckCard 子组件方式
        </li>
        <li>
          <strong>嵌套结构</strong>: 使用 children 属性创建分组
        </li>
      </ul>
    </div>
  </>
);
