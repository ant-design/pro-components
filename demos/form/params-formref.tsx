import { BetaSchemaForm } from '@xxlabs/pro-components';
import { useEffect, useRef, useState } from 'react';

export default () => {
  const targetRef = useRef(undefined);

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
      columns={[
        {
          title: 'money',
          dataIndex: 'money',
          valueType: 'money',
        },
      ]}
      formRef={targetRef}
      params={{ requestLibData }}
      request={async () => ({})}
    />
  );
};
