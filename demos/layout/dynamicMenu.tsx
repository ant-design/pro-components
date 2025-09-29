import { PageContainer, ProLayout } from '@xxlabs/pro-components';
import { Button, Switch } from 'antd';
import { useRef, useState } from 'react';
import customMenuDate from './customMenu';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

let serviceData: any[] = customMenuDate;

export default () => {
  const actionRef = useRef<{
    reload: () => void;
  }>(undefined);
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <ProLayout
        actionRef={actionRef}
        location={{
          pathname: '/welcome/welcome',
        }}
        menu={{
          request: async () => {
            await waitTime(2000);
            return serviceData;
          },
        }}
        style={{
          height: '100vh',
        }}
        suppressSiderWhenMenuEmpty={toggle}
      >
        <PageContainer content="欢迎使用">
          <div>
            当从服务器获取的菜单为空时隐藏Sider：
            <Switch checked={toggle} onChange={setToggle} />
          </div>
          Hello World
          <Button
            style={{
              margin: 8,
            }}
            onClick={() => {
              serviceData = customMenuDate;
              actionRef.current?.reload();
            }}
          >
            刷新菜单
          </Button>
          <Button
            style={{
              margin: 8,
            }}
            onClick={() => {
              serviceData = [];
              actionRef.current?.reload();
            }}
          >
            刷新菜单（空数据）
          </Button>
        </PageContainer>
      </ProLayout>
    </>
  );
};
