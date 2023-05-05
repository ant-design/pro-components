import type { ProFormLayoutType } from '@ant-design/pro-components';
import { BetaSchemaForm, ProFormSelect } from '@ant-design/pro-components';
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
        style={{
          width: '100%',
        }}
        direction="vertical"
      >
        <Alert
          type="warning"
          message="QueryFilter 和 lightFilter 暂不支持grid模式"
          style={{
            marginBlockEnd: 24,
          }}
        />
        <ProFormSelect
          label="布局方式"
          options={['ModalForm', 'DrawerForm']}
          fieldProps={{
            value: layoutType,
            onChange: (e) => setLayoutType(e),
          }}
        />
      </Space>
      <BetaSchemaForm<DataItem>
        trigger={<Button>点击我</Button>}
        layoutType={layoutType as 'ModalForm'}
        onFinish={async (values) => {
          console.log(values);
        }}
        {...(layoutType === 'ModalForm'
          ? {
              modalProps: { destroyOnClose: true },
            }
          : {
              drawerProps: { destroyOnClose: true },
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
