import { DownOutlined } from '@ant-design/icons';
import type { ProColumnType, ProFormInstance } from '@xxlabs/pro-components';
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
} from '@xxlabs/pro-components';
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
        text: '伦敦',
      },
      'New York': {
        text: '纽约',
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
      description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
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
  headerTitle: '高级表格',
  tooltip: '高级表格 tooltip',
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
  const ref = useRef<ProFormInstance>(undefined);

  const [config, setConfig] = useState<any>(initData);

  /** 去抖配置 */
  const updateConfig = useDebounceFn(async (state) => {
    setConfig(state);
  }, 20);

  const tableColumns = (config.columns || columns)?.map((item: any) => ({
    ...item,
    ellipsis: config.ellipsis,
  }));

  return (
    <ProCard
      headerBordered
      split="vertical"
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
      variant="outlined"
    >
      <ProCard
        style={{
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <ProTable
          {...config}
          columns={tableColumns}
          dataSource={genData(config.pagination?.total || 10)}
          expandable={
            config.expandable && {
              expandedRowRender: (record: DataType) => <p>{record.description}</p>,
            }
          }
          footer={config.footer ? () => 'Here is footer' : false}
          formRef={ref}
          headerTitle={config.headerTitle}
          options={config.options?.show ? config.options : false}
          pagination={
            config.pagination?.show
              ? config.pagination
              : {
                  pageSize: 5,
                }
          }
          scroll={config.scroll}
          search={config.search?.show ? config.search : {}}
          toolBarRender={
            config?.toolBarRender
              ? () => [
                  <Button key="refresh" type="primary">
                    刷新
                  </Button>,
                ]
              : false
          }
        />
      </ProCard>
      <ProForm
        colon={false}
        initialValues={initData}
        layout="inline"
        submitter={false}
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
                label: '基本配置',
                key: 'tab1',
                children: (
                  <>
                    <ProForm.Group collapsible direction="horizontal" labelLayout="twoLine" size={0} title="表格配置">
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="边框"
                        name="bordered"
                        tooltip="bordered"
                      />
                      <ProFormRadio.Group
                        fieldProps={{
                          size: 'small',
                        }}
                        label="尺寸"
                        name="size"
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
                        radioType="button"
                        tooltip={`size="middle"`}
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="加载中"
                        name="loading"
                        tooltip="loading"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="显示标题"
                        name="showHeader"
                        tooltip="showHeader"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="页脚"
                        name="footer"
                        tooltip="footer"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="支持展开"
                        name="expandable"
                        tooltip="expandable"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="行选择"
                        name="rowSelection"
                        tooltip="rowSelection"
                      />
                    </ProForm.Group>
                    <ProForm.Group
                      collapsible
                      direction="horizontal"
                      extra={
                        <ProFormSwitch
                          noStyle
                          fieldProps={{
                            size: 'small',
                          }}
                          name="toolBarRender"
                        />
                      }
                      labelLayout="twoLine"
                      size={0}
                      title="工具栏"
                      tooltip="toolBarRender={false}"
                    >
                      <ProFormText
                        fieldProps={{
                          size: 'small',
                        }}
                        label="表格标题"
                        name="headerTitle"
                        tooltip="headerTitle={false}"
                      />
                      <ProFormText
                        fieldProps={{
                          size: 'small',
                        }}
                        label="表格的tooltip"
                        name="tooltip"
                        tooltip="tooltip={false}"
                      />

                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="Icon 显示"
                        name={['options', 'show']}
                        tooltip="options={false}"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="密度 Icon"
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
                        fieldProps={{
                          size: 'small',
                        }}
                        label="全屏 Icon"
                        name={['options', 'fullScreen']}
                        tooltip="options={{ fullScreen:false }}"
                      />
                      <ProFormSwitch
                        fieldProps={{
                          size: 'small',
                        }}
                        label="列设置 Icon"
                        name={['options', 'setting']}
                        tooltip="options={{ setting:false }}"
                      />
                    </ProForm.Group>
                  </>
                ),
              },
              {
                label: '表单配置',
                key: 'tab3',
                children: (
                  <ProForm.Group
                    collapsible
                    direction="horizontal"
                    extra={
                      <ProFormSwitch
                        noStyle
                        fieldProps={{
                          size: 'small',
                        }}
                        name={['search', 'show']}
                      />
                    }
                    labelLayout="twoLine"
                    size={0}
                    title="查询表单"
                    tooltip="search={false}"
                  >
                    <ProFormText
                      fieldProps={{
                        size: 'small',
                      }}
                      label="查询按钮文案"
                      name={['search', 'searchText']}
                      tooltip={`search={{searchText:"查询"}}`}
                    />
                    <ProFormText
                      fieldProps={{
                        size: 'small',
                      }}
                      label="重置按钮文案"
                      name={['search', 'resetText']}
                      tooltip={`search={{resetText:"重置"}}`}
                    />
                    <ProFormSwitch
                      fieldProps={{
                        size: 'small',
                      }}
                      label="收起按钮"
                      name={['search', 'collapseRender']}
                      tooltip="search={{collapseRender:false}}"
                    />
                    <ProFormSwitch
                      fieldProps={{
                        size: 'small',
                      }}
                      label="表单收起"
                      name={['search', 'collapsed']}
                      tooltip="search={{collapsed:false}}"
                    />
                    <ProFormSelect
                      fieldProps={{
                        size: 'small',
                      }}
                      label="表单栅格"
                      name={['search', 'span']}
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
                      tooltip="search={{span:8}}"
                    />
                    <ProFormRadio.Group
                      fieldProps={{
                        size: 'small',
                      }}
                      label="表单布局"
                      name={['search', 'layout']}
                      options={[
                        {
                          label: '垂直',
                          value: 'vertical',
                        },
                        {
                          label: '水平',
                          value: 'horizontal',
                        },
                      ]}
                      radioType="button"
                      tooltip={`search={{layout:"${config.search?.layout}"}}`}
                    />
                    <ProFormRadio.Group
                      fieldProps={{
                        size: 'small',
                      }}
                      label="表单类型"
                      name={['search', 'filterType']}
                      options={[
                        {
                          label: '默认',
                          value: 'query',
                        },
                        {
                          label: '轻量',
                          value: 'light',
                        },
                      ]}
                      radioType="button"
                      tooltip={`search={{filterType:"light"}}`}
                    />
                  </ProForm.Group>
                ),
              },
              {
                label: '数据配置',
                key: 'tab2',
                children: (
                  <ProForm.Group
                    collapsible
                    direction="horizontal"
                    extra={
                      <ProFormSwitch
                        noStyle
                        fieldProps={{
                          size: 'small',
                        }}
                        name={['pagination', 'show']}
                      />
                    }
                    labelLayout="twoLine"
                    size={0}
                    title="分页器"
                    tooltip="pagination={}"
                  >
                    <ProFormRadio.Group
                      fieldProps={{
                        size: 'small',
                      }}
                      label="尺寸"
                      name={['pagination', 'size']}
                      options={[
                        {
                          label: '默认',
                          value: 'default',
                        },
                        {
                          label: '小',
                          value: 'small',
                        },
                      ]}
                      radioType="button"
                      tooltip={`pagination={size:"middle"}`}
                    />
                    <ProFormDigit
                      fieldProps={{
                        size: 'small',
                      }}
                      label="页码"
                      name={['pagination', 'current']}
                      tooltip="pagination={{ current:10 }}"
                    />
                    <ProFormDigit
                      fieldProps={{
                        size: 'small',
                      }}
                      label="每页数量"
                      name={['pagination', 'pageSize']}
                      tooltip="pagination={{ pageSize:10 }}"
                    />
                    <ProFormDigit
                      fieldProps={{
                        size: 'small',
                      }}
                      label="数据总数"
                      name={['pagination', 'total']}
                      tooltip="pagination={{ total:100 }}"
                    />
                  </ProForm.Group>
                ),
              },
              {
                label: '列配置',
                key: 'tab4',
                children: (
                  <ProFormList
                    itemRender={({ listDom, action }) => {
                      return (
                        <ProCard
                          bodyStyle={{
                            padding: 8,
                            paddingInlineEnd: 16,
                            paddingBlockStart: 16,
                          }}
                          style={{
                            marginBlockEnd: 8,
                            position: 'relative',
                          }}
                          variant="outlined"
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
                    name="columns"
                  >
                    <ProFormText
                      label="标题"
                      name="title"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    />
                    <ProFormGroup
                      style={{
                        marginBlockStart: 8,
                      }}
                    >
                      <ProFormSwitch label="过长省略" name="ellipsis" />
                      <ProFormSwitch label="复制按钮" name="copyable" />
                    </ProFormGroup>
                    <ProFormGroup
                      size={8}
                      style={{
                        marginBlockStart: 8,
                      }}
                    >
                      <ProFormSelect
                        label="dataIndex"
                        name="dataIndex"
                        valueEnum={{
                          age: 'age',
                          address: 'address',
                          name: 'name',
                          time: 'time',
                          description: 'string',
                        }}
                        width="xs"
                      />
                      <ProFormSelect
                        fieldProps={{
                          onChange: () => {
                            ref.current?.resetFields();
                          },
                        }}
                        label="值类型"
                        name="valueType"
                        options={valueTypeArray.map((value) => ({
                          label: value,
                          value,
                        }))}
                        width="xs"
                      />
                    </ProFormGroup>
                    <ProFormGroup
                      size={8}
                      style={{
                        marginBlockStart: 8,
                      }}
                    >
                      <ProFormText label="列提示" name="tooltip" width="xs" />
                    </ProFormGroup>
                    <ProFormDependency name={['valueType', 'valueEnum']}>
                      {({ valueType, valueEnum }) => {
                        if (valueType !== 'select') {
                          return null;
                        }
                        return (
                          <ProFormTextArea
                            fieldProps={{
                              value: JSON.stringify(valueEnum),
                            }}
                            formItemProps={{
                              style: {
                                marginBlockStart: 8,
                              },
                            }}
                            label="数据枚举"
                            name="valueEnum"
                            normalize={(value) => {
                              return JSON.parse(value);
                            }}
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

const DynamicSettingsWithDocs = () => {
  return (
    <>
      <DynamicSettings />
      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProTable 动态设置 Props 说明：</h4>
        <ul>
          <li>
            <strong>ProTable</strong>: 专业表格组件
          </li>
          <li>
            <strong>ProCard</strong>: 专业卡片组件
          </li>
          <li>
            <strong>ProForm</strong>: 专业表单组件
          </li>
          <li>
            <strong>ProFormList</strong>: 专业表单列表组件
          </li>
          <li>
            <strong>动态设置</strong>: 展示动态设置功能
          </li>
        </ul>
        <h4>ProTable 配置：</h4>
        <ul>
          <li>
            <strong>formRef</strong>: 表单引用
          </li>
          <li>
            <strong>pagination</strong>: 分页配置
          </li>
          <li>
            <strong>search</strong>: 搜索配置
          </li>
          <li>
            <strong>expandable</strong>: 展开配置
          </li>
          <li>
            <strong>options</strong>: 选项配置
          </li>
          <li>
            <strong>toolBarRender</strong>: 工具栏渲染
          </li>
          <li>
            <strong>footer</strong>: 页脚配置
          </li>
          <li>
            <strong>headerTitle</strong>: 表格标题
          </li>
          <li>
            <strong>columns</strong>: 列配置
          </li>
          <li>
            <strong>dataSource</strong>: 数据源
          </li>
          <li>
            <strong>scroll</strong>: 滚动配置
          </li>
        </ul>
        <h4>动态设置特点：</h4>
        <ul>
          <li>
            <strong>实时配置</strong>: 支持实时配置
          </li>
          <li>
            <strong>可视化配置</strong>: 支持可视化配置
          </li>
          <li>
            <strong>分组配置</strong>: 支持分组配置
          </li>
          <li>
            <strong>表单联动</strong>: 支持表单联动
          </li>
          <li>
            <strong>防抖处理</strong>: 支持防抖处理
          </li>
          <li>
            <strong>动态列</strong>: 支持动态列配置
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>配置工具</strong>: 配置工具开发
          </li>
          <li>
            <strong>表格定制</strong>: 表格定制需求
          </li>
          <li>
            <strong>开发调试</strong>: 开发调试工具
          </li>
        </ul>
      </div>
    </>
  );
};

export default DynamicSettingsWithDocs;
