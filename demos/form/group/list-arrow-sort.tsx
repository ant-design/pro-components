import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [result, setResult] = useState('');

  return (
    <>
      <ProForm
        initialValues={{
          labels: [
            { value: '第一项' },
            { value: '第二项' },
            { value: '第三项' },
          ],
        }}
        onFinish={async ({ labels }) => {
          setResult(
            JSON.stringify(labels.map(({ value }: { value: string }) => value)),
          );
          return true;
        }}
      >
        <ProFormList name="labels" label="按箭头调整顺序" arrowSort>
          <ProFormText name="value" label="名称" />
        </ProFormList>
      </ProForm>
      {result && <div>提交顺序：{result}</div>}
    </>
  );
};
