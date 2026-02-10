import { ProDescriptions } from '@ant-design/pro-components';
import { Input, Tooltip } from 'antd';
import { useRef } from 'react';

const Demo = () => {
  const actionRef = useRef();
  return (
    <ProDescriptions
      actionRef={actionRef}
      formProps={{
        onValuesChange: (e, f) => console.log(f),
      }}
      title="可编辑的订单详情"
      request={async () => {
        return Promise.resolve({
          success: true,
          data: {
            rate: 4,
            id: 'ORD-2024-0115-0001',
            date: '20240115',
            money: '128000',
            state: 'processing',
            state2: 'open',
            textarea:
              '客户要求在一季度内完成全部部署上线工作，优先安排专属技术支持团队跟进对接，确保各环节顺利推进并做好验收准备',
          },
        });
      }}
      editable={{}}
      columns={[
        {
          title: '订单编号',
          key: 'text',
          dataIndex: 'id',
          copyable: true,
          ellipsis: true,
        },
        {
          title: '订单状态',
          key: 'state',
          dataIndex: 'state',
          valueType: 'select',
          editable: false,
          valueEnum: {
            pending: { text: '待审核', status: 'Warning' },
            processing: {
              text: '处理中',
              status: 'Processing',
            },
            completed: {
              text: '已完成',
              status: 'Success',
            },
            rejected: {
              text: '已驳回',
              status: 'Error',
            },
          },
        },
        {
          title: '订单备注',
          key: 'textarea',
          dataIndex: 'textarea',
          valueType: 'textarea',
          formItemProps: {
            style: {
              flex: 1,
            },
          },
        },
        {
          title: '付款状态',
          key: 'state2',
          dataIndex: 'state2',
          formItemRender: () => {
            return <Input placeholder="输入 Success 切换评分方式" />;
          },
        },
        {
          title: '评分',
          dataIndex: 'fraction',
          valueType: (record) => {
            const scoringMethod = record?.state2;
            if (scoringMethod === 'Success') return 'select';
            return 'digit';
          },
          fieldProps: {
            mode: 'multiple',
          },
          request: async () =>
            ['优秀', '良好', '一般', '待改进', '不合格'].map(
              (item, index) => ({
                label: item,
                value: index,
              }),
            ),
        },
        {
          title: '签约日期',
          key: 'date',
          dataIndex: 'date',
          valueType: 'date',
        },
        {
          title: '满意度',
          key: 'rate',
          dataIndex: 'rate',
          valueType: 'rate',
        },
        {
          title: '合同金额',
          key: 'money',
          dataIndex: 'money',
          valueType: 'money',
          render: (dom, entity, index, action) => {
            return (
              <Tooltip title="点击进入编辑状态">
                <div
                  onClick={() => {
                    action?.startEditable('money');
                  }}
                >
                  {dom}
                </div>
              </Tooltip>
            );
          },
        },
        {
          title: '操作',
          valueType: 'option',
          render: () => [
            <a target="_blank" rel="noopener noreferrer" key="detail">
              详情
            </a>,
            <a target="_blank" rel="noopener noreferrer" key="log">
              日志
            </a>,
            <a target="_blank" rel="noopener noreferrer" key="track">
              物流追踪
            </a>,
          ],
        },
      ]}
    >
      <ProDescriptions.Item
        dataIndex="percent"
        label="交付进度"
        valueType="percent"
      >
        75
      </ProDescriptions.Item>
    </ProDescriptions>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
