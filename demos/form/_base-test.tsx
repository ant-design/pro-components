import { ProForm, ProFormDatePicker } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { useState } from 'react';

export default () => {
  const [submitted, setSubmitted] = useState<unknown>();

  return (
    <>
      <ProForm
        dateFormatter={(value) => value.format('YYYY/MM/DD')}
        onFinish={async (values) => setSubmitted(values)}
      >
        <ProFormDatePicker
          name="startDate"
          label="开始日期"
          initialValue={dayjs('2026-10-14')}
        />
      </ProForm>
      {submitted && <pre>提交值：{JSON.stringify(submitted, null, 2)}</pre>}
    </>
  );
};
