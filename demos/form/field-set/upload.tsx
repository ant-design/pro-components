import { ProForm, ProFormUploadButton } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [result, setResult] = useState('');

  return (
    <div style={{ padding: 24 }}>
      <ProForm
        onFinish={async (values) => {
          setResult(
            (values.pictures || [])
              .map((file: { name: string }) => file.name)
              .join(', '),
          );
        }}
      >
        <ProFormUploadButton
          name="pictures"
          label="图片附件"
          fieldProps={{ listType: 'picture-card', beforeUpload: () => false }}
        />
      </ProForm>
      {result && <p aria-label="选择结果">已选择：{result}</p>}
    </div>
  );
};
