import React from 'react';
import { Button, List, Typography } from 'antd';
import { ListToolBar } from '@ant-design/pro-list';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
const toolbar = (
  <ListToolBar
    style={{
      margin: '-16px -24px',
    }}
    title="这里是标题"
    subTitle="这里是子标题"
    description="这是一个段描述"
    search={{
      placeholder: '请输入订单号',
      onSearch: (value) => {
        alert(value);
      },
    }}
    actions={[<Button type="primary">批量导入</Button>]}
  />
);

export default () => (
  <List
    header={toolbar}
    footer={<div>Footer</div>}
    bordered
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <Typography.Text mark>[ITEM]</Typography.Text> {item}
      </List.Item>
    )}
  />
);
