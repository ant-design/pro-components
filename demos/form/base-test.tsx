import type { ProFormInstance } from '@xxlabs/pro-components';
import {
  ProForm,
  ProFormCascader,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormList,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
} from '@xxlabs/pro-components';
import { TreeSelect } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';

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
  >(undefined);
  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;
    }>
      autoFocusFirstInput
      dateFormatter={(value, valueType) => {
        console.log('---->', value, valueType);
        return value.format('YYYY/MM/DD HH:mm:ss');
      }}
      formKey="base-form-use-demo"
      formRef={formRef}
      params={{ id: '100' }}
    >
      <ProForm.Group>
        <ProFormText
          required
          addonAfter={<a>点击查看更多</a>}
          addonBefore={<a>客户名称应该怎么获得？</a>}
          dependencies={[['contract', 'name']]}
          label="签约客户名称"
          name="name"
          placeholder="请输入名称"
          rules={[{ required: true, message: '这是必填项' }]}
          tooltip="最长为 24 位"
          width="md"
        />
        <ProFormText label="我方公司名称" name="company" placeholder="请输入名称" width="md" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit label="人数" name="count" width="lg" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText label="合同名称" name={['contract', 'name']} placeholder="请输入名称" width="md" />
        <ProFormDateRangePicker label="合同生效时间" name={['contract', 'createTime']} width="md" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          cacheForSwr
          readonly
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
        <ProFormSelect.SearchSelect
          label="合同约定失效方式"
          name="unusedMode"
          options={[
            {
              value: 'time',
              label: '履行完终止',
              type: 'time',
              options: [
                {
                  value: 'time1',
                  label: '履行完终止1',
                },
                {
                  value: 'time2',
                  label: '履行完终止2',
                },
              ],
            },
          ]}
          width="xs"
        />
        <ProFormMoney
          fieldProps={{
            numberPopoverRender: true,
          }}
          label="合同约定金额"
          name="money"
          width="md"
        />
      </ProForm.Group>
      <ProFormText label="主合同编号" name="id" width="sm" />
      <ProFormText disabled initialValue="xxxx项目" label="项目名称" name="project" width="md" />
      <ProFormText disabled initialValue="启途" label="商务经理" name="mangerName" width="xs" />
      <ProFormCascader
        addonAfter="qixian"
        initialValue={['zhejiang', 'hangzhou', 'xihu']}
        label="区域"
        name="areaList"
        request={async () => [
          {
            value: 'zhejiang',
            label: '浙江',
            children: [
              {
                value: 'hangzhou',
                label: '杭州',
                children: [
                  {
                    value: 'xihu',
                    label: '西湖',
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
        width="md"
      />
      <ProFormTreeSelect
        fieldProps={{
          fieldNames: {
            label: 'title',
          },
          treeCheckable: true,
          showCheckedStrategy: TreeSelect.SHOW_PARENT,
          placeholder: 'Please select',
        }}
        initialValue={['0-0-0']}
        label="树形下拉选择器"
        request={async () => treeData}
        width={600}
      />
      <ProFormDatePicker
        name="date"
        transform={(value) => {
          return {
            date: dayjs(value).unix(),
          };
        }}
      />
      <ProFormList initialValue={[{ date: '2022-10-12 10:00:00' }]} name="datas">
        {() => {
          return (
            <ProFormDatePicker
              name="date"
              transform={(value) => {
                return {
                  date: dayjs(value).unix(),
                };
              }}
            />
          );
        }}
      </ProFormList>
    </ProForm>
  );
};
