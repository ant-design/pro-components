import type { ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { useEffect, useRef, useState } from 'react';

const Demo = () => {
  const targetRef = useRef<ProFormInstance>(undefined);

  const [requestLibData, setRequestLibData] = useState(0);
  useEffect(() => {
    // 更新requestLibData，并引发reRender
    setTimeout(() => {
      setRequestLibData(1);
    });
  }, []);
  // 查看reRender后的ref标记
  useEffect(() => console.log('targetRef.current1', targetRef.current));
  // 查看reRender后的ref标记
  useEffect(() => {
    setTimeout(() => {
      console.log('targetRef.current1', targetRef.current);
    }, 1000);
  });
  return (
    <BetaSchemaForm
      request={async () => ({})}
      params={{ requestLibData }}
      columns={[
        {
          title: 'money',
          dataIndex: 'money',
          valueType: 'money',
        },
      ]}
      formRef={targetRef}
    />
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
