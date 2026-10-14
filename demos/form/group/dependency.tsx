import {
  ProForm,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useState } from 'react';

type Values = { members: { name: string; greeting?: string }[] };

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
          label="成员"
          initialValue={[{ name: '张三' }]}
          creatorButtonProps={false}
          copyIconProps={false}
          deleteIconProps={false}
        >
          <ProFormText name="name" label="姓名" />
          <ProFormSelect
            name="greeting"
            label="称呼"
            dependencies={['name']}
            request={async ({ name }) =>
              name ? [{ label: `向${name}问好`, value: `hi-${name}` }] : []
            }
          />
        </ProFormList>
      </ProForm>
      <p>提交结果：{submitted ? JSON.stringify(submitted) : '尚未提交'}</p>
    </div>
  );
};
