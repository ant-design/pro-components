import {
  ProCard,
  ProDescriptions,
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useState } from 'react';

const valueTypeArray = [
  'password',
  'money',
  'textarea',
  'option',
  'date',
  'dateWeek',
  'dateMonth',
  'dateQuarter',
  'dateYear',
  'dateRange',
  'dateTimeRange',
  'dateTime',
  'time',
  'timeRange',
  'text',
  'select',
  'checkbox',
  'rate',
  'radio',
  'radioButton',
  'index',
  'indexBorder',
  'progress',
  'percent',
  'digit',
  'second',
  'avatar',
  'code',
  'switch',
  'fromNow',
  'image',
  'jsonCode',
];

const initialValues = {
  title: '高级定义列表',
  column: '3',
  columns: [
    {
      title: '文本',
      key: 'text',
      dataIndex: 'id',
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '状态2',
      key: 'state2',
      dataIndex: 'state2',
    },
    {
      title: '时间',
      key: 'date',
      dataIndex: 'date',
      valueType: 'date',
    },
    {
      title: 'money',
      key: 'money',
      dataIndex: 'money',
      valueType: 'money',
    },
    {
      title: '百分比',
      key: 'percent',
      dataIndex: 'percent',
      valueType: 'percent',
    },
    {
      title: '操作',
      valueType: 'option',
      render: () => [
        <a target="_blank" rel="noopener noreferrer" key="link">
          链路
        </a>,
        <a target="_blank" rel="noopener noreferrer" key="warning">
          报警
        </a>,
        <a target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
      ],
    },
  ],
};

export default () => {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  return (
    <ProCard
      bordered
      split="vertical"
      headerBordered
      style={{
        minHeight: 500,
      }}
    >
      <ProCard colSpan="calc(100% - 580px)">
        <ProDescriptions
          title="高级定义列表"
          {...values}
          columns={values?.columns?.filter(Boolean) || []}
          request={async () => {
            return Promise.resolve({
              success: true,
              data: {
                id: '这是一段文本columns',
                date: '20200809',
                money: '1212100',
                state: 'all',
                state2: 'open',
                percent: '20%',
              },
            });
          }}
        />
      </ProCard>
      <ProForm
        initialValues={values}
        onValuesChange={(_, allValue) => {
          setValues({ ...initialValues, ...allValue });
        }}
        submitter={false}
      >
        <ProCard
          colSpan="580px"
          title="配置菜单"
          tabs={{
            items: [
              {
                label: '基本配置',
                key: 'base',
                children: (
                  <>
                    <ProFormText label="标题" name="title" />
                    <ProForm.Group>
                      <ProFormSelect
                        name="layout"
                        label="布局"
                        initialValue="horizontal"
                        options={[
                          {
                            label: '水平',
                            value: 'horizontal',
                          },
                          {
                            label: '垂直',
                            value: 'vertical',
                          },
                        ]}
                      />
                      <ProFormSwitch
                        label="加载中"
                        tooltip="loading"
                        name="loading"
                      />
                      <ProFormSelect
                        name="size"
                        label="尺寸"
                        initialValue="default"
                        options={[
                          {
                            label: '大',
                            value: 'default',
                          },
                          {
                            label: '中',
                            value: 'middle',
                          },
                          {
                            label: '小',
                            value: 'small',
                          },
                        ]}
                      />

                      <ProFormSwitch
                        label="边框"
                        tooltip="bordered"
                        name="bordered"
                      />
                      <ProFormDigit width="xs" label="列数" name="column" />
                    </ProForm.Group>
                  </>
                ),
              },
              {
                label: '列配置',
                key: 'columns',
                children: (
                  <ProFormList
                    name="columns"
                    label="列配置"
                    creatorButtonProps={{
                      position: 'top',
                    }}
                    itemRender={({ listDom, action }) => {
                      return (
                        <ProCard
                          bordered
                          style={{
                            marginBlockEnd: 8,
                            position: 'relative',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: -2,
                              right: 4,
                            }}
                          >
                            {action}
                          </div>
                          {listDom}
                        </ProCard>
                      );
                    }}
                  >
                    <ProForm.Group size={16} key="Group">
                      <ProFormText label="标题" name="title" />
                      <ProFormDigit
                        width="xs"
                        initialValue={1}
                        label="占据列数"
                        name="span"
                      />
                      <ProFormSelect
                        width="xs"
                        label="值类型"
                        name="valueType"
                        options={valueTypeArray.map((value) => ({
                          label: value,
                          value,
                        }))}
                      />
                      <ProFormSelect
                        label="dataIndex"
                        width="xs"
                        name="dataIndex"
                        valueEnum={{
                          age: 'age',
                          address: 'address',
                          name: 'name',
                          time: 'time',
                          description: 'string',
                        }}
                      />
                    </ProForm.Group>
                    <ProFormDependency
                      key="valueType"
                      name={['valueType', 'valueEnum']}
                    >
                      {({ valueType, valueEnum }) => {
                        if (valueType !== 'select') {
                          return null;
                        }
                        return (
                          <ProFormTextArea
                            formItemProps={{
                              style: {
                                marginBlockStart: 8,
                              },
                            }}
                            fieldProps={{
                              value: JSON.stringify(valueEnum),
                            }}
                            normalize={(value) => {
                              return JSON.parse(value);
                            }}
                            label="数据枚举"
                            name="valueEnum"
                          />
                        );
                      }}
                    </ProFormDependency>
                  </ProFormList>
                ),
              },
            ],
          }}
          style={{
            width: 500,
          }}
        />
      </ProForm>
    </ProCard>
  );
};
