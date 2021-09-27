/** Uuid: 0cdbe369 title: 选项不可用 */

import React from 'react';
import { CheckCard } from '@ant-design/pro-card';

export default () => (
  <>
    <div>
      <h3>部分不可用</h3>
      <CheckCard
        title="Card title"
        description="This is the description"
        avatar="https://gw-office.alipayobjects.com/basement_prod/f31dc3f7-cdc0-42ac-a075-f173fe5d5043.svg"
      />
      <CheckCard
        title="Card title"
        description="This is the description"
        disabled
        avatar="https://gw-office.alipayobjects.com/basement_prod/f31dc3f7-cdc0-42ac-a075-f173fe5d5043.svg"
      />
      <CheckCard
        title="Card title"
        description="This is the description"
        disabled
        defaultChecked
        avatar="https://gw-office.alipayobjects.com/basement_prod/f31dc3f7-cdc0-42ac-a075-f173fe5d5043.svg"
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
