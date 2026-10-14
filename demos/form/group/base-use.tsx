import { ProForm, ProFormList, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';
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
          label="成员"
          initialValue={[{ name: '' }, { name: '' }]}
          alwaysShowItemLabel
          creatorButtonProps={false}
          copyIconProps={false}
          deleteIconProps={false}
        >
          {(_field, index, action) => (
            <>
              <ProFormText name="name" label={`第 ${index + 1} 位成员`} />
              <Button
                onClick={() =>
                  action.setCurrentRowData({ name: `示例成员 ${index + 1}` })
                }
              >
                填入第 {index + 1} 行
              </Button>
            </>
          )}
        </ProFormList>
      </ProForm>
      <p>提交结果：{submitted ? JSON.stringify(submitted) : '尚未提交'}</p>
    </div>
  );
};
