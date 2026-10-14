import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';
import { Radio } from 'antd';
import { useState } from 'react';

export default () => {
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');
  const [submitted, setSubmitted] = useState('');

  return (
    <div style={{ maxWidth: 480, padding: 16 }}>
      <Radio.Group
        value={position}
        onChange={(event) => setPosition(event.target.value)}
        options={[
          { label: '顶部', value: 'top' },
          { label: '底部', value: 'bottom' },
        ]}
        style={{ marginBottom: 16 }}
      />
      <ProForm
        onFinish={async (values) =>
          setSubmitted(JSON.stringify(values, null, 2))
        }
      >
        <ProFormList
          name="users"
          label="成员"
          initialValue={[{ name: '张三' }]}
          creatorRecord={{ name: '' }}
          creatorButtonProps={{ position }}
        >
          <ProFormText name="name" label="姓名" />
        </ProFormList>
      </ProForm>
      {submitted && <pre style={{ overflowX: 'auto' }}>{submitted}</pre>}
    </div>
  );
};
