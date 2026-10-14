import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';
import { useState } from 'react';

type Values = { attributes: { name: string; value: string }[] };

export default () => {
  const [submitted, setSubmitted] = useState<Values>();

  return (
    <div style={{ padding: 24 }}>
      <ProForm<Values>
        layout="horizontal"
        onFinish={async (values) => {
          setSubmitted(values);
          return true;
        }}
      >
        <ProFormList
          name="attributes"
          label="规格"
          initialValue={[{ name: '颜色', value: '红' }]}
          creatorButtonProps={{ creatorButtonText: '添加规格' }}
          copyIconProps={false}
        >
          <ProFormText name="name" label="规格名" />
          <ProFormText name="value" label="规格值" />
        </ProFormList>
      </ProForm>
      <p>提交结果：{submitted ? JSON.stringify(submitted) : '尚未提交'}</p>
    </div>
  );
};
