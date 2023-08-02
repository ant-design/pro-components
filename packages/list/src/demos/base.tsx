import { ProList } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';

const dataSource = [
  {
    name: '语雀的天空',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    name: 'Ant Design',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    name: '蚂蚁金服体验科技',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
  {
    name: 'TechUI',
    image:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    desc: '我是一条测试的描述',
  },
];

export default () => (
  <ProList<any>
    toolBarRender={() => {
      return [
        <Button key="add" type="primary">
          新建
        </Button>,
      ];
    }}
    onRow={(record: any) => {
      return {
        onMouseEnter: () => {
          console.log(record);
        },
        onClick: () => {
          console.log(record);
        },
      };
    }}
    rowKey="name"
    headerTitle="基础列表"
    tooltip="基础列表的配置"
    dataSource={dataSource}
    showActions="hover"
    showExtra="hover"
    metas={{
      title: {
        dataIndex: 'name',
      },
      avatar: {
        dataIndex: 'image',
      },
      description: {
        dataIndex: 'desc',
      },
      subTitle: {
        render: () => {
          return (
            <Space size={0}>
              <Tag color="blue">Ant Design</Tag>
              <Tag color="#5BD8A6">TechUI</Tag>
            </Space>
          );
        },
      },
      actions: {
        render: (text, row) => [
          <a
            href={row.html_url}
            target="_blank"
            rel="noopener noreferrer"
            key="link"
          >
            链路
          </a>,
          <a
            href={row.html_url}
            target="_blank"
            rel="noopener noreferrer"
            key="warning"
          >
            报警
          </a>,
          <a
            href={row.html_url}
            target="_blank"
            rel="noopener noreferrer"
            key="view"
          >
            查看
          </a>,
        ],
      },
    }}
  />
);
