import { CloseCircleOutlined, SmileOutlined } from '@ant-design/icons';
import { ProForm, ProFormGroup, ProFormList, ProFormText } from '@xxlabs/pro-components';
import { Segmented } from 'antd';
import { useState } from 'react';

const Demo = () => {
  const [readonly, setReadonly] = useState(false);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <ProForm.Item label="模式" name="mode">
        <Segmented
          block
          options={[
            {
              label: '编辑',
              title: '编辑',
              value: 'edit',
            },
            {
              label: '只读',
              title: '只读',
              value: 'readonly',
            },
          ]}
          onChange={(e) => {
            setReadonly(e === 'readonly');
          }}
        />
      </ProForm.Item>
      <ProForm readonly={readonly} onFinish={async (e) => console.log(e)}>
        <ProFormText label="姓名" name="name" />

        <ProFormList
          copyIconProps={{ Icon: SmileOutlined, tooltipText: '复制此项到末尾' }}
          deleteIconProps={{
            Icon: CloseCircleOutlined,
            tooltipText: '不需要这行了',
          }}
          initialValue={[
            {
              value: '333',
              label: '333',
            },
          ]}
          label="用户信息"
          name="labels"
        >
          <ProFormGroup key="group">
            <ProFormText label="值" name="value" />
            <ProFormText label="显示名称" name="label" />
          </ProFormGroup>
        </ProFormList>
      </ProForm>
    </div>
  );
};

export default Demo;
