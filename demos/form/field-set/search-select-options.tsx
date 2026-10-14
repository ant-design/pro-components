import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { useState } from 'react';

type Values = { team?: string };

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
        <ProFormSelect.SearchSelect
          name="team"
          label="团队"
          placeholder="搜索团队"
          mode="single"
          fieldProps={{ labelInValue: false }}
          options={[
            { label: '设计团队', value: 'design' },
            { label: '开发团队', value: 'development' },
            { label: '产品团队', value: 'product' },
          ]}
        />
      </ProForm>
      <p>提交结果：{submitted ? JSON.stringify(submitted) : '尚未提交'}</p>
    </div>
  );
};
