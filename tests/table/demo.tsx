import type { ProColumns } from '@xxlabs/pro-components';
import { TableDropdown, TableStatus } from '@xxlabs/pro-components';
import { Input, message } from 'antd';
import dayjs from 'dayjs';

const getFetchData = (
  size: number,
): {
  key: string | number;
  name: string;
  age: string | number;
  address: string;
  money: number;
  sex: string;
  date: number;
  status: number;
}[] => {
  const data: {
    key: string | number;
    name: string;
    age: string | number;
    address: string;
    money: number;
    sex: string;
    date: number;
    status: number;
  }[] = [];

  for (let i = 0; i < size; i += 1) {
    data.push({
      key: `${i}`,
      name: `Edward King ${i}`,
      age: 10 + i,
      status: Math.floor(i) % 4,
      sex: i / 2 > 1 ? 'man' : 'woman',
      money: parseFloat((10000.26 * (i + 1)).toFixed(2)),
      date: dayjs('2019-11-16 12:50:26').valueOf() + i * 1000 * 60 * 2,
      address: `London, Park Lane no. ${i}`,
    });
  }
  return data;
};

export const columns: ProColumns[] = [
  {
    title: '序号',
    key: 'index',
    dataIndex: 'index',
    valueType: 'index',
  },
  {
    title: '边框序号',
    dataIndex: 'indexBorder',
    valueType: 'indexBorder',
  },
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'Textarea',
    key: 'textarea',
    dataIndex: 'name',
    valueType: 'textarea',
    copyable: true,
  },
  {
    title: 'sex',
    dataIndex: 'sex',
    key: 'sex',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      man: '男',
      woman: '女',
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    hideInForm: true,
    valueType: 'select',
    valueEnum: {
      0: { text: '关闭', status: 'Default' },
      1: { text: '运行中', status: 'Processing' },
      2: { text: '已上线', status: 'Success' },
      3: { text: '异常', status: 'Error' },
    },
  },
  {
    title: 'Age',
    key: 'age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    ellipsis: true,
    width: 100,
  },
  {
    title: 'money',
    dataIndex: 'money',
    valueType: 'money',
  },
  {
    title: 'date',
    key: 'date',
    dataIndex: 'date',
    valueType: 'date',
    formItemRender: () => <Input />,
  },
  {
    title: 'dateTime',
    key: 'dateTime',
    dataIndex: 'date',
    valueType: 'dateTime',
  },
  {
    title: 'time',
    key: 'time',
    dataIndex: 'date',
    valueType: 'time',
    renderText: () => dayjs('2019-11-16 12:50:26'),
  },
  {
    title: '状态',
    dataIndex: 'status2',
    render: () => (
      <div>
        <TableStatus.Success>上线成功</TableStatus.Success>
        <br />
        <TableStatus.Error>上线失败</TableStatus.Error>
        <br />
        <TableStatus.Processing>正在部署</TableStatus.Processing>
        <br />
        <TableStatus.Default>正在初始化</TableStatus.Default>
      </div>
    ),
  },
  {
    title: 'option',
    valueType: 'option',
    key: 'option',
    dataIndex: 'id',
    render: (text, row, index, action) => [
      <a
        key="delete"
        onClick={() => {
          message.info('确认删除');
          action?.reload();
        }}
      >
        delete
      </a>,
      <a
        key="reload"
        onClick={() => {
          message.info('确认刷新');
          action?.reload();
        }}
      >
        reload
      </a>,
      <TableDropdown
        key="tableDropdown"
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
        onSelect={(key) => message.info(key)}
      />,
    ],
  },
];

export { getFetchData };

export const request = (params?: {
  pageSize?: number;
  current?: number;
}): Promise<{
  data: {
    key: string | number;
    name: string;
    age: string | number;
    address: string;
  }[];
  success: true;
}> =>
  Promise.resolve({
    data: getFetchData(params?.pageSize || 46),
    total: 200,
    success: true,
  });
