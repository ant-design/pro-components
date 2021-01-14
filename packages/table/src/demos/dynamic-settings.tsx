import { DownOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import ProForm, {
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form';
import type { ProColumnType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { Button } from 'antd';

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

const data: DataType[] = [];
for (let i = 1; i <= 200; i += 1) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 10,
    time: Date.now(),
    address: i % 2 === 0 ? 'london' : 'New York',
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

const initData = {
  bordered: true,
  loading: false,
  pagination: true,
  size: 'small',
  expandable: false,
  headerTitle: '高级表格',
  showHeader: true,
  footer: true,
  rowSelection: {},
  scroll: false,
  hasData: true,
  tableLayout: undefined,
  toolBarRender: true,
  dateValueType: 'date',
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
  const [state, setState] = useState<any>(initData);
  const { xScroll, yScroll } = state;

  const scroll: { x?: React.Key; y?: React.Key } = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll) {
    scroll.x = '100vw';
  }
  const tableColumns = columns.map((item) => ({
    ...item,
    ellipsis: state.ellipsis,
    valueType: item?.dataIndex === 'time' ? state.dateValueType : item.valueType,
  }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }
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
          {...state}
          pagination={
            state.pagination
              ? {
                  pageSize: 5,
                }
              : false
          }
          search={state.search?.show ? state.search : {}}
          expandable={
            state.expandable && {
              expandedRowRender: (record: DataType) => <p>{record.description}</p>,
            }
          }
          options={state.options?.show ? state.options : false}
          toolBarRender={
            state?.toolBarRender ? () => [<Button type="primary">刷新</Button>] : false
          }
          footer={state.footer ? () => 'Here is footer' : false}
          headerTitle={state.headerTitle}
          columns={tableColumns}
          dataSource={state.hasData !== false ? data : null}
          scroll={state.scroll}
        />
      </ProCard>
      <ProForm
        layout="inline"
        initialValues={initData}
        submitter={false}
        colon={false}
        onValuesChange={(_, values) => setState(values)}
      >
        <ProCard
          colSpan="260px"
          style={{
            height: '100vh',
            overflow: 'auto',
          }}
          tabs={{}}
        >
          <ProCard.TabPane
            key="tab1"
            tab="基本配置"
            cardProps={{
              bodyStyle: {
                padding: 12,
              },
            }}
          >
            <ProForm.Group
              title="Table"
              size={0}
              collapsible
              direction="horizontal"
              labelLayout="twoLine"
            >
              <ProFormSwitch
                fieldProps={{
                  size: 'small',
                }}
                label="边框"
                tooltip="bordered"
                name="bordered"
              />
              <ProFormRadio.Group
                tooltip={`size="middle"`}
                radioType="button"
                fieldProps={{
                  size: 'small',
                }}
                label="尺寸"
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
                name="size"
              />
              <ProFormSwitch
                fieldProps={{
                  size: 'small',
                }}
                label="加载中"
                tooltip="loading"
                name="loading"
              />
              <ProFormSwitch
                fieldProps={{
                  size: 'small',
                }}
                label="显示标题"
                tooltip="showHeader"
                name="showHeader"
              />
              <ProFormSwitch
                fieldProps={{
                  size: 'small',
                }}
                label="页脚"
                tooltip="footer"
                name="footer"
              />
              <ProFormSwitch
                fieldProps={{
                  size: 'small',
                }}
                label="支持展开"
                tooltip="expandable"
                name="expandable"
              />
              <ProFormSwitch
                fieldProps={{
                  size: 'small',
                }}
                label="行选择"
                tooltip="rowSelection"
                name="rowSelection"
              />

              <ProFormSwitch
                fieldProps={{
                  size: 'small',
                }}
                label="页码"
                tooltip="pagination"
                name="pagination"
              />
            </ProForm.Group>
            <ProForm.Group
              size={0}
              collapsible
              direction="horizontal"
              labelLayout="twoLine"
              tooltip="toolBarRender={false}"
              title="工具栏"
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
                label="表格标题"
                name="headerTitle"
                tooltip="headerTitle={false}"
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
                label="全屏 Icon"
                fieldProps={{
                  size: 'small',
                }}
                name={['options', 'fullScreen']}
                tooltip="options={{ fullScreen:false }}"
              />
              <ProFormSwitch
                label="列设置 Icon"
                fieldProps={{
                  size: 'small',
                }}
                tooltip="options={{ setting:false }}"
                name={['options', 'setting']}
              />
            </ProForm.Group>
            <ProForm.Group
              title="查询表单"
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
              <ProFormSwitch
                fieldProps={{
                  size: 'small',
                }}
                label="收起按钮"
                tooltip={`search={{collapseRender:false}}`}
                name={['search', 'collapseRender']}
              />
              <ProFormSwitch
                fieldProps={{
                  size: 'small',
                }}
                label="表单收起"
                name={['search', 'collapsed']}
                tooltip={`search={{collapsed:false}}`}
              />
              <ProFormSelect
                fieldProps={{
                  size: 'small',
                }}
                tooltip={`search={{span:8}}`}
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
                label="表单栅格"
                name={['search', 'span']}
              />

              <ProFormRadio.Group
                radioType="button"
                fieldProps={{
                  size: 'small',
                }}
                name={['search', 'layout']}
                tooltip={`search={{layout:"${state.search?.layout}"}}`}
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
                label="表单布局"
              />
              <ProFormRadio.Group
                radioType="button"
                fieldProps={{
                  size: 'small',
                }}
                name={['search', 'filterType']}
                tooltip={`search={{filterType:"light"}}`}
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
                label="表单类型"
              />
              <ProFormSelect
                fieldProps={{
                  size: 'small',
                  style: {
                    minWidth: 80,
                  },
                }}
                tooltip={`valueType=${state.dateValueType}`}
                options={[
                  {
                    label: '日期',
                    value: 'date',
                  },
                  {
                    label: '日期时间',
                    value: 'dateTime',
                  },
                  {
                    label: '时间',
                    value: 'time',
                  },
                ]}
                label="日期类型"
                name="dateValueType"
              />
            </ProForm.Group>
          </ProCard.TabPane>
          <ProCard.TabPane
            cardProps={{
              bodyStyle: {
                padding: 12,
              },
            }}
            key="tab2"
            tab="数据配置"
          >
            <ProFormSwitch
              fieldProps={{
                size: 'small',
              }}
              label="数据"
              tooltip="dataSource"
              name="hasData"
            />
          </ProCard.TabPane>
        </ProCard>
      </ProForm>
    </ProCard>
  );
};

export default DynamicSettings;
