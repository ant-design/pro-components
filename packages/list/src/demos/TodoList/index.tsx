import React from 'react';
import { DownOutlined, FolderOutlined, RightOutlined } from '@ant-design/icons';
import { Dropdown, Button, Badge, Menu, message } from 'antd';
import ProList from '@ant-design/pro-list'; // https://prolist.ant.design/
import styles from './index.module.less';

export interface List {
  title: string;
  type: string;
  submitPerson: string;
  submitTime: string;
  status: number;
}

const dataSource: List[] = [
  {
    title: '多重正态计算分布',
    type: '申请发布',
    submitPerson: '尔康',
    submitTime: '2019-08-26',
    status: 0,
  },

  {
    title: '多重正态计算分布',
    type: '申请发布',
    submitPerson: '尔康',
    submitTime: '2019-08-26',
    status: 1,
  },
  {
    title: '多重正态计算分布',
    type: '申请发布',
    submitPerson: '尔康',
    submitTime: '2019-08-26',
    status: 2,
  },
];

const TodoList: React.FC = () => {
  const menu = (
    <Menu
      onClick={({ key }) => {
        message.info(key);
      }}
    >
      <Menu.Item key="通过">通过</Menu.Item>
      <Menu.Item key="拒绝">拒绝</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <ProList
        dataSource={dataSource}
        title="待办事项"
        renderItem={(item) => ({
          title: item.title,
          subTitle: item.type,
          description: (
            <div className={styles.labelBox}>
              <span>提交人：{item.submitPerson}</span>
              <span>提交时间：{item.submitTime}</span>
            </div>
          ),
          actions: [
            <div className={styles.control}>
              <span>
                <FolderOutlined style={{ fontSize: 14, marginRight: 4 }} />
                ProList
              </span>
              {item.status ? (
                <span>
                  <Badge status={item.status === 1 ? 'success' : 'error'} />
                  {item.status === 1 ? '已审批' : '已拒绝'}
                </span>
              ) : (
                <span>
                  <Dropdown overlay={menu}>
                    <Button type="primary" size="small">
                      待审批 <DownOutlined />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>,
          ],
        })}
      />
      <div
        className={styles.footer}
        onClick={() => {
          message.info('页面跳转');
        }}
      >
        <div className={styles.more}>
          <span>查看全部</span>
          <RightOutlined style={{ fontSize: 12, marginLeft: 4 }} />
        </div>
      </div>
    </div>
  );
};
export default TodoList;
