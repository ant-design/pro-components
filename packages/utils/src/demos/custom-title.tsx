import React from 'react';
import { Button, Badge } from 'antd';
import { ListToolBar } from '@ant-design/pro-utils';

export default () => (
  <ListToolBar
    style={{
      boxShadow: '0 0 3px #ccc',
    }}
    title={
      <span>
        <strong>我是自定义内容</strong>
        <Badge count={109} style={{ backgroundColor: '#52c41a', marginTop: -3, marginLeft: 2 }} />
      </span>
    }
    actions={[<Button type="primary">批量导入</Button>]}
  />
);
