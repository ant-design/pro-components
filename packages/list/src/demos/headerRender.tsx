import React from 'react';
import { Button, Badge, Statistic } from 'antd';
import ProList, { ListToolBar } from '@ant-design/pro-list';

const dataSource = ['语雀的天空', 'Ant Design', '蚂蚁金服体验科技', 'TechUI'];
export default () => {
  return (
    <ProList<string>
      style={{
        background: '#FFF',
        marginBottom: 16,
      }}
      headerRender={() => {
        const renderBadge = (count: number) => {
          return (
            <Badge
              count={count}
              style={{
                marginTop: -4,
                marginLeft: 4,
                color: '#999',
                backgroundColor: '#eee',
              }}
            />
          );
        };
        return (
          <ListToolBar
            menu={{
              type: 'inline',
              items: [
                {
                  label: <span>全部应用{renderBadge(101)}</span>,
                  key: 'all',
                },
                {
                  label: <span>我创建的应用{renderBadge(3)}</span>,
                  key: 'todo',
                },
              ],
            }}
            search={{
              placeholder: '搜索应用',
            }}
            actions={[<Button type="primary">新建应用</Button>]}
          />
        );
      }}
      rowKey="id"
      dataSource={dataSource}
      renderItem={(item) => ({
        title: item,
        actions: [<a>编辑</a>, <a>复制</a>, <a>删除</a>],
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team',
        children: (
          <div style={{ textAlign: 'center' }}>
            <Statistic title="模型数" value={2903} valueStyle={{ fontSize: 16 }} />
          </div>
        ),
      })}
    />
  );
};
