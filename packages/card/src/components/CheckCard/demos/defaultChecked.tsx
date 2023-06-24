import { CheckCard } from '@ant-design/pro-components';

export default () => (
  <CheckCard
    avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
    title="示例二"
    defaultChecked
    onChange={(checked) => {
      console.log('checked', checked);
    }}
  />
);
