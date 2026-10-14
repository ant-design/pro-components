import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { useState } from 'react';

type Values = { task?: string };

const tasks = [
  { label: '设计首页', value: 'design' },
  { label: '开发登录页', value: 'development' },
  { label: '编写文档', value: 'documentation' },
];

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
          name="task"
          label="任务"
          placeholder="输入任务名称搜索"
          mode="single"
          fieldProps={{ labelInValue: false }}
          debounceTime={300}
          request={async ({ keyWords = '' }) =>
            tasks.filter(({ label }) => label.includes(keyWords))
          }
        />
      </ProForm>
      <p>提交结果：{submitted ? JSON.stringify(submitted) : '尚未提交'}</p>
    </div>
  );
};
