import { ProHelp, ProHelpDrawer } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <ProHelp
      dataSource={[
        {
          title: '常见问题',
          key: 'faq',
          children: [
            {
              title: '如何邀请成员？',
              key: 'invite',
              children: [
                { valueType: 'text', children: '在项目设置中打开成员列表。' },
              ],
            },
          ],
        },
      ]}
    >
      <Button type="primary" onClick={() => setOpen(true)}>
        打开帮助抽屉
      </Button>
      <ProHelpDrawer
        defaultSelectedKey="invite"
        drawerProps={{ open, afterOpenChange: (nextOpen) => setOpen(nextOpen) }}
      />
    </ProHelp>
  );
};
