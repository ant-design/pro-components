import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';
import { useState } from 'react';

type Values = { members: { name: string }[] };

export default () => {
  const [submitted, setSubmitted] = useState<Values>();

  return (
    <div style={{ padding: 24 }}>
      <ProForm<Values>
        onFinish={async (values) => {
          setSubmitted(values);
          return true;
        }}
      >
        <ProFormList
          name="members"
          label="成员（最少 1 位，最多 3 位）"
          min={1}
          max={3}
          initialValue={[{ name: '张三' }]}
          creatorButtonProps={{ creatorButtonText: '添加成员' }}
          copyIconProps={false}
        >
          <ProFormText name="name" label="姓名" />
        </ProFormList>
      </ProForm>
      <p>提交结果：{submitted ? JSON.stringify(submitted) : '尚未提交'}</p>
    </div>
  );
};
