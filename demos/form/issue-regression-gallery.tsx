import type { ProFormInstance } from '@ant-design/pro-components';
import {
  BetaSchemaForm,
  ModalForm,
  ProCard,
  ProForm,
  ProFormList,
  ProFormText,
} from '@ant-design/pro-components';
import { Alert, Button, Space, Tabs, Typography, message } from 'antd';
import { useRef, useState } from 'react';

const toList = (value: Record<string, string>) =>
  Object.entries(value).map(([key, itemValue]) => ({
    key,
    value: itemValue,
  }));

const ListConvertValue = () => {
  const formRef = useRef<ProFormInstance>();
  return (
    <ProForm
      formRef={formRef}
      submitter={false}
      initialValues={{ configs: { first: 'one', second: 'two' } }}
    >
      <Space style={{ marginBlockEnd: 16 }}>
        <Button
          onClick={() =>
            formRef.current?.setFieldsValue({ configs: { third: 'three' } })
          }
        >
          setFieldsValue 写入对象
        </Button>
        <Typography.Text type="secondary">
          对象会在初始值及外部写入时转换为列表。
        </Typography.Text>
      </Space>
      <ProFormList name="configs" convertValue={toList}>
        <ProFormText name="key" label="Key" />
        <ProFormText name="value" label="Value" />
      </ProFormList>
    </ProForm>
  );
};

const RequestReuse = () => {
  const [id, setId] = useState(0);
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space>
        {[0, 1, 0].map((value, index) => (
          <Button key={`${value}-${index}`} onClick={() => setId(value)}>
            参数 {value}
          </Button>
        ))}
      </Space>
      <ProForm
        key="request-reuse-form"
        params={{ id }}
        request={async ({ id: requestId }) => ({
          name: `服务端返回：参数 ${requestId}（${new Date().toLocaleTimeString()}）`,
        })}
        submitter={false}
      >
        <ProFormText name="name" label="请求结果" width="lg" />
      </ProForm>
    </Space>
  );
};

const OverlayInitialization = () => {
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState({ name: 'Alice' });
  return (
    <Space>
      {['Alice', 'Bob'].map((name) => (
        <Button
          key={name}
          onClick={() => {
            setRecord({ name });
            setOpen(true);
          }}
        >
          编辑 {name}
        </Button>
      ))}
      <ModalForm
        open={open}
        onOpenChange={setOpen}
        initialValues={record}
        request={async () => record}
        title="受控弹窗初始化"
        onFinish={async ({ name }) => {
          message.success(`已保存 ${name}`);
          return true;
        }}
      >
        <ProFormText name="name" label="姓名" />
      </ModalForm>
    </Space>
  );
};

export default () => (
  <ProCard direction="column" ghost gutter={[0, 16]}>
    <Alert
      type="info"
      showIcon
      message="表单初始化与转换回归场景"
      description="覆盖弹层初始化、ProFormList convertValue、SchemaForm 独立宽度及重复参数请求。"
    />
    <ProCard>
      <Tabs
        items={[
          {
            key: 'overlay',
            label: '弹层初始化',
            children: <OverlayInitialization />,
          },
          {
            key: 'list',
            label: '列表转换 #8702',
            children: <ListConvertValue />,
          },
          {
            key: 'schema',
            label: 'SchemaForm 宽度 #9061',
            children: (
              <BetaSchemaForm
                submitter={false}
                columns={[
                  {
                    title: '表格列宽 80，表单宽度 328',
                    dataIndex: 'title',
                    width: 80,
                    formWidth: 328,
                  },
                ]}
              />
            ),
          },
          {
            key: 'request',
            label: '重复参数请求 #8375',
            children: <RequestReuse />,
          },
        ]}
      />
    </ProCard>
  </ProCard>
);
