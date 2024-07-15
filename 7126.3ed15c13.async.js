"use strict";(self.webpackChunkpro_components=self.webpackChunkpro_components||[]).push([[7126],{94299:function(e,n){n.Z=`import {
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
  title: '\u9AD8\u7EA7\u5B9A\u4E49\u5217\u8868',
  column: '3',
  columns: [
    {
      title: '\u6587\u672C',
      key: 'text',
      dataIndex: 'id',
    },
    {
      title: '\u72B6\u6001',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '\u5168\u90E8', status: 'Default' },
        open: {
          text: '\u672A\u89E3\u51B3',
          status: 'Error',
        },
        closed: {
          text: '\u5DF2\u89E3\u51B3',
          status: 'Success',
        },
      },
    },
    {
      title: '\u72B6\u60012',
      key: 'state2',
      dataIndex: 'state2',
    },
    {
      title: '\u65F6\u95F4',
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
      title: '\u767E\u5206\u6BD4',
      key: 'percent',
      dataIndex: 'percent',
      valueType: 'percent',
    },
    {
      title: '\u64CD\u4F5C',
      valueType: 'option',
      render: () => [
        <a target="_blank" rel="noopener noreferrer" key="link">
          \u94FE\u8DEF
        </a>,
        <a target="_blank" rel="noopener noreferrer" key="warning">
          \u62A5\u8B66
        </a>,
        <a target="_blank" rel="noopener noreferrer" key="view">
          \u67E5\u770B
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
          title="\u9AD8\u7EA7\u5B9A\u4E49\u5217\u8868"
          {...values}
          columns={values?.columns?.filter(Boolean) || []}
          request={async () => {
            return Promise.resolve({
              success: true,
              data: {
                id: '\u8FD9\u662F\u4E00\u6BB5\u6587\u672Ccolumns',
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
          title="\u914D\u7F6E\u83DC\u5355"
          tabs={{
            items: [
              {
                label: '\u57FA\u672C\u914D\u7F6E',
                key: 'base',
                children: (
                  <>
                    <ProFormText label="\u6807\u9898" name="title" />
                    <ProForm.Group>
                      <ProFormSelect
                        name="layout"
                        label="\u5E03\u5C40"
                        initialValue="horizontal"
                        options={[
                          {
                            label: '\u6C34\u5E73',
                            value: 'horizontal',
                          },
                          {
                            label: '\u5782\u76F4',
                            value: 'vertical',
                          },
                        ]}
                      />
                      <ProFormSwitch
                        label="\u52A0\u8F7D\u4E2D"
                        tooltip="loading"
                        name="loading"
                      />
                      <ProFormSelect
                        name="size"
                        label="\u5C3A\u5BF8"
                        initialValue="default"
                        options={[
                          {
                            label: '\u5927',
                            value: 'default',
                          },
                          {
                            label: '\u4E2D',
                            value: 'middle',
                          },
                          {
                            label: '\u5C0F',
                            value: 'small',
                          },
                        ]}
                      />

                      <ProFormSwitch
                        label="\u8FB9\u6846"
                        tooltip="bordered"
                        name="bordered"
                      />
                      <ProFormDigit width="xs" label="\u5217\u6570" name="column" />
                    </ProForm.Group>
                  </>
                ),
              },
              {
                label: '\u5217\u914D\u7F6E',
                key: 'columns',
                children: (
                  <ProFormList
                    name="columns"
                    label="\u5217\u914D\u7F6E"
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
                      <ProFormText label="\u6807\u9898" name="title" />
                      <ProFormDigit
                        width="xs"
                        initialValue={1}
                        label="\u5360\u636E\u5217\u6570"
                        name="span"
                      />
                      <ProFormSelect
                        width="xs"
                        label="\u503C\u7C7B\u578B"
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
                            label="\u6570\u636E\u679A\u4E3E"
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
`},68527:function(e,n){n.Z=`/* eslint-disable no-param-reassign */
import {
  CopyOutlined,
  DeleteOutlined,
  HeartOutlined,
  HomeOutlined,
  PlusOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormField,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { useState } from 'react';

const IconMap = {
  PlusOutlined,
  HeartOutlined,
  DeleteOutlined,
  CopyOutlined,
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
};
const initialValue = {
  copyIconProps: {
    show: true,
    Icon: 'CopyOutlined',
    tooltipText: '\u590D\u5236\u6B64\u9879',
  },
  deleteIconProps: {
    show: true,
    Icon: 'DeleteOutlined',
    tooltipText: '\u5220\u9664\u6B64\u9879',
  },
  creatorButtonProps: {
    show: true,
    creatorButtonText: '\u65B0\u5EFA\u4E00\u884C',
    position: 'button',
    type: 'dashed',
    icon: 'PlusOutlined',
  },
};
const Demo = () => {
  const [stateValue, setStateValue] = useState({});
  const [json, setJson] = useState(() => JSON.stringify(initialValue));
  return (
    <ProCard bordered split="vertical" headerBordered>
      <ProCard colSpan="calc(100% - 400px)">
        <ProForm>
          <ProFormList
            name="users"
            label="\u7528\u6237\u4FE1\u606F"
            initialValue={[
              {
                name: '1111',
              },
            ]}
            creatorButtonProps={{
              position: 'bottom',
            }}
            {...stateValue}
          >
            <ProForm.Group key="group" size={8}>
              <ProFormText name="name" label="\u59D3\u540D" />
              <ProFormText name="nickName" label="\u59D3\u540D" />
            </ProForm.Group>
          </ProFormList>
        </ProForm>
      </ProCard>
      <ProCard colSpan="400px" title="\u914D\u7F6E\u83DC\u5355">
        <ProForm
          submitter={false}
          initialValues={initialValue}
          onValuesChange={(_, values) => {
            if (values?.creatorButtonProps?.show === false) {
              values.creatorButtonProps = false;
            }

            if (values?.copyIconProps?.show === false) {
              values.copyIconProps = false;
            }
            if (values?.deleteIconProps?.show === false) {
              values.deleteIconProps = false;
            }

            delete values.creatorButtonProps.show;
            delete values.deleteIconProps.show;
            delete values.creatorButtonProps.show;

            setJson(JSON.stringify(values));

            if (values?.copyIconProps?.Icon) {
              values.copyIconProps.Icon =
                IconMap[values?.copyIconProps?.Icon as 'PlusOutlined'];
            }

            if (values?.deleteIconProps?.Icon) {
              values.deleteIconProps.Icon =
                IconMap[values?.deleteIconProps?.Icon as 'PlusOutlined'];
            }
            if (values?.creatorButtonProps?.icon) {
              const Icon =
                IconMap[values?.creatorButtonProps?.icon as 'PlusOutlined'];
              values.creatorButtonProps.icon = <Icon />;
            }
            setStateValue(values);
          }}
        >
          <ProForm.Group
            title="\u65B0\u5EFA\u6309\u94AE\u914D\u7F6E"
            extra={
              <ProFormSwitch
                fieldProps={{
                  size: 'small',
                }}
                noStyle
                name={['creatorButtonProps', 'show']}
              />
            }
          >
            <ProFormDependency name={['creatorButtonProps']}>
              {({ creatorButtonProps }) => {
                if (!creatorButtonProps.show) {
                  return null;
                }
                return (
                  <ProForm.Group size={8}>
                    <ProFormText
                      width="sm"
                      name={['creatorButtonProps', 'creatorButtonText']}
                      label="\u6309\u94AE\u6587\u5B57"
                    />
                    <ProFormSelect
                      width="xs"
                      name={['creatorButtonProps', 'icon']}
                      label="\u56FE\u6807"
                      request={async () => {
                        return Object.keys(IconMap).map((value) => {
                          const Icon = IconMap[value as 'PlusOutlined'];
                          return {
                            label: <Icon />,
                            value,
                          };
                        });
                      }}
                    />
                    <ProFormSelect
                      width="xs"
                      name={['creatorButtonProps', 'position']}
                      label="\u6309\u94AE\u4F4D\u7F6E"
                      request={async () => {
                        return ['bottom', 'top'].map((value) => {
                          return {
                            label: value,
                            value,
                          };
                        });
                      }}
                    />
                    <ProFormSelect
                      width="xs"
                      name={['creatorButtonProps', 'type']}
                      label="\u6309\u94AE\u7C7B\u578B"
                      request={async () => {
                        return [
                          'default',
                          'primary',
                          'ghost',
                          'dashed',
                          'link',
                          'text',
                        ].map((value) => {
                          return {
                            label: value,
                            value,
                          };
                        });
                      }}
                    />
                  </ProForm.Group>
                );
              }}
            </ProFormDependency>
          </ProForm.Group>

          <ProForm.Group
            title="\u590D\u5236\u6309\u94AE\u914D\u7F6E"
            extra={
              <ProFormSwitch
                fieldProps={{
                  size: 'small',
                }}
                noStyle
                name={['copyIconProps', 'show']}
              />
            }
          >
            <ProFormDependency name={['copyIconProps']}>
              {({ copyIconProps }) => {
                if (!copyIconProps.show) {
                  return null;
                }
                return (
                  <ProForm.Group size={8}>
                    <ProFormText
                      width="sm"
                      name={['copyIconProps', 'tooltipText']}
                      label=" tooltip \u63D0\u793A\u6587\u5B57"
                    />
                    <ProFormSelect
                      width="xs"
                      name={['copyIconProps', 'Icon']}
                      label="\u56FE\u6807"
                      request={async () => {
                        return Object.keys(IconMap).map((value) => {
                          const Icon = IconMap[value as 'PlusOutlined'];
                          return {
                            label: <Icon />,
                            value,
                          };
                        });
                      }}
                    />
                  </ProForm.Group>
                );
              }}
            </ProFormDependency>
          </ProForm.Group>
          <ProForm.Group
            title="\u5220\u9664\u6309\u94AE\u914D\u7F6E"
            extra={
              <ProFormSwitch
                fieldProps={{
                  size: 'small',
                }}
                noStyle
                name={['deleteIconProps', 'show']}
              />
            }
          >
            <ProFormDependency name={['deleteIconProps']}>
              {({ deleteIconProps }) => {
                if (!deleteIconProps.show) {
                  return null;
                }
                return (
                  <ProForm.Group size={8}>
                    <ProFormText
                      width="sm"
                      name={['deleteIconProps', 'tooltipText']}
                      label=" tooltip \u63D0\u793A\u6587\u5B57"
                    />
                    <ProFormSelect
                      width="xs"
                      name={['deleteIconProps', 'Icon']}
                      label="\u56FE\u6807"
                      request={async () => {
                        return Object.keys(IconMap).map((value) => {
                          const Icon = IconMap[value as 'PlusOutlined'];
                          return {
                            label: <Icon />,
                            value,
                          };
                        });
                      }}
                    />
                  </ProForm.Group>
                );
              }}
            </ProFormDependency>
          </ProForm.Group>
          <ProFormField
            ignoreFormItem
            valueType="jsonCode"
            text={json}
            mode="read"
          />
        </ProForm>
      </ProCard>
    </ProCard>
  );
};

export default Demo;
`},17360:function(e,n){n.Z=`import { LikeOutlined, UserOutlined } from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import {
  PageContainer,
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components';
import { Button, Descriptions, Result, Space, Statistic } from 'antd';
import { useState } from 'react';
import defaultProps from './_defaultProps';

const content = (
  <Descriptions size="small" column={2}>
    <Descriptions.Item label="\u521B\u5EFA\u4EBA">\u5F20\u4E09</Descriptions.Item>
    <Descriptions.Item label="\u8054\u7CFB\u65B9\u5F0F">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="\u521B\u5EFA\u65F6\u95F4">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="\u66F4\u65B0\u65F6\u95F4">2017-10-10</Descriptions.Item>
    <Descriptions.Item label="\u5907\u6CE8">
      \u4E2D\u56FD\u6D59\u6C5F\u7701\u676D\u5DDE\u5E02\u897F\u6E56\u533A\u53E4\u7FE0\u8DEF
    </Descriptions.Item>
  </Descriptions>
);

export default () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
  });
  const [pathname, setPathname] = useState('/welcome');
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
        location={{
          pathname,
        }}
        waterMarkProps={{
          content: 'Pro Layout',
        }}
        menuFooterRender={(props) => {
          return (
            <a
              style={{
                lineHeight: '48rpx',
                display: 'flex',
                height: 48,
                color: 'rgba(255, 255, 255, 0.65)',
                alignItems: 'center',
              }}
              href="https://preview.pro.ant.design/dashboard/analysis"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="pro-logo"
                src="https://procomponents.ant.design/favicon.ico"
                style={{
                  width: 16,
                  height: 16,
                  margin: '0 16px',
                  marginInlineEnd: 10,
                }}
              />
              {!props?.collapsed && 'Preview Pro'}
            </a>
          );
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </a>
        )}
        avatarProps={{
          icon: <UserOutlined />,
        }}
        {...settings}
      >
        <PageContainer
          content={content}
          tabList={[
            {
              tab: '\u57FA\u672C\u4FE1\u606F',
              key: 'base',
            },
            {
              tab: '\u8BE6\u7EC6\u4FE1\u606F',
              key: 'info',
            },
          ]}
          extraContent={
            <Space size={24}>
              <Statistic
                title="Feedback"
                value={1128}
                prefix={<LikeOutlined />}
              />
              <Statistic title="Unmerged" value={93} suffix="/ 100" />
            </Space>
          }
          extra={[
            <Button key="3">\u64CD\u4F5C</Button>,
            <Button key="2">\u64CD\u4F5C</Button>,
            <Button key="1" type="primary">
              \u4E3B\u64CD\u4F5C
            </Button>,
          ]}
          footer={[
            <Button key="3">\u91CD\u7F6E</Button>,
            <Button key="2" type="primary">
              \u63D0\u4EA4
            </Button>,
          ]}
        >
          <div
            style={{
              height: '120vh',
              minHeight: 600,
            }}
          >
            <Result
              status="404"
              style={{
                height: '100%',
                background: '#fff',
              }}
              title="Hello World"
              subTitle="Sorry, you are not authorized to access this page."
              extra={<Button type="primary">Back Home</Button>}
            />
          </div>
        </PageContainer>
      </ProLayout>
      <SettingDrawer
        pathname={pathname}
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting);
        }}
        disableUrlParams
      />
    </div>
  );
};
`},75307:function(e,n){n.Z=`import { PlusOutlined } from '@ant-design/icons';
import type {
  ProColumns,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import {
  ProCard,
  ProDescriptions,
  ProTable,
  TableDropdown,
} from '@ant-design/pro-components';
import { Button, Space, Tabs, Tag, message } from 'antd';
import { useState } from 'react';
import request from 'umi-request';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '\u5E8F\u53F7',
    dataIndex: 'index',
    width: 64,
    valueType: 'indexBorder',
  },
  {
    title: '\u6807\u9898',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    search: false,
  },
  {
    title: (_, type) => (type === 'table' ? '\u72B6\u6001' : '\u5217\u8868\u72B6\u6001'),
    dataIndex: 'state',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '\u5168\u90E8', status: 'Default' },
      open: {
        text: '\u672A\u89E3\u51B3',
        status: 'Error',
      },
      closed: {
        text: '\u5DF2\u89E3\u51B3',
        status: 'Success',
      },
    },
  },
  {
    title: '\u6392\u5E8F\u65B9\u5F0F',
    key: 'direction',
    hideInTable: true,
    hideInDescriptions: true,
    dataIndex: 'direction',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      asc: '\u6B63\u5E8F',
      desc: '\u5012\u5E8F',
    },
  },
  {
    title: '\u6807\u7B7E',
    dataIndex: 'labels',
    width: 120,
    render: (_, row) => (
      <Space>
        {row.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: 'option',
    valueType: 'option',
    dataIndex: 'id',
    render: (text, row) => [
      <a href={row.url} key="show" target="_blank" rel="noopener noreferrer">
        \u67E5\u770B
      </a>,
      <TableDropdown
        key="more"
        onSelect={(key) => message.info(key)}
        menus={[
          { key: 'copy', name: '\u590D\u5236' },
          { key: 'delete', name: '\u5220\u9664' },
        ]}
      />,
    ],
  },
];

export default () => {
  const [type, setType] = useState('table');
  return (
    <ProCard>
      <Tabs activeKey={type} onChange={(e) => setType(e)}>
        <Tabs.TabPane tab="table" key="table" />
        <Tabs.TabPane tab="form" key="form" />
        <Tabs.TabPane tab="descriptions" key="descriptions" />
      </Tabs>
      {['table', 'form'].includes(type) && (
        <ProTable<GithubIssueItem>
          columns={columns}
          type={type as 'table'}
          request={async (params = {} as Record<string, any>) =>
            request<{
              data: GithubIssueItem[];
            }>('https://proapi.azurewebsites.net/github/issues', {
              params,
            })
          }
          pagination={{
            pageSize: 5,
          }}
          rowKey="id"
          dateFormatter="string"
          headerTitle="\u67E5\u8BE2 Table"
          toolBarRender={() => [
            <Button key="3" type="primary">
              <PlusOutlined />
              \u65B0\u5EFA
            </Button>,
          ]}
        />
      )}
      {type === 'descriptions' && (
        <ProDescriptions
          style={{
            background: '#fff',
          }}
          columns={columns as ProDescriptionsItemProps<GithubIssueItem>[]}
          request={async (params) => {
            const msg = await request<{
              data: GithubIssueItem[];
            }>('https://proapi.azurewebsites.net/github/issues', {
              params,
            });
            return {
              ...msg,
              data: msg?.data[0],
            };
          }}
        />
      )}
    </ProCard>
  );
};
`},12727:function(e,n){n.Z=`import { DownOutlined } from '@ant-design/icons';
import type {
  ProColumnType,
  ProFormInstance,
} from '@ant-design/pro-components';
import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormGroup,
  ProFormList,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProTable,
  useDebounceFn,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';

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

type DataType = {
  age: number;
  address: string;
  name: string;
  time: number;
  key: number;
  description: string;
};

const columns: ProColumnType<DataType>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'time',
    dataIndex: 'time',
    valueType: 'date',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    valueType: 'select',
    filters: true,
    onFilter: true,
    valueEnum: {
      london: {
        text: '\u4F26\u6566',
      },
      'New York': {
        text: '\u7EBD\u7EA6',
      },
    },
  },
  {
    title: 'Action',
    key: 'action',
    sorter: true,
    valueType: 'option',
    render: () => [
      <a key="delete">Delete</a>,
      <a key="link" className="ant-dropdown-link">
        More actions <DownOutlined />
      </a>,
    ],
  },
];

const genData = (total: number) => {
  if (total < 1) {
    return [];
  }
  const data: DataType[] = [];
  for (let i = 1; i <= total; i += 1) {
    data.push({
      key: i,
      name: 'John Brown',
      age: i + 10,
      time: 1661136793649 + i * 1000,
      address: i % 2 === 0 ? 'london' : 'New York',
      description: \`My name is John Brown, I am \${i}2 years old, living in New York No. \${i} Lake Park.\`,
    });
  }
  return data;
};

const initData = {
  bordered: true,
  loading: false,
  columns,
  pagination: {
    show: true,
    pageSize: 5,
    current: 1,
    total: 100,
  },
  size: 'small',
  expandable: false,
  headerTitle: '\u9AD8\u7EA7\u8868\u683C',
  tooltip: '\u9AD8\u7EA7\u8868\u683C tooltip',
  showHeader: true,
  footer: true,
  rowSelection: {},
  scroll: false,
  hasData: true,
  tableLayout: undefined,
  toolBarRender: true,
  search: {
    show: true,
    span: 12,
    collapseRender: true,
    labelWidth: 80,
    filterType: 'query',
    layout: 'horizontal',
  },
  options: {
    show: true,
    density: true,
    fullScreen: true,
    setting: true,
  },
};

const DynamicSettings = () => {
  const ref = useRef<ProFormInstance>();

  const [config, setConfig] = useState<any>(initData);

  /** \u53BB\u6296\u914D\u7F6E */
  const updateConfig = useDebounceFn(async (state) => {
    setConfig(state);
  }, 20);

  const tableColumns = (config.columns || columns)?.map((item: any) => ({
    ...item,
    ellipsis: config.ellipsis,
  }));

  return (
    <ProCard
      split="vertical"
      bordered
      headerBordered
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <ProCard
        style={{
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <ProTable
          {...config}
          formRef={ref}
          pagination={
            config.pagination?.show
              ? config.pagination
              : {
                  pageSize: 5,
                }
          }
          search={config.search?.show ? config.search : {}}
          expandable={
            config.expandable && {
              expandedRowRender: (record: DataType) => (
                <p>{record.description}</p>
              ),
            }
          }
          options={config.options?.show ? config.options : false}
          toolBarRender={
            config?.toolBarRender
              ? () => [
                  <Button key="refresh" type="primary">
                    \u5237\u65B0
                  </Button>,
                ]
              : false
          }
          footer={config.footer ? () => 'Here is footer' : false}
          headerTitle={config.headerTitle}
          columns={tableColumns}
          dataSource={genData(config.pagination?.total || 10)}
          scroll={config.scroll}
        />
      </ProCard>
      <ProForm
        layout="inline"
        initialValues={initData}
        submitter={false}
        colon={false}
        onValuesChange={(_, values) => updateConfig.run(values)}
      >
        <ProCard
          colSpan="470px"
          style={{
            height: '100vh',
            overflow: 'auto',
            boxShadow: '2px 0 6px rgba(0, 21, 41, 0.35)',
            top: 0,
            right: 0,
            width: 470,
          }}
          tabs={{
            items: [
              {
                label: '\u57FA\u672C\u914D\u7F6E',
                key: 'tab1',
                children: (
                  <>
                    <ProForm.Group
                      title="\u8868\u683C\u914D\u7F6E"
                      size={0}
                      collapsible
                      direction="horizontal"
                      labelLayout="twoLine"
                    >
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="\u8FB9\u6846"
                        tooltip="bordered"
                        name="bordered"
                      />
                      <ProFormRadio.Group
                        tooltip={\`size="middle"\`}
                        radioType="button"
                        fieldProps={{
                          size: 'small',
                        }}
                        label="\u5C3A\u5BF8"
                        options={[
                          {
                            label: '\u5927',
                            value: 'default',
                          },
                          {
                            label: '\u4E2D',
                            value: 'middle',
                          },
                          {
                            label: '\u5C0F',
                            value: 'small',
                          },
                        ]}
                        name="size"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="\u52A0\u8F7D\u4E2D"
                        tooltip="loading"
                        name="loading"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="\u663E\u793A\u6807\u9898"
                        tooltip="showHeader"
                        name="showHeader"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="\u9875\u811A"
                        tooltip="footer"
                        name="footer"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="\u652F\u6301\u5C55\u5F00"
                        tooltip="expandable"
                        name="expandable"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="\u884C\u9009\u62E9"
                        tooltip="rowSelection"
                        name="rowSelection"
                      />
                    </ProForm.Group>
                    <ProForm.Group
                      size={0}
                      collapsible
                      direction="horizontal"
                      labelLayout="twoLine"
                      tooltip="toolBarRender={false}"
                      title="\u5DE5\u5177\u680F"
                      extra={
                        <ProFormSwitch
                          fieldProps={{
                            size: 'small',
                          }}
                          noStyle
                          name="toolBarRender"
                        />
                      }
                    >
                      <ProFormText
                        fieldProps={{
                          size: 'small',
                        }}
                        label="\u8868\u683C\u6807\u9898"
                        name="headerTitle"
                        tooltip="headerTitle={false}"
                      />
                      <ProFormText
                        fieldProps={{
                          size: 'small',
                        }}
                        label="\u8868\u683C\u7684tooltip"
                        name="tooltip"
                        tooltip="tooltip={false}"
                      />

                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="Icon \u663E\u793A"
                        name={['options', 'show']}
                        tooltip="options={false}"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="\u5BC6\u5EA6 Icon"
                        name={['options', 'density']}
                        tooltip="options={{ density:false }}"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="keyWords"
                        name={['options', 'search']}
                        tooltip="options={{ search:'keyWords' }}"
                      />
                      <ProFormSwitch
                        label="\u5168\u5C4F Icon"
                        fieldProps={{
                          size: 'small',
                        }}
                        name={['options', 'fullScreen']}
                        tooltip="options={{ fullScreen:false }}"
                      />
                      <ProFormSwitch
                        label="\u5217\u8BBE\u7F6E Icon"
                        fieldProps={{
                          size: 'small',
                        }}
                        tooltip="options={{ setting:false }}"
                        name={['options', 'setting']}
                      />
                    </ProForm.Group>
                  </>
                ),
              },
              {
                label: '\u8868\u5355\u914D\u7F6E',
                key: 'tab3',
                children: (
                  <ProForm.Group
                    title="\u67E5\u8BE2\u8868\u5355"
                    size={0}
                    collapsible
                    tooltip="search={false}"
                    direction="horizontal"
                    labelLayout="twoLine"
                    extra={
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        noStyle
                        name={['search', 'show']}
                      />
                    }
                  >
                    <ProFormText
                      label="\u67E5\u8BE2\u6309\u94AE\u6587\u6848"
                      fieldProps={{
                        size: 'small',
                      }}
                      tooltip={\`search={{searchText:"\u67E5\u8BE2"}}\`}
                      name={['search', 'searchText']}
                    />
                    <ProFormText
                      label="\u91CD\u7F6E\u6309\u94AE\u6587\u6848"
                      fieldProps={{
                        size: 'small',
                      }}
                      tooltip={\`search={{resetText:"\u91CD\u7F6E"}}\`}
                      name={['search', 'resetText']}
                    />
                    <ProFormSwitch
                      fieldProps={{
                        size: 'small',
                      }}
                      label="\u6536\u8D77\u6309\u94AE"
                      tooltip={\`search={{collapseRender:false}}\`}
                      name={['search', 'collapseRender']}
                    />
                    <ProFormSwitch
                      fieldProps={{
                        size: 'small',
                      }}
                      label="\u8868\u5355\u6536\u8D77"
                      name={['search', 'collapsed']}
                      tooltip={\`search={{collapsed:false}}\`}
                    />
                    <ProFormSelect
                      fieldProps={{
                        size: 'small',
                      }}
                      tooltip={\`search={{span:8}}\`}
                      options={[
                        {
                          label: '24',
                          value: 24,
                        },
                        {
                          label: '12',
                          value: 12,
                        },
                        {
                          label: '8',
                          value: 8,
                        },
                        {
                          label: '6',
                          value: 6,
                        },
                      ]}
                      label="\u8868\u5355\u6805\u683C"
                      name={['search', 'span']}
                    />
                    <ProFormRadio.Group
                      radioType="button"
                      fieldProps={{
                        size: 'small',
                      }}
                      name={['search', 'layout']}
                      tooltip={\`search={{layout:"\${config.search?.layout}"}}\`}
                      options={[
                        {
                          label: '\u5782\u76F4',
                          value: 'vertical',
                        },
                        {
                          label: '\u6C34\u5E73',
                          value: 'horizontal',
                        },
                      ]}
                      label="\u8868\u5355\u5E03\u5C40"
                    />
                    <ProFormRadio.Group
                      radioType="button"
                      fieldProps={{
                        size: 'small',
                      }}
                      name={['search', 'filterType']}
                      tooltip={\`search={{filterType:"light"}}\`}
                      options={[
                        {
                          label: '\u9ED8\u8BA4',
                          value: 'query',
                        },
                        {
                          label: '\u8F7B\u91CF',
                          value: 'light',
                        },
                      ]}
                      label="\u8868\u5355\u7C7B\u578B"
                    />
                  </ProForm.Group>
                ),
              },
              {
                label: '\u6570\u636E\u914D\u7F6E',
                key: 'tab2',
                children: (
                  <ProForm.Group
                    title="\u5206\u9875\u5668"
                    size={0}
                    collapsible
                    tooltip="pagination={}"
                    direction="horizontal"
                    labelLayout="twoLine"
                    extra={
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        noStyle
                        name={['pagination', 'show']}
                      />
                    }
                  >
                    <ProFormRadio.Group
                      tooltip={\`pagination={size:"middle"}\`}
                      radioType="button"
                      fieldProps={{
                        size: 'small',
                      }}
                      label="\u5C3A\u5BF8"
                      options={[
                        {
                          label: '\u9ED8\u8BA4',
                          value: 'default',
                        },
                        {
                          label: '\u5C0F',
                          value: 'small',
                        },
                      ]}
                      name={['pagination', 'size']}
                    />
                    <ProFormDigit
                      fieldProps={{
                        size: 'small',
                      }}
                      label="\u9875\u7801"
                      tooltip={\`pagination={{ current:10 }}\`}
                      name={['pagination', 'current']}
                    />
                    <ProFormDigit
                      fieldProps={{
                        size: 'small',
                      }}
                      label="\u6BCF\u9875\u6570\u91CF"
                      tooltip={\`pagination={{ pageSize:10 }}\`}
                      name={['pagination', 'pageSize']}
                    />
                    <ProFormDigit
                      fieldProps={{
                        size: 'small',
                      }}
                      label="\u6570\u636E\u603B\u6570"
                      tooltip={\`pagination={{ total:100 }}\`}
                      name={['pagination', 'total']}
                    />
                  </ProForm.Group>
                ),
              },
              {
                label: '\u5217\u914D\u7F6E',
                key: 'tab4',
                children: (
                  <ProFormList
                    name="columns"
                    itemRender={({ listDom, action }) => {
                      return (
                        <ProCard
                          bordered
                          style={{
                            marginBlockEnd: 8,
                            position: 'relative',
                          }}
                          bodyStyle={{
                            padding: 8,
                            paddingInlineEnd: 16,
                            paddingBlockStart: 16,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: -4,
                              right: 2,
                            }}
                          >
                            {action}
                          </div>
                          {listDom}
                        </ProCard>
                      );
                    }}
                  >
                    <ProFormText
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      name="title"
                      label="\u6807\u9898"
                    />
                    <ProFormGroup
                      style={{
                        marginBlockStart: 8,
                      }}
                    >
                      <ProFormSwitch label="\u8FC7\u957F\u7701\u7565" name="ellipsis" />
                      <ProFormSwitch label="\u590D\u5236\u6309\u94AE" name="copyable" />
                    </ProFormGroup>
                    <ProFormGroup
                      style={{
                        marginBlockStart: 8,
                      }}
                      size={8}
                    >
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
                      <ProFormSelect
                        width="xs"
                        label="\u503C\u7C7B\u578B"
                        name="valueType"
                        fieldProps={{
                          onChange: () => {
                            ref.current?.resetFields();
                          },
                        }}
                        options={valueTypeArray.map((value) => ({
                          label: value,
                          value,
                        }))}
                      />
                    </ProFormGroup>
                    <ProFormGroup
                      style={{
                        marginBlockStart: 8,
                      }}
                      size={8}
                    >
                      <ProFormText width="xs" label="\u5217\u63D0\u793A" name="tooltip" />
                    </ProFormGroup>
                    <ProFormDependency name={['valueType', 'valueEnum']}>
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
                            label="\u6570\u636E\u679A\u4E3E"
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
        />
      </ProForm>
    </ProCard>
  );
};

export default DynamicSettings;
`}}]);
