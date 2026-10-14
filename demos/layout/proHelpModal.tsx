import { ProHelp, ProHelpModal } from '@ant-design/pro-components';
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
              title: '如何创建项目？',
              key: 'create',
              children: [
                {
                  valueType: 'text',
                  children: '点击“新建项目”并填写项目信息。',
                },
              ],
            },
          ],
        },
      ]}
    >
      <Button type="primary" onClick={() => setOpen(true)}>
        打开帮助弹窗
      </Button>
      <ProHelpModal
        defaultSelectedKey="create"
        modalProps={{
          open,
          onCancel: () => setOpen(false),
          afterClose: () => setOpen(false),
        }}
      />
    </ProHelp>
  );
};
