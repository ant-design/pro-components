import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
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
  const formRef = useRef();
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
          title="新建表单"
          formRef={formRef}
          trigger={
            <Button type="primary">
              <PlusOutlined />
              新建 Drawer 表单
            </Button>
          }
          drawerProps={{
            forceRender: true,
            destroyOnClose: true,
          }}
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
            title="新建表单"
            formRef={formRef}
            trigger={
              <Button type="primary">
                <PlusOutlined />
                新建 Drawer 表单
              </Button>
            }
            drawerProps={{
              forceRender: true,
              destroyOnClose: true,
            }}
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
                name="name"
                width="md"
                label="签约客户名称"
                tooltip="最长为 24 位"
                placeholder="请输入名称"
              />
              <ProFormText
                width="md"
                name="company"
                label="我方公司名称"
                placeholder="请输入名称"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                width="md"
                name="contract"
                label="合同名称"
                placeholder="请输入名称"
              />
              <ProFormDateRangePicker
                name="contractTime"
                label="合同生效时间"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                options={[
                  {
                    value: 'chapter',
                    label: '盖章后生效',
                  },
                ]}
                width="xs"
                name="useMode"
                label="合同约定生效方式"
              />
              <ProFormSelect
                width="xs"
                options={[
                  {
                    value: 'time',
                    label: '履行完终止',
                  },
                ]}
                name="unusedMode"
                label="合同约定失效效方式"
              />
            </ProForm.Group>
            <ProFormText width="sm" name="id" label="主合同编号" />
            <ProFormText
              name="project"
              disabled
              label="项目名称"
              initialValue="xxxx项目"
            />
            <ProFormText
              width="xs"
              name="mangerName"
              disabled
              label="商务经理"
              initialValue="启途"
            />
          </DrawerForm>
        </DrawerForm>

        <ModalForm<{
          name: string;
          company: string;
        }>
          title="新建表单"
          formRef={formRef}
          trigger={
            <Button type="primary">
              <PlusOutlined />
              新建 Model 表单
            </Button>
          }
          modalProps={{
            forceRender: true,
            destroyOnClose: true,
          }}
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
            title="新建表单"
            formRef={formRef}
            trigger={
              <Button type="primary">
                <PlusOutlined />
                新建 Model 表单
              </Button>
            }
            modalProps={{
              forceRender: true,
              destroyOnClose: true,
            }}
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
                name="name"
                width="md"
                label="签约客户名称"
                tooltip="最长为 24 位"
                placeholder="请输入名称"
              />
              <ProFormText
                width="md"
                name="company"
                label="我方公司名称"
                placeholder="请输入名称"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                width="md"
                name="contract"
                label="合同名称"
                placeholder="请输入名称"
              />
              <ProFormDateRangePicker
                name="contractTime"
                label="合同生效时间"
              />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                options={[
                  {
                    value: 'chapter',
                    label: '盖章后生效',
                  },
                ]}
                width="xs"
                name="useMode"
                label="合同约定生效方式"
              />
              <ProFormSelect
                width="xs"
                options={[
                  {
                    value: 'time',
                    label: '履行完终止',
                  },
                ]}
                name="unusedMode"
                label="合同约定失效效方式"
              />
            </ProForm.Group>
            <ProFormText width="sm" name="id" label="主合同编号" />
            <ProFormText
              name="project"
              disabled
              label="项目名称"
              initialValue="xxxx项目"
            />
            <ProFormText
              width="xs"
              name="mangerName"
              disabled
              label="商务经理"
              initialValue="启途"
            />
          </ModalForm>
        </ModalForm>
      </Space>
    </div>
  );
};
