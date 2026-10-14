import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import arEG from 'antd/locale/ar_EG';

type Task = { id: number; title: string; state: 'open' | 'closed' };

const columns: ProColumns<Task>[] = [
  { title: 'المهمة', dataIndex: 'title', search: false },
  {
    title: 'الحالة',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum: {
      open: { text: 'مفتوحة', status: 'Processing' },
      closed: { text: 'مكتملة', status: 'Success' },
    },
  },
];

export default () => (
  <ConfigProvider direction="rtl" locale={arEG}>
    <ProTable<Task>
      rowKey="id"
      headerTitle="قائمة المهام"
      columns={columns}
      pagination={false}
      dataSource={[
        { id: 1, title: 'مراجعة الوثائق', state: 'open' },
        { id: 2, title: 'تحديث الواجهة', state: 'closed' },
      ]}
    />
  </ConfigProvider>
);
