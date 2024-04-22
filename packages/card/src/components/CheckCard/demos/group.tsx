import { CheckCard } from '@ant-design/pro-components';
import { Divider } from 'antd';

export default () => (
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
);
