import React from 'react';
import { Badge } from 'antd';
import { ListToolBar } from '@ant-design/pro-list';

export default () => (
  <div>
    <ListToolBar
      style={{
        boxShadow: '0 0 3px #ccc',
        marginBottom: 8,
      }}
      menu={{
        type: 'dropdown',
        items: [
          {
            label: '全部事项',
            key: 'all',
          },
          {
            label: '已办事项',
            key: 'done',
          },
        ],
        onChange: (activeKey) => {
          console.log('activeKey', activeKey);
        },
      }}
      search={{
        placeholder: '请输入订单号',
        onSearch: (value) => {
          alert(value);
        },
      }}
    />
    <ListToolBar
      style={{
        boxShadow: '0 0 3px #ccc',
      }}
      menu={{
        type: 'inline',
        items: [
          {
            label: (
              <span>
                全部事项
                <Badge
                  count={101}
                  style={{
                    marginTop: -4,
                    marginLeft: 4,
                    color: '#999',
                    backgroundColor: '#eee',
                  }}
                />
              </span>
            ),
            key: 'all',
          },
          {
            label: (
              <span>
                代办事项
                <Badge
                  count={3}
                  style={{
                    marginTop: -4,
                    marginLeft: 4,
                    color: '#999',
                    backgroundColor: '#eee',
                  }}
                />
              </span>
            ),
            key: 'todo',
          },
        ],
        onChange: (activeKey) => {
          console.log('activeKey', activeKey);
        },
      }}
      search={{
        placeholder: '请输入订单号',
        onSearch: (value) => {
          alert(value);
        },
      }}
    />
  </div>
);
