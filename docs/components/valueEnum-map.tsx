import { ProTable } from '@ant-design/pro-components';

export default function () {
  return (
    <ProTable
      request={(params) => {
        console.log(params);
        return Promise.resolve([]);
      }}
      columns={[
        {
          dataIndex: 'status1',
          title: '状态（number）',
          // 由于js的object数字key会重新排序，不会按书写顺序，因此下拉选项会是【不通过】【通过】
          valueEnum: {
            1: {
              text: '通过',
            },
            0: {
              text: '不通过',
            },
          },
        },
        {
          dataIndex: 'status2',
          title: '状态（number）',
          // 使用Map来保证选项的顺序
          valueEnum: new Map([
            [1, '通过'],
            [0, '不通过'],
          ]),
        },
        {
          dataIndex: 'status3',
          title: '状态（boolean）',
          // 使用Map来完成boolen类型的key
          valueEnum: new Map([
            [true, '通过'],
            [false, '不通过'],
          ]),
        },
      ]}
    />
  );
}
