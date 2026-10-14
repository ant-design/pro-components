import { ProHelp, ProHelpPopover } from '@ant-design/pro-components';
import { Button } from 'antd';

export default () => (
  <ProHelp
    dataSource={[
      {
        title: '快捷帮助',
        key: 'tips',
        children: [
          {
            title: '项目权限',
            key: 'permission',
            children: [
              {
                valueType: 'text',
                children: '管理员可以在项目设置中调整成员权限。',
              },
            ],
          },
        ],
      },
    ]}
  >
    <ProHelpPopover selectedKey="permission">
      <Button>查看项目权限说明</Button>
    </ProHelpPopover>
  </ProHelp>
);
