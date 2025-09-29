import { CheckCard } from '@xxlabs/pro-components';

export default () => (
  <>
    <div>
      <h3>部分不可用</h3>
      <CheckCard
        avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
        description="This is the description"
        title="Card title"
      />
      <CheckCard
        disabled
        avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
        description="This is the description"
        title="Card title"
      />
      <CheckCard
        defaultChecked
        disabled
        avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
        description="This is the description"
        title="Card title"
      />
    </div>
    <div>
      <h3>整体不可用</h3>
      <CheckCard.Group disabled defaultValue="A">
        <CheckCard description="选项一" title="Card A" value="A" />
        <CheckCard description="选项二" title="Card B" value="B" />
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
      <h4>CheckCard Disabled Props 说明：</h4>
      <ul>
        <li>
          <strong>disabled</strong>: 是否禁用卡片，禁用后无法点击和选择
        </li>
        <li>
          <strong>defaultChecked</strong>: 默认选中状态，即使禁用也可以设置默认选中
        </li>
        <li>
          <strong>title</strong>: 卡片标题
        </li>
        <li>
          <strong>description</strong>: 卡片描述信息
        </li>
        <li>
          <strong>avatar</strong>: 卡片头像
        </li>
      </ul>
      <h4>CheckCard.Group Disabled Props：</h4>
      <ul>
        <li>
          <strong>disabled</strong>: 禁用整个组，所有子卡片都会被禁用
        </li>
        <li>
          <strong>defaultValue</strong>: 默认选中的值
        </li>
      </ul>
      <h4>禁用状态说明：</h4>
      <ul>
        <li>
          <strong>单个禁用</strong>: 在 CheckCard 上设置 disabled 属性
        </li>
        <li>
          <strong>组级禁用</strong>: 在 CheckCard.Group 上设置 disabled 属性
        </li>
        <li>
          <strong>默认选中</strong>: 禁用的卡片仍然可以设置 defaultChecked
        </li>
      </ul>
    </div>
  </>
);
