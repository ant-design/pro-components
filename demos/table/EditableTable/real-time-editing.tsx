import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProFormField,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useState } from 'react';

type DataSourceType = {
  id: React.Key;
  title?: string;
  description?: string;
  status?: string;
  created_at?: number;
  children?: DataSourceType[];
};

const taskNames = [
  '优化首页加载速度',
  '修复登录超时问题',
  '新增数据导出功能',
  '重构权限管理模块',
  '接入第三方支付 SDK',
  '升级 React 18',
  '优化搜索算法',
  '增加单元测试覆盖',
  '实现深色模式',
  '接入埋点 SDK',
  '优化图片懒加载',
  '重构表格组件',
  '添加国际化支持',
  '修复移动端适配',
  '集成 CI/CD 流程',
  '优化打包体积',
  '实现 WebSocket 通信',
  '添加操作审计日志',
  '优化缓存策略',
  '重构路由模块',
];

const taskDescs = [
  '首页白屏时间超过 3s',
  '高峰期登录请求超时',
  '导出 Excel 和 CSV',
  '细粒度权限控制',
  '对接微信和支付宝',
  '升级到最新 LTS 版本',
  'ES 查询响应慢',
  '核心模块覆盖率 > 90%',
  '支持系统主题切换',
  '用户行为数据采集',
  '减少首屏图片请求',
  '提升大数据量渲染性能',
  '支持中英日三语',
  'iOS Safari 布局异常',
  '自动化构建和部署',
  '减少 vendor chunk 体积',
  '实时消息推送',
  '记录关键操作日志',
  '减少 API 冗余请求',
  '支持嵌套路由和权限路由',
];

const defaultData: DataSourceType[] = taskNames.map((name, index) => ({
  id: (1705286400000 + index).toString(),
  title: name,
  description: taskDescs[index],
  status: index % 3 === 0 ? 'open' : index % 3 === 1 ? 'processing' : 'closed',
  created_at: 1705286400000 - index * 86400000,
}));

const Demo = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>(
    () => defaultData,
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '任务名称',
      dataIndex: 'title',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
          {
            max: 30,
            whitespace: true,
            message: '最长为 30 位',
          },
          {
            min: 4,
            whitespace: true,
            message: '最小为 4 位',
          },
        ],
      },
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '待处理',
          status: 'Error',
        },
        processing: {
          text: '进行中',
          status: 'Processing',
        },
        closed: {
          text: '已完成',
          status: 'Success',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        headerTitle="实时编辑任务列表"
        columns={columns}
        rowKey="id"
        scroll={{
          x: 960,
        }}
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              key="save"
              onClick={() => {
                console.log(dataSource);
              }}
            >
              保存数据
            </Button>,
          ];
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
