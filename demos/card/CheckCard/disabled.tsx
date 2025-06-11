import { CheckCard } from '@ant-design/pro-components';

export default () => (
  <>
    <div>
      <h3>部分不可用</h3>
      <CheckCard
        title="Card title"
        description="This is the description"
        avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
      />
      <CheckCard
        title="Card title"
        description="This is the description"
        disabled
        avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
      />
      <CheckCard
        title="Card title"
        description="This is the description"
        disabled
        defaultChecked
        avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
      />
    </div>
    <div>
      <h3>整体不可用</h3>
      <CheckCard.Group disabled defaultValue="A">
        <CheckCard title="Card A" description="选项一" value="A" />
        <CheckCard title="Card B" description="选项二" value="B" />
      </CheckCard.Group>
    </div>
  </>
);
