import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';

export type TableListItem = {
  key: number;
  name: string;
  createdAt: string;
};

const columns: ProColumns<TableListItem>[] = [
  {
    title: '标题',
    dataIndex: 'name',
    initialValue: 'TradeCode 1',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    valueType: 'date',
    initialValue: '2022-08-10',
  },
];

export default () => {
  const ref = useRef<ProFormInstance>();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <ProTable<TableListItem>
        style={{
          margin: '16px',
        }}
        columns={columns}
        request={(params) => {
          console.log('-->', params);
          return Promise.resolve({
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: '2022-09-22',
              },
            ],
            success: true,
          });
        }}
        rowKey="key"
        pagination={{
          showSizeChanger: true,
        }}
        search={{
          collapsed,
          onCollapse: setCollapsed,
        }}
        formRef={ref}
        options={false}
        dateFormatter="string"
        headerTitle="日期格式化为字符串"
      />

      <ProTable<TableListItem>
        style={{
          margin: '16px',
        }}
        columns={columns}
        request={(params) => {
          console.log('-->', params);
          return Promise.resolve({
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: '2022-09-22',
              },
            ],
            success: true,
          });
        }}
        rowKey="key"
        pagination={{
          showSizeChanger: true,
        }}
        search={{
          collapsed,
          onCollapse: setCollapsed,
        }}
        formRef={ref}
        options={false}
        dateFormatter="number"
        headerTitle="日期格式化为数字"
      />
      <ProTable<TableListItem>
        style={{
          margin: '16px',
        }}
        columns={columns}
        request={(params) => {
          console.log('-->', params);
          return Promise.resolve({
            data: [
              {
                key: 1,
                name: `TradeCode ${1}`,
                createdAt: '2022-09-22',
              },
            ],
            success: true,
          });
        }}
        rowKey="key"
        pagination={{
          showSizeChanger: true,
        }}
        search={{
          collapsed,
          onCollapse: setCollapsed,
        }}
        formRef={ref}
        options={false}
        dateFormatter={(value, valueType) => {
          console.log('====>', value, valueType);
          return value.format('YYYY-MM-DD HH:mm:ss');
        }}
        headerTitle="使用自定义函数进行日期格式化"
      />
    </>
  );

  <div
    style={{
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '6px',
    }}
  >
    <h4>ProTable 日期格式化 Props 说明：</h4>
    <ul>
      <li>
        <strong>ProTable</strong>: 专业表格组件
      </li>
      <li>
        <strong>日期格式化</strong>: 展示日期格式化功能
      </li>
    </ul>
    <h4>ProTable 配置：</h4>
    <ul>
      <li>
        <strong>columns</strong>: 列配置
      </li>
      <li>
        <strong>request</strong>: 请求函数
      </li>
      <li>
        <strong>rowKey</strong>: 行键
      </li>
      <li>
        <strong>pagination</strong>: 分页配置
      </li>
      <li>
        <strong>search</strong>: 搜索配置
      </li>
      <li>
        <strong>formRef</strong>: 表单引用
      </li>
      <li>
        <strong>options</strong>: 选项配置
      </li>
      <li>
        <strong>dateFormatter</strong>: 日期格式化
      </li>
      <li>
        <strong>headerTitle</strong>: 表格标题
      </li>
    </ul>
    <h4>日期格式化特点：</h4>
    <ul>
      <li>
        <strong>字符串格式</strong>: 支持字符串格式化
      </li>
      <li>
        <strong>数字格式</strong>: 支持数字格式化
      </li>
      <li>
        <strong>自定义函数</strong>: 支持自定义格式化函数
      </li>
      <li>
        <strong>多种格式</strong>: 支持多种日期格式
      </li>
      <li>
        <strong>动态配置</strong>: 支持动态配置
      </li>
    </ul>
    <h4>使用场景：</h4>
    <ul>
      <li>
        <strong>日期展示</strong>: 日期展示需求
      </li>
      <li>
        <strong>时间格式</strong>: 时间格式统一
      </li>
      <li>
        <strong>国际化</strong>: 国际化日期处理
      </li>
    </ul>
  </div>
};
