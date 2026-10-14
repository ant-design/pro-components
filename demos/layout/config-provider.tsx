import { ProLayout } from '@ant-design/pro-components';
import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const [layoutClass, setLayoutClass] = useState('');

  useEffect(() => {
    let frame = 0;
    const readClass = () => {
      const layout = document.querySelector('#prefix-demo .qixian-pro-layout');
      if (layout) {
        setLayoutClass('qixian-pro-layout');
      } else {
        frame = requestAnimationFrame(readClass);
      }
    };
    readClass();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <ConfigProvider prefixCls="qixian">
      <div id="prefix-demo" style={{ height: 540, overflow: 'auto' }}>
        <ProLayout
          title="自定义类名前缀"
          route={{ routes: [{ path: '/demo', name: '示例页' }] }}
          location={{ pathname: '/demo' }}
        >
          <div style={{ padding: 24 }}>
            <h2>ConfigProvider.prefixCls</h2>
            <p>布局类名：{layoutClass}</p>
          </div>
        </ProLayout>
      </div>
    </ConfigProvider>
  );
};
