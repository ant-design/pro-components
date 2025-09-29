import type { ProFormLayoutType } from '@xxlabs/pro-components';
import { BetaSchemaForm, ProFormSelect } from '@xxlabs/pro-components';
import { Alert, Button, Space } from 'antd';
import { useState } from 'react';

type DataItem = {
  name: string;
  state: string;
};

export default () => {
  const [layoutType, setLayoutType] = useState<ProFormLayoutType>('ModalForm');
  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
      >
        <Alert
          message="QueryFilter 和 lightFilter 暂不支持grid模式"
          style={{
            marginBlockEnd: 24,
          }}
          type="warning"
        />
        <ProFormSelect
          fieldProps={{
            value: layoutType,
            onChange: (e) => setLayoutType(e),
          }}
          label="布局方式"
          options={['ModalForm', 'DrawerForm']}
        />
      </Space>
      <BetaSchemaForm<DataItem>
        layoutType={layoutType as 'ModalForm'}
        trigger={<Button>点击我</Button>}
        onFinish={async (values) => {
          console.log(values);
        }}
        {...(layoutType === 'ModalForm'
          ? {
              modalProps: { destroyOnHidden: true },
            }
          : {
              drawerProps: { destroyOnHidden: true },
            })}
        columns={[
          {
            title: '标题',
            dataIndex: 'title',
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
            width: 'md',
          },
        ]}
      />
    </>
  );
};
