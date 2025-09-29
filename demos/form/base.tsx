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
  ProFormTextArea,
  ProFormTreeSelect,
} from '@xxlabs/pro-components';
import { message, TreeSelect } from 'antd';
import moment from 'dayjs';
import { useRef } from 'react';

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
      request={async () => {
        await waitTime(1500);
        return {
          name: 'Ant Design Co., Ltd.',
          useMode: 'chapter',
        };
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        const val1 = await formRef.current?.validateFields();
        console.log('validateFields:', val1);
        const val2 = await formRef.current?.validateFieldsReturnFormatValue?.();
        console.log('validateFieldsReturnFormatValue:', val2);
        message.success('Submission successful');
      }}
    >
      <ProForm.Group>
        <ProFormText
          required
          addonAfter={<a>Click to see more</a>}
          addonBefore={<a>How to get the customer name?</a>}
          dependencies={[['contract', 'name']]}
          label="Contract Customer Name"
          name="name"
          placeholder="Please enter a name"
          rules={[{ required: true, message: 'This is a required field' }]}
          tooltip="Up to 24 characters"
          width="md"
        />
        <ProFormText label="Our Company Name" name="company" placeholder="Please enter a name" width="md" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit label="Number of People" name="count" width="lg" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText label="Contract Name" name={['contract', 'name']} placeholder="Please enter a name" width="md" />
        <ProFormDateRangePicker label="Contract Effective Time" name={['contract', 'createTime']} width="md" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          cacheForSwr
          readonly
          label="Contract Agreed Effective Method"
          name="useMode"
          options={[
            {
              value: 'chapter',
              label: 'Effective after stamping',
            },
          ]}
          width="xs"
        />
        <ProFormSelect.SearchSelect
          label="Contract Agreed Invalid Method"
          name="unusedMode"
          options={[
            {
              value: 'time',
              label: 'Terminate after performance',
              type: 'time',
              options: [
                {
                  value: 'time1',
                  label: 'Terminate after performance 1',
                },
                {
                  value: 'time2',
                  label: 'Terminate after performance 2',
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
          label="Contract Agreed Amount"
          name="money"
          width="md"
        />
      </ProForm.Group>
      <ProFormText label="Main Contract Number" name="id" width="sm" />
      <ProFormText disabled initialValue="xxxx Project" label="Project Name" name="project" width="md" />
      <ProFormTextArea colProps={{ span: 24 }} label="Detailed Work Address or Home Address" name="address" />
      <ProFormText disabled initialValue="Qitu" label="Business Manager" name="mangerName" width="xs" />
      <ProFormCascader
        addonAfter="qixian"
        initialValue={['zhejiang', 'hangzhou', 'xihu']}
        label="Area"
        name="areaList"
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
        width="md"
      />
      <ProFormTreeSelect
        fieldProps={{
          fieldNames: {
            label: 'title',
          },
          treeData,
          treeCheckable: true,
          showCheckedStrategy: TreeSelect.SHOW_PARENT,
          placeholder: 'Please select',
        }}
        initialValue={['0-0-0']}
        label="Tree Select"
        width={600}
      />
      <ProFormDatePicker
        name="date"
        transform={(value) => {
          return {
            date: moment(value).unix(),
          };
        }}
      />
      <ProFormList name="datas">
        {() => {
          return (
            <>
              <ProFormDatePicker
                name="date"
                transform={(value) => {
                  return {
                    date: moment(value).unix(),
                  };
                }}
              />

              <ProFormList name="innerDatas">
                {() => {
                  return (
                    <>
                      <ProFormDatePicker
                        name="date"
                        transform={(value) => {
                          return {
                            date: moment(value).unix(),
                          };
                        }}
                      />
                      <ProFormList name="innerDatas">
                        {() => {
                          return (
                            <>
                              <ProFormDatePicker
                                name="date"
                                transform={(value) => {
                                  return {
                                    date: moment(value).unix(),
                                  };
                                }}
                              />
                              <ProFormList name="innerDatas">
                                {() => {
                                  return (
                                    <>
                                      <ProFormDatePicker
                                        name="date"
                                        transform={(value) => {
                                          return {
                                            date: moment(value).unix(),
                                          };
                                        }}
                                      />
                                    </>
                                  );
                                }}
                              </ProFormList>
                            </>
                          );
                        }}
                      </ProFormList>
                    </>
                  );
                }}
              </ProFormList>
            </>
          );
        }}
      </ProFormList>
    </ProForm>
  );
};
