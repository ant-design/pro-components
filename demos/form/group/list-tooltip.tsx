import { CloseCircleOutlined, SmileOutlined } from '@ant-design/icons';
import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [result, setResult] = useState('');

  return (
    <>
      <ProForm
        initialValues={{ labels: [{ value: '设计' }] }}
        onFinish={async ({ labels }) => {
          setResult(JSON.stringify(labels, null, 2));
          return true;
        }}
      >
        <ProFormList
          name="labels"
          label="标签"
          copyIconProps={{ Icon: SmileOutlined, tooltipText: '复制此项' }}
          deleteIconProps={{
            Icon: CloseCircleOutlined,
            tooltipText: '删除此项',
          }}
        >
          <ProFormText name="value" label="标签名称" />
        </ProFormList>
      </ProForm>
      {result && <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>}
    </>
  );
};
