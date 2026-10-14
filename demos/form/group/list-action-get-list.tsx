import type { FormListActionType } from '@ant-design/pro-components';
import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';
import { Alert, Button } from 'antd';
import { useRef, useState } from 'react';

export default () => {
  const actionRef = useRef<FormListActionType<{ name: string }>>();
  const [result, setResult] = useState('');

  return (
    <>
      <Button
        onClick={() =>
          setResult(JSON.stringify(actionRef.current?.getList() ?? []))
        }
      >
        读取全部行
      </Button>
      {result && (
        <Alert type="info" message={result} style={{ marginTop: 12 }} />
      )}
      <ProForm submitter={false}>
        <ProFormList
          name="users"
          label="用户"
          actionRef={actionRef}
          initialValue={[{ name: '林青' }, { name: '陈宁' }]}
        >
          <ProFormText name="name" label="姓名" />
        </ProFormList>
      </ProForm>
    </>
  );
};
