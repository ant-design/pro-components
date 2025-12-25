import type { ProFormInstance } from '@ant-design/pro-components';
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
} from '@ant-design/pro-components';
import { TreeSelect, message } from 'antd';
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
  >();
  return (
    <div style={{ padding: 24 }}>

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
        message.success('Submission successful');
      }}
      formRef={formRef}
      params={{ id: '100' }}
      formKey="base-form-use-demo"
      dateFormatter={(value, valueType) => {
        console.log('---->', value, valueType);
        return value.format('YYYY/MM/DD HH:mm:ss');
      }}
      request={async () => {
        await waitTime(1500);
        return {
          name: 'Ant Design Co., Ltd.',
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
          dependencies={[['contract', 'name']]}
          addonBefore={<a>How to get the customer name?</a>}
          addonAfter={<a>Click to see more</a>}
          label="Contract Customer Name"
          tooltip="Up to 24 characters"
          placeholder="Please enter a name"
          rules={[{ required: true, message: 'This is a required field' }]}
        />
        <ProFormText
          width="md"
          name="company"
          label="Our Company Name"
          placeholder="Please enter a name"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit name="count" label="Number of People" width="lg" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name={['contract', 'name']}
          width="md"
          label="Contract Name"
          placeholder="Please enter a name"
        />
        <ProFormDateRangePicker
          width="md"
          name={['contract', 'createTime']}
          label="Contract Effective Time"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: 'Effective after stamping',
            },
          ]}
          readonly
          width="xs"
          cacheForSwr
          name="useMode"
          label="Contract Agreed Effective Method"
        />
        <ProFormSelect.SearchSelect
          width="xs"
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
          name="unusedMode"
          label="Contract Agreed Invalid Method"
        />
        <ProFormMoney
          width="md"
          name="money"
          label="Contract Agreed Amount"
          fieldProps={{
            numberPopoverRender: true,
          }}
        />
      </ProForm.Group>
      <ProFormText width="sm" name="id" label="Main Contract Number" />
      <ProFormText
        name="project"
        width="md"
        disabled
        label="Project Name"
        initialValue="xxxx Project"
      />
      <ProFormTextArea
        colProps={{ span: 24 }}
        name="address"
        label="Detailed Work Address or Home Address"
      />
      <ProFormText
        width="xs"
        name="mangerName"
        disabled
        label="Business Manager"
        initialValue="Qitu"
      />
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
        name="areaList"
        label="Area"
        initialValue={['zhejiang', 'hangzhou', 'xihu']}
        addonAfter={'qixian'}
      />
      <ProFormTreeSelect
        initialValue={['0-0-0']}
        label="Tree Select"
        width={600}
        fieldProps={{
          fieldNames: {
            label: 'title',
          },
          treeData,
          treeCheckable: true,
          showCheckedStrategy: TreeSelect.SHOW_PARENT,
          placeholder: 'Please select',
        }}
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
  
    </div>
  );
};
