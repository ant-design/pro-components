/** Title: 基本使用 */
import { CheckCard } from '@ant-design/pro-components';

export default () => (
    <div style={{ padding: 24 }}>

  <>
    <CheckCard
      avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
      title="示例一"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
      onChange={(checked) => {
        console.log('checked', checked
    </div>
  );
      }}
      defaultChecked
      onClick={() => {
        console.log('clicked');
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
      <h4>CheckCard Props 说明：</h4>
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
        <li>
          <strong>onChange</strong>: 选中状态改变时的回调函数，参数为
          checked（布尔值）
        </li>
        <li>
          <strong>defaultChecked</strong>: 默认是否选中，布尔值
        </li>
        <li>
          <strong>onClick</strong>: 点击卡片时的回调函数
        </li>
        <li>
          <strong>checked</strong>: 受控的选中状态，布尔值
        </li>
        <li>
          <strong>disabled</strong>: 是否禁用，布尔值
        </li>
        <li>
          <strong>size</strong>: 卡片尺寸，可选值：'default' | 'small' | 'large'
        </li>
      </ul>
    </div>
  </>
);
