import {
  ModalForm,
  ProForm,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [result, setResult] = useState('');

  return (
    <div style={{ padding: 24 }}>
      <ProForm submitter={false}>
        <ProFormList
          name="members"
          label="成员"
          initialValue={[{ name: '张三' }]}
        >
          <ProFormText name="name" label="姓名" />
          <ModalForm<{ note: string }>
            title="编辑行备注"
            trigger={<Button>打开行内弹窗</Button>}
            onFinish={async (values) => {
              setResult(JSON.stringify(values, null, 2));
              return true;
            }}
          >
            <ProFormText name="note" label="备注" />
          </ModalForm>
        </ProFormList>
      </ProForm>
      {result && <pre aria-label="弹窗结果">{result}</pre>}
    </div>
  );
};
