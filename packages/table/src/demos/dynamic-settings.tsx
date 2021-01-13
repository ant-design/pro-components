import { DownOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import ProForm, { ProFormRadio, ProFormSelect, ProFormSwitch } from '@ant-design/pro-form';
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
  headerTitle: true,
  showHeader: true,
  footer: true,
  rowSelection: {},
  scroll: false,
  hasData: true,
  tableLayout: undefined,
  search: true,
  span: 24,
  toolBarRender: true,
  collapseRender: true,
  labelWidth: 80,
  filterType: 'query',
  dateValueType: 'date',
  formLayout: 'horizontal',
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
        colSpan="400px"
        style={{
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <ProForm
          layout="inline"
          initialValues={initData}
          submitter={false}
          onValuesChange={(_, values) => setState(values)}
        >
          <ProForm.Group title="Table">
            <ProFormSwitch
              fieldProps={{
                size: 'small',
              }}
              label="边框"
              tooltip="bordered"
              name="bordered"
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
              label="数据"
              tooltip="dataSource"
              name="hasData"
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
          <ProForm.Group title="工具栏">
            <ProFormSwitch
              fieldProps={{
                size: 'small',
              }}
              label="工具栏"
              name="toolBarRender"
              tooltip="toolBarRender={false}"
            />
            <ProFormSwitch
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
          <ProForm.Group title="查询表单">
            <ProFormSwitch
              fieldProps={{
                size: 'small',
              }}
              label="查询表单"
              tooltip="search={false}"
              name="search"
            />
            <ProFormSwitch
              fieldProps={{
                size: 'small',
              }}
              label="收起按钮"
              tooltip={`search={{collapseRender:false}}`}
              name="collapseRender"
            />
            <ProFormSwitch
              fieldProps={{
                size: 'small',
              }}
              label="表单收起"
              name="collapsed"
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
              name="span"
            />

            <ProFormSelect
              fieldProps={{
                size: 'small',
              }}
              tooltip={`search={{layout:"${state.formLayout}"}}`}
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
              name="formLayout"
            />
            <ProFormSelect
              fieldProps={{
                size: 'small',
              }}
              tooltip={`search={{labelWidth:"auto"}}`}
              options={[
                {
                  label: '查询表单',
                  value: 'query',
                },
                {
                  label: '轻量表单',
                  value: 'light',
                },
              ]}
              label="表单类型"
              name="filterType"
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
          <ProFormRadio.Group
            tooltip={`size="middle"`}
            label="尺寸"
            options={[
              {
                label: 'Default',
                value: 'default',
              },
              {
                label: 'Middle',
                value: 'middle',
              },
              {
                label: 'Small',
                value: 'small',
              },
            ]}
            name="size"
          />
        </ProForm>
      </ProCard>
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
          search={
            state.search
              ? {
                  layout: state.formLayout,
                  collapsed: state.collapsed,
                  span: state.span,
                  labelWidth: state.labelWidth,
                  filterType: state.filterType,
                  collapseRender: state.collapseRender ? undefined : false,
                }
              : false
          }
          expandable={
            state.expandable && {
              expandedRowRender: (record: DataType) => <p>{record.description}</p>,
            }
          }
          options={state.options.show ? state.options : false}
          toolBarRender={
            state?.toolBarRender ? () => [<Button type="primary">刷新</Button>] : false
          }
          footer={state.footer ? () => 'Here is footer' : false}
          headerTitle={state.headerTitle && '高级表格'}
          columns={tableColumns}
          // dataSource={state.hasData ? data : null}
          request={async () => {
            return {
              data: state.hasData ? data : null,
            };
          }}
          params={{
            hasData: state.hasData,
          }}
          scroll={state.scroll}
        />
      </ProCard>
    </ProCard>
  );
};

export default DynamicSettings;
