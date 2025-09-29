import { CheckCard } from '@xxlabs/pro-components';

export default () => (
  <>
    <CheckCard
      defaultChecked
      avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
      title="示例二"
      onChange={(checked) => {
        console.log('checked', checked);
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
      <h4>CheckCard DefaultChecked Props 说明：</h4>
      <ul>
        <li>
          <strong>defaultChecked</strong>: 默认选中状态，布尔值，组件初始化时生效
        </li>
        <li>
          <strong>onChange</strong>: 选中状态改变时的回调函数
        </li>
        <li>
          <strong>avatar</strong>: 卡片头像
        </li>
        <li>
          <strong>title</strong>: 卡片标题
        </li>
      </ul>
      <h4>DefaultChecked 特点：</h4>
      <ul>
        <li>
          <strong>非受控组件</strong>: 使用 defaultChecked 时，组件内部管理选中状态
        </li>
        <li>
          <strong>初始化生效</strong>: 只在组件首次渲染时生效，后续状态由组件内部管理
        </li>
        <li>
          <strong>用户可交互</strong>: 用户可以通过点击改变选中状态
        </li>
        <li>
          <strong>状态反馈</strong>: 通过 onChange 回调获取状态变化
        </li>
      </ul>
      <h4>OnChange 回调：</h4>
      <ul>
        <li>
          <strong>参数</strong>: checked（布尔值），表示当前选中状态
        </li>
        <li>
          <strong>触发时机</strong>: 用户点击卡片时触发
        </li>
        <li>
          <strong>用途</strong>: 可以用于记录用户选择、触发其他操作等
        </li>
      </ul>
      <h4>与 Checked 的区别：</h4>
      <ul>
        <li>
          <strong>defaultChecked</strong>: 非受控，组件内部管理状态
        </li>
        <li>
          <strong>checked</strong>: 受控，由外部状态管理
        </li>
        <li>
          <strong>使用场景</strong>: defaultChecked 适合简单场景，checked 适合复杂状态管理
        </li>
      </ul>
      <h4>使用建议：</h4>
      <ul>
        <li>
          <strong>简单选择</strong>: 使用 defaultChecked 实现简单的选择功能
        </li>
        <li>
          <strong>状态同步</strong>: 使用 onChange 回调同步状态到外部
        </li>
        <li>
          <strong>默认选中</strong>: 设置 defaultChecked={true} 实现默认选中
        </li>
      </ul>
    </div>
  </>
);
