import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { useState } from 'react';

type Values = { status?: string };

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
          name="status"
          label="状态"
          placeholder="搜索状态"
          mode="single"
          fieldProps={{ labelInValue: false }}
          valueEnum={{
            open: '未解决',
            closed: '已解决',
            processing: '处理中',
          }}
        />
      </ProForm>
      <p>提交结果：{submitted ? JSON.stringify(submitted) : '尚未提交'}</p>
    </div>
  );
};
