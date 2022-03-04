import React, { useRef } from 'react';
import { message, TreeSelect } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormCascader } from '@ant-design/pro-form';
import ProForm, {
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormMoney,
  ProFormDigit,
  ProFormTreeSelect,
} from '@ant-design/pro-form';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

export default () => {
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();
  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        const val1 = await formRef.current?.validateFields();
        console.log('validateFields:', val1);
        const val2 = await formRef.current?.validateFieldsReturnFormatValue?.();
        console.log('validateFieldsReturnFormatValue:', val2);
        message.success('提交成功');
      }}
      formRef={formRef}
      params={{ id: '100' }}
      formKey="base-form-use-demo"
      dateFormatter={(value, valueType) => {
        console.log('---->', value, valueType);
        return value.format('YYYY/MM/DD HH:mm:ss');
      }}
      request={async () => {
        await waitTime(100);
        return {
          name: '蚂蚁设计有限公司',
          useMode: 'chapter',
        };
      }}
      autoFocusFirstInput
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          required
          addonBefore={<a>客户名称应该怎么获得？</a>}
          addonAfter={<a>点击查看更多</a>}
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
          rules={[{ required: true, message: '这是必填项' }]}
        />
        <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit name="count" label="人数" width="lg" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name={['contract', 'name']}
          width="md"
          label="合同名称"
          placeholder="请输入名称"
        />
        <ProFormDateRangePicker width="md" name={['contract', 'createTime']} label="合同生效时间" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: '盖章后生效',
            },
          ]}
          readonly
          width="xs"
          cacheForSwr
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
          label="合同约定失效方式"
        />
        <ProFormMoney
          width="md"
          name="money"
          label="合同约定金额"
          fieldProps={{
            numberPopoverRender: true,
          }}
        />
      </ProForm.Group>
      <ProFormText width="sm" name="id" label="主合同编号" />
      <ProFormText name="project" width="md" disabled label="项目名称" initialValue="xxxx项目" />
      <ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" />
      <ProFormCascader
        width="md"
        request={async () => [
          {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
              {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                  {
                    value: 'xihu',
                    label: 'West Lake',
                  },
                ],
              },
            ],
          },
          {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
              {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                  {
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  },
                ],
              },
            ],
          },
        ]}
        name="area"
        label="区域"
        initialValue={['zhejiang', 'hangzhou', 'xihu']}
      />
      <ProFormTreeSelect
        initialValue={['0-0-0']}
        label="树形下拉选择器"
        request={async () => treeData}
        fieldProps={{
          fieldNames: {
            label: 'title',
          },
          treeCheckable: true,
          showCheckedStrategy: TreeSelect.SHOW_PARENT,
          placeholder: 'Please select',
        }}
      />
    </ProForm>
  );
};
