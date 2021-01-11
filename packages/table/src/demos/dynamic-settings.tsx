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
  key: number;
  description: string;
};

const columns: ProColumnType<DataType>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.includes(`${value}`),
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
for (let i = 1; i <= 10; i += 1) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 10,
    address: `New York No. ${i} Lake Park`,
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
  const tableColumns = columns.map((item) => ({ ...item, ellipsis: state.ellipsis }));
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
          initialValues={initData}
          submitter={false}
          onValuesChange={(_, values) => setState(values)}
        >
          <ProForm.Group title="Table">
            <ProFormSwitch label="Bordered" name="bordered" />
            <ProFormSwitch label="Loading" name="loading" />
            <ProFormSwitch label="ShowHeader" name="showHeader" />
            <ProFormSwitch label="Footer" name="footer" />
            <ProFormSwitch label="Expandable" name="expandable" />
            <ProFormSwitch label="RowSelection" name="rowSelection" />
            <ProFormSwitch label="HasData" name="hasData" />
            <ProFormSwitch label="Pagination" name="pagination" />
          </ProForm.Group>
          <ProForm.Group title="工具栏">
            <ProFormSwitch label="工具栏" name="toolBarRender" tooltip="toolBarRender={false}" />
            <ProFormSwitch label="表格标题" name="headerTitle" tooltip="headerTitle={false}" />
            <ProFormSwitch label="Icon 显示" name={['options', 'show']} tooltip="options={false}" />
            <ProFormSwitch
              label="密度 Icon"
              name={['options', 'density']}
              tooltip="options={{ density:false }}"
            />
            <ProFormSwitch
              label="keyWords"
              name={['options', 'search']}
              tooltip="options={{ search:false }}"
            />
            <ProFormSwitch
              label="全屏 Icon"
              name={['options', 'fullScreen']}
              tooltip="options={{ fullScreen:false }}"
            />
            <ProFormSwitch
              label="列设置 Icon"
              tooltip="options={{ setting:false }}"
              name={['options', 'setting']}
            />
          </ProForm.Group>
          <ProForm.Group title="查询表单">
            <ProFormSwitch label="查询表单" tooltip="search={false}" name="search" />
            <ProFormSwitch
              label="收起按钮"
              tooltip={`search={{collapseRender:false}}`}
              name="collapseRender"
            />
            <ProFormSwitch
              label="表单收起"
              name="collapsed"
              tooltip={`search={{collapsed:false}}`}
            />
            <ProFormSelect
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
          search={
            state.search
              ? {
                  collapsed: state.collapsed,
                  span: state.span,
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
          dataSource={state.hasData ? data : null}
          scroll={state.scroll}
        />
      </ProCard>
    </ProCard>
  );
};

export default DynamicSettings;
