import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@xxlabs/pro-components';
import { Button, message, Space } from 'antd';
import { useRef } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef(undefined);
  return (
    <div
      style={{
        height: '325px',
      }}
    >
      <Space>
        <DrawerForm<{
          name: string;
          company: string;
        }>
          drawerProps={{
            forceRender: true,
            destroyOnHidden: true,
          }}
          formRef={formRef}
          title="新建表单"
          trigger={
            <Button type="primary">
              <PlusOutlined />
              新建 Drawer 表单
            </Button>
          }
          width={600}
          onFinish={async (values) => {
            await waitTime(2000);
            console.log(values.name);
            message.success('提交成功');
            // 不返回不会关闭弹框
            return true;
          }}
        >
          <DrawerForm<{
            name: string;
            company: string;
          }>
            drawerProps={{
              forceRender: true,
              destroyOnHidden: true,
            }}
            formRef={formRef}
            title="新建表单"
            trigger={
              <Button type="primary">
                <PlusOutlined />
                新建 Drawer 表单
              </Button>
            }
            onFinish={async (values) => {
              await waitTime(2000);
              console.log(values.name);
              message.success('提交成功');
              // 不返回不会关闭弹框
              return true;
            }}
          >
            <ProForm.Group>
              <ProFormText
                label="签约客户名称"
                name="name"
                placeholder="请输入名称"
                tooltip="最长为 24 位"
                width="md"
              />
              <ProFormText label="我方公司名称" name="company" placeholder="请输入名称" width="md" />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText label="合同名称" name="contract" placeholder="请输入名称" width="md" />
              <ProFormDateRangePicker label="合同生效时间" name="contractTime" />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                label="合同约定生效方式"
                name="useMode"
                options={[
                  {
                    value: 'chapter',
                    label: '盖章后生效',
                  },
                ]}
                width="xs"
              />
              <ProFormSelect
                label="合同约定失效效方式"
                name="unusedMode"
                options={[
                  {
                    value: 'time',
                    label: '履行完终止',
                  },
                ]}
                width="xs"
              />
            </ProForm.Group>
            <ProFormText label="主合同编号" name="id" width="sm" />
            <ProFormText disabled initialValue="xxxx项目" label="项目名称" name="project" />
            <ProFormText disabled initialValue="启途" label="商务经理" name="mangerName" width="xs" />
          </DrawerForm>
        </DrawerForm>

        <ModalForm<{
          name: string;
          company: string;
        }>
          formRef={formRef}
          modalProps={{
            forceRender: true,
            destroyOnHidden: true,
          }}
          title="新建表单"
          trigger={
            <Button type="primary">
              <PlusOutlined />
              新建 Model 表单
            </Button>
          }
          onFinish={async (values) => {
            await waitTime(2000);
            console.log(values.name);
            message.success('提交成功');
            // 不返回不会关闭弹框
            return true;
          }}
        >
          <ModalForm<{
            name: string;
            company: string;
          }>
            formRef={formRef}
            modalProps={{
              forceRender: true,
              destroyOnHidden: true,
            }}
            title="新建表单"
            trigger={
              <Button type="primary">
                <PlusOutlined />
                新建 Model 表单
              </Button>
            }
            onFinish={async (values) => {
              await waitTime(2000);
              console.log(values.name);
              message.success('提交成功');
              // 不返回不会关闭弹框
              return true;
            }}
          >
            <ProForm.Group>
              <ProFormText
                label="签约客户名称"
                name="name"
                placeholder="请输入名称"
                tooltip="最长为 24 位"
                width="md"
              />
              <ProFormText label="我方公司名称" name="company" placeholder="请输入名称" width="md" />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText label="合同名称" name="contract" placeholder="请输入名称" width="md" />
              <ProFormDateRangePicker label="合同生效时间" name="contractTime" />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                label="合同约定生效方式"
                name="useMode"
                options={[
                  {
                    value: 'chapter',
                    label: '盖章后生效',
                  },
                ]}
                width="xs"
              />
              <ProFormSelect
                label="合同约定失效效方式"
                name="unusedMode"
                options={[
                  {
                    value: 'time',
                    label: '履行完终止',
                  },
                ]}
                width="xs"
              />
            </ProForm.Group>
            <ProFormText label="主合同编号" name="id" width="sm" />
            <ProFormText disabled initialValue="xxxx项目" label="项目名称" name="project" />
            <ProFormText disabled initialValue="启途" label="商务经理" name="mangerName" width="xs" />
          </ModalForm>
        </ModalForm>
      </Space>
    </div>
  );
};
