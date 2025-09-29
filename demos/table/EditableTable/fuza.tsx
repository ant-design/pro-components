import { ProCard, ProForm, ProFormDependency, ProFormField, ProTable } from '@xxlabs/pro-components';
import type { FormInstance } from 'antd';
import { Input, Tabs } from 'antd';
import { useRef } from 'react';

const defaultData = [
  {
    name: 'company_total',
    value: {
      schemaName: 'namespace_e0d8926c7cd51a4ce3ca3675ee370478',
      tableName: 'company_total',
    },
    columnsInfo: [
      {
        name: 'auto_id_by_system',
        dataType: 'bigint',
        description: '系统自动生成-自增主键',
        supplementComment: '系统自动生成-自增主键',
      },
      {
        name: 'project_name',
        dataType: 'text',
        description:
          'project; 保险项目名称，包括赔款支出、保险金额、总资产、责任险、农业保险、原保险保费收入、健康险、意外险等。',
        supplementComment:
          'project; 保险项目名称，包括赔款支出、保险金额、总资产、责任险、农业保险、原保险保费收入、健康险、意外险等。',
      },
      {
        name: 'amount',
        dataType: 'numeric(24,5)',
        description: 'amount; 数值金额，代表各种保险项目的金额。',
        supplementComment: 'amount; 数值金额，代表各种保险项目的金额。',
      },
    ],
    description: '7月财产险公司经营情况表',
  },
  {
    name: 'part_compay_info',
    value: {
      schemaName: 'namespace_e0d8926c7cd51a4ce3ca3675ee370478',
      tableName: 'part_compay_info',
    },
    columnsInfo: [
      {
        name: 'auto_id_by_system',
        dataType: 'bigint',
        description: '系统自动生成-自增主键',
        supplementComment: '系统自动生成-自增主键',
      },
      {
        name: 'mct_one_id',
        dataType: 'text',
        description: 'mct_one_id; 唯一标识符',
        supplementComment: 'mct_one_id; 唯一标识符',
      },
      {
        name: 'list_type',
        dataType: 'text',
        description: 'list_type; 上市板块类型',
        supplementComment: 'list_type; 上市板块类型',
      },
      {
        name: 'report_year',
        dataType: 'numeric(24,5)',
        description: 'report_year; 报告年份',
        supplementComment: 'report_year; 报告年份',
      },
      {
        name: 'org_name',
        dataType: 'text',
        description: 'org_name; 公司名称',
        supplementComment: 'org_name; 公司名称',
      },
      {
        name: 'total_assets',
        dataType: 'numeric(24,5)',
        description: 'total_assets; 总资产',
        supplementComment: 'total_assets; 总资产',
      },
      {
        name: 'total_liability',
        dataType: 'numeric(24,5)',
        description: 'total_liability; 总负债',
        supplementComment: 'total_liability; 总负债',
      },
      {
        name: 'equity',
        dataType: 'numeric(24,5)',
        description: 'equity; 股东权益',
        supplementComment: 'equity; 股东权益',
      },
      {
        name: 'total_profit',
        dataType: 'numeric(24,5)',
        description: 'total_profit; 总利润',
        supplementComment: 'total_profit; 总利润',
      },
      {
        name: 'net_profit',
        dataType: 'numeric(24,5)',
        description: 'net_profit; 净利润',
        supplementComment: 'net_profit; 净利润',
      },
      {
        name: 'tax',
        dataType: 'numeric(24,5)',
        description: 'tax; 税额',
        supplementComment: 'tax; 税额',
      },
    ],
    description: '企业年报',
  },
];

export default () => {
  const formRef = useRef<FormInstance>(undefined);
  return (
    <ProForm
      formRef={formRef}
      initialValues={{ columnsInfo: defaultData, table: defaultData }}
      onValuesChange={(_, e) => {
        console.log(e);
      }}
    >
      <ProFormDependency name={['columnsInfo']}>
        {({ columnsInfo }) => {
          const list = (columnsInfo || []) as any[];
          return (
            <Tabs
              items={list.map((item: any, index) => {
                return {
                  key: item.name || '',
                  tab: (
                    <div
                      style={{
                        padding: 4,
                      }}
                    >
                      {item.name}
                    </div>
                  ),
                  label: (
                    <div
                      style={{
                        padding: 4,
                      }}
                    >
                      {item.name}
                    </div>
                  ),
                  children: (
                    <div
                      style={{
                        display: 'flex',
                        maxWidth: '1024px',
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          overflow: 'auto',
                        }}
                      >
                        <ProTable
                          columns={[
                            {
                              title: '字段名称',
                              dataIndex: 'name',
                              editable: false,
                            },
                            {
                              title: '字段类型',
                              dataIndex: 'dataType',
                              editable: false,
                            },
                            {
                              title: '字段别名',
                              dataIndex: 'description',
                              editable: false,
                              width: 140,
                              render: (text, record) => {
                                return (
                                  <div
                                    style={{
                                      WebkitLineClamp: 2,
                                      maxHeight: 40,
                                      lineHeight: '20px',
                                      textOverflow: 'ellipsis',
                                      overflow: 'hidden',
                                      display: '-webkit-box',
                                      WebkitBoxOrient: 'vertical',
                                      wordBreak: 'break-all',
                                    }}
                                  >
                                    {record.description ? record.description : '-'}
                                  </div>
                                );
                              },
                            },
                            {
                              title: '补充说明',
                              dataIndex: 'supplementComment',
                              formItemRender: () => {
                                return <Input.TextArea maxLength={200} placeholder="请输入补充说明" />;
                              },
                            },
                          ]}
                          editable={{
                            editableKeys: item?.columnsInfo?.map((row: any) => row.name || ''),
                          }}
                          name={['table', index, 'columnsInfo']}
                          pagination={false}
                          request={async () => {
                            return {
                              data: item.columnsInfo,
                            };
                          }}
                          rowKey="name"
                          scroll={{ x: 'max-content' }}
                          search={false}
                          size="small"
                          toolBarRender={false}
                        />
                      </div>
                    </div>
                  ),
                };
              })}
              style={{
                padding: '0 8px',
                maxWidth: '100%',
              }}
            />
          );
        }}
      </ProFormDependency>

      <ProCard collapsible defaultCollapsed headerBordered title="表格数据">
        <ProFormDependency name={['table']}>
          {({ table }) => {
            return (
              <ProFormField
                ignoreFormItem
                fieldProps={{
                  style: {
                    width: '100%',
                  },
                }}
                mode="read"
                text={JSON.stringify(table, null, 2)}
                valueType="jsonCode"
              />
            );
          }}
        </ProFormDependency>
      </ProCard>
    </ProForm>
  );
};
