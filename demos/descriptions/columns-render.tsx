import { ProDescriptions } from '@ant-design/pro-components';
import { Alert, Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [selected, setSelected] = useState(false);

  return (
    <>
      <ProDescriptions
        title="订单操作"
        column={1}
        dataSource={{ orderNo: 'A20241001' }}
        columns={[
          { title: '订单编号', dataIndex: 'orderNo' },
          {
            title: '操作',
            dataIndex: 'orderNo',
            render: () => (
              <Button type="link" onClick={() => setSelected(true)}>
                查看订单
              </Button>
            ),
          },
        ]}
      />
      {selected && <Alert type="info" message="正在查看订单 A20241001" />}
    </>
  );
};
