import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

const Demo = () => {
  const [result, setResult] = useState('');

  return (
    <div style={{ maxWidth: '100%', padding: 16 }}>
      <ModalForm
        title="外层 Modal"
        trigger={<Button type="primary">打开外层 Modal</Button>}
        modalProps={{ destroyOnHidden: true }}
        onFinish={async () => true}
      >
        <ProFormText name="project" label="项目名称" initialValue="示例项目" />
        <ModalForm
          title="内层 Modal"
          trigger={<Button>打开内层 Modal</Button>}
          modalProps={{ destroyOnHidden: true }}
          onFinish={async (values) => {
            setResult(JSON.stringify(values, null, 2));
            return true;
          }}
        >
          <ProFormText
            name="contract"
            label="合同名称"
            rules={[{ required: true }]}
          />
        </ModalForm>
      </ModalForm>
      {result && <pre style={{ overflowX: 'auto' }}>{result}</pre>}
    </div>
  );
};

export default Demo;
