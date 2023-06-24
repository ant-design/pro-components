import { EllipsisOutlined } from '@ant-design/icons';
import { CheckCard } from '@ant-design/pro-components';
import { Dropdown, message } from 'antd';

export default () => (
  <CheckCard
    avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
    title="示例一"
    description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
    extra={
      <Dropdown
        placement="topCenter"
        menu={{
          onClick: ({ domEvent }) => {
            domEvent.stopPropagation();
            message.info('menu click');
          },
          items: [
            {
              label: '菜单',
              key: '1',
            },
            {
              label: '列表',
              key: '2',
            },
            {
              label: '表单',
              key: '3',
            },
          ],
        }}
      >
        <EllipsisOutlined
          style={{ fontSize: 22, color: 'rgba(0,0,0,0.5)' }}
          onClick={(e) => e.stopPropagation()}
        />
      </Dropdown>
    }
  />
);
