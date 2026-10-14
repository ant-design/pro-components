import { ProForm, ProFormTreeSelect } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <ProForm submitter={false} initialValues={{ category: 'frontend' }}>
      <ProFormTreeSelect
        name="category"
        label="受控展开"
        fieldProps={{
          open,
          onOpenChange: setOpen,
          treeData: [
            {
              title: '研发',
              value: 'development',
              children: [
                { title: '前端', value: 'frontend' },
                { title: '后端', value: 'backend' },
              ],
            },
          ],
        }}
      />
    </ProForm>
  );
};
