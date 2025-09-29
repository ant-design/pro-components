/**
 * title: 单选模式
 */
import { CheckCard } from '@xxlabs/pro-components';

export default () => (
  <>
    <CheckCard.Group
      defaultValue="A"
      onChange={(value) => {
        console.log('value', value);
      }}
    >
      <CheckCard description="选项一" title="Card A" value="A" />
      <CheckCard description="选项二" title="Card B" value="B" />
      <CheckCard disabled description="选项三，这是一个不可选项" title="Card C" value="C" />
    </CheckCard.Group>

    <div
      style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '6px',
      }}
    >
      <h4>CheckCard.Group Props 说明：</h4>
      <ul>
        <li>
          <strong>onChange</strong>: 选中值改变时的回调函数，参数为选中的 value
        </li>
        <li>
          <strong>defaultValue</strong>: 默认选中的值
        </li>
        <li>
          <strong>value</strong>: 受控的选中值
        </li>
        <li>
          <strong>multiple</strong>: 是否支持多选，默认为 false（单选）
        </li>
        <li>
          <strong>children</strong>: CheckCard 子组件
        </li>
      </ul>
      <h4>CheckCard 在 Group 中的 Props：</h4>
      <ul>
        <li>
          <strong>value</strong>: 选项的值，用于标识该选项
        </li>
        <li>
          <strong>title</strong>: 卡片标题
        </li>
        <li>
          <strong>description</strong>: 卡片描述
        </li>
        <li>
          <strong>disabled</strong>: 是否禁用该选项
        </li>
      </ul>
    </div>
  </>
);
